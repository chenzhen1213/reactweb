import React from "react";
import s from './style.less';

export default class ShoppingWebAppPage extends React.Component{
    render(){
        return(
            <iframe className={s.iframe}  src={'http://localhost:3001/#/?_k=vaydmj'}></iframe>
        )
    }
}