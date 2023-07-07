import * as React from 'react'
import * as ReactDom from 'react'
import { Form, Radio, Input, Upload, Button, Icon, message } from 'antd'
import { getSelection } from '../../../../../common/store'
import * as _ from 'lodash'
import HocForm from '../../../../higherComponent/HocForm'
interface IProps {
	ComponentProps: any
	prefixCls?: string
	ComponentData: {
		InteractiveWay: any
		leftImageSrc: string
		rightImageSrc: string
	}
}

export default HocForm({
	onInitValues(values: any) {
		if (values && values.InteractiveWay == undefined) {
			values.InteractiveWay = '1'
		}
	},
	field: [
		// {
		// 	title: '选择交互',
		// 	key: 'InteractiveWay',
		// 	type: 'radio',
		// 	options: [
		// 		{ text: '默认样式', value: '1' },
		// 		{ text: '自定义图片', value: '2' },
		// 	],
		// 	fieldSet: {
		// 		initialValue: '1',
		// 	},
		// 	rule: [{ required: true, message: '请选择交互' }],
		// },
		// {
		// 	title: '左侧图片',
		// 	key: 'leftImageSrc',
		// 	type: 'files',
		// 	props: {
		// 		isHadLimit: true,
		// 		limitWidth: 172,
		// 	},
		// 	rule: [{ required: true, message: '请上传封面图片' }],
		// 	render() {
		// 		return <span> 图片要求：宽度172px ，格式jpg、png、gif。</span>
		// 	},
		// },
		// {
		// 	title: '右侧图片',
		// 	key: 'rightImageSrc',
		// 	type: 'files',
		// 	props: {
		// 		isHadLimit: true,
		// 		limitWidth: 578,
		// 	},
		// 	rule: [{ required: true, message: '请上传封面图片' }],
		// 	render() {
		// 		return <span> 图片要求：宽度578px ，格式jpg、png、gif。</span>
		// 	},
		// },
		{
			title: '预约悬浮窗样式',
			key: 'InteractiveWay',
			type: 'select',
			options: [
				{ text: '默认样式', value: '1' },
				{ text: '样式一', value: '2' },
				{ text: '样式二', value: '3' },
				{ text: '自定义', value: '4' },
			],

			rule: [{ required: true, message: '请选择预约悬浮窗样式' }],
		},
		{
			title: '咨询按钮',
			key: 'ConsultingButtonStatus',
			type: 'switch',
			rule: [{ required: true, message: '咨询按钮' }],

			isShowFn(v: any) {
				return ['1'].includes(v.InteractiveWay)
			},
		},
		// {
		// 	title: '底部悬浮窗文案',
		// 	key: 'FloorSuspensionWindowTitle',
		// 	type: 'text',
		// 	props: {
		// 		maxLength: 100,
		// 		placeholder: '请输入',
		// 	},
		// 	// todo 需要解决文字显示的问题
		// 	// customOption(field: any, v: any) {
		// 	// 	this.props.updateComponent({
		// 	// 		Key: this.ComponentKey,
		// 	// 		ComponentData: {
		// 	// 			...this.props.ComponentData,
		// 	// 			FloorSuspensionWindowTitle: ['2'].includes(v.InteractiveWay)
		// 	// 				? '立即预约'
		// 	// 				: '立即预约专业着装顾问免费上门量体',
		// 	// 		},
		// 	// 	})
		// 	// 	return
		// 	// 	field.fieldSet.initialValue = ['2'].includes(v.InteractiveWay)
		// 	// 		? '立即预约'
		// 	// 		: '立即预约专业着装顾问免费上门量体'
		// 	// },
		// 	isShowFn(v: any) {
		// 		return ['1', '2'].includes(v.InteractiveWay)
		// 	},
		// 	render() {
		// 		return <div style={{ color: 'red' }}>提示：建议输入不超过13个字</div>
		// 	},
		// },
		{
			title: '底部悬浮窗标题',
			key: 'FloorSuspensionWindowTitle',
			type: 'text',
			props: {
				maxLength: 16,
				placeholder: '请输入',
			},
			isShowFn(v: any) {
				return ['1', '2', '3'].includes(v.InteractiveWay)
			},
			render() {
				let num =
					this.props &&
					this.props.ComponentData &&
					this.props.ComponentData.InteractiveWay &&
					this.props.ComponentData.InteractiveWay == '1'
						? 16
						: 13

				return <div style={{ color: 'red' }}>提示：建议输入不超过{num}个字</div>
			},
			// customOption(field: any, v: any) {
			// 	this.props.updateComponent({
			// 		Key: this.ComponentKey,
			// 		ComponentData: {
			// 			...this.props.ComponentData,
			// 			FloorSuspensionWindowTitle: ['1'].includes(v.InteractiveWay)
			// 				? '立即预约专业着装顾问免费上门量体'
			// 				: '',
			// 		},
			// 	})
			// 	return
			// 	field.fieldSet.initialValue = ['2'].includes(v.InteractiveWay)
			// 		? '立即预约'
			// 		: '立即预约专业着装顾问免费上门量体'
			// },
		},
		{
			title: '底部悬浮窗描述',
			key: 'FloorSuspensionWindowTitleDesc',
			type: 'text',
			props: {
				maxLength: 17,
				placeholder: '请输入',
			},
			isShowFn(v: any) {
				return ['3'].includes(v.InteractiveWay)
			},
			render() {
				return <div style={{ color: 'red' }}>提示：建议输入不超过17个字</div>
			},
		},
		{
			title: '按钮文案',
			key: 'FloorSuspensionWindowButtonTitle',
			type: 'text',
			props: {
				maxLength: 6,
				placeholder: '请输入文案',
			},
			isShowFn(v: any) {
				return ['2', '3'].includes(v.InteractiveWay)
			},
			render() {
				return <div style={{ color: 'red' }}>提示：建议输入不超过6个字</div>
			},
		},
		{
			title: '咨询按钮图片上传',
			key: 'leftImageSrc',
			type: 'files',
			props: {
				data: { Type: '4' },
				accept: 'image/*',
				url: 'cms/ApiEventTemplate/uploadImg',
				urlOnly: true,
				single: true,
				limitWidth: 172,
				withoutMsg: false,
			},
			isShowFn(v: any) {
				return ['4'].includes(v.InteractiveWay)
			},
			render() {
				return (
					<div>
						提示：建议上传图片宽172px，高108px,图片格式jpg、png、gif，图片大小不超过300k，不上传则为默认样式。
					</div>
				)
			},
		},
		{
			title: '悬浮窗图片上传',
			key: 'rightImageSrc',
			type: 'files',
			props: {
				data: { Type: '6' },
				accept: 'image/*',
				url: 'cms/ApiEventTemplate/uploadImg',
				urlOnly: true,
				single: true,
				withoutMsg:false,
				limitWidth: 578,
			},
			isShowFn(v: any) {
				return ['4'].includes(v.InteractiveWay)
			},
			render() {
				return (
					<div>
						提示：建议上传图片宽578px，高108px,图片格式jpg、png、gif，图片大小不超过300ak，不上传则为默认样式
					</div>
				)
			},
		},
	],
})
