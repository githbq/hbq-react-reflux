## 框架介绍
客服云项目整体技术解决方案为`gulp` + `webpack` + `react` + `react-route`r + `reflux` + `antd`       

* `gulp`：辅助`webpack`做一些构建上的事
* `webpack`：实现了文件的模块化，如`js`、`less`、`css`、`json`、`html`等；我们开发一个react组件时，所用到less
等文件要在js文件中正确的`import`，走`webpack`的打包机制；前端开发要遵循`commonJS`或`es6`模块规范，模块引用建议用`es6`的`import`
* `react`：主要职责为`UI`组件，理想情况下期望`react`只做界面相关的事，数据处理及跟后端的通讯由`reflux`负责
* `react-router`：路由逻辑在项目`app.js`里集中实现，其他如充分理由，不允许出现路由逻辑，这块后构建紧密相关，后期可能根据需要，做异步路由
* `reflux`：`react`是`view`层的一个很好实现，`reflux`类似于`model`和`action` 的实现，数所处理逻辑在这块实现
* `antd`：一个开源的`react` `ui`组件库

## 目录介绍

* `gulp`：构建使用的代码，这块不做介绍，有兴趣自己去看
* `src`: 源码目录
    * `components`：`antd`组件
    * `lib`：通用`utils`组件库
        * `ajax`：`ajax`封装，基本从`H5`项目沿用过来，包括异步接口耗时统计实现
        * `cookie`：`cookie`封装，      
        ```javascript
        import Cookie from 'lib/cookie';
        Cookie.set('name', 'song');
        console.log(Cookie.get('name'));
        ```
        *  `events`：事件中心，为单例模式，模块间相互通讯都应该基于该模块，`事件名`要求全部小写，格式为`模块名 + : + 事件名`
        ```javascript
        import events from 'lib/events';
        events.on('mod:load', function(e) {
            console.log(e);
        });
        events.trigger('mod:load', {name: 'song'});
        ```
        *  `url`：url解析工具，可用`toString`方法做相反处理，`API`请打印其实例查看
        ```javascript
        import Url from 'lib/url';
        console.log(Url.parse(location.href));
        ```
    * `module`：存放每个页面上用到的子模块
    * `app.js`：入口文件
* `proxy.json`：代理配置文件，为方便本地开发做异步接口调试，在`browser-sync`的基础上做了一层代理封装

## 本地开发
`clone` `git` 仓库代码，根目录下运行`npm i`安装依赖包，本地开发直接运行`gulp`命令，运行`gulp build`正式发布

##相关技术文档

* [https://react-guide.github.io/react-router-cn/](https://react-guide.github.io/react-router-cn/)
* [https://segmentfault.com/a/1190000002793786](https://segmentfault.com/a/1190000002793786)
* [http://ant.design/docs/react/introduce](http://ant.design/docs/react/introduce)
* [http://webpack.github.io/docs/configuration.html](http://webpack.github.io/docs/configuration.html)