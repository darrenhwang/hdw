var HHW;
(function (HHW) {
    var _origin;
    var _identity_key;
    function eval(key, args, cb) {
        if (args)
            args = JSON.stringify(args);
        var str = "HHW.inject_tool('".concat(key, "', ").concat(args, ")");
        chrome.devtools.inspectedWindow.eval(str, function (result, isException) {
            if (!isException) {
                if (cb)
                    cb(result);
            }
        });
    }
    HHW.eval = eval;
    function eval2(str, cb) {
        chrome.devtools.inspectedWindow.eval(str, function (result, isException) {
            if (!isException) {
                if (cb)
                    cb(result);
            }
        });
    }
    HHW.eval2 = eval2;
    function eval3(str, cb) {
        chrome.devtools.inspectedWindow.eval(str, function (result, isException) {
            if (cb)
                cb(result, isException);
        });
    }
    HHW.eval3 = eval3;
    /**
     * 日志输出
     * @param str
     * @param lv 状态等级 2 warn 1 error
     */
    function output(str, lv) {
        eval("output", { lv: lv, str: str }, null);
    }
    HHW.output = output;
    function _listener(request, sender, sendResponse, type) {
        if (!request)
            return; //没有数据
        if (request.source != CONST.identity_key)
            return; //身份验证失败；
        var data = request.data;
        if (request.type == "init" /* CONST.EVENT.init */) {
            _init();
            HHW.hMitt.emit("init" /* CONST.EVENT.init */);
        }
        else if (sender.origin != _origin || request.identity != _identity_key) {
            return;
        }
        else if (request.type == "mess" /* CONST.EVENT.mess */) {
            if (data.t == 1 /* CONST.MESS_TYPE.err */) {
                HHW.showErr(data.mess);
            }
            else if (data.t == 2 /* CONST.MESS_TYPE.warn */) {
                HHW.showWarn(data.mess);
            }
            else {
                HHW.showSuccess(data.mess);
            }
        }
        else if (request.type == "init_data" /* CONST.EVENT.init_data */) {
            _initData();
            HHW.hMitt.emit(request.type);
        }
        else {
            HHW.hMitt.emit(request.type, request.data);
        }
        sendResponse('');
    }
    function _init() {
        eval2("window.location.origin", function (rst) {
            _origin = rst;
        });
        eval2("HHW.identity_key", function (rst) {
            _identity_key = rst;
        });
        for (var key in HHW.proxy_data) {
            HHW.proxy_data[key] = null;
        }
        HHW.hMitt.emit("update_proxy_data" /* CONST.EVENT.update_proxy_data */);
    }
    function _initData() {
        eval2('HHW.getCfgMap()', function (rst) {
            HHW.cfgMap = rst;
        });
    }
    // chrome.extension.onRequest.addListener(function (request, sender, sendResponse) {
    //     _listener(request, sender, sendResponse, "onRequest");
    // })
    chrome.extension.onMessage.addListener(function (request, sender, sendResponse) {
        _listener(request, sender, sendResponse, "onMessage");
    });
    (function () {
        _init();
        _initData();
    })();
})(HHW || (HHW = {}));
