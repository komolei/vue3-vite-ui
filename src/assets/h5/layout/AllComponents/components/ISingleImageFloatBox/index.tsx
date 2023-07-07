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
}

export default class ISingleImageFloatBox extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props);
  }
  // position: fixed;
  // left: 0;
  // right: 0;
  // bottom: -1px;
  // z-index: 999;
  render() {
    return (
      <div className={`ISingleImageFloatBox`}>
  
        {this.props.ComponentData && this.props.ComponentData.ImageArr
            ? this.props.ComponentData.ImageArr.map(
                (item: any, index: number) => {
                  return <img src={item.ImageSrc} key={index} />;
                }
              )
            : null}
      </div>
    );
  }
}
