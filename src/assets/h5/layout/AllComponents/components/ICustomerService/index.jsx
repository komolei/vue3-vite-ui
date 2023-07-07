import React from 'react'
import ReactDom from 'react'

export default class ICustomerService extends React.Component {
	constructor(props) {
		super(props)
	}
	render() {
		return (
			<div className={`ICustomerService`}>
				<div className="ICustomerService_ct">
					{/* <div className="ICustomerService_box">
						<div className="ICustomerService_content">
							<div className="customServiceImage_box">
								<img
									src={
										this.props.ComponentData.InteractiveWay != '2'
											? 'https://ossstatic.ybren.com/Wx/Public/wap/yuyue/active_kefu.jpg'
											: this.props.ComponentData.leftImageSrc
									}
								/>
							</div>
							<div className="yuYueImage_box">
								<img
									src={
										this.props.ComponentData.InteractiveWay != '2'
											? 'https://ossstatic.ybren.com/Wx/Public/wap/yuyue/active_yuyue_3.jpg'
											: this.props.ComponentData.rightImageSrc
									}
								/>
							</div>
						</div>
					</div> */}

					{this?.props?.ComponentData?.InteractiveWay == '1' ? (
						<div className="ICustomerService_box_1">
							<div className="ICustomerService_content">
								{this.props.ComponentData.ConsultingButtonStatus == 1 ? (
									<div className="customServiceImage_box">
										<img src="https://ossstatic.ybren.com/Wx/Public/wap/yuyue/active_kefu.jpg" />
									</div>
								) : null}
								<div className="yuYueImage_box">
									{this.props.ComponentData?.FloorSuspensionWindowTitle ??
										'立即预约专业着装顾问免费上门量体'}
								</div>
							</div>
						</div>
					) : null}
					{this?.props?.ComponentData?.InteractiveWay == '2' ? (
						<div className="ICustomerService_box_2">
							<span>
								{this?.props?.ComponentData?.FloorSuspensionWindowTitle ?? '立即预约'}
							</span>
							<div className="yuyueBtn">
								{this?.props?.ComponentData?.FloorSuspensionWindowButtonTitle}
							</div>
						</div>
					) : null}
					{this?.props?.ComponentData?.InteractiveWay == '3' ? (
						<div className="ICustomerService_box_3">
							<div className="bottomText_ct">
								<p>{this?.props?.ComponentData?.FloorSuspensionWindowTitle}</p>
								<p>{this?.props?.ComponentData?.FloorSuspensionWindowTitleDesc}</p>
							</div>
							<div className="yuyueBtn">
								{this?.props?.ComponentData?.FloorSuspensionWindowButtonTitle}
							</div>
						</div>
					) : null}
					{this?.props?.ComponentData?.InteractiveWay == '4' ? (
						<div className="ICustomerService_box_4">
							<div className="ICustomerService_content">
								<div className="customServiceImage_box">
									<img
										src={
											this.props.ComponentData.ConsultingButtonStatus == '0'
												? 'https://ossstatic.ybren.com/Wx/Public/wap/yuyue/active_kefu.jpg'
												: this.props.ComponentData.leftImageSrc
										}
									/>
								</div>
								<div className="yuYueImage_box">
									<img
										src={
											this.props.ComponentData.ConsultingButtonStatus == '0'
												? 'https://ossstatic.ybren.com/Wx/Public/wap/yuyue/active_yuyue_3.jpg'
												: this.props.ComponentData.rightImageSrc
										}
									/>
								</div>
							</div>
						</div>
					) : null}
				</div>
			</div>
		)
	}
}
