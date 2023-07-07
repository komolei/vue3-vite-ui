import * as React from "react";
import { Form, Radio, Input, Upload, Button, Icon, message, Modal, Table, Tabs, Popconfirm } from "antd";
import { getSelection } from "../../../../../common/store";
import * as _ from "lodash";
import HocForm from "../../../../higherComponent/HocForm";
import withTable, { WithDetailTable } from "../../../../higherComponent/withTable"
import withForm from "../../../../higherComponent/withForm"
import axios from 'axios'
import { Common } from "../../../../../common/common.component";
import contentWithBottom from "../../../../higherComponent/contentWithBottom";
interface IProps {
  ComponentProps: any;
  prefixCls?: string;
  ComponentData: {
    videoSrc: string;
  };
}

let Position_VIPAdForm_index: any = 101;
let RedirectType_VIPAdForm_ISingleImage: any = 25;
let Position_VIPAdForm: any = {
  2: 6,
  1: 1,
  default: 6,
};
let objOfchangeMaxColSize: any = {};
let arrayFn = function MergeArray(arr1: any, arr2: any) {
  var _arr = new Array();
  if (_.isArray(arr1)) {
    for (var i = 0; i < arr1.length; i++) {
      _arr.push(arr1[i]);
    }
    for (var i = 0; i < arr2.length; i++) {
      var flag = true;
      for (var j = 0; j < arr1.length; j++) {
        if (arr2[i].ErpItemId == arr1[j].ErpItemId) {
          flag = false;
          break;
        }
      }
      if (flag) {
        _arr.push(arr2[i]);
      }
    }
    return _arr;
  }



}
let initShopSubCategoryIdF: number[] = new Array();
let initShopSubCategoryIdS: number[] = new Array();
let global_goods: any; //改变columns中this指向！！！
const typeOfFile = (fileString: any, index: any) => {
  if (fileString == undefined) return;
  fileString = fileString.toLocaleString();
  if (/\.(gif|jpg|jpeg|png)$/.test(fileString)) {
    // fileString=fileString.replace('http://managetest.ybren','http://app.ybren')
    return <img src={fileString} key={index * 10} style={{ width: '50px', height: '50px' }} />
  }
  if (/\.(mp4|rmvb|avi)$/.test(fileString)) {
    return <video key={index}> <source src={fileString} />  </video>
  }
  if (/\.(mp3)$/.test(fileString)) {
    return <audio src={fileString} key={index} controls></audio>
  }
  return fileString;
}
let CateTable = WithDetailTable({
  field: [
    {
      key: "firstLevelCateName",
      title: "一级分类",
    },
    {
      key: "secondLevelCateName",
      title: "二级分类",
    },
    {
      key: "threeLevelCateName",
      title: "三级分类",
    },
  ],
});
let ProductTable = WithDetailTable({
  // model: "shopItemLogList",
  field: [
    {
      key: "Y_BH",
      title: "工艺编号",
    },
    {
      key: "Y_CPLX",
      title: "产品类型",
    },
    {
      key: "Y_XB",
      title: "性别",
    },
    {
      key: "Y_GYSMC",
      title: "供应商名称",
    },
    {
      key: "Y_CPH",
      title: "子类/子套装编号",
    },
    {
      key: "Y_CPMC",
      title: "子类/子套装",
    },
    {
      key: "H_BH",
      title: "单品编号",
    },
    {
      key: "H_MC",
      title: "单品",
    },
    {
      key: "Y_KSH",
      title: "款式号",
    },
    {
      key: "Y_GYYSZ",
      title: "工艺设置",
    },
    {
      key: "Y_MLH",
      title: "默认面料号",
    },
    {
      key: "IsStockAdequate",
      title: "面料库存充足",
    },
    {
      key: "Y_ZZSJ",
      title: "商品价格",
    },
  ],
});
let LogTable = WithDetailTable({
  model: "shopItemLogList",
});
let ManageTableWithOutFactory = withTable({
  model: "actTemplateShopItemList",
  url: "cms/ApiEventTemplate/getActTemplateShopItemList",
  // model: "shopItemList",
  // url: "cms/ApiShopItem/getShopItemList",
  higherSearch: true,
  operationWidth: 220,
  hiddenCopyRowBtn:true,
  hiddenCopyColumnBtn:true,
  hiddenSettingBtn:true,
  // exportUrl: "cms/ApiShopItem/downShopItem",
  // exportWithFields: false,
  // onInitValues() {
  //   this.setState({
  //     CateId: "",
  //   });
  // },
  field: {
    ErpItemId: {
      search: true,
    },
    Name: {
      search: true,
    },
    ImgUrl: {
      title: "图",
      type: "text",
      key: "ImgUrl",
      width: 120,
      render(text: any) {
        return (
          <a href={text} target="_blank">
            <img
              className="table-img"
              src={text}
              style={{ maxHeight: "65px" }}
            />
          </a>
        );
      },
    },
    Ksort: {
      type: "number",
      key: "Ksort",
      editable: true,
      onChange: (v: any, i: any) => {
        axios
          .post("cms/ApiShopItem/updateShopItemKsort", {
            ItemId: v.ItemId,
            Ksort: v.Ksort,
          })
          .then((res) => {
            // console.log("ssssssssss", res);
            // this.refs.table1.refresh();
          });
      },
    },
  },
  filterParams(params: any) {
    if (params.Condition && params.Condition.length > 0) {
      let Condition = params.Condition;
      let arr: any[] = [];
      Condition.forEach((item: any) => {
        if (
          item.name !== "CateId" &&
          item.name !== "first" &&
          item.name !== "second"
        ) {
          arr.push(item);
        }
        if (item.name == "CateId") {
          params.CateId = item.value;
        }
      });
      // params.Compare='or'
      params.Condition = arr;
    }
  },
  searchBar: [
    {
      key: "first",
      title: "一级分类",
      type: "select",
      options: "kindTreeOptions",
      textField: "Name",
      valueField: "Id",
      withoutSubmit: true,
      filterParams: {
        key: "Status",
        value: "1",
      },
      onChange(v: any, vItem: any) {
        if (vItem && vItem.Child && vItem.Child.length > 0) {
          this.state.selection.secondClassification = vItem.Child.filter(
            (item: any) => item.Status == "1"
          );
          this.state.selection.thirdClassification = [];
          this.state.params.second = null;
          this.state.params.CateId = null;
        } else {
          this.state.selection.secondClassification = [];
          this.state.selection.thirdClassification = [];
          this.state.params.second = null;
          this.state.params.CateId = null;
        }
      },
    },
    {
      key: "second",
      title: "二级分类",
      type: "select",
      options: "secondClassification",
      textField: "Name",
      valueField: "Id",
      withoutSubmit: true,
      onChange(v: any, vItem: any) {
        if (vItem && vItem.Child.length > 0) {
          this.state.selection.thirdClassification = vItem.Child.filter(
            (item: any) => item.Status == "1"
          );
          this.state.params.CateId = null;
        } else {
          this.state.selection.thirdClassification = [];
          this.state.params.CateId = null;
        }
      },
    },
    {
      key: "CateId",
      title: "三级分类",
      type: "select",
      options: "thirdClassification",
      textField: "Name",
      valueField: "Id",
      onChange(v: any, vItem: any) {
        if (v) {
          this.setState({
            CateId: v,
          });
        }
      },
    },
  ],
});

class EventManage extends React.Component<any, any> {
  table2: any;
  constructor(props: any) {
    super(props);
    this.state = {
      visible: false
    };
    this.table2 = React.createRef()
  }
  componentDidMount() {
    // console.log('this',this)
    global_goods = this
  }
  showModal() {
    this.setState({ visible: true })
    this.table2.current && this.table2.current.refresh()
    console.log(this)
    
  }
  handleRemove() {
    // console.log(this)
    if (this.state.selectedRows) {
      let shopList = [...this.props.ComponentData.GoodsList]
      // console.log(this.state.selectedRows)
      this.state.selectedRows.forEach((item: any) => {
        shopList = shopList.filter((goods: any) => goods.ItemId != item.ItemId)
      });
      this.props.delComponentValue({
        Key: this.props.ComponentKey,
        ComponentData: {
          GoodsList: shopList
        },
      });
    }
  }

  columns = () => {
    return [
      {
        title: '排序',
        dataIndex: 'Sort',
        key: 'Sort',
        width: 100,
        // fixed: "left",
        render(text: any, record: any) {
          return <Input min={0} type='number' defaultValue={text?text:0} 
            onChange={(e:any) => {
              record.Sort = e.target.value
              global_goods.props.updateComponent({
                Key: global_goods.props.ComponentKey,
                ComponentData: {
                  GoodsList: global_goods.props.ComponentData
                },
              });
            }}
          />
        }
      },
      {
        title: '预设商品号',
        dataIndex: 'ErpItemId',
        width: 50,
        key: 'ErpItemId',
      },
      {
        title: '商品名称',
        dataIndex: 'Name',
        width: 100,
        key: 'Name',
      },
      {
        title: '主图',
        dataIndex: 'ImgUrl',
        width: 70,
        key: 'ImgUrl',
        render(text: any) {
          return typeOfFile(text, null)
        }
      },
      {
        title: '吊牌价',
        dataIndex: 'OriginalPrice',
        width: 50,
        key: 'OriginalPrice',
      },
      {
        title: '会员价',
        dataIndex: 'ShopPrice',
        width: 50,
        key: 'ShopPrice',
      },
      {
        title: '已开启/已下架',
        dataIndex: 'StatusName',
        width: 80,
        key: 'StatusName',
      },
      {
        title: '操作',
        dataIndex: 'operation',
        key: 'operation',
        width: 50,
        // fixed: "right",
        render(v: any, record: any) {
          return <a onClick={() => {
            let shopList = [...global_goods.props.ComponentData.GoodsList].filter((item: any) => item.ItemId != record.ItemId)
            global_goods.setState({
              shopList: shopList
            })
            global_goods.props.delComponentValue({
              Key: global_goods.props.ComponentKey,
              ComponentData: {
                GoodsList: shopList
              },
            });
          }}>删除</a>
        }
      }
    ]
  }
  render() {
    let self = this;
    let showDetail = function (data: any) {
      // console.log(this)
      if (!self.props.parent.state.showBottom) {
        self.props.parent.showBottom();
      }
      self.props.parent.refs.bottom.refresh(data.item_id);
    };
    let newColumns = this.columns()
    return (
      <div>
        选择预设商品编号：<Button style={{ margin: '10px 0' }} onClick={() => { this.showModal() }}><Icon type="vertical-align-top" />选择</Button>

        <Popconfirm
          title="是否确认删除？"
          onConfirm={() => { this.handleRemove() }}

          okText="确定"
          cancelText="取消"
        >
          <Button style={{ marginLeft: '10px' }}>批量删除</Button>
        </Popconfirm>
        <Modal
          title='预设商品'
          visible={this.state.visible}
          onOk={() => { this.setState({ visible: false }) }}
          onCancel={() => { this.setState({ visible: false }) }}
          width={1200}
          footer={null}
        >
          <ManageTableWithOutFactory
            ref={this.table2}
            afterRefresh={() => {
              if (this.props.parent.state.showBottom) {
                this.props.parent.hideBottom();
              }
            }}
            hideDefaultSelections={true}
            columnTitle=' '
            getCheckboxProps={
              (record: any) => {
                if (record.StatusName == '已下架') {
                  return { disabled: true }
                } else {
                  return null
                }
              }
            }
            operation={{
              0: {
                title: "选择",
                width: 100,
                callback: (record: any) => {
                  if (record.StatusName == '已下架') {
                    message.error('该预设商品已下架，当前不可选择')
                  } else {
                    let arr = this.props.ComponentData.GoodsList || []
                    // console.log('arr',arr)
                    if (!this.props.ComponentData.GoodsList) {
                      arr.push(record)
                      this.props.delComponentValue({
                        Key: this.props.ComponentKey,
                        ComponentData: {
                          GoodsList: arr
                        },
                      });
                      this.props.updateComponent({
                        Key: this.props.ComponentKey,
                        ComponentData: {
                          GoodsList: arr
                        },
                      });
                      // console.log('没有goodslist',this.props.ComponentData.GoodsList)
                      message.success("添加成功")
                    } else {
                      // console.log(_.isEmpty([]));
                      if (_.isEmpty(arr.filter((item: any) => item.ErpItemId == record.ErpItemId))) {
                        // console.log('有数组但不包括record')
                        if (arr.length < 20) {
                          // console.log('数组不到20',arr)
                          arr.push(record)
                          this.props.updateComponent({
                            Key: this.props.ComponentKey,
                            ComponentData: {
                              GoodsList: arr
                            },
                          });
                          message.success("添加成功")
                        } else {
                          message.error('单次不可添加超过20个预设商品')
                        }
                      } else {
                        message.error('已选择')
                      }
                    }
                  }
                },
              },
            }}
            wrappedComponentRef={(instance: any) => {
              this.table2 = instance;
            }}
            searchParams={{ Type: 1 }}
            height={this.state.tableHeight}
            // onRowClick={showDetail}
            operationWidth={100}
            enableRowSelection={true}
            searchBarRender={() => {
              return (
                <div style={{ display: "inline-block" }}>
                  <Button
                    style={{ marginLeft: 10 }}
                    onClick={() => {
                      // let arr = this.refs.table2.state.selectedRows;
                      let arr = this.table2.current.state.selectedRows.map((item:any) => {
                        delete item.Ksort
                        return {...item,Sort:0}
                      });
                      let arr1 = this.props.ComponentData.GoodsList || [];
                      let arr2 = arrayFn(arr1, arr)
                      
                      if (arr2.length > 0 && arr.length > 0) {
                        if (arr2.length < 21) {

                          this.setState({
                            shopList: arr
                          })
                          this.props.delComponentValue({
                            Key: this.props.ComponentKey,
                            ComponentData: {
                              GoodsList: arr2
                            },
                          });
                          this.props.updateComponent({
                            Key: this.props.ComponentKey,
                            ComponentData: {
                              GoodsList: arr2
                            },
                          });
                          message.success('添加成功')
                        } else {
                          message.error('单次不可添加超过20个预设商品')
                        }
                      }
                      else {
                        message.error("您当前未选择预设商品")
                      }
                    }}
                  >
                    批量添加
                  </Button>
                </div>
              );
            }}
          />
        </Modal>
        <Table
          columns={newColumns}
          dataSource={this.props.ComponentData.GoodsList}
          pagination={{
            pageSize: 20
          }}
          rowKey={(record:any) => record.ErpItemId}
          scroll={{ x: 850, y: 300 }}
          rowSelection={{
            onChange: (selectedRowKeys:any, selectedRows:any) => {
              // console.log(selectedRows);
              this.setState({ selectedRows: selectedRows })
            },

          }}
        />
       

      </div>

    )
  }
}

// export default contentWithBottom(EventManage, ManageBottom);
export default EventManage
