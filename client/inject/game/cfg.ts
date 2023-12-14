module HHW {
    export let cfgMap: CfgInfo = {
        "c_item": [],
        "c_item_map": {},
        "c_act": {},
    }

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
                const is_item = key == "c_item";
                mo.D.each(key, function (temp, id) {
                    if (temp.id > 0) {
                        if (is_item) {
                            cfgMap["c_item_map"][temp.id] = temp.name;
                        }
                        let list = [temp.id, temp.name];
                        cfgMap[key].push(list);
                    }
                })
            }
        }
        return cfgMap;
    }
}
