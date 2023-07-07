import _ from "lodash";
import moment from "moment";
import * as React from "React";

import { getSelection, selectionStore } from "../../../../../common/store";
import HocForm from "../../../../higherComponent/HocForm";


let delayTimeFn_Icoupon;

export default HocForm({
  field: [
    {
      title: "添加优惠券",
      key: "CouponArr",
      type: "tableInput",
      rule: [{ required: true, message: "请填写优惠券信息" }],
      props: {
        // onChangeFn(v: any, ComponentKey: any) {
        //   console.log("vvvvvv33vv", v, ComponentKey);
        //   // if (v.length > 0) {
        //   //   this.props.updateComponent({
        //   //     key: ComponentKey,
        //   //     ComponentData: {
        //   //       CouponArr:[]
        //   //     },
        //   //   });
        //   // }
        // },
        onRemove: function (v: any, i: number, record: any) {
          console.log("onRemo is ", v, i, record, this);
          let newRecord = record;
          newRecord.splice(i, 1);
          this.props.onChange(newRecord);
          this.props.parent.props.updateComponent({
            Key: this.props.parent.ComponentKey,
            ComponentData: {
              CouponArr: this.props.value,
            },
          });
        },
        onValueChange: function (value: any) {},
        selection: {
          couponNameList: [],
        },
        withoutRemove: false,
        withoutModal: true,
        modalColumns: [],
        maxColSize: 6,
        columns: [
          {
            title: "优惠券单据号",
            key: "CouponId",
            type: "text",
            editable: true,
            width: 160,
            onChange: function (
              record: any,
              index: number,
              v: any,
              vItem: any
            ) {
              const that = this;
              delayTimeFn_Icoupon = _.debounce(() => {
                getSelection("couponNameList", {
                  params: {
                    Id: record.CouponId,
                    Page: null,
                    Scount: null,
                  },
                }).then((datas) => {
                  let selection = this.state.selection;
                  selection.couponNameList[index] = datas.list;
                  this.setState({ selection: selection });
                  this.forceUpdate();
                });
                // update component
                that.props.parent.props.updateComponent({
                  Key: that.props.parent.ComponentKey,
                  ComponentData: {
                    CouponArr: that.props.value,
                  },
                });
              }, 1000);
              delayTimeFn_Icoupon();
            },
          },
          {
            title: "优惠券名称",
            key: "CouponName",
            type: "select",
            options: "couponNameList",
            width: 220,
            editable: true,
            optionsWithIndex: true,
            valueField: "CouponId", // 返回数组中对象的值，用来绑定组件的key
            textField: "CouponName", // 显示文字
            // textValueField:''// 查找不到值，用来显示
            onChange: function (
              record: any,
              index: number,
              v: any,
              vItem: any
            ) {
              if (vItem) {
                record.CouponName = vItem.CouponName;
                this.props.parent.props.updateComponent({
                  Key: this.props.parent.ComponentKey,
                  ComponentData: {
                    CouponArr: this.props.value,
                  },
                });
              }
            },
          },
        ],
      },
    },
    {
      title: "优惠券过期日期",
      key: "CouponExpiredWay",
      type: "radio",
      options: [
        {
          text: "固定日期",
          value: "1",
        },
        {
          text: "固定天数",
          value: "2",
        },
      ],
      rule: [{ required: true, message: "请填写优惠券过期日期" }],
      // rule: [{ required: true, message: "" }],
    },
    {
      title: "过期时间",
      key: "CouponExpiredDate",
      type: "date",
      props: {
        // format: "YYYY-MM-DD HH:mm:ss",
        // showTime: {
        //   defaultValue: moment("23:59:59", "HH:mm:ss"),
        // },
      },
      isShowFn(v: any) {
        return v.CouponExpiredWay == "1";
      },
      // rule: [{ required: true, message: "请选择过期时间" }],
      customOption(field: any, v: any) {
        if (v.CouponExpiredWay == "1") {
          // field.rule = [{ required: true, message: "请选择过期时间" }];
          // field.rule = [{ required: true, message: "" }];
          field.rule = [];
          field.withoutSubmit = false;
        } else {
          field.rule = [];
          field.withoutSubmit = true;
        }
      },
    },
    {
      title: "过期天数",
      key: "CouponExpiredDay",
      type: "number",
      props: {
        precision: 0,
        min: 1,
      },
      isShowFn(v: any) {
        return v.CouponExpiredWay == "2";
      },
      customOption(field: any, v: any) {
        if (v.CouponExpiredWay == "1") {
          field.rule = [{ required: true, message: "请选择过期天数" }];
          field.withoutSubmit = false;
        } else {
          field.rule = [];
          field.withoutSubmit = true;
        }
      },
    },
    {
      key: 'face_to_user',
      title: '领取用户',
      type: 'radio',
      options:[
          { text: '直营', value: '0' },
          { text: '合伙人', value: '1' },
          { text: '全部', value: '2' },
      ],
    },
    {
      title: "领取条件",
      key: "ReceiveCondition",
      type: "checkboxGroup",
      options: [
        { text: "VIP", value: "1" },
        { text: "老客", value: "2" },
        { text: "新客", value: "3" },
        { text: "全部", value: "4" },
      ],
      rule: [{ required: true, message: "请填写领取条件" }],
    },
    {
      title: "不满足条件报错类型选择",
      key: "AlertErrorType",
      type: "radio",
      options: [
        { text: "toast报错", value: "1" },
        { text: "弹窗报错", value: "2" },
      ],
      rule: [{ required: true, message: "请填写不满足条件报错类型选择" }],
    },
    {
      title: "报错文案",
      key: "AlertErrorText",
      type: "textarea",
      isShowFn(v: any) {
        return v.AlertErrorType == "1";
      },
      customOption(field: any, v: any) {
        if (v.AlertErrorType == "1") {
          field.rule = [{ required: true, message: "请填写报错文案" }];
          field.withoutSubmit = false;
        } else {
          field.rule = [];
          field.withoutSubmit = true;
        }
      },
    },
    {
      title: "弹窗报错图片",
      key: "AlertErrorImage",
      props: {
        isHadLimit: false,
      },
      type: "files",
      isShowFn(v: any) {
        return v.AlertErrorType == "2";
      },
      customOption(field: any, v: any) {
        if (v.AlertErrorType == "2") {
          field.rule = [{ required: true, message: "请上传弹窗报错图片" }];
          field.withoutSubmit = false;
        } else {
          field.rule = [];
          field.withoutSubmit = true;
        }
      },
    },
    {
      title: "添加领取预告图开关",
      key: "AddReceiveNoticeImageSwitch",
      type: "switch",
    },
    {
      title: "选择展示预告图截止时间",
      key: "AddReceiveNoticeImageLimitDate",
      type: "date",
      props: {
        format: "YYYY-MM-DD HH:mm:ss",
        // format: 'YYYY-MM-DD',
        // defaultValue: moment('00:00:00', 'HH/mm/ss'),
        showTime: {
          defaultValue: moment("23:59:59", "HH:mm:ss"),
        },
      },
      isShowFn(v: any) {
        return !!v.AddReceiveNoticeImageSwitch;
      },
      customOption(field: any, v: any) {
        if (!!v.AddReceiveNoticeImageSwitch) {
          // field.rule = [
          //   { required: true, message: "请上传选择展示预告图截止时间" },
          // ];
          field.rule = [];
          field.withoutSubmit = false;
        } else {
          field.rule = [];
          field.withoutSubmit = true;
        }
      },
    },
    {
      title: "添加领取预告图",
      key: "AddReceiveNoticeImage",
      type: "files",
      isShowFn(v: any) {
        return !!v.AddReceiveNoticeImageSwitch;
      },
      customOption(field: any, v: any) {
        if (!!v.AddReceiveNoticeImageSwitch) {
          field.rule = [{ required: true, message: "请上传添加领取预告图" }];
          field.withoutSubmit = false;
        } else {
          field.rule = [];
          field.withoutSubmit = true;
        }
      },
    },

    {
      key: "AddReceiveNoticeImageJumpWay",
      title: "添加跳转",
      type: "arrayCustomForConfig",
      props: {
        onlyOnce: true,
        selection: {},
      },
      options: [
        {
          key: "RedirectType",
          title: "跳转类型",
          type: "select",
          options: [
            { text: "不跳转", value: "0" },
            { text: "指定链接，H5页面", value: "25" },
            { text: "原生页", value: "55" },
          ],
        },
        {
          title: "跳转链接",
          key: "RedirectLink",
          type: "text",
          editable: true,
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
          options: "ShoppingListFail",
          textField: "Name",
          valueField: "CateId",
          // unBindOptions: true,
          isShowFn(v: any) {
            return v.NativePageType == "27" && v.RedirectType == "55";
          },
          customOption: async function (field: any, v: any) {
            if (
              v &&
              selectionStore.getState()["ShoppingListSecondFail"].status == 0
            ) {
              await getSelection
                .call(this, "ShoppingListSecondFail", {
                  params: { CateId: v },
                })
                .then((datas: any) => {
                  let field = this.props.options.find(
                    (item: any) => item.key == "ShopSubCategoryIdS"
                  );
                  field.options = datas.list;
                });
            }
            if (
              v &&
              selectionStore.getState()["ShoppingListSecondFail"].status == 2
            ) {
              let field = this.props.options.find(
                (item: any) => item.key == "ShopSubCategoryIdS"
              );
              field.options =
                selectionStore.getState()["ShoppingListSecondFail"].list;
            }
          },
          onChange: function (v: any, vItem: any) {
            if (v) {
              getSelection.call(this, "ShoppingListSecond", {
                params: { CateId: v },
              });
            }
          },
        },
        {
          title: "商品列表二级标签",
          key: "ShopSubCategoryIdS",
          options: "ShoppingListSecondFail",
          // options: [],
          type: "select",
          textField: "Name",
          valueField: "CateId",
          // optionsWithIndex: true,
          // unBindOptions: true,
          isShowFn(v: any) {
            return v.NativePageType == "27" && v.RedirectType == "55";
          },
          customOption: async function (field: any, v: any) {
            if (
              v &&
              selectionStore.getState()["ShoppingListThirdFail"].status == 0
            ) {
              await getSelection
                .call(this, "ShoppingListThirdFail", {
                  params: { CateId: v },
                })
                .then((datas: any) => {
                  let field = this.props.options.find(
                    (item: any) => item.key == "ShopSubCategoryId"
                  );
                  field.options = datas.list;
                });
            }
            if (
              v &&
              selectionStore.getState()["ShoppingListThirdFail"].status == 2
            ) {
              let field = this.props.options.find(
                (item: any) => item.key == "ShopSubCategoryId"
              );
              field.options =
                selectionStore.getState()["ShoppingListThirdFail"].list;
            }
          },
          onChange: function (v: any, vItem: any) {
            if (v) {
              getSelection.call(this, "ShoppingListThird", {
                params: { CateId: v },
              });
            }
          },
        },
        {
          title: "商品列表标签",
          key: "ShopSubCategoryId",
          options: "ShoppingListThirdFail",
          type: "select",
          textField: "Name",
          valueField: "CateId",
          isShowFn(v: any) {
            return v.NativePageType == "27" && v.RedirectType == "55";
          },
        },

        {
          title: "预设商品ID",
          key: "CateId",
          type: "text",
          isShowFn(v: any) {
            return (
              (v.NativePageType == "7" && v.RedirectType == "55") ||
              (v.NativePageType == "77" && v.RedirectType == "55")
            );
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
            return v.NativePageType == "32" && v.RedirectType == "55";
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
            return v.NativePageType == "31" && v.RedirectType == "55";
          },
        },
      ],
      isShowFn(v: any) {
        return !!v.AddReceiveNoticeImageSwitch;
      },
    },
    {
      title: "添加领取前图片",
      key: "BeforeAddReceiveNoticeImage",
      type: "files",
      render() {
        return <span>图片要求：宽度750px ，格式jpg、png</span>;
      },
      rule: [{ required: true, message: "请上传添加领取前图片" }],
    },
    {
      title: "添加领取后图片开关",
      key: "AfterAddReceiveNoticeImageSwitch",
      type: "switch",
    },
    {
      title: "添加领取后图片",
      key: "AfterAddReceiveNoticeImage",
      type: "files",
      render() {
        return <span>图片要求：宽度750px ，格式jpg、png</span>;
      },
      rule: [{ required: true, message: "请上传添加领取后图片" }],
      isShowFn(v: any) {
        return !!v.AfterAddReceiveNoticeImageSwitch;
      },
      customOption(field: any, v: any) {
        if (!!v.AfterAddReceiveNoticeImageSwitch) {
          field.rule = [
            { required: true, message: "请上传选择展示预告图截止时间" },
          ];
          field.withoutSubmit = false;
        } else {
          field.rule = [];
          field.withoutSubmit = true;
        }
      },
    },
    {
      key: "AfterAddReceiveNoticeImageJumpWay",
      title: "添加跳转",
      type: "arrayCustomForConfig",
      props: {
        onlyOnce: true,
        selection: {},
      },
      options: [
        {
          key: "RedirectType",
          title: "跳转类型",
          type: "select",
          options: [
            { text: "不跳转", value: "0" },
            { text: "指定链接，H5页面", value: "25" },
            { text: "原生页", value: "55" },
          ],
        },
        {
          title: "跳转链接",
          key: "RedirectLink",
          type: "text",
          editable: true,
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
          options: "ShoppingListFail",
          textField: "Name",
          valueField: "CateId",
          // unBindOptions: true,
          isShowFn(v: any) {
            return v.NativePageType == "27" && v.RedirectType == "55";
          },
          customOption: async function (field: any, v: any) {
            if (
              v &&
              selectionStore.getState()["ShoppingListSecondFail"].status == 0
            ) {
              await getSelection
                .call(this, "ShoppingListSecondFail", {
                  params: { CateId: v },
                })
                .then((datas: any) => {
                  let field = this.props.options.find(
                    (item: any) => item.key == "ShopSubCategoryIdS"
                  );
                  field.options = datas.list;
                });
            }
            if (
              v &&
              selectionStore.getState()["ShoppingListSecondFail"].status == 2
            ) {
              let field = this.props.options.find(
                (item: any) => item.key == "ShopSubCategoryIdS"
              );
              field.options =
                selectionStore.getState()["ShoppingListSecondFail"].list;
            }
          },
          onChange: function (v: any, vItem: any) {
            if (v) {
              getSelection.call(this, "ShoppingListSecond", {
                params: { CateId: v },
              });
            }
          },
        },
        {
          title: "商品列表二级标签",
          key: "ShopSubCategoryIdS",
          options: "ShoppingListSecondFail",
          // options: [],
          type: "select",
          textField: "Name",
          valueField: "CateId",
          // optionsWithIndex: true,
          // unBindOptions: true,
          isShowFn(v: any) {
            return v.NativePageType == "27" && v.RedirectType == "55";
          },
          customOption: async function (field: any, v: any) {
            if (
              v &&
              selectionStore.getState()["ShoppingListThirdFail"].status == 0
            ) {
              await getSelection
                .call(this, "ShoppingListThirdFail", {
                  params: { CateId: v },
                })
                .then((datas: any) => {
                  let field = this.props.options.find(
                    (item: any) => item.key == "ShopSubCategoryId"
                  );
                  field.options = datas.list;
                });
            }
            if (
              v &&
              selectionStore.getState()["ShoppingListThirdFail"].status == 2
            ) {
              let field = this.props.options.find(
                (item: any) => item.key == "ShopSubCategoryId"
              );
              field.options =
                selectionStore.getState()["ShoppingListThirdFail"].list;
            }
          },
          onChange: function (v: any, vItem: any) {
            if (v) {
              getSelection.call(this, "ShoppingListThird", {
                params: { CateId: v },
              });
            }
          },
        },
        {
          title: "商品列表标签",
          key: "ShopSubCategoryId",
          options: "ShoppingListThirdFail",
          type: "select",
          textField: "Name",
          valueField: "CateId",
          isShowFn(v: any) {
            return v.NativePageType == "27" && v.RedirectType == "55";
          },
        },

        {
          title: "预设商品ID",
          key: "CateId",
          type: "text",
          isShowFn(v: any) {
            return (
              (v.NativePageType == "7" && v.RedirectType == "55") ||
              (v.NativePageType == "77" && v.RedirectType == "55")
            );
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
            return v.NativePageType == "32" && v.RedirectType == "55";
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
            return v.NativePageType == "31" && v.RedirectType == "55";
          },
        },
      ],
      isShowFn(v: any) {
        return !!v.AfterAddReceiveNoticeImageSwitch;
      },
    },
  ],
});
