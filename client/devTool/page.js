/// <reference path="./basics.ts" />
var HHW;
(function (HHW) {
    function router_center() {
        return {
            setup: function (props, ctx) {
                var router = new HHW.useRouter();
                var activeName = HHW.ref('');
                var menuList = CONST.menuList;
                var isMo = HHW.ref(false);
                var interval = null;
                HHW.onMounted(function () {
                    HHW.hMitt.on("init" /* CONST.EVENT.init */, init);
                    HHW.hMitt.on("on_login" /* CONST.EVENT.on_login */, onLogin);
                    init();
                    activeName.value = "usrInfo" /* CONST.MENU.usrInfo */;
                });
                HHW.onUnmounted(function () {
                    HHW.hMitt.off("init" /* CONST.EVENT.init */, init);
                    HHW.hMitt.off("on_login" /* CONST.EVENT.on_login */, onLogin);
                });
                HHW.watch(activeName, function (newV, oldV) {
                    router.push({ path: addPath(activeName.value) });
                });
                function init() {
                    switchSync.value = false;
                    HHW.eval2("HHW.isMo()", function (rst) {
                        isMo.value = rst;
                        if (rst) {
                            if (interval)
                                clearInterval(interval);
                            interval = setInterval(function () {
                                HHW.eval2('mo.DATE.fmt(mo.DATE.date())', function (rst) {
                                    if (rst)
                                        serverTime.value = rst;
                                });
                            }, 1000);
                            HHW.eval2("HHW.devInit()", function (rst) {
                                for (var key in rst) {
                                    HHW.proxy_data[key] = rst[key];
                                }
                                HHW.hMitt.emit("update_proxy_data" /* CONST.EVENT.update_proxy_data */);
                            });
                        }
                    });
                }
                function onLogin() {
                    if (isMo.value) {
                        HHW.eval2("HHW.devInit()", function (rst) {
                            for (var key in rst) {
                                HHW.proxy_data[key] = rst[key];
                            }
                            HHW.hMitt.emit("update_proxy_data" /* CONST.EVENT.update_proxy_data */);
                        });
                    }
                }
                function addPath(path) {
                    return "/center/" + path;
                }
                var dialogArgs = HHW.ref(null);
                var dialogRules = HHW.ref(null);
                var dialogExt = HHW.ref(null);
                var dialogVisible = HHW.ref(false);
                function oj8k(args) {
                    if (args.extra_ext && args.extra_ext.handler) {
                        HHW.eval(args.extra_ext.handler, args);
                    }
                    dialogVisible.value = false;
                }
                function cancel() {
                    dialogVisible.value = false;
                }
                var serverTime = HHW.ref("xxxx/xx/xx xx:xx:xx");
                function changeTime() {
                    dialogArgs.value = [['time', '服务器时间', 'time', serverTime.value], ['pass', '秘钥']];
                    dialogRules.value = [['time'], ['pass']];
                    dialogExt.value = { handler: 'changeTime' };
                    dialogVisible.value = true;
                }
                var switchSync = HHW.ref(false);
                var switchSync_mess = HHW.computed(function () {
                    return switchSync.value ? '关闭' : '开启';
                });
                var syncColor = HHW.computed(function () {
                    return switchSync.value ? 'orange' : 'aliceblue';
                });
                function changeSwitchSync() {
                    switchSync.value = !switchSync.value;
                    HHW.eval('changeSwitch', { key: "syncData" /* CONST.SWITCH.syncData */, isOpen: !!switchSync.value });
                }
                function reconnection() {
                    HHW.eval('reconnection', null);
                }
                function enter() {
                    HHW.eval('enter', null);
                }
                function update_info() {
                    HHW.callProcedure('auto');
                }
                return {
                    menuList: menuList,
                    addPath: addPath,
                    activeName: activeName,
                    isMo: isMo,
                    dialogArgs: dialogArgs,
                    dialogRules: dialogRules,
                    dialogVisible: dialogVisible,
                    dialogExt: dialogExt,
                    oj8k: oj8k,
                    cancel: cancel,
                    serverTime: serverTime,
                    changeTime: changeTime,
                    syncColor: syncColor,
                    switchSync_mess: switchSync_mess,
                    changeSwitchSync: changeSwitchSync,
                    reconnection: reconnection,
                    enter: enter,
                    update_info: update_info,
                };
            },
            template: "\n<div>\n    <el-container>\n        <el-main v-if=\"isMo\">\n            <hhw-dialog v-model=\"dialogVisible\" :args=\"dialogArgs\" :rules=\"dialogRules\" :ext=\"dialogExt\" @oj8k=\"oj8k\" @cancel=\"cancel\"></hhw-dialog>\n            <div class=\"common-layout\">\n                <el-container>\n                    <el-header height=\"50px\" class=\"center_header\">\n                        <div>\n                            <h2 class=\"center_time\" @click=\"changeTime\">{{ \"\u670D\u52A1\u5668\u65F6\u95F4:\" + serverTime }}</h2>\n                            <h1 class=\"center_font\" :style=\"{color: syncColor}\" @click=\"changeSwitchSync\">{{ switchSync_mess + \"\u6570\u636E\u76D1\u542C\"}}</h1>\n                            <h1 class=\"center_font\" @click=\"enter\">\u540C\u6B65\u6570\u636E</h1>\n                            <h1 class=\"center_font\" @click=\"reconnection\">\u65AD\u7EBF\u91CD\u8FDE</h1>\n                            <h1 class=\"center_font\" @click=\"update_info\">\u5237\u53F7</h1>\n                        </div>\n                    </el-header>\n                    <el-main>\n                        <div>\n                            <el-tabs class=\"center-tabs\" v-model=\"activeName\">\n                                <el-tab-pane v-for=\"(info, idx) in menuList\" :key=\"idx\" :label=\"info.name\" :name=\"info.path\"></el-tab-pane>\n                            </el-tabs>\n                        </div>\n                        <div>\n                            <router-view v-slot=\"{ Component }\">\n\t                            <keep-alive>\n\t                                <component :is=\"Component\"/>\n\t                            </keep-alive>\n\t                        </router-view>\n                        </div>   \n                    </el-main> \n                </el-container>\n            </div>           \n        </el-main>\n        <img v-else align=\"middle\" src=\"../png/404.png\"  style=\"margin: 10% auto; color: white\"/>\n    </el-container>\n</div>            \n            ",
        };
    }
    HHW.router_center = router_center;
    function router_center_usrInfo() {
        return {
            setup: function (props, ctx) {
                var personalMess = HHW.ref('');
                var procedure_name = HHW.ref('');
                var quick_name = HHW.ref('');
                var activeName = HHW.ref('item');
                var procedure_list = HHW.ref([]);
                var item_select_list = HHW.ref([]);
                var c_item_list = HHW.ref([]);
                var item_num = HHW.ref(0);
                var testRequest_list = HHW.reactive([]);
                var iface_name = HHW.ref('');
                var args = HHW.reactive([]);
                var note = HHW.ref('');
                var once_times = HHW.ref(1);
                var interval_time = HHW.ref(1);
                var exec_times = HHW.ref(1);
                HHW.onMounted(function () {
                    HHW.hMitt.on("test_request" /* CONST.EVENT.test_request */, initTestRequest);
                    HHW.hMitt.on("update_proxy_data" /* CONST.EVENT.update_proxy_data */, init);
                    HHW.hMitt.on("procedure_list" /* CONST.EVENT.procedure_list */, initProcedureList);
                    HHW.hMitt.on("init_data" /* CONST.EVENT.init_data */, initData);
                    init();
                    initProcedureList();
                    initData();
                    initTestRequest();
                });
                HHW.onUnmounted(function () {
                    HHW.hMitt.off("test_request" /* CONST.EVENT.test_request */, initTestRequest);
                    HHW.hMitt.off("init_data" /* CONST.EVENT.init_data */, initData);
                    HHW.hMitt.off("update_proxy_data" /* CONST.EVENT.update_proxy_data */, init);
                    HHW.hMitt.off("procedure_list" /* CONST.EVENT.procedure_list */, initProcedureList);
                });
                function initTestRequest() {
                    HHW.eval2('HHW.testRequestList', function (rst) {
                        if (rst && rst.length) {
                            var _loop_1 = function (info) {
                                var flag = false;
                                testRequest_list.some(function (item) {
                                    if (item.name == info.name) {
                                        flag = true;
                                        item.ext = info.ext;
                                        var list = Object.keys(info.args);
                                        for (var key in item.args) {
                                            var idx = list.indexOf(key);
                                            if (idx == -1) {
                                                delete item.args[key];
                                            }
                                            else {
                                                list.splice(idx, 1);
                                            }
                                        }
                                        list.forEach(function (key) {
                                            item.args[key] = '';
                                        });
                                        return true;
                                    }
                                });
                                if (!flag) {
                                    testRequest_list.push(info);
                                }
                            };
                            for (var _i = 0, rst_1 = rst; _i < rst_1.length; _i++) {
                                var info = rst_1[_i];
                                _loop_1(info);
                            }
                        }
                    });
                }
                function initData() {
                    c_item_list.value = HHW.cfgMap.c_item;
                }
                function initProcedureList() {
                    HHW.eval2('HHW.procedureList', function (rst) {
                        procedure_list.value = rst;
                    });
                }
                function init() {
                    if (HHW.proxy_data.id) {
                        personalMess.value = "".concat(HHW.proxy_data.id, "(").concat(HHW.proxy_data.name, ")(").concat(HHW.proxy_data.accName, ")[").concat(HHW.proxy_data.fmlId || 0, "]");
                    }
                    else {
                        personalMess.value = '';
                    }
                }
                function callP(procedure_name) {
                    HHW.callProcedure(procedure_name);
                }
                function callQ(quick_name) {
                    HHW.callQuick(quick_name);
                }
                function addItem() {
                    if (!item_num.value) {
                        HHW.showWarn('请填写数量');
                    }
                    else if (!item_select_list.value) {
                        HHW.showWarn('请选择物品');
                    }
                    else {
                        HHW.eval('addItem', { list: item_select_list.value, num: item_num.value });
                    }
                }
                function addOne() {
                    args.push(['', '']);
                }
                function delOne(idx) {
                    args.splice(idx, 1);
                }
                function updateTestQequest() {
                    if (!iface_name.value) {
                        return HHW.showErr('请填写接口名');
                    }
                    HHW.eval('updateTestQequest', { cnd: { name: iface_name.value }, ext: {
                            once_times: parseInt(once_times.value || 1),
                            interval_time: parseInt(interval_time.value || 1),
                            exec_times: parseInt(exec_times.value || 1),
                        }, data: { ext: note.value, args: arr2obj(args) } });
                }
                function changeIfaceName(v) {
                    if (!v)
                        return;
                    var info = testRequest_list.find(function (item) { return item.name == v; });
                    args.length = 0;
                    if (info) {
                        note.value = info.ext;
                        for (var key in info.args) {
                            args.push([key, '']);
                        }
                    }
                    else {
                        note.value = '';
                    }
                }
                //二维数组转对象
                function arr2obj(arr) {
                    var obj = {};
                    arr.forEach(function (v) {
                        if (v[0] && v[0] != '请填写参数名')
                            obj[v[0]] = (v[1]);
                    });
                    return obj;
                }
                return {
                    personalMess: personalMess,
                    activeName: activeName,
                    procedure_name: procedure_name,
                    quick_name: quick_name,
                    callP: callP,
                    callQ: callQ,
                    procedure_list: procedure_list,
                    item_select_list: item_select_list,
                    c_item_list: c_item_list,
                    item_num: item_num,
                    addItem: addItem,
                    changeIfaceName: changeIfaceName,
                    testRequest_list: testRequest_list,
                    updateTestQequest: updateTestQequest,
                    iface_name: iface_name,
                    args: args,
                    note: note,
                    addOne: addOne,
                    delOne: delOne,
                    once_times: once_times,
                    interval_time: interval_time,
                    exec_times: exec_times,
                };
            },
            template: "\n<div>\n    <div v-if=\"personalMess\">\n        <div>\n            <p class=\"center_font3\">{{ personalMess }}</p>\n            <p class=\"center_font2\" style=\"margin-left: 50px\">\u5B58\u50A8\u5668\u6267\u884C:</p>\n            <el-select style=\"width: 200px; margin-top: -10px\" v-model=\"procedure_name\" filterable allow-create>\n                <el-option v-for=\"item in procedure_list\" :key=\"item.name\" :label=\"item.ext + '(' + item.name + ')'\" :value=\"item.name\"></el-option>\n            </el-select>\n            <el-button style=\"margin-left: 15px; margin-top: -10px\" type=\"success\" @click=\"callP(procedure_name)\">\u6267\u884C</el-button>\n<!--            <p class=\"center_font2\" style=\"margin-left: 50px\">\u5FEB\u901F\u8C03\u8BD5:</p>-->\n<!--            <hhw-edit-input v-model:value=\"quick_name\" height=\"25px\" lineHeight=\"10px\" width=\"180px\" style=\"margin-left: 10px;\"></hhw-edit-input>-->\n<!--            <el-button style=\"margin-left: 15px; margin-top: -7px\" type=\"success\" size=\"small\" @click=\"callQ(quick_name)\">\u6267\u884C</el-button>-->\n        </div>\n        <el-tabs v-model=\"activeName\" tab-position=\"left\" style=\"margin-top: 20px; border-radius: 4px; min-height: 200px; background-color: white\">\n            <el-tab-pane label=\"\u9053\u5177\u6DFB\u52A0\" name=\"item\">\n                <div style=\"margin-left: 10px\">\n                    <div style=\"padding-left: 10px;\">\n                        <br><br>\n                        <hhw-load-select v-model=\"item_select_list\" :options=\"c_item_list\" title=\"\u8BF7\u9009\u62E9\u8981\u9053\u5177\" style=\"width: 500px\"></hhw-load-select>\n                        <el-input-number style=\"display: block; margin-top: 10px;\" v-model=\"item_num\" :min=\"-9999999999\" :max=\"9999999999\"/>\n                    </div>\n                    <el-button style=\"margin: 10px 10px\" type=\"primary\" @click=\"addItem\">\u6DFB\u52A0\u9053\u5177</el-button>\n                </div>                                         \n            </el-tab-pane>\n            <el-tab-pane label=\"\u63A5\u53E3\u8C03\u8BD5\" name=\"interface\">\n                <div style=\"margin-left: 10px\">\n                    <br><br>\n                    <el-select style=\"width: 300px;\" v-model=\"iface_name\" placeholder=\"\u8BF7\u586B\u5199\u63A5\u53E3\u540D\" filterable allow-create @change=\"changeIfaceName\">\n                        <el-option v-for=\"item in testRequest_list\" :key=\"item.name\" :label=\"'(' + item.name + ')' +item.ext\" :value=\"item.name\"></el-option>\n                    </el-select>\n                    <br><br>\n                    <el-input type=\"textarea\" :rows=\"2\" placeholder=\"\u63A5\u53E3\u8BF7\u6C42\u6CE8\u91CA\u5185\u5BB9\" v-model=\"note\"></el-input>\n                    <br><br>\n                    <el-button type=\"primary\" @click=\"addOne\">\u6DFB\u52A0\u53C2\u6570</el-button>\n                    <el-button style=\"margin-left: 10px\" type=\"success\" @click=\"updateTestQequest\">\u8BF7\u6C42\u63A5\u53E3</el-button>\n                    <br><br>\n                    \u5355\u6B21\u8BF7\u6C42\u63A5\u53E3\u6B21\u6570<el-input v-model=\"once_times\" style=\"width: 120px\"></el-input>\n                    \u8FDE\u7EED\u8BF7\u6C42\u6B21\u6570<el-input v-model=\"exec_times\" style=\"width: 120px\"></el-input>\n                    \u8FDE\u7EED\u8BF7\u6C42\u95F4\u9694\uFF08\u6BEB\u79D2\uFF09<el-input v-model=\"interval_time\" style=\"width: 120px\"></el-input>\n                    <hr><br>\n                    <div style=\"margin-bottom: 15px\" v-for=\"(item, idx) in args\" :key=\"idx\">\n                        <el-input style=\"width: 100px\" v-model=\"item[0]\" placeholder=\"\u53C2\u6570\u540D\"></el-input>\n                        <el-input style=\"width: 200px; margin-left: 10px; margin-right: 10px\" v-model=\"item[1]\" placeholder=\"\u53C2\u6570\u503C\"></el-input> \n                        <el-button type=\"danger\" @click=\"delOne(idx)\" >\u5220\u9664</el-button>     \n                    </div>\n                </div>\n            </el-tab-pane>                      \n        </el-tabs>\n    </div>\n    <p v-else class=\"center_font2\" style=\"color: aliceblue\">\u8BF7\u5148\u8FDB\u5165\u6E38\u620F</p>\n</div>            \n            ",
        };
    }
    HHW.router_center_usrInfo = router_center_usrInfo;
    function router_center_appList() {
        return {
            setup: function (props, ctx) {
                var appList = HHW.ref([]);
                var appList_list = HHW.computed(function () {
                    var list = [];
                    for (var i = 0; i < appList.value.length; i++) {
                        list.push([appList.value[i]]);
                    }
                    return list;
                });
                var columns_app = [
                    {
                        label: '进程名',
                        key: '0',
                        width: 400
                    },
                ];
                var oper_list_app = [{
                        key: "restart",
                        label: "重启",
                        click: function (row) {
                            restartApp(row['0']);
                        }
                    }];
                HHW.onMounted(function () {
                    HHW.hMitt.on("app_list" /* CONST.EVENT.app_list */, init);
                    init();
                });
                HHW.onUnmounted(function () {
                    HHW.hMitt.off("app_list" /* CONST.EVENT.app_list */, init);
                });
                function init() {
                    HHW.eval2('HHW.appList', function (rst) {
                        if (rst)
                            appList.value = rst.reverse();
                    });
                }
                function restartApp(name) {
                    HHW.confirm("确定重启" + name + "?", function () {
                        HHW.eval("restartApp", { name: name }, null);
                    });
                }
                return {
                    appList_list: appList_list,
                    columns_app: columns_app,
                    oper_list_app: oper_list_app,
                };
            },
            template: "\n<div>\n   <div v-if=\"appList_list.length\">\n        <div style=\"width: 100%; margin-top: 5px; box-shadow:0px 5px 8px rgba(0, 0, 0, 0.6); padding-top: 15px;\">\n            <el-table :data=\"appList_list\" style=\"width: 100%\">\n                <el-table-column :show-overflow-tooltip=\"true\"  v-for=\"(item) in columns_app\" :key=\"item.key\" :label=\"item.label\" \n                    :width=\"item.width || 200\" :formatter=\"item.handler\" :prop=\"item.key\" align=\"center\"></el-table-column>\n                <el-table-column v-if=\"oper_list_app.length\" label=\"\u64CD\u4F5C\" align=\"center\" :width=\"200\">\n                    <template v-slot=\"scope\">\n                        <el-button v-for=\"item in oper_list_app\" :key=\"item.key\" size=\"small\" type=\"danger\"\n                            @click=\"item.click(scope.row)\">{{ item.label }}</el-button>\n                    </template>\n                </el-table-column>\n            </el-table>\n        </div>                       \n    </div>    \n   <p v-else class=\"center_font2\" style=\"color: aliceblue\">\u8BF7\u8054\u7CFBhhw</p>\n</div>            \n            ",
        };
    }
    HHW.router_center_appList = router_center_appList;
    function router_center_egret() {
        return {
            setup: function (props, ctx) {
                var hhw_tree = HHW.ref([]); //存放树的结构
                var hhw_tree_data = HHW.ref([]); //存放实例的data结构
                var egret_scene = HHW.ref('');
                var nodeMap = {};
                var debug_highlight_title = HHW.computed(function () {
                    return debug_highlight_status.value ? "关闭高亮" : "开启高亮";
                });
                var debug_highlight_color = HHW.computed(function () {
                    return debug_highlight_status.value ? 'orange' : 'aliceblue';
                });
                var debug_highlight_status = HHW.ref(false);
                var debug_listen_title = HHW.computed(function () {
                    return debug_listen_status.value ? "关闭点击监听" : "开启点击监听";
                });
                var debug_listen_color = HHW.computed(function () {
                    return debug_listen_status.value ? 'orange' : 'aliceblue';
                });
                var debug_listen_status = HHW.ref(false);
                HHW.onMounted(function () {
                    HHW.eval('changeSwitch', { key: "light_egret" /* CONST.SWITCH.light_egret */, isOpen: false });
                    HHW.eval('changeSwitch', { key: "watch_egret" /* CONST.SWITCH.listen_egret */, isOpen: false });
                    HHW.hMitt.on("init" /* CONST.EVENT.init */, init);
                    HHW.hMitt.on("init_egret_fail" /* CONST.EVENT.init_egret_fail */, initEgretFail);
                    HHW.eval2('HHW.hhw_tree', function (rst) {
                        initEgret(rst);
                    });
                });
                HHW.onUnmounted(function () {
                    HHW.hMitt.off("init" /* CONST.EVENT.init */, init);
                    HHW.hMitt.off("init_egret_fail" /* CONST.EVENT.init_egret_fail */, initEgretFail);
                });
                HHW.onActivated(function () {
                    HHW.hMitt.on("init_egret" /* CONST.EVENT.init_egret */, initEgret);
                    HHW.hMitt.on("click_egret" /* CONST.EVENT.click_egret */, clickEgret);
                });
                HHW.onDeactivated(function () {
                    HHW.hMitt.off("init_egret" /* CONST.EVENT.init_egret */, initEgret);
                    HHW.hMitt.off("click_egret" /* CONST.EVENT.click_egret */, clickEgret);
                });
                HHW.watch(debug_listen_status, function (newV, oldV) {
                    if (!newV) {
                        hhw_tree_data.value = []; //清空hhw_tree_data
                        nodeMap = {};
                        egret_scene.value = '';
                        hhw_tree.value = [];
                    }
                });
                function initEgretFail() {
                    debug_highlight_status.value = false;
                    debug_listen_status.value = false;
                }
                function init() {
                    debug_highlight_status.value = false;
                    debug_listen_status.value = false;
                }
                function initEgret(tree) {
                    hhw_tree_data.value = []; //清空hhw_tree_data
                    nodeMap = {};
                    if (tree) {
                        egret_scene.value = tree.__label__;
                        if (tree.children && tree.children.length) {
                            hhw_tree.value = tree.children;
                        }
                    }
                    else {
                        egret_scene.value = '';
                        hhw_tree.value = [];
                    }
                }
                function clickEgret(hashCode) {
                    treeRefresh(hashCode, true);
                    if (nodeMap[hashCode]) {
                        dealData(hashCode, nodeMap[hashCode].data);
                    }
                }
                function switchHighlight() {
                    debug_highlight_status.value = !debug_highlight_status.value;
                    HHW.eval('changeSwitch', { key: "light_egret" /* CONST.SWITCH.light_egret */, isOpen: !!debug_highlight_status.value });
                }
                function switchListen() {
                    debug_listen_status.value = !debug_listen_status.value;
                    HHW.eval('changeSwitch', { key: "watch_egret" /* CONST.SWITCH.listen_egret */, isOpen: !!debug_listen_status.value });
                }
                /**************************** 处理数据 **************************************/
                function treeNodeRecord(node, data) {
                    var a = function (node) {
                        if (node && node.data && node.data.hashCode) {
                            nodeMap[node.data.hashCode] = node;
                            if (node.childNodes && node.childNodes.length) {
                                for (var _i = 0, _a = node.childNodes; _i < _a.length; _i++) {
                                    var v = _a[_i];
                                    a(v);
                                }
                            }
                        }
                    };
                    a(node);
                }
                function treeRefresh(hashCode, is_hight_light) {
                    var parentList = [];
                    var a = function (node) {
                        if (node && node.data && node.data.hashCode) {
                            if (parentList.indexOf(node.data.hashCode) == -1) {
                                parentList.push(node.data.hashCode);
                            }
                            if (node.parent) {
                                a(node.parent);
                            }
                        }
                    };
                    var number = 0; //计算在这之上有几个节点
                    var b = function (node) {
                        if (node.parent) {
                            number++;
                            var parent_1 = node.parent;
                            if (parent_1.childNodes && parent_1.childNodes.length) {
                                var idx = parent_1.childNodes.indexOf(node);
                                if (idx > 0) {
                                    number += idx;
                                }
                            }
                            b(node.parent);
                        }
                    };
                    a(nodeMap[hashCode]);
                    var _loop_2 = function (key) {
                        if (parentList.indexOf(parseInt(key)) == -1) {
                            if (nodeMap[key].expanded == true)
                                nodeMap[key].expanded = false;
                        }
                        else {
                            if (nodeMap[key].expanded == false)
                                nodeMap[key].expanded = true;
                        }
                        if (is_hight_light) {
                            if (parseInt(key) == hashCode) {
                                nodeMap[key].isCurrent = true;
                                b(nodeMap[key]);
                            }
                            else {
                                if (nodeMap[key].isCurrent == true)
                                    nodeMap[key].isCurrent = false;
                            }
                            var hight = document.documentElement.clientHeight;
                            var offset_1 = number * 20 + 200 - hight / 2;
                            offset_1 = (offset_1 > 0 ? offset_1 : 0);
                            setTimeout(function () {
                                window.scrollTo({
                                    top: offset_1,
                                    behavior: "smooth"
                                });
                            }, 200);
                        }
                    };
                    for (var key in nodeMap) {
                        _loop_2(key);
                    }
                }
                /** 处理实例的data */
                function dealData(hashCode, data) {
                    var list = [];
                    var a = function (val, key, list) {
                        var info = {};
                        info.hashCode = hashCode;
                        if (val && typeof val == 'object') {
                            var isArray = (val instanceof Array);
                            info.name = key;
                            info.label = isArray ? 'Array' : 'Object';
                            var children = info.children = [];
                            list.push(info);
                            if (isArray) {
                                for (var i = 0; i < val.length; i++) {
                                    a(val[i], i, children);
                                }
                            }
                            else {
                                for (var key_1 in val) {
                                    a(val[key_1], key_1, children);
                                }
                            }
                        }
                        else {
                            info.name = key;
                            info.label = val == null ? null : val.toString();
                            if (data.disabled_list && data.disabled_list.indexOf(key) > -1)
                                info.disabled = true;
                            list.push(info);
                        }
                    };
                    for (var key in data) {
                        if (['children', '__label__', 'visible', 'disabled_list'].indexOf(key) > -1)
                            continue;
                        var l = [];
                        a(data[key], key, l);
                        list.push.apply(list, l);
                    }
                    hhw_tree_data.value = list;
                }
                function treeNodeClick(data, node, self) {
                    if (debug_highlight_status.value) {
                        HHW.eval("egret_highlight", { hashCode: data.hashCode, isDraw: true });
                    }
                    treeRefresh(data.hashCode, true);
                    dealData(data.hashCode, data);
                }
                function treeNodeExpand(data, node) {
                    treeRefresh(data.hashCode);
                }
                function treeDataUpdate(val, node, data, nameList) {
                    var a = function (node) {
                        if (node) {
                            if (node.data && node.data.name) {
                                nameList.splice(0, 0, node.data.name);
                            }
                            if (node.parent) {
                                a(node.parent);
                            }
                        }
                    };
                    if (!nameList) {
                        nameList = [];
                        a(node);
                    }
                    HHW.eval('egret_change', {
                        nameList: nameList,
                        value: val,
                        hashCode: data.hashCode
                    });
                }
                function visibleChange(node, data, val) {
                    treeDataUpdate(val, node, data, ['visible']);
                }
                function unEdit(data) {
                    return data.disabled || ['Object', 'Array'].indexOf(data.label) > -1;
                }
                function console() {
                    HHW.eval('consoleIns', null);
                }
                return {
                    treeNodeClick: treeNodeClick,
                    hhw_tree: hhw_tree,
                    debug_highlight_title: debug_highlight_title,
                    debug_highlight_color: debug_highlight_color,
                    debug_listen_title: debug_listen_title,
                    debug_listen_color: debug_listen_color,
                    switchHighlight: switchHighlight,
                    switchListen: switchListen,
                    egret_scene: egret_scene,
                    treeNodeRecord: treeNodeRecord,
                    treeNodeExpand: treeNodeExpand,
                    treeDataUpdate: treeDataUpdate,
                    hhw_tree_data: hhw_tree_data,
                    visibleChange: visibleChange,
                    unEdit: unEdit,
                    console: console,
                };
            },
            template: "\n<div>\n    <el-container>\n        <el-header height=\"50px\" class=\"debug_header\">\n            <h1 class=\"debug_font\" :style=\"{color: debug_highlight_color}\" @click=\"switchHighlight\">{{ debug_highlight_title }}</h1>\n            <h1 class=\"debug_font\" :style=\"{color: debug_listen_color}\" @click=\"switchListen\">{{ debug_listen_title }}</h1>\n            <h1 class=\"debug_font\" style=\"color: aliceblue\" @click=\"console\">\u6253\u5370\u9009\u4E2D\u5B9E\u4F8B</h1>\n        </el-header>\n        <el-main>\n            <span class=\"custom_tree\" style=\"display: inline-block; width: 70%\">\n                <p v-show=\"egret_scene\" class=\"debug_tree_title\">{{ `\u573A\u666F: ` + egret_scene }}</p>\n                <el-tree empty-text=\"\u6570\u636E\u5462\uFF1F\" :data=\"hhw_tree\" node-key=\"hashCode\" @node-click=\"treeNodeClick\" :expand-on-click-node=\"false\" \n                    :highlight-current=\"true\" @node-expand=\"treeNodeExpand\" style=\"background-color: unset; margin-top: 15px\">\n                    <template #default=\"{node, data}\">\n                        <span class=\"custom_tree_node\">\n                            {{ treeNodeRecord(node, data) }}\n                            <span>{{ data.name }}\n                                <span class=\"custom_tree_node_child\">\n                                    {{ `\u3010` }} <span style=\"color: rgb(50,205,50)\">{{ data.class_name }}</span>{{ `\u3011` }}\n                                </span>\n                            </span>  \n                        </span>  \n                        <el-checkbox v-model=\"data.visible\" label=\"\u662F\u5426\u663E\u793A\" @change=\"visibleChange(node, data, data.visible)\"></el-checkbox>  \n                    </template>\n                </el-tree> \n            </span>\n            <span class=\"debug_tree_data\">\n                <el-tree empty-text=\"\u6682\u65E0\u6570\u636E\" :data=\"hhw_tree_data\">\n                    <template #default=\"{node, data}\">\n                        <span class=\"custom_tree_data_node\">\n                            {{ data.name + \":\" }}\n                            <hhw-edit-input :disabled=\"unEdit(data)\" v-model:value=\"data.label\" height=\"25px\" lineHeight=\"10px\"\n                                width=\"150px\" @blur=\"treeDataUpdate($event, node, data)\" style=\"margin-left: 5px\"></hhw-edit-input>\n                        </span>  \n                    </template>\n                </el-tree> \n            </span>        \n        </el-main>     \n    </el-container>      \n</div>            \n            ",
        };
    }
    HHW.router_center_egret = router_center_egret;
    function router_center_robot() {
        return {
            setup: function (props, ctx) {
                var dialogArgs = HHW.ref(null);
                var dialogRules = HHW.ref(null);
                var dialogExt = HHW.ref(null);
                var dialogVisible = HHW.ref(false);
                var id = HHW.ref(0);
                HHW.onMounted(function () {
                    HHW.hMitt.on("update_proxy_data" /* CONST.EVENT.update_proxy_data */, init);
                    init();
                });
                HHW.onUnmounted(function () {
                    HHW.hMitt.off("update_proxy_data" /* CONST.EVENT.update_proxy_data */, init);
                });
                function init() {
                    if (HHW.proxy_data.id) {
                        id.value = HHW.proxy_data.id;
                    }
                    else {
                        id.value = 0;
                    }
                }
                function oj8k(args) {
                    if (args.extra_ext && args.extra_ext.handler) {
                        HHW.eval(args.extra_ext.handler, args);
                    }
                    dialogVisible.value = false;
                }
                function cancel() {
                    dialogVisible.value = false;
                }
                function addRobot() {
                    dialogArgs.value = [['num', '添加数量']];
                    dialogRules.value = [['num']];
                    dialogExt.value = { handler: 'addRobot' };
                    dialogVisible.value = true;
                }
                function addRobotToRb() {
                    dialogArgs.value = [['num', '添加数量'], ['list', '分数范围', 'between', ['', '']], ['roomId', '房间id', '', '1']];
                    dialogRules.value = [['num']];
                    dialogExt.value = { handler: 'addRobotToRb' };
                    dialogVisible.value = true;
                }
                function addRobotToPeak() {
                    dialogArgs.value = [['num', '添加数量']];
                    dialogRules.value = [['num']];
                    dialogExt.value = { handler: 'addRobotToPeak' };
                    dialogVisible.value = true;
                }
                var fixList = [
                    { value: [0], label: '报名结束' },
                    { value: [1], label: '海选赛' },
                    { value: [2], label: '海选赛结束' },
                    { value: [3, 1, 1], label: '64强第一场' },
                    { value: [3, 1, 2], label: '64强第二场' },
                    { value: [3, 1, 3], label: '64强第三场' },
                    { value: [3, 2, 1], label: '32强第一场' },
                    { value: [3, 2, 2], label: '32强第二场' },
                    { value: [3, 2, 3], label: '32强第三场' },
                    { value: [3, 3, 1], label: '16强第一场' },
                    { value: [3, 3, 2], label: '16强第二场' },
                    { value: [3, 3, 3], label: '16强第三场' },
                    { value: [3, 4, 1], label: '8强第一场' },
                    { value: [3, 4, 2], label: '8强第二场' },
                    { value: [3, 4, 3], label: '8强第三场' },
                    { value: [3, 5, 1], label: '4强第一场' },
                    { value: [3, 5, 2], label: '4强第二场' },
                    { value: [3, 5, 3], label: '4强第三场' },
                    { value: [3, 6, 1], label: '半决赛第一场' },
                    { value: [3, 6, 2], label: '半决赛强第二场' },
                    { value: [3, 6, 3], label: '半决赛强第三场' },
                    { value: [3, 7, 1], label: '决赛第一场' },
                    { value: [3, 7, 2], label: '决赛第二场' },
                    { value: [3, 7, 3], label: '决赛第三场' },
                    { value: [3, 7, 4], label: '决赛第四场' },
                    { value: [3, 7, 5], label: '决赛第五场' },
                    { value: [4], label: '活动结算' },
                ];
                function fixPeak() {
                    dialogArgs.value = [
                        ['step', '阶段', 'select', null, null, fixList],
                        ['type', '是否一键', 'select', 0, null, [{ value: 0, label: '否' }, { value: 1, label: '是' }]],
                        ['num', '海选赛场数'],
                    ];
                    dialogRules.value = [[]];
                    dialogExt.value = { handler: 'fixPeak' };
                    dialogVisible.value = true;
                }
                return {
                    dialogArgs: dialogArgs,
                    dialogRules: dialogRules,
                    dialogVisible: dialogVisible,
                    dialogExt: dialogExt,
                    oj8k: oj8k,
                    cancel: cancel,
                    id: id,
                    addRobotToRb: addRobotToRb,
                    addRobot: addRobot,
                    addRobotToPeak: addRobotToPeak,
                    fixPeak: fixPeak,
                };
            },
            template: "\n<div>\n    <hhw-dialog v-model=\"dialogVisible\" :args=\"dialogArgs\" :rules=\"dialogRules\" :ext=\"dialogExt\" @oj8k=\"oj8k\" @cancel=\"cancel\"></hhw-dialog>\n    <div v-if=\"id\">\n        <hhw-button :active=\"true\" type=\"3\" @click=\"addRobot\" name=\"\u6DFB\u52A0\u673A\u5668\u4EBA\"></hhw-button>\n        <hhw-button :active=\"true\" type=\"4\" @click=\"addRobotToRb\" name=\"\u53C2\u52A0\u6392\u4F4D\u8D5B\u673A\u5668\u4EBA\"></hhw-button>\n        <hhw-button :active=\"true\" type=\"11\" @click=\"addRobotToPeak\" name=\"\u53C2\u52A0\u5DC5\u5CF0\u8D5B\u673A\u5668\u4EBA\"></hhw-button>\n        <hhw-button :active=\"true\" type=\"8\" @click=\"fixPeak\" name=\"\u5DC5\u5CF0\u8D5B\u6D3B\u52A8\u5FEB\u901F\u64CD\u4F5C\"></hhw-button>\n    </div>\n    <p v-else class=\"center_font2\" style=\"color: aliceblue\">\u8BF7\u5148\u8FDB\u5165\u6E38\u620F</p>\n</div>            \n            ",
        };
    }
    HHW.router_center_robot = router_center_robot;
    function router_center_actList() {
        return {
            setup: function (props, ctx) {
                var id = HHW.ref(0);
                var act_list = HHW.ref([]);
                var interval = null;
                var dialogArgs = HHW.ref(null);
                var dialogRules = HHW.ref(null);
                var dialogExt = HHW.ref(null);
                var dialogVisible = HHW.ref(false);
                var popup_act = HHW.ref(false);
                HHW.onActivated(function () {
                    HHW.eval('getActTypeList', null);
                });
                HHW.onMounted(function () {
                    HHW.hMitt.on("init" /* CONST.EVENT.init */, initAct);
                    HHW.hMitt.on("update_proxy_data" /* CONST.EVENT.update_proxy_data */, init);
                    HHW.hMitt.on("update_act" /* CONST.EVENT.update_act */, initAct);
                    init();
                    initAct();
                    interval = setInterval(function () {
                        initAct();
                    }, 1000 * 30);
                });
                HHW.onUnmounted(function () {
                    HHW.hMitt.off("init" /* CONST.EVENT.init */, initAct);
                    HHW.hMitt.off("update_proxy_data" /* CONST.EVENT.update_proxy_data */, init);
                    HHW.hMitt.off("update_act" /* CONST.EVENT.update_act */, initAct);
                    if (interval) {
                        clearInterval(interval);
                    }
                });
                function init() {
                    if (HHW.proxy_data.id) {
                        id.value = HHW.proxy_data.id;
                    }
                    else {
                        id.value = 0;
                    }
                }
                function initAct() {
                    HHW.eval2('HHW.getActList()', function (rst) {
                        act_list.value = rst;
                    });
                }
                var columns = [
                    {
                        label: '批次id',
                        key: 'batchId',
                        fixed: 'left',
                        width: 100
                    },
                    {
                        label: '活动类型',
                        key: 'type',
                        width: 200,
                        handler: function (row, column, v, index) {
                            if (HHW.cfgMap["c_act"][v]) {
                                return HHW.cfgMap["c_act"][v] + '(' + v + ')';
                            }
                            else {
                                return v;
                            }
                        }
                    },
                    {
                        label: '模板id',
                        key: 'tempId',
                        width: 100,
                    },
                    {
                        label: '活动显示',
                        key: 'status',
                        width: 120,
                        handler: function (row, column, v, index) {
                            if (v) {
                                return "生效";
                            }
                            else {
                                return "失效";
                            }
                        },
                        style: function (v) {
                            if (v) {
                                return { color: 'green' };
                            }
                            else {
                                return { color: 'red' };
                            }
                        }
                    },
                    {
                        label: '活动开始时间',
                        key: 'beginTime',
                    },
                    {
                        label: '活动结束时间',
                        key: 'endTime',
                    },
                    {
                        label: '活动展示时间',
                        key: 'showEndTime',
                    },
                ];
                var opers = [
                    {
                        key: "close",
                        label: "活动关闭",
                        click: function (row) {
                            if (!row || !row.batchId) {
                                HHW.showErr("数据有误");
                                return;
                            }
                            var cnd = { id: row.batchId };
                            var data = { status: 0 };
                            var type = "batch";
                            HHW.eval("configurationAct", { cfgList: [{ cnd: cnd, data: data, type: type }] });
                        }
                    },
                    {
                        key: "changeStatus",
                        label: "时间调整",
                        click: function (row) {
                            if (!row || !row.batchId) {
                                HHW.showErr("数据有误");
                                return;
                            }
                            changeStatus(row);
                        }
                    }
                ];
                function refreshAct() {
                    HHW.eval('refreshAct', {});
                }
                function oj8k(args) {
                    HHW.output(args);
                    if (args.extra_ext && args.extra_ext.handler) {
                        var beginTime = typeof args.beginTime == 'string' ? args.beginTime : HHW.dateFormat(args.beginTime);
                        var endTime = typeof args.endTime == 'string' ? args.endTime : HHW.dateFormat(args.endTime);
                        var showEndTime = typeof args.showEndTime == 'string' ? args.showEndTime : HHW.dateFormat(args.showEndTime);
                        var cnd = { id: args.batchId };
                        var data = { status: args.status, beginTime: beginTime, effType: 0 };
                        var type = "batch";
                        data.duration = getBetween(endTime, beginTime);
                        data.duration_after = getBetween(showEndTime, endTime);
                        HHW.eval(args.extra_ext.handler, { cfgList: [{ cnd: cnd, data: data, type: type }] });
                    }
                    dialogVisible.value = false;
                }
                function cancel() {
                    dialogVisible.value = false;
                }
                function changeStatus(row) {
                    dialogArgs.value = [['batchId', '活动批次', null, row.batchId.toString(), 1], ['name', '活动名称', null, row.name, 1],
                        ['status', '状态', null, row.status.toString()], ['beginTime', '活动开始时间', 'time', row.beginTime],
                        ['endTime', '活动结束时间', 'time', row.endTime], ['showEndTime', '活动展示时间', 'time', row.showEndTime]];
                    dialogRules.value = [];
                    dialogExt.value = { handler: 'configurationAct' };
                    dialogVisible.value = true;
                }
                function getBetween(dataStr1, dataStr2) {
                    var dataNum1 = new Date(dataStr1).getTime();
                    var dataNum2 = new Date(dataStr2).getTime();
                    var minutesBetween = Math.ceil((dataNum1 - dataNum2) / 60 / 1000);
                    if (minutesBetween > 0) {
                        var d = Math.floor(minutesBetween / 24 / 60);
                        var left = minutesBetween % (24 * 60);
                        var h = Math.floor(left / 60);
                        left = left % 60;
                        var s = Math.floor(left);
                        return [d, h, s].join(",");
                    }
                    else {
                        return "0,0,0";
                    }
                }
                ;
                function configuration() {
                    popup_act.value = true;
                }
                function close_act() {
                    popup_act.value = false;
                }
                return {
                    id: id,
                    act_list: act_list,
                    columns: columns,
                    opers: opers,
                    refreshAct: refreshAct,
                    dialogArgs: dialogArgs,
                    dialogRules: dialogRules,
                    dialogVisible: dialogVisible,
                    dialogExt: dialogExt,
                    oj8k: oj8k,
                    cancel: cancel,
                    configuration: configuration,
                    close_act: close_act,
                    popup_act: popup_act,
                };
            },
            template: "\n<div>\n    <hhw-dialog v-model=\"dialogVisible\" :args=\"dialogArgs\" :rules=\"dialogRules\" :ext=\"dialogExt\" @oj8k=\"oj8k\" @cancel=\"cancel\"></hhw-dialog>\n    <hhw-dialog-act v-model=\"popup_act\" @oj8k=\"close_act\" @cancel=\"close_act\"></hhw-dialog-act>\n    <div>11111</div>\n    <div v-if=\"id\">\n        <div style=\"width: 100%; margin-top: 10px;\">\n<!--            <el-button size=\"default\" style=\"margin-left: 10px\" type=\"primary\" @click=\"refreshAct\">\u6D3B\u52A8\u5237\u65B0</el-button>-->\n            <el-button size=\"default\" style=\"margin-left: 10px\" type=\"primary\" @click=\"configuration\">\u6D3B\u52A8\u914D\u7F6E</el-button>\n        </div>    \n        <div style=\"width: 100%; margin-top: 5px; box-shadow:0px 5px 8px rgba(0, 0, 0, 0.6); padding-top: 15px;\">\n            <hhw-table v-model=\"act_list\" :col_data_list=\"columns\" :oper_list=\"opers\" :oper_width=\"220\"></hhw-table>\n        </div>    \n    </div>    \n    <p v-else class=\"center_font2\" style=\"color: aliceblue\">\u8BF7\u5148\u8FDB\u5165\u6E38\u620F</p>\n</div>            \n            ",
        };
    }
    HHW.router_center_actList = router_center_actList;
    function router_center_teamCfg() {
        return {
            setup: function (props, ctx) {
                var teamCfg_list = HHW.ref([]);
                HHW.onMounted(function () {
                    HHW.hMitt.on("team_list" /* CONST.EVENT.team_list */, init);
                    init();
                });
                HHW.onUnmounted(function () {
                    HHW.hMitt.off("team_list" /* CONST.EVENT.team_list */, init);
                });
                function init() {
                    HHW.eval2('HHW.teamCfgList', function (rst) {
                        teamCfg_list.value = rst;
                    });
                }
                function openNewWindow(href, status) {
                    function openNew() {
                        chrome.tabs.create({
                            url: href
                        });
                    }
                    if (status) {
                        openNew();
                    }
                    else {
                        HHW.confirm('是否执行该操作', function () {
                            openNew();
                        });
                    }
                }
                function updateExt(name, key, value) {
                    HHW.eval('updateTeamExt', { name: name, key: key, value: value });
                }
                return {
                    teamCfg_list: teamCfg_list,
                    openNewWindow: openNewWindow,
                    updateExt: updateExt,
                };
            },
            template: "\n<div>\n   <p v-if=\"!teamCfg_list.length\" class=\"center_font2\" style=\"color: aliceblue\">\u6682\u65E0\u6E38\u620F\u5165\u53E3 \u2022 \u2022 \u2022</p>\n   <el-card v-else class=\"box-card\" v-for=\"(info,idx) in teamCfg_list\" :key=\"idx\" style=\"width: 550px;margin-top:20px;margin-right:30px;display:inline-block\">\n        <template #header>\n            <div class=\"card-header\">\n                <span>\n                    <h3 style=\"display: inline-block; font-size: 20px; vertical-align: middle\">{{ info.name }}</h3> \n                    <h3 style=\"display: inline-block; font-size: 20px; vertical-align: middle; margin-left: 5px;\" >\u7248\u672C\u53F7:</h3>  \n                    <hhw-edit-input v-model:value=\"info.ext.ver\" height=\"30px\" lineHeight=\"20px\" width=\"110px\" fontSize=\"20px\"\n                        @blur=\"updateExt(info.name, 'ver', info.ext.ver)\" style=\"margin-left: 5px; vertical-align: middle\"></hhw-edit-input>\n                    <h3 style=\"display: inline-block; font-size: 20px; vertical-align: middle;  margin-left: 5px;\" >\u7248\u672C\u5185\u5BB9:</h3>      \n                    <hhw-edit-input v-model:value=\"info.ext.title\" height=\"30px\" lineHeight=\"20px\" width=\"150px\" fontSize=\"20px\"\n                        @blur=\"updateExt(info.name, 'title', info.ext.title)\" style=\"margin-left: 5px; vertical-align: middle\"></hhw-edit-input>\n                </span>        \n            </div>\n        </template>\n        <div v-for=\"(list,idx1) in info.cfgList\" :key=\"idx1\" class=\"hhwUrl\" @click=\"openNewWindow(list[1],list[2])\">{{ list[0] }}</div> \n   </el-card>\n</div>            \n            ",
        };
    }
    HHW.router_center_teamCfg = router_center_teamCfg;
})(HHW || (HHW = {}));
