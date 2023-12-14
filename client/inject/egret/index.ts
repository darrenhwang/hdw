/// <reference path="./HClick.ts" />
/// <reference path="./El_expand.ts" />
module HHW {
    export let egret_player;
    let egret_stage;
    let egret_devTool;
    export let hhw_test;//当前点击hashCode的hhw_test实例
    export let hhw_hashMap;
    export let hhw_tree: EgretInfo;

    export function mousedown(target) {
        tree_change();
        hhw_test = target;
        sendData(CONST.EVENT.click_egret, target.$hashCode);
        // console.log(target);
    }

    export function tree_change(force?: boolean) {
        let rst = el_expand.$show_tree();
        if (!force && hhw_hashMap && Object.keys(hhw_hashMap).length == Object.keys(rst.hashMap).length) {
            return;
        }
        hhw_hashMap = rst.hashMap;
        hhw_tree = rst.tree
        sendData(CONST.EVENT.init_egret, hhw_tree);
        el_expand.drawTarget();
    }

    export function init_egret() {
        if (hasEgret() && !egret_player) {
            egret_player = document.querySelector(".egret-player")["egret-player"];
            egret_stage = egret_player.stage;

            egret_devTool = egret.devtool;
            if (egret_devTool && egret_devTool.EgretMetricMask && egret_devTool.EgretMetricMask.prototype.drawTarget) {
                /**
                 * t 操作实例对象
                 * num_H 16进制数字
                 */
                egret_devTool.EgretMetricMask.prototype.drawTarget_hhw = function (t, num_H) {
                    var r = {x: 0, y: 0};
                    if (t.scrollRect) {
                        r.x = t.scrollRect.x;
                        r.y = t.scrollRect.y
                    }
                    if (t.mask) {
                        r.x = t.mask.x;
                        r.y = t.mask.y
                    }
                    var i = t.width, n = t.height;
                    var s = t.localToGlobal(r.x, r.y), a = t.localToGlobal(r.x + i, r.y),
                        h = t.localToGlobal(r.x + i, r.y + n), l = t.localToGlobal(r.x, r.y + n);
                    var color = num_H ? parseInt(num_H,16) : 16711935;
                    var u = this.shape.graphics;
                    u.moveTo(s.x - .5, s.y - .5);
                    u.lineStyle(1, color, .5);
                    u.beginFill(color, .2);
                    u.lineTo(a.x - .5, a.y - .5);
                    u.lineTo(h.x - .5, h.y - .5);
                    u.lineTo(l.x - .5, l.y - .5);
                    u.lineTo(s.x - .5, s.y - .5);
                    u.endFill()
                }
            }
        }
    }

    export function egret_highlight(agrs) {
        if (agrs && agrs.hashCode && hhw_hashMap && hhw_hashMap[agrs.hashCode]) {
            el_expand.drawTarget(hhw_hashMap[agrs.hashCode], agrs.isDraw);
        } else {
            el_expand.drawTarget();
        }
    }

    export function consoleIns() {
        if (!hhw_test) {
            sendMessToDevTool('未选中实例', CONST.MESS_TYPE.warn);
        } else {
            console.warn('当前选中实例', hhw_test);
        }
    }

    export function egret_change(agrs) {
        let node = hhw_hashMap[agrs.hashCode];
        if (!node) {
            sendMessToDevTool("数据异常，修改失败", CONST.MESS_TYPE.err);
            return;
        }
        let first_key = el_expand.keyMap[agrs.nameList[0]];
        if (!agrs.nameList || !first_key) {
            sendMessToDevTool("该参数不支持数据修改", 1);
            return;
        }
        let val: any = node;
        for (let i = 0; i < agrs.nameList.length; i++) {
            let key = agrs.nameList[i];
            if (i == 0) {
                key = first_key;
            }
            if (i == agrs.nameList.length - 1) {
                if (typeof val[key] == 'string') {
                    val[key] = agrs.value;
                } else {
                    val[key] = eval(agrs.value);
                }
            } else {
                val = val[key];
                if (!val) break;
            }
        }
        setTimeout(function() {
            node[first_key] = node[first_key];
        }, 200)
    }

    (function () {
        setTimeout(() => {
            init_egret();
        }, 2000);
    })()
}
