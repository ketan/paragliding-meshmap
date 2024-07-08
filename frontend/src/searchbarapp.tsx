import { PureComponent } from 'react'
import { HardwareModel } from './interfaces'
import { Node } from './nodes-entity'

export interface AllData {
  allNodes: Node[]
  newerNodes: Node[]
  newerNodesWithPosition: Node[]
  hardwareModels: HardwareModel[]
}

interface SearchBarAppState {
  searchText: string
  filteredNodes: Node[]
}

export class SearchBarApp extends PureComponent<AllData & { selectCallback: (node: Node) => void }, SearchBarAppState> {
  state: SearchBarAppState = {
    searchText: '',
    filteredNodes: [],
  }

  selectNode(node: Node) {
    this.props.selectCallback(node)
  }

  applyFilter(e: React.FormEvent<HTMLInputElement>) {
    this.setState(
      {
        searchText: e.currentTarget.value,
      },
      () => this.filterList()
    )
  }

  filterList(): void {
    const searchText = this.state.searchText.toLowerCase()
    const filteredNodes = this.props.newerNodesWithPosition.filter((node) => {
      return (
        node.nodeId.toString().includes(searchText) ||
        node.nodeIdHex.includes(searchText) ||
        node.longName?.toLowerCase()?.includes(searchText) ||
        node.shortName?.toLowerCase()?.includes(searchText)
      )
    })

    this.setState({ filteredNodes })
  }

  render() {
    const { filteredNodes } = this.state

    return (
      <>
        <input
          type="text"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          onInput={this.applyFilter.bind(this)}
          placeholder={`Search ${this.props.newerNodesWithPosition.length} nodes...`}
        />
        <div className="absolute z-[1001] bg-white w-full border border-gray-200 rounded-lg shadow-md mt-1 overflow-y-scroll max-h-80 divide-y divide-gray-200">
          {filteredNodes.map((eachNode) => {
            return (
              <div
                key={eachNode.nodeId}
                className="p-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  this.selectNode(eachNode)
                }}
              >
                <div className="text-gray-950">{eachNode.longName || '-'}</div>
                <div className="flex space-x-1 text-sm text-gray-800">
                  <div>Short Name: {eachNode.shortName || '-'}</div>
                  <div className="text-gray-200">/</div>
                  <div>Hex ID: {eachNode.nodeIdHex}</div>
                  <div className="text-gray-200">/</div>
                  <div>Node ID: {eachNode.nodeId}</div>
                </div>
              </div>
            )
          })}
        </div>
      </>
    )
  }
}
