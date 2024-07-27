import React, { ReactNode } from 'react'
import { NodesEntity, TextMessagesEntity } from './database'
import { BROADCAST_ADDR, nodeUrl, timeAgo } from './ui-util'
import FilterCircleXMark from './assets/images/icons/filter-circle-xmark.svg?component'
import Filter from './assets/images/icons/filter.svg?component'
import CircleInfoIcon from './assets/images/icons/circle-info.svg?component'

import icon from './assets/images/icon.png'
import _ from 'lodash'
import qs from 'qs'
interface MessagesAppState {
  messages: TextMessagesEntity[]
  nodes: Record<number, NodesEntity>
  from: number
  to?: number | string
}

export class MessagesApp extends React.Component<unknown, MessagesAppState> {
  state: MessagesAppState = {
    messages: [],
    from: 0,
    nodes: {},
  }

  private elementRefForEndOfPage = React.createRef<HTMLDivElement>()

  parseTo(to: string | null): number | string {
    if (to === 'all') {
      return `all`
    } else if (isNaN(Number(to))) {
      return BROADCAST_ADDR
    } else {
      return Number(to)
    }
  }

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

  toggleFilter() {
    this.setState(
      (current) => {
        if (current.to === 'all') {
          return { ...current, to: BROADCAST_ADDR }
        } else {
          return { ...current, to: `all` }
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

  async loadData() {
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
      const messages = (await messagesResponse.json()) as TextMessagesEntity[]
      this.setState({ messages })

      for (let index = 0; index < messages.length; index++) {
        const eachMessage = messages[index]
        await this.fetchNode(eachMessage.from)
        await this.fetchNode(eachMessage.to)
      }
    }
  }

  async fetchNode(nodeId: number) {
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

  componentDidUpdate() {
    this.scrollToBottom()
  }

  scrollToBottom = () => {
    this.elementRefForEndOfPage.current?.scrollIntoView({ behavior: 'smooth' })
  }

  render(): ReactNode {
    return (
      <div className="flex flex-col h-full w-full overflow-hidden">
        <div className="flex flex-col h-full">
          {/* begin header */}
          <div className="flex bg-white p-2 border-gray-300 border-b h-16">
            {/* icon */}
            <div className="hidden sm:block my-auto mr-3 relative">
              <div className="text-3xl absolute -top-2.5 -right-1.5">&#x1FA82;</div>
              <img className="w-10 h-10 rounded bg-opacity-90" src={icon} />
            </div>
            {/* app info */}
            <div className="my-auto leading-tight">
              <div className="font-bold">Meshtastic map</div>
              <div className="text-sm">
                By{' '}
                <a target="_blank" rel="noreferrer" href="https://github.com/ketan">
                  Ketan Padegaonkar
                </a>{' '}
                (inspiration{' '}
                <a target="_blank" rel="noreferrer" href="https://meshtastic.liamcottle.net/">
                  Liam Cottle
                </a>
                )
              </div>
            </div>
            {/* banner */}
            {this.banner()}
            {/* header action buttons */}
            <div className="header flex my-auto ml-auto mr-0 sm:mr-2 space-x-1 sm:space-x-2">
              <a
                href="#"
                className="has-tooltip rounded-full hidden sm:block"
                aria-label="About"
                data-cooltipz-dir="bottom"
                id="about-button"
              >
                <div className="bg-gray-100 hover:bg-gray-200 p-2 rounded-full min-w-6 min-h-6">
                  <CircleInfoIcon className="w-6 h-6" />
                </div>
              </a>

              <a
                href="#"
                className="has-tooltip rounded-full hidden sm:block"
                aria-label={
                  this.state.to === BROADCAST_ADDR ? `Show all messages sent by this pilot` : `Only show messages broadcasted by this pilot`
                }
                data-cooltipz-dir="bottom-right"
                onClick={this.toggleFilter.bind(this)}
              >
                <div className="bg-gray-100 hover:bg-gray-200 p-2 rounded-full">
                  {this.state.to === BROADCAST_ADDR ? <FilterCircleXMark className="w-6 h-6" /> : <Filter className="w-6 h-6" />}
                </div>
              </a>
            </div>
          </div>
          {/* end header */}

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
        </div>

        <div ref={this.elementRefForEndOfPage} />
      </div>
    )
  }

  private banner() {
    const fromNode = { ...this.state.nodes[this.state.from], nodeId: this.state.from }
    const bannerText = (
      <>
        Messages sent by {fromNode.longName} ({fromNode.shortName})
      </>
    )
    return (
      <div className="mx-auto grid content-evenly">
        <span className="text-center align-middle font-bold mx-auto">{bannerText}</span>
      </div>
    )
  }
}
