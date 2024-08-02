import { Component, PropsWithChildren } from 'react'
import { NodesEntityForUI } from './nodes-entity'
import { XMarkIcon } from './icon-constants'

interface Props {
  node: NodesEntityForUI
  ondismiss: () => void
}

export class NodeDetailsApp extends Component<PropsWithChildren<Props>, unknown> {
  render() {
    return (
      <div className="relative z-sidebar">
        {/* overlay */}
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75"></div>
        {/* modal */}
        <div className="fixed left-0 right-0 top-0 bottom-0 lg:pointer-events-none">
          <div className="flex w-full h-full overflow-y-auto p-0">
            <div className="mx-auto my-auto w-full max-w-2xl flex-col bg-white shadow-xl rounded-xl p-2 lg:pointer-events-auto">
              <div className="relative flex">
                {/* close button */}
                <div className="absolute top-0 right-0">
                  <div className="h-7">
                    <a href="#" className="rounded-full" onClick={this.props.ondismiss.bind(this)}>
                      <div className="bg-gray-100 hover:bg-gray-200 p-2 rounded-full">
                        <XMarkIcon className="w-6 h-6" />
                      </div>
                    </a>
                  </div>
                </div>
                <div className="flex flex-col w-full py-2 space-y-2">{this.props.children}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
