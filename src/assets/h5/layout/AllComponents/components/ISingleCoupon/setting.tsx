import _ from "lodash";
import moment from "moment";
import * as React from "React";
import { getSelection } from "../../../../../common/store";
import axios from "axios";
import {
  Form,
  Select,
  Radio,
  Input,
  Menu,
  Switch,
  Upload,
  DatePicker,
  Checkbox,
  Button,
  Icon,
  message,
} from "antd";
// import { FormComponentProps } from "antd/es/form";
// interface UserFormProps extends FormComponentProps {
//   age: number;
//   name: string;
// }
const { Option } = Select;
const { SubMenu } = Menu;
const transformFile = (value: any) => {
  let fileList;
  if (value) {
    if (typeof value == "string") {
      value = [
        {
          F_URL: value,
        },
      ];
    }
    if (typeof value == "object" && !(value instanceof Array)) {
      value = [value];
    }
    fileList = value.map((item: any, index: number) => {
      if (typeof item == "string") {
        item = {
          F_URL: item,
        };
      }
      if (item.status || item instanceof File) {
        return item;
      } else {
        let names = item.F_URL ? item.F_URL.split("/") : [];
        return {
          uid: item.uid ? item.uid : index,
          // url: item.F_URL,
          url: item.F_URL,
          // item.F_URL && item.F_URL.includes("?")
          //   ? item.F_URL.substr(0, item.F_URL.indexOf("?"))
          //   : item.F_URL, // 兼容oss样式
          name: names.length ? names[names.length - 1] : "",
          data: item,
        };
      }
    });
    return fileList;
  }
};
const renderButton = (value: any) => {
  // console.log("sssssss", value);
  if (_.isString(value) && value.length > 0) {
    return "";
    // return <img src={value} style={{width:'100px',display:''}}/>;
  }
  if (_.isArray(value) && value.length > 0) {
    return "";
  }
  return (
    <Button>
      <Icon type="upload" /> 上传
    </Button>
  );
};
interface IProps {}
let delayTimeFn_Icoupon;
let CouponOptions: any = {
  0: [],
  1: [],
  2: [],
};
// let isCouponExpiredWay = true;
// let isAlertErrorType = true;
// let isAddReceiveNoticeImageSwitch = true;

const CouponObj: any = {
  IsShow: false,
  CouponId: "",
  CouponName: "",
  CouponExpiredWay: "",
  CouponExpiredDate: undefined,
  CouponExpiredDay: "",
  ReceiveCondition: [],
  AlertErrorType: "",
  AlertErrorText: "",
  AlertErrorImage: "",
  AddReceiveNoticeImageSwitch: "",
  AddReceiveNoticeImageLimitDate: undefined,
  AddReceiveNoticeImage: "",
  BeforeAddReceiveNoticeImage: "",
  AfterAddReceiveNoticeImageSwitch: "",
  AfterAddReceiveNoticeImage: "",
};
const CouponObj1: any = {
  IsShow: false,
  CouponId: "",
  CouponName: "",
  CouponExpiredWay: "",
  CouponExpiredDate: undefined,
  CouponExpiredDay: "",
  ReceiveCondition: [],
  AlertErrorType: "",
  AlertErrorText: "",
  AlertErrorImage: "",
  AddReceiveNoticeImageSwitch: "",
  AddReceiveNoticeImageLimitDate: undefined,
  AddReceiveNoticeImage: "",
  BeforeAddReceiveNoticeImage: "",
  AfterAddReceiveNoticeImageSwitch: "",
  AfterAddReceiveNoticeImage: "",
};

let initImgWidthOfISingleCouponSetting: number = 750;
class ISingleCouponSetting extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      CouponOptions: CouponOptions,
      value: 1,
      fileList: [],
      CouponArr: [
        {
          IsShow: true,
          CouponId: "",
          CouponName: "",
          CouponExpiredWay: "",
          CouponExpiredDate: undefined,
          CouponExpiredDay: "",
          ReceiveCondition: [],
          AlertErrorType: "",
          AlertErrorText: "",
          AlertErrorImage: "",
          AddReceiveNoticeImageSwitch: "",
          AddReceiveNoticeImageLimitDate: undefined,
          AddReceiveNoticeImage: "",
          BeforeAddReceiveNoticeImage: "",
          AfterAddReceiveNoticeImageSwitch: "",
          AfterAddReceiveNoticeImage: "",
        },
      ],
    };
  }

  onChange = (e: any) => {
    let newCouponArr = _.cloneDeep(this.state.CouponArr);
    initImgWidthOfISingleCouponSetting = 750 / Number(e);

    switch (Number(e)) {
      case 1:
        // if (newCouponArr.length != 1) {
        //   newCouponArr.splice(newCouponArr.length - 1, 3);
        // }
        if (newCouponArr.length == 3) {
          newCouponArr.splice(1, 2);
        }
        if (newCouponArr.length == 2) {
          newCouponArr.splice(1, 2);
        }
        newCouponArr = newCouponArr.map((item: any) => {
          item.AddReceiveNoticeImage = "";
          item.BeforeAddReceiveNoticeImage = "";
          item.AfterAddReceiveNoticeImage = "";
          return item;
        });
        this.props.delComponentValue({
          Key: this.props.ComponentKey,
          ComponentData: {
            CouponArr: newCouponArr,
          },
        });
        this.state.CouponArr.map((item: any, i: number) => {
          this.props.form.setFieldsValue({
            [`CouponArr[${i}].AddReceiveNoticeImage`]: "",
            [`CouponArr[${i}].BeforeAddReceiveNoticeImage`]: "",
            [`CouponArr[${i}].AfterAddReceiveNoticeImage`]: "",
          });
        });
        this.setState(
          {
            value: e,
            CouponArr: newCouponArr,
          },
          () => {
            // this.state.CouponArr.map((item: any, i: number) => {
            //   this.props.form.setFieldsValue({
            //     [`CouponArr[${i}].AddReceiveNoticeImage`]: "",
            //     [`CouponArr[${i}].BeforeAddReceiveNoticeImage`]: "",
            //     [`CouponArr[${i}].AfterAddReceiveNoticeImage`]: "",
            //   });
            // });
          }
        );
        break;
      case 2:
        if (newCouponArr.length == 1) {
          newCouponArr.push({
            IsShow: false,
            CouponId: "",
            CouponName: "",
            CouponExpiredWay: "",
            CouponExpiredDate: undefined,
            CouponExpiredDay: "",
            ReceiveCondition: [],
            AlertErrorType: "",
            AlertErrorText: "",
            AlertErrorImage: "",
            AddReceiveNoticeImageSwitch: "",
            AddReceiveNoticeImageLimitDate: undefined,
            AddReceiveNoticeImage: "",
            BeforeAddReceiveNoticeImage: "",
            AfterAddReceiveNoticeImageSwitch: "",
            AfterAddReceiveNoticeImage: "",
          });
        }
        if (newCouponArr.length == 3) {
          newCouponArr.splice(2, 1);
        }
        newCouponArr = newCouponArr.map((item: any) => {
          item.AddReceiveNoticeImage = "";
          item.BeforeAddReceiveNoticeImage = "";
          item.AfterAddReceiveNoticeImage = "";
          return item;
        });
        this.props.delComponentValue({
          Key: this.props.ComponentKey,
          ComponentData: {
            CouponArr: newCouponArr,
          },
        });
        this.state.CouponArr.map((item: any, i: number) => {
          this.props.form.setFieldsValue({
            [`CouponArr[${i}].AddReceiveNoticeImage`]: "",
            [`CouponArr[${i}].BeforeAddReceiveNoticeImage`]: "",
            [`CouponArr[${i}].AfterAddReceiveNoticeImage`]: "",
          });
        });
        this.setState(
          {
            value: e,
            CouponArr: newCouponArr,
          },
          () => {
            // this.state.CouponArr.map((item: any, i: number) => {
            //   this.props.form.setFieldsValue({
            //     [`CouponArr[${i}].AddReceiveNoticeImage`]: "",
            //     [`CouponArr[${i}].BeforeAddReceiveNoticeImage`]: "",
            //     [`CouponArr[${i}].AfterAddReceiveNoticeImage`]: "",
            //   });
            // });
          }
        );
        break;
      case 3:
        if (newCouponArr.length == 1) {
          newCouponArr.push({
            IsShow: false,
            CouponId: "",
            CouponName: "",
            CouponExpiredWay: "",
            CouponExpiredDate: undefined,
            CouponExpiredDay: "",
            ReceiveCondition: [],
            AlertErrorType: "",
            AlertErrorText: "",
            AlertErrorImage: "",
            AddReceiveNoticeImageSwitch: "",
            AddReceiveNoticeImageLimitDate: undefined,
            AddReceiveNoticeImage: "",
            BeforeAddReceiveNoticeImage: "",
            AfterAddReceiveNoticeImageSwitch: "",
            AfterAddReceiveNoticeImage: "",
          });
          newCouponArr.push({
            IsShow: false,
            CouponId: "",
            CouponName: "",
            CouponExpiredWay: "",
            CouponExpiredDate: undefined,
            CouponExpiredDay: "",
            ReceiveCondition: [],
            AlertErrorType: "",
            AlertErrorText: "",
            AlertErrorImage: "",
            AddReceiveNoticeImageSwitch: "",
            AddReceiveNoticeImageLimitDate: undefined,
            AddReceiveNoticeImage: "",
            BeforeAddReceiveNoticeImage: "",
            AfterAddReceiveNoticeImageSwitch: "",
            AfterAddReceiveNoticeImage: "",
          });
        }
        if (newCouponArr.length == 2) {
          newCouponArr.push({
            IsShow: false,
            CouponId: "",
            CouponName: "",
            CouponExpiredWay: "",
            CouponExpiredDate: undefined,
            CouponExpiredDay: "",
            ReceiveCondition: [],
            AlertErrorType: "",
            AlertErrorText: "",
            AlertErrorImage: "",
            AddReceiveNoticeImageSwitch: "",
            AddReceiveNoticeImageLimitDate: undefined,
            AddReceiveNoticeImage: "",
            BeforeAddReceiveNoticeImage: "",
            AfterAddReceiveNoticeImageSwitch: "",
            AfterAddReceiveNoticeImage: "",
          });
        }
        newCouponArr = newCouponArr.map((item: any) => {
          item.AddReceiveNoticeImage = "";
          item.BeforeAddReceiveNoticeImage = "";
          item.AfterAddReceiveNoticeImage = "";
          return item;
        });
        this.props.delComponentValue({
          Key: this.props.ComponentKey,
          ComponentData: {
            CouponArr: newCouponArr,
          },
        });
        this.state.CouponArr.map((item: any, i: number) => {
          this.props.form.setFieldsValue({
            [`CouponArr[${i}].AddReceiveNoticeImage`]: "",
            [`CouponArr[${i}].BeforeAddReceiveNoticeImage`]: "",
            [`CouponArr[${i}].AfterAddReceiveNoticeImage`]: "",
          });
        });
        this.setState(
          {
            value: e,
            CouponArr: newCouponArr,
          },
          () => {
            // this.state.CouponArr.map((item: any, i: number) => {
            //   this.props.form.setFieldsValue({
            //     [`CouponArr[${i}].AddReceiveNoticeImage`]: "",
            //     [`CouponArr[${i}].BeforeAddReceiveNoticeImage`]: "",
            //     [`CouponArr[${i}].AfterAddReceiveNoticeImage`]: "",
            //   });
            // });
          }
        );
        break;
      default:
        break;
    }
  };
  handleSubmit = (e: any) => {
    e.preventDefault();
    this.props.form.validateFields((err: any, values: any) => {
      if (!err) {
        // console.log("Received values of form: ", values);
      }
    });
  };
  handleChange(info: any) {
    let { fileList } = info;
    this.setState({
      fileList: fileList,
    });
  }
  handleOnRemove(i: number, alias: string) {
    // console.log(this, "xxxxxxxxx", i, alias);
    // this.onChange(undefined)

    let newComponentObj = this.props.componentLib.find(
      (item: any) => item.Key == this.props.ComponentKey
    );
    newComponentObj.ComponentData.CouponArr[i][alias] = "";
    // newComponentObj.ComponentData.CouponArr = newComponentObj.ComponentData.CouponArr.map(
    //   (item: any) => {
    //     if (item.hasOwnProperty("CouponExpiredDate")) {
    //       item.CouponExpiredDate = moment(item.CouponExpiredDate, "YYYY-MM-DD");
    //     }
    //     if (item.hasOwnProperty("AddReceiveNoticeImageLimitDate")) {
    //       item.AddReceiveNoticeImageLimitDate = moment(
    //         item.AddReceiveNoticeImageLimitDate,
    //         "YYYY-MM-DD HH:mm:ss"
    //       );
    //     }
    //     return item;
    //   }
    // );
    // console.log("handleOnRemove", newComponentObj.ComponentData.CouponArr);
    this.props.updateComponent({
      Key: this.props.ComponentKey,
      ComponentData: {
        CouponArr: newComponentObj.ComponentData.CouponArr,
      },
    });

    // 合成新的couponArr 避免部分数据丢失

    let newCouponArr = Object.assign(
      this.state.CouponArr,
      newComponentObj.ComponentData.CouponArr
    );
    // console.log("xxxxxxxx", newCouponArr);
    this.setState(
      {
        // CouponArr: newComponentObj.ComponentData.CouponArr,
        CouponArr: newCouponArr,
      },
      () => {
        this.props.form.setFieldsValue({
          [`CouponArr[${i}].${alias}`]: "",
          // "": "",
        });
      }
    );
    // this.forceUpdate()
  }
  handleBeforeUpload(file: any, fileList: any) {
    return false;
  }
  // AlertErrorImage upload
  async AlertErrorImageUpload(uploader: any, i: number, alias: string) {
    let newBlob = new Blob([uploader.file]);
    // console.log("newBlob is", newBlob);
    const blobToImage = (blob: any) => {
      return new Promise((resolve) => {
        const url = URL.createObjectURL(blob);
        let img = new Image();
        img.onload = () => {
          resolve(img.width);
        };
        img.src = url;
      });
    };
    const imgWidth = await blobToImage(newBlob);
    const that = this;
    let data = new FormData();
    data.append(uploader.filename, uploader.file);
    await axios
      .post(uploader.action, data, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        params: {
          Type: "EventTemplate",
        },
        onUploadProgress: (e) => {
          uploader.onProgress((e.loaded / e.total) * 100);
        },
      })
      .then((rsp) => {
        uploader.onSuccess(rsp.data);
        const imgUrl = rsp.data.Data.F_URL;
        let newComponentObj = this.props.componentLib.find(
          (item: any) => item.Key == this.props.ComponentKey
        );
        newComponentObj.ComponentData.CouponArr[i][alias] = imgUrl;
        this.props.updateComponent({
          Key: this.props.ComponentKey,
          ComponentData: {
            CouponArr: newComponentObj.ComponentData.CouponArr,
          },
        });
        that.setState({
          CouponArr: newComponentObj.ComponentData.CouponArr,
        });
      })
      .catch((err) => {
        // console.log("sssssssssss", err);
        uploader.onError();
      });
  }
  async upload(uploader: any, i: number, alias: string) {
    let newBlob = new Blob([uploader.file]);
    // console.log("newBlob is", newBlob);
    const blobToImage = (blob: any) => {
      return new Promise((resolve) => {
        const url = URL.createObjectURL(blob);
        let img = new Image();
        img.onload = () => {
          resolve(img.width);
        };
        img.src = url;
      });
    };
    const imgWidth = await blobToImage(newBlob);
    const that = this;
    // console.log("imgWidth is", imgWidth);
    if (Number(imgWidth) != initImgWidthOfISingleCouponSetting) {
      // if (false) {
      message.error(`请上传宽度为${initImgWidthOfISingleCouponSetting}的图片`);
      setTimeout(() => {
        this.handleOnRemove.call(this, i, alias);
      });
    } else {
      let data = new FormData();
      data.append(uploader.filename, uploader.file);
      await axios
        .post(uploader.action, data, {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          params: {
            Type: "EventTemplate",
          },
          onUploadProgress: (e) => {
            uploader.onProgress((e.loaded / e.total) * 100);
          },
        })
        .then((rsp) => {
          uploader.onSuccess(rsp.data);
          const imgUrl = rsp.data.Data.F_URL;
          let newComponentObj = this.props.componentLib.find(
            (item: any) => item.Key == this.props.ComponentKey
          );
          newComponentObj.ComponentData.CouponArr[i][alias] = imgUrl;
          this.props.updateComponent({
            Key: this.props.ComponentKey,
            ComponentData: {
              CouponArr: newComponentObj.ComponentData.CouponArr,
            },
          });
          that.setState({
            CouponArr: newComponentObj.ComponentData.CouponArr,
          });
        })
        .catch((err) => {
          uploader.onError();
        });
    }
  }
  normFile(e: any) {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  }
  handleClick(i: number) {
    i = Number(i);
    let newCouponArr = _.cloneDeep(this.state.CouponArr);
    newCouponArr[i].IsShow = !newCouponArr[i].IsShow;
    // console.log("handleClick", newCouponArr);
    this.props.updateComponent({
      Key: this.props.ComponentKey,
      ComponentData: {
        CouponArr: newCouponArr,
      },
    });
    this.setState(
      {
        CouponArr: newCouponArr,
      },
      () => {
        // newCouponArr = null;
      }
    );
  }
  //
  handleCouponInputChange(e: any, i: number) {
    const val = e.target.value;
    const that = this;
    // console.log("this is", i);
    delayTimeFn_Icoupon = _.debounce(() => {
      getSelection("couponNameList", {
        params: {
          Id: val,
          Page: null,
          Scount: null,
        },
      }).then((datas) => {
        // console.log("datas", datas, that);
        const newCouponOptions = _.cloneDeep(this.state.CouponOptions);
        newCouponOptions[i] = datas.list;
        this.setState({
          CouponOptions: newCouponOptions,
        });
      });
    }, 600);
    delayTimeFn_Icoupon();
  }
  handleCouponExpiredWayChange(e: any, i: number) {
    const value = e.target.value;
    // isCouponExpiredWay = value === "1";
    let newCouponArr = _.cloneDeep(this.state.CouponArr);
    newCouponArr[i].CouponExpiredWay = value;
    newCouponArr[i].CouponExpiredDate = undefined;

    this.setState({
      CouponArr: newCouponArr,
    });
  }
  handleAlertErrorTypeChange(e: any, i: number) {
    const value = e.target.value;
    // isAlertErrorType = value === "1";
    let newCouponArr = _.cloneDeep(this.state.CouponArr);
    newCouponArr[i].AlertErrorType = value;
    this.setState({
      CouponArr: newCouponArr,
    });
  }
  handleAddReceiveNoticeImageSwitchChange(e: any, i: number) {
    // isAddReceiveNoticeImageSwitch = e;
    let newCouponArr = _.cloneDeep(this.state.CouponArr);
    newCouponArr[i].AddReceiveNoticeImageSwitch = e;
    newCouponArr[i].AddReceiveNoticeImageLimitDate = undefined;
    this.setState({
      CouponArr: newCouponArr,
    });
  }
  handleAfterAddReceiveNoticeImageSwitchChange(e: any, i: number) {
    // isAddReceiveNoticeImageSwitch = e;
    let newCouponArr = _.cloneDeep(this.state.CouponArr);
    newCouponArr[i].AfterAddReceiveNoticeImageSwitch = e;
    this.setState({
      CouponArr: newCouponArr,
    });
  }
  handleDatePicker(date: any, dateString: string, i: number, key: string) {
    // console.log("date picker is", date, dateString, i, key);
    let newCouponArr = _.cloneDeep(this.state.CouponArr);
    newCouponArr[i][key] = dateString ? dateString : undefined;
    this.setState({
      CouponArr: newCouponArr,
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };

    let CouponArr = _.cloneDeep(this.state.CouponArr);

    // handle Date

    CouponArr = CouponArr.map((item: any) => {
      if (item.hasOwnProperty("CouponExpiredDate") && item.CouponExpiredDate) {
        item.CouponExpiredDate = moment(item.CouponExpiredDate, "YYYY-MM-DD");
      }
      if (
        item.hasOwnProperty("AddReceiveNoticeImageLimitDate") &&
        item.AddReceiveNoticeImageLimitDate
      ) {
        item.AddReceiveNoticeImageLimitDate = moment(
          item.AddReceiveNoticeImageLimitDate,
          "YYYY-MM-DD HH:mm:ss"
        );
      }
      return item;
    });
    // console.log("render is", CouponArr);
    const ISingleCouponSettingForm = CouponArr.map((item: any, i: number) => {
      return (
        <div className="ISingleCouponSettingForm_box" key={i}>
          <div
            className="ISingleCouponSettingForm_head"
            onClick={() => this.handleClick(i)}
          >
            {item.IsShow ? (
              <Icon type="caret-down" />
            ) : (
              <Icon type="caret-up" />
            )}
            {`优惠券${Number(i) + 1}`}
          </div>
          <div
            className={
              item.IsShow
                ? "ISingleCouponSettingForm_body show"
                : "ISingleCouponSettingForm_body none"
            }
          >
            <Form.Item {...formItemLayout} label={"优惠券单据号"}>
              {getFieldDecorator(`CouponArr[${i}].CouponId`, {
                initialValue: CouponArr[i].CouponId,
                rules: [{ required: true, message: "请输入优惠券单据号" }],
              })(
                <Input
                  placeholder="请输入优惠券单据号"
                  maxLength={20}
                  onChange={(e:any) => this.handleCouponInputChange(e, i)}
                />
              )}
            </Form.Item>
            <Form.Item {...formItemLayout} label={"优惠券名称"}>
              {getFieldDecorator(`CouponArr[${i}].CouponName`, {
                initialValue: CouponArr[i].CouponName,
                rules: [{ required: true, message: "请输入优惠券名称" }],
              })(
                <Select
                  allowClear={true}
                  filterOption={false}
                  // onChange={(e) => this.handleSelectOfG_MRKD_Config(e, i)}
                >
                  {this.state.CouponOptions &&
                  this.state.CouponOptions[i] &&
                  this.state.CouponOptions[i].length > 0
                    ? this.state.CouponOptions[i].map(
                        (data: any, index: number) => {
                          return (
                            <Option key={index} value={data["CouponName"]}>
                              {data["CouponName"]}
                            </Option>
                          );
                        }
                      )
                    : null}
                </Select>
              )}
            </Form.Item>
            <Form.Item {...formItemLayout} label={"优惠券过期日期"}>
              {getFieldDecorator(`CouponArr[${i}].CouponExpiredWay`, {
                initialValue: Number(CouponArr[i].CouponExpiredWay),
                rules: [{ required: true, message: "请填写优惠券过期日期" }],
              })(
                <Radio.Group
                  onChange={(e:any) => this.handleCouponExpiredWayChange(e, i)}
                >
                  <Radio value={1}>固定日期</Radio>
                  <Radio value={2}>固定天数</Radio>
                </Radio.Group>
              )}
            </Form.Item>
            {CouponArr[i].CouponExpiredWay == "1" ? (
              <Form.Item {...formItemLayout} label={"过期时间"}>
                {getFieldDecorator(`CouponArr[${i}].CouponExpiredDate`, {
                  // initialValue: CouponArr[i].CouponExpiredDate
                  //   ? moment(
                  //       moment(Number(CouponArr[i].CouponExpiredDate)).format(
                  //         "YYYY-MM-DD HH:mm:ss"
                  //       )
                  //     )
                  //   : null,
                  initialValue: CouponArr[i].CouponExpiredDate
                    ? CouponArr[i].CouponExpiredDate
                    : undefined,
                  rules: [{ required: false, message: "请选择过期时间" }],
                  // rules: [],
                })(
                  <DatePicker
                    // format={"YYYY-MM-DD HH:mm:ss"}
                    // showTime={{
                    //   defaultValue: moment("23:59:59", "HH:mm:ss"),
                    // }}
                    onChange={(e:any, dateString:any) =>
                      this.handleDatePicker.call(
                        this,
                        e,
                        dateString,
                        i,
                        "CouponExpiredDate"
                      )
                    }
                  ></DatePicker>
                )}
              </Form.Item>
            ) : CouponArr[i].CouponExpiredWay == "2" ? (
              <Form.Item {...formItemLayout} label={"过期天数"}>
                {getFieldDecorator(`CouponArr[${i}].CouponExpiredDay`, {
                  initialValue: CouponArr[i].CouponExpiredDay,
                  rules: [{ required: true, message: "请选择过期天数" }],
                })(<Input placeholder="请选择过期天数" maxLength={20} />)}
              </Form.Item>
            ) : null}
            <Form.Item {...formItemLayout} label={"领取条件"}>
              {getFieldDecorator(`CouponArr[${i}].ReceiveCondition`, {
                initialValue: CouponArr[i].ReceiveCondition,
                // rules: [{ required: true, message: "请填写领取条件" }],
              })(
                <Checkbox.Group>
                  <Checkbox value="1">VIP</Checkbox>
                  <Checkbox value="2">老客</Checkbox>
                  <Checkbox value="3">新客</Checkbox>
                  <Checkbox value="4">全部</Checkbox>
                </Checkbox.Group>
              )}
            </Form.Item>
            <Form.Item {...formItemLayout} label={"不满足条件报错类型选择"}>
              {getFieldDecorator(`CouponArr[${i}].AlertErrorType`, {
                initialValue: CouponArr[i].AlertErrorType,
                rules: [
                  { required: true, message: "请填写不满足条件报错类型选择" },
                ],
              })(
                <Radio.Group
                  onChange={(e:any) => this.handleAlertErrorTypeChange(e, i)}
                >
                  <Radio value={"1"}>toast报错</Radio>
                  <Radio value={"2"}>弹窗报错</Radio>
                </Radio.Group>
              )}
            </Form.Item>
            {CouponArr[i].AlertErrorType == "1" ? (
              <Form.Item {...formItemLayout} label={"报错文案"}>
                {getFieldDecorator(`CouponArr[${i}].AlertErrorText`, {
                  initialValue: CouponArr[i].AlertErrorText,
                  rules: [{ required: true, message: "请填写报错文案" }],
                })(
                  <Input.TextArea
                    placeholder="请填写报错文案"
                    maxLength={200}
                  />
                )}
              </Form.Item>
            ) : CouponArr[i].AlertErrorType != "2" ? (
              ""
            ) : (
              <Form.Item {...formItemLayout} label={"弹窗报错图片"}>
                {getFieldDecorator(`CouponArr[${i}].AlertErrorImage`, {
                  initialValue: transformFile(CouponArr[i].AlertErrorImage),
                  valuePropName: "fileList",
                  getValueFromEvent: this.normFile,
                  rules: [{ required: true, message: "请上传弹窗报错图片" }],
                })(
                  <Upload
                    withCredentials={true}
                    multiple={false}
                    name="Attach"
                    listType={"picture"}
                    action={"ApiErpAttach/uploadAttach"}
                    // fileList={this.state.fileList}
                    customRequest={(e:any) => {
                      this.AlertErrorImageUpload(e, i, "AlertErrorImage");
                      return {
                        abort() {
                          console.log("xxxxxx");
                        },
                      };
                    }}
                    // showUploadList={false}
                    onChange={this.handleChange.bind(this)}
                    onRemove={this.handleOnRemove.bind(
                      this,
                      i,
                      "AlertErrorImage"
                    )}
                  >
                    {renderButton(CouponArr[i].AlertErrorImage)}
                  </Upload>
                )}
              </Form.Item>
            )}
            <Form.Item {...formItemLayout} label={"添加领取预告图开关"}>
              {getFieldDecorator(
                `CouponArr[${i}].AddReceiveNoticeImageSwitch`,
                {
                  initialValue:
                    CouponArr[i].AddReceiveNoticeImageSwitch == "1"
                      ? true
                      : false,
                  valuePropName: "checked",
                  // rules: [{ required: true, message: "添加领取预告图开关" }],
                  rules: [],
                }
              )(
                <Switch
                  onChange={(e:any) =>
                    this.handleAddReceiveNoticeImageSwitchChange(e, i)
                  }
                ></Switch>
              )}
            </Form.Item>
            {CouponArr[i].AddReceiveNoticeImageSwitch == "1" ? (
              <div>
                <Form.Item {...formItemLayout} label={"选择展示预告图截止时间"}>
                  {getFieldDecorator(
                    `CouponArr[${i}].AddReceiveNoticeImageLimitDate`,
                    {
                      initialValue: CouponArr[i].AddReceiveNoticeImageLimitDate
                        ? CouponArr[i].AddReceiveNoticeImageLimitDate
                        : undefined,
                      rules: [{ required: false, message: "请选择过期天数" }],
                    }
                  )(
                    <DatePicker
                      format={"YYYY-MM-DD HH:mm:ss"}
                      showTime={{
                        defaultValue: moment("23:59:59", "HH:mm:ss") as any,
                      }}
                      onChange={(e:any, dateString:any) =>
                        this.handleDatePicker.call(
                          this,
                          e,
                          dateString,
                          i,
                          "AddReceiveNoticeImageLimitDate"
                        )
                      }
                    ></DatePicker>
                  )}
                </Form.Item>
                <Form.Item {...formItemLayout} label={"添加领取预告图"}>
                  {getFieldDecorator(`CouponArr[${i}].AddReceiveNoticeImage`, {
                    initialValue: transformFile(
                      CouponArr[i].AddReceiveNoticeImage
                    ),
                    rules: [{ required: true, message: "添加领取预告图" }],
                    valuePropName: "fileList",
                    getValueFromEvent: this.normFile,
                  })(
                    <Upload
                      withCredentials={true}
                      multiple={false}
                      name="Attach"
                      listType={"picture"}
                      action={"ApiErpAttach/uploadAttach"}
                      // fileList={this.state.fileList}
                      customRequest={(e:any) => {
                        this.upload(e, i, "AddReceiveNoticeImage");
                        return {
                          abort() {
                            // console.log("xxxxxx");
                          },
                        };
                      }}
                      // showUploadList={false}
                      onChange={this.handleChange.bind(this)}
                      onRemove={this.handleOnRemove.bind(
                        this,
                        i,
                        "AddReceiveNoticeImage"
                      )}
                    >
                      {/* {CouponArr[i].AddReceiveNoticeImage ? (
                        ""
                      ) : (
                        <Button>
                          <Icon type="upload" /> 上传
                        </Button>
                      )} */}
                      {renderButton(CouponArr[i].AddReceiveNoticeImage)}
                      <div>
                        图片要求：宽度{initImgWidthOfISingleCouponSetting}px
                        ，格式jpg、png
                      </div>
                    </Upload>
                  )}
                </Form.Item>
              </div>
            ) : null}
            <Form.Item {...formItemLayout} label={"添加领取前图片"}>
              {getFieldDecorator(
                `CouponArr[${i}].BeforeAddReceiveNoticeImage`,
                {
                  initialValue: transformFile(
                    CouponArr[i].BeforeAddReceiveNoticeImage
                  ),

                  rules: [{ required: true, message: "添加领取前图片" }],
                  valuePropName: "fileList",
                  getValueFromEvent: this.normFile,
                }
              )(
                <Upload
                  withCredentials={true}
                  multiple={false}
                  name="Attach"
                  listType={"picture"}
                  action={"ApiErpAttach/uploadAttach"}
                  // beforeUpload={(file, fileList) =>
                  //   this.handleBeforeUpload(file, fileList)
                  // }
                  // fileList={
                  //   CouponArr[i].BeforeAddReceiveNoticeImage
                  // }
                  customRequest={(e:any) => {
                    this.upload(e, i, "BeforeAddReceiveNoticeImage");
                    return {
                      abort() {
                        // console.log("xxxxxx");
                      },
                    };
                  }}
                  // showUploadList={!!CouponArr[i].BeforeAddReceiveNoticeImage}
                  // showUploadList={false}
                  onChange={this.handleChange.bind(this)}
                  onRemove={this.handleOnRemove.bind(
                    this,
                    i,
                    "BeforeAddReceiveNoticeImage"
                  )}
                >
                  {/* {CouponArr[i].BeforeAddReceiveNoticeImage ? (
                    ""
                  ) : (
                    <Button>
                      <Icon type="upload" /> 上传
                    </Button>
                  )} */}
                  {renderButton(CouponArr[i].BeforeAddReceiveNoticeImage)}
                  <div>
                    图片要求：宽度{initImgWidthOfISingleCouponSetting}px
                    ，格式jpg、png
                  </div>
                </Upload>
              )}
            </Form.Item>
            <Form.Item {...formItemLayout} label={"添加领取后图片开关"}>
              {getFieldDecorator(
                `CouponArr[${i}].AfterAddReceiveNoticeImageSwitch`,
                {
                  initialValue:
                    CouponArr[i].AfterAddReceiveNoticeImageSwitch == "1"
                      ? true
                      : false,
                  valuePropName: "checked",
                  // rules: [{ required: true, message: "添加领取后图片开关" }],
                  rules: [],
                }
              )(
                <Switch
                  onChange={(e:any) =>
                    this.handleAfterAddReceiveNoticeImageSwitchChange(e, i)
                  }
                ></Switch>
              )}
            </Form.Item>
            {CouponArr[i].AfterAddReceiveNoticeImageSwitch == "1" ? (
              <Form.Item {...formItemLayout} label={"添加领取后图片"}>
                {getFieldDecorator(
                  `CouponArr[${i}].AfterAddReceiveNoticeImage`,
                  {
                    initialValue: transformFile(
                      CouponArr[i].AfterAddReceiveNoticeImage
                    ),
                    rules: [{ required: true, message: "添加领取后图片" }],
                    valuePropName: "fileList",
                    getValueFromEvent: this.normFile,
                  }
                )(
                  <Upload
                    withCredentials={true}
                    multiple={false}
                    name="Attach"
                    listType={"picture"}
                    action={"ApiErpAttach/uploadAttach"}
                    // fileList={this.state.fileList}
                    customRequest={(e:any) => {
                      this.upload(e, i, "AfterAddReceiveNoticeImage");
                      return {
                        abort() {
                          // console.log("xxxxxx");
                        },
                      };
                    }}
                    // showUploadList={false}
                    onChange={this.handleChange.bind(this)}
                    onRemove={this.handleOnRemove.bind(
                      this,
                      i,
                      "AfterAddReceiveNoticeImage"
                    )}
                  >
                    {/* {CouponArr[i].AfterAddReceiveNoticeImage ? (
                    ""
                  ) : (
                    <Button>
                      <Icon type="upload" /> 上传
                    </Button>
                  )} */}
                    {renderButton(CouponArr[i].AfterAddReceiveNoticeImage)}
                    <div>
                      图片要求：宽度{initImgWidthOfISingleCouponSetting}px
                      ，格式jpg、png
                    </div>
                  </Upload>
                )}
              </Form.Item>
            ) : null}
          </div>
        </div>
      );
    });
    return (
      <Form className={`ISingleCouponSetting`} onSubmit={this.handleSubmit}>
        <Form.Item label="选择优惠券数量" {...formItemLayout}>
          <Select onChange={this.onChange} value={this.state.value}>
            <Option value={1}>1</Option>
            <Option value={2}>2</Option>
            <Option value={3}>3</Option>
          </Select>
        </Form.Item>

        <div className="ISingleCouponSettingForm_ct">
          {ISingleCouponSettingForm}
        </div>
      </Form>
    );
  }
  componentDidMount() {
    // componentDidMount
    // console.log(
    //   this.props.ComponentData,
    //   "this is sssssss",
    //   _.merge(this.state.CouponArr, this.props.ComponentData.CouponArr)
    // );
    if (
      this.props.ComponentData &&
      this.props.ComponentData.CouponArr == undefined
    ) {
      this.props.updateComponent({
        Key: this.props.ComponentKey,
        ComponentData: {
          CouponArr: this.state.CouponArr,
        },
      });
    }
    if (
      this.props.ComponentData &&
      this.props.ComponentData.CouponArr != undefined
    ) {
      this.setState({
        CouponArr: this.props.ComponentData.CouponArr,
        value: this.props.ComponentData.CouponArr.length,
      });
      initImgWidthOfISingleCouponSetting =
        750 / this.props.ComponentData.CouponArr.length;
    }
  }
}
const handleValuesChange = (props: any, allValues: any): void => {
  // console.log("occccccc", _.cloneDeep(allValues));
  // // 过滤files本地上传的情况
  // allValues.CouponArr.map((node: any) => {
  //   if (
  //     _.isArray(node.AlertErrorImage) ||
  //     _.isArray(node.AddReceiveNoticeImage) ||
  //     _.isArray(node.BeforeAddReceiveNoticeImage) ||
  //     _.isArray(node.AfterAddReceiveNoticeImage)
  //   ) {
  //     node = !!node[0].response ? node[0].response.Data.F_URL : "";
  //   }
  //   return node;
  // });
  props.updateComponent({
    Key: props.ComponentKey,
    ComponentData: { ...allValues },
  });
};
const WrappedISingleCouponSetting = Form.create<any>({
  onValuesChange: handleValuesChange,
})(ISingleCouponSetting);

export default WrappedISingleCouponSetting;
