module HHW {
    export let webSocket;
    let connecting = false;//与服务端连接状态
    let connect_num = 0;//连接次数
    let reconnect_limit = 10;//重连次数限制
    const io = socketIo.io;

    /**
     * 建立socket连接
     */
    export function bulidSocket() {
        if (connecting == true) {
            return;
        };

        if (webSocket) {
            connect_num = 0;
            webSocket.open(); // 手动重连
            return;
        }


        let url = `ws://${HHW.host}:${HHW.port}`;
        webSocket = io(url, {
            reconnection: false,
        });

        // 连接成功
        webSocket.on("connect", webSocketOnOpen)
        // 断开连接
        webSocket.on("disconnect", reconnect);
        // 错误
        webSocket.on("error", reconnect)
        // 连接错误
        webSocket.on("connect_error", reconnect);
        // 重连成功
        webSocket.on("reconnect", webSocketOnOpen);
        // 重连尝试错误
        webSocket.on("reconnect_error", reconnect);

        webSocket.on("message", webSocketOnMessage);
    }

    /** socket重连 */
    function reconnect() {
        connecting = false;
        setTimeout(() => {
            if (connect_num < reconnect_limit) {
                connect_num++;
                console.error("hhw socket重连" + connect_num + '次');
                webSocket.connect(); // 手动重连
            } else {
                console.error("hhw socket重连失败即将关闭");
                webSocket.close();
            }
        }, 5000)
    }

    /** socket连接成功 */
    function webSocketOnOpen() {
        connecting = true;
        connect_num = 0;
        sendData(CONST.EVENT.connect_success);
    }
    // 获取到后台消息的事件，操作数据的代码在onmessage中书写
    function webSocketOnMessage(data) {
        // res就是后台实时传过来的数据
        if (data) {
            try {
                data = JSON.parse(data);
                for (let key in data) {
                    if (key == CONST.SOCKET_EVENT.testRequest) {
                        getTestQequestList();
                    } else if (key == CONST.SOCKET_EVENT.teamCfgUpdate) {
                        getTeamCfg();
                    } else if (key == CONST.SOCKET_EVENT.errMsg && data[key]) {
                        sendMessToDevTool(data[key], CONST.MESS_TYPE.err);
                    } else if (key == CONST.SOCKET_EVENT.successMsg && data[key]) {
                        sendMessToDevTool(data[key]);
                    } else if (key == CONST.SOCKET_EVENT.update_act) {
                        enter((sync) => {//重新获取活动信息
                            let mbMap =  G.gMgr.actMgr.mbMap = G.gMgr.actMgr.mbMap || {};
                            let actList = sync?.actTot?.actList || [];
                            let list = [];
                            for (let i = 0; i < actList.length; i++) {
                                list.push(actList[i].batchId);
                            }
                            let flag = false;
                            for (let key in mbMap) {
                                if (list.indexOf(parseInt(key)) == -1) {
                                    flag = true;
                                    delete mbMap[key];
                                }
                            }
                            if (flag) {
                                mo.MSG.show('有人用插件关掉了活动，即将重置界面');
                                setTimeout(() => {
                                    refresh();
                                    G.UTIL.closeAllDlg([]);
                                }, 2000);
                            };
                            if (data[key]) sendMessToDevTool(data[key]);
                        })
                    }
                }
            } catch (e) {
                console.log(e);
                console.log(data);
            }
        }
    }

    /** 发送请求 */
    export function webSocketSend(params, cb?: (response: any) => void) {
        if (!webSocket || !connecting) {
            sendMessToDevTool('hhw socket未连接', CONST.MESS_TYPE.err);
            return;
        }
        if (typeof params != "object") {
            webSocket.emit("message", JSON.stringify({ msg: params }), cb);
        } else {
            webSocket.emit("message", JSON.stringify(params), cb);
        }
    }

    //模块请求
    export function wsReq(module: string, method: string, args: any, cb?: (response: any) => void) {
        let params = {
            module,
            method,
            args
        }
        webSocketSend(params, cb);
    }
}
