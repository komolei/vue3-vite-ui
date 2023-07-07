import React from "react";
import { Input, Button, Icon } from "antd";
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
export default class ICustomForm extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { FormConfigSetting } = this.props.ComponentData;

    return (
      <div
        className={`ICustomForm_ct`}
        style={{
          backgroundColor: `${
            FormConfigSetting && FormConfigSetting.PageBottomColor
              ? FormConfigSetting.PageBottomColor
              : ""
          }`,
        }}
      >
        <div
          className="ICustomForm_box"
          style={{
            backgroundImage: `url(${
              FormConfigSetting && FormConfigSetting.Bg
                ? FormConfigSetting.Bg
                : ""
            })`,
          }}
        >
          {FormConfigSetting && FormConfigSetting.FormConfig
            ? createFieldElement.call(
                this,
                FormConfigSetting.FormConfig,
                {},
                1,
                FormConfigSetting
              )
            : ""}

          {FormConfigSetting&&FormConfigSetting.SubmitBtnImg ? (
            <div className={`submitBtnImg_box`}>
              <img src={FormConfigSetting.SubmitBtnImg} />
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
}
