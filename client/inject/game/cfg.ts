module HHW {
    export let cfgMap: CfgInfo = {
        "c_item": [],
        "c_item_map": {},
        "c_act": {},
    }
    let request;
    export function getCfgMap() {
        for (let key in cfgMap) {
            if (["c_item_map"].indexOf(key) > -1) {
                continue;
            }
            else if (["c_act"].indexOf(key) > -1) {
                if (!mo.OBJ.isEmpty(cfgMap[key])) {
                    continue;
                }
                mo.D.each(key, function (temp, id) {
                    if (temp.id > 0) {
                        cfgMap[key][temp.id] = temp.name;
                    }
                })
            }
            else if (!cfgMap[key].length) {
                // const is_item = key == "c_item";
                // mo.D.each(key, function (temp, id) {
                //     if (temp.id > 0) {
                //         if (is_item) {
                //             cfgMap["c_item_map"][temp.id] = temp.name;
                //         }
                //         let list = [temp.id, temp.name];
                //         cfgMap[key].push(list);
                //     }
                // })
                if (!request) {
                    var team = window.location.href.match(/team\d+|/)[0];
                    var url = (team == "" ? "" : team + "/") + "resource/zh/data/g-data.json";
                    request = new egret.HttpRequest();
                    request.addEventListener(egret.Event.COMPLETE, function () {
                        let cfg = parseCfg(JSON.parse(request.response));
                        let c_item = cfg["c_item"];
                        let nameKey = c_item.colMap.name;
                        let value = c_item.list[0].v;
                        let itemList = [];
                        console.log("cfg", cfg);
                        for (let i in value) {
                            itemList.push([+i, value[i][nameKey]]);
                        }
                        HHW.cfgMap["c_item"] = itemList;
                        HHW.sendData("init_data" /* CONST.EVENT.init_data */, itemList);
                        request = null;
                    }, null);
                    request.open(url);
                    request.send();
                }
            }
        }
        return cfgMap;
    }
    function parseCfg(a){var e={},l={};if(a){var n=a._;delete a._;var t=null;for(var f in n&&n instanceof Array&&n.length&&(t=mo.STR.genUk("cfg",!0),l[t]=n),a){var i=a[f];if(i){var o=i.a;o&&(f=mo.CRYPTO.deCharCode("["+f+"]",o));var v=e[f]=e[f]||{a:o,list:[]};t&&(v.b=t),i.f&&(v.f=1);for(var c=["c","d","m"],g=0;g<c.length;g++){var s=c[g],h=i[s];if(h){if(o)try{h=JSON.parse(mo.CRYPTO.deCharCode("["+h+"]",o))}catch(r){}v[s]=h}}v.m?v.colMap=v.m:v.colMap||(v.colMap=i.colMap),delete v.m;var p=v.colMap||{},d=v.e={};for(var C in p)if("$"!=C){var m=p[C];d[m]=u(f+"#"+m,2)}var T=i.list;if(T)for(g=0;g<T.length;g++){var O=T[g];if(!mo.OBJ.isEmpty(O)){if(o)for(var S=["d"],$=0;$<S.length;$++){var y=S[$];if(O[y])try{O[y]=JSON.parse(mo.CRYPTO.deCharCode("["+O[y]+"]",o))}catch(r){}}v.list.push(O)}}}}}function u(r,a){for(var n=0,e=0;e<r.length;e++){n+=r.charCodeAt(e)}return a&&(n%=Math.pow(10,Math.min(a,5))),n}return e}
}
