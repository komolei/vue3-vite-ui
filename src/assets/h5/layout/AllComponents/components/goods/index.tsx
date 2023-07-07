import * as React from "react";
import * as ReactDom from "react";
import { Carousel } from "antd";
enum InteractiveWay {
  noInteraction,
  carousel,
}

interface IProps {
  ComponentProps: any;
  ComponentData: any;
  interactiveWay: InteractiveWay;
}

export default class ISingleImage extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props);
    // this.state={
    //   goodsList:this.props.ComponentData.GoodsList
    // }
  }
  // static getDerivedStateFromProps(props:any,state:any) {
  //   let GoodsList = props.ComponentData.GoodsList
  //   console.log(props,state)
  //   // 父组件传过来的 type 和 子组件的 type 不一样，那么子组件重新赋值。
  //   // 也可以理解成，父组件传过来的值变了。
  //   if (GoodsList !== state.goodsList) {
  //     // 这里执行相应的方法
  //     console.log(123);
  //     return {
  //       GoodsList
  //     }
  //   }else{
  //     console.log(222)
  //   }
  //   // 父组件的值没有变化，这里不做任何操作。
  //   return null
  // }
  // componentDidMount() {
    
  //   console.log('state',this.state)
  // }
  render() {
    // console.log(this.props.ComponentData.GoodsList)
    return (
      <div className={`Igoods`}>
        {this.props.ComponentData.GoodsList
          ? this.props.ComponentData.GoodsList.sort(function(a:any,b:any){return a.Sort - b.Sort}).map(
            (item: any, index: number) => {
              if (item.StatusName == '已开启') {
                return (
                  <div>
                    <img src={item.ImgUrl} key={index} />
                    <p style={{ padding:'5px', fontSize: '13px' , fontWeight:'bold'}}>{item.Name}</p>
                    <p style={{ padding:'5px', fontSize: '13px' , fontWeight:'bold'}}>￥{item.ShopPrice}</p>
                  </div>
                )
              }

            }
          )
          : null}
      </div>
    );
  }
}
