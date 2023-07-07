import * as React from 'React'
import { Tabs, Menu } from 'antd'
const { SubMenu } = Menu
// import Components
import Hoc from './hoc.jsx'

import ISingleImage from './ISingleImage/index'
import ISingleImageSetting from './ISingleImage/setting'
import ITwoRowImage from './ITwoRowImage/index'
import ITwoRowImageSetting from './ITwoRowImage/setting'
import IThreeRowImage from './IThreeRowImage/index'
import IThreeRowImageSetting from './IThreeRowImage/setting'
import IFourRowImage from './IFourRowImage/index'
import IFourRowImageSetting from './IFourRowImage/setting'
import IVideo from './IVideo/index'
import IVideoSetting from './IVideo/setting'
import ICoupon from './ICoupon/index'
import ICouponSetting from './ICoupon/setting'
import ISingleCoupon from './ISingleCoupon/index'
import ISingleCouponSetting from './ISingleCoupon/setting'
import ICustomerService from './ICustomerService/index'
import ICustomerServiceSetting from './ICustomerService/setting'
import ISingleImageFloatBox from './ISingleImageFloatBox/index'
import ISingleImageFloatBoxSetting from './ISingleImageFloatBox/setting'
import ITwoRowImageFloatBox from './ITwoRowImageFloatBox/index'
import ITwoRowImageFloatBoxSetting from './ITwoRowImageFloatBox/setting'
import GoodsFloatBox from './goods/index'
import GoodsFloatBoxSetting from './goods/setting'

import ICustomForm from './ICustomForm/index.jsx'
import ICustomFormSetting from './ICustomForm/setting'

import IFloatBoxOfForm from './IFloatBoxOfForm/index.jsx'
import IFloatBoxOfFormSetting from './IFloatBoxOfForm/setting'

import IBtnOfForm from './IBtnOfForm/index.jsx'
import IBtnOfFormSetting from './IBtnOfForm/setting'
import CashCoupon from './CashCoupon/index.jsx'
import CashCouponSetting from './CashCoupon/setting'
import IRecommendGiftForShareLandingPage from './IRecommendGiftForShareLandingPage/index.jsx'
import IRecommendGiftForShareLandingPageSetting from './IRecommendGiftForShareLandingPage/setting.jsx'
import IRecommendGiftForReceivePage from './IRecommendGiftForReceivePage/index.jsx'
import IRecommendGiftForReceivePageSetting from './IRecommendGiftForReceivePage/setting.jsx'

import IYuYue from './IYuYue/index.jsx'
import IYuYueSetting from './IYuYue/setting'
export const importComponent = (name: string, ComponentData: any = {}) => {
	switch (name) {
		case 'ISingleImage':
			return Hoc(
				ISingleImage,
				'picture',
				'ISingleImage',
				'单列图片',
				{},
				ISingleImageSetting,
				ComponentData
			)
		case 'ITwoRowImage':
			return Hoc(
				ITwoRowImage,
				'picture',
				'ITwoRowImage',
				'双列图片',
				{},
				ITwoRowImageSetting,
				ComponentData
			)
		case 'IThreeRowImage':
			return Hoc(
				IThreeRowImage,
				'picture',
				'IThreeRowImage',
				'三列图片',
				{},
				IThreeRowImageSetting,
				ComponentData
			)
		case 'IFourRowImage':
			return Hoc(
				IFourRowImage,
				'picture',
				'IFourRowImage',
				'四列图片',
				{},
				IFourRowImageSetting,
				ComponentData
			)
		case 'IVideo':
			return Hoc(
				IVideo,
				'video-camera',
				'IVideo',
				'视频',
				{},
				IVideoSetting,
				ComponentData
			)
		case 'ICoupon':
			return Hoc(
				ICoupon,
				'video-camera',
				'ICoupon',
				'一键领取优惠券',
				{},
				ICouponSetting,
				ComponentData
			)
		case 'ISingleCoupon':
			return Hoc(
				ISingleCoupon,
				'video-camera',
				'ISingleCoupon',
				'单独领取优惠券',
				{},
				ISingleCouponSetting,
				ComponentData
			)
		case 'ICustomerService':
			return Hoc(
				ICustomerService,
				'video-camera',
				'ICustomerService',
				'客服预约悬浮框',
				{},
				ICustomerServiceSetting,
				ComponentData
			)
		case 'ISingleImageFloatBox':
			return Hoc(
				ISingleImageFloatBox,
				'video-camera',
				'ISingleImageFloatBox',
				'单图悬浮框',
				{},
				ISingleImageFloatBoxSetting,
				ComponentData
			)
		case 'ITwoRowImageFloatBox':
			return Hoc(
				ITwoRowImageFloatBox,
				'video-camera',
				'ITwoRowImageFloatBox',
				'双图悬浮框',
				{},
				ITwoRowImageFloatBoxSetting,
				ComponentData
			)
		case 'GoodsFloatBox':
			return Hoc(
				GoodsFloatBox,
				'video-camera',
				'GoodsFloatBox',
				'预设商品',
				{},
				GoodsFloatBoxSetting,
				ComponentData
			)
		case 'ICustomForm':
			return Hoc(
				ICustomForm,
				'video-camera',
				'ICustomForm',
				'普通表单',
				{},
				ICustomFormSetting,
				ComponentData
			)
		case 'IFloatBoxOfForm':
			return Hoc(
				IFloatBoxOfForm,
				'video-camera',
				'IFloatBoxOfForm',
				'填写悬浮窗',
				{},
				IFloatBoxOfFormSetting,
				ComponentData
			)
		case 'IBtnOfForm':
			return Hoc(
				IBtnOfForm,
				'video-camera',
				'IBtnOfForm',
				'填写按钮',
				{},
				IBtnOfFormSetting,
				ComponentData
			)
		case 'CashCoupon':
			return Hoc(
				CashCoupon,
				'video-camera',
				'CashCoupon',
				'现金买券',
				{},
				CashCouponSetting,
				ComponentData
			)
		case 'IRecommendGiftForShareLandingPage':
			return Hoc(
				IRecommendGiftForShareLandingPage,
				'video-camera',
				'IRecommendGiftForShareLandingPage',
				'推荐有礼活动页',
				{},
				IRecommendGiftForShareLandingPageSetting,
				ComponentData
			)
		case 'IRecommendGiftForReceivePage':
			return Hoc(
				IRecommendGiftForReceivePage,
				'video-camera',
				'IRecommendGiftForReceivePage',
				'推荐有礼领取页',
				{},
				IRecommendGiftForReceivePageSetting,
				ComponentData
			)
		case 'IYuYue':
			return Hoc(
				IYuYue,
				'video-camera',
				'IYuYue',
				'预约组件',
				{},
				IYuYueSetting,
				ComponentData
			)
		default:
			return null
	}
}
// 组件初始化值
const HocVideo = importComponent('IVideo', {
	videoCoverImageSrc: '',
	videoSrc: '',
})
const HocISingleImage = importComponent('ISingleImage', {
	interactiveWay: '',
	ImageArr: [],
})

const HocITwoRowImage = importComponent('ITwoRowImage', {
	ImageArr: [],
})
const HocIThreeRowImage = importComponent('IThreeRowImage', {
	ImageArr: [],
})
const HocIFourRowImage = importComponent('IFourRowImage', {
	ImageArr: [],
})
const HocICoupon = importComponent('ICoupon', {
	ImageArr: [],
})
const HocISingleCoupon = importComponent('ISingleCoupon', {
	ImageArr: [],
})

const HocICustomerService = importComponent('ICustomerService', {
	interactiveWay: '',
	InteractiveWay: '1', // 预约悬浮窗样式   // { text: '默认样式', value: '1' },
	//  { text: '样式一', value: '2' },
	//  { text: '样式二', value: '3' },
	//  { text: '自定义', value: '4' },
	ConsultingButtonStatus: '1', // 咨询按钮开关
	FloorSuspensionWindowTitle: '立即预约专业着装顾问免费上门量体', // 底部悬浮窗标题
	FloorSuspensionWindowTitleDesc: '', // 底部悬浮窗描述
	FloorSuspensionWindowButtonTitle: '', // 按钮文案
	leftImageSrc: '', // 咨询按钮图片上传
	rightImageSrc: '', // 悬浮窗图片上传
})
const HocISingleImageFloatBox = importComponent('ISingleImageFloatBox', {
	ImageArr: [],
})
const HocITwoRowImageFloatBox = importComponent('ITwoRowImageFloatBox', {
	ImageArr: [],
})
const HocGoodsFloatBox = importComponent('GoodsFloatBox', {
	GoodsList: [],
})
const HocICustomForm = importComponent('ICustomForm', {
	FormConfigSetting: {
		Bg: '', // 背景图 string
		IconColor: '', // icon颜色 string
		TextColor: '', // 文字颜色 string
		PlaceholderColor: '', // 占位文本颜色 string
		FormInputColor: '', // 表单输入框颜色 string
		LineColor: '', // 表单内线言颜色色 string
		PageBottomColor: '', // 页面底色 string
		FormConfig: [
			// {
			//   Sort: 12, // 排序 int
			//   InputType: "VideoUpload", // 输入类型 string
			//   PlaceholderText: "VideoUpload", // 占位文本 string
			//   DataTableHeaderName: "xdf",
			//   LimitUploadNumber: 1,
			//   SelectionSetting: "fadf,fag",
			//   OptionalNumer: 2,
			//   IsRequired: "", // 是否必填 int 1,0
			// },
		],
		SubmitBtnImg: '', // 提交按钮图 string
		ActEndBtnImg: '', // 活动结束按钮图 string

		SubmitSuccessModal: '', // 提交成功弹窗 1,2 int
		SubmitSuccessModalImg: '',
		// SubmitSuccessModalImg:
		// "http://appybrentest.oss-cn-hangzhou.aliyuncs.com/Uploads/Cms/EventTemplate/2021-04-12/60741ea7164f9.jpg", // 弹窗图 string
		SubmitSuccessAdImg: '',
		// SubmitSuccessAdImg:
		// "http://appybrentest.oss-cn-hangzhou.aliyuncs.com/Uploads/Cms/EventTemplate/2021-04-12/60741ea7164f9.jpg",
		IsSubmitSuccessAdImg: '', // 广告位跳转 1,0 int
		// 添加跳转
		AddSubmitSuccessAdImgJump: [
			{
				CardNumber: null,
				CateId: null,
				FlashSaleId: null,
				FlashSaleStatus: null,
				ImageSrc: '',
				IsHideTopView: null,
				LookItemId: null,
				Name: null,
				NativePageType: '',
				RedirectLink: '',
				RedirectType: '',
				ShopItemId: null,
				ShopSubCategoryId: '',
				ShopSubCategoryIdF: '',
				ShopSubCategoryIdS: '',
				ShopSubCategoryName: null,
			},
		],
		IsSendCouponOfSubmitSuccesslModal: '', //  赠送优惠券 1,0 int
		// 添加优惠券
		CouponArrOfSubmitSuccessModal: [],
		CouponExpiredTimeOfSubmitSuccessModal: '', // 优惠券到期时间 int 1,2 1:固定日期 2:固定天数
		CouponExpiredDateOfSubmitSuccessModal: '', // 优惠券固定日期  int
		CouponExpiredDayOfSubmitSuccessModal: '', // 优惠券固定天数 int

		SubmitFailModal: '', // 提交失败弹窗 1,2 int
		SubmitFailModalImg: '', // 弹窗图 string
		SubmitFailAdImg: '', // 广告位图 string
		IsSubmitFailAdImg: '', // 广告位跳转 1,0 int
		// 添加跳转
		AddSubmitFailAdImgJump: [
			{
				CardNumber: null,
				CateId: null,
				FlashSaleId: null,
				FlashSaleStatus: null,
				ImageSrc: '',
				IsHideTopView: null,
				LookItemId: null,
				Name: null,
				NativePageType: '',
				RedirectLink: '',
				RedirectType: '',
				ShopItemId: null,
				ShopSubCategoryId: '',
				ShopSubCategoryIdF: '',
				ShopSubCategoryIdS: '',
				ShopSubCategoryName: null,
			},
		],
		IsSendCouponOfSubmitFailModal: '', //  赠送优惠券 1,0 int
		// 添加优惠券
		CouponArrOfSubmitFailModal: [],
		CouponExpiredTimeOfSubmitFailModal: '', // 优惠券到期时间 int 1,2 1:固定日期 2:固定天数
		CouponExpiredDateOfSubmitFailModal: '', // 优惠券固定日期  int
		CouponExpiredDayOfSubmitFailModal: '', // 优惠券固定天数 int

		NotFaceToUserModal: '', // 非面向用户弹窗 1,2 int
		NotFaceToUserModalImg: '', // 弹窗图 string
		NotFaceToUserAdImg: '', // 广告位图 string
		IsNotFaceToUserAdImg: '', // 广告位跳转 1,0 int
		// 添加跳转
		AddisNotFaceToUserAdImgJump: [
			{
				CardNumber: null,
				CateId: null,
				FlashSaleId: null,
				FlashSaleStatus: null,
				ImageSrc: '',
				IsHideTopView: null,
				LookItemId: null,
				Name: null,
				NativePageType: '',
				RedirectLink: '',
				RedirectType: '',
				ShopItemId: null,
				ShopSubCategoryId: '',
				ShopSubCategoryIdF: '',
				ShopSubCategoryIdS: '',
				ShopSubCategoryName: null,
			},
		],
		IsSendCouponOfNotFaceToUserModal: '', //  赠送优惠券 1,0 int
		// 添加优惠券
		CouponArrOfNotFaceToUserModal: [
			// {
			//   CouponId: "", // 优惠券单据号
			//   CouponName: "", // 优惠券名称
			// },
		],
		CouponExpiredTimeOfNotFaceToUserModal: '', // 优惠券到期时间 int 1,2 1:固定日期 2:固定天数
		CouponExpiredDateOfNotFaceToUserModal: '', // 优惠券固定日期  int
		CouponExpiredDayOfNotFaceToUserModal: '', // 优惠券固定天数 int
	},
	TableList: {
		pk_id: '',
	},
})
const HocIFloatBoxOfForm = importComponent('IFloatBoxOfForm', {
	BgImg: '',
})
const HocIBtnOfForm = importComponent('IBtnOfForm', {
	BgImg: '',
	BtnImg: '',
})
const HocCashCoupon = importComponent('CashCoupon', {
	FormConfigSetting: {
		//买券配置
		ActStyle: '', //1,2 选择活动样式 1，样式一  ；2，样式2
		ActType: '', //1,2  活动类型 1：单天 ；2：多天  (样式2不显示)
		ActStartDate: '', //活动开始时间（多天）
		ActEndDate: '', //活动结束时间（多天）
		SessionsConfig: [
			//场次设置
			{
				AddCoupon: [
					// 添加优惠券
					{
						CouponId: '', //优惠券单据号
						CouponName: '', // 优惠券名称
					},
				],
				CouponOverDateType: '', //优惠券过期日期(1固定日期，2固定天数)
				CouponStartDate: '', //优惠券生效时间
				CouponEndDate: '', //优惠券失效时间
				CouponOverNum: '', //过期天数
				Price: '', //售价
				Quota: '', //限购数
				OneUserQuota: '', //单个用户限购数
				UserBuyNum: '', //用户已购份数
				BeforeBg: '', //场次开始前图片
				OngoingBg: '', //场次进行中图片
				AfterBg: '', //场次结束图片
				SuccessPop: '', //购买成功弹窗 1:普通弹窗；2广告位弹窗
				PopBg: '', //成功弹窗图
				ToUseBtn: '', //立即使用按钮图
				IsSubmitSuccessAdImg: '', //成功广告位图
				AddSubmitSuccessAdImgJump: [
					//成功广告位跳转
					{
						CardNumber: null,
						CateId: null,
						FlashSaleId: null,
						FlashSaleStatus: null,
						ImageSrc: '',
						IsHideTopView: null,
						LookItemId: null,
						Name: null,
						NativePageType: '',
						RedirectLink: '',
						RedirectType: '',
						ShopItemId: null,
						ShopSubCategoryId: '',
						ShopSubCategoryIdF: '',
						ShopSubCategoryIdS: '',
						ShopSubCategoryName: null,
					},
				],
				SessionsStartTime: '', //场次开始时间
				SessionsEndTime: '', //场次结束时间
				SessionId: '',
			},
		],
		ActRuleOpen: '', //活动规则开关0,1
		RuleImg: '', //活动规则背景图
		RuleBg: '', //活动规则背景底色
		RuleBtnImg: '', //活动规则按钮图
		RuleMsg: '', //活动规则文字
		SessionsSwitchOpen: '', //临近场次切换 0,1；样式一默认为0不显示
		SessionsTabBgImg: '', //场次Tab背景图
		SessionsTabBgColor: '', //场次Tab底色
		TabColor: '', //tab文字颜色
		TabSelectedColor: '', //tab选中时文字颜色
		TabSelectedBgColor: '', //tab选中时颜色
		CountDownOpen: '', //倒计时开关，0,1
		CountDownImg: '', //倒计时背景图
		CountDownBg: '', //倒计时背景底色
		CountDownColor: '', //计时器文字颜色
		CountDownNumColor: '', //计时器数字颜色
		CountDownNumBgColor: '', //计时器数字背景颜色
		SessionsBgImg: '', //场次背景图
		SessionsBgColor: '', //场次底色
		ProgressOpen: '', //进度条开关（0,1）
		ProcessImg: '', //进度条背景图
		ProcessBg: '', //进度条背景底色
		ProcessBuyBg: '', //进度条已购颜色
		ProcessBuyTxtBg: '', //进度条已购文字颜色
		ProcessNotBuyBg: '', //进度条未购颜色
		BuyBtnImg: '', //购买按钮背景图
		BuyBtnBg: '', //购买按钮底色
		OngoingBuyImg: '', //进行中按钮图
		BeforeBuyImg: '', //即将开始按钮图
		EmptyBuyImg: '', // 活动结束按钮图
		RemindOpen: '', //设置提醒开关0,1
		RemindIconColor: '', //设置提醒icon颜色
		RemindImg: '', //设置提醒背景图
		RemindBg: '', //设置提醒底色
		RemindColor: '', //设置提醒字体颜色
		RemindPush: '', //提醒push模板
	},
	TableList: {
		pk_id: '',
	},
})

const HocIRecommendGiftForShareLandingPage = importComponent(
	'IRecommendGiftForShareLandingPage',
	{}
)
const HocIRecommendGiftForReceivePage = importComponent(
	'IRecommendGiftForReceivePage',
	{}
)
const HocIYuYue = importComponent('IYuYue', {
	YuyuePeopleNumStatus: '1', // 已预约人数
	YuyueButtonType: '0', // 预约按钮样式 // 	{ text: '默认样式', value: '0' },
	// { text: '自定义', value: '1' },
	ImageArr: [], // 预约按钮图片
	YuyueButtonTitle: '立即预约', // 预约按钮文案
})


export default class NewMenu extends React.Component<any, any> {
	constructor(props: any) {
		super(props)
	}
	render() {
		return (
			<Menu mode="inline">
				<SubMenu title="图片">
					<Menu.Item>
						<HocISingleImage {...this.props} />
					</Menu.Item>
					<Menu.Item>
						<HocITwoRowImage {...this.props} />
					</Menu.Item>
					<Menu.Item>
						<HocIThreeRowImage {...this.props} />
					</Menu.Item>
					<Menu.Item>
						<HocIFourRowImage {...this.props} />
					</Menu.Item>
					<Menu.Item>
						<HocVideo {...this.props} />
					</Menu.Item>
				</SubMenu>
				<SubMenu title="优惠券">
					<Menu.Item>
						<HocICoupon {...this.props} />
					</Menu.Item>
					<Menu.Item>
						<HocISingleCoupon {...this.props} />
					</Menu.Item>
				</SubMenu>
				<SubMenu title="自定义悬浮框">
					<Menu.Item>
						<HocICustomerService {...this.props} />
					</Menu.Item>
					<Menu.Item>
						<HocISingleImageFloatBox {...this.props} />
					</Menu.Item>
					<Menu.Item>
						<HocITwoRowImageFloatBox {...this.props} />
					</Menu.Item>
				</SubMenu>
				<SubMenu title="推荐预设商品">
					<Menu.Item>
						<HocGoodsFloatBox {...this.props} />
					</Menu.Item>
				</SubMenu>
				<SubMenu title="表单">
					<Menu.Item>
						<HocICustomForm {...this.props} />
					</Menu.Item>
					<Menu.Item>
						<HocIFloatBoxOfForm {...this.props} />
					</Menu.Item>
					<Menu.Item>
						<HocIBtnOfForm {...this.props} />
					</Menu.Item>
				</SubMenu>
				<SubMenu title="现金买券">
					<Menu.Item>
						<HocCashCoupon {...this.props} />
					</Menu.Item>
				</SubMenu>
				<SubMenu title="推荐有礼组件">
					<Menu.Item>
						<HocIRecommendGiftForShareLandingPage {...this.props} />
					</Menu.Item>
					<Menu.Item>
						<HocIRecommendGiftForReceivePage {...this.props} />
					</Menu.Item>
				</SubMenu>

				<SubMenu title="预约组件">
					<Menu.Item>
						<HocIYuYue {...this.props} />
					</Menu.Item>
				</SubMenu>
			</Menu>
		)
	}
}
