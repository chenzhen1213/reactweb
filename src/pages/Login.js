import React from 'react';
import HomeLayout from '../layouts/HomeLayout';
import FormItem from '../components/FormItem';
import { post } from '../utils/request';
import formProvider from '../utils/formProvider';
import PropTypes from 'prop-types';
import { Icon, Form, Input, Button, message } from 'antd';
import '../styles/login-page.less';

class Login extends React.Component {
  constructor () {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit (e) {
    e.preventDefault();

    const {formValid, form: {account, password}} = this.props;
    if (!formValid) {
      alert('请输入账号或密码');
      return;
    }

    post('http://localhost:3000/login', {
      account: account.value,
      password: password.value
    })
      .then((res) => {
        if (res) {
          window.location.hash = '/'
        } else {
          alert('登录失败，账号或密码错误');
        }
      })
  }

  render () {
    //const {form: {account, password}, onFormChange} = this.props;
    const {form} = this.props;
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

    return (
      <div className="wrapper">
        <div className= "body1">
          <header className="header1">
            ReactManager
          </header>

          <section className="form">

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

              <Button className="btn" type="primary" htmlType="submit">Sign In</Button>
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