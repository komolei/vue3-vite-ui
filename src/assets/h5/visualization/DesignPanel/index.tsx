interface IProps {
	// [any]?:any
	props: any
	title?: String
}

import * as React from 'React'
import ITable from '../AllComponents/components/ITable/index1'
import ITableSetting from '../AllComponents/components/ITable/setting'

import { uuid } from '../../../common/util'

import { Icon, Modal, Checkbox } from 'antd'
// import { ReactSortable } from 'react-sortablejs'

const hoc = (
	Key: string,
	Component: any,
	ComponentData: {},
	props: any,
	show: any
) => {
	return (
		<div
			className={`designPage_ct`}
			onMouseMove={() => {}}
			onClick={() => {}}
			key={Key}
		>
			{/* {props.selectedComponentKey === Key ? ( */}
			<div className="btns_ct">
				<Icon
					type="arrow-up"
					onClick={() => {
						props.upComponent({
							Key: Key,
						})
					}}
				/>
				<Icon
					type="arrow-down"
					onClick={() => {
						props.downComponent({
							Key: Key,
						})
					}}
				/>
				<Icon
					type="plus"
					onClick={() => {
						show()
					}}
				/>
				<Icon
					type="close"
					onClick={() => {
						props.delComponent({
							Key: Key,
						})
					}}
				/>
			</div>
			{/* ) : null} */}

			<div
				onClick={(e: any) => {
					props.selectedComponent(Key)
				}}
			>
				<Component
					Key={Key}
					ComponentData={ComponentData}
					ParentProps={props}
				/>
			</div>
		</div>
	)
}

const importComponent = (
	Key: string,
	Name: string,
	ComponentData: any = {},
	props: any,
	show: any
) => {
	switch (Name) {
		case 'ITable':
			return hoc(Key, ITable, ComponentData, props, show)
		default:
			return null
	}
}
export default class DesignPanel extends React.Component<any, any> {
	static defaultProps = {
		title: 'designPanel',
	}
	constructor(props: IProps) {
		super(props)
		this.state = {
			visible: false,
			selectedComponentKey: '',
		}
	}
	divContainer: any
	reactSortableRef: any
	onDrop(e: any) {
		e.stopPropagation()
	}
	onDragover(e: any) {
		e.preventDefault()
	}
	show: any = (e: any) => {
		this.setState({
			visible: true,
		})
	}
	handleOk = (e: any) => {
		this.state.checkVal &&
			this.state.checkVal.reverse().forEach((item: any) => {
				//根据传入不同组件名称调用redux渲染插入组件

				item == 'ITable' &&
					this.props.insertComponent({
						Key: uuid(),
						ComponentName: 'ITable',
						ComponentAlias: '表格组件',
						Component: ITable,
						ComponentProps: {},
						ComponentSetting: ITableSetting,
						ComponentData: {},
						handleKey: this.state.handleKey,
					})
			})
		this.setState({
			visible: false,
			checkVal: [],
		})
	}

	onChange = (e: any) => {
		this.setState({
			checkVal: e,
		})
	}

	handleCancel = (e: any) => {
		this.setState({
			visible: false,
			checkVal: [],
		})
	}
	render() {
		return (
			<div>
				{this.props.selectedComponentKey}
				<Modal
					className={`importComponent_modal`}
					visible={this.state.visible}
					onOk={this.handleOk}
					onCancel={this.handleCancel}
					mask={false}
					title="选择向下插入类型"
				>
					<Checkbox.Group
						value={this.state.checkVal}
						style={{ display: 'flex', flexDirection: 'column' }}
						onChange={this.onChange}
					>
						<Checkbox key="ITable" value="ITable">
							<Icon type="picture" />
							表格组件
						</Checkbox>
					</Checkbox.Group>
				</Modal>
				<div
					ref={(el) => (this.divContainer = el)}
					id="dnd-iframe-visualization"
					className="dnd-container"
				>
					{/* <ReactSortable
						group="groupName"
						animation={400}
						delay={1}
						ref={(el: any) => (this.reactSortableRef = el)}
						list={this.props.componentLib}
						setList={(newState: any, sortable: any, store: any) => {
							this.props.initComponent(newState)
						}}
						filter={`.notSelectedBox`}
					> */}
					{this.props.componentLib.map((item: any) => {
						const Item: any = importComponent(
							item.Key,
							item.ComponentName,
							item.ComponentData,
							this.props,
							// 弹框，获取点击目标key值，精准插入目标下方
							(a: any) => {
								this.show()
								this.setState({
									handleKey: item.Key,
								})
							}
						)
						return (
							<div
								key={item.Key}
								onClick={() => {
									this.props.selectedComponent(item.Key)
								}}
								className={[
									this.props.selectedComponentKey == item.Key
										? 'selectedBox'
										: 'notSelectedBox',
									[
										'ICustomerService',
										'ISingleImageFloatBox',
										'ITwoRowImageFloatBox',
									].includes(item.ComponentName)
										? 'positionAabsolute'
										: '',
								].join(' ')}
								id={item.Key}
							>
								{/* <div key={item.Key}>{Item}</div> */}
								{Item}
							</div>
						)
					})}
					{/* </ReactSortable> */}
				</div>
			</div>
		)
	}
}
