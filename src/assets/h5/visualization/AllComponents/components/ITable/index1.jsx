import ConvertJsonToTableHoc from '../../../../higherComponent/convertJsonToComponent/convertJsonToComponentHoc'

import React from 'react'
import { Table } from 'antd'
import _ from 'lodash'

export default class ITable extends React.Component {
	constructor(props) {
		super(props)
		console.log('ITable is', props)
	}
	render() {
		return <ConvertJsonToTableHoc {...this.props} />
		// return React.createElement(ConvertJsonToTableHoc, {
		// 	configKey: 'proviceListManage',
		// })
	}
}
