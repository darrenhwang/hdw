module HHW {

    /**
     * console.log 可能无法打印到控制台
     * @param data
     */

    export function updateUsrLevel(data) {
        if (!data || !data.level || data.level <= 0) {
            return sendMessToDevTool('等级不能为 0', CONST.MESS_TYPE.err);
        }
        const sql: string = `UPDATE g_usr SET lvl = ${data.level} WHERE id = ${data.extra_ext.uid}`

        reqHHW('iface2_0', 'execSql2GS', {sql: sql}, (rst) => {
            // 重新登录刷新
            enter(() => {
                refresh();
                sendMessToDevTool('执行成功');
            })
        })
    }

}
