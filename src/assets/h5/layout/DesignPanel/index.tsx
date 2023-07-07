interface IProps {
	// [any]?:any
	props: any
	title?: String
}

interface IStates {}
import * as React from 'React'
// import * as ReactDOM from "react-dom";
// import IFrame from "./frame";

import ISingleImage from '../AllComponents/components/ISingleImage/index'
import ISingleImageSetting from '../AllComponents/components/ISingleImage/setting'
import ITwoRowImage from '../AllComponents/components/ITwoRowImage/index'
import ITwoRowImageSetting from '../AllComponents/components/ITwoRowImage/setting'
import IThreeRowImage from '../AllComponents/components/IThreeRowImage/index'
import IThreeRowImageSetting from '../AllComponents/components/IThreeRowImage/setting'
import IFourRowImage from '../AllComponents/components/IFourRowImage/index'
import IFourRowImageSetting from '../AllComponents/components/IFourRowImage/setting'
import IVideo from '../AllComponents/components/IVideo/index'
import IVideoSetting from '../AllComponents/components/IVideo/setting'
import ICoupon from '../AllComponents/components/ICoupon/index'
import ICouponSetting from '../AllComponents/components/ICoupon/setting'
import ISingleCoupon from '../AllComponents/components/ISingleCoupon/index'
import ISingleCouponSetting from '../AllComponents/components/ISingleCoupon/setting'
import ICustomerService from '../AllComponents/components/ICustomerService/index'
import ICustomerServiceSetting from '../AllComponents/components/ICustomerService/setting'
import ISingleImageFloatBox from '../AllComponents/components/ISingleImageFloatBox/index'
import ISingleImageFloatBoxSetting from '../AllComponents/components/ISingleImageFloatBox/setting'
import ITwoRowImageFloatBox from '../AllComponents/components/ITwoRowImageFloatBox/index'
import ITwoRowImageFloatBoxSetting from '../AllComponents/components/ITwoRowImageFloatBox/setting'
import GoodsFloatBox from '../AllComponents/components/goods/index'
import GoodsFloatBoxSetting from '../AllComponents/components/goods/setting'
// import ICustomForm from "../../formConfigForm"
import ICustomForm from '../AllComponents/components/ICustomForm/index'
import ICustomFormSetting from '../AllComponents/components/ICustomForm/setting'

import IFloatBoxOfForm from '../AllComponents/components/IFloatBoxOfForm/index'
import IFloatBoxOfFormSetting from '../AllComponents/components/IFloatBoxOfForm/setting'

import IBtnOfForm from '../AllComponents/components/IBtnOfForm/index'
import IBtnOfFormSetting from '../AllComponents/components/IBtnOfForm/setting'
import CashCoupon from '../AllComponents/components/CashCoupon/index'
import CashCouponSetting from '../AllComponents/components/CashCoupon/setting'

import IRecommendGiftForShareLandingPage from '../AllComponents/components/IRecommendGiftForShareLandingPage/index.jsx'
import IRecommendGiftForShareLandingPageSetting from '../AllComponents/components/IRecommendGiftForShareLandingPage/setting.jsx'
import IRecommendGiftForReceivePage from '../AllComponents/components/IRecommendGiftForReceivePage/index.jsx'
import IRecommendGiftForReceivePageSetting from '../AllComponents/components/IRecommendGiftForReceivePage/setting.jsx'

import IYuYue from '../AllComponents/components/IYuYue/index'
import IYuYueSetting from '../AllComponents/components/IYuYue/setting'
import { uuid } from '../../../common/util'

import { Icon, Modal, Checkbox } from 'antd'
// import { ReactSortable } from 'react-sortablejs'
import _ from 'lodash'
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
		case 'ISingleImage':
			// return <ISingleImage {...ComponentData} Key={Key} />;
			return hoc(Key, ISingleImage, ComponentData, props, show)
		case 'ITwoRowImage':
			// return <ISingleImage {...ComponentData} Key={Key} />;
			return hoc(Key, ITwoRowImage, ComponentData, props, show)
		case 'IThreeRowImage':
			// return <ISingleImage {...ComponentData} Key={Key} />;
			return hoc(Key, IThreeRowImage, ComponentData, props, show)
		case 'IFourRowImage':
			// return <ISingleImage {...ComponentData} Key={Key} />;
			return hoc(Key, IFourRowImage, ComponentData, props, show)
		case 'IVideo':
			// return <IVideo {...ComponentData} Key={Key} />;
			return hoc(Key, IVideo, ComponentData, props, show)
		case 'ICoupon':
			return hoc(Key, ICoupon, ComponentData, props, show)
		case 'ISingleCoupon':
			return hoc(Key, ISingleCoupon, ComponentData, props, show)
		case 'ICustomerService':
			return hoc(Key, ICustomerService, ComponentData, props, show)
		case 'ISingleImageFloatBox':
			return hoc(Key, ISingleImageFloatBox, ComponentData, props, show)
		case 'ITwoRowImageFloatBox':
			return hoc(Key, ITwoRowImageFloatBox, ComponentData, props, show)
		case 'GoodsFloatBox':
			return hoc(Key, GoodsFloatBox, ComponentData, props, show)

		case 'ICustomForm':
			return hoc(Key, ICustomForm, ComponentData, props, show)

		case 'IFloatBoxOfForm':
			return hoc(Key, IFloatBoxOfForm, ComponentData, props, show)

		case 'IBtnOfForm':
			return hoc(Key, IBtnOfForm, ComponentData, props, show)
		case 'CashCoupon':
			return hoc(Key, CashCoupon, ComponentData, props, show)
		case 'IRecommendGiftForShareLandingPage':
			return hoc(
				Key,
				IRecommendGiftForShareLandingPage,
				ComponentData,
				props,
				show
			)
		case 'IRecommendGiftForReceivePage':
			return hoc(Key, IRecommendGiftForReceivePage, ComponentData, props, show)
		case 'IYuYue':
			return hoc(Key, IYuYue, ComponentData, props, show)
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

				item == 'ISingleImage' &&
					this.props.insertComponent({
						Key: uuid(),
						ComponentName: 'ISingleImage',
						ComponentAlias: '单列图片',
						Component: ISingleImage,
						ComponentProps: {},
						ComponentSetting: ISingleImageSetting,
						ComponentData: {},
						handleKey: this.state.handleKey,
					})
				item == 'ITwoRowImage' &&
					this.props.insertComponent({
						Key: uuid(),
						ComponentName: 'ITwoRowImage',
						ComponentAlias: '双列图片',
						Component: ITwoRowImage,
						ComponentProps: {},
						ComponentSetting: ITwoRowImageSetting,
						ComponentData: {},
						handleKey: this.state.handleKey,
					})
				item == 'IThreeRowImage' &&
					this.props.insertComponent({
						Key: uuid(),
						ComponentName: 'IThreeRowImage',
						ComponentAlias: '三列图片',
						Component: IThreeRowImage,
						ComponentProps: {},
						ComponentSetting: IThreeRowImageSetting,
						ComponentData: {},
						handleKey: this.state.handleKey,
					})
				item == 'IFourRowImage' &&
					this.props.insertComponent({
						Key: uuid(),
						ComponentName: 'IFourRowImage',
						ComponentAlias: '四列图片',
						Component: IFourRowImage,
						ComponentProps: {},
						ComponentSetting: IFourRowImageSetting,
						ComponentData: {},
						handleKey: this.state.handleKey,
					})
				item == 'IVideo' &&
					this.props.insertComponent({
						Key: uuid(),
						ComponentName: 'IVideo',
						ComponentAlias: '视频',
						Component: IVideo,
						ComponentProps: {},
						ComponentSetting: IVideoSetting,
						ComponentData: {},
						handleKey: this.state.handleKey,
					})
				item == 'ICoupon' &&
					this.props.insertComponent({
						Key: uuid(),
						ComponentName: 'ICoupon',
						ComponentAlias: '一键领取优惠券',
						Component: ICoupon,
						ComponentProps: {},
						ComponentSetting: ICouponSetting,
						ComponentData: {},
						handleKey: this.state.handleKey,
					})
				item == 'ISingleCoupon' &&
					this.props.insertComponent({
						Key: uuid(),
						ComponentName: 'ISingleCoupon',
						ComponentAlias: '单独领取优惠券',
						Component: ISingleCoupon,
						ComponentProps: {},
						ComponentSetting: ISingleCouponSetting,
						ComponentData: {},
						handleKey: this.state.handleKey,
					})
				item == 'ICustomerService' &&
					this.props.insertComponent({
						Key: uuid(),
						ComponentName: 'ICustomerService',
						ComponentAlias: '客服预约悬浮框',
						Component: ICustomerService,
						ComponentProps: {},
						ComponentSetting: ICustomerServiceSetting,
						ComponentData: {},
						handleKey: this.state.handleKey,
					})
				item == 'ISingleImageFloatBox' &&
					this.props.insertComponent({
						Key: uuid(),
						ComponentName: 'ISingleImageFloatBox',
						ComponentAlias: '单图悬浮框',
						Component: ISingleImageFloatBox,
						ComponentProps: {},
						ComponentSetting: ISingleImageFloatBoxSetting,
						ComponentData: {},
						handleKey: this.state.handleKey,
					})
				item == 'ITwoRowImageFloatBox' &&
					this.props.insertComponent({
						Key: uuid(),
						ComponentName: 'ITwoRowImageFloatBox',
						ComponentAlias: '双图悬浮框',
						Component: ITwoRowImageFloatBox,
						ComponentProps: {},
						ComponentSetting: ITwoRowImageFloatBoxSetting,
						ComponentData: {},
						handleKey: this.state.handleKey,
					})
				item == 'GoodsFloatBox' &&
					this.props.insertComponent({
						Key: uuid(),
						ComponentName: 'GoodsFloatBox',
						ComponentAlias: '预设商品',
						Component: GoodsFloatBox,
						ComponentProps: {},
						ComponentSetting: GoodsFloatBoxSetting,
						ComponentData: {},
						handleKey: this.state.handleKey,
					})
				item == 'ICustomForm' &&
					this.props.insertComponent({
						Key: uuid(),
						ComponentName: 'ICustomForm',
						ComponentAlias: '普通表单',
						Component: ICustomForm,
						ComponentProps: {},
						ComponentSetting: ICustomFormSetting,
						ComponentData: {},
						handleKey: this.state.handleKey,
					})
				item == 'IFloatBoxOfForm' &&
					this.props.insertComponent({
						Key: uuid(),
						ComponentName: 'IFloatBoxOfForm',
						ComponentAlias: '填写悬浮窗',
						Component: IFloatBoxOfForm,
						ComponentProps: {},
						ComponentSetting: IFloatBoxOfFormSetting,
						ComponentData: {},
						handleKey: this.state.handleKey,
					})
				item == 'IBtnOfForm' &&
					this.props.insertComponent({
						Key: uuid(),
						ComponentName: 'IBtnOfForm',
						ComponentAlias: '填写按钮',
						Component: IBtnOfForm,
						ComponentProps: {},
						ComponentSetting: IBtnOfFormSetting,
						ComponentData: {},
						handleKey: this.state.handleKey,
					})
				item == 'CashCoupon' &&
					this.props.insertComponent({
						Key: uuid(),
						ComponentName: 'CashCoupon',
						ComponentAlias: '现金买券',
						Component: CashCoupon,
						ComponentProps: {},
						ComponentSetting: CashCouponSetting,
						ComponentData: {},
						handleKey: this.state.handleKey,
					})
				item == 'IRecommendGiftForShareLandingPage' &&
					this.props.insertComponent({
						Key: uuid(),
						ComponentName: 'IRecommendGiftForShareLandingPage',
						ComponentAlias: '推荐有礼活动页',
						Component: IRecommendGiftForShareLandingPage,
						ComponentProps: {},
						ComponentSetting: IRecommendGiftForShareLandingPageSetting,
						ComponentData: {},
						handleKey: this.state.handleKey,
					})
				item == 'IRecommendGiftForReceivePage' &&
					this.props.insertComponent({
						Key: uuid(),
						ComponentName: 'IRecommendGiftForReceivePage',
						ComponentAlias: '推荐有礼领取页',
						Component: IRecommendGiftForReceivePage,
						ComponentProps: {},
						ComponentSetting: IRecommendGiftForReceivePageSetting,
					})

				item == 'IYuYue' &&
					this.props.insertComponent({
						Key: uuid(),
						ComponentName: 'IYuYue',
						ComponentAlias: '预约组件',
						Component: IYuYue,
						ComponentProps: {},
						ComponentSetting: IYuYueSetting,
						ComponentData: {
							YuyuePeopleNumStatus: '1', // 已预约人数
							YuyueButtonType: '0', // 预约按钮样式 // 	{ text: '默认样式', value: '0' },
							// { text: '自定义', value: '1' },
							ImageArr: [], // 预约按钮图片
							YuyueButtonTitle: '立即预约', // 预约按钮文案
						},
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
						<Checkbox key="ISingleImage" value="ISingleImage">
							<Icon type="picture" />
							单列图片
						</Checkbox>
						<Checkbox key="ITwoRowImage" value="ITwoRowImage">
							<Icon type="picture" />
							双列图片
						</Checkbox>
						<Checkbox key="IThreeRowImage" value="IThreeRowImage">
							<Icon type="picture" />
							三列图片
						</Checkbox>
						<Checkbox key="IFourRowImage" value="IFourRowImage">
							<Icon type="picture" />
							四列图片
						</Checkbox>
						<Checkbox key="IVideo" value="IVideo">
							<Icon type="video-camera" />
							视频
						</Checkbox>
						<Checkbox key="ICoupon" value="ICoupon">
							<Icon type="picture" />
							一键领取优惠券
						</Checkbox>
						<Checkbox key="ISingleCoupon" value="ISingleCoupon">
							<Icon type="picture" />
							单独领取优惠券
						</Checkbox>
						<Checkbox key="ICustomerService" value="ICustomerService">
							<Icon type="picture" />
							客服预约悬浮框
						</Checkbox>
						<Checkbox key="ISingleImageFloatBox" value="ISingleImageFloatBox">
							<Icon type="picture" />
							单图悬浮框
						</Checkbox>
						<Checkbox key="ITwoRowImageFloatBox" value="ITwoRowImageFloatBox">
							<Icon type="picture" />
							双图悬浮框
						</Checkbox>
						<Checkbox key="GoodsFloatBox" value="GoodsFloatBox">
							<Icon type="picture" />
							预设商品
						</Checkbox>
						<Checkbox key="ICustomForm" value="ICustomForm">
							<Icon type="picture" />
							普通表单
						</Checkbox>
						<Checkbox key="IFloatBoxOfForm" value="IFloatBoxOfForm">
							<Icon type="picture" />
							填写悬浮窗
						</Checkbox>
						<Checkbox key="IBtnOfForm" value="IBtnOfForm">
							<Icon type="picture" />
							填写按钮
						</Checkbox>
						<Checkbox key="CashCoupon" value="CashCoupon">
							<Icon type="picture" />
							现金买券
						</Checkbox>
						<Checkbox
							key="IRecommendGiftForShareLandingPage"
							value="IRecommendGiftForShareLandingPage"
						>
							<Icon type="picture" />
							推荐有礼活动页
						</Checkbox>
						<Checkbox
							key="IRecommendGiftForReceivePage"
							value="IRecommendGiftForReceivePage"
						>
							<Icon type="picture" />
							推荐有礼领取页
						</Checkbox>

						<Checkbox key="IYuYue" value="IYuYue">
							<Icon type="picture" />
							预约组件
						</Checkbox>
					</Checkbox.Group>
				</Modal>
				<div
					ref={(el) => (this.divContainer = el)}
					id="dnd-iframe"
					className="dnd-container"
				>
					{/* <ReactSortable
						group="groupName"
						animation={400}
						delay={1}
						ref={(el: any) => (this.reactSortableRef = el)}
						list={this.props.componentLib}
						setList={(newState: any, sortable: any, store: any) => {
							console.log(
								'init Component state',
								newState,
							)
							if (
								store.dragging &&
								store.dragging.props &&
								!_.isEqual(store.dragging.props.list, newState)
								// JSON.stringify(store.dragging.props.list) !==
								// 	JSON.stringify(newState)
							) {
								this.props.initComponent(newState)
							} else {
								return
							}
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
								id={item.Key}
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
							>
								{Item}
							</div>
						)
					})}
					{/* </ReactSortable> */}
				</div>
			</div>
		)
	}
	shouldComponentUpdate(
		nextProps: Readonly<any>,
		nextState: Readonly<any>,
		nextContext: any
	): boolean {
		console.log('should update', this, nextProps)
		// return false
		return true
	}
	componentDidUpdate(
		prevProps: Readonly<any>,
		prevState: Readonly<any>,
		snapshot?: any
	): void {
		if (prevProps) {
		}
	}
}
