module HHW {
    export function isMo() {
        return !!window['G'] && !!window['mo'] && !!window['G'].loginMgr;
    }

    //判断功能是否可以用
    export function hasEgret() {
        let el = document.querySelector(".egret-player");
        return egret && egret.devtool && el && el["egret-player"] && el["egret-player"].stage;
    }

    export function hasEgretPlugin() {
        if (currentInspector && currentInspector.mask && currentInspector.mask.drawTarget_hhw) {
            return true;
        } else {
            sendMessToDevTool('请初始化egret插件', CONST.MESS_TYPE.warn);
            console.error('请初始化egret插件');
            return false;
        }
    }
}
