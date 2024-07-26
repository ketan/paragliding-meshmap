import React, { ReactNode } from 'react'
import { NodesEntity, TextMessagesEntity } from './database'
import { describeNode, nodeUrl, timeAgo } from './ui-util'

import icon from './assets/images/icon.png'

export type MessagesAppProps = { from: number; to?: number }

interface MessagesAppState {
  messages: TextMessagesEntity[]
  nodes: Record<number, NodesEntity>
}

export class MessagesApp extends React.Component<MessagesAppProps, MessagesAppState> {
  state: MessagesAppState = {
    messages: [],
    nodes: {},
  }

  messagesEndRef = React.createRef<HTMLDivElement>()

  async componentDidMount() {
    const messagesResponse = await fetch(`/api/node/${this.props.from}/messages?since=P7D&to=${this.props.to || ''}`)
    if (messagesResponse.status == 200 || messagesResponse.status == 304) {
      const messages = (await messagesResponse.json()) as TextMessagesEntity[]
      this.setState({ messages })

      for (let index = 0; index < messages.length; index++) {
        const eachMessage = messages[index]
        await this.fetchNode(eachMessage.from)
        await this.fetchNode(eachMessage.to)
      }
    }

    this.scrollToBottom()
  }

  BROADCAST_ADDR = Number('0xffffffff')

  async fetchNode(nodeId: number) {
    if (nodeId === this.BROADCAST_ADDR) {
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
    this.messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
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
            {/* search bar */}
            {this.banner()}
            {/* header action buttons */}
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

        <div ref={this.messagesEndRef} />
      </div>
    )
  }

  private banner() {
    const fromNode = { ...this.state.nodes[this.props.from], nodeId: this.props.from }
    const bannerText = <>Messages sent by {describeNode(fromNode)}</>
    return (
      <div className="mx-auto grid content-evenly">
        <span className="text-center align-middle font-bold mx-auto">{bannerText}</span>
      </div>
    )
  }
}
