/// <reference path="./cfg.ts" />
/// <reference path="./test.ts" />
/// <reference path="./robot.ts" />
/// <reference path="./act.ts" />
module HHW {
    export let teamX = '';
    export let appList = [];

    //获取当前区服
    export function getGsGrpId() {
        return G.UT.getGsIdx(G.usrCtrl.id);
    }

    export function refresh() {
        let curLayer = mo.moduleMgr.curModule.target.subLayerMgr.curLayer;
        curLayer.close();
        curLayer.show();
    }

    export function reconnection() {
        mo.NET.gsMgr.net.socket.src.close();
    }

    export function enter(cb?) {
        G.loginMgr.enter((err, sync) => {//再次登录
            if (cb) cb(sync);
            else {
                sendMessToDevTool("执行成功");
            }
        })
    }

    export function devInit(): DevInitData {
        let usrCtrl = G.usrCtrl;
        let fmlCtrl = G.fmlCtrl;
        return {
            id: usrCtrl.id,
            accName: usrCtrl.accName,
            did: usrCtrl.did,
            name: usrCtrl.name,
            fmlId: fmlCtrl.id,
        }
    }

    /**
     * bst加密
     * @param event
     * @param sync
     */
    export function bstSign(event: string, sync: any) {
        let appList = event.split('.')[0].split('|');
        let from = {"projName":"zw","envName": HHW.database_pre ? 'env-local' : "zw-" + teamX,"appName":"gm","areaId":0,"grpId":0,"compId":0,"localIpList":[window.location.hostname]};
        let list = [
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
                "dsName":"G.ISyncData","isFull":1
            }
            ,null];

        let a = mo.CRYPTO.enCharCode(JSON.stringify(list), null);
        let sign = mo.MD5.sign(a, null);
        let str = '$#|#$' + `{"e":"request","d":{"r":"bst","p":{"sign":"${sign}","a":"${a}"},"k":"${mo.DATE.now()}-${mo.NUM.rand(1e4)}"}}`;
        return str;
    }

    export function reqHHW(module: string, method: string, args: any, cb?: (rst) => void) {
        if (!args) args = {};
        args.hhw_team = teamX;
        args.hhw_isHw = G.isHw();
        args.hhw_gsIdx = getGsGrpId();
        args.hhw_clientV = mo.PROJ.version;

        if (database_pre) args.hhw_team = HHW.database_pre;

        postReq({
            module,
            method,
            args
        }, (err, rst) => {
            if (err) sendMessToDevTool(err, CONST.MESS_TYPE.err);
            else if (rst.err) {
                sendMessToDevTool(rst.err, CONST.MESS_TYPE.err);
            }
            else if (cb) {
                cb(rst.data);
            }
        });
    }

    (function init() {
        let pathList = window.location.pathname.split('/');
        teamX = pathList[1];

        if (isMo()) {
            bulidSocket();

            mo.emitter.on("onModuleChanged", function(go, from){
                if (getSwitchMap(CONST.SWITCH.listen_egret)) {//开关有开启
                    setTimeout(function() {
                        tree_change(true);
                    }, 200)
                }
            })

            G.loginMgr.cnnMgr.on("ON_LOGIN", () => {
                sendData(CONST.EVENT.on_login);
            })

            mo.NET.gsMgr.on('G.ISyncData', (route, arg, sync) => {
                if (sync) {
                    if (sync.actTot && sync.actTot.actList) {
                        setTimeout(() => {
                            sendData(CONST.EVENT.update_act);
                        }, 1000);
                    }
                }
            })

            setTimeout(() => {

                getCfgMap();
                getTestQequestList();
                getTeamCfg();

                reqHHW('app', 'getList', null, (rst) => {
                    appList = rst;
                    sendData(CONST.EVENT.app_list);
                })

                reqHHW('test', 'getProcedureList', null, (rst) => {
                    procedureList = rst;
                    sendData(CONST.EVENT.procedure_list);
                })

                sendData(CONST.EVENT.init_data);
            }, 2000)
        }
    })()
}
