/**
 * 登录页
 */

import React from 'react';
import HomeLayout from '../layouts/HomeLayout';
import FormItem from '../components/FormItem';
import { post } from '../utils/request'; // 引入 封装后的fetch工具类
import formProvider from '../utils/formProvider';
import PropTypes from 'prop-types';
import { Icon, Form, Input, Button, message } from 'antd'; // 引入antd组件
import style from '../styles/login-page.less';

class Login extends React.Component {
  constructor () {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit (e) {
     // 通知 Web 浏览器不要执行与事件关联的默认动作
    e.preventDefault();

  //   const {formValid, form: {account, password}} = this.props;
  //   if (!formValid) {
  //     alert('请输入账号或密码');
  //     return;
  //   }

  //   post('http://localhost:3000/login', {
  //     account: account.value,
  //     password: password.value
  //   })
  //     .then((res) => {
  //       if (res) {
  //         window.location.hash = '/'
  //       } else {
  //         alert('登录失败，账号或密码错误');
  //       }
  //     })
  // }

   // 表单验证
  this.props.form.validateFields((err, values) => {
    if (!err) {
      // 发起请求
      post('http://localhost:3000/login', values)
      // 成功的回调
        .then((res) => {
          if (res) {
            message.info('登录成功');
             // 页面跳转
            this.context.router.push('/');
          } else {
            message.info('登录失败，账号或密码错误');
          }
        });
    }
  });
}


  render () {
    //const {form: {account, password}, onFormChange} = this.props;
    const {form} = this.props;
    // 验证规则
    const {getFieldDecorator} = form;
    // return (
    //   <HomeLayout title="请登录">
    //     <form onSubmit={this.handleSubmit}>
    //       <FormItem label="账号：" valid={account.valid} error={account.error}>
    //         <input type="text" value={account.value} onChange={e => onFormChange('account', e.target.value)}/>
    //       </FormItem>
    //       <FormItem label="密码：" valid={password.valid} error={password.error}>
    //         <input type="password" value={password.value} onChange={e => onFormChange('password', e.target.value)}/>
    //       </FormItem>
    //       <br/>
    //       <input type="submit" value="登录"/>
    //     </form>
    //   </HomeLayout>
    // );
          
    
    //这里使用了props.form.getFieldDecorator方法来包装一个Input输入框组件，传入的第一个参数表示这个字段的名称，第二个参数是一个配置对象，这里设置了表单控件的校验规则rules（更多配置项请查看文档）。使用getFieldDecorator方法包装后的组件会自动表单组件的value以及onChange事件；此外，这里还用到了Form.Item这个表单项目组件（上面的FormItem），这个组件可用于配置表单项目的标签、布局等。
    return (
      <div className={style.wrapper}>
        <div className= {style.body}>
          <header className={style.header}>
            ReactManager
          </header>


          <section className={style.form}>

            <Form onSubmit={this.handleSubmit}>
              <FormItem>
                {getFieldDecorator('account', {
                  rules: [
                    {
                      required: true,
                      message: '请输入管理员账号',
                      type: 'string'
                    }
                  ]
                })(
                  <Input type="text" addonBefore={<Icon type="user"/>}/>
                )}
              </FormItem>

              <FormItem>
                {getFieldDecorator('password', {
                  rules: [
                    {
                      required: true,
                      message: '请输入密码',
                      type: 'string'
                    }
                  ]
                })(
                  <Input type="password" addonBefore={<Icon type="lock"/>}/>
                )}
              </FormItem>

              <Button className={style.btn} type="primary" htmlType="submit">Sign In</Button>
            </Form>

          </section>

        </div>

      </div>
    );

  }
}

Login.contextTypes = {
  router: PropTypes.object.isRequired
};

Login = Form.create()(Login);


export default Login;