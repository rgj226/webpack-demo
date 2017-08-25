//我们在Greeter.js中定义一个返回包含问候信息的html元素的函数,并依据CommonJS规范导出这个函数为一个模块：

import config from "../config.json"
import React,{Component} from 'react'
import style from "../Greeter.css"
 class Greeter extends  Component{
   render(){
     return (
       <div className={style.root}>
        {config.greetText}
       </div>
     )
   }
 }

export default Greeter



