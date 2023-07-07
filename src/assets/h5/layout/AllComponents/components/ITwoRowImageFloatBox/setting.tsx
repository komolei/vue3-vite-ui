import * as React from "react";
import * as ReactDom from "react";
import { Form, Radio, Input, Upload, Button, Icon, message } from "antd";
import { getSelection } from "../../../../../common/store";
import * as _ from "lodash";
import HocForm from "../../../../higherComponent/HocForm";
interface IProps {
  ComponentProps: any;
  prefixCls?: string;
  ComponentData: any;
}

let RedirectType_VIPAdForm_ISingleImage: any = 25;
let objOfchangeMaxColSize: any = {};

export default HocForm({
  onInitValues(values: any) {
    // if()
  },
  field: [
    {
      key: "ImageArr",
      title: "图片",
      type: "arrayOfNewLayOut",
      props: {
        changeMaxColSize(value: any) {
          objOfchangeMaxColSize = Object.assign(
            {},
            {
              [this.props.parent.ComponentKey]: 2,
            }
          );
          return objOfchangeMaxColSize;
        },
      },
      render() {
        return <span> 图片要求：宽度375px ，格式jpg、png、gif。</span>;
      },
      rule: [{ required: true, message: "请选择图片" }],
      options: [
        {
          title: "图片",
          key: "ImageSrc",
          type: "files",
          props: {
            isHadLimit: true,
            limitWidth: 375,
          },
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
          onChange(r: any, v: any) {
            RedirectType_VIPAdForm_ISingleImage = r.RedirectType;
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
          isShowFn(v: any) {
            return v.RedirectType == "25";
          },
        },
        {
          title: "原生页类型",
          key: "NativePageType",
          type: "select",
          options: [
            { text: "预约量体页", value: "6" }, // Name NativePageType=6
            { text: "VIP会员订购页", value: "12" },
            { text: "VIP中心", value: "1" }, // 使用29  // IsHideTopView:0,1  // NativePageType=1 117
            { text: "商品列表", value: "27" }, // ShopSubCategoryName ShopSubCategoryId //
            { text: "预设商品详情", value: "7" }, // CateId
            { text: "AI定制商品详情", value: "77" }, // CateId
            // { text: "搭配LOOK", value: "-1" },
            { text: "限时秒杀", value: "26" }, // hSaleId  ShopItemId  FlashSaleStatus:1,2,3
            { text: "我的优惠券", value: "4" },
            { text: "我的钱包", value: "5" },
            { text: "我的身材数据", value: "117" }, // IsHideTopView:0,1
            { text: "置衣卡详情", value: "32" }, // CardNumber
            { text: "搭配LOOK详情", value: "31" }, // LookItemId
            { text: "会员中心首页", value: "39" }, // 会员中心
						{ text: "拍照量体身材数据", value: "501" }, // 拍照量体身材数据


          ],
          editable: true,
          width: 200,
          isShowFn(v: any) {
            return v.RedirectType == "55";
          },
        },
        {
          title: "商品列表一级标签",
          key: "ShopSubCategoryIdF",
          type: "select",
          options: "ShoppingList",
          textField: "Name",
          valueField: "CateId",
          unBindOptions: true,
          isShowFn(v: any) {
            return v.NativePageType == "27" &&  v.RedirectType == "55";
          },
          onChange: function (v: any, vItem: any) {
            if (v) {
              getSelection
                .call(this, "ShoppingListSecond", {
                  params: { CateId: v },
                })
                .then((datas: any) => {
                  let field = this.props.options.find(
                    (item: any) => item.key == "ShopSubCategoryIdS"
                  );
                  field.options[vItem] = datas.list;
                  this.forceUpdate();
                });
            }
          },
        },
        {
          title: "商品列表二级标签",
          key: "ShopSubCategoryIdS",
          // options: "ShoppingListSecond",
          options: [],
          type: "select",
          textField: "Name",
          valueField: "CateId",
          // optionsWithIndex: true,
          unBindOptions: true,
          isShowFn(v: any) {
            return v.NativePageType == "27" &&  v.RedirectType == "55";
          },
          onChange: function (v: any, vItem: any) {
            if (v) {
              getSelection
                .call(this, "ShoppingListThird", {
                  params: { CateId: v },
                })
                .then((datas: any) => {
                  let field = this.props.options.find(
                    (item: any) => item.key == "ShopSubCategoryId"
                  );
                  console.log("field is ", field, vItem, datas);
                  field.options[vItem] = datas.list;
                  this.forceUpdate();
                  // if (!initShopSubCategoryIdS[vItem]) {
                  //   initShopSubCategoryIdS[vItem]=1
                  //   return;
                  // }
                  // this.props.value[vItem].ShopSubCategoryId = "";
                  // this.props.onChange(this.props.value);
                });
            }
          },
        },
        {
          title: "商品列表标签",
          key: "ShopSubCategoryId",
          // options: "ShoppingListThird",
          options: [],
          type: "select",
          textField: "Name",
          valueField: "CateId",
          unBindOptions: true,
          // optionsWithIndex: true,
          isShowFn(v: any) {
            return v.NativePageType == "27" &&  v.RedirectType == "55";
          },
        },
        {
          title: "渠道名",
          key: "Name",
          type: "text",
          isShowFn(v: any) {
            return false;
            return v.NativePageType == "6";
          },
        },
        {
          title: "是否显示顶部导航",
          key: "IsHideTopView",
          type: "select",
          options: [
            { text: "是", value: "1" },
            { text: "否", value: "0" },
          ],
          isShowFn(v: any) {
            return false;
            return v.NativePageType == "1";
          },
        },
        {
          title: "预设商品ID",
          key: "CateId",
          type: "text",
          isShowFn(v: any) {
            // return v.NativePageType == "7" || v.NativePageType == "77";
            return v.NativePageType == "7" &&  v.RedirectType == "55" || v.NativePageType == "77" &&  v.RedirectType == "55";;

          },
        },
        {
          title: "秒杀场次ID",
          key: "FlashSaleId",
          type: "text",
          isShowFn(v: any) {
            return false;
          },
        },
        {
          title: "秒杀商品ID",
          key: "ShopItemId",
          type: "text",
          isShowFn(v: any) {
            return false;
            return v.NativePageType == "26";
          },
        },
        {
          title: "秒杀状态",
          key: "FlashSaleStatus",
          type: "select",
          options: [
            { text: "本场秒杀距开始还有", value: "1" },
            { text: "本场秒杀距结束还有", value: "2" },
            { text: "本场秒杀已结束", value: "3" },
          ],
          isShowFn(v: any) {
            return false;
            return v.NativePageType == "26";
          },
        },
        {
          title: "置衣卡",
          key: "CardNumber",
          type: "select",
          valueField: "Id",
          textField: "Name",
          options: "zhiyikaIdToCardNameList",
          isShowFn(v: any) {
            return v.NativePageType == "32" &&  v.RedirectType == "55";
          },
        },
        {
          title: "搭配Look",
          key: "LookItemId",
          type: "select",
          valueField: "Id",
          textField: "Name",
          options: "CollocationLookIdAndName",
          isShowFn(v: any) {
            return v.NativePageType == "31" &&  v.RedirectType == "55";
          },
        },
      ],
    },
  ],
});
