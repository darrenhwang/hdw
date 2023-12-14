module HHW {
    export function addRobotToRb(args) {
        reqHHW('robot', 'addRobotToRb', args, (rst) => {
            sendMessToDevTool('添加机器人至排位赛成功');
        })
    }

    export function addRobot(args) {
        reqHHW('robot', 'addRobot', args, (rst) => {
            sendMessToDevTool('添加机器人成功');
        })
    }

    export function addRobotToPeak(args) {
        if (!G.peakCtrl) {
            sendMessToDevTool('巅峰赛不存在');
        } else if (!G.peakCtrl.isExist()) {
            sendMessToDevTool('巅峰赛活动不存在', CONST.MESS_TYPE.err);
        } else if (G.peakCtrl.room.status > 0) {
            sendMessToDevTool('巅峰赛报名阶段已结束:' + mo.DATE.fmt(G.peakCtrl.ctrl.regTimeEnd), CONST.MESS_TYPE.err);
        } else {
            args.batchId = G.peakCtrl.batchId;
            args.roomId = G.peakCtrl.roomId;
            reqHHW('robot', 'addRobotToPeak', args, (rst) => {
                sendMessToDevTool('添加机器人至巅峰赛成功');
            })
        }
    }
}