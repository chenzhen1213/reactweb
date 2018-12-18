import React from 'react';
import HomeLayout from '../layouts/HomeLayout';
import BookEditor from '../components/BookEditor';
import PropTypes from 'prop-types';
import { get } from '../utils/request';

//根据路由中名为id的参数（this.context.router.params.id）来调用接口获取用户数据（保存在this.state.user中）。

class BookEdit extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      book: null
    };
  }

  componentWillMount () {
    const bookId = this.context.router.params.id;
    // fetch('http://localhost:3000/book/' + bookId)
    //   .then(res => res.json())
    //   .then(res => {
    //     this.setState({
    //       book: res
    //     });
    //   });

    get('http://localhost:3000/book/' + bookId)
    .then(res => {
      this.setState({
        book: res
      });
    })
  }

  render () {
    const {book} = this.state;
    // return (
    //   <HomeLayout title="编辑图书">
    //     {
    //       book ? <BookEditor editTarget={book} /> : '加载中...'
    //     }
    //   </HomeLayout>
    // );
    return book ? <BookEditor editTarget={book}/> : <span>加载中...</span>;
  }
}

BookEdit.contextTypes = {
  router: PropTypes.object.isRequired
};

export default BookEdit;