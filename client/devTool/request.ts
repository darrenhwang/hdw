module HHW {
    let _origin: string;
    let _identity_key: string;

    export function eval(key, args, cb?) {
        if (args) args = JSON.stringify(args)
        let str = `HHW.inject_tool('${key}', ${args})`
        console.log("inject_tool ==============================")
        chrome.devtools.inspectedWindow.eval(str, function (result, isException) {
            if (!isException) {
                if (cb) cb(result);
            }
        });
    }

    export function eval2(str, cb?) {
        chrome.devtools.inspectedWindow.eval(str, function (result, isException) {
            if (!isException) {
                if (cb) cb(result);
            }
        });
    }

    export function eval3(str, cb?) {
        chrome.devtools.inspectedWindow.eval(str, function (result, isException) {
            if (cb) cb(result, isException);
        });
    }

    /**
     * 日志输出
     * @param str
     * @param lv 状态等级 2 warn 1 error
     */
    export function output(str: any, lv?: CONST.MESS_TYPE) {//日志输出
        eval("output", { lv, str }, null);
    }

    function _listener(request, sender, sendResponse, type: string) {
        if (!request) return;//没有数据
        if (request.source != CONST.identity_key) return;//身份验证失败；

        let data = request.data
        if (request.type == CONST.EVENT.init) {
            _init();
            hMitt.emit(CONST.EVENT.init);
        } else if (sender.origin != _origin || request.identity != _identity_key) {
            return;
        } else if (request.type == CONST.EVENT.mess) {
            if (data.t == CONST.MESS_TYPE.err) {
                showErr(data.mess);
            } else if (data.t == CONST.MESS_TYPE.warn) {
                showWarn(data.mess);
            } else {
                showSuccess(data.mess);
            }
        } else if (request.type == CONST.EVENT.init_data) {
            _initData();
            hMitt.emit(request.type);
        } else {
            hMitt.emit(request.type, request.data);
        }

        sendResponse('');
    }

    function _init() {
        eval2("window.location.origin", (rst) => {
            _origin = rst;
        })

        eval2("HHW.identity_key", (rst) => {
            _identity_key = rst;
        })

        for (let key in proxy_data) {
            proxy_data[key] = null;
        }
        hMitt.emit(CONST.EVENT.update_proxy_data);
    }

    function _initData() {
        eval2('HHW.getCfgMap()', (rst) => {
            cfgMap = rst;
        })
    }

    // chrome.extension.onRequest.addListener(function (request, sender, sendResponse) {
    //     _listener(request, sender, sendResponse, "onRequest");
    // })

    chrome.extension.onMessage.addListener(function (request, sender, sendResponse) {
        _listener(request, sender, sendResponse, "onMessage");
    });

    (function() {
        _init();
        _initData();
    })()
}
