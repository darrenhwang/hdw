module HHW {
    export let procedureList: IHhw[] = [];
    export let testRequestList: ITestRequest[] = [];
    export let teamCfgList: ITeamCfg[] = [];

    export function callProcedure(args) {
        reqHHW('test', 'callProcedure', args, (rst) => {
            enter(() => {
                sendMessToDevTool('执行成功');
                refresh();
            })
        })
    }

    export function callQuick(args) {
        return sendMessToDevTool('暂未开发此功能');
        reqHHW('test', 'callQuick', args, (rst) => {
            enter(() => {
                sendMessToDevTool('执行成功');
            })
        })
    }

    export async function updateTestQequest(args) {
        for (let key in args.data.args) {
            try {
                args.data.args[key] = eval(args.data.args[key]);
            } catch (error) {
                //对象和字符窜报错
                try {
                    args.data.args[key] = JSON.parse(args.data.args[key]);
                } catch (error) {
                    //不管就是字符窜
                }
            }
        }

        let {once_times, interval_time, exec_times} = args.ext;
        let once_list = new Array(once_times).fill(1);

        async function once(): Promise<void> {
            return new Promise((resolve, reject) => {
                let promises = once_list.map(() => {
                    return request_mo2(args.cnd.name, args.data.args);
                })

                Promise.all(promises).then(function (sync_list: any[]) {
                    console.warn(sync_list);
                    resolve();
                }).catch(function(err){
                    console.error(err);
                    reject(err);
                });
            })
        }

        let flag = 1;

        function exec() {
            if (flag <= exec_times) {
                console.warn('第', flag, '次执行' + args.cnd.name + '的请求');
                once();
                flag++;
                setTimeout(() => {
                    exec();
                }, interval_time);
            } else {
                console.warn('执行' + args.cnd.name + '完成');
                reqHHW('test', 'updateTestQequest', args, (rst) => {})
            }
        }

        exec();

        //
        // let [err, data] = await request_mo2(args.cnd.name, args.data.args);
        // if (err) {
        //     sendMessToDevTool(err, 1);
        //     return console.error(err);
        // } else {
        //     sendMessToDevTool('执行成功, 请查看控制台结果');
        //     console.warn(args.cnd.name, '参数', args.data.args, '结果', data);
        //     refresh();
        //     reqHHW('test', 'updateTestQequest', args, (rst) => {
        //
        //     })
        // }
    }

    export function getTestQequestList() {
        reqHHW('test', 'getTestQequestList', null, (rst) => {
            testRequestList = rst;
            sendData(CONST.EVENT.test_request);
        })
    }

    export async function addItem(args) {
        try {
            let num = args.num;
            let bi = {};
            for (let itemId of args.list) {
                let [err, data] = await request_mo2('gs.index.testCmd', {'content': `item add ${itemId} ${num}`});
                if (data && data.oi && data.oi.bi) {
                    merge(bi, data.oi.bi);
                }
            }
            if (!isEmptyObject(bi)) {
                G.ShowGainDlg.show({gainList: bi});
            }
        } catch (e) {
           console.error(e);
           sendMessToDevTool('执行发生异常', CONST.MESS_TYPE.err);
        }
    }

    export function getTeamCfg() {
        reqHHW('test', 'getTeamCfg', null, (rst) => {
            teamCfgList = rst;
            sendData(CONST.EVENT.team_list);
        })
    }

    export function updateTeamExt(args) {
        reqHHW('test', 'updateTeamExt', args, (rst) => {

        })
    }

    export function fixPeak(args) {
        if (!G.peakCtrl) {
            sendMessToDevTool('巅峰赛不存在');
        } else if (!G.peakCtrl.isExist()) {
            sendMessToDevTool('巅峰赛活动不存在', CONST.MESS_TYPE.err);
        } else {
            if (!args.step) {
                sendMessToDevTool('请选择操作类型', CONST.MESS_TYPE.err);
                return;
            }
            let sync = {
                $ext: {
                    batchId: G.peakCtrl.batchId,
                    roomId: G.peakCtrl.roomId,
                    step: args.step[0],
                    roundId: args.step[1],
                    session: args.step[2],
                    num: args.num,
                    type: args.type,
                }
            }
            reqHHW('test', 'bst', {bst: bstSign('peak.fix', sync)})
        }

    }

    export function peakFix(args) {
        if (!G.peakCtrl) {
            sendMessToDevTool('巅峰赛不存在');
        } else if (!G.peakCtrl.isExist()) {
            sendMessToDevTool('巅峰赛活动不存在', CONST.MESS_TYPE.err);
        } else {
            if (!args || !args.step) {
                sendMessToDevTool('请选择操作类型', CONST.MESS_TYPE.err);
                return;
            }
            let sync = {
                $ext: {
                    batchId: G.peakCtrl.batchId,
                    roomId: G.peakCtrl.roomId,
                    step: args.step[0],
                    roundId: args.step[1],
                    session: args.step[2],
                    num: args.num,
                    type: args.type,
                }
            }
            reqHHW('test', 'bst', {bst: bstSign('peak.fix', sync)}, (rst) => {

            })
        }
    }

    export function oneKeyJoinFml(args) {
        if (!args) {
            sendMessToDevTool('传入参数错误', CONST.MESS_TYPE.err);
            return
        }
        const sync = {
            $ext: args
        }
        reqHHW('test', 'bst', {bst: bstSign('gb.oneKeyJoinFml', sync)}, (rst) => {

        })
    }

    export function oneKeyFight(args) {
        if (!args) {
            sendMessToDevTool('传入参数错误', CONST.MESS_TYPE.err);
            return
        }
        const sync = {
            $ext: args
        }
        reqHHW('test', 'bst', {bst: bstSign('gb.oneKeyFight', sync)}, (rst) => {

        })
    }

    export function gbFix(args) {
        if (!G.gbCtrl) {
            sendMessToDevTool('公会战不存在');
        } else if (!G.gbCtrl.isExist()) {
            sendMessToDevTool('公会战活动不存在', CONST.MESS_TYPE.err);
        } else {
            if (!args.step) {
                sendMessToDevTool('请选择操作类型', CONST.MESS_TYPE.err);
                return;
            }
            let sync = {
                $ext: {
                    batchId: G.gbCtrl.batchId,
                    roomId: G.gbCtrl.roomId,
                    step: args.step[0],
                    roundId: args.step[1],
                    type: args.type,
                }
            }
            reqHHW('test', 'bst', {bst: bstSign('gb.fix', sync)}, (rst) => {

            })
        }
    }

}
