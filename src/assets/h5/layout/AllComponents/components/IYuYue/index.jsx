import React from 'react'

export default class IYuYue extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<div className={`IYuYue_ct`}>
				<div className="IYuYue_box_init">
					<div className="box1 flex-col">
						{this.props?.ComponentData?.YuyuePeopleNumStatus == '1' ? (
							<div className="bd3 flex-col justify-center align-center">
								<div className="group2 flex-row justify-between">
									<span className="txt1">已有</span>
									<div className="box8 flex-row justify-between">
										<div className="group3-0 flex-col justify-center align-start">
											<span className="txt2-0">1</span>
										</div>
										<div className="group3-1 flex-col justify-center align-start">
											<span className="txt2-1">7</span>
										</div>
										<div className="group3-2 flex-col justify-center align-start">
											<span className="txt2-2">3</span>
										</div>
										<div className="group3-3 flex-col justify-center align-start">
											<span className="txt2-3">5</span>
										</div>
										<div className="group3-4 flex-col justify-center align-start">
											<span className="txt2-4">8</span>
										</div>
										<div className="group3-5 flex-col justify-center align-start">
											<span className="txt2-5">6</span>
										</div>
										<div className="group3-6 flex-col justify-center align-start">
											<span className="txt2-6">4</span>
										</div>
									</div>
									<span className="word5">人预约</span>
								</div>
							</div>
						) : null}
						<div className="bd4 flex-row">
							<span className="txt3">姓名</span>{' '}
							<span className="info2">陈余超</span>
							<div className="wrap2 flex-col justify-center align-center">
								<span className="word6">一键填入预约信息</span>
							</div>
						</div>
						<div className="bd5 flex-col"></div>
						<div className="bd6 flex-row justify-between">
							<span className="word7">电话</span>{' '}
							<span className="txt4">15968842028</span>
						</div>
						<div className="bd7 flex-col"></div>
						<div className="bd8 flex-row">
							<span className="info3">地区</span>
							<span className="word8">浙江省&nbsp;杭州市&nbsp;江干区</span>
							<img
								className="label3"
								referrerpolicy="no-referrer"
								src="https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPng12ac517b9bc30cc828c345518a4481abead01c31aedf2d6e0082cf3e9e5ee829"
							/>
						</div>
						<div className="bd9 flex-col"></div>
						<div className="bd10 flex-row justify-between">
							<span className="word9">详细地址</span>
							<span className="txt5">红普路智慧绿谷6幢6楼</span>
						</div>
						<div className="bd11 flex-col"></div>
						<div className="bd12 flex-row justify-between">
							<img
								className="icon2"
								referrerpolicy="no-referrer"
								src="https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPng8939ee997524a3e7dd284e6da10a72e3e7abfe043fdf6b134f22b078178ea0c1"
							/>
							<div className="section1">
								<span className="word10">预约即默认同意</span>
								<span className="info4">《衣邦人用户协议》</span>
							</div>
						</div>
					</div>
				</div>
				{this.props?.ComponentData?.YuyueButtonType == '0' ? (
					<div className="IYuYue_btnText">
						{this.props.ComponentData?.YuyueButtonTitle}
					</div>
				) : (
					<div>
						<div
							className="IYuYue_btnText"
							style={{
								backgroundImage: `url(${this.props?.ComponentData?.ImageArr?.[0]?.ImageSrc})`,
								backgroundRepeat: 'no-repeat',
							}}
						>
						</div>
					</div>
				)}
			</div>
		)
	}
}
