import React from 'react';
import HomeLayout from '../layouts/HomeLayout';
import PropTypes from 'prop-types';
import { get, del } from '../utils/request'

import { message, Table, Button, Popconfirm } from 'antd';
//antd的Table组件使用一个columns数组来配置表格的列，这个columns数组的元素可以包含title（列名）、dataIndex（该列数据的索引）、render（自定义的列单元格渲染方法）等字段（更多配置请参考文档）。
//然后将表格数据列表传入Table的dataSource，传入一个rowKey来指定每一列的key，就可以渲染出列表了。

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
    // 定义初始化状态
    this.state = {
      userList: []
    };
  }

  /**
  * 生命周期
  * componentWillMount
  * 组件初始化时只调用，以后组件更新不调用，整个生命周期只调用一次
  */
  componentWillMount() {
    get('http://localhost:3000/user')
      .then(res => {
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
      del('http://localhost:3000/user/' + user.id)
        .then(res => {
          /**
          * 设置状态
          * array.filter
          * 把Array的某些元素过滤掉，然后返回剩下的元素
          */
          this.setState({
            userList: this.state.userList.filter(item => item.id !== user.id)
          });
          //alert('删除用户成功');
          message.success('删除用户成功');
        })
        .catch(err => {
          console.error(err);
          //alert('删除用户失败');
          message.error('删除用户失败');
        });
    }
  }


  render() {
    const { userList } = this.state;
    // return (
    //   <HomeLayout title="用户列表">
    //     <table>
    //       <thead>
    //         <tr>
    //           <th>用户ID</th>
    //           <th>用户名</th>
    //           <th>性别</th>
    //           <th>年龄</th>
    //           <th>操作</th>
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
    //                 <td>
    //                   <a href="javascript:void(0)" onClick={() => this.handleEdit(user)}>编辑</a>
    //                   &nbsp;
    //                   <a href="javascript:void(0)" onClick={() => this.handleDel(user)}>删除</a>
    //                 </td>
    //               </tr>
    //             );
    //           })
    //         }
    //       </tbody>
    //     </table>
    //   </HomeLayout>

    //   // <div>
    //   //   <header>
    //   //     <h1>用户列表</h1>
    //   //   </header>

    //   //   <main>
    //   //     <table>
    //   //       <thead>
    //   //         <tr>
    //   //           <th>用户ID</th>
    //   //           <th>用户名</th>
    //   //           <th>性别</th>
    //   //           <th>年龄</th>
    //   //         </tr>
    //   //       </thead>

    //   //       <tbody>
    //   //         {
    //   //           userList.map((user) => {

    //   //             return (
    //   //               <tr key={user.id}>
    //   //                 <td>{translate(user.id)}</td>
    //   //                 <td>{translate(user.name)}</td>
    //   //                 <td>{translate(user.gender)}</td>
    //   //                 <td>{translate(user.age)}</td>
    //   //               </tr>
    //   //             );
    //   //           })
    //   //         }
    //   //       </tbody>
    //   //     </table>
    //   //   </main>
    //   // </div>
    // );


    // antd的Table组件使用一个columns数组来配置表格的列antd的Table组件使用一个columns数组来配置表格的列，这个columns数组的元素可以包含title（列名）、dataIndex（该列数据的索引）、render（自定义的列单元格渲染方法）等字段（更多配置请参考文档）。
    //然后将表格数据列表传入Table的dataSource，传入一个rowKey来指定每一列的key，就可以渲染出列表了。
    const columns = [
      {
        title: '用户ID',
        dataIndex: 'id'
      },
      {
        title: '用户名',
        dataIndex: 'name'
      },
      {
        title: '性别',
        dataIndex: 'gender'
      },
      {
        title: '年龄',
        dataIndex: 'age'
      },
      {
        title: '操作',
        render: (text, record) => {
          return (
            <Button.Group type="ghost">
              <Button size="small" onClick={() => this.handleEdit(record)}>编辑</Button>
              <Popconfirm
                title="确定要删除吗？"
                okText="确定"
                cancelText="取消"
                onConfirm={() => this.handleDel(record)}>
                <Button size="small">删除</Button>
              </Popconfirm>
            </Button.Group>
          );
        }
      }
    ];

    return (
      <Table columns={columns} dataSource={userList} rowKey={row => row.id} />
    );

  }
}


/**
 * 任何使用this.context.xxx的地方，必须在组件的contextTypes里定义对应的PropTypes
 */
UserList.contextTypes = {
  router: PropTypes.object.isRequired
};

export default UserList;