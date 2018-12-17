import React from 'react';
import { message, Table, Button, Popconfirm } from 'antd';
import { get, del } from '../utils/request';
import PropTypes from 'prop-types';

function translate(obj) {
  if (typeof (obj) === 'object') {
    return obj.value
  } else {
    return obj
  }
}

class BookList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bookList: []
    };
  }

  /**
 * 生命周期
 * componentWillMount
 * 组件初始化时只调用，以后组件更新不调用，整个生命周期只调用一次
 */
  componentWillMount() {
    get('http://localhost:3000/book')
      .then(res => {
        this.setState({
          bookList: res
        });
      });
  }

  handleEdit(book) {
    //this.context.router.push('/book/edit/' + book.id);
    window.location.hash = '/book/edit/' + book.id;
  }

  handleDel(book) {
    del('http://localhost:3000/book/' + book.id)
      .then(res => {
        this.setState({
          bookList: this.state.bookList.filter(item => item.id !== book.id)
        });
        message.success('删除图书成功');
      })
      .catch(err => {
        console.error(err);
        message.error('删除图书失败');
      });
  }

  render() {
    const { bookList } = this.state;

    // antd的Table组件使用一个columns数组来配置表格的列
    const columns = [
      {
        title: '图书ID',
        dataIndex: 'id'
      },
      {
        title: '书名',
        dataIndex: 'name'
      },
      {
        title: '价格',
        dataIndex: 'price',
        render: (text, record) => <span>&yen;{record.price}</span>
      },
      {
        title: '所有者ID',
        dataIndex: 'owner_id'
      },
      {
        title: '操作',
        render: (text, record) => (
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
        )
      }
    ];

    return (
      <Table columns={columns} dataSource={bookList} rowKey={row => row.id} />
    );
  }
}

BookList.contextTypes = {
  router: PropTypes.object.isRequired
};

export default BookList;