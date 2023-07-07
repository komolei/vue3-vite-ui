import * as React from "react";
// import uuid from "uuid";
interface IProps {
  cssStyle: {
    color?: string;
    width?: number;
  };
}
export default class IButton extends React.Component<any> {
  static defaultProps = {
    cssStyle: {
      color: "red",
      width: "100px",
    },
    text: "button",
  };
  constructor(props: any) {
    super(props);
  }
  render() {
    console.log("ttttttttt", this.props);
    return (
      <div
        className="i_menuItem"
        draggable
        onDragEnd={(e: any) => {
          console.log("xxxxxxxxxxxxxxxxxaaaa--", JSON.stringify(this.props));

          this.props.addComponent({
            key: 33333,
          });
        }}
      >
        cc
      </div>
    );
  }
}
