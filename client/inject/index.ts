/// <reference path="../common.ts" />
/// <reference path="./util.ts" />
/// <reference path="./switch.ts" />
/// <reference path="./webSocket.ts" />
/// <reference path="./request.ts" />
/// <reference path="./game/basics.ts" />
/// <reference path="./egret/index.ts" />
module HHW {
    export var port: number;
    export var database_pre: string;
    export var host: string;

    const _functionMap = {
        output,
        changeSwitch,
        changeTime,
        enter,
        reconnection,
        callProcedure,
        callQuick,
        restartApp,
        egret_change,
        egret_highlight,
        consoleIns,
        addItem,
        updateTestQequest,
        addRobot,
        addRobotToRb,
        addRobotToPeak,
        updateTeamExt,
        configurationAct,
        refreshAct,
        resetBatch,
        getActTypeList,
        searchActInfo,
        fixPeak,
        peakFix,
        oneKeyJoinFml,
        oneKeyFight,
        gbFix
    }

    export function inject_tool(key, arg) {
        if (!!_functionMap[key]) {
            return _functionMap[key](arg);
        } else {
            return null;
        }
    }

    /** 日志输出 */
    function output(args) {
        if (args.lv == CONST.MESS_TYPE.err) {
            console.error(args.str);
        } else if (args.lv == CONST.MESS_TYPE.warn) {
            console.warn(args.str);
        } else {
            console.log(args.str);
        }
    }

    /** 修改服务器时间 */
    function changeTime(args) {
        if (args && args.time) args.newDate = mo.DATE.fmt(mo.DATE.date(args.time));
        reqHHW('setTime', 'update', args, (rst) => {
            sendMessToDevTool('时间修改成功，请稍等');
        })
    }

    /** 重启进程 */
    function restartApp(args) {
        reqHHW('app', 'restart', args, (rst) => {
            sendMessToDevTool('进程重启完毕');
        })
    }

    let proxy_data = new Proxy<any>({}, {
        get(target, propKey, receiver) {
            return target[propKey]
        },
        set(target, propKey, value, receiver) {
            target[propKey] = value;
            return true;
        }
    })
}

