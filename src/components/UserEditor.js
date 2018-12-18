/**
 * 用户编辑器组件
 */

import React from 'react';
//import FormItem from './FormItem';
import formProvider from '../utils/formProvider';
import PropTypes from 'prop-types';
import request, { get } from '../utils/request'; // 引入 封装fetch工具类
import { Form, Input, InputNumber, Select, Button, message } from 'antd';

const FormItem = Form.Item;

const formLayout = {
    labelCol: {
        span: 4
    },
    wrapperCol: {
        span: 16
    }
};

class UserEditor extends React.Component {
    // 生命周期--组件加载完毕
    componentDidMount() {
        // 在componentWillMount里使用form.setFieldsValue无法设置表单的值
        // 所以在componentDidMount里进行赋值
        // see: https://github.com/ant-design/ant-design/issues/4802
        const { editTarget, form } = this.props;
        if (editTarget) {
            // 将editTarget的值设置到表单
            form.setFieldsValue(editTarget);
        }
    }

    // 按钮提交事件
    handleSubmit(e) {
        // 阻止表单submit事件自动跳转页面的动作
        e.preventDefault();

        // 定义常量
        const { form, editTarget } = this.props;  // 组件传值

        // 验证
        form.validateFields((err, values) => {
            if (!err) {
                // 默认值
                let editType = '添加';
                let apiUrl = 'http://localhost:3000/user';
                let method = 'post';
                //判断类型
                if (editTarget) {
                    editType = '编辑';
                    apiUrl += '/' + editTarget.id;
                    method = 'put';
                }

                //发送请求
                request(method, apiUrl, values)
                    // 成功的回调
                    .then((res) => {
                        // 当添加成功时,返回的json对象中应包含一个有效的id字段
                        // 所以可以使用res.id来判断添加是否成功
                        if (res.id) {
                            message.success(editType + '用户成功');
                            // 跳转到用户列表页面
                            this.context.router.push('/user/list');
                        } else {
                            message.error(editType + '失败');
                        }
                    })
                    // 失败的回调
                    .catch((err) => console.error(err));

            } else {
                message.warn(err);
            }
        });

        // const { form: { name, age, gender }, formValid, editTarget } = this.props;
        // if (!formValid) {
        //     alert('请填写正确的信息后重试');
        //     return;
        // }

        // let editType = '添加';
        // let apiUrl = 'http://localhost:3000/user';
        // let method = 'post';
        // if (editTarget) {
        //     editType = '编辑';
        //     apiUrl += '/' + editTarget.id;
        //     method = 'put';
        // }


        // request(method, apiUrl, {
        //     name: name.value,
        //     age: age.value,
        //     gender: gender.value
        // })

        //     // fetch(apiUrl, {
        //     //     method,
        //     //     body: JSON.stringify({
        //     //         name: name.value,
        //     //         age: age.value,
        //     //         gender: gender.value
        //     //     }),
        //     //     headers: {
        //     //         'Content-Type': 'application/json'
        //     //     }
        //     // })
        //     .then((res) => res.json())
        //     .then((res) => {
        //         if (res.id) {
        //             alert(editType + '用户成功');
        //             this.context.router.push('/user/list');
        //             return;
        //         } else {
        //             alert(editType + '失败');
        //         }
        //     })
        //     .catch((err) => console.error(err));
    }

    //在UserEditor加载的时候检查是否存在props.editTarget，如果存在，使用props.setFormValues方法将editTarget的值设置到表单
    componentWillMount() {
        // const { editTarget, setFormValues } = this.props;
        // console.log(this.props)
        // if (editTarget) {
        //     setFormValues(editTarget);
        // }
    }

    render() {
        // const { form: { name, age, gender }, onFormChange } = this.props;
        // console.log(this.props)
        // return (
        //     <form onSubmit={(e) => this.handleSubmit(e)}>
        //         <FormItem label="用户名：" valid={name.valid} error={name.error}>
        //             <input
        //                 type="text"
        //                 value={name.value}
        //                 onChange={(e) => onFormChange('name', e.target.value)}
        //             />
        //         </FormItem>
        //         <FormItem label="年龄：" valid={age.valid} error={age.error}>
        //             <input
        //                 type="number"
        //                 value={age.value || ''}
        //                 onChange={(e) => onFormChange('age', +e.target.value)}
        //             />
        //         </FormItem>
        //         <FormItem label="性别：" valid={gender.valid} error={gender.error}>
        //             <select
        //                 value={gender.value}
        //                 onChange={(e) => onFormChange('gender', e.target.value)}
        //             >
        //                 <option value="">请选择</option>
        //                 <option value="male">男</option>
        //                 <option value="female">女</option>
        //             </select>
        //         </FormItem>
        //         <br />
        //         <input type="submit" value="提交" />
        //     </form>
        // );

         // 定义常量
        const { form } = this.props;
        const { getFieldDecorator } = form;
        return (
            <div style={{ width: '400px' }}>
                <Form onSubmit={(e) => this.handleSubmit(e)}>
                    <FormItem label="用户名：" {...formLayout}>
                        {getFieldDecorator('name', {
                            rules: [
                                {
                                    required: true,
                                    message: '请输入用户名'
                                },
                                {
                                    pattern: /^.{1,4}$/,
                                    message: '用户名最多4个字符'
                                }
                            ]
                        })(
                            <Input type="text" />
                        )}
                    </FormItem>
                    <FormItem label="年龄：" {...formLayout}>
                        {getFieldDecorator('age', {
                            rules: [
                                {
                                    required: true,
                                    message: '请输入年龄',
                                    type: 'number'
                                },
                                {
                                    min: 1,
                                    max: 100,
                                    message: '请输入1~100的年龄',
                                    type: 'number'
                                }
                            ]
                        })(
                            <InputNumber />
                        )}
                    </FormItem>
                    <FormItem label="性别：" {...formLayout}>
                        {getFieldDecorator('gender', {
                            rules: [
                                {
                                    required: true,
                                    message: '请选择性别'
                                }
                            ]
                        })(
                            <Select placeholder="请选择">
                                <Select.Option value="male">男</Select.Option>
                                <Select.Option value="female">女</Select.Option>
                            </Select>
                        )}
                    </FormItem>
                    <FormItem wrapperCol={{ ...formLayout.wrapperCol, offset: formLayout.labelCol.span }}>
                        <Button type="primary" htmlType="submit">提交</Button>
                    </FormItem>
                </Form>
            </div>
        );
    }
}

// 必须给UserEditor定义一个包含router属性的contextTypes
// 使得组件中可以通过this.context.router来使用React Router提供的方法
UserEditor.contextTypes = {
    router: PropTypes.object.isRequired
};

// UserEditor = formProvider({
//     name: {
//         defaultValue: '',
//         rules: [
//             {
//                 pattern: function (value) {
//                     return value.length > 0;
//                 },
//                 error: '请输入用户名'
//             },
//             {
//                 pattern: /^.{1,4}$/,
//                 error: '用户名最多4个字符'
//             }
//         ]
//     },
//     age: {
//         defaultValue: 0,
//         rules: [
//             {
//                 pattern: function (value) {
//                     return value >= 1 && value <= 100;
//                 },
//                 error: '请输入1~100的年龄'
//             }
//         ]
//     },
//     gender: {
//         defaultValue: '',
//         rules: [
//             {
//                 pattern: function (value) {
//                     return !!value;
//                 },
//                 error: '请选择性别'
//             }
//         ]
//     }
// })(UserEditor);

/**
 * 使用Form.create({ ... })(UserEditor)处理之后的UserEditor组件会接收到一个props.form
 * 使用props.form下的一系列方法，可以很方便地创造表单
 */
UserEditor = Form.create()(UserEditor);

export default UserEditor;