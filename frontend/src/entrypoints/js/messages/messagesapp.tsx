import _ from 'lodash'
import qs from 'qs'
import React, { ReactNode } from 'react'
import { NodesEntity, TextMessagesEntity } from '../../../db-entities'
import { HeaderIcon, Page } from '../components/page'
import { FilterCircleXmarkIcon, FilterIcon } from '../utils/icon-constants'
import { BROADCAST_ADDR, nodeUrl, timeAgo } from '../utils/ui-util'

type All = `all`
type Messages = Pick<TextMessagesEntity, 'createdAt' | 'from' | 'to' | 'text' | 'id'>

interface MessagesAppState {
  messages: Messages[]
  nodes: Record<number, NodesEntity>
  from: number
  to?: number | All
}

export class MessagesApp extends React.Component<unknown, MessagesAppState> {
  state: MessagesAppState = {
    messages: [],
    from: 0,
    nodes: {},
  }

  private elementRefForEndOfPage = React.createRef<HTMLDivElement>()

  async componentDidMount() {
    const queryParams = new URLSearchParams(window.location.search)
    const from = queryParams.get('from')
    const to = queryParams.get('to')

    this.setState(
      {
        from: Number(from),
        to: this.parseTo(to),
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
          {this.state.messages.map((msg) => {
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
          })}
        </div>
        <div ref={this.elementRefForEndOfPage} />
      </Page>
    )
  }

  private async loadData() {
    const queryString = qs.stringify(
      _.omitBy(
        {
          since: `P7D`,
          to: this.state.to,
        },
        _.isNil
      )
    )
    const messagesResponse = await fetch(`/api/node/${this.state.from}/sent-messages?${queryString}`)
    if (messagesResponse.status == 200 || messagesResponse.status == 304) {
      const messages = (await messagesResponse.json()) as Messages[]
      this.setState({ messages })

      for (let index = 0; index < messages.length; index++) {
        const eachMessage = messages[index]
        await this.fetchNode(eachMessage.from)
        await this.fetchNode(eachMessage.to)
      }
    }
  }

  private async fetchNode(nodeId: number) {
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
