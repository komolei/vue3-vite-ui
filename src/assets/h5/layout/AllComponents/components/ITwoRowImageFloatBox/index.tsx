import * as React from "react";
import * as ReactDom from "react";
interface IProps {
  ComponentProps: any;
  ComponentData: any;
}

export default class ITwoRowImageFloatBox extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props);
  }

  render() {
    return (
      <div className={`ITwoRowImageFloatBox`}>
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
