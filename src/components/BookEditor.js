/**
 * 图书编辑器组件
 */

import React from 'react';
//import FormItem from './FormItem';
import AutoComplete from './AutoComplete';
import formProvider from '../utils/formProvider';
import PropTypes from 'prop-types';
import request, { get } from '../utils/request';  // 引入 封装fetch工具类
import { Input, InputNumber, Form, Button, message } from 'antd';

const Option = AutoComplete.Option;
const FormItem = Form.Item;
// 表单布局
const formLayout = {
    // label 标签布局，同 <Col> 组件
    labelCol: {
        span: 4
    },
    wrapperCol: {
        span: 16
    }
};

class BookEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            recommendUsers: []
        };

        // 绑定this
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleOwnerIdChange = this.handleOwnerIdChange.bind(this);
    }

    // 生命周期--组件加载完毕
    componentDidMount() {
        /**
         * 在componentWillMount里使用form.setFieldsValue无法设置表单的值
         * 所以在componentDidMount里进行赋值
         */
        // see: https://github.com/ant-design/ant-design/issues/4802
        // const { editTarget, form } = this.props;
        // if (editTarget) {
        //     form.setFieldsValue(editTarget);
        // }
    }

    // 按钮提交事件
    handleSubmit(e) {
        // 阻止submit默认行为
        e.preventDefault();

        //const { form: { name, price, owner_id }, formValid, editTarget } = this.props;
        // if (!formValid) {
        //     alert('请填写正确的信息后重试');
        //     return;
        // }

        // 定义常量
        const { form, editTarget } = this.props;  // 组件传值
        // 验证
        form.validateFields((err, values) => {
            if (err) {
                message.warn(err.owner_id.errors[0].message);
                return;
            }

            // 默认值
            let editType = '添加';
            let apiUrl = 'http://localhost:3000/book';
            let method = 'post';
            // 判断类型
            if (editTarget) {
                editType = '编辑';
                apiUrl += '/' + editTarget.id;
                method = 'put';
            }
            // request(method, apiUrl, {
            //     name: name.value,
            //     price: price.value,
            //     owner_id: owner_id.value
            //   })

            // 发送请求
            request(method, apiUrl, values)

                // fetch(apiUrl, {
                //     method,
                //     body: JSON.stringify({
                //         name: name.value,
                //         price: price.value,
                //         owner_id: owner_id.value
                //     }),
                //     headers: {
                //         'Content-Type': 'application/json'
                //     }
                // })

                // 成功的回调
                .then((res) => {
                    // 当添加成功时,返回的json对象中应包含一个有效的id字段
                    // 所以可以使用res.id来判断添加是否成功
                    if (res.id) {
                        alert(editType + '书本成功');
                         // 跳转到用户列表页面
                        this.context.router.push('/book/list');
                        return;
                    } else {
                        alert(editType + '失败');
                    }
                })
                 // 失败的回调
                .catch((err) => console.error(err));
        });
    }

    //在BookEditor加载的时候检查是否存在props.editTarget，如果存在，使用props.setFormValues方法将editTarget的值设置到表单
    componentDidMount() {

        const { editTarget, form } = this.props;
        if (editTarget) {
            form.setFieldsValue(editTarget);
        }
    }

    // 获取推荐用户信息
    getRecommendUsers(partialUserId) {
        // fetch('http://localhost:3000/user?id_like=' + partialUserId)
        //     .then((res) => res.json())
        //     .then((res) => {
        //         if (res.length === 1 && res[0].id === partialUserId) {
        //             // 如果结果只有1条且id与输入的id一致，说明输入的id已经完整了，没必要再设置建议列表
        //             return;
        //         }

        //         // 设置建议列表
        //         this.setState({
        //             recommendUsers: res.map((user) => {
        //                 return {
        //                     text: `${user.id}（${user.name}）`,
        //                     value: user.id
        //                 };
        //             })
        //         });
        //     });

        // 请求数据
        get('http://localhost:3000/user?id_like=' + partialUserId)
            .then((res) => {
                if (res.length === 1 && res[0].id === partialUserId) {
                    // 如果结果只有1条且id与输入的id一致，说明输入的id已经完整了，没必要再设置建议列表
                    return;
                }

                // 设置建议列表
                this.setState({
                    recommendUsers: res.map((user) => {
                        return {
                            text: `${user.id}（${user.name}）`,
                            value: user.id
                        };
                    })
                });
            });

    }

     // 计时器
    timer = 0;
    handleOwnerIdChange(value) {
        console.log(value)
        this.props.onFormChange('owner_id', value);
        this.setState({ recommendUsers: [] });

        // 使用“节流”的方式进行请求，防止用户输入的过程中过多地发送请求
        if (this.timer) {
            // 清除计时器
            clearTimeout(this.timer);
        }

        if (value) {
            // 200毫秒内只会发送1次请求
            this.timer = setTimeout(() => {
                // 真正的请求方法
                this.getRecommendUsers(value);
                this.timer = 0;
            }, 200);
        }
    }

    render() {
         // 定义常量
        const { recommendUsers } = this.state;
        // const { form: { name, price, owner_id }, onFormChange } = this.props;
        // return (
        //     //<form onSubmit={this.handleSubmit}>
        //     <form onSubmit={(e) => this.handleSubmit(e)}>
        //         <FormItem label="书本名：" valid={name.valid} error={name.error}>
        //             <input
        //                 type="text"
        //                 value={name.value}
        //                 onChange={(e) => onFormChange('name', e.target.value)}
        //             />
        //         </FormItem>
        //         <FormItem label="价格：" valid={price.valid} error={price.error}>
        //             <input
        //                 type="number"
        //                 value={price.value || ''}
        //                 onChange={(e) => onFormChange('price', +e.target.value)}
        //             />
        //         </FormItem>
        //         <FormItem label="所有者：" valid={owner_id.valid} error={owner_id.error}>
        //             <AutoComplete
        //                 value={owner_id.value ? owner_id.value + '' : ''}
        //                 options={recommendUsers}
        //                 onValueChange={value => this.handleOwnerIdChange(value)}
        //             //  options={['10000（一韬）', '10001（张三）']}
        //             //  onValueChange={value => onFormChange('owner_id', value)}
        //             />
        //         </FormItem>
        //         <br />
        //         <input type="submit" value="提交" />
        //     </form>
        //     //</form>
        // );

        const { form } = this.props;
        const { getFieldDecorator } = form;
        return (
            <Form onSubmit={this.handleSubmit} style={{ width: '400px' }} >
                <FormItem label="书名：" {...formLayout}>
                    {getFieldDecorator('name', {
                        rules: [
                            {
                                required: true,
                                message: '请输入书名'
                            }
                        ]
                    })(<Input type="text" />)}
                </FormItem>

                <FormItem label="价格：" {...formLayout}>
                    {getFieldDecorator('price', {
                        rules: [
                            {
                                required: true,
                                message: '请输入价格',
                                type: 'number'
                            },
                            {
                                min: 1,
                                max: 99999,
                                type: 'number',
                                message: '请输入1~99999的数字'
                            }
                        ]
                    })(<InputNumber />)}
                </FormItem>

                <FormItem label="所有者：" {...formLayout} >
                    {getFieldDecorator('owner_id', {
                        rules: [
                            {
                                required: true,
                                message: '请输入所有者ID'
                            },
                            {
                                pattern: /^\d*$/,
                                message: '请输入正确的ID'
                            }
                        ]
                    })(
                        <AutoComplete
                            options={recommendUsers}
                            onChange={this.handleOwnerIdChange}
                        />
                    )}
                </FormItem>
                
                <FormItem  wrapperCol={{ span: formLayout.wrapperCol.span, offset: formLayout.labelCol.span }}>
                    <Button type="primary" htmlType="submit">提交</Button>
                </FormItem>
            </Form>
        );
    }
}


// 必须给BookEditor定义一个包含router属性的contextTypes
// 使得组件中可以通过this.context.router来使用React Router提供的方法
BookEditor.contextTypes = {
    router: PropTypes.object.isRequired
};

// BookEditor = 


BookEditor = Form.create()(formProvider({
    name: {
        defaultValue: '',
        rules: [
            {
                pattern: function (value) {
                    return value.length > 0;
                },
                error: '请输入书本名'
            },
            {
                pattern: /^.{1,10}$/,
                error: '书本名最多10个字符'
            }
        ]
    },
    price: {
        defaultValue: 0,
        rules: [
            {
                pattern: function (value) {
                    return value >= 1 && value <= 100;
                },
                error: '请输入价格'
            }
        ]
    },
    owner_id: {
        defaultValue: '',
        rules: [
            {
                pattern: function (value) {
                    return !!value;
                },
                error: '请选择书本借阅者'
            }
        ]
    }
})( BookEditor));

export default BookEditor;