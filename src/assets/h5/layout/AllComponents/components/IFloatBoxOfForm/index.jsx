import React from "react";

export default class IFloatBoxOfForm extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    // const { FormConfigSetting } = this.props.ComponentData;

    return (
      <div className={`IFloatBoxOfForm_ct`}>
        {this.props.ComponentData && this.props.ComponentData.BgImg ? (
          <img src={this.props.ComponentData.BgImg} />
        ) : null}
      </div>
    );
  }
}
