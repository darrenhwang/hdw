module HHW {
    export function getActList() {
        if (isEmptyObject(G.gMgr.actMgr.mbMap)) return [];

        let actList = [];
        for (let key in G.gMgr.actMgr.mbMap) {
            let act = G.gMgr.actMgr.mbMap[key];
            actList.push({
                batchId: act.batchId,
                beginTime: mo.DATE.fmt(act.beginTime),
                endTime: mo.DATE.fmt(act.endTime),
                tempId: act.tmpId,
                showEndTime: mo.DATE.fmt(act.invisibleTime),
                name: act.name,
                status: act.isShow ? 1 : 0,
                type: act.tmp.type,
            });
        }
        return actList;
    }

    export function configurationAct(args: any) {
        if (!args) args = {};
        args.bstList = [bstSign('peak.refreshCAct', {}), bstSign('gsm.refreshAct', {})];
        reqHHW('test', 'configurationAct', args, (rst) => {
            sendMessToDevTool('活动配置成功');
        })
    }

    export function refreshAct(args: any) {
        if (!args) args = {};
        args.flag = true;
        args.bstList = [bstSign('peak.refreshCAct', {}), bstSign('gsm.refreshAct', {})];
        reqHHW('test', 'refreshAct', args, (rst) => {})
    }

    export function resetBatch(args) {
        if (!args) args = {};
        args.bstList = [bstSign('peak.refreshCAct', {}), bstSign('gsm.refreshAct', {})];
        reqHHW('test', 'resetBatch', args, (rst) => {
            sendData(CONST.EVENT.reset_batch, null);
        })
    }

    export function getActTypeList(args) {
        reqHHW('test', 'getActTypeList', args, (rst) => {
            sendData(CONST.EVENT.cfg_act_list, rst);
        })
    }

    export function searchActInfo(args) {
        reqHHW('test', 'searchActInfo', args, (rst) => {
            if (rst) {
                sendData(CONST.EVENT.cfg_act, rst);
            }
        })
    }
}