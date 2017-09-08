var cookie = {
    set: function(key, value, options) {
        var options = options || {};
        options.domain = options.domain || "";
        options.path = options.path || "/";
        options.expires = options.expires || 3600000*24*365;
        if (typeof options.expires == "number") {
            var now = new Date();
            now.setTime(now.getTime() + options.expires);
        };
        document.cookie = key + "=" + encodeURIComponent(value) + ";expires=" + now.toGMTString() + (options.domain ? ";domain=" + options.domain : "") + ";path=" + options.path; 
    },
    get: function(key) {
        var query = new RegExp("(^| )" + key + "=([^&=;]+)");
        var data = document.cookie.match(query);
        if (data) {
            return decodeURIComponent(data[2]);
        }
    },
    remove: function(key) {
        this.set(key, "", {expires: -3600});
    }
};

module.exports = cookie;