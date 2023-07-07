import * as React from 'React'
import * as ReactDOM from 'react-dom'
import { Tabs } from 'antd'
const { TabPane } = Tabs
import NewMenu from './components/menu'
export default class DesignPanel extends React.Component {
	setActiveKey(newActiveKey: string) {}
	render() {
		const activeKey = 'container'
		return (
			// <Tabs
			//   className={"tabs-container"}
			//   activeKey={activeKey}
			//   onChange={(newActiveKey: string) => this.setActiveKey(newActiveKey)}
			// >
			//   <TabPane
			//     forceRender
			//     className={"tabs-panel"}
			//     key="container"
			//   >
			<NewMenu {...this.props} />
			// </TabPane>
			// </Tabs>
		)
	}
}
