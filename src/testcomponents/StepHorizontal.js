import React from "react"
import { Steps } from 'antd'  // Menu 导航菜单 Icon 图标
const Step = Steps.Step

class StepHorizontal extends React.Component {
    render() {
        return (
            <Steps>
            <Step title="第一步" />
            <Step title="第二步" />
            <Step title="第三步" />
          </Steps>
        );
    }
}

export default StepHorizontal;