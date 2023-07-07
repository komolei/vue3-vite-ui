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
  }

  render() {
    return (
      <div className={`IFourRowImage`}>
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
