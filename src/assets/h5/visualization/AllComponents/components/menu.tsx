import * as React from 'React'
import Hoc from './hoc.jsx'
import ITable from './ITable/index1.jsx'
import ITableSetting from './ITable/setting1'

export const importComponent = (name: string, ComponentData: any = {}) => {
	switch (name) {
		case 'ITable':
			return Hoc(
				ITable,
				'video-camera',
				'ITable',
				'表格组件',
				{},
				ITableSetting,
				ComponentData
			)
		default:
			return null
	}
}
// 组件初始化值

const HocITable = importComponent('ITable', {
	config: {
		listBlock: {
			listUrl: {
				apiHost: '',
				apiUrl: 'ApiBaseData/listProvince',
				apiParam: {},
			},
			listField: [
				{ key: 'area_id', title: '编号', type: 'text', fieldShow: '1' },
				{
					key: 'is_direct',
					fieldType: 2,
					title: '任务状态',
					fieldSort: 0,
					fieldShow: 1,
					// type: 'text',
					type: 'switch',
					btnOptions: {
						apiHost: '',
						apiUrl: 'dev/ApiQueueTask/switchQueue', //针对switch切换按钮的接口
						apiParam: { KHDDH: '', sex: '' }, // switch需要参数
					},
				},
			],
			// clickModel: [{ key: '', title: '' }],
			clickModel: [],
		},
		headBlock: {
			operateBox: {
				operationWidth: 100,
				hiddenTableRefreshBtn: false,
				hiddenHigherSearch: false,
				hiddenCopyRowBtn: false,
				enableMultiSelected: false,
			},
			searchBox: [
				{
					key: 'area_name',
					title: '省份',
					type: 'select',
					fieldShow: '1',
					options: [{ text: '北京市', value: '北京市' }],
					props: { style: { width: '80px' } },
				},
			],
		},
		headBtnBlock: [
			{
				unionId: '',
				btnTitle: '导出',
				type: 'exportBtn',
				btnForm: {
					btnUrl: {
						apiHost: '',
						apiUrl: 'ApiBaseData/listProvinceExport',
						apiParam: '',
					},
				},
			},
			{
				unionId: '',
				btnTitle: '跳转',
				type: 'jumpBtn',
				btnForm: {
					pageKey: 'taskList',
					props: {
						pageType: 'xcx',
						Id: 108,
					},
				},
			},
		],
		listBtnBlock: [
			{
				unionId: 'apibasedataprovincemanageApiAreaswitchStatus',
				btnTitle: '关闭',
				type: 'closedBtn',
				// type: 'delBtn',
				btnForm: {
					warnObj: { txt: '是否确认关闭吗？', key: 'area_id' },
					btnUrl: {
						apiHost: '',
						apiUrl: 'ApiArea/switchStatus',
						apiParam: { areaId: '', area_id: '', status: '' },
					},
				},
			},
			{
				unionId: 'apibasedataprovincemanageApiAreaswitchStatus',
				btnTitle: '编辑',
				type: 'submitBtn',
				btnForm: {
					btnUrl: {
						addApiUrl: {
							apiHost: '',
							apiUrl: 'ApiBaseData/provinceDetail',
							apiParam: { Id: '' },
						},
						detailApiUrl: {
							apiHost: '',
							apiUrl: 'ApiBaseData/provinceDetail',
							apiParam: { Id: '' },
						},
						saveApiUrl: {
							apiHost: '',
							apiUrl: 'ApiBaseData/editProvince',
							apiParam: { Id: '' },
						},
					},
					formElement: [
						{
							key: 'BH',
							title: '编号',
							type: 'text',
							props: '',
							rule: '',
						},
					],
				},
			},
		],
		commonBtnBlock: [],
	},
})
export default class NewMenu extends React.Component<any, any> {
	constructor(props: any) {
		super(props)
	}
	render() {
		return (
			<div>
				<HocITable {...this.props} />
			</div>
		)
	}
}
