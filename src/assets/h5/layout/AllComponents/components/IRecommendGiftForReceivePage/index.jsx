import React from 'react'
import ReactDom from 'react'
import axios from 'axios'
import _ from 'lodash'
// 推荐有礼领取
export default class IRecommendGiftForReceivePage extends React.Component {
	constructor(props) {
		super(props)
		this.state = {}
	}

	render() {
		const { IRecommendGiftForReceivePageRes } = this.props.ComponentData
		return (
			<div className={`IRecommendGiftForReceivePage`}>
				{IRecommendGiftForReceivePageRes?.material ? (
					<div>
						{_.sortBy(IRecommendGiftForReceivePageRes.material.topImgList, [
							function (o) {
								return o.sort
							},
						]).map((item) => (
							<img src={item.imgUrl} />
						))}
						<img
							src={IRecommendGiftForReceivePageRes.material.goldCardBelowImg}
						/>
						<img src={IRecommendGiftForReceivePageRes.material.goldCardImg} />
						<img
							src={IRecommendGiftForReceivePageRes.material.platinumMemberImg}
						/>
						<img
							src={IRecommendGiftForReceivePageRes.material.diamondMemberImg}
						/>
						<img
							src={
								IRecommendGiftForReceivePageRes.material
									.recommendIntroductionImg
							}
						/>
						<img
							src={IRecommendGiftForReceivePageRes.material.inviteFriendBtnImg}
						/>
						<img
							src={
								IRecommendGiftForReceivePageRes.material.faceToFaceInviteBtnImg
							}
						/>
						<img
							src={IRecommendGiftForReceivePageRes.material.recommendBottomImg}
						/>
						<img
							src={
								IRecommendGiftForReceivePageRes.material.recommendOpenBottomImg
							}
						/>
						<img
							src={IRecommendGiftForReceivePageRes.material.inviteFloatImg}
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
								IRecommendGiftForReceivePageRes: res.data?.Data,
						},
					})
				})
		}
	}
}
