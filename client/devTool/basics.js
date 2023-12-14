/// <reference path="../common.ts" />
/// <reference path="./mitt.ts" />
/// <reference path="./request.ts" />
var CONST;
(function (CONST) {
    CONST.menuList = [
        {
            name: "个人数据",
            path: "usrInfo" /* CONST.MENU.usrInfo */,
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
