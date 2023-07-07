import * as React from "react";
import * as ReactDom from "react";
import { Form, Radio, Input, Upload, Button, Icon, message } from "antd";
// import {
//   layoutStore,
//   layoutAction,
//   layoutActionFn,
//   selectionStore,
// } from "../../../../../common/store";
import * as _ from "lodash";
import HocForm from "../../../../higherComponent/HocForm";
interface IProps {
  ComponentProps: any;
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
  default: 5,
};

// HocForm({
//   onInitValues(v: any) {
//     console.log("xx222");
//     // v.status = 1;
//   },
//   field: [
//     {
//       title: "选择交互",
//       key: "InteractiveWay",
//       type: "radio",
//       options: [
//         { text: "无交互", value: "1" },
//         { text: "轮播", value: "2" },
//       ],
//       onChange(v: any, ComponentKey: any) {
//         if (v == "2") {
//           Position_VIPAdForm_index = 208;
//         }
//         if (v == "1") {
//           Position_VIPAdForm_index = 101;
//         }
//       },
//     },
//     {
//       key: "ImageArr",
//       title: "图片",
//       type: "TableInputOfNewLayOut",
//       // onChange(v: any, ComponentKey: any) {
//       //   console.log('cTableInputOfNewLayOut',v)
//       // },
//       props: {
//         // onChange(v: any, ComponentKey: any) {
//         //   console.log('cTableInputOfNewLayOu2t',v)
//         // },
//         selection: {
//           vipRedirectTypeList: [
//             { text: "不跳转", value: "0" },
//             { text: "指定链接，H5页面", value: "25" },
//             { text: "原生页", value: "55" },
//           ],
//           nativePage: [
//             { text: "预约量体页", value: "15" },
//             { text: "VIP会员订购页", value: "12" },
//             { text: "VIP中心", value: "1" },
//             { text: "预设商品详情", value: "10" },
//             { text: "搭配LOOK", value: "-1" },
//             { text: "限时秒杀", value: "20" },
//             { text: "我的优惠券", value: "5" },
//             { text: "我的钱包", value: "4" },
//             { text: "我的身材数据", value: "7" },
//             { text: "置衣卡详情", value: "23" },
//             { text: "搭配LOOK详情", value: "22" },
//           ],
//         },
//         withoutModal: true,
//         modalColumns: [],
//         // withoutAdd: true,
//         maxColSize: 1,
//         changeMaxColSize(value: any) {
//           return Position_VIPAdForm[Position_VIPAdForm_index];
//         },
//         columns: [
//           {
//             title: "图片",
//             key: "ImageSrc",
//             type: "files",
//             editable: true,
//             props: {
//               afterFailClear: true,
//             },
//           },
//           {
//             title: "跳转类型",
//             key: "RedirectType",
//             type: "radio",
//             options: "vipRedirectTypeList",
//             editable: true,
//             width: 150,
//             onChange(r: any, v: any) {
//               RedirectType_VIPAdForm = r.RedirectType;
//             },
//           },
//           {
//             title: "跳转链接",
//             key: "RedirectLink",
//             type: "text",
//             editable: true,
//             // onChange(v: any, i: any) {
//             //   console.log(this, "text onChange is", v, i);
//             // },
//             // isShow() {
//             //   return RedirectType_VIPAdForm == "25";
//             // },
//           },
//           {
//             title: "原生页类型",
//             key: "NativePageType",
//             type: "radio",
//             options: "nativePage",
//             editable: true,
//             width: 200,
//             // isShow() {
//             //   return RedirectType_VIPAdForm == "55";
//             // },
//           },
//           {
//             title: "原生页跳转参数",
//             key: "NativePageRedirectParam",
//             type: "text",
//             width: 250,
//             editable: true,
//             // isShow() {
//             //   return RedirectType_VIPAdForm == "55";
//             // },
//           },
//         ],
//       },
//       render() {
//         return (
//           <div style={{ color: "red" }}>
//             {`最多上传${Position_VIPAdForm[Position_VIPAdForm_index]}张，宽度750px,格式jpg、png`}
//           </div>
//         );
//       },
//     },
//   ],
// });

export default HocForm({
  field: [
    {
      title: "选择交互",
      key: "InteractiveWay",
      type: "radio",
      options: [
        { text: "无交互", value: "1" },
        { text: "轮播", value: "2" },
      ],
      onChange(v: any, ComponentKey: any) {
        if (v == "2") {
          Position_VIPAdForm_index = 208;
        }
        if (v == "1") {
          Position_VIPAdForm_index = 101;
        }
      },
    },
    {
      key: "InterfaceList",
      title: "图片",
      type: "arrayOfNewLayOut",
      options: [
        {
          title: "图片",
          key: "ImageSrc",
          type: "files",
        },
        {
          title: "跳转类型",
          key: "RedirectType",
          type: "select",
          options: [
            { text: "不跳转", value: "0" },
            { text: "指定链接，H5页面", value: "25" },
            { text: "原生页", value: "55" },
          ],
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
          // onChange(v: any, i: any) {
          //   console.log(this, "text onChange is", v, i);
          // },
          isShowFn(v:any) {
            return v.RedirectType == "25";
          },
        },
        {
          title: "原生页类型",
          key: "NativePageType",
          type: "select",
          options: [
            { text: "预约量体页", value: "15" },
            { text: "VIP会员订购页", value: "12" },
            { text: "VIP中心", value: "1" },
            { text: "预设商品详情", value: "10" },
            { text: "搭配LOOK", value: "-1" },
            { text: "限时秒杀", value: "20" },
            { text: "我的优惠券", value: "5" },
            { text: "我的钱包", value: "4" },
            { text: "我的身材数据", value: "7" },
            { text: "置衣卡详情", value: "23" },
            { text: "搭配LOOK详情", value: "22" },
            
          ],
          editable: true,
          width: 200,
          isShowFn(v:any) {
            return v.RedirectType == "55";
          },
        },
        {
          title: "渠道名",
          key: "EventId",
          type: "text",
          isShowFn(v:any) {
            return v.NativePageType == "15";
          },
        },
        {
          title: "标题",
          key: "IsHideTopView",
          type: "text",
          isShowFn(v:any) {
            return v.NativePageType == "1";
          },
        },
        {
          title: "标签Id",
          key: "CategoryId",
          type: "text",
          isShowFn(v:any) {
            return v.NativePageType == "10";
          },
        },
        {
          title: "秒杀Id",
          key: "hSaleId",
          type: "text",
          isShowFn(v:any) {
            return v.NativePageType == "20";
          },
        },
        {
          title: "购物Id",
          key: "ShopItemId",
          type: "text",
          isShowFn(v:any) {
            return v.NativePageType == "20";
          },
        },
        {
          title: "秒杀状态",
          key: "FlashSaleStatus",
          type: "text",
          isShowFn(v:any) {
            return v.NativePageType == "20";
          },
        },
        {
          title: "卡号",
          key: "CardNumber",
          type: "text",
          isShowFn(v:any) {
            return v.NativePageType == "23";
          },
        },
        {
          title: "搭配Id",
          key: "LookItemId",
          type: "text",
          isShowFn(v:any) {
            return v.NativePageType == "22";
          },
        },
        // {
        //   title: "原生页跳转参数",
        //   key: "NativePageRedirectParam",
        //   type: "text",
        //   isShow() {
        //     return RedirectType_VIPAdForm == "55";
        //   },
        // },
      ],
    },
  ],
});
