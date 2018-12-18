import React from 'react';
// import ReactDOM from 'react-dom';
import {Link} from  'react-router';
// const LinkItem = Link.Component;
import style from '../styles/home-page.less';

// import { Menu, Icon } from 'antd';
// const SubMenu = Menu.SubMenu;
// const MenuItem = Menu.Item;

// class Home extends React.Component {
    
//   // render() {
//   //   return (
//   //     <div>
//   //       <header>
//   //         <h1>Welcome</h1>
//   //       </header>

//   //       <main>
//   //         <Link to="/user/list">用户列表</Link>
//   //         <br />
//   //         <Link to="/user/add">添加用户</Link>
//   //       </main>
//   //     </div>
//   //   );
//   // }

//   render () {
//     return (
//       <HomeLayout title="Welcome">
//         <Link to="/user/list">用户列表</Link>
//         <br/>
//         <Link to="/user/add">添加用户</Link>
//         <br/>
//         <Link to="/book/list">图书列表</Link>
//         <br/>
//         <Link to="/book/add">添加图书</Link>
//       </HomeLayout>
//     );
//   }

// }

class Home extends React.Component {
    // 构造器
    constructor(props) {
      super(props);
      // 定义初始化状态
      this.state = {};
    }
    
  render () {
    return (
      <div className={style.Welcome}>
        Welcome
      </div>
    );
  }
}

export default Home;

