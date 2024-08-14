import { Duration } from 'luxon'
import { NodesEntity } from '../../../db-entities'
import { All } from '../../../interfaces'
import React, { useEffect, useState } from 'react'
import { LoadedState } from './loaded-state.tsx'
import qs from 'qs'
import _ from 'lodash'
import { MessagesEntityForUI } from '../../../nodes-entity'
import { Modal } from '../components/modal.tsx'
import { nodeUrl } from '../utils/link-utils.ts'
import { timeAgo } from '../utils/ui-util.tsx'
import { HeaderIcon } from '../components/page.tsx'
import { FilterCircleXmarkIcon, FilterIcon } from '../utils/icon-constants.ts'

interface Props {
  from?: number
  to: number | All | undefined
  since: Duration
  nodes: Record<number, NodesEntity>
  onClose: () => void
  updateDuration: (newDuration: Duration) => void
  toggleFilter: () => void
}

export function MessagesModal({ from, to, since, nodes, onClose, updateDuration, toggleFilter }: Props) {
  console.log(`message from ${from} -> ${to} ${since}`)

  const [loadedState, setLoadedState] = useState<LoadedState>(null)
  const [messages, setMessages] = useState<MessagesEntityForUI[]>([])

  async function loadData() {
    setLoadedState('loading')
    qs.stringify(
      _.omitBy(
        {
          since: since.toISO(),
          to: to,
        },
        _.isNil
      )
    )
    const messagesResponse = await fetch(`/api/node/${from}/sent-messages?to=${to}&since=${since.toISO()}`)
    if (messagesResponse.status == 200 || messagesResponse.status == 304) {
      const messages = (await messagesResponse.json()) as MessagesEntityForUI[]

      setMessages(messages)
      setLoadedState('loaded')
    } else {
      setLoadedState('error')
    }
  }

  useEffect(() => {
    if (from) {
      loadData()
    }
  }, [from, to, since])

  function renderMessagesIfAny() {
    if (loadedState !== 'loaded') {
      return
    }

    return messages.map((msg) => {
      const fromNode: NodesEntity = { ...nodes[msg.from], nodeId: msg.from }
      const toNode: NodesEntity = { ...nodes[msg.to], nodeId: msg.to }

      return (
        <div className="max-w-screen-sm rounded-r-xl rounded-tl-xl bg-gray-100 p-4 shadow-md" key={msg.id}>
          <span className="font-semibold text-sm">
            <a href={nodeUrl(msg.from)}>{nodeName(fromNode)}</a> →{' '}
            {4294967295 === msg.to ? 'Everyone' : <a href={nodeUrl(msg.to)}>{nodeName(toNode)}</a>}
          </span>
          <div className="clear-both text-sm text-slate-700 pt-2">{msg.text}</div>
          <div className="ml-auto text-sm text-right pt-2">{timeAgo(msg.createdAt, true)}</div>
        </div>
      )
    })
  }

  function renderNoMessagesIfNone() {
    if (loadedState !== 'loaded') {
      return
    }
    if (messages.length === 0) {
      const currentDurationDoubled = Duration.fromMillis(since.toMillis() * 2, { conversionAccuracy: 'casual' }).rescale()

      let link: React.ReactNode = null

      if (currentDurationDoubled < Duration.fromObject({ days: 60 })) {
        link = (
          <>
            {' '}
            <a href="#" onClick={() => updateDuration(currentDurationDoubled)}>
              Show older messages
            </a>
          </>
        )
      }

      return (
        <div className="max-w-screen-sm rounded-r-xl rounded-tl-xl bg-gray-100 p-4 shadow-md">
          <span className="font-semibold text-sm">No messages sent by this user in {since.rescale().toHuman()}.</span>
          {link}
        </div>
      )
    }
  }

  function banner() {
    if (!from) {
      return
    }

    const fromNode = { ...nodes[from], nodeId: from }
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

  if (!from) {
    return <></>
  }

  function renderLoadingMessage() {
    if (loadedState === undefined || loadedState === 'loading') {
      return <div>Loading...</div>
    }
  }

  function toggleFilterHeaderIcon() {
    const showAll = to === 'all'
    return (
      <HeaderIcon
        className="block"
        tooltip={showAll ? `Show all messages sent by this pilot` : `Only show messages broadcasted by this pilot`}
        tooltipDir="bottom-right"
        icon={showAll ? FilterCircleXmarkIcon : FilterIcon}
        onClick={() => toggleFilter()}
      />
    )
  }

  return (
    <Modal showModal={true} setShowModal={() => onClose()}>
      {banner()}
      {toggleFilterHeaderIcon()}
      {renderLoadingMessage()}
      {renderNoMessagesIfNone()}
      {renderMessagesIfAny()}
    </Modal>
  )
}

function nodeName(node: NodesEntity) {
  const retString = []
  if (node.shortName) {
    retString.push(node.shortName)
    if (node.longName) {
      retString.push(` (${node.longName})`)
    }
  } else {
    retString.push(`<UNKNOWN> (!${node.nodeId?.toString(16)})`)
  }

  return retString
}
