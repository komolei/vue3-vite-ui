import * as React from "React";
import { Row, Col, Menu, Icon } from "antd";

export default class ToolBar extends React.Component<any, { current: string }> {
  constructor(props: any) {
    super(props);
    this.state = {
      current: "mobile",
    };
  }
  handleClick_ToolBar(e: any) {
    this.setState({
      current: e.key,
    });
  }
  render() {
    return (
      <Row
        type="flex"
        justify="space-around"
        align="middle"
        className="content"
      >
        <Col style={{ fontSize: "16px", paddingLeft: "21px" }} span={3}>
        </Col>
        <Col span={21}>
          <Menu
            onClick={(e) => this.handleClick_ToolBar(e)}
            selectedKeys={[this.state.current]}
            mode="horizontal"
          >
          </Menu>
        </Col>
      </Row>
    );
  }
}
