/// <reference path="../common.ts" />
/// <reference path="./mitt.ts" />
/// <reference path="./request.ts" />
module CONST {
    export const menuList = [
        {
            name: "个人数据",
            path: CONST.MENU.usrInfo,
        },
        {
            name: "操作面板",
            path: CONST.MENU.panel2_0
        },
        {
            name: "游戏入口",
            path: CONST.MENU.teamCfg,
        },
        {
            name: "活动配置",
            path: CONST.MENU.actList,
        },
        {
            name: "机器人",
            path: CONST.MENU.robot,
        },
        {
            name: "进程重启",
            path: CONST.MENU.appList,
        },
        {
            name: "Egret",
            path: CONST.MENU.egret,
        },
    ];
}
module HHW {
    export let app;
    export const ref = Vue.ref;
    export const reactive = Vue.reactive;
    export const onMounted = Vue.onMounted;
    export const onBeforeMount = Vue.onBeforeMount;
    export const onUnmounted = Vue.onUnmounted;
    export const computed = Vue.computed;
    /** 当组件在 <keep-alive> 内被切换时，它的 mounted 和 unmounted 生命周期钩子不会被调用，
     * 取而代之的是 activated 和 deactivated。(这会运用在 <keep-alive> 的直接子节点及其所有子孙节点。 */
    export const onActivated = Vue.onActivated;
    export const onDeactivated = Vue.onDeactivated;

    export const watch = Vue.watch;
    export const useRouter = VueRouter.useRouter;
    export const useRoute = VueRouter.useRoute;

    export function showErr(message) {
        ElementPlus.ElMessage["error"]({ message: message, type: "error", center: true });
    }

    export function showWarn(message) {
        ElementPlus.ElMessage({ message: message, type: "warning", center: true });
    }

    export function showSuccess(message) {
        ElementPlus.ElMessage({ message: message, type: "success", center: true });
    }


    /** 确认框 */
    export function confirm(msg: string, onOk: () => void) {
        ElementPlus.ElMessageBox.confirm(msg, "提示", {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            onOk();
        }).catch(() => {
            showWarn("已取消");
        })
    }

    /** 执行存储过程 _ 分割 */
    export function callProcedure(procedure_name: string) {
        if (!proxy_data.id) {
            showErr("麻烦先进游戏");
            return;
        }
        if (!procedure_name) {
            showErr("请填写需要执行的存储过程");
            return;
        }
        confirm("确定执行？", () => {
            eval('callProcedure', {name: procedure_name, uid: proxy_data.id})
        });
    }

    /** 执行快速命令 方法名?参数1=值1&参数2=值2 */
    export function callQuick(quick_name: string) {
        return showWarn('该功能还未开放');
        // if (!proxy_data.id) {
        //     showErr('麻烦先进游戏');
        //     return;
        // }
        if (!quick_name) {
            showErr('请填写参数');
            return;
        }
        confirm("确定执行？", () => {
            eval('callQuick', {name: quick_name, uid: proxy_data.id})
        });
    }


    /** 玩家数据 */
    export const proxy_data = new Proxy<DevInitData>({}, {
        get(target, propKey, receiver) {
            return target[propKey];
        },
        set(target, propKey, value, receiver) {
            target[propKey] = value;
            if (propKey == 'id') hMitt.emit(CONST.EVENT.uid_update);
            return true;
        }
    })

    /** 配置表数据 */
    export let cfgMap: CfgInfo = {};
}
