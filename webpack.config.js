const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');  //简单的index.html模板，生成一个自动引用你打包后的JS文件的新index.html

module.exports={
  //调试，到出错了的地方，对应的你写的代码的位置.只应该开发阶段使用它
  devtool: 'eval-source-map',
  
  //__dirname”是node.js中的一个全局变量，它指向当前执行脚本所在的目录 
  entry:  __dirname + "/app/js/main.js",//已多次提及的唯一入口文件
  output:{
    path:__dirname+'/build',    //打包后的文件存放的地方
    filename:'bundle.js'       //打包后输出文件的文件名
  },
  
  //浏览器监听你的代码的修改，并自动刷新显示修改后的结果npm install --save-dev webpack-dev-server
  //需要在package.json中的scripts中添加命令，以用来开启本地服务器
  devServer:{
    contentBase:'./build',       //本地服务器所加载的页面所在的目录
    historyApiFallback: true,   //不跳转
    inline: true,               //实时刷新
    hot: true                   //热加载
  },
  //npm install --save-dev babel-core babel-loader babel-preset-es2015 babel-preset-react
  //在webpack中配置Babel的方法如下:
  module:{
    rules:[{
      test:/(\.jsx|\.js)$/, //一个用以匹配loaders所处理文件的拓展名的正则表达式（必须）
      use:{
        loader:"babel-loader",
        options:{
          presets: [
            "es2015", "react"
          ],        //npm install --save-dev babel-plugin-react-transform react-transform-hmr
          "env": {  //使用React时，可以热加载模块了  
            "development": {
            "plugins": [["react-transform", {
               "transforms": [{
                 "transform": "react-transform-hmr",
                 
                 "imports": ["react"],
                 
                 "locals": ["module"]
               }]
             }]]
            }
          }
        }
      },
      //排除node_modules 下的
      exclude:'/node_modules '
    },
    {
      test:/(\.css)$/,    //同一文件引入多个loader。二者组合在一起使你能够把样式表嵌入webpack打包后的JS文件中。
      use:[
        {loader: "style-loader"}, //style-loader将所有的计算后的样式加入页面中，
        {
          loader: "css-loader",  //css-loader使你能够使用类似@import 和 url(...)的方法实现 require()的功能
          options:{
           modules: true        //只对当前组件有效
          }
        },
        {
         loader: "postcss-loader" 
        }
      ]
    }]
  },
  plugins:[
    new webpack.BannerPlugin('RGJ版权所有，翻版必究'),   //添加版权说明插件
    //这个模板插件在使用前要先定义一个模板，即index.tmpl.html
    new HtmlWebpackPlugin({
      template: __dirname + "/app/index.tmpl.html"  //new 一个这个插件的实例，并传入相关的参数
    }),
    //热加载插件
    new webpack.HotModuleReplacementPlugin()
  ]
}


