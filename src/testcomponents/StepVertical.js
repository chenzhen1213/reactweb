import React from "react"
import { Steps } from 'antd'  // Menu 导航菜单 Icon 图标
const Step = Steps.Step


class StepVertical extends React.Component {
    render() {
        return (
            <Steps direction="vertical" size="small" current={1}>
            <Step title="Finished" description="This is a description." />
            <Step title="In Progress" description="This is a description." />
            <Step title="Waiting" description="This is a description." />
          </Steps>
        );
    }
}

export default StepVertical;