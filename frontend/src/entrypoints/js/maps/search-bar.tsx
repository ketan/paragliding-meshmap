import _ from 'lodash'
import { FormEvent, PureComponent } from 'react'
import { NodesEntityForUI } from '../../../nodes-entity'

export interface AllData {
  nodes: NodesEntityForUI[]
}

interface SearchBarAppState {
  searchText: string
  filteredNodes: NodesEntityForUI[]
}

export class SearchBar extends PureComponent<AllData & { selectCallback: (node: NodesEntityForUI) => void }, SearchBarAppState> {
  state: SearchBarAppState = {
    searchText: '',
    filteredNodes: [],
  }

  private selectNode(node: NodesEntityForUI) {
    this.setState({ searchText: '' })
    this.props.selectCallback(node)
  }

  private applyFilter(e: FormEvent<HTMLInputElement>) {
    this.setState(
      {
        searchText: e.currentTarget.value,
      },
      () => this.filterList()
    )
  }
  private filterList(): void {
    const searchText = this.state.searchText.toLowerCase()
    const filteredNodes = this.props.nodes.filter((node) => {
      return (
        node.nodeId.toString().includes(searchText) ||
        node.nodeIdHex.includes(searchText) ||
        node.longName?.toLowerCase()?.includes(searchText) ||
        node.shortName?.toLowerCase()?.includes(searchText)
      )
    })

    this.setState({ filteredNodes })
  }

  private showSearchResults() {
    if (_.isEmpty(this.state.searchText)) {
      return
    }
    const { filteredNodes } = this.state
    return (
      <div className="absolute z-[1001] bg-white w-full border border-gray-200 rounded-lg shadow-md mt-1 overflow-y-scroll max-h-80 divide-y divide-gray-200">
        {filteredNodes.map((eachNode) => {
          return (
            <div key={eachNode.nodeId} className="p-2 hover:bg-gray-100 cursor-pointer" onClick={() => this.selectNode(eachNode)}>
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
    )
  }

  render() {
    return (
      <>
        <div className="w-full mx-3 my-auto block relative">
          <input
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full"
            value={this.state.searchText}
            onInput={this.applyFilter.bind(this)}
            placeholder={`Search ${this.props.nodes.length} nodes...`}
          />
          {this.showSearchResults()}
        </div>
      </>
    )
  }
}
