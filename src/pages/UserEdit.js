import React from 'react';
import HomeLayout from '../layouts/HomeLayout';
import UserEditor from '../components/UserEditor';
import PropTypes from 'prop-types';
import { get } from '../utils/request';


//根据路由中名为id的参数（this.context.router.params.id）来调用接口获取用户数据（保存在this.state.user中）。

class UserEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    };
  }

  componentWillMount() {
    const userId =  this.context.router.params.id;
    //   fetch('http://localhost:3000/user/' + userId)
    //     then(res => res.json())
    //     .then(res => {
    //       this.setState({
    //         user: res
    //       });
    //     }).catch(err => {
    //       console.log(err)
    //     })
    // }

    get('http://localhost:3000/user/' + userId)
      .then(res => {
        this.setState({
          user: res
        });
      })
  }
  render() {
    const { user } = this.state;
    // return (
    //   <HomeLayout title="编辑用户">
    //     {
    //       user ? <UserEditor editTarget={user} /> : '加载中...'
    //     }
    //   </HomeLayout>
    // );
    return user ? <UserEditor editTarget={user}/> : <span>加载中...</span>;
  }
}


UserEdit.contextTypes = {
  router: PropTypes.object.isRequired
};

export default UserEdit;