// 动态mount和unmount组件的代码片段
var React = require('react');
var ReactDOM = require('react-dom');
module.exports = {
  // 渲染指定组件，若未指定要渲染到的容器，则创建一个空容器，并渲染到body
  mount: function(element, container) {
    if (!element || !React.isValidElement(element)) {
      return null;
    }

    var fragment = document.createElement('div');
    var inner = document.createElement('div');
    fragment.className = 'h5-component-mount-fragment';
    inner.className = 'fragment-inner react-container';
    fragment.appendChild(inner);
    (container || document.body).appendChild(fragment);

    return ReactDOM.render(element, fragment.firstChild);
  },

  // 移除指定组件，同时移除DOM、绑定的事件等
  unmount: function(component) {
    if (!component) {
      return;
    }

    var fragment = null;
    var node = ReactDOM.findDOMNode(component);

    if (node && (fragment = node.parentNode.parentNode)) {
      ReactDOM.unmountComponentAtNode(fragment);

      var container = fragment.parentNode;
      container.contains(fragment) && container.removeChild(fragment);
    }
  }
};