/**
 * 布局组件
 */
import React from 'react';
import ReactDOM from 'react';
import { Link } from 'react-router';
import { BackTop, Layout, Menu, Icon ,Anchor  } from 'antd';  // Menu 导航菜单 Icon 图标
import style from '../styles/home-layout.less';
const { Header, Sider, Content, Footer } = Layout;

const { Link : NewLink} = Anchor;

// 左侧菜单栏
const SubMenu = Menu.SubMenu;
const MenuItem = Menu.Item;

class SiderDemo extends React.Component {
  state = {
    collapsed: false,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  render() {
    const { children } = this.props;
    console.log(NewLink)
    return (
      <Layout style={{ height: '100vh' }}>
        <Sider
          trigger={null}
          collapsible
          collapsed={this.state.collapsed}
        >

          <div className={style.logo} onClick={() => this.toggle()} />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <SubMenu key="user" title={<span><Icon type="user" /><span>用户管理</span></span>}>
              <MenuItem key="user-list">
                <Link to="/user/list">用户列表</Link>
              </MenuItem>
              <MenuItem key="user-add">
                <Link to="/user/add">添加用户</Link>
              </MenuItem>
            </SubMenu>

            <SubMenu key="book" title={<span><Icon type="book" /><span>图书管理</span></span>}>
              <MenuItem key="book-list">
                <Link to="/book/list">图书列表</Link>
              </MenuItem>
              <MenuItem key="book-add">
                <Link to="/book/add">添加图书</Link>
              </MenuItem>
            </SubMenu>

            <SubMenu key="StepExample" title={<span><Icon type="colum-height" /><span>步骤条</span></span>}>
              <MenuItem key="StepVertical">
                <Link to="/StepVertical">竖步骤条</Link>
              </MenuItem>
              <MenuItem key="StepHorizontal">
                <Link to="/StepHorizontal">横步骤条</Link>
              </MenuItem>
            </SubMenu>

            <SubMenu key="SmallFunsExample" title={<span><Icon type="ordered-list" /><span>小功能集</span></span>}>
              <MenuItem key="AnchorPage">
                <Link to="/Anchor">Anchor锚点</Link>
              </MenuItem>
              <MenuItem key="ComplexTablePage">
                <Link to="/ComplexTable">复杂表格</Link>
              </MenuItem> 
            </SubMenu>


          </Menu>
        </Sider>

        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
            {/* <Icon
              className={style.trigger}
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            /> */}
          </Header>
          <Content style={{
            margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280,
          }}>
            {children}
          </Content>


          <Footer style={{ textAlign: 'center' }}>
            Ant Design ©2018 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    );
  }
}

//ReactDOM.render(<SiderDemo />, mountNode);

export default SiderDemo;



// class HomeLayout extends React.Component {
//   render() {
//     const { children } = this.props;
//     return (
//       <div>
//         <header className={style.header}>
//           <Link to="/">ReactManager</Link>
//         </header>

//         <main className={style.main}>
//           <div className={style.menu}>
//             <Menu mode="inline" theme="dark" style={{ width: '240px' }}>
//               <SubMenu key="user" title={<span><Icon type="user" /><span>用户管理</span></span>}>
//                 <MenuItem key="user-list">
//                   <Link to="/user/list">用户列表</Link>
//                 </MenuItem>
//                 <MenuItem key="user-add">
//                   <Link to="/user/add">添加用户</Link>
//                 </MenuItem>
//               </SubMenu>

//               <SubMenu key="book" title={<span><Icon type="book" /><span>图书管理</span></span>}>
//                 <MenuItem key="book-list">
//                   <Link to="/book/list">图书列表</Link>
//                 </MenuItem>
//                 <MenuItem key="book-add">
//                   <Link to="/book/add">添加图书</Link>
//                 </MenuItem>
//               </SubMenu>

//               <SubMenu key="StepExample" title={<span><Icon type="colum-height" /><span>步骤条</span></span>}>
//                 <MenuItem key="StepVertical">
//                   <Link to="/StepVertical">竖步骤条</Link>
//                 </MenuItem>
//                 <MenuItem key="StepHorizontal">
//                   <Link to="/StepHorizontal">横步骤条</Link>
//                 </MenuItem>
//               </SubMenu>


//             </Menu>
//           </div>

//           <div className={style.content}>
//             {children}
//           </div>
//         </main>
//       </div>
//     );
//   }

// }

// export default HomeLayout;
