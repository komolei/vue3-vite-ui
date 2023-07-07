import HocForm from "../../../../higherComponent/HocForm";

import * as React from 'react'
export default HocForm({
  field: [
    {
      title: "视频",
      key: "VideoSrc",
      type: "text",
      rule: [{required: true, message: '请填写视频链接'}],
      props:{
        placeholder: '填写视频链接'
      },
      render(){
        return <div> 视频要求：格式以.mp4,.avi结尾。</div>
      }
    },
    {
      title: "封面图片",
      key: "VideoCoverImageSrc",
      type: "files",
      rule: [{required: true, message: '请上传封面图片'}],
      render(){
        return <span> 图片要求：宽度750px ，格式jpg、png。</span>
      }
    },
  ],
});
