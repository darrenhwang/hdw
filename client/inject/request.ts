module HHW {
    export const identity_key = CONST.identity_key + (new Date).getTime();//身份标识
    //* 通知content-script */
    export function sendData(type: CONST.EVENT | string, data?: any) {
        window.postMessage({
            source: CONST.identity_key,
            data: data,
            type,
            identity: identity_key,
        }, '*');
    }

    /**
     * devTool的消息弹窗
     * type 1: err 2: warn other: info
     */
    export function sendMessToDevTool(mess: string, type?: CONST.MESS_TYPE) {
        sendData(CONST.EVENT.mess, { mess: mess, t: type });
    }

    /** 请求hhw进程 */
    export function postReq(params, cb?: (err, rst) => void) {
        //hhw/?modules=setTime&method=update&args={'newDate':'${timeStr}'}`;
        let url = `http://${HHW.host}:${HHW.port}/hhw/`;
        mo.NET.post(url, params, (err, rst) => {
            if (rst && typeof rst == "string") rst = JSON.parse(rst);
            if (cb) cb(err, rst);
        })
    }

    export function request_mo(method, args, cb) {
        if (!G.gMgr.serverInfoMgr.isOpen('test99999')) {
            return;
        }
        if (!args) args = {};
        args.method = method;
        // G.gsRequest("test99999.testEnter", args, cb);
        mo.NET.gsMgr.requestWithErr("server.test99999.testEnter", args, cb, (err) => {
            sendMessToDevTool(err, CONST.MESS_TYPE.err);
        })
    }

    export function request_mo2(route: string, args: any): Promise<any> {
        return new Promise((resolve, reject) => {
            G.gMgr.gsMgr.requestWithErr(route, args, (data) => {
                resolve([null, data]);
            }, (err) => {
                resolve([err, null]);
            })
        })
    }

    window.addEventListener("message", function (messageEvent) {
        if (messageEvent && messageEvent.data) {
            let data = messageEvent.data;

            if (messageEvent && messageEvent.data) {
                let data = messageEvent.data;
                if (data.data == '{"name":"isDevToolOpen"}') {
                    hClick.init();
                    init_egret();//初始化egret
                }
            }
        }
    });

    sendData(CONST.EVENT.init);
}
