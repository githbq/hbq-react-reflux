var Events = function() {
    this.__listeners = {};
};

Events.prototype = {
    
    /**
     * 派发事件
     * @param {string} name 事件名
     * @param {Object=} e 发送的[事件对象$Event]
     */
    trigger: function(name, e) {
        if (!this.__listeners) {
            return false;
        }
        var _handlers = this.__listeners[name];
        if (!_handlers || !_handlers.length) {
            return false;
        }
        e = e || {};
        e.type = e.type || name;
        e.target = e.target || this;
        var args = [], handler;
        for (var i = 0, l = _handlers.length; i < l; i++) {
            handler = _handlers[i];
            args.unshift(e);
            handler.fn.apply(handler.owner, args);
        }
        return true;
    },
    
    /**
     * 绑定事件
     * 
     */
    on: function(sEventName, fListener, context) {
        context = context || this;
        this.__listeners = this.__listeners || {};
        var listeners = this.__listeners;

        if (!(this.__listeners[sEventName] instanceof Array)) {
            listeners[sEventName] = [];
        }

        listeners[sEventName].push({
            fn : fListener,
            owner : context
        });

        return this;
    },

    /**
     * 移除事件
     * 
     */
    un: function(sEventName, fListener) {
        var _ea = this.__listeners[sEventName];
        if (typeof fListener !== 'function') {
            this.__listeners[sEventName] = [];
            return this;
        }
        for (var i = 0; i < _ea.length; i++) {
            if (_ea[i].fn === fListener) {
                _ea.splice(i--, 1);
            }
        }
        return this;
    }
};

var ED = new Events;

module.exports = ED;