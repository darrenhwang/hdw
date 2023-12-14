module HHW {
    
    //开关
    const _switchMap = {
        syncData: false,
        watch_egret: false,
        light_egret: false,
    };

    // 控制开关
    export function changeSwitch(args) {
        let key = args.key;
        let isOpen = args.isOpen;
        if (_switchMap.hasOwnProperty(key)) {
            _switchMap[key] = !!isOpen;

            let msg = isOpen ? "打开" : "关闭";
            console.log("开关" + key + "已被" + msg);
            //key特殊判断
            switch (key) {
                case CONST.SWITCH.syncData:
                    if (isOpen) {
                        mo.NET.gsMgr.on('G.ISyncData', _surveySyncData)
                    } else {
                        mo.NET.gsMgr.un('G.ISyncData', _surveySyncData)
                    }
                    break;
                case CONST.SWITCH.light_egret:
                    if (isOpen) {
                        if (!hasEgretPlugin()) {
                            sendData(CONST.EVENT.init_egret_fail);
                            _switchMap[key] = false;
                        }
                    } else {
                        el_expand.drawTarget();
                    }
                    break;
                case CONST.SWITCH.listen_egret:
                    if (isOpen) {
                        if (!hasEgretPlugin()) {
                            sendData(CONST.EVENT.init_egret_fail);
                            _switchMap[key] = false;
                        } else {
                            tree_change(true);
                        }
                    } else {
                        hhw_hashMap = {};
                        hhw_tree = {};
                    }
                    break;
            }
        }
    }

    // 获取开关参数
    export function getSwitchMap(key) {
        return _switchMap[key];
    }

    // 特殊处理SyncData开关
    function _surveySyncData(route, arg, data) {
        if (route == "gs.usr.heartTick" || route == "server.heartbeat.hb") return;

        console.log("请求服务端啦！！ " + mo.DATE.fmt(mo.DATE.date()))
        let obj = {
            "请求路由": route,
            "请求参数": arg,
            "服务端返回数据": data
        }
        console.log(obj)
    }
}