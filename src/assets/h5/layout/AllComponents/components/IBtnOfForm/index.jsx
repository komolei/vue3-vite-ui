import React from "react";

export default class IBtnOfForm extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { BgImg, BtnImg } = this.props.ComponentData;

    return (
      <div
        className={`IBtnOfForm_ct`}
        style={{
          backgroundImage: `url(${BgImg})`,
        }}
      >
        <div
          className="IBtnOfForm_btn"
          style={{
            backgroundImage: `url(${BtnImg})`,
          }}
        >
        </div>
      </div>
    );
  }
}
