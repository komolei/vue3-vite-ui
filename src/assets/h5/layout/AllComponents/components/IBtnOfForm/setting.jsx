import React from "react";
import HocForm from "../../../../higherComponent/HocForm";

export default HocForm({
  onInitValues(values) {
    // if()
  },
  field: [
    {
      title: "按钮图片",
      key: "BtnImg",
      type: "files",
      props: {
        isHadLimit: true,
        limitWidth: 750,
      },
      render() {
        return (
          <span style={{ color: "red" }}>
            格式为jpg、png、gif，图片宽度750px,单张图片大小300k以内
          </span>
        );
      },
    },
    // {
    //   title: "背景图片",
    //   key: "BgImg",
    //   type: "files",
    //   props: {
    //     isHadLimit: true,
    //     limitWidth: 750,
    //   },
    //   render() {
    //     return (
    //       <span style={{ color: "red" }}>
    //         格式为jpg、png、gif，图片宽度750px,单张图片大小300k以内
    //       </span>
    //     );
    //   },
    // },
    {
      title: "表单链接",
      key: "FormUrl",
      type: "text",
      render() {
        return (
          <div style={{ color: "red" }}>不填写则默认跳转页面内表单位置</div>
        );
      },
    },
  ],
});
