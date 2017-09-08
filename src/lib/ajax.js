// 封装api ajax，统计接口耗时、捕捉接口错误等
import Url from 'lib/url';
import Cookie from 'lib/cookie';
import collector from 'lib/collector';
import $ from 'jQuery';

var token = Cookie.get('fs_token');
var Ajax = {
    fetch: function(url, options) {
        if (!url) return false;

        url = Url.parse(url);

        if (token) { // url后追加token参数
            url.setQuery('_fs_token', token);
        }
        
        options = $.extend({
            cache: false,
            type: 'get',
            dataType: 'json'
        }, options, {
            url: url.toString()
        });

        var  _startTime = new Date().getTime();
        var success = options.success;
        var error = options.error;
        var complete = options.complete;

        options.success = function(response, status, xhr) {
          success && success(response, status, xhr);
        };

        options.error = function(xhr, type, e) {
            var status = xhr.status;
            if ([400, 403, 404, 500, 502, 503].indexOf(status) >= 0) {
              // 采集接口错误
              collector.log('apierror', {
                msg: `${options.url}: ${options.data || '{}'} - ${options.type} - ${status} - ${e || ''}`
              });
            }
            error && error(xhr, type, e);
        };

        options.complete = function(xhr, status) {
            complete && complete(xhr, status);

            // 采集接口耗时
            var time = new Date().getTime() - _startTime;
            var api = url.path.join('/');
            collector.log('api', {
              api: api,
              time: time
            }, true);
        };
        return $.ajax(options);
    },
    get: function(url, options) {
        return Ajax.fetch(url, options);
    },

    post: function(url, data, options) {
        options = $.extend(options || {}, {
          type: 'post',
          data: data || {}
        });
        return Ajax.fetch(url, options);
    }
};

module.exports = Ajax;
