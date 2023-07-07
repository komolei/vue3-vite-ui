import { Icon, message } from "antd";
import React from "react";
import { uuid } from "../../../../common/util";

// interface IProps {
//   WrappedComponent: any;
//   IconType: string;
//   WrappedComponentName: string;
//   WrappedComponentProps: any; // 组件props
// }

const Hoc = (
  WrappedComponent,
  IconType,
  WrappedComponentName,
  WrappedComponentAlias,
  WrappedComponentProps,
  ComponentSetting,
  ComponentData
) => {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        
      }
      
    }
    render() {
      return (
        <div
          className="i_menuItem_visualization"
          // draggable
          // onDragEnd={(e) => {
          onDoubleClick={(e) => {
            console.log("onDoubleClick is", this.props,);

            this.props.addComponent({
              Key: uuid(),
              ComponentName: WrappedComponentName,
              ComponentAlias: WrappedComponentAlias,
              Component: WrappedComponent,
              ComponentProps: WrappedComponentProps,
              ComponentSetting: ComponentSetting,
              ComponentData: ComponentData, // 之前用{}，但是为了兼容ICustomForm改成ComponentData
            });
          }}
        >
          <div className="i_menuItem_wrappedComponent">
            <WrappedComponent
              props={WrappedComponentProps}
              ComponentData={ComponentData}
            />
          </div>
          <p>{WrappedComponentAlias}</p>
        </div>
      );
    }
  };
};

export default Hoc;
