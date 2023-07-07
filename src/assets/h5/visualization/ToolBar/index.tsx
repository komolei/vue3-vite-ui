import * as React from 'React'
import { Button, Col, Menu, Icon } from 'antd'

export default class ToolBar extends React.Component<any, { current: string }> {
	constructor(props: any) {
		super(props)
		this.state = {
			current: 'mobile',
		}
	}
	handleClick_ToolBar(e: any) {
		this.setState({
			current: e.key,
		})
	}
	render() {
		return (
			<div className="toolBar_ct">
				<div className="toolBar_operation_box">
					<span onClick={() => this.props.handleIsShowOfLeftPreview()}>
						<svg
							width="28px"
							height="28px"
							viewBox="0 0 28 28"
							xmlns="http://www.w3.org/2000/svg"
						>
							<g
								id="icon-\u663E\u793A\u5DE6\u4FA7\u83DC\u5355"
								stroke="none"
								strokeWidth="1"
								fill="none"
								fillRule="evenodd"
							>
								<g
									id="\u7F16\u7EC4-10"
									transform="translate(5.000000, 5.000000)"
									stroke="#DDDDDD"
									strokeWidth="1.5"
								>
									<rect
										id="\u77E9\u5F62"
										x="0.75"
										y="0.75"
										width="16.5"
										height="16.5"
										rx="2"
									></rect>
									<line
										x1="7.5"
										y1="1.5"
										x2="7.5"
										y2="16.5"
										id="\u76F4\u7EBF-4"
										strokeLinecap="square"
									></line>
									<line
										x1="1.5"
										y1="7"
										x2="4.5"
										y2="7"
										id="\u76F4\u7EBF-5"
										strokeLinecap="round"
									></line>
									<line
										x1="1.5"
										y1="10.5"
										x2="4.5"
										y2="10.5"
										id="\u76F4\u7EBF-5"
										strokeLinecap="round"
									></line>
								</g>
							</g>
						</svg>
					</span>
					<span onClick={() => this.props.handleIsShowOfRightPreview()}>
						<svg
							width="28px"
							height="28px"
							viewBox="0 0 28 28"
							xmlns="http://www.w3.org/2000/svg"
						>
							<g
								id="icon-\u663E\u793A\u53F3\u4FA7\u83DC\u5355"
								stroke="none"
								strokeWidth="1"
								fill="none"
								fillRule="evenodd"
							>
								<g
									id="\u7F16\u7EC4-10"
									transform="translate(14.000000, 14.000000) scale(-1, 1) translate(-14.000000, -14.000000) translate(5.000000, 5.000000)"
									stroke="#DDDDDD"
									strokeWidth="1.5"
								>
									<rect
										id="\u77E9\u5F62"
										x="0.75"
										y="0.75"
										width="16.5"
										height="16.5"
										rx="2"
									></rect>
									<line
										x1="7.5"
										y1="1.5"
										x2="7.5"
										y2="16.5"
										id="\u76F4\u7EBF-4"
										strokeLinecap="square"
									></line>
									<line
										x1="1.5"
										y1="7"
										x2="4.5"
										y2="7"
										id="\u76F4\u7EBF-5"
										strokeLinecap="round"
									></line>
									<line
										x1="1.5"
										y1="10.5"
										x2="4.5"
										y2="10.5"
										id="\u76F4\u7EBF-5"
										strokeLinecap="round"
									></line>
								</g>
							</g>
						</svg>
					</span>
					<span onClick={() => this.props.cancel()}>取消</span>
					<span onClick={() => this.props.submit()}>保存</span>
				</div>
			</div>
		)
	}
}
