import React from "react";
import { getSelection } from "../../../../../common/store";
import _ from "lodash";
import withTable, {
  WithDetailTable,
} from "../../../../higherComponent/withTable";
import axios from "axios";
import {
  Form,
  Radio,
  Input,
  Upload,
  Button,
  Icon,
  message,
  Modal,
  Table,
  Tabs,
} from "antd";

import HocForm from "../../../../higherComponent/HocForm";
// export default HocForm({
//   onInitValues(values) {},
//   field: [
//     {
//       key: "FormConfig",
//       title: "图片",
//       type: "tableInput",
//       props: {
//         modalColumns: [],
//         onValueChange: function (value) {},
//         withoutRemove: true,
//         withoutModal: true,
//         columns: [
//           {
//             title: "名称",
//             key: "Name",
//             type: "text",
//             editable: true,
//           },
//         ],
//       },
//     },
//   ],
// });
let ManageTable = withTable({
  model: "buyCouponConfigList",
  url: "ApiReportForm/listData",
  higherSearch: true,
  operationWidth: 220,
  field: {},
  hiddenTableResetBtn: true,
  higherSearch: false,
  hiddenSettingBtn: true,
  hiddenCopyRowBtn: true,
  hiddenCopyColumnBtn: true,
});
export default class ICustomFormSetting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isShow: false,
      selectedRowKeys: [],
    };
  }
  componentDidMount () {
    if (this.props.ComponentData.FormId) {
      axios.get(
        `cms/ApiBuyCouponConfig/getEventByFormId?FormId=${this.props.ComponentData.FormId}`
      ).then(res => {
        console.log(res)
        this.setState({
          dataTable: [res.data.Data.BasicFormSetting]
        })
      })
    }

  }
  changeIsShow () {
    this.setState((prevState) => ({
      ...prevState,
      isShow: !prevState.isShow,
    }));
  }
  modifyFormConflg () {
    this.changeIsShow();
  }
  columns () {
    return [
      {
        title: "操作",
        key: "operation",
        dataIndex: "operation",
        width: 30,
        render: (text, record) => {
          return <a onClick={this.modifyFormConflg.bind(this, record)}>修改</a>;
        },
      },
      {
        title: "表单名称",
        dataIndex: "ActName",
        key: "ActName",
        width: 80,
      },
    ];
  }
  render () {
    return (
      <div className="ICustomFormSetting_ct">
        <div
          style={{
            marginBottom: "10px",
          }}
        >
          <span style={{ marginRight: "10px" }}>选择现金买券活动</span>
          <Button onClick={this.changeIsShow.bind(this)}>
            <Icon type="vertical-align-top" />
            选择
          </Button>
        </div>
        <Modal
          maskClosable={true}
          title="选择活动"
          visible={this.state.isShow}
          footer={<div></div>}
          onCancel={this.changeIsShow.bind(this)}
          width={800}
        >
          <ManageTable
            ref="table2"
            hideDefaultSelections={true}
            wrappedComponentRef={(instance) => {
              this.table2 = instance;
            }}
            height={"400"}
            operationWidth={100}
            enableRowSelection={true}
            searchParams={{ ConfigKey: 'buyCouponConfigList' }}
            searchBarRender={() => {
              return (
                <div style={{ display: "inline-block" }}>
                  <Button
                    style={{ marginLeft: 10 }}
                    onClick={() => {
                      let arr = this.refs.table2.state.selectedRows;
                      let errArr = []
                      // 这里请求接口，然后组装，再去更新store

                      // 只允许有一个表单,所以tableList实则是个对象，下面进行组装
                      if (arr.length > 1)
                        return message.error("只允许选择一个表单");
                      if (arr.length) {
                        let axiosArr = arr.map((item) =>
                          axios.get(
                            `cms/ApiBuyCouponConfig/getEventByFormId?FormId=${item.form_id}`
                          )
                        );
                        let newItem = arr[0];
                        this.props.componentLib.forEach(item => {
                          if (item.ComponentData.FormId == newItem.form_id) {
                            errArr.push('不可添加多个相同现金买券活动')
                          }
                        })
                        if (errArr.length) {
                          message.error(errArr[0])
                        } else {
                          Promise.all(axiosArr)
                            .then((res) => {
                              console.log('res', res)
                              this.props.updateComponent({
                                Key: this.props.ComponentKey,
                                ComponentData: {
                                  FormId: arr[0].form_id,
                                  TableList: newItem,
                                  ...res[0].data.Data,
                                  FormConfigSetting: {
                                    ...res[0].data.Data.FormConfigSetting,
                                  },
                                },
                              });
                              this.setState({
                                dataTable: [res[0].data.Data.BasicFormSetting]
                              })
                            })
                            .then(() => {
                              this.changeIsShow();
                            });
                        }
                      }
                    }}
                  >
                    添加
                  </Button>
                </div>
              );
            }}
          />
        </Modal>

        <Table
          rowKey={(v, i) => i}
          // dataSource={this.state.TableList}
          dataSource={
            // this.props.ComponentData &&
            //   this.props.ComponentData.TableList &&
            //   this.props.ComponentData.TableList.form_id
            //   ? [this.props.ComponentData.TableList]
            //   : []
            this.state.dataTable
          }
          columns={this.columns()}
          pagination={{
            pageSize: 20,
          }}
          size="small"
          scroll={{ x: 150, y: 220 }}
        />
      </div>
    );
  }
}
