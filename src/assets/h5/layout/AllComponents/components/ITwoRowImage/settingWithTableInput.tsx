import * as React from "react";
import { message } from "antd";
import * as _ from "lodash";
import HocForm from "../../../../higherComponent/HocForm";
interface IProps {
  componentProps: any;
  prefixCls?: string;
  ComponentData: {
    videoSrc: string;
  };
}

let Position_VIPAdForm_index: any = 101;
let RedirectType_VIPAdForm: any = 25;
let Position_VIPAdForm: any = {
  101: 1,
  102: 1,
  103: 1,
  201: 5,
  202: 5,
  203: 5,
  204: 5,
  205: 1,
  206: 1,
  207: 1,
  208: 999,
  default: 2,
};
export default HocForm({
  onInitValues(v: any) {
  },
  field: [
    {
      key: "ImageArr",
      title: "图片",
      type: "TableInputOfNewLayOut",
      props: {
        selection: {
          vipRedirectTypeList: [
            { text: "不跳转", value: "0" },
            { text: "指定链接，H5页面", value: "25" },
            { text: "原生页", value: "55" },

            // { text: "预设商品详情", value: "7" },
            // { text: "搭配详情", value: "22" },
            // { text: "预约量体", value: "6" },
            // { text: "跳转秒杀列表", value: "26" },
          ],
          nativePage: [
            { text: "预约量体页", value: "预约量体页" },
            { text: "VIP会员订购页", value: "VIP会员订购页" },
            { text: "VIP中心", value: "VIP中心" },
            { text: "预设商品详情", value: "预设商品详情" },
            { text: "搭配LOOK", value: "搭配LOOK" },
            { text: "限时秒杀", value: "限时秒杀" },
            { text: "我的优惠券", value: "我的优惠券" },
            { text: "我的钱包", value: "我的钱包" },
            { text: "我的身材数据", value: "我的身材数据" },
            { text: "置衣卡详情", value: "置衣卡详情" },
            { text: "搭配LOOK详情", value: "搭配LOOK详情" },
          ],
        },
        withoutModal: true,
        modalColumns: [],
        // withoutAdd: true,
        maxColSize: 2,

        columns: [
          {
            title: "图片",
            key: "ImageSrc",
            type: "files",
            editable: true,
            props: {
              afterFailClear: true,
            },
          },
          {
            title: "跳转类型",
            key: "RedirectType",
            type: "radio",
            options: "vipRedirectTypeList",
            editable: true,
            width: 150,
            onChange(r: any, v: any) {
              RedirectType_VIPAdForm = r.RedirectType;
            },
          },
          {
            title: "跳转链接",
            key: "RedirectLink",
            type: "text",
            editable: true,
            // isShow() {
            //   return RedirectType_VIPAdForm == "25";
            // },
          },
          {
            title: "原生页类型",
            key: "NativePageType",
            type: "radio",
            options: "nativePage",
            editable: true,
            width: 200,
            // isShow() {
            //   return RedirectType_VIPAdForm == "55";
            // },
          },
          {
            title: "原生页跳转参数",
            key: "NativePageRedirectParam",
            type: "text",
            width: 250,
            editable: true,
            // isShow() {
            //   return RedirectType_VIPAdForm == "55";
            // },
          },
        ],

        onChangeFn(v: any, componentKey: any) {
          console.log("vvvvvv33vv", v, componentKey);
          // if (v == undefined) {
          //   this.props.updateComponent({
          //     key: componentKey,
          //     ComponentData: {
          //       videoCoverImageSrc: "",
          //     },
          //   });
          // }
          if (v.length > 0) {
            this.props.updateComponent({
              key: componentKey,

              ComponentData: {
                imageArr: v
                  .filter((item: any) => !_.isEmpty(item))
                  .map((item: any) => ({
                    imageSrc: _.isObject(item.imageSrc)
                      ? item.imageSrc.F_URL
                      : item.imageSrc,
                  })),
              },
            });
          }
        },
      },
      render() {
        return (
          <div style={{ color: "red" }}>
            {`最多上传2张，宽度750px,格式jpg、png`}
          </div>
        );
      },
    },
  ],  
});
