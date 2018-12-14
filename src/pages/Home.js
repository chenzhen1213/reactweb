import React from 'react';
// import ReactDOM from 'react-dom';
import {Link} from  'react-router';
// const LinkItem = Link.Component;
import HomeLayout from '../layouts/HomeLayout'

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
  render () {
    return (
      <div className='welcome'>
        Welcome
      </div>
    );
  }
}

export default Home;

