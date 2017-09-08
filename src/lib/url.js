/**
 * @file Url tools
 * @author: songgl@fxiaoke.com
 * url格式化工具
 */

/**
 * @class Url
 */
 
var reUrl = /^(?:(http|ftp|https)\:)?\/\/([^\\\/?#]+)([\s\S]*)/i;
var reQueryType = /^(?:string|boolean|number)/i;
var rePort = /\:(\d+)$/;
var reFilename = /([^\/]+)$/;
var reQuerySep = /&+/;
var reQueryItemSep = /\=+/;
var queryArr;

var defOpt = {
    fragStart: '#',
    queryStart: '?',
    pathSep: '/'
};

var isEmptyObject = function(obj) {
    for(var p in obj) {
        return false;
    }
    return true;
};

var Url = function (host, options) {
    options = options || {};
    
    this.path_separ = options.path_separ || "/"; //路径的分隔符
    this.path_start = options.path_start || "/";
    this.path_end = options.path_end || "/";
    this.query_start = options.query_start || "?"; //表示查询串的开始
    this.query_end = options.query_end || ""; //表示查询串的结束
    this.query_data_separ = options.query_data_separ || "&";
    this.query_data_equal = options.query_data_equal || "=";
    this.frag_start = options.frag_start || "#";
    
    this.path = [];
    this.query = {};
    
    this.host = host || location.href || "";
    this.protocol = options.protocol || "http"; //默认为http协议
    this.port = options.port || 80;
    this.user = options.user || "";
    this.pass = options.pass || "";
    this.file = options.file || "";
    
    this.setQuery(options.query);
    (Array.isArray(options.path) ? options.path : []).forEach(this.setPath, this);
    
    this.hash = options.frag || "";
    this.hashMap = queryToJson(this.hash);
};

Url.prototype = {
    constructor : Url,
    
    /**
     * 添加参数
     *
     * @param {string} key 参数名
     * @param {string} value 参数值
     */
    setQuery : function (key, value) {
        if (!key)
            return;
        if ('object' === typeof key) {
            for (var p in key) {
                this.setQuery(p, key[p]);
            }
            return this;
        }
        this.query[key] = value;
        return this;
    },
    
    /**
     * 读取参数
     *
     * @param {string} key 参数名
     */
    getQuery : function (key) {
        if (key) {
            return this.query[key] || '';
        } else {
            return this.query;
        }
    },
    
    /**
     * 删除参数
     *
     * @param {string} key 参数名
     */
    removeQuery : function (key) {
        delete this.query[key];
    },
    
    setPath : function (value, position) {
        if (undefined === position) {
            this.path.push(value);
        } else {
            this.path[position] = value;
        }
    },
    getPath : function (position) {
        if (typeof position === 'number' && position >= 0) {
            return this.path[position];
        } else {
            return this.path;
        }
    },
    removePath : function (position, length) {
        this.path.splice(position, length);
    },
    
    /**
     * 设置端口
     *
     * @param {string|number} port 端口
     */
    setPort : function (port) {
        this.port = port;
    },
    
    /**
     * 设置域名
     *
     * @param {string} host 域名
     */
    setHost : function (host) {
        this.host = host;
    },
    
    /**
     * 设置协议
     *
     * @param {string} name 协议
     */
    setProtocol : function (name) {
        this.protocol = name;
    },
    
    setFile: function(file) {
        this.file = file;
    },
    
    /**
     * 转公为字符串
     */
    toString : function () {
        var _hasQuery = !isEmptyObject(this.query);
        var _hasPath = this.path.length > 0;
        var _account_str = "";
        if (this.user) {
            if (this.pass) {
                _account_str = this.user + ":" + this.pass + "@";
            } else {
                _account_str = this.user + "@";
            }
        }
        //      var _account = this.user + ":" + this.pass;
        var str = this.protocol
             + "://"
             + _account_str
             + this.host
             + (this.port != 80 ? ":" + this.port : "")
             + this.path_start
             + this.path.join(this.path_separ)
             + (_hasPath ? this.path_end : "")
             + this.file
             + (_hasQuery ? this.query_start : "")
             + jsonToQuery(this.query, this.query_data_separ, this.query_data_equal)
             + (_hasQuery ? this.query_end : "")
             + (this.hash ? this.frag_start + this.hash : "");
        return str;
    }
    
};
var $link;

/**
 * 解析url
 *
 * @param {string} url
 */
var parse = function (url) {
    var options = {
        protocol : 'http',
        port : 80
    };
    
    //利用DOM自动补全相对路径
    if (!$link) {
        $link = document.createElement("a");
    }
    $link.href = url;
    url = decodeURI($link.href);
    
    var mUrl = reUrl.exec(url);
    if (!mUrl) {
        //          strUrl = "http" + strUrl;
        return null;
    }
    
    //  console.log([RegExp.$1, RegExp.$2, RegExp.$3, RegExp.$4, RegExp.$5].join("\n"));
    
    //  return ;
    
    var _protocol = mUrl[1];
    var _host = mUrl[2];
    var _loc = mUrl[3];
    var _path,
    _query,
    _queryArr;
    
    options.protocol = _protocol;
    
    //分析host,得到可能的用户名,密码和端口信息
    var mHost = rePort.exec(_host);
    if (mHost) {
        options.port = parseInt(mHost[1], 10);
        _host = _host.replace(rePort, '');
    }
    
    //开始解析path
    //判断最后是否以"/"结束来区别是否是文件名
    
    var fragPos = _loc.indexOf(defOpt.fragStart);
    if (fragPos >= 0) {
        options.frag = _loc.substring(fragPos + 1);
        _loc = _loc.substring(0, fragPos);
    }
    var queryPos = _loc.indexOf(defOpt.queryStart);
    if (queryPos >= 0) {
        _path = _loc.substring(0, queryPos);
        _query = _loc.substring(queryPos);
    } else {
        _path = _loc;
    }
    
    if (_path) {
        var arrPath = _path.split(defOpt.pathSep);
        if (arrPath[0] === '') {
            arrPath.shift();
        }
        if (arrPath[arrPath.length - 1] === '') {
            arrPath.pop();
        } else {
            options.file = arrPath.pop();
        }
        options.path = arrPath;
    }
    
    //开始解析query 
    //  console.log(_query_str) 
    if (_query) {
        options.query = queryToJson(_query);
    }
    
    var oUrl = new Url(_host, options);
    
    return oUrl;
};

var jsonToQuery = function (json, sepData, sepEqual) {
    sepData = sepData || '&';
    sepEqual = sepEqual || '=';
    
    var ret = [];
    json = json || {};
    for (var p in json) {
        if (json.hasOwnProperty(p) && reQueryType.test(typeof json[p])) {
            ret.push(p + sepEqual + json[p]);
        }
    }
    return ret.join(sepData);
};

var queryToJson = function (query) {
    if (query) {
        query = query.replace(/^\?+/, "");
        queryArr = query.split(reQuerySep);
        var tmp = null,
        qobj = {};
        for (var i = 0, l = queryArr.length; i < l; i++) {
            tmp = queryArr[i].split(reQueryItemSep);
            qobj[tmp[0]] = tmp[1] || "";
        }
        
        return qobj;
    }
};

exports.parse = parse;

exports.jsonToQuery = jsonToQuery;

exports.queryToJson = queryToJson;
