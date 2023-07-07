import React from 'react'
import { Table } from 'antd'
import _ from 'lodash'
let selection = {}
// _.forIn(options.searchBar, (v, k) => {
// 	if (v.type === 'select' && typeof v.options === 'string') {
// 		selection[v.options] = []
// 	}
// })
// _.forIn(options.fields, (v, k) => {
// 	if (v.type === 'select' && typeof v.options === 'string') {
// 		selection[v.options] = []
// 	}
// })
export default class ITable extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			url: '',
			params: {},
			higherSearchParams: {},
			total: 0,
			pageSize: 30,
			current: 1,
			loading: false,
			dataSource: [],
			selection: selection,
			columns: [],
			detailColumns: [],
			expandedRow: [],
			higherSearchField: [],
			searchField: [],
			showHigherSearch: false,
			searchMode: 0,
			showFieldConfig: false,
			fieldConfig: [],
			currentRow: -1,
			selectedRowKeys: [],
			selectedRows: [],
			sorter: null,
			exportField: [],
			showExportFieldConfig: false,
			isNeedCachePages: [],
		}
	}

	render() {
		const options = {}
		let parseDataSource =
			typeof this.props.ComponentData.dataSource == 'string'
				? JSON.parse(this.props.ComponentData.dataSource)
				: this.props.ComponentData.dataSource
		console.log('ccccccccccc', parseDataSource)
		return (
			<div className="ITable_ct">
				<Table
					dataSource={parseDataSource}
					columns={this.props.ComponentData.columns}
					rowKey={this.props.ComponentData.rowKey || ((v, i) => i)}
					rowClassName={this.props.ComponentData.rowClassName}
					scroll={{ y: this.props.ComponentData.height || null, x: '100%' }}
					pagination={
						options.noPagination
							? false
							: {
									showQuickJumper: true,
									showSizeChanger: true,
									current: this.state.current,
									pageSize: this.state.pageSize,
									total: this.state.total,
									pageSizeOptions: ['30', '100', '300', '500'],
									showTotal: (total, range) =>
										`${
											this.state.currentRow + 1
												? this.state.currentRow + 1 + '/ '
												: ''
										}
				   ${range[0]}-${range[1]} / ${total}`,
							  }
					}
					onRow={(record, index) => {
						let row = {}
						row.onClick = (e) => {
							this.setState({
								currentRow: index,
								selectedRecordText: this.getExcelText(record),
							})
							if (
								!this.state.detailColumns.length &&
								this.props.ComponentData.onRowClick
							) {
								this.props.ComponentData.onRowClick.bind(this, record, e)()
							} else if (this.state.detailColumns.length) {
								this.setState({ expandedRow: [index] })
								if (this.props.ComponentData.onRowClick) {
									this.props.ComponentData.onRowClick.bind(this)(record)
								}
							}
							if (
								this.props.ComponentData.enableRowSelection &&
								this.props.ComponentData.enableClickSelect
							) {
								let selectedKey = this.state.selectedRowKeys
								let selected = this.state.selectedRows
								let sIndex = selectedKey.indexOf(index)
								if (sIndex >= 0) {
									selectedKey.splice(sIndex, 1)
									selected.splice(sIndex, 1)
								} else {
									selectedKey.push(index)
									selected.push(record)
								}
								this.setState({
									selectedRowKeys: selectedKey,
									selectedRows: selected,
								})
							}
						}
						row.onDoubleClick = (e) => {
							if (document.body.createTextRange) {
								var range = document.body.createTextRange()
								range.moveToElementText(e.target.parentElement)
								range.select()
							} else if (window.getSelection) {
								var range = document.createRange()
								range.selectNodeContents(e.target.parentElement)
								window.getSelection().removeAllRanges()
								window.getSelection().addRange(range)
							}
						}
						row.className =
							(this.props.ComponentData.rowClass
								? this.props.ComponentData.rowClass(record, index)
								: '') + (this.state.currentRow == index ? ' active-row' : '')
						row.style =
							typeof this.props.ComponentData.rowStyle == 'function'
								? this.props.ComponentData.rowStyle.call(this)
								: this.props.ComponentData.rowStyle
						return row
					}}
					rowSelection={
						this.props.ComponentData.enableRowSelection
							? {
									onChange: (selectedRowKeys, selectedRows) => {
										//  console.log(this.props)
										this.setState({
											selectedRowKeys: selectedRowKeys,
											selectedRows: selectedRows,
										})
									},
									getCheckboxProps:
										this.props.ComponentData.getCheckboxProps || undefined,
									selectedRowKeys: this.state.selectedRowKeys,
									hideDefaultSelections:
										this.props.ComponentData.hideDefaultSelections || undefined,
									columnTitle:
										this.props.ComponentData.columnTitle || undefined,
							  }
							: null
					}
					bordered={true}
				></Table>
			</div>
		)
	}
}
