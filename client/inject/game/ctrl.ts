module HHW {
    /**
     * 谷歌好像设置了对象赋值长度上限，太大的对象或者递归属性都会导致代码中断，按要求加
     */
    export function getUsrData() {
        return G.gMgr.usrCtrl.$$data
    }
}