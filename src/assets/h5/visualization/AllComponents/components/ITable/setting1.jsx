import React from 'react'
import {
	Form,
	Input,
	Button,
	Checkbox,
	Radio,
	Switch,
	Row,
	Col,
	InputNumber,
	message,
	Select,
	Divider,
	Card,
	Collapse,
	Icon,
	Modal,
} from 'antd'
import _ from 'lodash'
import ReactJson from 'react-json-view'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import axios from 'axios'
import deepmerge from 'deepmerge'
const { Option } = Select
const formItemLayoutWithOutLabel = {
	wrapperCol: {
		span: 18,
		offset: 1,
	},
}

const inlineBlockStyle = {
	style: {
		display: 'inline-block',
	},
}

const blockStyle = {
	style: {
		display: 'block',
	},
}
const inlineLayout = {
	labelCol: {
		span: 8,
	},
	wrapperCol: {
		span: 16,
	},
	...inlineBlockStyle,
}

const itemLayout = {
	labelCol: {
		span: 6,
	},
	wrapperCol: {
		span: 16,
		offset: 1,
	},
	...blockStyle,
}

const itemChildLayout = {
	labelCol: {
		span: 6,
	},
	wrapperCol: {
		span: 16,
		offset: 1,
	},
	...inlineBlockStyle,
}
const settingLayout = {
	labelCol: {
		span: 6,
	},
	wrapperCol: {
		span: 16,
		offset: 1,
	},
	...blockStyle,
}

const operateSearchBoxLayout = {
	labelCol: {
		span: 10,
	},
	wrapperCol: {
		span: 14,
	},
	style: {
		display: 'inline-block',
	},
}

const hiddenFormItem = {
	display: 'none',
}
let jsonOfconfig = {}

const elTypeList = [
	{
		name: '文本',
		value: 'text',
	},
	{
		name: '开关',
		value: 'switch',
	},
	{
		name: '单选',
		value: 'select',
	},
	{
		name: '多选',
		value: 'multiSelect',
	},
	{
		name: '数字',
		value: 'number',
	},
	{
		name: '省份',
		value: 'provice',
	},
	{
		name: '省市区',
		value: 'proviceCityArea',
	},
]

const optionOfElTypeList = elTypeList.map((item) => (
	<Option value={item.value} key={item.value}>
		{item.name}
	</Option>
))

const renderSelectOptions = (arr) =>
	arr.map((item) => (
		<Option value={item.value} key={item.value}>
			{item.name}
		</Option>
	))

// 头部按钮操作
const optionOfHeadBtnBlock = [
	{
		name: '新增',
		value: 'addBtn',
	},
	{
		name: '跳转', // 跳转到新的编辑页中
		value: 'jumpBtn',
	},
	{
		name: '导出',
		value: 'exportBtn',
	},
	{
		name: '删除',
		value: 'delBtn',
	},
	// {
	// 	name: '提交',
	// 	value: 'submitBtn',
	// },
].map((item) => (
	<Option value={item.value} key={item.value}>
		{item.name}
	</Option>
))

// 列表按钮类型
const optionOfListBtnBlock = [
	{
		name: '关闭',
		value: 'closedBtn',
	},
	{
		name: '删除',
		value: 'delBtn',
	},
	{
		name: '编辑',
		value: 'submitBtn',
	},
].map((item) => (
	<Option value={item.value} key={item.value}>
		{item.name}
	</Option>
))

class ConfigJsonToTable extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			isOpenModal: false,
			isInputListFieldJSON: false,
			isShowExportUrl: false,
			config: {
				listBlock: {
					listUrl: {
						apiHost: '',
						apiUrl: '',
						apiParam: {},
					},
					listField: [
						{
							key: '',
							title: '',
							fieldShow: '',
							type: '',
						},
					],
					clickModel: [],
				},
				headBlock: {
					tableTitle: '',
					searchBox: [],
					operateBox: {
						operationWidth: '140',
						hiddenTableRefreshBtn: false,
						hiddenHigherSearch: false,
						hiddenCopyRowBtn: false,
						hiddenCopyColumnBtn: false,
						hiddenBtnExport: false,
						enableMultiSelected: false,
					},
				},
				headBtnBlock: [],
				listBtnBlock: [],
				commonBtnBlock: [],
			},

			hostOptions: {},
		}
	}
	changeIsOpenModal() {
		this.setState({
			isOpenModal: !this.state.isOpenModal,
		})
	}
	setIsInputListFieldJSON(isInputListFieldJSON) {
		this.setState({
			isInputListFieldJSON,
		})
	}

	setIsShowExportUrl(isShowExportUrl) {
		this.setState({
			isShowExportUrl,
		})
	}

	copyJson() {
		message.success('复制成功')
	}

	handleSubmit() {
		this.props.form.validateFieldsAndScroll({ force: true }, (err, params) => {
			if (err) {
				return
			}
			params = this.props.form.getFieldsValue()
			this.setState({ loading: true })
			let url = `ApiManageTemplate/saveEdit`
			params.template_content = [params.config]
			delete params.config

			axios
				.post(url, params)
				.then((rsp) => {
					this.setState({ loading: false })
					window.vm.closeAndJumpToAndRefresh('templateConfig')
				})
				.catch((err) => {
					this.setState({ loading: false })
					window.vm.closeAndJumpToAndRefresh('templateConfig')
				})
		})
	}

	// 添加配置相关字段，公共方法
	addAttrCommon(attr, attrObj) {
		let newData = _.cloneDeep(this.state.config)
		const combineMerge = (target, source, options) => {
			const destination = target.slice()

			source.forEach((item, index) => {
				if (typeof destination[index] === 'undefined') {
					destination[index] = options.cloneUnlessOtherwiseSpecified(
						item,
						options
					)
				} else if (options.isMergeableObject(item)) {
					destination[index] = deepmerge(target[index], item, options)
				} else if (target.indexOf(item) === -1) {
					destination.push(item)
				}
			})
			return destination
		}

		// 在增加表单配置的时候formElement会丢失，故特殊处理
		// let item = _.get(jsonOfconfig.config ?? jsonOfconfig, attr)
		let mergeObj = deepmerge(newData, jsonOfconfig.config ?? jsonOfconfig, {
			arrayMerge: combineMerge,
		})
		let item = _.get(newData, attr)
		item.push({
			// key: '',
			// title: '',
			// type: 'text',
			// fieldShow: '1',
			...attrObj,
		})
		_.set(mergeObj, attr, item)
		this.setState({
			config: mergeObj,
		})
	}

	// 删除配置相关字段，公共方法
	removeAttrCommon(attr, i) {
		let newData = _.cloneDeep(this.state.config)
		let item = _.get(jsonOfconfig.config ?? jsonOfconfig, attr)
		item.splice(i, 1)
		_.set(newData, attr, item)
		this.setState({
			config: newData,
		})
		this.props.form.resetFields(['config'])
	}

	// 排序，上移
	upIndexOfAttr(attr, i) {
		let newData = _.cloneDeep(this.state.config)
		let item = _.get(jsonOfconfig.config ?? jsonOfconfig, attr)

		function upGo(fieldData, index) {
			if (index != 0) {
				fieldData[index] = fieldData.splice(index - 1, 1, fieldData[index])[0]
			} else {
				fieldData.push(fieldData.shift())
			}
			return fieldData
		}
		item = upGo(item, i)
		_.set(newData, attr, item)
		this.setState({
			config: newData,
		})
		this.props.form.resetFields(['config'])
	}
	// 排序， 下降
	downIndexOfAttr(attr, i) {
		let newData = _.cloneDeep(this.state.config)
		let item = _.get(jsonOfconfig.config ?? jsonOfconfig, attr)

		function downGo(fieldData, index) {
			if (index != fieldData.length - 1) {
				fieldData[index] = fieldData.splice(index + 1, 1, fieldData[index])[0]
			} else {
				fieldData.unshift(fieldData.splice(index, 1)[0])
			}
			return fieldData
		}
		item = downGo(item, i)
		_.set(newData, attr, item)
		this.setState({
			config: newData,
		})
		this.props.form.resetFields(['config'])
	}

	// 表格字段
	renderListBlockListFieldEl() {
		const { getFieldDecorator, getFieldValue } = this.props.form
		const { config } = this.state

		const attr = 'listBlock.listField'
		return (
			<Collapse.Panel key="1">
				{config.listBlock.listField.map((item, k) => {
					return (
						<Collapse key={k}>
							<Collapse.Panel
								header={`配置(${config.listBlock.listField[k].title})`}
								extra={this.renderCollapsePanelExtra(attr, k)}
							>
								<Form.Item key={k}>
									<Form.Item label={'主键'} {...itemChildLayout}>
										{getFieldDecorator(`config.listBlock.listField[${k}].key`, {
											initialValue: config.listBlock.listField[k].key,
										})(<Input />)}
									</Form.Item>
									<Form.Item label={'名称'} {...itemChildLayout}>
										{getFieldDecorator(
											`config.listBlock.listField[${k}].title`,
											{
												initialValue: config.listBlock.listField[k].title,
											}
										)(<Input />)}
									</Form.Item>
									<Form.Item label={'组件类型'} {...itemChildLayout}>
										{getFieldDecorator(
											`config.listBlock.listField[${k}].type`,
											{
												initialValue: config.listBlock.listField[k].type,
											}
										)(
											<Select placeholder="组件类型">
												{optionOfElTypeList}
											</Select>
										)}
									</Form.Item>
									{['switch'].includes(
										getFieldValue('config').listBlock.listField[k].type
									) ? (
										<Form.Item label="配置" {...settingLayout}>
											<Card title="配置">
												<Form.Item label="域名" {...settingLayout}>
													{getFieldDecorator(
														`config.listBlock.listField[${k}].btnOptions.apiHost`,
														{
															initialValue:
																config?.listBlock?.listField[k]?.btnOptions
																	?.apiHostt ?? '',
														}
													)(this.renderHostOptionsEl())}
												</Form.Item>
												<Form.Item label="链接" {...settingLayout}>
													{getFieldDecorator(
														`config.listBlock.listField[${k}].btnOptions.apiUrl`,
														{
															initialValue:
																config?.listBlock?.listField[k]?.btnOptions
																	.apiUrl ?? '',
														}
													)(<Input />)}
												</Form.Item>
												<Form.Item label="参数，JSON形式" {...settingLayout}>
													{getFieldDecorator(
														`config.listBlock.listField[${k}].btnOptions.apiParam`,
														{
															initialValue:
																config.listBlock?.listField[k]?.btnOptions
																	?.apiParam ?? '',
														}
													)(<Input.TextArea />)}
												</Form.Item>
											</Card>
										</Form.Item>
									) : null}

									<Form.Item label={'显示'} {...itemChildLayout}>
										{getFieldDecorator(
											`config.listBlock.listField[${k}].fieldShow`,
											{
												initialValue: config.listBlock.listField[k].fieldShow,
											}
										)(
											<Select placeholder="是否显示">
												<Option value="1">是</Option>
												<Option value="0">否</Option>
											</Select>
										)}
									</Form.Item>

									{config.listBlock.listField.length > 0 ? (
										<Form.Item {...itemChildLayout}>
											<Button
												type="dashed"
												onClick={() => this.removeAttrCommon(attr, k)}
												style={{ width: '40%' }}
												icon={'delete'}
											>
												删除
											</Button>
										</Form.Item>
									) : null}
								</Form.Item>
							</Collapse.Panel>
						</Collapse>
					)
				})}
				<Button
					type="dashed"
					onClick={() =>
						this.addAttrCommon(attr, {
							key: '',
							title: '',
							type: '',
							fieldShow: '',
						})
					}
					style={{
						width: '40%',
					}}
				>
					添加表格字段
				</Button>
			</Collapse.Panel>
		)
	}

	// 子表格
	renderListBlockClickModelEl() {
		const { getFieldDecorator } = this.props.form
		const { config } = this.state

		return (
			<Form.Item
				label="子表格"
				labelCol={{
					span: 2,
				}}
				wrapperCol={{
					span: 22,
				}}
				style={{
					display: 'inline-block',
					width: '1200px',
				}}
			>
				{config.listBlock.clickModel.map((item, k) => {
					return (
						<Card key={k}>
							<Collapse>
								<Collapse.Panel
									header={`名称(${config.listBlock.clickModel[k]?.title})`}
								>
									<Form.Item label="键值(key)" {...itemChildLayout}>
										{getFieldDecorator(
											`config.listBlock.clickModel[${k}].key`,
											{
												initialValue: config.listBlock.clickModel[k]?.key,
											}
										)(<Input />)}
									</Form.Item>
									<Form.Item label="名称" {...itemChildLayout}>
										{getFieldDecorator(
											`config.listBlock.clickModel[${k}].title`,
											{
												initialValue: config.listBlock.clickModel[k]?.title,
											}
										)(<Input />)}
									</Form.Item>
									<Form.Item label="参数，JSON形式" {...itemChildLayout}>
										{getFieldDecorator(
											`config.listBlock.clickModel[${k}].apiParam`,
											{
												initialValue:
													config.listBlock.clickModel[k]?.apiParam ?? '',
											}
										)(<Input />)}
									</Form.Item>
									{config.listBlock.clickModel.length > 0 ? (
										<Button
											type="dashed"
											onClick={() =>
												this.removeAttrCommon('listBlock.clickModel', k)
											}
											style={{ width: '40%' }}
											icon={'delete'}
										>
											删除单个子表格配置
										</Button>
									) : null}
								</Collapse.Panel>
							</Collapse>
						</Card>
					)
				})}
				<Button
					type="dashed"
					onClick={() =>
						this.addAttrCommon('listBlock.clickModel', {
							key: '',
							title: '',
						})
					}
					style={{
						width: '40%',
					}}
				>
					添加子表格模型
				</Button>
			</Form.Item>
		)
	}

	// 废弃 ,e.stopPropagation 不生效
	renderCollapsePanelExtra(attr, k) {
		return (
			<div>
				<Icon
					type="up-square"
					onClick={(e) => {
						this.upIndexOfAttr(attr, k)
						e.stopPropagation()
					}}
					style={{
						marginRight: '10px',
					}}
				/>
				<Icon
					type="down-square"
					onClick={(e) => {
						this.downIndexOfAttr(attr, k)
						e.stopPropagation()
					}}
				/>
			</div>
		)
	}

	// 搜索框选项
	renderSearchBox() {
		const { getFieldDecorator, getFieldValue } = this.props.form
		const { config } = this.state
		const attr = 'headBlock.searchBox'
		return (
			<Card title="搜索框选项">
				{config.headBlock.searchBox.map((item, k) => {
					return (
						<Collapse key={k}>
							<Collapse.Panel
								header={`配置(${config.headBlock.searchBox[k].title})`}
								extra={this.renderCollapsePanelExtra(attr, k)}
							>
								<Form.Item label={'主键'} {...itemChildLayout}>
									{getFieldDecorator(`config.headBlock.searchBox[${k}].key`, {
										initialValue: config.headBlock.searchBox[k].key,
									})(<Input />)}
								</Form.Item>
								<Form.Item label={'标签'} {...itemChildLayout}>
									{getFieldDecorator(`config.headBlock.searchBox[${k}].title`, {
										initialValue: config.headBlock.searchBox[k].title,
									})(<Input />)}
								</Form.Item>
								<Form.Item
									style={{
										display:
											getFieldValue(`config.headBlock.searchBox[${k}].type`) ==
											'select'
												? 'block'
												: 'inline-block',
									}}
								>
									<Form.Item label={'类型'} {...itemChildLayout}>
										{getFieldDecorator(
											`config.headBlock.searchBox[${k}].type`,
											{
												initialValue: config.headBlock.searchBox[k].type,
											}
										)(
											<Select placeholder="组件类型">
												{renderSelectOptions([
													{
														name: '选择',
														value: 'select',
													},
												])}
											</Select>
										)}
									</Form.Item>
									{getFieldValue(`config.headBlock.searchBox[${k}].type`) ==
									'select' ? (
										<Form.Item label="配置" {...itemChildLayout}>
											{/* 组件实现过程中直接进行类型判断吧，不然太多 */}
											<Form.Item label="选项（options）,JSON形式字符串或者键值字符串">
												{getFieldDecorator(
													`config.headBlock.searchBox[${k}].options`,
													{
														initialValue: config.headBlock.searchBox[k].options,
													}
												)(<Input.TextArea />)}
											</Form.Item>
											<Form.Item label="属性（props）,JSON形式字符串">
												{getFieldDecorator(
													`config.headBlock.searchBox[${k}].props`,
													{
														initialValue: config.headBlock.searchBox[k].props,
													}
												)(<Input.TextArea />)}
											</Form.Item>
										</Form.Item>
									) : null}
								</Form.Item>
								<Form.Item label={'显示'} {...itemChildLayout}>
									{getFieldDecorator(
										`config.headBlock.searchBox[${k}].fieldShow`,
										{
											initialValue: config.headBlock.searchBox[k].fieldShow,
										}
									)(
										<Select placeholder="是否显示">
											<Option value="1">是</Option>
											<Option value="0">否</Option>
										</Select>
									)}
								</Form.Item>
								<Form.Item
									{...itemChildLayout}
									style={{
										display: 'block',
									}}
								>
									<Button
										type="dashed"
										onClick={() =>
											this.removeAttrCommon('headBlock.searchBox', k)
										}
										style={{ width: '40%' }}
										icon="delete"
									>
										删除单个搜索框配置
									</Button>
								</Form.Item>
							</Collapse.Panel>
						</Collapse>
					)
				})}
				<Form.Item>
					<Button
						type="dashed"
						onClick={() =>
							this.addAttrCommon('headBlock.searchBox', {
								title: '',
								key: '',
								type: '',
								options: [],
								props: '',
							})
						}
						style={{ width: '20%' }}
						icon="file-add"
					>
						添加单个搜索框配置
					</Button>
				</Form.Item>
			</Card>
		)
	}

	renderFormEl(parentEl = 'headBtnBlock', btnTypeList = []) {
		const { getFieldDecorator, getFieldValue } = this.props.form
		const { config } = this.state
		const attr = parentEl
		return (
			<Form.Item
				label="按钮"
				labelCol={{
					span: 2,
				}}
				wrapperCol={{
					span: 22,
				}}
				style={{
					display: 'inline-block',
					width: '1200px',
				}}
			>
				{config[parentEl].map((item, k) => {
					return (
						<Collapse key={k}>
							<Collapse.Panel
								header={`配置(${config[parentEl][k].btnTitle})`}
								extra={this.renderCollapsePanelExtra(attr, k)}
							>
								<Form.Item
									label={'unionId'}
									labelCol={{
										span: 6,
									}}
									wrapperCol={{
										span: 18,
									}}
									style={{
										display: 'inline-block',
									}}
								>
									{getFieldDecorator(`config[${parentEl}][${k}].unionId`, {
										initialValue: config[parentEl][k].unionId,
									})(<Input />)}
								</Form.Item>

								<Form.Item
									label={'按钮名称'}
									labelCol={{
										span: 6,
									}}
									wrapperCol={{
										span: 18,
									}}
									style={{
										display: 'inline-block',
									}}
								>
									{getFieldDecorator(`config[${parentEl}][${k}].btnTitle`, {
										initialValue: config[parentEl][k].btnTitle,
									})(<Input />)}
								</Form.Item>

								<Form.Item
									label={'按钮类型'}
									labelCol={{
										span: 6,
									}}
									wrapperCol={{
										span: 18,
									}}
									style={{
										display: 'inline-block',
									}}
								>
									{getFieldDecorator(`config[${parentEl}][${k}].type`, {
										initialValue: config[parentEl][k].type,
									})(<Select placeholder="组件类型">{btnTypeList}</Select>)}
								</Form.Item>
								{['delBtn', 'closedBtn'].includes(
									getFieldValue('config')[parentEl][k].type
								) ? (
									<Form.Item
										label="配置"
										labelCol={{
											span: 2,
										}}
										wrapperCol={{
											span: 18,
										}}
									>
										<Collapse>
											<Collapse.Panel>
												<Form.Item
													label="文案"
													labelCol={{
														span: 6,
													}}
													wrapperCol={{
														span: 18,
													}}
													style={{
														display: 'inline-block',
														width: '300px',
													}}
												>
													{getFieldDecorator(
														`config[${parentEl}][${k}].btnForm.warnObj.txt`,
														{
															initialValue:
																config[parentEl][k]?.btnForm?.warnObj?.txt ??
																'',
														}
													)(<Input.TextArea />)}
												</Form.Item>

												<Form.Item
													label="判断显示字段 "
													labelCol={{
														span: 12,
													}}
													wrapperCol={{
														span: 12,
													}}
													style={{
														display: 'inline-block',
														width: '300px',
													}}
												>
													{getFieldDecorator(
														`config[${parentEl}][${k}].btnForm.warnObj.key`,
														{
															initialValue:
																config[parentEl][k]?.btnForm?.warnObj?.key ??
																'',
														}
													)(<Input />)}
												</Form.Item>

												<Form.Item
													label="域名"
													labelCol={{
														span: 6,
													}}
													wrapperCol={{
														span: 18,
													}}
													style={{
														display: 'inline-block',
														width: '300px',
													}}
												>
													{getFieldDecorator(
														`config[${parentEl}][${k}].btnForm.btnUrl.apiHost`,
														{
															initialValue:
																config[parentEl][k]?.btnForm?.btnUrl?.apiHost ??
																'',
														}
													)(this.renderHostOptionsEl())}
												</Form.Item>
												<Form.Item
													label="链接"
													labelCol={{
														span: 6,
													}}
													wrapperCol={{
														span: 18,
													}}
													style={{
														display: 'inline-block',
														width: '300px',
													}}
												>
													{getFieldDecorator(
														`config[${parentEl}][${k}].btnForm.btnUrl.apiUrl`,
														{
															initialValue:
																config[parentEl][k]?.btnForm?.btnUrl?.apiUrl ??
																'',
														}
													)(<Input />)}
												</Form.Item>
												<Form.Item
													label="参数"
													labelCol={{
														span: 6,
													}}
													wrapperCol={{
														span: 18,
													}}
													style={{
														display: 'inline-block',
														width: '300px',
													}}
												>
													{getFieldDecorator(
														`config[${parentEl}][${k}].btnForm.btnUrl.apiParam`,
														{
															initialValue:
																config[parentEl][k]?.btnForm?.btnUrl
																	?.apiParam ?? '',
														}
													)(<Input.TextArea />)}
												</Form.Item>
											</Collapse.Panel>
										</Collapse>
									</Form.Item>
								) : null}
								{['jumpBtn'].includes(
									getFieldValue('config')[parentEl][k].type
								) ? (
									<Form.Item
										label="跳转"
										labelCol={{
											span: 2,
										}}
										wrapperCol={{
											span: 20,
										}}
										style={{
											display: 'block',
										}}
									>
										<Collapse>
											<Collapse.Panel
												header={`配置${config[parentEl][k].btnForm?.pageKey}`}
											>
												<Form.Item label="菜单key" {...settingLayout}>
													{getFieldDecorator(
														`config[${parentEl}][${k}].btnForm.pageKey`,
														{
															initialValue:
																config[parentEl][k].btnForm?.pageKey ?? '',
														}
													)(<Input />)}
												</Form.Item>
												<Form.Item
													label="属性props，JSON形式"
													{...settingLayout}
												>
													{getFieldDecorator(
														`config[${parentEl}][${k}].btnForm.props`,
														{
															initialValue:
																config[parentEl][k]?.btnForm?.props ?? '',
														}
													)(<Input.TextArea />)}
												</Form.Item>
											</Collapse.Panel>
										</Collapse>
									</Form.Item>
								) : null}
								{['exportBtn'].includes(
									getFieldValue('config')[parentEl][k].type
								) ? (
									<Form.Item
										label="导出配置"
										labelCol={{
											span: 2,
										}}
										wrapperCol={{
											span: 16,
										}}
										style={{
											display: 'inline-block',
											width: '1200px',
											marginBottom: '5px',
										}}
									>
										<Collapse>
											<Collapse.Panel>
												<Form.Item label="域名" {...settingLayout}>
													{getFieldDecorator(
														`config[${parentEl}][${k}].btnForm.btnUrl.apiHost`,
														{
															initialValue:
																config[parentEl][k]?.btnForm?.btnUrl?.apiHost ??
																'',
														}
													)(this.renderHostOptionsEl())}
												</Form.Item>
												<Form.Item label="链接" {...settingLayout}>
													{getFieldDecorator(
														`config[${parentEl}][${k}].btnForm.btnUrl.apiUrl`,
														{
															initialValue:
																config[parentEl][k].btnForm?.btnUrl?.apiUrl ??
																'',
														}
													)(<Input />)}
												</Form.Item>
												<Form.Item label="参数，JSON形式" {...settingLayout}>
													{getFieldDecorator(
														`config[${parentEl}][${k}].btnForm.btnUrl.apiParam`,
														{
															initialValue:
																config[parentEl][k].btnForm?.btnUrl?.apiParam ??
																'',
														}
													)(<Input.TextArea />)}
												</Form.Item>
											</Collapse.Panel>
										</Collapse>
									</Form.Item>
								) : null}
								{/* 详情配置 */}
								{['submitBtn'].includes(
									getFieldValue('config')[parentEl][k].type
								) ? (
									<Form.Item
										label="详情配置"
										labelCol={{
											span: 2,
										}}
										wrapperCol={{
											span: 16,
										}}
										style={{
											display: 'inline-block',
											width: '1200px',
											marginBottom: '5px',
										}}
									>
										<Collapse>
											<Collapse.Panel>
												<Form.Item label="域名" {...settingLayout}>
													{getFieldDecorator(
														`config[${parentEl}][${k}].btnForm.btnUrl.detailApiUrl.apiHost`,
														{
															initialValue:
																config[parentEl][k].btnForm?.btnUrl
																	?.detailApiUrl?.apiHost ?? '',
														}
													)(this.renderHostOptionsEl())}
												</Form.Item>
												<Form.Item label="链接" {...settingLayout}>
													{getFieldDecorator(
														`config[${parentEl}][${k}].btnForm.btnUrl.detailApiUrl.apiUrl`,
														{
															initialValue:
																config[parentEl][k].btnForm?.btnUrl
																	?.detailApiUrl?.apiUrl ?? '',
														}
													)(<Input />)}
												</Form.Item>
												<Form.Item label="参数,JSON形式" {...settingLayout}>
													{getFieldDecorator(
														`config[${parentEl}][${k}].btnForm.btnUrl.detailApiUrl.apiParam`,
														{
															initialValue:
																config[parentEl][k].btnForm?.btnUrl
																	?.detailApiUrl?.apiParam ?? '',
														}
													)(<Input.TextArea />)}
												</Form.Item>
											</Collapse.Panel>
										</Collapse>
									</Form.Item>
								) : null}
								{/* 保存配置 */}
								{['submitBtn', 'addBtn'].includes(
									getFieldValue('config')[parentEl][k].type
								) ? (
									<Form.Item
										label="保存配置"
										labelCol={{
											span: 2,
										}}
										wrapperCol={{
											span: 16,
										}}
										style={{
											display: 'inline-block',
											width: '1200px',
											marginBottom: '5px',
										}}
									>
										<Collapse>
											<Collapse.Panel>
												<Form.Item label="域名" {...settingLayout}>
													{getFieldDecorator(
														`config[${parentEl}][${k}].btnForm.btnUrl.saveApiUrl.apiHost`,
														{
															initialValue:
																config[parentEl][k]?.btnForm?.btnUrl?.saveApiUrl
																	?.apiHost ?? '',
														}
													)(this.renderHostOptionsEl())}
												</Form.Item>
												<Form.Item label="链接" {...settingLayout}>
													{getFieldDecorator(
														`config[${parentEl}][${k}].btnForm.btnUrl.saveApiUrl.apiUrl`,
														{
															initialValue:
																config[parentEl][k]?.btnForm?.btnUrl?.saveApiUrl
																	?.apiUrl ?? '',
														}
													)(<Input />)}
												</Form.Item>
												{/* <Form.Item label="参数" {...settingLayout}>
											{getFieldDecorator(
												`config[${parentEl}][${k}].btnForm.btnUrl.saveApiUrl.apiParam`,
												{
													initialValue:
														config[parentEl][k].btnForm &&
														config[parentEl][k].btnForm.btnUrl &&
														config[parentEl][k].btnForm.btnUrl.saveApiUrl &&
														config[parentEl][k].btnForm.btnUrl.saveApiUrl
															.apiParam
															? config[parentEl][k].btnForm.btnUrl.saveApiUrl
																	.apiParam
															: '',
												}
											)(<Input.TextArea />)}
										</Form.Item> */}
											</Collapse.Panel>
										</Collapse>
									</Form.Item>
								) : null}
								{/* 表单配置 */}
								{['submitBtn', 'addBtn'].includes(
									getFieldValue('config')[parentEl][k].type
								) ? (
									<Form.Item
										label="表单配置"
										labelCol={{
											span: 2,
										}}
										wrapperCol={{
											span: 16,
										}}
										style={{
											display: 'inline-block',
											width: '1200px',
											marginBottom: '5px',
										}}
									>
										<Collapse key={k}>
											{config &&
												config[parentEl][k]?.btnForm?.formElement?.map(
													(child, index) => (
														// <Card key={index} title={'字段配置'}>
														<Collapse.Panel
															header={`字段配置(
															${config[parentEl][k]?.btnForm?.formElement[index]?.title ?? ''}
														)`}
															key={index}
														>
															<Form.Item label={'主键'} {...settingLayout}>
																{getFieldDecorator(
																	`config[${parentEl}][${k}].btnForm.formElement[${index}].key`,
																	{
																		initialValue:
																			config[parentEl][k]?.btnForm?.formElement[
																				index
																			]?.key ?? '',
																	}
																)(<Input />)}
															</Form.Item>
															<Form.Item label={'标签'} {...settingLayout}>
																{getFieldDecorator(
																	`config[${parentEl}][${k}].btnForm.formElement[${index}].title`,
																	{
																		initialValue:
																			config[parentEl][k]?.btnForm?.formElement[
																				index
																			]?.title ?? '',
																	}
																)(<Input />)}
															</Form.Item>
															<Form.Item label={'类型'} {...settingLayout}>
																{getFieldDecorator(
																	`config[${parentEl}][${k}].btnForm.formElement[${index}].type`,
																	{
																		initialValue:
																			config[parentEl][k]?.btnForm?.formElement[
																				index
																			]?.type ?? '',
																	}
																)(
																	<Select placeholder="组件类型">
																		{optionOfElTypeList}
																	</Select>
																)}
															</Form.Item>
															{/* 将各个功能进行组件化 */}
															{/* todo */}
															{['select', 'multiSelect'].includes(
																// config[parentEl][k]?.btnForm?.formElement[index]
																// 	?.type
																getFieldValue('config')[parentEl][k]?.btnForm
																	?.formElement[index]?.type
															) ? (
																<Form.Item>
																	<Form.Item
																		label="选项（options）,JSON形式"
																		{...settingLayout}
																	>
																		{getFieldDecorator(
																			`config[${parentEl}][${k}].btnForm.formElement[${index}].options`,
																			{
																				initialValue:
																					config[parentEl][k]?.btnForm
																						?.formElement[index]?.options ?? '',
																			}
																		)(<Input.TextArea />)}
																	</Form.Item>
																</Form.Item>
															) : null}

															{/* {this.renderComponentLib(
															config[parentEl][k]?.btnForm?.formElement[index]
																?.type ?? '',
															parentEl,
															k,
															index
														)} */}
															<Form.Item label={'属性'} {...settingLayout}>
																{getFieldDecorator(
																	`config[${parentEl}][${k}].btnForm.formElement[${index}].props`,
																	{
																		initialValue:
																			config[parentEl][k]?.btnForm?.formElement[
																				index
																			]?.props ?? '',
																	}
																)(<Input.TextArea />)}
															</Form.Item>
															<Form.Item label={'规则'} {...settingLayout}>
																{getFieldDecorator(
																	`config[${parentEl}][${k}].btnForm.formElement[${index}].rule`,
																	{
																		initialValue:
																			// config[parentEl][k].btnForm.formElement[index]
																			// 	.rule,
																			config[parentEl][k]?.btnForm?.formElement[
																				index
																			]?.rule ?? '',
																	}
																)(<Input />)}
															</Form.Item>
															<Button
																type="dashed"
																onClick={() =>
																	this.removeAttrCommon(
																		`${parentEl}[${k}].btnForm.formElement`,
																		index
																	)
																}
																style={{ width: '40%' }}
																icon="delete"
															>
																删除
															</Button>
															{/* </Card> */}
														</Collapse.Panel>
													)
												)}
											<Button
												type="dashed"
												onClick={() =>
													this.addAttrCommon(
														`${parentEl}[${k}].btnForm.formElement`,
														{
															title: '',
															key: '',
															type: '',
															options: [],
															props: '',
															rule: '',
														}
													)
												}
												style={{ width: '40%', margin: '5px' }}
												icon="file-add"
											>
												添加表格字段
											</Button>
										</Collapse>
									</Form.Item>
								) : null}
								{config[parentEl].length > 0 ? (
									<Button
										type="dashed"
										onClick={() => this.removeAttrCommon(parentEl, k)}
										style={{ width: '40%' }}
										icon={'delete'}
									>
										删除单个按钮配置
									</Button>
								) : null}
							</Collapse.Panel>
						</Collapse>
					)
				})}
				<Button
					type="dashed"
					onClick={() =>
						this.addAttrCommon(parentEl, {
							unionId: '',
							btnTitle: '',
							type: '',
							btnForm: {
								btnUrl: {},
								formElement: [],
							},
						})
					}
					style={{
						width: '40%',
					}}
				>
					添加单个按钮配置
				</Button>
			</Form.Item>
		)
	}

	getApiHostList() {
		axios.get('ApiManageTemplate/getApiHostList').then((res) => {
			if (res.data.Code) {
				this.setState({
					hostOptions: res.data.Data,
				})
			}
		})
	}

	renderHostOptionsEl() {
		const { hostOptions } = this.state

		if (!_.keys(hostOptions).length) return <Input />
		return (
			<Select placeholder="域名" allowClear>
				{_.map(_.values(hostOptions), (item, index) => {
					return (
						<Option value={item} key={item}>
							{item}
						</Option>
					)
				})}
			</Select>
		)
	}

	renderComponentLib(type, parentEl, k, index) {
		const { getFieldDecorator } = this.props.form
		return (
			<Form.Item>
				{type === 'provice' ? (
					<Form.Item style={hiddenFormItem}>
						<Form.Item label="选项（options）,JSON形式" {...settingLayout}>
							{getFieldDecorator(
								`config[${parentEl}][${k}].btnForm.formElement[${index}].options`,
								{
									initialValue: 'provinceList',
								}
							)(<Input.TextArea />)}
						</Form.Item>
						<Form.Item label="显示key" {...settingLayout}>
							{getFieldDecorator(
								`config[${parentEl}][${k}].btnForm.formElement[${index}].textField`,
								{
									initialValue:
										// config[parentEl][k]?.btnForm?.formElement[index]
										// 	?.textField ?? '',
										'ProvinceName',
								}
							)(<Input />)}
						</Form.Item>
						<Form.Item label="取值key" {...settingLayout}>
							{getFieldDecorator(
								`config[${parentEl}][${k}].btnForm.formElement[${index}].valueField`,
								{
									initialValue:
										// config[parentEl][k]?.btnForm?.formElement[index]
										// 	?.valueField ?? '',
										'ProvinceBh',
								}
							)(<Input />)}
						</Form.Item>
					</Form.Item>
				) : null}
			</Form.Item>
		)
	}

	render() {
		const { getFieldDecorator, getFieldValue, getFieldsValue } = this.props.form
		const {
			isOpenModal,
			template_key,
			template_name,
			config,
			isInputListFieldJSON,
			hostOptions,
		} = this.state
		return (
			<div className="configJsonToTable_ct" style={{ marginLeft: '24px' }}>
				{getFieldDecorator('Id')}
				<Row>
					<Col span={20}>
						<Form
							layout="horizontal"
							labelCol={{
								offset: 1,
							}}
							className={'configJsonToTable_form'}
						>
							<Collapse defaultActiveKey={'0'}>
								{/* <Collapse.Panel header={`模板配置(${template_name})`} key="0">
									<Form.Item {...inlineLayout} label="模板key">
										{getFieldDecorator('template_key', {
											initialValue: template_key,
											// rules: [{ required: true, message: '请填写域名' }],
										})(<Input placeholder="模板key" />)}
									</Form.Item>

									<Form.Item {...inlineLayout} label="模板名称">
										{getFieldDecorator('template_name', {
											initialValue: template_name,
											rules: [{ required: true, message: '模板名称' }],
										})(<Input placeholder="模板名称" />)}
									</Form.Item>
								</Collapse.Panel> */}
								<Collapse.Panel header="表格编辑" key="1">
									<Form.Item {...inlineLayout} label="域名">
										{getFieldDecorator('config.listBlock.listUrl.apiHost', {
											initialValue: config?.listBlock?.listUrl?.apiHost ?? '',
											// rules: [{ required: true, message: '请填写域名' }],
											// })(<Input placeholder="apiHost" />)}
										})(this.renderHostOptionsEl())}
									</Form.Item>

									<Form.Item {...inlineLayout} label="链接">
										{getFieldDecorator('config.listBlock.listUrl.apiUrl', {
											initialValue: config?.listBlock?.listUrl?.apiUrl ?? '',
											// rules: [{ required: true, message: '请填写链接' }],
										})(<Input placeholder="apiUrl" />)}
									</Form.Item>

									<Form.Item
										labelCol={{
											span: 6,
											offset: 1,
										}}
										wrapperCol={{
											span: 17,
										}}
										style={{
											display: 'inline-block',
											width: '540px',
										}}
										label="链接参数,JSON形式"
									>
										{/* {JSON.stringify(config.listBlock.listUrl.apiParam)} */}

										{getFieldDecorator(`config.listBlock.listUrl.apiParam`, {
											initialValue: config?.listBlock?.listUrl?.apiParam ?? '',
											// normalize: (value, prevValue, allValues) => {
											// 	console.log('vvvvvvvv', value, prevValue, allValues)
											// 	return JSON.stringify(value)
											// },
										})(<Input.TextArea autoSize={{ minRows: 8 }} />)}
									</Form.Item>
									<Form.Item
										label="表头"
										labelCol={{
											span: 2,
										}}
										wrapperCol={{
											span: 22,
										}}
										style={{
											display: 'inline-block',
											width: '1200px',
										}}
									>
										<Collapse header="表头" defaultActiveKey={'0'}>
											<Collapse.Panel header="表头配置" key="0">
												<Form.Item
													label="是否输入表头JSON"
													labelCol={{
														span: 12,
													}}
													wrapperCol={{
														span: 10,
													}}
													style={{
														display: 'inline-block',
													}}
												>
													<Switch
														onChange={(v) => this.setIsInputListFieldJSON(v)}
													/>
												</Form.Item>
												{isInputListFieldJSON ? (
													<Form.Item
														label="表格字段配置,JSON形式"
														labelCol={{
															span: 4,
														}}
														wrapperCol={{
															span: 16,
														}}
													>
														{getFieldDecorator('config.listBlock.listField', {
															initialValue: JSON.stringify(
																config?.listBlock?.listField ?? ''
															),
														})(<Input.TextArea autoSize={{ minRows: 5 }} />)}
													</Form.Item>
												) : (
													<Form.Item
														labelCol={{
															span: 4,
														}}
														wrapperCol={{
															span: 18,
														}}
														label="表格字段配置"
													>
														<Collapse
															defaultActiveKey={
																!isInputListFieldJSON ? '1' : ''
															}
														>
															{this.renderListBlockListFieldEl()}
														</Collapse>
													</Form.Item>
												)}
											</Collapse.Panel>
										</Collapse>
									</Form.Item>
									{this.renderListBlockClickModelEl()}
								</Collapse.Panel>

								<Collapse.Panel header="头部操作&&公共栏编辑" key="2">
									<Form.Item
										label="按钮"
										labelCol={{
											span: 2,
										}}
										wrapperCol={{
											span: 22,
										}}
										style={{
											display: 'inline-block',
											width: '1200px',
										}}
									>
										{this.renderSearchBox()}
										<Card title="公共操作按钮">
											<Collapse>
												<Collapse.Panel>
													<Form.Item
														label="操作栏宽度"
														{...operateSearchBoxLayout}
													>
														{getFieldDecorator(
															`config.headBlock.operateBox.operationWidth`,
															{
																initialValue:
																	config?.headBlock?.operateBox
																		?.operationWidth ?? 120,
															}
														)(
															<InputNumber
																placeholder="操作栏宽度,最小120"
																min={120}
															/>
														)}
													</Form.Item>

													<Form.Item
														label="是否隐藏刷新"
														{...operateSearchBoxLayout}
													>
														{getFieldDecorator(
															`config.headBlock.operateBox.hiddenTableRefreshBtn`,
															{
																initialValue:
																	config?.headBlock?.operateBox
																		?.hiddenTableRefreshBtn ?? '',
																valuePropName: 'checked',
															}
														)(<Switch />)}
													</Form.Item>

													<Form.Item
														label="是否隐藏高级查询"
														{...operateSearchBoxLayout}
													>
														{getFieldDecorator(
															`config.headBlock.operateBox.hiddenHigherSearch`,
															{
																initialValue:
																	config?.headBlock?.operateBox
																		?.hiddenHigherSearch ?? '',
																valuePropName: 'checked',
															}
														)(<Switch />)}
													</Form.Item>

													<Form.Item
														label="是否隐藏复制行按钮"
														{...operateSearchBoxLayout}
													>
														{getFieldDecorator(
															`config.headBlock.operateBox.hiddenCopyRowBtn`,
															{
																initialValue:
																	config?.headBlock?.operateBox
																		?.hiddenCopyRowBtn ?? '',
																valuePropName: 'checked',
															}
														)(<Switch />)}
													</Form.Item>

													<Form.Item
														label="是否显示公用导出"
														{...operateSearchBoxLayout}
													>
														{getFieldDecorator(
															`config.headBlock.operateBox.hiddenCommonExportBtn`,
															{
																initialValue:
																	config?.headBlock?.operateBox
																		?.hiddenCommonExportBtn ?? '',
																valuePropName: 'checked',
															}
														)(
															<Switch
																onChange={(v) => this.setIsShowExportUrl(v)}
															/>
														)}
													</Form.Item>
													{!this.state.isShowExportUrl ? (
														<Form.Item
															label="导出url"
															{...operateSearchBoxLayout}
														>
															{getFieldDecorator(
																`config.headBlock.operateBox.exportUrl`,
																{
																	initialValue:
																		config?.headBlock?.operateBox?.exportUrl ??
																		'',
																}
															)(<Input />)}
														</Form.Item>
													) : null}

													<Form.Item
														label="是否开启多选"
														{...operateSearchBoxLayout}
													>
														{getFieldDecorator(
															`config.headBlock.operateBox.enableMultiSelected`,
															{
																initialValue:
																	config?.headBlock?.operateBox
																		?.enableMultiSelected ?? '',
																valuePropName: 'checked',
															}
														)(<Switch />)}
													</Form.Item>
												</Collapse.Panel>
											</Collapse>
										</Card>
									</Form.Item>
								</Collapse.Panel>

								<Collapse.Panel header="头部按钮" key="3">
									{/* {this.renderHeadBlock()} */}

									{this.renderFormEl('headBtnBlock', optionOfHeadBtnBlock)}
								</Collapse.Panel>

								<Collapse.Panel header="数据列表按钮" key="4">
									{this.renderFormEl('listBtnBlock', optionOfListBtnBlock)}
								</Collapse.Panel>
							</Collapse>

							<Form.Item
								wrapperCol={{ span: 12, offset: 6 }}
								style={{ textAlign: 'center' }}
							>
								<Button
									onClick={() => {
										window.vm.closeAndJumpToAndRefresh('templateConfig')
									}}
									style={{
										marginRight: '20px',
									}}
								>
									取消
								</Button>
								<Button
									type="primary"
									htmlType="submit"
									onClick={() => this.handleSubmit()}
								>
									提交
								</Button>
							</Form.Item>
						</Form>
					</Col>

					{/* <Modal
						visible={isOpenModal}
						footer={
							<Button onClick={() => this.changeIsOpenModal()}>确认</Button>
						}
					>
						<Row>
							<CopyToClipboard
								text={JSON.stringify(config)}
								onCopy={this.copyJson}
							>
								<Button icon={'copy'}>复制JSON</Button>
							</CopyToClipboard>
						</Row>
						<Row>
							<div className="resultOfConfigJsonToTable_ct">
								<ReactJson
									src={getFieldsValue().config}
									iconStyle="triangle"
									displayDataTypes={false}
									style={{ fontSize: '20px' }}
								/>
							</div>
						</Row>
					</Modal>
					<Col span={2} offset={1}>
						<Button onClick={() => this.changeIsOpenModal()}>
							表格JSON显示
						</Button>
					</Col> */}
				</Row>
			</div>
		)
	}

	changeLoadingStatus() {
		window.vm.setState({
			pageLoading: !window.vm.state.pageLoading,
		})
	}

	updateEditInfo() {
		this.setState({
			config: this.props.ComponentData?.config ?? {},
		})
	}

	getEditInfo() {
		console.log('2fcccccc', this)
		// if (this.props && this.props.Id) {
		this.changeLoadingStatus()
		axios
			// .get(`ApiManageTemplate/getEditInfo?Id=${this.props.Id}`)
			.get(`ApiManageTemplate/getEditInfo?Id=${1}`)
			.then((res) => {
				if (res.data.Code == 1) {
					window.vm.setState({
						pageLoading: false,
					})
					let newConfig = res.data.Data.template_content[0]

					this.props.form.setFieldsValue({
						Id: this.props.Id,
						template_key: res.data.Data.template_key,
						template_name: res.data.Data.template_name,
						// config: newConfig,
					})
					this.setState({
						config: {
							// ...this.state.config,
							headBtnBlock: newConfig.headBtnBlock ?? [],
							listBtnBlock: newConfig.listBtnBlock ?? [],
							commonBtnBlock: newConfig.commonBtnBlock ?? [],
							...newConfig,
							listBlock: {
								...newConfig.listBlock,
								clickModel: newConfig.listBlock.clickModel ?? [],
							},
							headBlock: {
								...newConfig.headBlock,
								searchBox: newConfig.headBlock.searchBox ?? [],
							},
						},
						template_key: res.data.Data.template_key,
						template_name: res.data.Data.template_name,
					})
					jsonOfconfig = {
						...newConfig,
						headBtnBlock: newConfig.headBtnBlock ?? [],
						listBtnBlock: newConfig.listBtnBlock ?? [],
						commonBtnBlock: newConfig.commonBtnBlock ?? [],
						listBlock: {
							...newConfig.listBlock,
							clickModel: newConfig.listBlock.clickModel ?? [],
						},
						headBlock: {
							...newConfig.headBlock,
							searchBox: newConfig.headBlock.searchBox ?? [],
						},
					}
					// this.props.updateComponent({
					// 	Key: this.props.ComponentKey,
					// 	ComponentData: jsonOfconfig,
					// })
				}
			})
		// }
	}
	// ajax
	async fetchData() {
		await this.updateEditInfo()
		// await this.getEditInfo()
		await this.getApiHostList()
	}
	componentDidMount() {
		this.fetchData()
	}
}

export default Form.create({
	name: 'ConfigJsonToTable',
	onValuesChange: function (props, changedValues, allValues) {
		// todo 删除时候，值会多
		console.log('all values ', props, allValues, changedValues)
		props.updateComponent({
			Key: props.ComponentKey,
			ComponentData: allValues,
		})
		jsonOfconfig = allValues
	},
})(ConfigJsonToTable)
