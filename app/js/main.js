//main.js文件中我们写入下述代码，用以把Greeter模块返回的节点插入页面

// main.js
import React from 'react';
import {render} from 'react-dom';
import Greeter from './Greeter';

import '../main.css'  //使用require导入css文件

render(<Greeter />, document.getElementById('root'));


