import React from "react";
import ReactDOM from "react-dom";
import { Input, Button, Icon, Switch } from "antd";
import moment from 'moment'
import _ from "lodash";
let input_longText_number = "";
let createFieldElement = function (fieldSet, v, vIndex, FormConfigSetting) {
  let fieldEls = [];
  // 根据Sort先将fieldSet进行排序
  fieldSet = _.orderBy(fieldSet, ["Sort"], ["asc"]);
  fieldSet.forEach((item, index) => {
    let colStyle = Object.assign({}, item.colStyle);
    if (item.isShowFn) {
      if (!item.isShowFn.call(this, v)) {
        colStyle = { display: "none" };
      }
    }
    let itemProps = Object.assign({}, item.props);
    itemProps = Object.assign(
      {},
      itemProps,
      {
        // placeholder: item.title,
        key: index,
        // itemstyle: { width: 150, marginRight: 5, ...colStyle },
        ref: item.InputType + "-" + index,
      },
      item.props
    );
    if (item.InputType == "Name") {
      fieldEls.push(
        <div
          className={`input_box`}
          style={{
            backgroundColor: FormConfigSetting.FormInputColor,
            ...colStyle,
          }}
          {...itemProps}
        >
          <span
            className={`icon_box`}
            style={{
              color: FormConfigSetting.TextColor,
            }}
          >
            <Icon
              type="user"
              style={{
                color: FormConfigSetting.IconColor,
              }}
            />
            {/* 姓名 */}
            {item.LabelText}
          </span>
          <span
            className={`straight_line`}
            style={{
              backgroundColor: FormConfigSetting.LineColor,
            }}
          ></span>

          <input
            type="text"
            style={{
              color: FormConfigSetting.TextColor,
              "--placeholder-color": FormConfigSetting.PlaceholderColor,
            }}
            placeholder={item.PlaceholderText}
          ></input>
        </div>
      );
    } else if (item.InputType == "Tel") {
      fieldEls.push(
        <div
          className={`input_box`}
          style={{
            backgroundColor: FormConfigSetting.FormInputColor,
            ...colStyle,
          }}
          {...itemProps}
        >
          <span
            className={`icon_box`}
            style={{
              color: FormConfigSetting.TextColor,
            }}
          >
            <Icon
              type="mobile"
              style={{
                color: FormConfigSetting.IconColor,
              }}
            />
            {/* 手机号 */}
            {item.LabelText}
          </span>
          <span
            className={`straight_line`}
            style={{
              backgroundColor: FormConfigSetting.LineColor,
            }}
          ></span>

          <input
            type="text"
            style={{
              color: FormConfigSetting.TextColor,
              "--placeholder-color": FormConfigSetting.PlaceholderColor,
            }}
            placeholder={item.PlaceholderText}
          ></input>
        </div>
      );
    } else if (item.InputType == "Email") {
      fieldEls.push(
        <div
          className={`input_box`}
          style={{
            backgroundColor: FormConfigSetting.FormInputColor,
            ...colStyle,
          }}
          {...itemProps}
        >
          {/* <span className={`icon_box`}> */}
          <span
            className={`icon_box`}
            style={{
              color: FormConfigSetting.TextColor,
            }}
          >
            <Icon
              type="mail"
              style={{
                color: FormConfigSetting.IconColor,
              }}
            />
            {/* 邮箱 */}
            {item.LabelText}
          </span>
          <span
            className={`straight_line`}
            style={{
              backgroundColor: FormConfigSetting.LineColor,
            }}
          ></span>
          <input
            type="text"
            style={{
              color: FormConfigSetting.TextColor,
              "--placeholder-color": FormConfigSetting.PlaceholderColor,
            }}
            placeholder={item.PlaceholderText}
          ></input>
        </div>
      );
    } else if (item.InputType == "Date") {
      fieldEls.push(
        <div
          className={`input_box`}
          style={{
            backgroundColor: FormConfigSetting.FormInputColor,
            ...colStyle,
          }}
          {...itemProps}
        >
          <span className={`icon_box`}>
            <Icon
              // type="mobile"
              component={() => (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="svg-icon"
                  viewBox="0 0 448 512"
                  width="10"
                  height="10"
                  fill="rgb(16, 16, 16)"
                >
                  <path d="M400 64h-48V12c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v52H160V12c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v52H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48zm-6 400H54c-3.3 0-6-2.7-6-6V160h352v298c0 3.3-2.7 6-6 6z"></path>
                </svg>
              )}
              style={{
                color: FormConfigSetting.IconColor,
              }}
            />
            {/* 选择日期 */}
            {item.LabelText}
          </span>
          {/* 
          <input
            type="text"
            style={{
              color: FormConfigSetting.TextColor,
            }}
            placeholder={item.PlaceholderText}
          ></input> */}
        </div>
      );
    } else if (item.InputType == "Time") {
      fieldEls.push(
        <div
          className={`input_box`}
          style={{
            backgroundColor: FormConfigSetting.FormInputColor,
            ...colStyle,
          }}
          {...itemProps}
        >
          <span className={`icon_box`}>
            <Icon
              // type="mobile"
              component={() => (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="svg-icon"
                  viewBox="0 0 24 24"
                  width="10"
                  height="10"
                  fill="rgb(16, 16, 16)"
                >
                  <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"></path>
                </svg>
              )}
              style={{
                color: FormConfigSetting.IconColor,
              }}
            />
            {/* 选择时间 */}
            {item.LabelText}
          </span>
        </div>
      );
    } else if (item.InputType == "ProviceCityArea") {
      fieldEls.push(
        // <Input
        //   style={{
        //     borderColor: FormConfigSetting.FormInputColor,
        //     color: FormConfigSetting.TextColor,
        //   }}
        //   prefix={
        //     <span>
        //       <Icon
        //         type="mobile"
        //         style={{
        //           color: FormConfigSetting.IconColor,
        //         }}
        //       />
        //       选择省市区
        //     </span>
        //   }
        //   {...itemProps}
        //   placeholder={item.PlaceholderText}
        // ></Input>
        <div
          className={`input_box`}
          style={{
            backgroundColor: FormConfigSetting.FormInputColor,
            ...colStyle,
          }}
          {...itemProps}
        >
          <span
            className={`icon_box`}
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Icon
              // type="mobile"
              component={() => (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="svg-icon"
                  viewBox="0 0 24 24"
                  width="10"
                  height="10"
                  fill="rgb(16, 16, 16)"
                >
                  <path d="M18 8c0-3.31-2.69-6-6-6S6 4.69 6 8c0 4.5 6 11 6 11s6-6.5 6-11zm-8 0c0-1.1.9-2 2-2s2 .9 2 2a2 2 0 0 1-4 0zM5 20v2h14v-2H5z"></path>
                </svg>
              )}
              style={{
                color: FormConfigSetting.IconColor,
              }}
            />
            {/* 选择省市区 */}
            {item.LabelText}
            <Icon
              // type="mobile"
              component={() => (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="svg-icon"
                  viewBox="0 0 24 24"
                  width="10"
                  height="10"
                  fill="rgb(16, 16, 16)"
                >
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5z"></path>
                </svg>
              )}
              style={{
                color: FormConfigSetting.IconColor,
                // float: "right",
                flex: 1,
                textAlign: "right",
              }}
            />
          </span>
        </div>
      );
    } else if (item.InputType == "ShortText") {
      fieldEls.push(
        <div
          className={`input_box`}
          style={{
            backgroundColor: FormConfigSetting.FormInputColor,
            ...colStyle,
          }}
          {...itemProps}
        >
          <span className={`icon_box`}>
            <Icon
              // type="mobile"
              component={() => (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="svg-icon"
                  viewBox="64 64 896 896"
                  width="10"
                  height="10"
                  fill="rgb(16, 16, 16)"
                >
                  <path d="M257.7 752c2 0 4-.2 6-.5L431.9 722c2-.4 3.9-1.3 5.3-2.8l423.9-423.9a9.96 9.96 0 0 0 0-14.1L694.9 114.9c-1.9-1.9-4.4-2.9-7.1-2.9s-5.2 1-7.1 2.9L256.8 538.8c-1.5 1.5-2.4 3.3-2.8 5.3l-29.5 168.2a33.5 33.5 0 0 0 9.4 29.8c6.6 6.4 14.9 9.9 23.8 9.9zm67.4-174.4L687.8 215l73.3 73.3-362.7 362.6-88.9 15.7 15.6-89zM880 836H144c-17.7 0-32 14.3-32 32v36c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-36c0-17.7-14.3-32-32-32z"></path>
                </svg>
              )}
              style={{
                color: FormConfigSetting.IconColor,
              }}
            />
          </span>
          <span
            className={`straight_line`}
            style={{
              backgroundColor: FormConfigSetting.LineColor,
            }}
          ></span>

          <input
            type="text"
            style={{
              color: FormConfigSetting.TextColor,
              "--placeholder-color": FormConfigSetting.PlaceholderColor,
            }}
            placeholder={item.PlaceholderText}
          ></input>
        </div>
      );
    } else if (item.InputType == "LongText") {
      fieldEls.push(
        <div className={`longText_ct`}>
          <Input.TextArea
            style={{
              borderColor: FormConfigSetting.FormInputColor,
              color: FormConfigSetting.TextColor,
              "--placeholder-color": FormConfigSetting.PlaceholderColor,
            }}
            {...itemProps}
            placeholder={item.PlaceholderText}
            onChange={(e) => {
              input_longText_number = e.target.value;
            }}
          />
          <div className={`longText_number`}>
            {input_longText_number.length}/{item.LimitTextLength}
          </div>
        </div>
      );
    } else if (item.InputType == "Select") {
      let optionEls = [];
      let options = [];
      if (typeof item.SelectionSetting == "string") {
        options = item.SelectionSetting.split(",");
      }
      if (options && options.length) {
        optionEls = options.map((data, index) => {
          return (
            <option
              key={data}
              value={data}
              style={{
                backgroundColor: FormConfigSetting.FormInputColor,
              }}
            >
              {data}
            </option>
          );
        });
      }
      fieldEls.push(
        <div
          key={itemProps.key}
          className={`select_ct`}
          style={{
            backgroundColor: FormConfigSetting.FormInputColor,
            ...colStyle,
          }}
          {...itemProps}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="svg-icon"
            fill="rgb(16, 16, 16)"
            viewBox="0 0 32 32"
            width="20"
            height="20"
          >
            <path d="M16 6.933c-5.013 0-9.067 4.053-9.067 9.067s4.053 9.067 9.067 9.067 9.067-4.053 9.067-9.067-4.053-9.067-9.067-9.067zM16 24c-4.373 0-8-3.627-8-8s3.627-8 8-8 8 3.627 8 8-3.627 8-8 8zM16 12.16c-2.133 0-3.84 1.707-3.84 3.84s1.707 3.84 3.84 3.84 3.84-1.707 3.84-3.84-1.707-3.84-3.84-3.84zM16 18.773c-1.493 0-2.773-1.28-2.773-2.773s1.28-2.773 2.773-2.773c1.493 0 2.773 1.28 2.773 2.773s-1.28 2.773-2.773 2.773z"></path>
          </svg>
          <select
            key={"select_box"}
            placeholder={item.LabelText}
            style={{
              "--placeholder-color": FormConfigSetting.PlaceholderColor,
              color: FormConfigSetting.TextColor,
              backgroundColor: FormConfigSetting.FormInputColor,
            }}
          >
            {optionEls}
          </select>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="svg-icon"
            fill="rgb(16, 16, 16)"
            viewBox="0 0 24 24"
            width="20"
            height="20"
          >
            <path d="M7 10l5 5 5-5z"></path>
          </svg>
        </div>
      );
    } else if (item.InputType == "Checkbox") {
      let options = [];
      let optionEls = [];
      if (typeof item.SelectionSetting == "string") {
        options = item.SelectionSetting.split(",").map((item) => ({
          text: item,
          value: item,
        }));
      }
      optionEls =
        options && options.length
          ? options.map((data, index) => {
            return (
              <div
                key={index}
                className={`checkbox_box`}
                style={{
                  borderColor: FormConfigSetting.LineColor,
                }}
              >
                <input
                  type="checkbox"
                  id={data.text}
                  value={data[fieldSet.valueField || "value"]}
                  style={{
                    "--form-check-color": FormConfigSetting.IconColor,
                  }}
                ></input>
                <label
                  htmlFor={data.text}
                  style={{
                    color: FormConfigSetting.TextColor,
                  }}
                >
                  {data.text}
                </label>
              </div>
            );
          })
          : [];
      fieldEls.push(
        <div
          key={itemProps.key}
          className={`checkbox_ct`}
          style={{
            backgroundColor: FormConfigSetting.FormInputColor,
          }}
        >
          <div
            className={`checkbox_box`}
            style={{
              borderColor: FormConfigSetting.LineColor,
            }}
          >
            <input
              type="checkbox"
              id={"checked_input"}
              defaultChecked={true}
              style={{
                "--form-check-color": FormConfigSetting.IconColor,
              }}
            ></input>
            <label
              htmlFor={`checked_input`}
              style={{
                color: FormConfigSetting.TextColor,
              }}
            >
              {/* 多选选择项 */}
              {item.LabelText}
            </label>
          </div>
          {optionEls}
        </div>
      );
    } else if (item.InputType == "Radio") {
      let options = [];
      let optionEls = [];
      if (typeof item.SelectionSetting == "string") {
        options = item.SelectionSetting.split(",").map((item) => ({
          text: item,
          value: item,
        }));
      }
      optionEls =
        options && options.length
          ? options.map((data, index) => {
            return (
              <div
                key={index}
                className={`radio_box`}
                style={{
                  borderColor: FormConfigSetting.LineColor,
                }}
              >
                <input
                  type="radio"
                  id={data.text}
                  value={data[fieldSet.valueField || "value"]}
                  style={{
                    "--form-check-color": FormConfigSetting.IconColor,
                  }}
                ></input>
                <label
                  htmlFor={data.text}
                  style={{
                    color: FormConfigSetting.TextColor,
                  }}
                >
                  {data.text}
                </label>
              </div>
            );
          })
          : [];
      fieldEls.push(
        <div
          key={itemProps.key}
          className={`radio_ct`}
          style={{
            backgroundColor: FormConfigSetting.FormInputColor,
          }}
        >
          <div
            key={index}
            className={`radio_box`}
            style={{
              borderColor: FormConfigSetting.LineColor,
            }}
          >
            <input
              type="radio"
              id={"radio_input"}
              defaultChecked={true}
              style={{
                "--form-check-color": FormConfigSetting.IconColor,
              }}
            ></input>
            <label
              htmlFor={`radio_input`}
              style={{
                color: FormConfigSetting.TextColor,
              }}
            >
              {/* 单项选择项 */}
              {item.LabelText}
            </label>
          </div>

          {optionEls}
        </div>
      );
    } else if (item.InputType === "ImgUpload") {
      let EL = (
        <div
          className={`imgUpload_ct`}
          style={{
            backgroundColor: FormConfigSetting.FormInputColor,
            ...colStyle,
          }}
          {...itemProps}
        >
          <input
            type="text"
            style={{
              color: FormConfigSetting.TextColor,
            }}
            placeholder={item.PlaceholderText}
          ></input>
          {/* <FileInput></FileInput> */}
          <Button size="small" disabled={true}>
            <Icon type="upload" /> 上传
          </Button>
        </div>
      );
      fieldEls.push(EL);
      // fieldEls.push(<FileInput {...itemProps}></FileInput>);
    } else if (item.InputType === "VideoUpload") {
      let EL = (
        <div
          className={`videoUpload_ct`}
          style={{
            backgroundColor: FormConfigSetting.FormInputColor,
            ...colStyle,
          }}
          {...itemProps}
        >
          <input
            type="text"
            style={{
              color: FormConfigSetting.TextColor,
            }}
            placeholder={item.PlaceholderText}
          ></input>
          {/* <FileInput ></FileInput> */}
          <Button size="small" disabled={true}>
            <Icon type="upload" /> 上传
          </Button>
        </div>
      );
      fieldEls.push(EL);
    }
  });
  return fieldEls;
};
function getHours (time) {
  return moment(time).format('X') - moment(time).startOf('day').format('X')
}
export default class CouponCash extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      customFormDesignPanel_box_height: 0,
      successfulPop: false,
      failPop: false,
      seStatus: 1
    };
    // this.wrapperCustomFormDesignPanel_box_ref = React.createRef();

  }
  clock (time) {
    if (time) {
      let today = new Date()//当前时间
      let stopTime = Number(time) * 1000//结束时间
      let shenyu = stopTime - today.getTime()//倒计时毫秒数
      let shengyuD = parseInt(shenyu / (60 * 60 * 24 * 1000))//转换为天
      let D = parseInt(shenyu) - parseInt(shengyuD * 60 * 60 * 24 * 1000)//除去天的毫秒数
      let shengyuH = parseInt(D / (60 * 60 * 1000))//除去天的毫秒数转换成小时
      let H = D - shengyuH * 60 * 60 * 1000//除去天、小时的毫秒数
      let shengyuM = parseInt(H / (60 * 1000))//除去天的毫秒数转换成分钟
      let M = H - shengyuM * 60 * 1000;//除去天、小时、分的毫秒数
      let S = parseInt((shenyu - shengyuD * 60 * 60 * 24 * 1000 - shengyuH * 60 * 60 * 1000 - shengyuM * 60 * 1000) / 1000)//除去天、小时、分的毫秒数转化为秒

      this.setState({
        shengyuD: shengyuD,
        shengyuH: shengyuH,
        shengyuM: shengyuM,
        S: S
      })


    }
  }
  getStatue (start, end) {
    let time = getHours(new Date())
    let start1 = start * 1000
    let end1 = end * 1000
    if (getHours(end1) < time) {
      return '已结束'
    }
    if (getHours(start1) < time && time < getHours(end1)) {
      return '进行中'
    }
    if (time < getHours(start1)) {
      return '即将开始'
    }

  }
  getStatueType2 (start, end) {
    let time = new Date() / 1
    if (start < time && time < end) {
      return '进行中'
    }
    if (time < start) {
      return '即将开始'
    }
    if (time > end) {
      return '已结束'
    }
  }
  componentDidMount () {
    const { FormConfigSetting } = this.props.ComponentData;
    if (FormConfigSetting) {
      FormConfigSetting.SessionsConfig = FormConfigSetting && FormConfigSetting.SessionsConfig && FormConfigSetting.SessionsConfig.filter((item, index, self) => {
        return self.findIndex(el => el.Index == item.Index) == index
      })
    }

  }
  render () {
    const { FormConfigSetting } = this.props.ComponentData;
    // const { customFormDesignPanel_box_height } = this.state;
    if (FormConfigSetting) {
      FormConfigSetting.SessionsConfig = FormConfigSetting && FormConfigSetting.SessionsConfig && FormConfigSetting.SessionsConfig.filter((item, index, self) => {
        return self.findIndex(el => el.Index == item.Index) == index
      })
    }


    return (
      <div className="cashCouponSetting">
        {
          FormConfigSetting ? (
            <div className="wrapperCustomFormDesignPanel_ct"
            >
              <div className={`cashFormDesignPanel_ct`}>
                <div
                  className="wrapperCustomFormDesignPanel_box"
                  style={{
                    // backgroundColor: `${FormConfigSetting.SessionsBgColor}`,
                  }}
                  ref={(inst) => (this.wrapperCustomFormDesignPanel_box_ref = inst)}
                >
                  {/* 活动规则 */}
                  {
                    FormConfigSetting.ActRuleOpen &&
                    <div
                      className="cashDesignPanel_box"
                      onClick={() => { this.setState({ showRule: true }) }}
                      style={{
                        backgroundImage: `url(${FormConfigSetting.RuleBtnImg})`,
                        backgroundSize: 'cover',
                        color: 'red'
                      }}
                    >
                      {this.state.showRule
                        ? <div className='rulePop' onClick={(e) => {
                          const ev = e || window.event
                          ev.stopPropagation();
                          this.setState({ showRule: false })
                        }}>
                          {FormConfigSetting.RuleMsg}
                        </div>
                        : ''
                      }
                    </div>
                  }
                  {/* 活动Tab和场次 */}
                  {
                    // FormConfigSetting.SessionsSwitchOpen &&
                    <div
                      className="cashCoupon"
                      style={{
                      }}
                    >
                      {/* tab */}
                      <div
                        className="cashCoupon_tab"
                        style={{
                          backgroundImage: `url(${FormConfigSetting.SessionsTabBgImg})`,
                          backgroundColor: `${FormConfigSetting.SessionsTabBgColor}`,
                          backgroundSize: '100%'
                        }}
                      >
                        {FormConfigSetting.SessionsConfig &&
                          FormConfigSetting.SessionsConfig.sort((a, b) => a.SessionsStartTime - b.SessionsStartTime).map((item, index) => {
                            return (
                              <div key={index}>
                                <div
                                  className='cashCoupon_tab_item'
                                  onClick={() => {
                                    this.clock(item.SessionsStartTime)
                                    this.setState({
                                      tabIndex: item.SessionsStartTime,
                                      successfulPop: false,
                                      failPop: false
                                    })
                                  }}
                                  style={{
                                    // backgroundImage: `url(${FormConfigSetting.SessionsTabBgImg})`,
                                    backgroundColor: item.SessionsStartTime == this.state.tabIndex ? FormConfigSetting.TabSelectedBgColor : '',
                                    color: item.SessionsStartTime == this.state.tabIndex ? FormConfigSetting.TabSelectedColor : FormConfigSetting.TabColor
                                  }}
                                >

                                  {item.SessionsStartTime && item.SessionsEndTime && FormConfigSetting.ActStyle == '1' && this.getStatue(item.SessionsStartTime, item.SessionsEndTime)}
                                  {item.SessionsStartTime && item.SessionsEndTime && FormConfigSetting.ActStyle == '2' && this.getStatueType2(item.SessionsStartTime * 1000, item.SessionsEndTime * 1000)}<br />
                                  {item.SessionsStartTime && FormConfigSetting.ActStyle == '1' && moment(item.SessionsStartTime * 1000).format('HH:mm')}
                                </div>

                              </div>

                            )
                          })
                        }
                      </div>
                      {/* 倒计时 */}
                      {
                        FormConfigSetting.CountDownOpen &&
                        <div
                          className='cashCoupon_tab_CountDown'
                          style={{
                            backgroundImage: `url(${FormConfigSetting.CountDownImg})`,

                            backgroundColor: `${FormConfigSetting.CountDownBg}`,
                            backgroundSize: '100%',
                            color: FormConfigSetting.CountDownColor
                          }}
                        >
                          <div className='cashCoupon_tab_CountDown_item'>

                            <span
                              style={{
                                backgroundColor: `${FormConfigSetting.CountDownNumBgColor}`,
                                color: FormConfigSetting.CountDownNumColor
                              }}
                            >99</span>天<span style={{
                              backgroundColor: `${FormConfigSetting.CountDownNumBgColor}`,
                              color: FormConfigSetting.CountDownNumColor
                            }}>99</span>小时<span style={{
                              backgroundColor: `${FormConfigSetting.CountDownNumBgColor}`,
                              color: FormConfigSetting.CountDownNumColor
                            }}>99</span>分<span style={{
                              backgroundColor: `${FormConfigSetting.CountDownNumBgColor}`,
                              color: FormConfigSetting.CountDownNumColor
                            }}>99</span>秒
                          </div>

                        </div>
                      }
                      {/* 场次内容 */}
                      {
                        FormConfigSetting.SessionsConfig &&
                        FormConfigSetting.SessionsConfig.map((item, index) => {
                          return (
                            <div
                              key={index}
                              className='cashCoupon_tab_content'
                              style={{
                                backgroundColor: FormConfigSetting.SessionsBgColor,
                                backgroundImage: `url(${FormConfigSetting.SessionsBgImg})`,
                                backgroundSize: '100%',
                                display: item.SessionsStartTime && item.SessionsStartTime == this.state.tabIndex ? 'block' : "none",
                                color: 'white',
                              }}
                            >

                              {item.BeforeBg ? <img src={item.BeforeBg} /> : ''}
                              {this.state.successfulPop &&
                                <div
                                  className='cashCoupon_pop'
                                  style={{

                                  }}
                                  onClick={() => {
                                    this.setState({
                                      successfulPop: false,
                                      failPop: false
                                    })
                                  }}
                                >
                                  购买成功(点击关闭)
                                  <img src={item.PopBg} alt="PopBg" />
                                  <img style={{ width: "80%" }} src={item.ToUseBtn} alt="跳转按钮" />
                                  {
                                    item.SuccessPop == '1' &&
                                    <img style={{ width: "80%" }} src={item.IsSubmitSuccessAdImg} alt="广告位图" />
                                  }
                                </div>}
                              购买成功<Switch checked={this.state.successfulPop ? true : false} onChange={(checked) => {
                                if (checked) {
                                  this.setState({ successfulPop: true, failPop: false })
                                } else {
                                  this.setState({ successfulPop: false, failPop: false })
                                }

                              }} />
                            </div>
                          )
                        })

                      }
                      {/* 进度条 */}
                      {
                        FormConfigSetting.ProgressOpen &&
                        <div
                          className='cashCoupon_tab_Progress'
                          style={{
                            backgroundImage: `url(${FormConfigSetting.ProcessImg})`,
                            backgroundSize: '100%',
                            backgroundColor: FormConfigSetting.ProcessBg
                          }}
                        >
                          <div
                            className='cashCoupon_tab_ProgressTxt'
                            style={{
                              backgroundColor: FormConfigSetting.ProcessBuyBg,
                              color: FormConfigSetting.ProcessBuyTxtBg
                            }}
                          >
                            剩余2000
                          </div>
                          <div
                            className="cashCoupon_tab_ProgressItem"
                            style={{
                              backgroundColor: FormConfigSetting.ProcessNotBuyBg
                            }}
                          ></div>
                          <div
                            className="cashCoupon_tab_ProgressItem1"
                            style={{
                              backgroundColor: FormConfigSetting.ProcessBuyBg
                            }}
                          ></div>
                        </div>
                      }
                      {/* 购买按钮 */}
                      <div
                        className='cashCoupon_buyBtn'
                        style={{
                          backgroundColor: FormConfigSetting.BuyBtnBg,
                          backgroundImage: `url(${FormConfigSetting.BuyBtnImg})`,
                          backgroundSize: '100%',
                          color: "white"
                        }}
                      >
                        {FormConfigSetting.BuyBtnBg ? <img style={{ width: "80%" }} src={FormConfigSetting.BeforeBuyImg} alt="111" /> : '购买按钮'}
                      </div>
                      {/* 设置提醒 */}
                      {
                        FormConfigSetting.RemindOpen &&
                        <div
                          className='cashCoupon_remind'
                          style={{
                            backgroundColor: FormConfigSetting.RemindBg,
                            backgroundImage: `url(${FormConfigSetting.RemindImg})`,
                            backgroundSize: '100%',
                            color: FormConfigSetting.RemindColor
                          }}
                        >
                          <Icon
                            // type="mobile"
                            component={() => (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="svg-icon"
                                viewBox="0 0 960 860"
                                width="15"
                                height="15"
                                fill={FormConfigSetting.RemindIconColor}
                              >
                                <path d="M707.1 505.7H547.9V249.8c0-1.1-0.9-2-2-2h-60.5c-1.1 0-2 0.9-2 2v318.3c0 1.1 0.9 2 2 2H707c1.1 0 2-0.9 2-2v-60.5c0.1-1-0.8-1.9-1.9-1.9z"></path>
                                <path d="M804.2 835.5C882.4 759.3 931 653 931 535.5c0-95-31.8-182.7-85.3-253.1 23.6-24 36.9-56.1 36.9-90.3 0-71.1-57.8-128.9-128.9-128.9-50.4 0-94.9 28.8-116 72.6-39.7-12.5-81.9-19.3-125.7-19.3s-86 6.8-125.7 19.3c-21.1-43.5-65.6-72.6-116-72.6-71.1 0-128.9 57.8-128.9 128.9 0 34.3 13.6 66.6 36.9 90.3C124.8 352.7 93 440.5 93 535.5c0 110.5 43 211.1 113.1 286.1l-93.2 93.2c-0.8 0.8-0.8 2.1 0 2.8l42.8 42.8c0.8 0.8 2.1 0.8 2.8 0l95.2-95.2c71.2 55.9 161 89.3 258.3 89.3 90.3 0 174-28.7 242.5-77.5l83.3 83.3c0.8 0.8 2.1 0.8 2.8 0l42.8-42.8c0.8-0.8 0.8-2.1 0-2.8l-79.2-79.2z m-50.5-707.9c35.5 0 64.5 28.9 64.5 64.5 0 15.6-5.6 30.3-15.5 41.9-30.8-29.7-66.2-54.8-104.9-74 11.2-19.7 32.3-32.4 55.9-32.4z m-483.4 0c23.7 0 44.7 12.8 55.9 32.3-38.7 19.2-74.1 44.3-104.9 74-9.8-11.5-15.5-26.3-15.5-41.9 0-35.5 28.9-64.4 64.5-64.4zM157.5 535.5C157.5 340 316.5 181 512 181s354.5 159 354.5 354.5S707.5 890 512 890 157.5 730.9 157.5 535.5z" />
                              </svg>
                            )}
                            style={{
                              color: FormConfigSetting.RemindIconColor,
                            }}
                          />
                          设置提醒
                        </div>
                      }
                    </div>
                  }
                </div>
              </div>
            </div >
          ) : (
            ""
          )
        }
      </div>
    )
  }

  componentDidUpdate (prevProps, prevState) {
    //   if (this.wrapperCustomFormDesignPanel_box_ref) {
    //     const customFormDesignPanel_box_height = ReactDOM.findDOMNode(
    //       this.wrapperCustomFormDesignPanel_box_ref
    //     ).clientHeight;
    //     if (
    //       prevState.customFormDesignPanel_box_height !==
    //       customFormDesignPanel_box_height
    //     ) {
    //       this.setState({ customFormDesignPanel_box_height });
    //     }
    //   }
  }
}
