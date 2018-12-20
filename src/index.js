//不是一个react组件，他是链接react与htnl模板的桥梁，所有的react组件最终都是由他进行渲染到html模板中   整个文件中引入了一个系统默认生成的组件APP,有index.js进行渲染。
import React from 'react';//import 是react的es6使用，就像我们在页面中用<script  src="react.js"> 更多的使用import来引入js以及css文件
import ReactDOM from 'react-dom'; //ReactDOM是react的方法类
import { Router, Route, hashHistory } from 'react-router';

import HomeLayout from './layouts/HomeLayout';
import HomePage from './pages/Home'; // 首页
import LoginPage from './pages/Login'; // 登录页
import UserAddPage from './pages/UserAdd'; // 添加用户页
import UserListPage from './pages/UserList'; // 用户列表页
import UserEditPage from './pages/UserEdit'; // 用户编辑页面
import BookAddPage from './pages/BookAdd'; // 添加图书页
import BookListPage from './pages/BookList'; // 图书列表页
import BookEditPage from './pages/BookEdit'; // 用户编辑页面

import StepHorizontalPage from "./testcomponents/StepHorizontal";
import StepVerticalPage from "./testcomponents/StepVertical";
import AnchorPage from './testcomponents/AnchorPage';
import ComplexTablePage from  './testcomponents/ComplexTablePage';
import ShoppingWebAppPage from "./testcomponents/ShoppingWebAppPage";

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

  //现在的HomeLayout里有一个菜单了，菜单有展开状态需要维护，如果还是像以前那样在每个page组件里单独使用HomeLayout，会导致菜单的展开状态被重置（跳转页面之后都会渲染一个新的HomeLayout），所以需要将HomeLayout放到父级路由中来使用：
  <div>
 
    <Router history={hashHistory}>
      <Route component={HomeLayout}>
        <Route path="/" component={HomePage} />
        <Route path="/user/add" component={UserAddPage} />
        <Route path="/user/list" component={UserListPage} />
        <Route path="/user/edit/:id" component={UserEditPage} />
        <Route path="/book/add" component={BookAddPage} />
        <Route path="/book/list" component={BookListPage} />
        <Route path="/book/edit/:id" component={BookEditPage} />
        <Route path="/StepVertical" component={StepVerticalPage} />
        <Route path="/StepHorizontal" component={StepHorizontalPage} />
        <Route path="/Anchor" component={AnchorPage} />
        <Route path='/ComplexTable' component={ComplexTablePage}/>
        <Route path='/ShoppingWebApp' component={ShoppingWebAppPage}/>
      </Route>
      <Route path="/login" component={LoginPage} />
    </Router>

  </div>

), document.getElementById('app'));//渲染到id是app的div中

