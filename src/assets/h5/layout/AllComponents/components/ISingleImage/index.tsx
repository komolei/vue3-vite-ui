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
  InteractiveWay: InteractiveWay;
}

export default class ISingleImage extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props);
  }

  render() {
    return (
      <div className={`ISingleImage`}>
        <Carousel prefixCls={`ant-carousel ISingleImage_carousel_ct`}
          {...this.props.ComponentProps}
          dots={this.props.ComponentData.InteractiveWay == "2"}
          autoplay={this.props.ComponentData.InteractiveWay == "2"}
          autoplaySpeed={1400}
        >
          {this.props.ComponentData && this.props.ComponentData.ImageArr
            ? this.props.ComponentData.ImageArr.map(
                (item: any, index: number) => {
                  return item.ImageSrc ? (
                    <img src={item.ImageSrc} key={index} />
                  ) : null;
                }
              )
            : null}
        </Carousel>
      </div>
    );
  }
}
