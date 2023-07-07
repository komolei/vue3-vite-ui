import * as React from 'React'
import { Tabs } from 'antd'
const { TabPane } = Tabs
import ISingleImageSetting from '../AllComponents/components/ISingleImage/setting'
import ITwoRowImageSetting from '../AllComponents/components/ITwoRowImage/setting'
import IThreeRowImageSetting from '../AllComponents/components/IThreeRowImage/setting'
import IFourRowImageSetting from '../AllComponents/components/IFourRowImage/setting'
import IVideoSetting from '../AllComponents/components/IVideo/setting'
import ICouponSetting from '../AllComponents/components/ICoupon/setting'
import ISingleCouponSetting from '../AllComponents/components/ISingleCoupon/setting'
import ICustomerServiceSetting from '../AllComponents/components/ICustomerService/setting'
import ISingleImageFloatBoxSetting from '../AllComponents/components/ISingleImageFloatBox/setting'
import ITwoRowImageFloatBoxSetting from '../AllComponents/components/ITwoRowImageFloatBox/setting'
import GoodsFloatBoxSetting from '../AllComponents/components/goods/setting'
import ICustomFormSetting from '../AllComponents/components/ICustomForm/setting'
import IBtnOfFormSetting from '../AllComponents/components/IBtnOfForm/setting'
import IFloatBoxOfFormSetting from '../AllComponents/components/IFloatBoxOfForm/setting'
import CashCouponSetting from '../AllComponents/components/CashCoupon/setting'
import IRecommendGiftForShareLandingPageSetting from '../AllComponents/components/IRecommendGiftForShareLandingPage/setting'
import IRecommendGiftForReceivePageSetting from '../AllComponents/components/IRecommendGiftForReceivePage/setting'
import IYuYueSetting from '../AllComponents/components/IYuYue/setting'
const importComponent = (
	ComponentKey: any,
	name: string,
	ComponentAlias: string,
	ComponentData: any = {},
	props: any
) => {
	switch (name) {
		case 'GoodsFloatBox':
			return (
				<GoodsFloatBoxSetting
					ComponentKey={ComponentKey}
					ComponentAlias={ComponentAlias}
					SettingKey={ComponentKey}
					ComponentData={ComponentData}
					{...props}
				/>
			)
		case 'IBtnOfForm':
			return (
				<IBtnOfFormSetting
					ComponentKey={ComponentKey}
					ComponentAlias={ComponentAlias}
					SettingKey={ComponentKey}
					ComponentData={ComponentData}
					{...props}
				/>
			)
		case 'IFloatBoxOfForm':
			return (
				<IFloatBoxOfFormSetting
					ComponentKey={ComponentKey}
					ComponentAlias={ComponentAlias}
					SettingKey={ComponentKey}
					ComponentData={ComponentData}
					{...props}
				/>
			)
		case 'ICustomForm':
			return (
				<ICustomFormSetting
					ComponentKey={ComponentKey}
					ComponentAlias={ComponentAlias}
					SettingKey={ComponentKey}
					ComponentData={ComponentData}
					{...props}
				/>
			)
		case 'ICustomerService':
			return (
				<ICustomerServiceSetting
					ComponentKey={ComponentKey}
					ComponentAlias={ComponentAlias}
					SettingKey={ComponentKey}
					ComponentData={ComponentData}
					{...props}
				/>
			)
		case 'ISingleImageFloatBox':
			return (
				<ISingleImageFloatBoxSetting
					ComponentKey={ComponentKey}
					ComponentAlias={ComponentAlias}
					SettingKey={ComponentKey}
					ComponentData={ComponentData}
					{...props}
				/>
			)
		case 'ITwoRowImageFloatBox':
			return (
				<ITwoRowImageFloatBoxSetting
					ComponentKey={ComponentKey}
					ComponentAlias={ComponentAlias}
					SettingKey={ComponentKey}
					ComponentData={ComponentData}
					{...props}
				/>
			)
		case 'ISingleImage':
			return (
				<ISingleImageSetting
					ComponentKey={ComponentKey}
					ComponentAlias={ComponentAlias}
					SettingKey={ComponentKey}
					ComponentData={ComponentData}
					{...props}
				/>
			)
		case 'ITwoRowImage':
			return (
				<ITwoRowImageSetting
					ComponentKey={ComponentKey}
					ComponentAlias={ComponentAlias}
					SettingKey={ComponentKey}
					ComponentData={ComponentData}
					{...props}
				/>
			)
		case 'IThreeRowImage':
			return (
				<IThreeRowImageSetting
					ComponentKey={ComponentKey}
					ComponentAlias={ComponentAlias}
					SettingKey={ComponentKey}
					ComponentData={ComponentData}
					{...props}
				/>
			)
		case 'IFourRowImage':
			return (
				<IFourRowImageSetting
					ComponentKey={ComponentKey}
					ComponentAlias={ComponentAlias}
					SettingKey={ComponentKey}
					ComponentData={ComponentData}
					{...props}
				/>
			)
		case 'IFourRowImage':
			return (
				<IFourRowImageSetting
					ComponentKey={ComponentKey}
					ComponentAlias={ComponentAlias}
					SettingKey={ComponentKey}
					ComponentData={ComponentData}
					{...props}
				/>
			)
		case 'IVideo':
			return (
				<IVideoSetting
					SettingKey={ComponentKey}
					ComponentAlias={ComponentAlias}
					ComponentKey={ComponentKey}
					ComponentData={ComponentData}
					{...props}
				/>
			)
		case 'ICoupon':
			return (
				<ICouponSetting
					SettingKey={ComponentKey}
					ComponentAlias={ComponentAlias}
					ComponentKey={ComponentKey}
					ComponentData={ComponentData}
					{...props}
				/>
			)
		case 'ISingleCoupon':
			return (
				<ISingleCouponSetting
					SettingKey={ComponentKey}
					ComponentAlias={ComponentAlias}
					ComponentKey={ComponentKey}
					ComponentData={ComponentData}
					{...props}
				/>
			)
		case 'CashCoupon':
			return (
				<CashCouponSetting
					SettingKey={ComponentKey}
					ComponentAlias={ComponentAlias}
					ComponentKey={ComponentKey}
					ComponentData={ComponentData}
					{...props}
				/>
			)
		case 'IRecommendGiftForShareLandingPage':
			return (
				<IRecommendGiftForShareLandingPageSetting
					SettingKey={ComponentKey}
					ComponentAlias={ComponentAlias}
					ComponentKey={ComponentKey}
					ComponentData={ComponentData}
					{...props}
				/>
			)
		case 'IRecommendGiftForReceivePage':
			return (
				<IRecommendGiftForReceivePageSetting
					SettingKey={ComponentKey}
					ComponentAlias={ComponentAlias}
					ComponentKey={ComponentKey}
					ComponentData={ComponentData}
					{...props}
				/>
			)
		case 'IYuYue':
			return (
				<IYuYueSetting
					SettingKey={ComponentKey}
					ComponentAlias={ComponentAlias}
					ComponentKey={ComponentKey}
					ComponentData={ComponentData}
					{...props}
				/>
			)

		default:
			return null
	}
}
export default class SettingsPanel extends React.Component<any, any> {
	constructor(props: any) {
		super(props)
	}
	render() {
		return (
			<Tabs className={'tabs-container'}>
				<TabPane tab="设置" forceRender key="container">
					{this.props.componentLib.length > 0
						? this.props.componentLib
								.filter(
									(item: any) => item.Key == this.props.selectedComponentKey
								)
								.map((item: any) => {
									const Item: any = importComponent(
										item.Key,
										item.ComponentName,
										item.ComponentAlias,
										item.ComponentData,
										this.props
									)
									return (
										<div key={item.Key}>
											<h3>{item.ComponentAlias}</h3>
											{Item}
										</div>
									)
								})
						: null}
				</TabPane>
			</Tabs>
		)
	}
	componentDidMount() {}
}
