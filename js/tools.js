var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
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
var HHW;
(function (HHW) {
    function isMo() {
        return !!window['G'] && !!window['mo'] && !!window['G'].loginMgr;
    }
    HHW.isMo = isMo;
    //判断功能是否可以用
    function hasEgret() {
        var el = document.querySelector(".egret-player");
        return egret && egret.devtool && el && el["egret-player"] && el["egret-player"].stage;
    }
    HHW.hasEgret = hasEgret;
    function hasEgretPlugin() {
        if (currentInspector && currentInspector.mask && currentInspector.mask.drawTarget_hhw) {
            return true;
        }
        else {
            HHW.sendMessToDevTool('请初始化egret插件', 2 /* CONST.MESS_TYPE.warn */);
            console.error('请初始化egret插件');
            return false;
        }
    }
    HHW.hasEgretPlugin = hasEgretPlugin;
})(HHW || (HHW = {}));
var HHW;
(function (HHW) {
    //开关
    var _switchMap = {
        syncData: false,
        watch_egret: false,
        light_egret: false,
    };
    // 控制开关
    function changeSwitch(args) {
        var key = args.key;
        var isOpen = args.isOpen;
        if (_switchMap.hasOwnProperty(key)) {
            _switchMap[key] = !!isOpen;
            var msg = isOpen ? "打开" : "关闭";
            console.log("开关" + key + "已被" + msg);
            //key特殊判断
            switch (key) {
                case "syncData" /* CONST.SWITCH.syncData */:
                    if (isOpen) {
                        mo.NET.gsMgr.on('G.ISyncData', _surveySyncData);
                    }
                    else {
                        mo.NET.gsMgr.un('G.ISyncData', _surveySyncData);
                    }
                    break;
                case "light_egret" /* CONST.SWITCH.light_egret */:
                    if (isOpen) {
                        if (!HHW.hasEgretPlugin()) {
                            HHW.sendData("init_egret_fail" /* CONST.EVENT.init_egret_fail */);
                            _switchMap[key] = false;
                        }
                    }
                    else {
                        HHW.el_expand.drawTarget();
                    }
                    break;
                case "watch_egret" /* CONST.SWITCH.listen_egret */:
                    if (isOpen) {
                        if (!HHW.hasEgretPlugin()) {
                            HHW.sendData("init_egret_fail" /* CONST.EVENT.init_egret_fail */);
                            _switchMap[key] = false;
                        }
                        else {
                            HHW.tree_change(true);
                        }
                    }
                    else {
                        HHW.hhw_hashMap = {};
                        HHW.hhw_tree = {};
                    }
                    break;
            }
        }
    }
    HHW.changeSwitch = changeSwitch;
    // 获取开关参数
    function getSwitchMap(key) {
        return _switchMap[key];
    }
    HHW.getSwitchMap = getSwitchMap;
    // 特殊处理SyncData开关
    function _surveySyncData(route, arg, data) {
        if (route == "gs.usr.heartTick" || route == "server.heartbeat.hb")
            return;
        console.log("请求服务端啦！！ " + mo.DATE.fmt(mo.DATE.date()));
        var obj = {
            "请求路由": route,
            "请求参数": arg,
            "服务端返回数据": data
        };
        console.log(obj);
    }
})(HHW || (HHW = {}));
var HHW;
(function (HHW) {
    var connecting = false; //与服务端连接状态
    var connect_num = 0; //连接次数
    var reconnect_limit = 10; //重连次数限制
    var io = socketIo.io;
    /**
     * 建立socket连接
     */
    function bulidSocket() {
        if (connecting == true) {
            return;
        }
        ;
        if (HHW.webSocket) {
            connect_num = 0;
            HHW.webSocket.open(); // 手动重连
            return;
        }
        var url = "ws://".concat(HHW.host, ":").concat(HHW.port);
        HHW.webSocket = io(url, {
            reconnection: false,
        });
        // 连接成功
        HHW.webSocket.on("connect", webSocketOnOpen);
        // 断开连接
        HHW.webSocket.on("disconnect", reconnect);
        // 错误
        HHW.webSocket.on("error", reconnect);
        // 连接错误
        HHW.webSocket.on("connect_error", reconnect);
        // 重连成功
        HHW.webSocket.on("reconnect", webSocketOnOpen);
        // 重连尝试错误
        HHW.webSocket.on("reconnect_error", reconnect);
        HHW.webSocket.on("message", webSocketOnMessage);
    }
    HHW.bulidSocket = bulidSocket;
    /** socket重连 */
    function reconnect() {
        connecting = false;
        setTimeout(function () {
            if (connect_num < reconnect_limit) {
                connect_num++;
                console.error("hhw socket重连" + connect_num + '次');
                HHW.webSocket.connect(); // 手动重连
            }
            else {
                console.error("hhw socket重连失败即将关闭");
                HHW.webSocket.close();
            }
        }, 5000);
    }
    /** socket连接成功 */
    function webSocketOnOpen() {
        connecting = true;
        connect_num = 0;
        HHW.sendData("connect_success" /* CONST.EVENT.connect_success */);
    }
    // 获取到后台消息的事件，操作数据的代码在onmessage中书写
    function webSocketOnMessage(data) {
        // res就是后台实时传过来的数据
        if (data) {
            try {
                data = JSON.parse(data);
                var _loop_1 = function (key) {
                    if (key == "testRequest" /* CONST.SOCKET_EVENT.testRequest */) {
                        HHW.getTestQequestList();
                    }
                    else if (key == "teamCfgUpdate" /* CONST.SOCKET_EVENT.teamCfgUpdate */) {
                        HHW.getTeamCfg();
                    }
                    else if (key == "errMsg" /* CONST.SOCKET_EVENT.errMsg */ && data[key]) {
                        HHW.sendMessToDevTool(data[key], 1 /* CONST.MESS_TYPE.err */);
                    }
                    else if (key == "successMsg" /* CONST.SOCKET_EVENT.successMsg */ && data[key]) {
                        HHW.sendMessToDevTool(data[key]);
                    }
                    else if (key == "update_act" /* CONST.SOCKET_EVENT.update_act */) {
                        HHW.enter(function (sync) {
                            var _a;
                            var mbMap = G.gMgr.actMgr.mbMap = G.gMgr.actMgr.mbMap || {};
                            var actList = ((_a = sync === null || sync === void 0 ? void 0 : sync.actTot) === null || _a === void 0 ? void 0 : _a.actList) || [];
                            var list = [];
                            for (var i = 0; i < actList.length; i++) {
                                list.push(actList[i].batchId);
                            }
                            var flag = false;
                            for (var key_1 in mbMap) {
                                if (list.indexOf(parseInt(key_1)) == -1) {
                                    flag = true;
                                    delete mbMap[key_1];
                                }
                            }
                            if (flag) {
                                mo.MSG.show('有人用插件关掉了活动，即将重置界面');
                                setTimeout(function () {
                                    HHW.refresh();
                                    G.UTIL.closeAllDlg([]);
                                }, 2000);
                            }
                            ;
                            if (data[key])
                                HHW.sendMessToDevTool(data[key]);
                        });
                    }
                };
                for (var key in data) {
                    _loop_1(key);
                }
            }
            catch (e) {
                console.log(e);
                console.log(data);
            }
        }
    }
    /** 发送请求 */
    function webSocketSend(params, cb) {
        if (!HHW.webSocket || !connecting) {
            HHW.sendMessToDevTool('hhw socket未连接', 1 /* CONST.MESS_TYPE.err */);
            return;
        }
        if (typeof params != "object") {
            HHW.webSocket.emit("message", JSON.stringify({ msg: params }), cb);
        }
        else {
            HHW.webSocket.emit("message", JSON.stringify(params), cb);
        }
    }
    HHW.webSocketSend = webSocketSend;
    //模块请求
    function wsReq(module, method, args, cb) {
        var params = {
            module: module,
            method: method,
            args: args
        };
        webSocketSend(params, cb);
    }
    HHW.wsReq = wsReq;
})(HHW || (HHW = {}));
var HHW;
(function (HHW) {
    HHW.identity_key = CONST.identity_key + (new Date).getTime(); //身份标识
    //* 通知content-script */
    function sendData(type, data) {
        window.postMessage({
            source: CONST.identity_key,
            data: data,
            type: type,
            identity: HHW.identity_key,
        }, '*');
    }
    HHW.sendData = sendData;
    /**
     * devTool的消息弹窗
     * type 1: err 2: warn other: info
     */
    function sendMessToDevTool(mess, type) {
        sendData("mess" /* CONST.EVENT.mess */, { mess: mess, t: type });
    }
    HHW.sendMessToDevTool = sendMessToDevTool;
    /** 请求hhw进程 */
    function postReq(params, cb) {
        //hhw/?modules=setTime&method=update&args={'newDate':'${timeStr}'}`;
        var url = "http://".concat(HHW.host, ":").concat(HHW.port, "/hhw/");
        mo.NET.post(url, params, function (err, rst) {
            if (rst && typeof rst == "string")
                rst = JSON.parse(rst);
            if (cb)
                cb(err, rst);
        });
    }
    HHW.postReq = postReq;
    function request_mo(method, args, cb) {
        if (!G.gMgr.serverInfoMgr.isOpen('test99999')) {
            return;
        }
        if (!args)
            args = {};
        args.method = method;
        // G.gsRequest("test99999.testEnter", args, cb);
        mo.NET.gsMgr.requestWithErr("server.test99999.testEnter", args, cb, function (err) {
            sendMessToDevTool(err, 1 /* CONST.MESS_TYPE.err */);
        });
    }
    HHW.request_mo = request_mo;
    function request_mo2(route, args) {
        return new Promise(function (resolve, reject) {
            G.gMgr.gsMgr.requestWithErr(route, args, function (data) {
                resolve([null, data]);
            }, function (err) {
                resolve([err, null]);
            });
        });
    }
    HHW.request_mo2 = request_mo2;
    window.addEventListener("message", function (messageEvent) {
        if (messageEvent && messageEvent.data) {
            var data = messageEvent.data;
            if (messageEvent && messageEvent.data) {
                var data_1 = messageEvent.data;
                if (data_1.data == '{"name":"isDevToolOpen"}') {
                    HHW.hClick.init();
                    HHW.init_egret(); //初始化egret
                }
            }
        }
    });
    sendData("init" /* CONST.EVENT.init */);
})(HHW || (HHW = {}));
var HHW;
(function (HHW) {
    HHW.cfgMap = {
        "c_item": [],
        "c_item_map": {},
        "c_act": {},
    };
    function getCfgMap() {
        var _loop_2 = function (key) {
            if (["c_item_map"].indexOf(key) > -1) {
                return "continue";
            }
            else if (["c_act"].indexOf(key) > -1) {
                if (!mo.OBJ.isEmpty(HHW.cfgMap[key])) {
                    return "continue";
                }
                mo.D.each(key, function (temp, id) {
                    if (temp.id > 0) {
                        HHW.cfgMap[key][temp.id] = temp.name;
                    }
                });
            }
            else if (!HHW.cfgMap[key].length) {
                var is_item_1 = key == "c_item";
                mo.D.each(key, function (temp, id) {
                    if (temp.id > 0) {
                        if (is_item_1) {
                            HHW.cfgMap["c_item_map"][temp.id] = temp.name;
                        }
                        var list = [temp.id, temp.name];
                        HHW.cfgMap[key].push(list);
                    }
                });
            }
        };
        for (var key in HHW.cfgMap) {
            _loop_2(key);
        }
        return HHW.cfgMap;
    }
    HHW.getCfgMap = getCfgMap;
})(HHW || (HHW = {}));
var HHW;
(function (HHW) {
    HHW.procedureList = [];
    HHW.testRequestList = [];
    HHW.teamCfgList = [];
    function callProcedure(args) {
        HHW.reqHHW('test', 'callProcedure', args, function (rst) {
            HHW.enter(function () {
                HHW.sendMessToDevTool('执行成功');
                HHW.refresh();
            });
        });
    }
    HHW.callProcedure = callProcedure;
    function callQuick(args) {
        return HHW.sendMessToDevTool('暂未开发此功能');
        HHW.reqHHW('test', 'callQuick', args, function (rst) {
            HHW.enter(function () {
                HHW.sendMessToDevTool('执行成功');
            });
        });
    }
    HHW.callQuick = callQuick;
    function updateTestQequest(args) {
        return __awaiter(this, void 0, void 0, function () {
            function once() {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        return [2 /*return*/, new Promise(function (resolve, reject) {
                                var promises = once_list.map(function () {
                                    return HHW.request_mo2(args.cnd.name, args.data.args);
                                });
                                Promise.all(promises).then(function (sync_list) {
                                    console.warn(sync_list);
                                    resolve();
                                }).catch(function (err) {
                                    console.error(err);
                                    reject(err);
                                });
                            })];
                    });
                });
            }
            function exec() {
                if (flag <= exec_times) {
                    console.warn('第', flag, '次执行' + args.cnd.name + '的请求');
                    once();
                    flag++;
                    setTimeout(function () {
                        exec();
                    }, interval_time);
                }
                else {
                    console.warn('执行' + args.cnd.name + '完成');
                    HHW.reqHHW('test', 'updateTestQequest', args, function (rst) { });
                }
            }
            var key, _a, once_times, interval_time, exec_times, once_list, flag;
            return __generator(this, function (_b) {
                for (key in args.data.args) {
                    try {
                        args.data.args[key] = eval(args.data.args[key]);
                    }
                    catch (error) {
                        //对象和字符窜报错
                        try {
                            args.data.args[key] = JSON.parse(args.data.args[key]);
                        }
                        catch (error) {
                            //不管就是字符窜
                        }
                    }
                }
                _a = args.ext, once_times = _a.once_times, interval_time = _a.interval_time, exec_times = _a.exec_times;
                once_list = new Array(once_times).fill(1);
                flag = 1;
                exec();
                return [2 /*return*/];
            });
        });
    }
    HHW.updateTestQequest = updateTestQequest;
    function getTestQequestList() {
        HHW.reqHHW('test', 'getTestQequestList', null, function (rst) {
            HHW.testRequestList = rst;
            HHW.sendData("test_request" /* CONST.EVENT.test_request */);
        });
    }
    HHW.getTestQequestList = getTestQequestList;
    function addItem(args) {
        return __awaiter(this, void 0, void 0, function () {
            var num, bi, _i, _a, itemId, _b, err, data, e_1;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 5, , 6]);
                        num = args.num;
                        bi = {};
                        _i = 0, _a = args.list;
                        _c.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 4];
                        itemId = _a[_i];
                        return [4 /*yield*/, HHW.request_mo2('gs.index.testCmd', { 'content': "item add ".concat(itemId, " ").concat(num) })];
                    case 2:
                        _b = _c.sent(), err = _b[0], data = _b[1];
                        if (data && data.oi && data.oi.bi) {
                            HHW.merge(bi, data.oi.bi);
                        }
                        _c.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4:
                        if (!HHW.isEmptyObject(bi)) {
                            G.ShowGainDlg.show({ gainList: bi });
                        }
                        return [3 /*break*/, 6];
                    case 5:
                        e_1 = _c.sent();
                        console.error(e_1);
                        HHW.sendMessToDevTool('执行发生异常', 1 /* CONST.MESS_TYPE.err */);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    }
    HHW.addItem = addItem;
    function getTeamCfg() {
        HHW.reqHHW('test', 'getTeamCfg', null, function (rst) {
            HHW.teamCfgList = rst;
            HHW.sendData("team_list" /* CONST.EVENT.team_list */);
        });
    }
    HHW.getTeamCfg = getTeamCfg;
    function updateTeamExt(args) {
        HHW.reqHHW('test', 'updateTeamExt', args, function (rst) {
        });
    }
    HHW.updateTeamExt = updateTeamExt;
    function fixPeak(args) {
        if (!G.peakCtrl) {
            HHW.sendMessToDevTool('巅峰赛不存在');
        }
        else if (!G.peakCtrl.isExist()) {
            HHW.sendMessToDevTool('巅峰赛活动不存在', 1 /* CONST.MESS_TYPE.err */);
        }
        else {
            if (!args.step) {
                HHW.sendMessToDevTool('请选择操作类型', 1 /* CONST.MESS_TYPE.err */);
                return;
            }
            var sync = {
                $ext: {
                    batchId: G.peakCtrl.batchId,
                    roomId: G.peakCtrl.roomId,
                    step: args.step[0],
                    roundId: args.step[1],
                    session: args.step[2],
                    num: args.num,
                    type: args.type,
                }
            };
            HHW.reqHHW('test', 'bst', { bst: HHW.bstSign('peak.fix', sync) });
        }
    }
    HHW.fixPeak = fixPeak;
    function peakFix(args) {
        if (!G.peakCtrl) {
            HHW.sendMessToDevTool('巅峰赛不存在');
        }
        else if (!G.peakCtrl.isExist()) {
            HHW.sendMessToDevTool('巅峰赛活动不存在', 1 /* CONST.MESS_TYPE.err */);
        }
        else {
            if (!args || !args.step) {
                HHW.sendMessToDevTool('请选择操作类型', 1 /* CONST.MESS_TYPE.err */);
                return;
            }
            var sync = {
                $ext: {
                    batchId: G.peakCtrl.batchId,
                    roomId: G.peakCtrl.roomId,
                    step: args.step[0],
                    roundId: args.step[1],
                    session: args.step[2],
                    num: args.num,
                    type: args.type,
                }
            };
            HHW.reqHHW('test', 'bst', { bst: HHW.bstSign('peak.fix', sync) }, function (rst) {
            });
        }
    }
    HHW.peakFix = peakFix;
    function oneKeyJoinFml(args) {
        if (!args) {
            HHW.sendMessToDevTool('传入参数错误', 1 /* CONST.MESS_TYPE.err */);
            return;
        }
        var sync = {
            $ext: args
        };
        HHW.reqHHW('test', 'bst', { bst: HHW.bstSign('gb.oneKeyJoinFml', sync) }, function (rst) {
        });
    }
    HHW.oneKeyJoinFml = oneKeyJoinFml;
    function oneKeyFight(args) {
        if (!args) {
            HHW.sendMessToDevTool('传入参数错误', 1 /* CONST.MESS_TYPE.err */);
            return;
        }
        var sync = {
            $ext: args
        };
        HHW.reqHHW('test', 'bst', { bst: HHW.bstSign('gb.oneKeyFight', sync) }, function (rst) {
        });
    }
    HHW.oneKeyFight = oneKeyFight;
    function gbFix(args) {
        if (!G.gbCtrl) {
            HHW.sendMessToDevTool('公会战不存在');
        }
        else if (!G.gbCtrl.isExist()) {
            HHW.sendMessToDevTool('公会战活动不存在', 1 /* CONST.MESS_TYPE.err */);
        }
        else {
            if (!args.step) {
                HHW.sendMessToDevTool('请选择操作类型', 1 /* CONST.MESS_TYPE.err */);
                return;
            }
            var sync = {
                $ext: {
                    batchId: G.gbCtrl.batchId,
                    roomId: G.gbCtrl.roomId,
                    step: args.step[0],
                    roundId: args.step[1],
                    type: args.type,
                }
            };
            HHW.reqHHW('test', 'bst', { bst: HHW.bstSign('gb.fix', sync) }, function (rst) {
            });
        }
    }
    HHW.gbFix = gbFix;
})(HHW || (HHW = {}));
var HHW;
(function (HHW) {
    function addRobotToRb(args) {
        HHW.reqHHW('robot', 'addRobotToRb', args, function (rst) {
            HHW.sendMessToDevTool('添加机器人至排位赛成功');
        });
    }
    HHW.addRobotToRb = addRobotToRb;
    function addRobot(args) {
        HHW.reqHHW('robot', 'addRobot', args, function (rst) {
            HHW.sendMessToDevTool('添加机器人成功');
        });
    }
    HHW.addRobot = addRobot;
    function addRobotToPeak(args) {
        if (!G.peakCtrl) {
            HHW.sendMessToDevTool('巅峰赛不存在');
        }
        else if (!G.peakCtrl.isExist()) {
            HHW.sendMessToDevTool('巅峰赛活动不存在', 1 /* CONST.MESS_TYPE.err */);
        }
        else if (G.peakCtrl.room.status > 0) {
            HHW.sendMessToDevTool('巅峰赛报名阶段已结束:' + mo.DATE.fmt(G.peakCtrl.ctrl.regTimeEnd), 1 /* CONST.MESS_TYPE.err */);
        }
        else {
            args.batchId = G.peakCtrl.batchId;
            args.roomId = G.peakCtrl.roomId;
            HHW.reqHHW('robot', 'addRobotToPeak', args, function (rst) {
                HHW.sendMessToDevTool('添加机器人至巅峰赛成功');
            });
        }
    }
    HHW.addRobotToPeak = addRobotToPeak;
})(HHW || (HHW = {}));
var HHW;
(function (HHW) {
    function getActList() {
        if (HHW.isEmptyObject(G.gMgr.actMgr.mbMap))
            return [];
        var actList = [];
        for (var key in G.gMgr.actMgr.mbMap) {
            var act = G.gMgr.actMgr.mbMap[key];
            actList.push({
                batchId: act.batchId,
                beginTime: mo.DATE.fmt(act.beginTime),
                endTime: mo.DATE.fmt(act.endTime),
                tempId: act.tmpId,
                showEndTime: mo.DATE.fmt(act.invisibleTime),
                name: act.name,
                status: act.isShow ? 1 : 0,
                type: act.tmp.type,
            });
        }
        return actList;
    }
    HHW.getActList = getActList;
    function configurationAct(args) {
        if (!args)
            args = {};
        args.bstList = [HHW.bstSign('peak.refreshCAct', {}), HHW.bstSign('gsm.refreshAct', {})];
        HHW.reqHHW('test', 'configurationAct', args, function (rst) {
            HHW.sendMessToDevTool('活动配置成功');
        });
    }
    HHW.configurationAct = configurationAct;
    function refreshAct(args) {
        if (!args)
            args = {};
        args.flag = true;
        args.bstList = [HHW.bstSign('peak.refreshCAct', {}), HHW.bstSign('gsm.refreshAct', {})];
        HHW.reqHHW('test', 'refreshAct', args, function (rst) { });
    }
    HHW.refreshAct = refreshAct;
    function resetBatch(args) {
        if (!args)
            args = {};
        args.bstList = [HHW.bstSign('peak.refreshCAct', {}), HHW.bstSign('gsm.refreshAct', {})];
        HHW.reqHHW('test', 'resetBatch', args, function (rst) {
            HHW.sendData("reset_batch" /* CONST.EVENT.reset_batch */, null);
        });
    }
    HHW.resetBatch = resetBatch;
    function getActTypeList(args) {
        HHW.reqHHW('test', 'getActTypeList', args, function (rst) {
            HHW.sendData("cfg_act_list" /* CONST.EVENT.cfg_act_list */, rst);
        });
    }
    HHW.getActTypeList = getActTypeList;
    function searchActInfo(args) {
        HHW.reqHHW('test', 'searchActInfo', args, function (rst) {
            if (rst) {
                HHW.sendData("cfg_act" /* CONST.EVENT.cfg_act */, rst);
            }
        });
    }
    HHW.searchActInfo = searchActInfo;
})(HHW || (HHW = {}));
/// <reference path="./cfg.ts" />
/// <reference path="./test.ts" />
/// <reference path="./robot.ts" />
/// <reference path="./act.ts" />
var HHW;
/// <reference path="./cfg.ts" />
/// <reference path="./test.ts" />
/// <reference path="./robot.ts" />
/// <reference path="./act.ts" />
(function (HHW) {
    HHW.teamX = '';
    HHW.appList = [];
    //获取当前区服
    function getGsGrpId() {
        return G.UT.getGsIdx(G.usrCtrl.id);
    }
    HHW.getGsGrpId = getGsGrpId;
    function refresh() {
        var curLayer = mo.moduleMgr.curModule.target.subLayerMgr.curLayer;
        curLayer.close();
        curLayer.show();
    }
    HHW.refresh = refresh;
    function reconnection() {
        mo.NET.gsMgr.net.socket.src.close();
    }
    HHW.reconnection = reconnection;
    function enter(cb) {
        G.loginMgr.enter(function (err, sync) {
            if (cb)
                cb(sync);
            else {
                HHW.sendMessToDevTool("执行成功");
            }
        });
    }
    HHW.enter = enter;
    function devInit() {
        var usrCtrl = G.usrCtrl;
        var fmlCtrl = G.fmlCtrl;
        return {
            id: usrCtrl.id,
            accName: usrCtrl.accName,
            did: usrCtrl.did,
            name: usrCtrl.name,
            fmlId: fmlCtrl.id,
        };
    }
    HHW.devInit = devInit;
    /**
     * bst加密
     * @param event
     * @param sync
     */
    function bstSign(event, sync) {
        var appList = event.split('.')[0].split('|');
        var from = { "projName": "zw", "envName": HHW.database_pre ? 'env-local' : "zw-" + HHW.teamX, "appName": "gm", "areaId": 0, "grpId": 0, "compId": 0, "localIpList": [window.location.hostname] };
        var list = [
            "bst.send",
            {
                "from": from,
                "appNameList": appList,
                "bizType": "__bst",
                "data": {
                    "$bst": {
                        "name": event,
                        "data": sync,
                        "from": from
                    }
                },
                "dsName": "G.ISyncData", "isFull": 1
            },
            null
        ];
        var a = mo.CRYPTO.enCharCode(JSON.stringify(list), null);
        var sign = mo.MD5.sign(a, null);
        var str = '$#|#$' + "{\"e\":\"request\",\"d\":{\"r\":\"bst\",\"p\":{\"sign\":\"".concat(sign, "\",\"a\":\"").concat(a, "\"},\"k\":\"").concat(mo.DATE.now(), "-").concat(mo.NUM.rand(1e4), "\"}}");
        return str;
    }
    HHW.bstSign = bstSign;
    function reqHHW(module, method, args, cb) {
        if (!args)
            args = {};
        args.hhw_team = HHW.teamX;
        args.hhw_isHw = G.isHw();
        args.hhw_gsIdx = getGsGrpId();
        args.hhw_clientV = mo.PROJ.version;
        if (HHW.database_pre)
            args.hhw_team = HHW.database_pre;
        HHW.postReq({
            module: module,
            method: method,
            args: args
        }, function (err, rst) {
            if (err)
                HHW.sendMessToDevTool(err, 1 /* CONST.MESS_TYPE.err */);
            else if (rst.err) {
                HHW.sendMessToDevTool(rst.err, 1 /* CONST.MESS_TYPE.err */);
            }
            else if (cb) {
                cb(rst.data);
            }
        });
    }
    HHW.reqHHW = reqHHW;
    (function init() {
        var pathList = window.location.pathname.split('/');
        HHW.teamX = pathList[1];
        if (HHW.isMo()) {
            HHW.bulidSocket();
            mo.emitter.on("onModuleChanged", function (go, from) {
                if (HHW.getSwitchMap("watch_egret" /* CONST.SWITCH.listen_egret */)) { //开关有开启
                    setTimeout(function () {
                        HHW.tree_change(true);
                    }, 200);
                }
            });
            G.loginMgr.cnnMgr.on("ON_LOGIN", function () {
                HHW.sendData("on_login" /* CONST.EVENT.on_login */);
            });
            mo.NET.gsMgr.on('G.ISyncData', function (route, arg, sync) {
                if (sync) {
                    if (sync.actTot && sync.actTot.actList) {
                        setTimeout(function () {
                            HHW.sendData("update_act" /* CONST.EVENT.update_act */);
                        }, 1000);
                    }
                }
            });
            setTimeout(function () {
                HHW.getCfgMap();
                HHW.getTestQequestList();
                HHW.getTeamCfg();
                reqHHW('app', 'getList', null, function (rst) {
                    HHW.appList = rst;
                    HHW.sendData("app_list" /* CONST.EVENT.app_list */);
                });
                reqHHW('test', 'getProcedureList', null, function (rst) {
                    HHW.procedureList = rst;
                    HHW.sendData("procedure_list" /* CONST.EVENT.procedure_list */);
                });
                HHW.sendData("init_data" /* CONST.EVENT.init_data */);
            }, 2000);
        }
    })();
})(HHW || (HHW = {}));
var HHW;
(function (HHW) {
    var HClick = /** @class */ (function () {
        function HClick() {
            this.TOUCH_METHODS = ['onTouchBegin', 'onTouchMove', 'onTouchEnd'];
            this._isDown = false;
            this._origTouch = {};
            this.init();
        }
        HClick.prototype.init = function () {
            var self = this;
            if (HHW.isMo() && HHW.hasEgret() && !self._status) {
                self._status = true;
                var webTouchHandler_1 = this._webTouchHandler = document.querySelector(".egret-player")['egret-player'].webTouchHandler;
                var methodList = self.TOUCH_METHODS;
                methodList.map(function (method) {
                    self._origTouch[method] = webTouchHandler_1.touch[method];
                });
                methodList.map(function (method) {
                    webTouchHandler_1.touch[method] = function () {
                        var args = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            args[_i] = arguments[_i];
                        }
                        self._origTouch[method].apply(webTouchHandler_1.touch, args);
                        self['_' + method].apply(self, args);
                    };
                });
            }
        };
        HClick.prototype._onTouchBegin = function (x, y, identifier) {
            this._isDown = true;
            var target = document.querySelector(".egret-player")['egret-player'].stage.$hitTest(x, y);
            if (HHW.getSwitchMap("watch_egret" /* CONST.SWITCH.listen_egret */)) { //开启开关
                HHW.mousedown(target);
            }
            if (HHW.getSwitchMap("light_egret" /* CONST.SWITCH.light_egret */)) {
                HHW.el_expand.drawTarget(target, true);
            }
        };
        HClick.prototype._onTouchMove = function (x, y, identifier) {
            if (this._isDown) {
            }
        };
        HClick.prototype._onTouchEnd = function (x, y, identifier) {
            if (this._isDown == false)
                return;
            this._isDown = false;
        };
        return HClick;
    }());
    HHW.HClick = HClick;
    HHW.hClick = new HClick();
})(HHW || (HHW = {}));
var HHW;
(function (HHW) {
    var El_expand = /** @class */ (function () {
        function El_expand() {
            this.keyMap = {
                data: 'data',
                x: 'x',
                y: 'y',
                width: 'width',
                height: 'height',
                visible: 'visible',
                source: 'source',
                skinName: 'skinName',
                touchEnabled: 'touchEnabled',
                zIndex: 'zIndex',
                icon: 'icon',
                text: 'text',
                label: 'label',
            };
        }
        /**
         * el 操作实例对象
         * isDraw 是否渲染
         * num_H 16进制数字
         */
        El_expand.prototype.drawTarget = function (el, isDraw, num_H) {
            if (HHW.hasEgretPlugin()) {
                currentInspector.mask.metrics.visible = false; //隐藏坐标
                currentInspector.mask.shape.graphics.clear(); //清除
                if (isDraw) {
                    if (this._hashCode == el.hashCode) {
                        this._hashCode = null;
                    }
                    else {
                        this._hashCode = el.hashCode;
                        currentInspector.mask.drawTarget_hhw(el, num_H); //渲染遮罩
                        currentInspector.mask.showMetrics(el);
                    }
                }
                else {
                    this._hashCode = null;
                }
            }
        };
        /** 获取父组件实例列表 */
        El_expand.prototype.$getParentList = function (el) {
            var list = [];
            var target = el;
            while (target) {
                list.push(target);
                target = target.$parent;
            }
            return list;
        };
        /** /获取父组件实例 下的数据 */
        El_expand.prototype.$getParentListByData = function (el) {
            return this.$getParentList(el);
        };
        /** 获取子组件实例列表 */
        El_expand.prototype.$getChildrenList = function (el) {
            return el.$children || [];
        };
        /** 返回该页面的树形结构 */
        El_expand.prototype.$show_tree = function () {
            // let data = Object.assign(currentStage);
            var tree = {};
            var hashMap = {};
            var getTreeNode = function (parent, tree) {
                if (parent && parent.hashCode) {
                    tree.hashCode = parent.hashCode;
                    hashMap[parent.hashCode] = parent;
                    parent.class_name = parent.getDisplayName();
                    var _children = parent.$children;
                    if (_children && _children.length) {
                        tree.children = [];
                        for (var i = 0; i < _children.length; i++) {
                            var child = _children[i];
                            tree.children[i] = {};
                            getTreeNode(child, tree.children[i]);
                        }
                    }
                }
            };
            var scene = document.querySelector(".egret-player")["egret-player"].stage.$children[0].$children[0];
            getTreeNode(scene, tree);
            var getTreeData = function (parent) {
                if (parent && parent.hashCode && hashMap && hashMap[parent.hashCode]) {
                    var instance = hashMap[parent.hashCode];
                    parent.disabled_list = ['hashCode', 'name', 'class_name'];
                    parent.name = instance.name;
                    parent.class_name = instance.class_name;
                    parent.__label__ = instance.name + " \u3010" + instance.class_name + "\u3011";
                    if (instance.class_name != "egret.Stage") { //egret.Stage不允许访问这些属性
                        parent.visible = instance.visible;
                        parent.x = instance.x;
                        parent.y = instance.y;
                    }
                    parent.width = instance.width;
                    parent.height = instance.height;
                    if (instance.data && typeof instance.data == 'object') {
                        var data = {};
                        for (var key in instance.data) {
                            var d = instance.data[key];
                            if (d && typeof d == 'object') {
                                try {
                                    JSON.stringify(d);
                                    data[key] = d;
                                }
                                catch (error) {
                                    if (d.__class__) {
                                        data[d.__class__] = "Object";
                                    }
                                }
                            }
                            else {
                                data[key] = d;
                            }
                        }
                        parent.data = data;
                    }
                    else {
                        parent.data = instance.data;
                    }
                    parent.source = instance.source;
                    parent.skinName = instance.skinName;
                    parent.touchEnabled = instance.touchEnabled;
                    parent.zIndex = instance.zIndex;
                    if (instance.icon && typeof instance.icon == "object") {
                        parent.icon = instance.icon.__class__;
                        parent.disabled_list.push('icon');
                    }
                    else {
                        parent.icon = instance.icon;
                    }
                    parent.resModule = instance.resModule;
                    parent.text = instance.text;
                    parent.label = instance.label;
                    var children = parent.children;
                    if (children && children.length) {
                        for (var i = 0; i < children.length; i++) {
                            var child = children[i];
                            if (child)
                                getTreeData(child);
                        }
                    }
                }
            };
            getTreeData(tree);
            return {
                tree: JSON.parse(JSON.stringify(tree)),
                hashMap: hashMap,
            };
        };
        return El_expand;
    }());
    HHW.el_expand = new El_expand();
})(HHW || (HHW = {}));
/// <reference path="./HClick.ts" />
/// <reference path="./El_expand.ts" />
var HHW;
/// <reference path="./HClick.ts" />
/// <reference path="./El_expand.ts" />
(function (HHW) {
    var egret_stage;
    var egret_devTool;
    function mousedown(target) {
        tree_change();
        HHW.hhw_test = target;
        HHW.sendData("click_egret" /* CONST.EVENT.click_egret */, target.$hashCode);
        // console.log(target);
    }
    HHW.mousedown = mousedown;
    function tree_change(force) {
        var rst = HHW.el_expand.$show_tree();
        if (!force && HHW.hhw_hashMap && Object.keys(HHW.hhw_hashMap).length == Object.keys(rst.hashMap).length) {
            return;
        }
        HHW.hhw_hashMap = rst.hashMap;
        HHW.hhw_tree = rst.tree;
        HHW.sendData("init_egret" /* CONST.EVENT.init_egret */, HHW.hhw_tree);
        HHW.el_expand.drawTarget();
    }
    HHW.tree_change = tree_change;
    function init_egret() {
        if (HHW.hasEgret() && !HHW.egret_player) {
            HHW.egret_player = document.querySelector(".egret-player")["egret-player"];
            egret_stage = HHW.egret_player.stage;
            egret_devTool = egret.devtool;
            if (egret_devTool && egret_devTool.EgretMetricMask && egret_devTool.EgretMetricMask.prototype.drawTarget) {
                /**
                 * t 操作实例对象
                 * num_H 16进制数字
                 */
                egret_devTool.EgretMetricMask.prototype.drawTarget_hhw = function (t, num_H) {
                    var r = { x: 0, y: 0 };
                    if (t.scrollRect) {
                        r.x = t.scrollRect.x;
                        r.y = t.scrollRect.y;
                    }
                    if (t.mask) {
                        r.x = t.mask.x;
                        r.y = t.mask.y;
                    }
                    var i = t.width, n = t.height;
                    var s = t.localToGlobal(r.x, r.y), a = t.localToGlobal(r.x + i, r.y), h = t.localToGlobal(r.x + i, r.y + n), l = t.localToGlobal(r.x, r.y + n);
                    var color = num_H ? parseInt(num_H, 16) : 16711935;
                    var u = this.shape.graphics;
                    u.moveTo(s.x - .5, s.y - .5);
                    u.lineStyle(1, color, .5);
                    u.beginFill(color, .2);
                    u.lineTo(a.x - .5, a.y - .5);
                    u.lineTo(h.x - .5, h.y - .5);
                    u.lineTo(l.x - .5, l.y - .5);
                    u.lineTo(s.x - .5, s.y - .5);
                    u.endFill();
                };
            }
        }
    }
    HHW.init_egret = init_egret;
    function egret_highlight(agrs) {
        if (agrs && agrs.hashCode && HHW.hhw_hashMap && HHW.hhw_hashMap[agrs.hashCode]) {
            HHW.el_expand.drawTarget(HHW.hhw_hashMap[agrs.hashCode], agrs.isDraw);
        }
        else {
            HHW.el_expand.drawTarget();
        }
    }
    HHW.egret_highlight = egret_highlight;
    function consoleIns() {
        if (!HHW.hhw_test) {
            HHW.sendMessToDevTool('未选中实例', 2 /* CONST.MESS_TYPE.warn */);
        }
        else {
            console.warn('当前选中实例', HHW.hhw_test);
        }
    }
    HHW.consoleIns = consoleIns;
    function egret_change(agrs) {
        var node = HHW.hhw_hashMap[agrs.hashCode];
        if (!node) {
            HHW.sendMessToDevTool("数据异常，修改失败", 1 /* CONST.MESS_TYPE.err */);
            return;
        }
        var first_key = HHW.el_expand.keyMap[agrs.nameList[0]];
        if (!agrs.nameList || !first_key) {
            HHW.sendMessToDevTool("该参数不支持数据修改", 1);
            return;
        }
        var val = node;
        for (var i = 0; i < agrs.nameList.length; i++) {
            var key = agrs.nameList[i];
            if (i == 0) {
                key = first_key;
            }
            if (i == agrs.nameList.length - 1) {
                if (typeof val[key] == 'string') {
                    val[key] = agrs.value;
                }
                else {
                    val[key] = eval(agrs.value);
                }
            }
            else {
                val = val[key];
                if (!val)
                    break;
            }
        }
        setTimeout(function () {
            node[first_key] = node[first_key];
        }, 200);
    }
    HHW.egret_change = egret_change;
    (function () {
        setTimeout(function () {
            init_egret();
        }, 2000);
    })();
})(HHW || (HHW = {}));
/// <reference path="../common.ts" />
/// <reference path="./util.ts" />
/// <reference path="./switch.ts" />
/// <reference path="./webSocket.ts" />
/// <reference path="./request.ts" />
/// <reference path="./game/basics.ts" />
/// <reference path="./egret/index.ts" />
var HHW;
/// <reference path="../common.ts" />
/// <reference path="./util.ts" />
/// <reference path="./switch.ts" />
/// <reference path="./webSocket.ts" />
/// <reference path="./request.ts" />
/// <reference path="./game/basics.ts" />
/// <reference path="./egret/index.ts" />
(function (HHW) {
    var _functionMap = {
        output: output,
        changeSwitch: HHW.changeSwitch,
        changeTime: changeTime,
        enter: HHW.enter,
        reconnection: HHW.reconnection,
        callProcedure: HHW.callProcedure,
        callQuick: HHW.callQuick,
        restartApp: restartApp,
        egret_change: HHW.egret_change,
        egret_highlight: HHW.egret_highlight,
        consoleIns: HHW.consoleIns,
        addItem: HHW.addItem,
        updateTestQequest: HHW.updateTestQequest,
        addRobot: HHW.addRobot,
        addRobotToRb: HHW.addRobotToRb,
        addRobotToPeak: HHW.addRobotToPeak,
        updateTeamExt: HHW.updateTeamExt,
        configurationAct: HHW.configurationAct,
        refreshAct: HHW.refreshAct,
        resetBatch: HHW.resetBatch,
        getActTypeList: HHW.getActTypeList,
        searchActInfo: HHW.searchActInfo,
        fixPeak: HHW.fixPeak,
        peakFix: HHW.peakFix,
        oneKeyJoinFml: HHW.oneKeyJoinFml,
        oneKeyFight: HHW.oneKeyFight,
        gbFix: HHW.gbFix
    };
    function inject_tool(key, arg) {
        if (!!_functionMap[key]) {
            return _functionMap[key](arg);
        }
        else {
            return null;
        }
    }
    HHW.inject_tool = inject_tool;
    /** 日志输出 */
    function output(args) {
        if (args.lv == 1 /* CONST.MESS_TYPE.err */) {
            console.error(args.str);
        }
        else if (args.lv == 2 /* CONST.MESS_TYPE.warn */) {
            console.warn(args.str);
        }
        else {
            console.log(args.str);
        }
    }
    /** 修改服务器时间 */
    function changeTime(args) {
        if (args && args.time)
            args.newDate = mo.DATE.fmt(mo.DATE.date(args.time));
        HHW.reqHHW('setTime', 'update', args, function (rst) {
            HHW.sendMessToDevTool('时间修改成功，请稍等');
        });
    }
    /** 重启进程 */
    function restartApp(args) {
        HHW.reqHHW('app', 'restart', args, function (rst) {
            HHW.sendMessToDevTool('进程重启完毕');
        });
    }
    var proxy_data = new Proxy({}, {
        get: function (target, propKey, receiver) {
            return target[propKey];
        },
        set: function (target, propKey, value, receiver) {
            target[propKey] = value;
            return true;
        }
    });
})(HHW || (HHW = {}));
var HHW;
(function (HHW) {
    /**
     * 谷歌好像设置了对象赋值长度上限，太大的对象或者递归属性都会导致代码中断，按要求加
     */
    function getUsrData() {
        return G.gMgr.usrCtrl.$$data;
    }
    HHW.getUsrData = getUsrData;
})(HHW || (HHW = {}));
