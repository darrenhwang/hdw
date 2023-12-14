module CONST {
    export const identity_key = "HHWTOOL";//身份标识

    /** 交互事件 */
    export const enum EVENT {
        /** inject初始化完成 */
        init = 'init',
        /** 游戏数据初始化完毕 */
        init_data = 'init_data',
        /** 消息 */
        mess = 'mess',
        /** 活动发生变化 */
        update_act = 'update_act',
        /** 玩家登录 */
        on_login = 'on_login',
        /** 获取app */
        app_list = 'app_list',
        /** proxy_data更新 */
        update_proxy_data = 'update_proxy_data',
        /** egret初始化 */
        init_egret = 'init_egret',
        /** egret点击 */
        click_egret = 'click_egret',
        /** egret初始化失败 */
        init_egret_fail = 'init_egret_fail',
        /** 存储过程列表 */
        procedure_list = 'procedure_list',
        /** socket连接成功 */
        connect_success = 'connect_success',
        /** testRequest列表跟新 */
        test_request = 'test_request',
        /** team配置列表 */
        team_list = 'team_list',
        /** 活动配置数据 */
        cfg_act = 'cfg_act',
        /** 活动配置类型列表 */
        cfg_act_list = 'cfg_act_list',
        /** 重置批次 */
        reset_batch = 'reset_batch',

        /******************************  纯dev事件 ************************/

        /** uid发生变化 */
        uid_update = 'uid_update',
    }

    export const enum SOCKET_EVENT {
        /** testRequest修改 */
        testRequest = 'testRequest',
        /** team发生变化 */
        teamCfgUpdate = "teamCfgUpdate",
        /** webSocket错误事件 */
        errMsg = "errMsg",
        /** webSocket成功事件 */
        successMsg = "successMsg",
        /** 活动刷新 */
        update_act = "update_act",
    }

    export const enum MESS_TYPE {
        success = 0,
        err = 1,
        warn = 2,
    }

    export const enum SWITCH {
        /** 控制syncData监听 */
        syncData = 'syncData',
        /** 控制egret监听 */
        listen_egret = 'watch_egret',
        /** 控制egret是否高亮 */
        light_egret = 'light_egret',
    }

    export const enum OSTYPE {
        ipod = 'ipod',
        ipad = 'ipad',
        iphone = 'iphone',
        android = 'android',
        /** 客户端型号: IOS产品 */
        mac_os = 'Mac OS',
        pc = 'pc',
    }

    export const enum MENU {
        /** 个人数据 */
        usrInfo = 'usrInfo',
        /** 进程重启 */
        appList = 'appList',
        /** Egret */
        egret = 'egret',
        /** 机器人 */
        robot = 'robot',
        /** 活动配置 */
        actList = 'actList',
        /** team配置 */
        teamCfg = 'teamCfg',
    }
}

module HHW {
    export interface CfgInfo {
        /** 道具表 */
        c_item?: [number, string][];
        /** 道具表 */
        c_item_map?: {[id: number]: string};
        /** 活动描述 */
        c_act?: {[id: number]: string};
    }

    export interface IHhw {
        /** 存储器名 */
        name?: string;
        /** 描述 */
        ext?: string;
        /** 存储过程 */
        text?: string;
    }

    export interface ITestRequest {
        /** 接口名 */
        name?: string;
        /** 参数 */
        args?: any;
        /** 备注 */
        ext?: string;
    }

    export interface ITeamCfg {
        /** team名字 */
        name?: string;
        /** 拓展 */
        ext?: any;
        /** url和描述配置 */
        cfgList?: any[];
    }

    export interface CfgTestInfo {
        /** 模板id */
        ID?: string;
        /** 活动名字 */
        name?: string;
        /** 活动类型 */
        type?: string;
        /** 达标奖励 */
        content?: string;
        /** 礼包奖励 */
        giftbag?: string;
        /** 排行奖励 */
        rank?: string;
        /** 任务奖励 */
        task?: string;
        /** 商店 */
        buy?: string;
        /** 活动开启显示道具 */
        sItemIds?: string;
        /** 额外扩展信息 */
        ext?: string;
    }

    export interface EgretInfo {
        hashCode?: number;
        name?: string;
        class_name?: string;
        label?: string;
        visible?: boolean;
        x?: number;
        y?: number;
        width?: number;
        height?: number;
        data?: any;
        source?: string;
        skinName?: string;
        touchEnabled?: boolean;
        zIndex?: number;
        icon?: string;
        resModule?: string;
        text?: string;
        __label__?: string;
        children?: EgretInfo[];

        disabled_list?: string[];
    }

    export interface DevInitData {
        /** 玩家id */
        id?: number,
        /** 接管名 */
        accName?: string,
        /** 玩家key */
        did?: string,
        /** 玩家名字 */
        name?: string,
        /** 宫会id */
        fmlId?: number,
    }

    export interface HErrorInfo {
        /** 类型 */
        type: string;
        /** error下的message */
        message?: string;
        /** error下的stack */
        stack?: string;
        /** 发生错误的列号 */
        colno?: number;
        /** 发生错误的行号 */
        lineno?: number;
        /** 报错代码文件名 */
        filename?: string
        /** 模块名 */
        module?: string;
        subModules?: string[];
        layerList?: string[];
        args?: any[];
    }

    export interface HClickInfo {
        /** 类型手机还是web */
        type: string;
        /** 高度 */
        h: number;
        /** 宽度 */
        w: number;
        /** 点击坐标 xy*/
        position: number[];
        /** 模块名 */
        module?: string;
        subModules?: string[];
        layerList?: string[];
    }

    export const $ = {
        "()": /\([^)]*\)/gi,
        "[]": /\[[^\]]*\]/gi,
        "{}": /\{[^}]*\}/gi
    }

    export function getKuoHao(str: string, type: '()' | '{}' | '[]' =  '()', idx: number = 0): string {
        let v =  str.match($[type])[idx];
        if (!v) return '';
        return v.substring(1, v.length - 2);
    }

    export function delKuoHao(str: string, type: '()' | '{}' | '[]' =  '()' ): string {
        return str.replace($[type], '');
    }

    //对象合并
    export function merge<T = any>(target: T, ...sources: any[]): T {
        if (!sources.length) return target;
        const source = sources.shift();
        if (source === undefined) return target;
        if (source === null) return merge(target, ...sources);
        if (typeof source !== 'object') return merge(target, ...sources);
        if (Array.isArray(source)) {
            if (!Array.isArray(target)) target = [] as any;
            (target as any).push(...source);
            return merge(target, ...sources);
        }
        if (typeof target !== 'object') target = {} as any;
        if (target === null) target = {} as any;
        Object.keys(source).forEach(key => {
            if (source[key] && typeof source[key] === 'object') {
                if (!target[key]) Object.assign(target, { [key]: {} });
                merge(target[key], source[key]);
            } else {
                Object.assign(target, { [key]: source[key] });
            }
        });
        return merge(target, ...sources);
    }

    //判断对象为空
    export function isEmptyObject(obj: any): boolean {
        if (!obj || typeof obj !== 'object' || Array.isArray(obj)) return false;
        return !Object.keys(obj).length;
    }

    /**
     * 替换占位符
     * @param str
     * @param newV
     * @param oldV
     */
    export function replaceAll(str: string, newV: string, oldV: string = '%s'): string {
        if (!str) return '';
        return str.replace(new RegExp(oldV, 'g'), newV);
    }

    //文本转换成html格式
    export function text2html(str: string): string {
        if (!str) return '';
        return str.replace(/\n/g, '<br/>');
    }

    //文本格式化
    export function format(str: string, ...args: any[]): string {
        if (!str) return '';
        let i = 0;
        return str.replace(/%s/g, () => {
            return args[i++];
        });
    }

    //时间格式化 yyyy-MM-dd hh:mm:ss
    export function dateFormat(date: Date, fmt: string = 'yyyy-MM-dd hh:mm:ss'): string {
        let o: any = {
            "M+": date.getMonth() + 1,                 //月份
            "d+": date.getDate(),                    //日
            "h+": date.getHours(),                   //小时
            "m+": date.getMinutes(),                 //分
            "s+": date.getSeconds(),                 //秒
            "q+": Math.floor((date.getMonth() + 3) / 3), //季度
            "S": date.getMilliseconds()             //毫秒
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (let k in o)
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    }
}
