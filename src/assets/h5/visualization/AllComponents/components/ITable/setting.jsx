import React from 'react'
import HocForm from '../../../../higherComponent/HocForm'
import { getSelection, selectionStore } from '../../../../../common/store'
let objOfchangeMaxColSize = {}
let delayTimeFn_Icoupon

let tableData = [
	{
		id: 1,
		name: '张1建辉',
		date: '2021-05-17',
		email: 'romario70@qq.com',
		phoneNumber: '17137564247',
		gender: '男',
	},
	{
		id: 2,
		name: '卢子轩',
		date: '2019-07-16',
		email: 'lovely.luzixuan@163.com',
		phoneNumber: '17110230998',
		gender: '女',
	},
	{
		id: 3,
		name: '范越彬',
		date: '2020-12-27',
		email: 'gisel_bin34@qq.com',
		phoneNumber: '18875259170',
		gender: '男',
	},
	{
		id: 4,
		name: '薛立诚',
		date: '2019-11-28',
		email: 'wilma68@163.com',
		phoneNumber: '17111461612',
		gender: '男',
	},
	{
		id: 5,
		name: '龚子默',
		date: '2019-12-03',
		email: 'silencer_gong@gmail.com',
		phoneNumber: '16683012636',
		gender: '男',
	},
	{
		id: 6,
		name: '刘晟睿',
		date: '2019-06-03',
		email: 'liu_reynolds34@126.com',
		phoneNumber: '18888119131',
		gender: '女',
	},
	{
		id: 7,
		name: '萧雪松',
		date: '2020-02-09',
		email: 'realmadrid_xiao1995@gmail.com',
		phoneNumber: '18871452348',
		gender: '女',
	},
	{
		name: '沈晋鹏',
		date: '2019-07-14',
		email: 'rachelle5@gmail.com',
		phoneNumber: '13254036165',
		gender: '男',
		id: 8,
	},
	{
		name: '洪明哲',
		date: '2019-07-11',
		email: 'mingzhe67@sina.com',
		phoneNumber: '17155089400',
		gender: '女',
		id: 9,
	},
	{
		name: '戴彬',
		date: '2021-05-29',
		email: 'zelma.dai@hotmail.com',
		phoneNumber: '18849094541',
		gender: '女',
		id: 10,
	},
	{
		name: '周昊天',
		date: '2020-05-02',
		email: 'joannie_beatty88@gmail.com',
		phoneNumber: '13234021406',
		gender: '女',
		id: 11,
	},
	{
		name: '崔子涵',
		date: '2022-03-08',
		email: 'carlos_crona66@sina.com',
		phoneNumber: '13256894564',
		gender: '女',
		id: 12,
	},
	{
		name: '胡思',
		date: '2019-11-28',
		email: 'garland_labadie@sohu.com',
		phoneNumber: '13104286197',
		gender: '男',
		id: 13,
	},
	{
		name: '赵嘉熙',
		date: '2021-01-02',
		email: 'mitchel75@sohu.com',
		phoneNumber: '13121266906',
		gender: '女',
		id: 14,
	},
	{
		name: '李鸿煊',
		date: '2020-10-03',
		email: 'trent_runte@hotmail.com',
		phoneNumber: '17122462652',
		gender: '女',
		id: 15,
	},
	{
		name: '黄烨磊',
		date: '2021-04-02',
		email: 'jean10@gmail.com',
		phoneNumber: '17109314490',
		gender: '女',
		id: 16,
	},
	{
		name: '傅瑞霖',
		date: '2019-08-24',
		email: 'libbie58@hotmail.com',
		phoneNumber: '16623924476',
		gender: '女',
		id: 17,
	},
	{
		name: '崔文博',
		date: '2020-07-23',
		email: 'alycia_ferry74@sohu.com',
		phoneNumber: '13997971072',
		gender: '男',
		id: 18,
	},
]
export default HocForm({
	onInitValues(values) {
		// if()
	},
	field: [
		{
			title: '数据',
			key: 'dataSource',
			type: 'textarea',
			// fieldSet: {
			// 	initialValue: JSON.stringify(tableData),
			// },
		},
		{
			title: '表格列字段接口',
			key: 'columnsApi',
			type: 'text',
			render() {
				return <div>提供给表格列字段的接口</div>
			},
			// fieldSet: {
			// 	initialValue: JSON.stringify(tableData),
			// },
		},
		{
			title: '列',
			key: 'columns',
			type: 'tableInput',
			props: {
				onRemove: function (v, i, record) {
					console.log('onRemo is ', v, i, record, this)
					let newRecord = record
					newRecord.splice(i, 1)
					this.props.onChange(newRecord)
					this.props.parent.props.updateComponent({
						Key: this.props.parent.ComponentKey,
						ComponentData: {
							columns: this.props.value,
						},
					})
				},
				onValueChange: function (value) {},
				selection: {},
				withoutRemove: false,
				withoutModal: true,
				modalColumns: [],
				maxColSize: 6,
				columns: [
					{
						title: '列名称',
						key: 'FieldTitle',
						type: 'text',
						width: 100,
						editable: true,
						onChange: function (record, index, v, vItem) {
							if (vItem) {
								record.FieldTitle = vItem.FieldTitle
								this.props.parent.props.updateComponent({
									Key: this.props.parent.ComponentKey,
									ComponentData: {
										columns: this.props.value,
									},
								})
							}
						},
					},
					{
						title: '列名称-字段',
						key: 'FieldName',
						type: 'text',
						width: 100,
						editable: true,
						onChange: function (record, index, v, vItem) {
							if (vItem) {
								record.FieldName = vItem.FieldName
								this.props.parent.props.updateComponent({
									Key: this.props.parent.ComponentKey,
									ComponentData: {
										columns: this.props.value,
									},
								})
							}
						},
					},
					{
						title: '字段类型',
						key: 'FieldShowType',
						type: 'select',
						options: [],
					},
				],
			},
		},
		{
			title: '预约按钮图片',
			key: 'ImageArr',
			// type: 'files',
			isShowFn(v) {
				return v.YuyueButtonType == '1'
			},
			render() {
				return (
					<div>
						提示：建议上传图片659*89px，图片格式jpg、png、gif，图片大小不超过300k。
					</div>
				)
			},
			type: 'arrayOfNewLayOut',
			props: {
				changeMaxColSize(value) {
					objOfchangeMaxColSize = Object.assign(
						{},
						{
							[this.props.parent.ComponentKey]: 1,
						}
					)
					return objOfchangeMaxColSize
				},
			},
			rule: [{ required: true, message: '请选择图片' }],
			options: [
				{
					title: '图片',
					key: 'ImageSrc',
					type: 'files',
					props: {
						data: { Type: '2' },
						accept: 'image/*',
						url: 'cms/ApiEventTemplate/uploadImg',
						urlOnly: true,
						single: true,
						withoutMsg: false,
						limitWidth: 659,
					},
				},
				{
					title: '跳转类型',
					key: 'RedirectType',
					type: 'select',
					options: [
						{ text: '不跳转', value: '0' },
						{ text: '指定链接，H5页面', value: '25' },
						{ text: '原生页', value: '55' },
					],
					// onChange(r, v) {
					//   RedirectType_VIPAdForm_ISingleImage = r.RedirectType;
					// },
				},
				{
					title: '跳转链接',
					key: 'RedirectLink',
					type: 'text',
					editable: true,
					// onChange(v, i) {
					//   console.log(this, "text onChange is", v, i);
					// },
					isShowFn(v) {
						return v.RedirectType == '25'
					},
				},
				{
					title: '原生页类型',
					key: 'NativePageType',
					type: 'select',
					options: [
						{ text: '预约量体页', value: '6' }, // Name NativePageType=6
						{ text: 'VIP会员订购页', value: '12' },
						{ text: 'VIP中心', value: '1' }, // 使用29  // IsHideTopView:0,1  // NativePageType=1 117
						{ text: '商品列表', value: '27' }, // ShopSubCategoryName ShopSubCategoryId //
						{ text: '预设商品详情', value: '7' }, // CateId
						{ text: 'AI定制商品详情', value: '77' }, // CateId
						// { text: "搭配LOOK", value: "-1" },
						{ text: '限时秒杀', value: '26' }, // hSaleId  ShopItemId  FlashSaleStatus:1,2,3
						{ text: '我的优惠券', value: '4' },
						{ text: '我的钱包', value: '5' },
						{ text: '我的身材数据', value: '117' }, // IsHideTopView:0,1
						{ text: '置衣卡详情', value: '32' }, // CardNumber
						{ text: '搭配LOOK详情', value: '31' }, // LookItemId
						{ text: '会员中心首页', value: '39' }, // 会员中心
						{ text: "拍照量体身材数据", value: "501" }, // 拍照量体身材数据

					],
					editable: true,
					width: 200,
					isShowFn(v) {
						return v.RedirectType == '55'
					},
				},
				{
					title: '商品列表一级标签',
					key: 'ShopSubCategoryIdF',
					type: 'select',
					options: 'ShoppingList',
					textField: 'Name',
					valueField: 'CateId',
					unBindOptions: true,
					isShowFn(v) {
						return v.NativePageType == '27' && v.RedirectType == '55'
					},
					onChange: function (v, vItem) {
						if (v) {
							getSelection
								.call(this, 'ShoppingListSecond', {
									params: { CateId: v },
								})
								.then((datas) => {
									let field = this.props.options.find(
										(item) => item.key == 'ShopSubCategoryIdS'
									)
									field.options[vItem] = datas.list
									this.forceUpdate()
								})
						}
					},
				},
				{
					title: '商品列表二级标签',
					key: 'ShopSubCategoryIdS',
					// options: "ShoppingListSecond",
					options: [],
					type: 'select',
					textField: 'Name',
					valueField: 'CateId',
					// optionsWithIndex: true,
					unBindOptions: true,
					isShowFn(v) {
						return v.NativePageType == '27' && v.RedirectType == '55'
					},
					onChange: function (v, vItem) {
						if (v) {
							getSelection
								.call(this, 'ShoppingListThird', {
									params: { CateId: v },
								})
								.then((datas) => {
									let field = this.props.options.find(
										(item) => item.key == 'ShopSubCategoryId'
									)
									console.log('field is ', field, vItem, datas)
									field.options[vItem] = datas.list
									this.forceUpdate()
									// if (!initShopSubCategoryIdS[vItem]) {
									//   initShopSubCategoryIdS[vItem]=1
									//   return;
									// }
									// this.props.value[vItem].ShopSubCategoryId = "";
									// this.props.onChange(this.props.value);
								})
						}
					},
				},
				{
					title: '商品列表标签',
					key: 'ShopSubCategoryId',
					// options: "ShoppingListThird",
					options: [],
					type: 'select',
					textField: 'Name',
					valueField: 'CateId',
					unBindOptions: true,
					// optionsWithIndex: true,
					isShowFn(v) {
						return v.NativePageType == '27' && v.RedirectType == '55'
					},
				},
				{
					title: '渠道名',
					key: 'Name',
					type: 'text',
					isShowFn(v) {
						return false
						return v.NativePageType == '6'
					},
				},
				{
					title: '是否显示顶部导航',
					key: 'IsHideTopView',
					type: 'select',
					options: [
						{ text: '是', value: '1' },
						{ text: '否', value: '0' },
					],
					isShowFn(v) {
						return false
					},
				},
				{
					title: '预设商品ID',
					key: 'CateId',
					type: 'text',
					isShowFn(v) {
						return (
							(v.NativePageType == '7' && v.RedirectType == '55') ||
							(v.NativePageType == '77' && v.RedirectType == '55')
						)
					},
				},
				{
					title: '秒杀场次ID',
					key: 'FlashSaleId',
					type: 'text',
					isShowFn(v) {
						return false
					},
				},
				{
					title: '秒杀商品ID',
					key: 'ShopItemId',
					type: 'text',
					isShowFn(v) {
						return false
						return v.NativePageType == '26'
					},
				},
				{
					title: '秒杀状态',
					key: 'FlashSaleStatus',
					type: 'select',
					options: [
						{ text: '本场秒杀距开始还有', value: '1' },
						{ text: '本场秒杀距结束还有', value: '2' },
						{ text: '本场秒杀已结束', value: '3' },
					],
					isShowFn(v) {
						return false
						return v.NativePageType == '26'
					},
				},
				{
					title: '置衣卡',
					key: 'CardNumber',
					type: 'select',
					valueField: 'Id',
					textField: 'Name',
					options: 'zhiyikaIdToCardNameList',
					isShowFn(v) {
						return v.NativePageType == '32' && v.RedirectType == '55'
					},
				},
				{
					title: '搭配Look',
					key: 'LookItemId',
					type: 'select',
					valueField: 'Id',
					textField: 'Name',
					options: 'CollocationLookIdAndName',
					isShowFn(v) {
						return v.NativePageType == '31' && v.RedirectType == '55'
					},
				},
			],
		},
	],
})
