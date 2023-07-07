import * as React from "react";
import { message } from "antd";
interface IProps {
  ComponentProps?: any;
  ComponentData: {
    VideoSrc: string;
    VideoCoverImageSrc: string;
  };
}

export default class IVideo extends React.Component<IProps, any> {
  static defaultProps = {
    ComponentData: {
      VideoCoverImageSrc: "",
      // "https://appybrencdn.oss-cn-hangzhou.aliyuncs.com/Wx/sendBlessing/images/%E8%A7%86%E9%A2%91%E6%8C%89%E9%92%AE.png",
      VideoSrc: "",
    },
  };
  constructor(props: IProps) {
    super(props);
    this.state = {
      isShow: false,
      IVideoCtStyle: {},
    };
  }
  private refVideo = React.createRef<HTMLVideoElement>();
  playVideo() {
    if (!this.refVideo.current) return;
    this.setState({
      isShow: !this.state.isShow,
    });
    this.refVideo.current.play();
  }
  pauseVideo() {
    if (!this.refVideo.current) return;
    this.setState({
      isShow: !this.state.isShow,
    });
    this.refVideo.current.pause();
  }
  onLoad() {
    const newImage = new Image();
    newImage.src = this.props.ComponentData.VideoCoverImageSrc;
    newImage.onload = () => {
      // this.IVideoCtStyle = Object.assign({}, this.IVideoCtStyle, {
      //   // width: newImage.width + 'px',
      //   height: Number((newImage.height / 2).toFixed(2)) + 'px'
      // })
      this.setState({
        IVideoCtStyle: Object.assign({}, this.state.IVideoCtStyle, {
          height: Number((newImage.height / 2).toFixed(2)) + "px",
        }),
      });
    };
  }
  render() {
    return (
      <div className={`IVideo`}
      style={this.state.IVideoCtStyle}
      >
        {this.props.ComponentData &&
        this.props.ComponentData.VideoCoverImageSrc ? (
          <img
            style={this.state.IVideoCtStyle}
            className={!this.state.isShow ? "" : "none"}
            src={this.props.ComponentData.VideoCoverImageSrc}
            onClick={() => this.playVideo()}
            onLoad={() => this.onLoad()}
          />
        ) : null}
        {this.props.ComponentData && this.props.ComponentData.VideoSrc ? (
          <video
            style={this.state.IVideoCtStyle}
            className={this.state.isShow ? "upZindex" : "hidden"}
            ref={this.refVideo}
            src={this.props.ComponentData.VideoSrc}
            controls={true}
            onClick={() => this.pauseVideo()}
          />
        ) : null}
      </div>
    );
  }
}
