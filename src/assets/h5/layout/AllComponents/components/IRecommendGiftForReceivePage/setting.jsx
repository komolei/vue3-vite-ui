import React from "react";
import HocForm from '../../../../higherComponent/HocForm'
import axios from 'axios'

// 推荐有礼领取页
export default HocForm({
	onInitValues(values) {
		axios
			.get('cms/ApiActivityMaterialConfig/index?Page=1&Scount=3000&Type=6')
			.then((res) => {
				this.setState({
					list: res.data?.Data?.Data ?? [],
				})
			})
	},
	field: [
		{
			title: '推荐有礼领取页选择',
			key: 'CommonActivityMaterialPkId',
			type: 'select',
			options: [],
			textField: 'title',
			valueField: 'Id',
			customOption(field) {
				field.options = this.state.list
			},
			onChange(v, onlyComponentKey) {
				if (v) {
					axios
						.get('cms/ApiActivityMaterialConfig/detail', {
							params: {
								Id: v,
								Type: 6,
							},
						})
						.then((res) => {
							this.props.updateComponent({
								Key: onlyComponentKey,
								ComponentData: {
									CommonActivityMaterialPkId: v,
									IRecommendGiftForReceivePageRes: res.data?.Data,
								},
							})
						})
				}
			},
		},
	],
})
