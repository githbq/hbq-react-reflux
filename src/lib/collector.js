// 数据采集模块
import Url from 'lib/url';

var url = Url.parse(location.href);
var collector = {
    projectId: '',
    appId: '',
    appversion: 'unknown',
    host: url.host? url.host : 'fxiaoke',
    // 白名单：需要采集的api集合，不在集合内的api请求，不予采集；当指定为'all'，则采集任何接口
    apis: [],
    log: function(event, params, isApi) {
        if (!collector.projectId || !event) return;
        if (isApi && collector.apis !== 'all' && collector.apis.indexOf(params.api) ===
      -1) return;
        params = params || {};
        params.projectId = collector.projectId;
        params.appid = collector.appId;
        params.appversion = collector.appversion;
        params.actionid = event;
        params._fplatform = 'pc';
        params._fversion = 0;
        params._t = new Date().getTime();

        // 延迟5s上报，以免阻塞页面load
        setTimeout(function() {
          var imgUrl = Url.parse('//sp.' + collector.host + '.com/f.gif');
          imgUrl.query = params;
          var img = new Image();
          img.src = imgUrl.toString();
        }, 5000);
    },
    config: function(projectId, apis) {
        collector.projectId = projectId;
        collector.appId = url.getQuery('appid') || projectId;
        collector.apis = apis || 'all';
    }
};

window.addEventListener('load', function() {
    if (!('performance' in window) && !('webkitPerformance' in window)) return;
    setTimeout(function() {
        var performance = window.performance || window.webkitPerformance;
        var timing = performance.timing;
        // 统计白屏时间
        var btime = timing.responseStart - timing.navigationStart;
        // 统计domready耗时
        var rtime = timing.domContentLoadedEventEnd - timing.navigationStart;
        // 统计load耗时
        var ltime = timing.loadEventEnd - timing.navigationStart;
        collector.log('loadtime', {
            t_blank: btime,
            t_ready: rtime,
            t_load: ltime
        });
    }, 0);
});

// 全局捕捉Error和Exception
window.onerror = function(msg, url, line, column, error) {
  collector.log('jserror', {
    msg: msg + ',' + error
  });
  window.console && console.log('jserror:', msg, '\n', error);
  return true;
};

module.exports = collector;
