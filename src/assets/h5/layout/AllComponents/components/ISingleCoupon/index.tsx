import * as React from "react";

interface IProps {
  componentProps?: any;
  ComponentData: {
    CouponArr: any;
    // CouponArr: [
    //   {
    //     BeforeAddReceiveNoticeImage: any;
    //   }
    // ];
  };
}

export default class ISingleCoupon extends React.Component<IProps, any> {
  static defaultProps = {
    url: "",
    ComponentData: {
      CouponArr: [
        {
          BeforeAddReceiveNoticeImage:
            "https://appybrencdn.oss-cn-hangzhou.aliyuncs.com/Wx/sendBlessing/images/%E8%A7%86%E9%A2%91%E6%8C%89%E9%92%AE.png",
        },
        {
          BeforeAddReceiveNoticeImage:
            "https://appybrencdn.oss-cn-hangzhou.aliyuncs.com/Wx/sendBlessing/images/%E8%A7%86%E9%A2%91%E6%8C%89%E9%92%AE.png",
        },
      ],
    },
  };
  constructor(props: IProps) {
    super(props);
  }

  render() {
    return (
      <div className={`ISingleCoupon`}>
        {this.props.ComponentData && this.props.ComponentData.CouponArr
          ? this.props.ComponentData.CouponArr.map(
              (item: any, index: number) => {
                return item && item.BeforeAddReceiveNoticeImage ? (
                  <img
                    src={item.BeforeAddReceiveNoticeImage}
                    key={index}
                    width={`${
                      100 / this.props.ComponentData.CouponArr.length
                    }%`}
                  />
                ) : null;
              }
            )
          : null}
      </div>
    );
  }
}
