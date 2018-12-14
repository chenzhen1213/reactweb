import React from 'react';
import HomeLayout from '../layouts/HomeLayout';
import PropTypes from 'prop-types';
import { get, del } from '../utils/request'

function translate(obj) {
  if (typeof (obj) === 'object') {
    return obj.value
  } else {
    return obj
  }
}

class UserList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userList: []
    };
  }

  componentWillMount() {
    get('http://localhost:3000/user').then(res => {
      if (!res) return 
      this.setState({
        userList: res
      });
    })
  }

  //在handleEdit方法中只需要使用router.push方法跳转到该用户的编辑页面，别忘了加上contextTypes。
  handleEdit(user) {
    window.location.hash = '/user/edit/' + user.id;
  }

  handleDel(user) {
    const confirmed = window.confirm(`确定要删除用户 ${user.name} 吗？`);

    if (confirmed) {
      del('http://localhost:3000/user/' + user.id).then(res => {
        this.setState({
          userList: this.state.userList.filter(item => item.id !== user.id)
        });
        alert('删除用户成功');
      }).catch(err => {
        console.error(err);
        alert('删除用户失败');
      })
    }
}


  render() {
    const { userList } = this.state;
    return (
      <HomeLayout title="用户列表">
        <table>
          <thead>
            <tr>
              <th>用户ID</th>
              <th>用户名</th>
              <th>性别</th>
              <th>年龄</th>
              <th>操作</th>
            </tr>
          </thead>

          <tbody>
            {
              userList.map((user) => {

                return (
                  <tr key={user.id}>
                    <td>{translate(user.id)}</td>
                    <td>{translate(user.name)}</td>
                    <td>{translate(user.gender)}</td>
                    <td>{translate(user.age)}</td>
                    <td>
                      <a href="javascript:void(0)" onClick={() => this.handleEdit(user)}>编辑</a>
                      &nbsp;
                      <a href="javascript:void(0)" onClick={() => this.handleDel(user)}>删除</a>
                    </td>
                  </tr>
                );
              })
            }
          </tbody>
        </table>
      </HomeLayout>

      // <div>
      //   <header>
      //     <h1>用户列表</h1>
      //   </header>

      //   <main>
      //     <table>
      //       <thead>
      //         <tr>
      //           <th>用户ID</th>
      //           <th>用户名</th>
      //           <th>性别</th>
      //           <th>年龄</th>
      //         </tr>
      //       </thead>

      //       <tbody>
      //         {
      //           userList.map((user) => {

      //             return (
      //               <tr key={user.id}>
      //                 <td>{translate(user.id)}</td>
      //                 <td>{translate(user.name)}</td>
      //                 <td>{translate(user.gender)}</td>
      //                 <td>{translate(user.age)}</td>
      //               </tr>
      //             );
      //           })
      //         }
      //       </tbody>
      //     </table>
      //   </main>
      // </div>
    );
  }
}

UserList.contextTypes = {
  router: PropTypes.object.isRequired
};

export default UserList;