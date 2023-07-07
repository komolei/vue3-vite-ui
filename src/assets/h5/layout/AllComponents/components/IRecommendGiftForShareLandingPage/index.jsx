import React from 'react'
import ReactDom from 'react'
import axios from 'axios'

// 推荐有礼落地页
export default class IRecommendGiftForShareLandingPage extends React.Component {
	constructor(props) {
		super(props)
		this.state = {}
	}
	render() {
		const { IRecommendGiftForShareLandingPageRes } = this.props.ComponentData
		return (
			<div className={`IRecommendGiftForShareLandingPage`}>
				{IRecommendGiftForShareLandingPageRes?.material ? (
					<div>
						<img
							src={
								IRecommendGiftForShareLandingPageRes.material.goldCardBelowImg
							}
						/>
						<img
							src={IRecommendGiftForShareLandingPageRes.material.goldCardImg}
						/>
						<img
							src={
								IRecommendGiftForShareLandingPageRes.material.platinumMemberImg
							}
						/>
						<img
							src={
								IRecommendGiftForShareLandingPageRes.material.diamondMemberImg
							}
						/>
						<img
							src={
								IRecommendGiftForShareLandingPageRes.material.getPackageBtnImg
							}
						/>
					</div>
				) : null}
			</div>
		)
	}

	componentDidMount() {
		if (this.props.ComponentData?.CommonActivityMaterialPkId) {
			axios
				.get('cms/ApiActivityMaterialConfig/detail', {
					params: {
						Id: this.props.ComponentData?.CommonActivityMaterialPkId,
						Type: 5,
					},
				})
				.then((res) => {
					this.props.ParentProps.updateComponent({
						Key: this.props.Key,
						ComponentData: {
							CommonActivityMaterialPkId:
								this.props.ComponentData.CommonActivityMaterialPkId,
							IRecommendGiftForShareLandingPageRes: res.data?.Data,
						},
					})
				})
		}
	}
}
