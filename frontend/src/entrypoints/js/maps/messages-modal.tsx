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
import { clearMessageUrlParams, setMessageUrlParams, timeAgo, TRACKER_API_BASE_URL } from '../utils/ui-util.tsx'
import { FilterCircleXmarkIcon, FilterIcon } from '../utils/icon-constants.ts'
import { Tooltip } from '../components/tooltip.tsx'

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
  const [loadedState, setLoadedState] = useState<LoadedState>(null)
  const [messages, setMessages] = useState<MessagesEntityForUI[]>([])
  const elementRefForEndOfPage = React.createRef<HTMLDivElement>()

  useEffect(() => {
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
      const messagesResponse = await fetch(`${TRACKER_API_BASE_URL}/api/node/${from}/sent-messages?to=${to}&since=${since.toISO()}`)
      if (messagesResponse.status == 200 || messagesResponse.status == 304) {
        const messages = (await messagesResponse.json()) as MessagesEntityForUI[]
        setMessages(messages)
        setLoadedState('loaded')
        setMessageUrlParams({ from: from!, to: to!, since: since?.rescale().toISO() })
      } else {
        setLoadedState('error')
      }
    }

    if (from) {
      loadData()
    }

    return () => clearMessageUrlParams()
  }, [from, to, since])

  useEffect(() => {
    if (loadedState === 'loaded') {
      elementRefForEndOfPage.current?.scrollIntoView(false)
    }
  }, [loadedState, messages, elementRefForEndOfPage])

  function renderMessagesIfAny() {
    if (loadedState !== 'loaded') {
      return
    }

    return messages.map((msg) => {
      const fromNode: NodesEntity = { ...nodes[msg.from], nodeId: msg.from }
      const toNode: NodesEntity = { ...nodes[msg.to], nodeId: msg.to }

      return (
        <div className="max-w-screen-sm rounded-r-xl rounded-tl-xl bg-gray-200 p-4 shadow-md shadow-gray-400" key={msg.id}>
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
            <button className="link" onClick={() => updateDuration(currentDurationDoubled)}>
              Show older messages
            </button>
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

    return `Messages sent by ${fromNode.longName} (${fromNode.shortName})`
  }

  function renderLoadingMessage() {
    if (loadedState === undefined || loadedState === 'loading') {
      return <div>Loading...</div>
    }
  }

  function toggleFilterHeaderIcon() {
    const showAll = to === 'all'

    const Element = showAll ? FilterCircleXmarkIcon : FilterIcon
    const tooltip = showAll ? `Show all messages sent by this pilot` : `Only show messages broadcasted by this pilot`

    return (
      <Tooltip tooltipText={tooltip} tooltipDir="bottom-end">
        <Element className="w-4 h-4" />
      </Tooltip>
    )
  }

  if (!from) {
    return <></>
  }

  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      header={banner()}
      headerButtons={[
        {
          icon: toggleFilterHeaderIcon(),
          onClick: () => toggleFilter(),
        },
      ]}
    >
      <div className="space-y-3">
        {renderLoadingMessage()}
        {renderNoMessagesIfNone()}
        {renderMessagesIfAny()}
        <div ref={elementRefForEndOfPage}></div>
      </div>
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
