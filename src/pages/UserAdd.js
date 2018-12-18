//Tips: 关于文件的命名，我采用这样的方式：[模块][功能].xxx，上面是一个添加用户的页面，所以模块是User，功能是Add，良好的命名风格可以让你的项目、代码更容易维护（这里由于是React的一个组件，所以使用大写开头的大驼峰命名法）
import React from 'react';
import PropTypes from 'prop-types';
import FormItem from "../components/FormItem";
import formProvider from "../utils/formProvider";
import HomeLayout from '../layouts/HomeLayout'
import UserEdit from '../components/UserEditor';
import UserEditor from   '../components/UserEditor';

class UserAdd extends React.Component {
  // constructor() {
  //   super();
  //   console.log(React)
  //   this.state = {
  //     form: {
  //       name: {
  //         valid: false,
  //         value: '',
  //         error: ''
  //       },
  //       age: {
  //         valid: false,
  //         value: 0,
  //         error: ''
  //       },
  //       gender: {
  //         valid: false,
  //         value: '',
  //         error: ''
  //       }
  //     }
  //   };
  // }

  // handleValueChange(field, value, type = 'string') {
  //   //console.log(field)
  //   // 由于表单的值都是字符串，我们可以根据传入type为number来手动转换value的类型为number类型
  //   if (type === 'number') {
  //     value = +value;
  //   }

  //   const { form } = this.state;

  //   const newFieldObj = { value, valid: true, error: '' };

  //   switch (field) {
  //     case 'name': {
  //       if (value.length >= 5) {
  //         newFieldObj.error = '用户名最多4个字符';
  //         newFieldObj.valid = false;
  //       } else if (value.length === 0) {
  //         newFieldObj.error = '请输入用户名';
  //         newFieldObj.valid = false;
  //       }
  //       break;
  //     }
  //     case 'age': {
  //       if (value > 100 || value <= 0) {
  //         newFieldObj.error = '请输入1~100之间的数字';
  //         newFieldObj.valid = false;
  //       }
  //       break;
  //     }
  //     case 'gender': {
  //       if (!value) {
  //         newFieldObj.error = '请选择性别';
  //         newFieldObj.valid = false;
  //       }
  //       break;
  //     }
  //     default: { }
  //   }

  //   this.setState({
  //     form: {
  //       ...form,
  //       [field]: newFieldObj
  //     }
  //   });
  // }

  // handleSubmit(e) {
  //   // 阻止表单submit事件自动跳转页面的动作
  //   e.preventDefault();

  //   const { form: { name, age, gender } } = this.props;
  //   if (!name.valid || !age.valid || !gender.valid) {
  //     alert('请填写正确的信息后重试');
  //     return;
  //   }

  //   fetch('http://localhost:3000/user',
  //     {
  //       method: 'post',
  //       // 使用fetch提交的json数据需要使用JSON.stringify转换为字符串
  //       body: JSON.stringify(
  //         {
  //           name,
  //           age,
  //           gender
  //         }),

  //       headers: {
  //         'Content-Type': 'application/json'
  //       }
  //     })

  //     .then((res) => res.json())
  //     .then((res) => {
  //       // 当添加成功时，返回的json对象中应包含一个有效的id字段
  //       // 所以可以使用res.id来判断添加是否成功
  //       if (res.id) {
  //         alert('添加用户成功');
  //         this.context.router.push('/user/list');
  //         // this.setState({
  //         //   name: '',
  //         //   age: 0,
  //         //   gender: ''
  //         // });
  //         return;
  //       }
  //       else {
  //         alert('添加失败');
  //       }
  //     })


  //     .catch((err) => console.error(err));

  // }


  render() {
    //const { form: { name, age, gender }, onFormChange } = this.props;
    //console.log(this.props)
    return (
      // <HomeLayout title="添加用户">
      //   <form onSubmit={(e) => this.handleSubmit(e)}>
      //     <FormItem label="用户名：" valid={name.valid} error={name.error}>
      //       <input
      //         type="text"
      //         value={name.value}
      //         onChange={(e) => onFormChange('name', e.target.value)}
      //       />
      //     </FormItem>
      //     <FormItem label="年龄：" valid={age.valid} error={age.error}>
      //       <input
      //         type="number"
      //         value={age.value || ''}
      //         onChange={(e) => onFormChange('age', +e.target.value)}
      //       />
      //     </FormItem>
      //     <FormItem label="性别：" valid={gender.valid} error={gender.error}>
      //       <select
      //         value={gender.value}
      //         onChange={(e) => onFormChange('gender', e.target.value)}
      //       >
      //         <option value="">请选择</option>
      //         <option value="male">男</option>
      //         <option value="female">女</option>
      //       </select>
      //     </FormItem>
      //     <br />
      //     <input type="submit" value="提交" />
      //   </form>
        
      // </HomeLayout>
      <UserEditor/>
      // <div>
      //   <header>
      //     <h1> 添加用户 </h1>
      //   </header>

      //   <main>
      //     <form onSubmit={(e) => this.handleSubmit(e)}>
      //       <FormItem label = "用户名：" valid={name.valid} error ={name.error}>
      //       <input
      //         type="text"
      //         value={name.value}
      //         onChange={(e) => onFormChange('name', e.target.value)}
      //       />
      //       </FormItem>
      //       <FormItem label="年龄：" valid={age.valid} error={age.error}>
      //         <input
      //           type="number"
      //           value={age.value || ''}
      //           onChange={(e) => onFormChange('age', +e.target.value)}
      //         />
      //       </FormItem>
      //       <FormItem label="性别：" valid={gender.valid} error={gender.error}>
      //         <select
      //           value={gender.value}
      //           onChange={(e) => onFormChange('gender', e.target.value)}
      //         >
      //           <option value="">请选择</option>
      //           <option value="male">男</option>
      //           <option value="female">女</option>
      //         </select>
      //       </FormItem>
      //       <br />
      //       <input type="submit" value="提交" />
      //     </form>
      //   </main>

      // </div>
    );
  }
}


// 必须给UserAdd定义一个包含router属性的contextTypes
// 使得组件中可以通过this.context.router来使用React Router提供的方法
// UserAdd.contextTypes = {
//   router: PropTypes.object.isRequired
// };



// UserAdd = formProvider({
//   name: {
//     defaultValue: '',
//     rules: [
//       {
//         pattern: function (value) {
//           return value.length > 0;
//         },
//         error: '请输入用户名'
//       },
//       {
//         pattern: /^.{1,4}$/,
//         error: '用户名最多4个字符'
//       }
//     ]
//   },
//   age: {
//     defaultValue: 0,
//     rules: [
//       {
//         pattern: function (value) {
//           return value >= 1 && value <= 100;
//         },
//         error: '请输入1~100的年龄'
//       }
//     ]
//   },
//   gender: {
//     defaultValue: '',
//     rules: [
//       {
//         pattern: function (value) {
//           return !!value;
//         },
//         error: '请选择性别'
//       }
//     ]
//   }
// })(UserAdd);


export default UserAdd;