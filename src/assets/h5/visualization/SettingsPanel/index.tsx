import * as React from 'React'

import ITableSetting from '../AllComponents/components/ITable/setting1'
const importComponent = (
	ComponentKey: any,
	name: string,
	ComponentAlias: string,
	ComponentData: any = {},
	props: any
) => {
	switch (name) {
		case 'ITable':
			return (
				<ITableSetting
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
			<div>
				<div className="right-setting-title">
					<svg
						width="16px"
						height="16px"
						viewBox="0 0 16 16"
						xmlns="http://www.w3.org/2000/svg"
					>
						<g
							id="icon-\u53F3\u4FA7-\u5C5E\u6027"
							stroke="none"
							strokeWidth="1"
							fill="none"
							fillRule="evenodd"
						>
							<g fill="#222222">
								<path
									d="M12,1 C13.1045695,1 14,1.8954305 14,3 L14,6.955 L13.3372905,6.29289322 C12.5562419,5.51184464 11.2899119,5.51184464 10.5088634,6.29289322 L6.08578644,10.7159701 C5.71071368,11.0910429 5.5,11.5997507 5.5,12.1301837 L5.5,14 L3,14 C1.8954305,14 1,13.1045695 1,12 L1,3 C1,1.8954305 1.8954305,1 3,1 L12,1 Z M6.25,7.5 L3.75,7.5 C3.33578644,7.5 3,7.83578644 3,8.25 C3,8.66421356 3.33578644,9 3.75,9 L3.75,9 L6.25,9 C6.66421356,9 7,8.66421356 7,8.25 C7,7.83578644 6.66421356,7.5 6.25,7.5 L6.25,7.5 Z M8.25,3.5 L3.75,3.5 C3.33578644,3.5 3,3.83578644 3,4.25 C3,4.66421356 3.33578644,5 3.75,5 L3.75,5 L8.25,5 C8.66421356,5 9,4.66421356 9,4.25 C9,3.83578644 8.66421356,3.5 8.25,3.5 L8.25,3.5 Z"
									id="\u5F62\u72B6\u7ED3\u5408"
								></path>
								<path
									d="M11.5695235,7.35355339 L7.14644661,11.7766303 C7.05267842,11.8703985 7,11.9975755 7,12.1301837 L7,14.5 C7,14.7761424 7.22385763,15 7.5,15 L9.8698163,15 C10.0024245,15 10.1296015,14.9473216 10.2233697,14.8535534 L14.6464466,10.4304765 C14.8417088,10.2352143 14.8417088,9.91863183 14.6464466,9.72336969 L12.2766303,7.35355339 C12.0813682,7.15829124 11.7647857,7.15829124 11.5695235,7.35355339 Z"
									id="\u76F4\u7EBF"
								></path>
							</g>
						</g>
					</svg>
					<span>设置</span>
				</div>
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
										<h3 style={{ marginLeft: '24px' }}>
											{item.ComponentAlias}
										</h3>
										{Item}
									</div>
								)
							})
					: null}
			</div>
		)
	}
	componentDidMount() {}
}
