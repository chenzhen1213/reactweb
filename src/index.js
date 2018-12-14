//不是一个react组件，他是链接react与htnl模板的桥梁，所有的react组件最终都是由他进行渲染到html模板中   整个文件中引入了一个系统默认生成的组件APP,有index.js进行渲染。
import React from 'react';//import 是react的es6使用，就像我们在页面中用<script  src="react.js"> 更多的使用import来引入js以及css文件
import ReactDOM from 'react-dom'; //ReactDOM是react的方法类
import { Router, Route, hashHistory } from 'react-router';
import HomePage from './pages/Home';
import UserAddPage from './pages/UserAdd';
import UserListPage from './pages/UserList';
import UserEditPage from './pages/UserEdit';
import BookAddPage from './pages/BookAdd';
import BookListPage from './pages/BookList';
import BookEditPage from './pages/BookEdit';
import LoginPage from './pages/Login';
import HomeLayout from './layouts/HomeLayout'
import 'antd/dist/antd.css'
// import {Router} from 'react-dom';
// import {hashHistory} from 'react-router-dom';

// ReactDOM.render((
//     <Router history={hashHistory}>
//       <Route path="/" component={HomePage}/>
//       <Route path="/user/add" component={UserAddPage}/>
//       <Route path="/user/list" component={UserListPage}/>
//     </Router>
//   ), document.getElementById('app'));
ReactDOM.render((
  // <HashRouter  >
  //   <div>
  //     <Route path="/" component={HomePage} />
  //     <Route path="/user/add" component={UserAddPage} />
  //     <Route path="/user/list" component={UserListPage} />
  //     <Route path="/user/edit/:id" component={UserEditPage} />
  //     <Route path='/book/add' component={BookAddPage} />
  //     <Route path='/book/list' component={BookListPage} />
  //     <Route path='/book/edit/:id' component={BookEditPage} />
  //     <Route path='/login' component={LoginPage} />
  //   </div>
  // </HashRouter >
  <Router history={hashHistory}>
  <Route component={HomeLayout}>
    <Route path="/" component={HomePage}/>
    <Route path="/user/add" component={UserAddPage}/>
    <Route path="/user/list" component={UserListPage}/>
    <Route path="/user/edit/:id" component={UserEditPage}/>
    <Route path="/book/add" component={BookAddPage}/>
    <Route path="/book/list" component={BookListPage}/>
    <Route path="/book/edit/:id" component={BookEditPage}/>
  </Route>
  <Route path="/login" component={LoginPage}/>
</Router>
), document.getElementById('app'));//渲染到id是app的div中