import * as React from "react";

interface IProps {
  ComponentProps?: any;
  ComponentData: {
    BeforeAddReceiveNoticeImage: string;
  };
}

export default class ICouponOnce extends React.Component<IProps, any> {
  static defaultProps = {
    ComponentData: {
      BeforeAddReceiveNoticeImage:
        "https://appybrencdn.oss-cn-hangzhou.aliyuncs.com/Wx/sendBlessing/images/%E8%A7%86%E9%A2%91%E6%8C%89%E9%92%AE.png",
    },
  };
  constructor(props: IProps) {
    super(props);
  }
  render() {
    return (
      <div className={`ICoupon`}>
        {this.props.ComponentData &&
        this.props.ComponentData.BeforeAddReceiveNoticeImage ? (
          <img src={this.props.ComponentData.BeforeAddReceiveNoticeImage} />
        ) : null}
      </div>
    );
  }
}
