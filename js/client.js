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
var HHW;
(function (HHW) {
    HHW.hMitt = mitt();
})(HHW || (HHW = {}));
var HHW;
(function (HHW) {
    var _origin;
    var _identity_key;
    function eval(key, args, cb) {
        if (args)
            args = JSON.stringify(args);
        var str = "HHW.inject_tool('".concat(key, "', ").concat(args, ")");
        console.log("inject_tool ==============================");
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
/// <reference path="../common.ts" />
/// <reference path="./mitt.ts" />
/// <reference path="./request.ts" />
var CONST;
/// <reference path="../common.ts" />
/// <reference path="./mitt.ts" />
/// <reference path="./request.ts" />
(function (CONST) {
    CONST.menuList = [
        {
            name: "个人数据",
            path: "usrInfo" /* CONST.MENU.usrInfo */,
        },
        {
            name: "操作面板",
            path: "panel2_0" /* CONST.MENU.panel2_0 */
        },
        {
            name: "游戏入口",
            path: "teamCfg" /* CONST.MENU.teamCfg */,
        },
        {
            name: "活动配置",
            path: "actList" /* CONST.MENU.actList */,
        },
        {
            name: "机器人",
            path: "robot" /* CONST.MENU.robot */,
        },
        {
            name: "进程重启",
            path: "appList" /* CONST.MENU.appList */,
        },
        {
            name: "Egret",
            path: "egret" /* CONST.MENU.egret */,
        },
    ];
})(CONST || (CONST = {}));
var HHW;
(function (HHW) {
    HHW.ref = Vue.ref;
    HHW.reactive = Vue.reactive;
    HHW.onMounted = Vue.onMounted;
    HHW.onBeforeMount = Vue.onBeforeMount;
    HHW.onUnmounted = Vue.onUnmounted;
    HHW.computed = Vue.computed;
    /** 当组件在 <keep-alive> 内被切换时，它的 mounted 和 unmounted 生命周期钩子不会被调用，
     * 取而代之的是 activated 和 deactivated。(这会运用在 <keep-alive> 的直接子节点及其所有子孙节点。 */
    HHW.onActivated = Vue.onActivated;
    HHW.onDeactivated = Vue.onDeactivated;
    HHW.watch = Vue.watch;
    HHW.useRouter = VueRouter.useRouter;
    HHW.useRoute = VueRouter.useRoute;
    function showErr(message) {
        ElementPlus.ElMessage["error"]({ message: message, type: "error", center: true });
    }
    HHW.showErr = showErr;
    function showWarn(message) {
        ElementPlus.ElMessage({ message: message, type: "warning", center: true });
    }
    HHW.showWarn = showWarn;
    function showSuccess(message) {
        ElementPlus.ElMessage({ message: message, type: "success", center: true });
    }
    HHW.showSuccess = showSuccess;
    /** 确认框 */
    function confirm(msg, onOk) {
        ElementPlus.ElMessageBox.confirm(msg, "提示", {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(function () {
            onOk();
        }).catch(function () {
            showWarn("已取消");
        });
    }
    HHW.confirm = confirm;
    /** 执行存储过程 _ 分割 */
    function callProcedure(procedure_name) {
        if (!HHW.proxy_data.id) {
            showErr("麻烦先进游戏");
            return;
        }
        if (!procedure_name) {
            showErr("请填写需要执行的存储过程");
            return;
        }
        confirm("确定执行？", function () {
            HHW.eval('callProcedure', { name: procedure_name, uid: HHW.proxy_data.id });
        });
    }
    HHW.callProcedure = callProcedure;
    /** 执行快速命令 方法名?参数1=值1&参数2=值2 */
    function callQuick(quick_name) {
        return showWarn('该功能还未开放');
        // if (!proxy_data.id) {
        //     showErr('麻烦先进游戏');
        //     return;
        // }
        if (!quick_name) {
            showErr('请填写参数');
            return;
        }
        confirm("确定执行？", function () {
            HHW.eval('callQuick', { name: quick_name, uid: HHW.proxy_data.id });
        });
    }
    HHW.callQuick = callQuick;
    /** 玩家数据 */
    HHW.proxy_data = new Proxy({}, {
        get: function (target, propKey, receiver) {
            return target[propKey];
        },
        set: function (target, propKey, value, receiver) {
            target[propKey] = value;
            if (propKey == 'id')
                HHW.hMitt.emit("uid_update" /* CONST.EVENT.uid_update */);
            return true;
        }
    });
    /** 配置表数据 */
    HHW.cfgMap = {};
})(HHW || (HHW = {}));
/// <reference path="./basics.ts" />
var HHW;
/// <reference path="./basics.ts" />
(function (HHW) {
    /** 确认框 */
    function getDialog() {
        return {
            name: "hhw-dialog",
            emits: ["oj8k", "cancel"],
            data: function () {
                return {
                    rule: {},
                    formData: {},
                    visible: false,
                };
            },
            props: {
                modelValue: {
                    type: Boolean,
                    default: false,
                },
                args: {
                    type: Array,
                    default: [],
                },
                rules: {
                    type: Array,
                    default: [],
                },
                checkFuc: {
                    type: Function,
                    default: function (form, cb) {
                        cb();
                    }
                },
                ext: {
                    type: Object,
                    default: {},
                },
            },
            mounted: function () {
                HHW.hMitt.on("init" /* CONST.EVENT.init */, this.handleClose);
            },
            destroyed: function () {
                HHW.hMitt.off("init" /* CONST.EVENT.init */, this.handleClose);
            },
            methods: {
                ok: function () {
                    var self = this;
                    this.checkFuc(self['formData'], function () {
                        self.$refs.ruleForm.validate(function (valid) {
                            if (valid) {
                                var obj = {
                                    extra_ext: self.ext
                                };
                                Object.assign(obj, self['formData']);
                                self.$emit('oj8k', obj);
                            }
                            else {
                                HHW.showErr("表单校验失败");
                            }
                        });
                    });
                },
                handleClose: function () {
                    this.$emit('cancel');
                }
            },
            watch: {
                modelValue: function (val) {
                    this.visible = val;
                    // this.$emit('update:modelValue', val);
                },
                args: function (val) {
                    this.formData = {};
                    for (var _i = 0, val_1 = val; _i < val_1.length; _i++) {
                        var itemList = val_1[_i];
                        if (itemList && itemList[0] && itemList[3] && "xxxx/xx/xx xx:xx:xx" != itemList[3]) {
                            this.formData[itemList[0]] = itemList[3];
                        }
                    }
                },
                rules: function (val) {
                    this.rule = [];
                    var l_i = val ? val.length : 0;
                    for (var i = 0; i < l_i; i++) {
                        if (val[i][1]) {
                            this.rule[val[i][0]] = val[i][1];
                        }
                        else {
                            this.rule[val[i][0]] = [{
                                    required: true,
                                    message: '不能为空',
                                    trigger: 'change'
                                }];
                        }
                    }
                }
            },
            template: "\n<el-dialog v-model=\"visible\" title=\"\u8BF7\u586B\u5199\u53C2\u6570\" width=\"550px\" :before-close=\"handleClose\">\n    <el-form :model=\"formData\" :rules=\"rule\" ref=\"ruleForm\" label-width=\"100px\" class=\"demo-ruleForm\">\n        <el-form-item v-for=\"v in args\" :key=\"v[0]\" :value=\"v[0]\" :label=\"v[1]\" :prop=\"v[0]\">\n            <el-date-picker v-if=\"v[2] == 'time'\" v-model=\"formData[v[0]]\"\n                format=\"YYYY/MM/DD HH:mm:ss\"></el-date-picker>\n            <el-input v-else-if=\"v[2] == 'textarea'\" type=\"textarea\" :rows=\"2\" placeholder=\"\u8BF7\u8F93\u5165\u5185\u5BB9\" v-model=\"formData[v[0]]\"></el-input>\n            <div v-else-if=\"v[2] == 'between'\">\n                <el-input v-model=\"formData[v[0]][0]\" style=\"width: 120px\"></el-input>\n                -\n                <el-input v-model=\"formData[v[0]][1]\" style=\"width: 120px\"></el-input>\n            </div>\n            <el-select v-else-if=\"v[2] == 'select'\" filterable clearable v-model=\"formData[v[0]]\" style=\"width: 60%\">\n                <el-option v-for=\"(item, idx) in v[5]\" :key=\"idx\" :label=\"item.label\" :value=\"item.value\"/>\n            </el-select>\n            <el-input v-else v-model=\"formData[v[0]]\" style=\"width: 60%\" :disabled=\"!!v[4]\"></el-input>\n        </el-form-item>\n    </el-form>\n    <template #footer>\n        <span class=\"dialog-footer\">\n            <el-button @click=\"handleClose\">\u53D6 \u6D88</el-button>\n            <el-button type=\"primary\" @click=\"ok\">\u786E \u5B9A</el-button>\n        </span>\n    </template>\n</el-dialog>\n    "
        };
    }
    HHW.getDialog = getDialog;
    /** 表格 */
    function getTable() {
        return {
            props: {
                modelValue: {
                    type: Array,
                    default: [],
                },
                col_data_list: {
                    type: Array,
                    default: [],
                },
                oper_list: {
                    type: Array,
                    default: [],
                },
                oper_width: {
                    type: Number,
                    default: 100
                }
            },
            data: function () {
                return {
                    dataList: [],
                    total: 0,
                    page: 1,
                    pageSize: 10,
                };
            },
            methods: {
                pageChange: function (v) {
                    this.page = v;
                    this.getDataList();
                },
                sizeChange: function (v) {
                    this.pageSize = v;
                    this.getDataList();
                },
                getDataList: function () {
                    var list = [];
                    for (var i = (this.page - 1) * this.pageSize; i < this.page * this.pageSize; i++) {
                        if (!this.modelValue[i]) {
                            break;
                        }
                        list.push(this.modelValue[i]);
                    }
                    this.dataList = list;
                },
                isShow: function (item, row) {
                    return !item.isShow || item.isShow(row);
                }
            },
            computed: {
                col_data_list2: function () {
                    return this.col_data_list.filter(function (item) { return !!item.status; });
                }
            },
            watch: {
                modelValue: function (a, b) {
                    this.page = 1;
                    this.pageSize = 10;
                    this.total = a.length;
                    this.getDataList();
                }
            },
            template: "\n<el-table :data=\"dataList\" style=\"width: 100%\">\n    <el-table-column v-if=\"col_data_list2.length\" type=\"expand\">\n        <template v-slot=\"props\">\n            <el-form label-position=\"left\" inline class=\"demo-table-expand\">\n                <el-form-item  v-for=\"(item) in col_data_list2\" :key=\"item.key\"\n                    :label=\"item.label\">\n                    <span>{{ props.row[item.key] }}</span>\n                </el-form-item>\n            </el-form>\n        </template>\n    </el-table-column>\n    <el-table-column :show-overflow-tooltip=\"true\"  v-for=\"(item) in col_data_list\" :key=\"item.key\" :width=\"item.width || 200\" :prop=\"item.key\"\n        :label=\"item.label\" :fixed=\"item.fixed\" align=\"center\">\n        <template v-slot=\"props\">\n            <p :style=\"item.style ? item.style(props.row[item.key]) : {}\">{{ item.handler ? item.handler(null, null, props.row[item.key]) : props.row[item.key] }}</p>\n        </template>    \n    </el-table-column>\n    <el-table-column v-if=\"oper_list.length\" label=\"\u64CD\u4F5C\" align=\"center\" fixed=\"right\" :width=\"oper_width\">\n        <template v-slot=\"scope\">\n            <el-button v-for=\"item1 in oper_list\" v-show=\"isShow(item1, scope.row)\" :key=\"item1.key\" size=\"small\" type=\"danger\"\n                @click=\"item1.click(scope.row)\">{{ item1.label }}</el-button>\n        </template>\n    </el-table-column>\n</el-table>\n<div class=\"block\" style=\"float: right; margin-top: 30px;\">\n    <el-pagination @size-change=\"sizeChange\" @current-change=\"pageChange\"\n        :current-page=\"page\" :page-sizes=\"[10, 20, 50, 100]\" :page-size=\"pageSize\"\n        layout=\"total, sizes, prev, pager, next, jumper\" :total=\"total\">\n    </el-pagination>\n</div>"
        };
    }
    HHW.getTable = getTable;
    function getButton() {
        return {
            props: {
                type: {
                    type: String,
                    default: '1',
                },
                name: {
                    type: String,
                    default: 'test',
                },
                active: {
                    type: Boolean,
                    default: false,
                },
                width: {
                    type: String,
                    default: '220px',
                },
                height: {
                    type: String,
                    default: '80px'
                },
                font_size: {
                    type: String,
                    default: '20px'
                }
            },
            computed: {
                activeClass: function () {
                    var activeClass = {
                        'h-btn-hover': true,
                        'h-is-active': this.active
                    };
                    var key = 'color-' + this.type;
                    activeClass[key] = true;
                    return activeClass;
                }
            },
            template: "\n<div class=\"h-btn\">\n    <button :class=\"activeClass\" :style=\"{width: width, height: height, fontSize: font_size}\">{{ name }}</button>\n</div>            \n            "
        };
    }
    HHW.getButton = getButton;
    function getEditInput() {
        return {
            emits: ["update", "update:value", "blur"],
            props: {
                value: {
                    type: String,
                    default: '',
                },
                width: {
                    type: String,
                    default: 'auto',
                },
                height: {
                    type: String,
                    default: '',
                },
                lineHeight: {
                    type: String,
                    default: 'auto',
                },
                disabled: {
                    type: Boolean,
                    default: false,
                },
                fontSize: {
                    type: String,
                    default: '16px',
                },
                fontWeight: {
                    type: String,
                    default: 'none',
                }
            },
            setup: function (props, ctx) {
                var iRef = HHW.ref(null);
                HHW.onMounted(function () {
                    v.value = props.value;
                    if (iRef.value && iRef.value.$refs.input.parentNode.style && iRef.value.$refs.input.parentNode.style) {
                        var style = iRef.value.$refs.input.parentNode.style;
                        style.boxShadow = 'none';
                        if (props.height)
                            style.height = props.height;
                    }
                });
                var v = HHW.ref('');
                HHW.watch(function () { return props.value; }, function (after, before) {
                    v.value = after;
                });
                HHW.watch(function () { return v.value; }, function (after, before) {
                    ctx.emit("update", after);
                    ctx.emit("update:value", after);
                });
                function blur() {
                    if (iRef.value && iRef.value.$refs.input.parentNode.style && iRef.value.$refs.input.parentNode.style) {
                        var style = iRef.value.$refs.input.parentNode.style;
                        style.boxShadow = 'none';
                    }
                    ctx.emit("blur", v.value);
                }
                function focus() {
                    if (iRef.value && iRef.value.$refs.input.parentNode.style && iRef.value.$refs.input.parentNode.style) {
                        var style = iRef.value.$refs.input.parentNode.style;
                        style.boxShadow = '0 0 0 1px #409eff inset';
                    }
                }
                return {
                    blur: blur,
                    focus: focus,
                    iRef: iRef,
                    v: v
                };
            },
            template: "\n<div style=\"display: inline-block; cursor: pointer;\"> \n    <el-input class=\"edit_input\" :disabled=\"disabled\" v-model=\"v\" @blur=\"blur\" @focus=\"focus\" placeholder=\"\" \n        :style=\"{width: width, lineHeight: lineHeight, textAlign: 'center', border: 'unset',  fontSize: fontSize, fontWeight: fontWeight}\" ref=\"iRef\"></el-input>\n</div>  "
        };
    }
    HHW.getEditInput = getEditInput;
    function getLoadSelect() {
        return {
            directives: {
                'lazy-load': {
                    updated: function (el, binding, vnode) {
                        if (el.childNodes[1].attributes["aria-describedby"] && !this.status) {
                            this.status = true;
                            var id = el.childNodes[1].attributes["aria-describedby"].value;
                            var DOM = document.querySelector("#".concat(id, " .el-select-dropdown .el-select-dropdown__wrap"));
                            DOM.addEventListener('scroll', function listener() {
                                /**
                                 * scrollHeight 获取元素内容高度(只读)
                                 * scrollTop 获取或者设置元素的偏移值,常用于, 计算滚动条的位置, 当一个元素的容器没有产生垂直方向的滚动条, 那它的scrollTop的值默认为0.
                                 * clientHeight 读取元素的可见高度(只读)
                                 * 如果元素滚动到底, 下面等式返回true, 没有则返回false:
                                 * ele.scrollHeight - ele.scrollTop === ele.clientHeight;
                                 */
                                var condition = this.scrollHeight - this.scrollTop <= (this.clientHeight + 50);
                                if (condition) {
                                    binding.value(); //执行v-lazy-load的方法
                                }
                            });
                        }
                    }
                }
            },
            props: {
                modelValue: {
                    type: Array,
                    default: [],
                },
                title: {
                    type: String,
                    default: '请选择',
                },
                options: {
                    type: Array,
                    default: []
                },
                eval: {
                    type: Function,
                    default: function (itemList) {
                        return itemList[1] + "[" + itemList[0] + "]";
                    },
                },
                filterFuc: {
                    type: Function,
                    default: function (itemList, query) {
                        var a = function (item, query) {
                            if (!item)
                                return false;
                            if (typeof item == "number") {
                                return item.toString().indexOf(query) > -1;
                            }
                            else {
                                return item.indexOf(query) > -1;
                            }
                        };
                        if (itemList) {
                            for (var i = 0; i < itemList.length; i++) {
                                if (a(itemList[i], query)) {
                                    return true;
                                }
                            }
                        }
                        return false;
                    },
                }
            },
            data: function () {
                return {
                    status: false,
                    query: '',
                    queryList: [],
                    itemList: [],
                    itemSum: 0,
                    value: [],
                };
            },
            methods: {
                getMaxLen: function (max) {
                    return max > this.queryList.length ? this.queryList.length : max;
                },
                loadMore: function () {
                    for (var i = 0; i < 10; i++) {
                        if (this.queryList[this.itemSum]) {
                            this.itemList.push(this.queryList[this.itemSum]);
                            this.itemSum++;
                        }
                    }
                },
                remote_method: function (query) {
                    var self = this;
                    self.itemList = [];
                    self.itemSum = 0;
                    self.query = query;
                    self.queryList = [];
                    if (query) {
                        self.queryList = self.options.filter(function (itemList) {
                            return self.filterFuc(itemList, query);
                        });
                        self.itemSum = self.getMaxLen(20); //默认20
                        for (var i = 0; i < self.itemSum; i++) {
                            self.itemList.push(self.queryList[i]);
                        }
                    }
                },
            },
            watch: {
                value: function (a, b) {
                    this.$emit("update:modelValue", a);
                }
            },
            template: "\n<el-select v-model=\"value\" size=\"large\" :placeholder=\"title\" multiple remote filterable v-lazy-load=\"loadMore\"\n    :remote-method=\"remote_method\" >\n    <el-option v-for=\"item in itemList\" :key=\"item[0]\" :value=\"item[0]\" :label=\"eval(item)\"></el-option>\n</el-select>"
        };
    }
    HHW.getLoadSelect = getLoadSelect;
    function getDialogWhitAct() {
        return {
            emits: ["oj8k", "cancel"],
            data: function () {
                var obj_check = function (rule, value, cb) {
                    if (value) {
                        try {
                            JSON.parse(value);
                            return cb();
                        }
                        catch (e) {
                            return cb("配置有误");
                        }
                    }
                    else {
                        return cb();
                    }
                };
                var arr_check = function (rule, value, cb) {
                    if (value) {
                        try {
                            var list = JSON.parse(value);
                            if (!(list instanceof Array))
                                return cb("配置有误");
                            return cb();
                        }
                        catch (e) {
                            return cb("活动配置有误");
                        }
                    }
                    else {
                        return cb();
                    }
                };
                return {
                    rule: {
                        content: [{
                                validator: arr_check, trigger: 'change'
                            }],
                        giftbag: [{
                                validator: arr_check, trigger: 'change'
                            }],
                        rank: [{
                                validator: obj_check, trigger: 'change'
                            }],
                        task: [{
                                validator: arr_check, trigger: 'change'
                            }],
                        buy: [{
                                validator: arr_check, trigger: 'change'
                            }],
                        sItemIds: [{
                                validator: arr_check, trigger: 'change'
                            }],
                        ext: [{
                                validator: obj_check, trigger: 'change'
                            }],
                        roomMap: [{
                                validator: obj_check, trigger: 'change'
                            }],
                        beginTime: [{ required: true, message: '开启不能为空', trigger: 'change' }]
                    },
                    formData: {},
                    oldData: {},
                    visible: false,
                    actType_list: [],
                    data: {},
                    cfg_map: {},
                    info: null,
                    idx: null,
                };
            },
            props: {
                modelValue: {
                    type: Boolean,
                    default: false,
                },
            },
            mounted: function () {
                this.init();
                HHW.hMitt.on("init" /* CONST.EVENT.init */, this.handleClose2);
                HHW.hMitt.on("cfg_act_list" /* CONST.EVENT.cfg_act_list */, this.initActList);
                HHW.hMitt.on("cfg_act" /* CONST.EVENT.cfg_act */, this.initAct);
                HHW.hMitt.on("reset_batch" /* CONST.EVENT.reset_batch */, this.searchAct);
                HHW.eval('getActTypeList', null);
            },
            destroyed: function () {
                HHW.hMitt.off("init" /* CONST.EVENT.init */, this.handleClose2);
                HHW.hMitt.off("cfg_act_list" /* CONST.EVENT.cfg_act_list */, this.initActList);
                HHW.hMitt.off("cfg_act" /* CONST.EVENT.cfg_act */, this.initAct);
                HHW.hMitt.off("reset_batch" /* CONST.EVENT.reset_batch */, this.searchAct);
            },
            computed: {
                unShow: function () {
                    return !this.formData.type || !this.formData.batchId;
                },
                actType_list2: function () {
                    this.init();
                    return this.actType_list.filter(function (info) {
                        if (info && HHW.cfgMap["c_act"] && HHW.cfgMap["c_act"][info.type]) {
                            return info;
                        }
                    });
                }
            },
            methods: {
                initActList: function (rst) {
                    if (!HHW.isEmptyObject(rst)) {
                        this.actType_list = rst;
                    }
                },
                initAct: function (rst) {
                    if (!HHW.isEmptyObject(rst)) {
                        this.data = rst;
                    }
                },
                reset: function () {
                    var _this = this;
                    if (!this.formData.batchId) {
                        HHW.showErr("请选择要重置的活动");
                        return;
                    }
                    HHW.confirm("确定重置该活动批次吗", function () {
                        HHW.eval('resetBatch', { batchId: _this.formData.batchId });
                    });
                },
                sync: function () {
                    if (!this.formData.batchId) {
                        HHW.showErr("请选择要同步配置的活动");
                        return;
                    }
                    if (!this.formData.type) {
                        HHW.showErr("请选择活动类型");
                        return;
                    }
                    if (!this.formData.tempId) {
                        HHW.showErr("请选择活动模板");
                        return;
                    }
                    var info = this.info;
                    if (!info) {
                        HHW.showErr("模板数据不存在");
                        return;
                    }
                    this.formData.content = info.content;
                    this.formData.giftbag = info.giftbag;
                    this.formData.rank = info.rank;
                    this.formData.task = info.task;
                    this.formData.buy = info.buy;
                    this.formData.sItemIds = info.sItemIds;
                    this.formData.ext = info.ext;
                    HHW.showSuccess('同步结束');
                },
                init: function (status) {
                    this.oldData = {};
                    this.formData.batchId = '';
                    this.formData.name = '';
                    this.formData.status = 0;
                    this.formData.beginTime = '';
                    this.formData.endTime = '';
                    this.formData.showEndTime = '';
                    this.formData.noticeId = 0;
                    this.formData.content = '';
                    this.formData.giftbag = '';
                    this.formData.rank = '';
                    this.formData.task = '';
                    this.formData.buy = '';
                    this.formData.sItemIds = '';
                    this.formData.ext = '';
                    this.formData.roomMap = '';
                    if (!status) {
                        this.formData.type = '';
                        this.formData.tempId = '';
                        this.info = null;
                        this.idx = null;
                    }
                },
                getBetween: function (dataStr1, dataStr2) {
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
                },
                ok: function () {
                    var _this = this;
                    var self = this;
                    if (this.unShow) {
                        HHW.showWarn("已取消配置");
                        this.$emit('cancel');
                    }
                    else {
                        self.$refs.ruleForm.validate(function (valid) {
                            if (valid) {
                                var list = [];
                                list[0] = { type: "batch", cnd: { id: _this.formData.batchId }, data: { effType: 0 } };
                                list[1] = { type: "temp", cnd: { id: _this.formData.tempId }, data: {} };
                                var beginTime = typeof self['formData']["beginTime"] == 'string' ? self['formData']["beginTime"] : HHW.dateFormat(self['formData']["beginTime"]);
                                var endTime = typeof self['formData']["endTime"] == 'string' ? self['formData']["endTime"] : HHW.dateFormat(self['formData']["endTime"]);
                                var showEndTime = typeof self['formData']["showEndTime"] == 'string' ? self['formData']["showEndTime"] : HHW.dateFormat(self['formData']["showEndTime"]);
                                HHW.output(self['formData']);
                                self['formData']["beginTime"] = beginTime;
                                for (var key in self['formData']) {
                                    if (key == 'type' || key == 'tempId')
                                        continue;
                                    if (self['formData'][key] != self.oldData[key]) {
                                        if (["ext", "content", "giftbag", "rank", "task", "buy", "sItemIds"].indexOf(key) > -1) {
                                            if (self['formData'][key]) {
                                                list[1].data[key] = JSON.parse(self['formData'][key]);
                                            }
                                            else {
                                                list[1].data[key] = self['formData'][key];
                                            }
                                        }
                                        else if (key == "roomMap") {
                                            if (self['formData'][key]) {
                                                list[0].data[key] = JSON.parse(self['formData'][key]);
                                            }
                                            else {
                                                list[0].data[key] = self['formData'][key];
                                            }
                                        }
                                        else if (key == "name") {
                                            list[1].data["name"] = self['formData'][key];
                                            list[0].data["name"] = self['formData'][key];
                                        }
                                        else if (key == "endTime") {
                                            list[0].data["duration"] = self.getBetween(endTime, beginTime);
                                        }
                                        else if (key == "showEndTime") {
                                            list[0].data["duration_after"] = self.getBetween(showEndTime, endTime);
                                        }
                                        else {
                                            list[0].data[key] = self['formData'][key];
                                        }
                                    }
                                }
                                HHW.eval("configurationAct", { cfgList: list });
                                self.$emit('oj8k');
                                self.init(1);
                            }
                            else {
                                HHW.showErr("表单校验失败");
                            }
                        });
                    }
                },
                handleClose: function () {
                    this.init();
                    HHW.showWarn("已取消配置");
                    this.$emit('cancel');
                },
                handleClose2: function () {
                    this.init();
                    this.$emit('cancel');
                },
                searchAct: function () {
                    this.init(1);
                    if (!this.formData.type) {
                        HHW.showErr("请选择活动类型");
                        return;
                    }
                    if (!this.formData.tempId) {
                        HHW.showErr("请选择活动模板");
                        return;
                    }
                    HHW.eval("searchActInfo", { info: this.info });
                },
                showLabel: function (info) {
                    return "活动类型:[" + info.type + "] 模板:[" + info.ID + "]  " + info.name + "";
                },
                getKey: function (item) {
                    return item.ID + '-' + item.type;
                }
            },
            watch: {
                modelValue: function (val) {
                    this.visible = val;
                },
                data: function (val) {
                    if (val && val.type == this.formData.type) {
                        for (var key in this.formData) {
                            if (val[key] || val[key] == 0) {
                                this.formData[key] = val[key];
                            }
                            this.oldData[key] = val[key];
                        }
                    }
                },
                idx: function (val) {
                    var info = this.info = this.actType_list2[val];
                    if (info) {
                        this.formData.tempId = info.ID;
                        this.formData.type = info.type;
                        this.init(1);
                    }
                    else {
                        this.init();
                    }
                }
            },
            template: "\n<el-dialog v-model=\"visible\" title=\"\u6D3B\u52A8\u914D\u7F6E\" width=\"550px\" :before-close=\"handleClose\">\n    <el-form :model=\"formData\" :rules=\"rule\" ref=\"ruleForm\" label-width=\"100px\" class=\"demo-ruleForm\">\n        <el-form-item label=\"\u6D3B\u52A8\u7C7B\u578B\">\n            <el-select  filterable clearable v-model=\"idx\" style=\"width: 300px\">\n                <el-option v-for=\"(item, idx) in actType_list2\" :key=\"getKey(item)\" :label=\"showLabel(item)\" :value=\"idx\"/>\n            </el-select>\n        </el-form-item>\n        <el-form-item label=\"\u6A21\u677Fid\" prop=\"tempId\" v-show=\"formData.type\">\n            <el-input v-model=\"formData.tempId\" disabled style=\"width: 60%\" :disabled=\"true\"></el-input>\n        </el-form-item>\n        <el-form-item>\n            <el-button type=\"primary\" @click=\"searchAct\">\u5F00\u542F\u914D\u7F6E</el-button>\n        </el-form-item>\n        <br><hr><br>\n        <div v-if=\"!unShow\">\n            <el-form-item label=\"\u6279\u6B21\" prop=\"batchId\">\n                <el-input v-model=\"formData.batchId\" style=\"width: 60%\" :disabled=\"true\"></el-input>\n            </el-form-item>\n            <el-form-item label=\"\u6D3B\u52A8\u540D\u79F0\" prop=\"name\">\n                <el-input v-model=\"formData.name\" style=\"width: 60%\"></el-input>\n            </el-form-item>\n            <el-form-item label=\"status\" prop=\"status\">\n                <el-input v-model=\"formData.status\" style=\"width: 60%\"></el-input>\n             </el-form-item>\n            <el-form-item label=\"\u6D3B\u52A8\u5F00\u542F\" prop=\"beginTime\">\n                <el-date-picker v-model=\"formData.beginTime\" format=\"YYYY/MM/DD HH:mm:ss\"></el-date-picker>\n            </el-form-item>\n            <el-form-item label=\"\u6D3B\u52A8\u7ED3\u675F\" prop=\"endTime\">\n                <el-date-picker v-model=\"formData.endTime\" format=\"YYYY/MM/DD HH:mm:ss\"></el-date-picker>\n            </el-form-item>\n            <el-form-item label=\"\u6D3B\u52A8\u5C55\u793A\u671F\" prop=\"showEndTime\">\n                <el-date-picker  v-model=\"formData.showEndTime\" format=\"YYYY/MM/DD HH:mm:ss\"></el-date-picker>\n            </el-form-item>\n            <el-form-item label=\"\u516C\u544Anotice\" prop=\"noticeId\">\n                <el-input v-model=\"formData.noticeId\" style=\"width: 60%\"></el-input>\n            </el-form-item>\n            <el-form-item label=\"\u914D\u7F6Econtent\" prop=\"content\">\n                <el-input type=\"textarea\" :rows=\"2\" v-model=\"formData.content\"></el-input>\n            </el-form-item>\n            <el-form-item label=\"\u6D3B\u52A8\u793C\u5305\" prop=\"giftbag\">\n                <el-input type=\"textarea\" :rows=\"2\" v-model=\"formData.giftbag\"></el-input>\n            </el-form-item>\n            <el-form-item label=\"\u6392\u884C\u5956\u52B1\" prop=\"rank\">\n                <el-input type=\"textarea\" :rows=\"2\" v-model=\"formData.rank\"></el-input>\n            </el-form-item>\n            <el-form-item label=\"\u4EFB\u52A1\u5956\u52B1\" prop=\"task\">\n                <el-input type=\"textarea\" :rows=\"2\" v-model=\"formData.task\"></el-input>\n            </el-form-item>\n            <el-form-item label=\"\u5546\u5E97\" prop=\"buy\">\n                <el-input type=\"textarea\" :rows=\"2\" v-model=\"formData.buy\"></el-input>\n            </el-form-item>\n            <el-form-item label=\"\u663E\u793A\u9053\u5177\" prop=\"sItemIds\">\n                <el-input type=\"textarea\" :rows=\"2\" v-model=\"formData.sItemIds\"></el-input>\n            </el-form-item>\n            <el-form-item label=\"ext\" prop=\"ext\">\n                <el-input type=\"textarea\" :rows=\"2\" v-model=\"formData.ext\"></el-input>\n            </el-form-item>\n             <el-form-item label=\"\u8DE8\u670D\u5206\u7EC4\u914D\u7F6E\" prop=\"roomMap\">\n                <el-input type=\"textarea\" :rows=\"2\" v-model=\"formData.roomMap\"></el-input>\n            </el-form-item>\n        </div>\n    </el-form>\n    <template #footer>\n        <span class=\"dialog-footer\">\n            <el-button @click=\"handleClose\">\u53D6 \u6D88</el-button>\n            <el-button type=\"primary\" @click=\"ok\">\u786E \u5B9A</el-button>\n            <el-button type=\"primary\" @click=\"sync\">\u540C\u6B65\u914D\u7F6E</el-button>\n            <el-button type=\"primary\" @click=\"reset\">\u65B0\u5F00\u6279\u6B21</el-button>\n        </span>\n    </template>\n</el-dialog>\n    "
        };
    }
    HHW.getDialogWhitAct = getDialogWhitAct;
})(HHW || (HHW = {}));
/// <reference path="./basics.ts" />
var HHW;
/// <reference path="./basics.ts" />
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
                var usrData = HHW.ref({});
                var loops = [];
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
                    // 加载 usr 表数据
                    loops.push(setInterval(function () {
                        HHW.eval2('HHW.getUsrData()', function (result) {
                            usrData.value = result;
                        });
                    }, 100));
                });
                HHW.onUnmounted(function () {
                    HHW.hMitt.off("test_request" /* CONST.EVENT.test_request */, initTestRequest);
                    HHW.hMitt.off("init_data" /* CONST.EVENT.init_data */, initData);
                    HHW.hMitt.off("update_proxy_data" /* CONST.EVENT.update_proxy_data */, init);
                    HHW.hMitt.off("procedure_list" /* CONST.EVENT.procedure_list */, initProcedureList);
                    loops.forEach(function (loop) { return clearInterval(loop); });
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
                    usrData: usrData,
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
            template: "\n<div>\n    <div v-if=\"personalMess\">\n        <div>\n            <el-descriptions title=\"\" :column=\"1\" border style=\"width: 220px\">\n              <el-descriptions-item label=\"\u91D1\u5E01\">{{ usrData.gld }}</el-descriptions-item>\n              <el-descriptions-item label=\"\u94BB\u77F3\">{{ usrData.dmd }}</el-descriptions-item>\n            </el-descriptions>\n            <p class=\"center_font3\">{{ personalMess }}</p>\n            <p class=\"center_font2\" style=\"margin-left: 50px\">\u5B58\u50A8\u5668\u6267\u884C:</p>\n            <el-select style=\"width: 200px; margin-top: -10px\" v-model=\"procedure_name\" filterable allow-create>\n                <el-option v-for=\"item in procedure_list\" :key=\"item.name\" :label=\"item.ext + '(' + item.name + ')'\" :value=\"item.name\"></el-option>\n            </el-select>\n            <el-button style=\"margin-left: 15px; margin-top: -10px\" type=\"success\" @click=\"callP(procedure_name)\">\u6267\u884C</el-button>\n<!--            <p class=\"center_font2\" style=\"margin-left: 50px\">\u5FEB\u901F\u8C03\u8BD5:</p>-->\n<!--            <hhw-edit-input v-model:value=\"quick_name\" height=\"25px\" lineHeight=\"10px\" width=\"180px\" style=\"margin-left: 10px;\"></hhw-edit-input>-->\n<!--            <el-button style=\"margin-left: 15px; margin-top: -7px\" type=\"success\" size=\"small\" @click=\"callQ(quick_name)\">\u6267\u884C</el-button>-->\n        </div>\n        <el-tabs v-model=\"activeName\" tab-position=\"left\" style=\"margin-top: 20px; border-radius: 4px; min-height: 200px; background-color: white\">\n            <el-tab-pane label=\"\u9053\u5177\u6DFB\u52A0\" name=\"item\">\n                <div style=\"margin-left: 10px\">\n                    <div style=\"padding-left: 10px;\">\n                        <br><br>\n                        <hhw-load-select v-model=\"item_select_list\" :options=\"c_item_list\" title=\"\u8BF7\u9009\u62E9\u8981\u9053\u5177\" style=\"width: 500px\"></hhw-load-select>\n                        <el-input-number style=\"display: block; margin-top: 10px;\" v-model=\"item_num\" :min=\"-9999999999\" :max=\"9999999999\"/>\n                    </div>\n                    <el-button style=\"margin: 10px 10px\" type=\"primary\" @click=\"addItem\">\u6DFB\u52A0\u9053\u5177</el-button>\n                </div>                                         \n            </el-tab-pane>\n            <el-tab-pane label=\"\u63A5\u53E3\u8C03\u8BD5\" name=\"interface\">\n                <div style=\"margin-left: 10px\">\n                    <br><br>\n                    <el-select style=\"width: 300px;\" v-model=\"iface_name\" placeholder=\"\u8BF7\u586B\u5199\u63A5\u53E3\u540D\" filterable allow-create @change=\"changeIfaceName\">\n                        <el-option v-for=\"item in testRequest_list\" :key=\"item.name\" :label=\"'(' + item.name + ')' +item.ext\" :value=\"item.name\"></el-option>\n                    </el-select>\n                    <br><br>\n                    <el-input type=\"textarea\" :rows=\"2\" placeholder=\"\u63A5\u53E3\u8BF7\u6C42\u6CE8\u91CA\u5185\u5BB9\" v-model=\"note\"></el-input>\n                    <br><br>\n                    <el-button type=\"primary\" @click=\"addOne\">\u6DFB\u52A0\u53C2\u6570</el-button>\n                    <el-button style=\"margin-left: 10px\" type=\"success\" @click=\"updateTestQequest\">\u8BF7\u6C42\u63A5\u53E3</el-button>\n                    <br><br>\n                    \u5355\u6B21\u8BF7\u6C42\u63A5\u53E3\u6B21\u6570<el-input v-model=\"once_times\" style=\"width: 120px\"></el-input>\n                    \u8FDE\u7EED\u8BF7\u6C42\u6B21\u6570<el-input v-model=\"exec_times\" style=\"width: 120px\"></el-input>\n                    \u8FDE\u7EED\u8BF7\u6C42\u95F4\u9694\uFF08\u6BEB\u79D2\uFF09<el-input v-model=\"interval_time\" style=\"width: 120px\"></el-input>\n                    <hr><br>\n                    <div style=\"margin-bottom: 15px\" v-for=\"(item, idx) in args\" :key=\"idx\">\n                        <el-input style=\"width: 100px\" v-model=\"item[0]\" placeholder=\"\u53C2\u6570\u540D\"></el-input>\n                        <el-input style=\"width: 200px; margin-left: 10px; margin-right: 10px\" v-model=\"item[1]\" placeholder=\"\u53C2\u6570\u503C\"></el-input> \n                        <el-button type=\"danger\" @click=\"delOne(idx)\" >\u5220\u9664</el-button>     \n                    </div>\n                </div>\n            </el-tab-pane>                      \n        </el-tabs>\n    </div>\n    <p v-else class=\"center_font2\" style=\"color: aliceblue\">\u8BF7\u5148\u8FDB\u5165\u6E38\u620F</p>\n</div>            \n            ",
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
                var fixList2 = [
                    { value: '[0]', label: '报名结束' },
                    { value: '[1]', label: '海选赛' },
                    { value: '[2]', label: '海选赛结束' },
                    { value: '[3, 1, 1]', label: '64强第一场' },
                    { value: '[3, 1, 2]', label: '64强第二场' },
                    { value: '[3, 1, 3]', label: '64强第三场' },
                    { value: '[3, 2, 1]', label: '32强第一场' },
                    { value: '[3, 2, 2]', label: '32强第二场' },
                    { value: '[3, 2, 3]', label: '32强第三场' },
                    { value: '[3, 3, 1]', label: '16强第一场' },
                    { value: '[3, 3, 2]', label: '16强第二场' },
                    { value: '[3, 3, 3]', label: '16强第三场' },
                    { value: '[3, 4, 1]', label: '8强第一场' },
                    { value: '[3, 4, 2]', label: '8强第二场' },
                    { value: '[3, 4, 3]', label: '8强第三场' },
                    { value: '[3, 5, 1]', label: '4强第一场' },
                    { value: '[3, 5, 2]', label: '4强第二场' },
                    { value: '[3, 5, 3]', label: '4强第三场' },
                    { value: '[3, 6, 1]', label: '半决赛第一场' },
                    { value: '[3, 6, 2]', label: '半决赛强第二场' },
                    { value: '[3, 6, 3]', label: '半决赛强第三场' },
                    { value: '[3, 7, 1]', label: '决赛第一场' },
                    { value: '[3, 7, 2]', label: '决赛第二场' },
                    { value: '[3, 7, 3]', label: '决赛第三场' },
                    { value: '[3, 7, 4]', label: '决赛第四场' },
                    { value: '[3, 7, 5]', label: '决赛第五场' },
                    { value: '[4]', label: '活动结算' },
                ];
                // 巅峰赛补操作
                function peakFix() {
                    dialogArgs.value = [
                        ['batchId', '活动批次'],
                        ['roomId', '房间id'],
                        ['step', '阶段', 'select', null, null, fixList2],
                        ['type', '是否一键', 'select', 0, null, [{ value: 0, label: '否' }, { value: 1, label: '是' }]],
                        ['num', '海选场数'],
                    ];
                    dialogRules.value = [['batchId']];
                    dialogExt.value = { handler: 'peakFix' };
                    dialogVisible.value = true;
                }
                function oneKeyJoinFml() {
                    dialogArgs.value = [
                        ['batchId', '活动批次'],
                    ];
                    dialogRules.value = [['batchId']];
                    dialogExt.value = { handler: 'oneKeyJoinFml' };
                    dialogVisible.value = true;
                }
                function oneKeyFight() {
                    dialogArgs.value = [
                        ['batchId', '活动批次'],
                    ];
                    dialogRules.value = [['batchId']];
                    dialogExt.value = { handler: 'oneKeyFight' };
                    dialogVisible.value = true;
                }
                function gbFix() {
                    var fixList = [
                        { value: '[0]', label: '第一阶段结算' },
                        { value: '[1, 2]', label: '8强结算' },
                        { value: '[1, 3]', label: '4强结算' },
                        { value: '[1, 4]', label: '2强结算' },
                        { value: '[2]', label: '第二阶段结算' },
                        { value: '[3]', label: '活动结算' },
                    ];
                    dialogArgs.value = [
                        ['batchId', '活动批次'],
                        ['roomId', '房间id'],
                        ['step', '阶段', 'select', null, null, fixList],
                    ];
                    dialogRules.value = [['batchId']];
                    dialogExt.value = { handler: 'gbFix' };
                    dialogVisible.value = true;
                }
                // 巅峰赛一键报名
                function oneKeySignUp() {
                    dialogArgs.value = [
                        ['batchId', '活动批次'],
                    ];
                    dialogRules.value = [['batchId']];
                    dialogExt.value = { handler: 'oneKeySignUp' };
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
                    peakFix: peakFix,
                    oneKeyJoinFml: oneKeyJoinFml,
                    oneKeyFight: oneKeyFight,
                    gbFix: gbFix,
                    oneKeySignUp: oneKeySignUp
                };
            },
            template: "\n<div>\n    <hhw-dialog v-model=\"dialogVisible\" :args=\"dialogArgs\" :rules=\"dialogRules\" :ext=\"dialogExt\" @oj8k=\"oj8k\" @cancel=\"cancel\"></hhw-dialog>\n    <div v-if=\"id\">\n        <hhw-button :active=\"true\" type=\"3\" @click=\"addRobot\" name=\"\u6DFB\u52A0\u673A\u5668\u4EBA\"></hhw-button>\n        <hhw-button :active=\"true\" type=\"4\" @click=\"addRobotToRb\" name=\"\u53C2\u52A0\u6392\u4F4D\u8D5B\u673A\u5668\u4EBA\"></hhw-button>\n        <hhw-button :active=\"true\" type=\"11\" @click=\"addRobotToPeak\" name=\"\u53C2\u52A0\u5DC5\u5CF0\u8D5B\u673A\u5668\u4EBA\"></hhw-button>\n        <hhw-button :active=\"true\" type=\"11\" @click=\"oneKeySignUp\" name=\"\u672C\u670D\u5DC5\u5CF0\u8D5B\u4E00\u952E\u62A5\u540D\"></hhw-button>\n        <hhw-button :active=\"true\" type=\"8\" @click=\"fixPeak\" name=\"\u5DC5\u5CF0\u8D5B\u6D3B\u52A8\u5FEB\u901F\u64CD\u4F5C\"></hhw-button>\n        <hhw-button :active=\"true\" type=\"8\" @click=\"peakFix\" name=\"\u5DC5\u5CF0\u8D5B\u8865\u64CD\u4F5C\"></hhw-button>\n        <hhw-button :active=\"true\" type=\"8\" @click=\"oneKeyJoinFml\" name=\"\u516C\u4F1A\u6218\u4E00\u952E\u52A0\u5165\u516C\u4F1A\"></hhw-button>\n        <hhw-button :active=\"true\" type=\"8\" @click=\"oneKeyFight\" name=\"\u516C\u4F1A\u6218\u4E00\u952E\u6253boss\"></hhw-button>\n        <hhw-button :active=\"true\" type=\"8\" @click=\"gbFix\" name=\"\u516C\u4F1A\u6218\u8865\u64CD\u4F5C\"></hhw-button>\n    </div>\n    <p v-else class=\"center_font2\" style=\"color: aliceblue\">\u8BF7\u5148\u8FDB\u5165\u6E38\u620F</p>\n</div>            \n            ",
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
            template: "\n<div>\n    <hhw-dialog v-model=\"dialogVisible\" :args=\"dialogArgs\" :rules=\"dialogRules\" :ext=\"dialogExt\" @oj8k=\"oj8k\" @cancel=\"cancel\"></hhw-dialog>\n    <hhw-dialog-act v-model=\"popup_act\" @oj8k=\"close_act\" @cancel=\"close_act\"></hhw-dialog-act>\n    <div v-if=\"id\">\n        <div style=\"width: 100%; margin-top: 10px;\">\n            <el-button size=\"default\" style=\"margin-left: 10px\" type=\"primary\" @click=\"refreshAct\">\u6D3B\u52A8\u5237\u65B0</el-button>\n            <el-button size=\"default\" style=\"margin-left: 10px\" type=\"primary\" @click=\"configuration\">\u6D3B\u52A8\u914D\u7F6E</el-button>\n        </div>    \n        <div style=\"width: 100%; margin-top: 5px; box-shadow:0px 5px 8px rgba(0, 0, 0, 0.6); padding-top: 15px;\">\n            <hhw-table v-model=\"act_list\" :col_data_list=\"columns\" :oper_list=\"opers\" :oper_width=\"220\"></hhw-table>\n        </div>    \n    </div>    \n    <p v-else class=\"center_font2\" style=\"color: aliceblue\">\u8BF7\u5148\u8FDB\u5165\u6E38\u620F</p>\n</div>            \n            ",
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
    function router_center_panel2_0() {
        return {
            setup: function (props, ctx) {
                var id = HHW.ref(0);
                var dialogArgs = HHW.ref(null);
                var dialogRules = HHW.ref(null);
                var dialogExt = HHW.ref(null);
                var dialogVisible = HHW.ref(false);
                HHW.onMounted(function () {
                    HHW.hMitt.on("update_proxy_data" /* CONST.EVENT.update_proxy_data */, init);
                    init();
                });
                HHW.onUnmounted(function () {
                    HHW.hMitt.off("update_proxy_data" /* CONST.EVENT.update_proxy_data */, init);
                });
                /**
                 * 初始化数据
                 */
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
                function cancel() { dialogVisible.value = false; }
                /**
                 * 修改玩家等级
                 */
                function updateUsrLevel() {
                    dialogArgs.value = [['level', '目标等级']];
                    dialogExt.value = { handler: 'updateUsrLevel', uid: id };
                    dialogVisible.value = true;
                }
                return {
                    // param
                    id: id,
                    dialogArgs: dialogArgs,
                    dialogRules: dialogRules,
                    dialogExt: dialogExt,
                    dialogVisible: dialogVisible,
                    // fun
                    oj8k: oj8k,
                    cancel: cancel,
                    updateUsrLevel: updateUsrLevel
                };
            },
            template: "\n<div>\n    <hhw-dialog v-model=\"dialogVisible\" :args=\"dialogArgs\" :rules=\"dialogRules\" :ext=\"dialogExt\" @oj8k=\"oj8k\" @cancel=\"cancel\"></hhw-dialog>\n    <div v-if=\"id\">\n        <el-row :gutter=\"20\">\n            <el-col :span=\"6\">\n                <el-button type=\"primary\" plain @click=\"updateUsrLevel\">\u4FEE\u6539\u73A9\u5BB6\u7B49\u7EA7</el-button>\n            </el-col>\n            <el-col :span=\"6\"><div class=\"grid-content bg-purple\"></div>\n            </el-col>\n            <el-col :span=\"6\"><div class=\"grid-content bg-purple\"></div>\n            </el-col>\n            <el-col :span=\"6\"><div class=\"grid-content bg-purple\"></div>\n            </el-col>\n        </el-row>\n    </div>\n    <p v-else class=\"center_font2\" style=\"color: aliceblue\">\u8BF7\u5148\u8FDB\u5165\u6E38\u620F</p>\n</div>\n            ",
        };
    }
    HHW.router_center_panel2_0 = router_center_panel2_0;
    /**
     * 模板参考，直接复制来用
     */
    function template() {
        return {
            setup: function (props, ctx) {
                var id = HHW.ref(0);
                HHW.onMounted(function () {
                    init();
                });
                HHW.onUnmounted(function () {
                });
                function init() {
                    id.value = HHW.proxy_data.id || 0;
                }
                return {
                    id: id
                };
            },
            template: "\n<div>\n    <div v-if=\"id\"></div>\n    <p v-else class=\"center_font2\" style=\"color: aliceblue\">\u8BF7\u5148\u8FDB\u5165\u6E38\u620F</p>\n</div>\n            ",
        };
    }
    HHW.template = template;
})(HHW || (HHW = {}));
/// <reference path="./page.ts" />
var HHW;
/// <reference path="./page.ts" />
(function (HHW) {
    HHW.routes = [
        {
            path: '/',
            redirect: '/center'
        },
        {
            path: '/center',
            component: HHW.router_center(),
            children: [
                {
                    path: "usrInfo" /* CONST.MENU.usrInfo */,
                    component: HHW.router_center_usrInfo(),
                },
                {
                    path: "appList" /* CONST.MENU.appList */,
                    component: HHW.router_center_appList(),
                },
                {
                    path: "egret" /* CONST.MENU.egret */,
                    component: HHW.router_center_egret(),
                },
                {
                    path: "actList" /* CONST.MENU.actList */,
                    component: HHW.router_center_actList(),
                },
                {
                    path: "teamCfg" /* CONST.MENU.teamCfg */,
                    component: HHW.router_center_teamCfg(),
                },
                {
                    path: "robot" /* CONST.MENU.robot */,
                    component: HHW.router_center_robot(),
                },
                {
                    path: "panel2_0" /* CONST.MENU.panel2_0 */,
                    component: HHW.router_center_panel2_0()
                }
            ],
        },
    ];
    HHW.router = VueRouter.createRouter({
        history: VueRouter.createWebHashHistory(),
        routes: HHW.routes,
    });
    HHW.router.beforeEach(function (to, from, next) {
        // console.log("路由跳转了");
        if (from && from.path === "/" && to && to.path !== "/center") {
            next({
                path: "/center",
            });
        }
        else {
            next();
        }
    });
    HHW.router.afterEach(function () {
        window.scrollTo(0, 0);
    });
})(HHW || (HHW = {}));
/// <reference path="./component.ts" />
/// <reference path="./router.ts" />
var HHW;
/// <reference path="./component.ts" />
/// <reference path="./router.ts" />
(function (HHW) {
    var App = {};
    HHW.app = Vue.createApp(App);
    HHW.app.use(ElementPlus, {
        locale: zhCn
    })
        .use(HHW.router)
        .component('hhw-dialog', HHW.getDialog())
        .component('hhw-table', HHW.getTable())
        .component('hhw-button', HHW.getButton())
        .component('hhw-edit-input', HHW.getEditInput())
        .component('hhw-load-select', HHW.getLoadSelect())
        .component('hhw-dialog-act', HHW.getDialogWhitAct())
        .mount('#app');
})(HHW || (HHW = {}));
