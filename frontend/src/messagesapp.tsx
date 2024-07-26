import React, { ReactNode } from 'react'
import { NodesEntity, TextMessagesEntity } from './database'
import { nodeName, timeAgo } from './ui-util'

export type MessagesAppProps = { from: number } | { to: number }

interface MessagesAppState {
  messages: TextMessagesEntity[]
  nodes: Record<number, NodesEntity>
}

export class MessagesApp extends React.Component<MessagesAppProps, MessagesAppState> {
  state: MessagesAppState = {
    messages: [],
    nodes: {},
  }
  async componentDidMount() {
    if ('from' in this.props) {
      const messagesResponse = await fetch(`/api/node/${this.props.from}/outgoing-messages?since=P7D`)
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
  }

  BROADCAST_ADDR = Number('0xffffffff')

  async fetchNode(nodeId: number) {
    if (nodeId === this.BROADCAST_ADDR) {
      // return
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

  render(): ReactNode {
    return (
      <div>
        {this.banner()}

        <div className="flex w-full flex-col gap-4">
          <div className="mr-auto flex max-w-[80%] flex-col gap-2 rounded-r-xl rounded-tl-xl bg-slate-100 p-4 text-black md:max-w-[60%] dark:bg-slate-800 dark:text-white">
            <span className="font-semibold">Penguin UI</span>
            <div className="text-sm text-slate-700 dark:text-slate-300">Hi there! How can I assist you today?</div>
            <span className="ml-auto text-xs">11:32 AM</span>
          </div>

          <div className="ml-auto flex max-w-[80%] flex-col gap-2 rounded-l-xl rounded-tr-xl bg-blue-700 p-4 text-sm text-slate-100 md:max-w-[60%] dark:bg-blue-600 dark:text-slate-100">
            I accidentally deleted some important files. Can they be recovered?
            <span className="ml-auto text-xs">11:34 AM</span>
          </div>

          <div className="mr-auto flex max-w-[80%] flex-col gap-2 rounded-r-xl rounded-tl-xl bg-slate-100 p-4 text-black md:max-w-[60%] dark:bg-slate-800 dark:text-white">
            <span className="font-semibold">Penguin UI</span>
            <div className="text-sm text-slate-700 dark:text-slate-300">
              I'm sorry to hear that. Let me guide you through the process to resolve it. Could you please provide your username?
            </div>
            <span className="ml-auto text-xs">11:35 AM</span>
          </div>
        </div>
      </div>
    )
    return (
      <li className="text-wrap" key="lastMessages">
        <ul className="list-inside ml-1">
          {this.state.messages.map((msg) => {
            const fromNode = { ...this.state.nodes[msg.from], nodeId: msg.from }
            const toNode = { ...this.state.nodes[msg.to], nodeId: msg.to }
            return (
              <li className="message-bubble" key={msg.id}>
                <div>
                  <span className="text font-semibold">{nodeName(fromNode)}</span>
                  <span> → </span>
                  <span className="text font-semibold">{nodeName(toNode)}</span>
                </div>
                <span className="text-sm">{msg.text}</span> {timeAgo(msg.createdAt, true)}
              </li>

              // <div key={msg.id}>
              //   <div>From: {nodeName(fromNode)}</div>
              //   <div>To: {nodeName(toNode)}</div>
              //   <div>{msg.text}</div>
              //   <div>{timeAgo(msg.createdAt)}</div>
              // </div>
            )
          })}
        </ul>
      </li>
    )
  }

  private banner() {
    let bannerText
    if ('from' in this.props) {
      const fromNode = { ...this.state.nodes[this.props.from], nodeId: this.props.from }
      bannerText = (
        <>
          Messages sent by <a href="#">{nodeName(fromNode)}</a>
        </>
      )
    } else {
      const toNode = { ...this.state.nodes[this.props.to], nodeId: this.props.to }

      bannerText = (
        <>
          Messages sent to <a href="#">{nodeName(toNode)}</a>
        </>
      )
    }
    return (
      <div className="fixed inset-x-0 top-0 z-10 flex border-slate-300 bg-slate-100 p-4 text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 border-b">
        <p className="px-6 text-xs sm:text-sm text-pretty mx-auto">{bannerText}</p>
      </div>
    )
  }
}
