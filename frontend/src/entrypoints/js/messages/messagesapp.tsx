import _ from 'lodash'
import qs from 'qs'
import React, { ReactNode } from 'react'
import { NodesEntity, TextMessagesEntity } from '../../../db-entities'
import { HeaderIcon, Page } from '../components/page'
import { FilterCircleXmarkIcon, FilterIcon } from '../utils/icon-constants'
import { BROADCAST_ADDR, timeAgo } from '../utils/ui-util'
import { All } from '../../../interfaces'
import { messageLink, nodeUrl } from '../utils/link-utils'
import { Duration } from 'luxon'
import { Link } from 'react-router-dom'

type Messages = Pick<TextMessagesEntity, 'createdAt' | 'from' | 'to' | 'text' | 'id'>

interface MessagesAppState {
  messages: Messages[]
  nodes: Record<number, NodesEntity>
  since: Duration
  from: number
  to?: number | All
}

export class MessagesApp extends React.Component<unknown, MessagesAppState> {
  state: MessagesAppState = {
    since: Duration.fromObject({ days: 7 }).rescale(),
    messages: [],
    from: 0,
    nodes: {},
  }

  private elementRefForEndOfPage = React.createRef<HTMLDivElement>()

  async componentDidMount() {
    const queryParams = new URLSearchParams(window.location.search)
    const from = queryParams.get('from')
    const to = queryParams.get('to')
    const since = queryParams.get('since')

    this.setState(
      {
        from: Number(from),
        to: this.parseTo(to),
        since: since ? Duration.fromISO(since).rescale() : Duration.fromObject({ days: 7 }).rescale(),
      },
      async () => {
        await this.loadData()
      }
    )

    this.scrollToBottom()
  }

  componentDidUpdate() {
    this.scrollToBottom()
  }

  render(): ReactNode {
    return (
      <Page bannerMain={this.banner()} headerIcons={this.toggleFilterHeaderIcon()}>
        <div className="flex flex-col gap-4 p-8">
          {this.renderMessagesIfAny()}
          {this.renderNoMessagesIfNone()}
        </div>
        <div ref={this.elementRefForEndOfPage} />
      </Page>
    )
  }
  renderNoMessagesIfNone(): React.ReactNode {
    if (this.state.messages.length === 0) {
      const currentDurationDoubled = Duration.fromMillis(this.state.since.toMillis() * 2, { conversionAccuracy: 'casual' }).rescale()

      let link: React.ReactNode = null

      if (currentDurationDoubled < Duration.fromObject({ days: 60 })) {
        link = (
          <>
            {' '}
            <Link
              to={messageLink(this.state.from, this.state.to, currentDurationDoubled.toISO())}
              onClick={() => {
                this.setState({ since: currentDurationDoubled })
              }}
            >
              Show older messages
            </Link>
          </>
        )
      }

      return (
        <div className="max-w-screen-sm rounded-r-xl rounded-tl-xl bg-gray-100 p-4 shadow-md">
          <span className="font-semibold text-sm">No messages sent by this user in {this.state.since.rescale().toHuman()}.</span>
          {link}
        </div>
      )
    }
  }

  private renderMessagesIfAny(): React.ReactNode {
    return this.state.messages.map((msg) => {
      const fromNode = { ...this.state.nodes[msg.from], nodeId: msg.from }
      const toNode = { ...this.state.nodes[msg.to], nodeId: msg.to }

      return (
        <div className="max-w-screen-sm rounded-r-xl rounded-tl-xl bg-gray-100 p-4 shadow-md" key={msg.id}>
          <span className="font-semibold text-sm">
            <a href={nodeUrl(msg.from)}>
              {fromNode.shortName} ({fromNode.longName})
            </a>{' '}
            →{' '}
            {4294967295 === msg.to ? (
              'Everyone'
            ) : (
              <a href={nodeUrl(msg.to)}>
                {toNode.shortName} ({toNode.longName})
              </a>
            )}
          </span>
          <div className="clear-both text-sm text-slate-700 pt-2">{msg.text}</div>
          <div className="ml-auto text-sm text-right pt-2">{timeAgo(msg.createdAt, true)}</div>
        </div>
      )
    })
  }

  private async loadData() {
    const queryString = qs.stringify(
      _.omitBy(
        {
          since: this.state.since.toISO(),
          to: this.state.to,
        },
        _.isNil
      )
    )
    const messagesResponse = await fetch(`/api/node/${this.state.from}/sent-messages?${queryString}`)
    const nodesToFetch = new Set<number>()
    nodesToFetch.add(this.state.from)
    if (typeof this.state.to === 'number') {
      nodesToFetch.add(this.state.to)
    }
    if (messagesResponse.status == 200 || messagesResponse.status == 304) {
      const messages = (await messagesResponse.json()) as Messages[]
      this.setState({ messages })

      for (let index = 0; index < messages.length; index++) {
        const eachMessage = messages[index]
        nodesToFetch.add(eachMessage.from)
        nodesToFetch.add(eachMessage.to)
      }
    }
    await this.fetchNodes(Array.from(nodesToFetch))
  }

  private async fetchNodes(nodeIds: number[]) {
    for (let index = 0; index < nodeIds.length; index++) {
      const nodeId = nodeIds[index]

      if (nodeId === BROADCAST_ADDR) {
        return
      }
      if (!this.state.nodes[nodeId]) {
        const nodeResponse = await fetch(`/api/node/${nodeId}`)
        if (nodeResponse.status === 200 || nodeResponse.status === 304) {
          const node = (await nodeResponse.json()) as NodesEntity
          this.setState((state) => {
            state.nodes[nodeId] = node
            return { ...state }
          })
        }
      }
      return this.state.nodes[nodeId]
    }
  }

  private toggleFilter() {
    this.setState(
      (current) => {
        if (current.to === 'all') {
          return { ...current, to: BROADCAST_ADDR }
        } else {
          return { ...current, to: 'all' }
        }
      },
      async () => {
        const queryString = qs.stringify(
          _.omitBy(
            {
              to: this.state.to,
              from: this.state.from,
              since: this.state.since.toISO(),
            },
            _.isNil
          )
        )

        const url = new URL(window.location.href)
        url.search = queryString
        window.history.replaceState(null, '', url.toString())

        await this.loadData()
      }
    )
  }

  private scrollToBottom = () => {
    this.elementRefForEndOfPage.current?.scrollIntoView({ behavior: 'smooth' })
  }

  private parseTo(to: string | null): number | All {
    if (to === 'all') {
      return 'all'
    } else if (isNaN(Number(to))) {
      return BROADCAST_ADDR
    } else {
      return Number(to)
    }
  }

  private banner() {
    const fromNode = { ...this.state.nodes[this.state.from], nodeId: this.state.from }
    const bannerText = (
      <span className="text-sm md:text-lg">
        Messages sent by {fromNode.longName} ({fromNode.shortName})
      </span>
    )
    return (
      <div className="mx-auto grid content-evenly">
        <span className="text-center align-middle font-bold mx-auto">{bannerText}</span>
      </div>
    )
  }

  private toggleFilterHeaderIcon() {
    const showAll = this.state.to === 'all'
    return (
      <HeaderIcon
        className="block"
        tooltip={showAll ? `Show all messages sent by this pilot` : `Only show messages broadcasted by this pilot`}
        tooltipDir="bottom-right"
        icon={showAll ? FilterCircleXmarkIcon : FilterIcon}
        onClick={() => this.toggleFilter()}
      />
    )
  }
}
