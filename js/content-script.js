var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var CONST;
(function (CONST) {
    CONST.identity_key = "HHWTOOL"; //身份标识
})(CONST || (CONST = {}));
var HHW;
(function (HHW) {
    HHW.$ = {
        "()": /\([^)]*\)/gi,
        "[]": /\[[^\]]*\]/gi,
        "{}": /\{[^}]*\}/gi
    };
    function getKuoHao(str, type, idx) {
        if (type === void 0) { type = '()'; }
        if (idx === void 0) { idx = 0; }
        var v = str.match(HHW.$[type])[idx];
        if (!v)
            return '';
        return v.substring(1, v.length - 2);
    }
    HHW.getKuoHao = getKuoHao;
    function delKuoHao(str, type) {
        if (type === void 0) { type = '()'; }
        return str.replace(HHW.$[type], '');
    }
    HHW.delKuoHao = delKuoHao;
    //对象合并
    function merge(target) {
        var _a;
        var sources = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            sources[_i - 1] = arguments[_i];
        }
        if (!sources.length)
            return target;
        var source = sources.shift();
        if (source === undefined)
            return target;
        if (source === null)
            return merge.apply(void 0, __spreadArray([target], sources, false));
        if (typeof source !== 'object')
            return merge.apply(void 0, __spreadArray([target], sources, false));
        if (Array.isArray(source)) {
            if (!Array.isArray(target))
                target = [];
            (_a = target).push.apply(_a, source);
            return merge.apply(void 0, __spreadArray([target], sources, false));
        }
        if (typeof target !== 'object')
            target = {};
        if (target === null)
            target = {};
        Object.keys(source).forEach(function (key) {
            var _a, _b;
            if (source[key] && typeof source[key] === 'object') {
                if (!target[key])
                    Object.assign(target, (_a = {}, _a[key] = {}, _a));
                merge(target[key], source[key]);
            }
            else {
                Object.assign(target, (_b = {}, _b[key] = source[key], _b));
            }
        });
        return merge.apply(void 0, __spreadArray([target], sources, false));
    }
    HHW.merge = merge;
    //判断对象为空
    function isEmptyObject(obj) {
        if (!obj || typeof obj !== 'object' || Array.isArray(obj))
            return false;
        return !Object.keys(obj).length;
    }
    HHW.isEmptyObject = isEmptyObject;
    /**
     * 替换占位符
     * @param str
     * @param newV
     * @param oldV
     */
    function replaceAll(str, newV, oldV) {
        if (oldV === void 0) { oldV = '%s'; }
        if (!str)
            return '';
        return str.replace(new RegExp(oldV, 'g'), newV);
    }
    HHW.replaceAll = replaceAll;
    //文本转换成html格式
    function text2html(str) {
        if (!str)
            return '';
        return str.replace(/\n/g, '<br/>');
    }
    HHW.text2html = text2html;
    //文本格式化
    function format(str) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (!str)
            return '';
        var i = 0;
        return str.replace(/%s/g, function () {
            return args[i++];
        });
    }
    HHW.format = format;
    //时间格式化 yyyy-MM-dd hh:mm:ss
    function dateFormat(date, fmt) {
        if (fmt === void 0) { fmt = 'yyyy-MM-dd hh:mm:ss'; }
        var o = {
            "M+": date.getMonth() + 1,
            "d+": date.getDate(),
            "h+": date.getHours(),
            "m+": date.getMinutes(),
            "s+": date.getSeconds(),
            "q+": Math.floor((date.getMonth() + 3) / 3),
            "S": date.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt))
            fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt))
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    }
    HHW.dateFormat = dateFormat;
})(HHW || (HHW = {}));
/// <reference path="../common.ts" />
var HHW;
/// <reference path="../common.ts" />
(function (HHW) {
    // 当初始的 HTML 文档被完全加载和解析完成之后
    document.addEventListener('DOMContentLoaded', function () {
        injectCustomJs('env.js', function () {
            injectCustomJs('js/socket.js', function () {
                injectCustomJs('js/tools.js');
            });
        });
    });
    // 向页面注入JS
    function injectCustomJs(jsPath, cb) {
        var temp = document.createElement('script');
        temp.setAttribute('type', 'text/javascript');
        temp.src = chrome.extension.getURL(jsPath);
        temp.onload = function () {
            // 放在页面不好看，执行完后移除掉
            //@ts-ignore
            this.parentNode.removeChild(this);
            if (cb)
                cb();
        };
        document.body.appendChild(temp);
    }
    HHW.injectCustomJs = injectCustomJs;
    // 接收来自后台的消息
    chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
        if (request) {
            if (request.type == "tab_id") {
            }
        }
        sendResponse("");
    });
    // 主动发送消息给后台
    function sendMessageToBackground(message) {
        chrome.runtime.sendMessage(message, function (response) {
            // console.warn(response);
        });
    }
    function sendDataToDevTool(args) {
        // chrome.extension.sendRequest(args, function (response) {
        //     // console.log(response);
        // });
        chrome.extension.sendMessage(null, args, function (response) {
            // console.log(response);
        });
    }
    //接受inject发送的消息
    window.addEventListener("message", function (e) {
        if (e && e.data && e.data.source == CONST.identity_key) {
            sendDataToDevTool(e.data);
        }
    }, false);
})(HHW || (HHW = {}));
