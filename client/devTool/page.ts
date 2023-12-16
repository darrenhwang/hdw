/// <reference path="./basics.ts" />
module HHW {
    export function router_center() {
        return {
            setup(props, ctx) {
                let router = new useRouter();
                let activeName = ref('');
                let menuList = CONST.menuList;
                let isMo = ref(false);
                let interval = null;

                onMounted(() => {
                    hMitt.on(CONST.EVENT.init, init);
                    hMitt.on(CONST.EVENT.on_login, onLogin);
                    init();
                    activeName.value = CONST.MENU.usrInfo;
                })

                onUnmounted(() => {
                    hMitt.off(CONST.EVENT.init, init);
                    hMitt.off(CONST.EVENT.on_login, onLogin);
                })

                watch(activeName, (newV, oldV) => {
                    router.push({path: addPath(activeName.value)});
                })

                function init() {
                    switchSync.value = false;

                    eval2("HHW.isMo()", (rst) => {
                        isMo.value = rst;

                        if (rst) {
                            if (interval) clearInterval(interval);
                            interval = setInterval(function () {
                                eval2('mo.DATE.fmt(mo.DATE.date())', function (rst) {
                                    if (rst) serverTime.value = rst;
                                })
                            }, 1000)

                            eval2("HHW.devInit()", (rst: DevInitData) => {
                                for (let key in rst) {
                                    proxy_data[key] = rst[key];
                                }
                                hMitt.emit(CONST.EVENT.update_proxy_data);
                            })
                        }
                    })
                }

                function onLogin() {
                    if (isMo.value) {
                        eval2("HHW.devInit()", (rst: DevInitData) => {
                            for (let key in rst) {
                                proxy_data[key] = rst[key];
                            }
                            hMitt.emit(CONST.EVENT.update_proxy_data);
                        })
                    }
                }

                function addPath(path) {
                    return "/center/" + path;
                }

                let dialogArgs = ref(null);
                let dialogRules = ref(null);
                let dialogExt = ref(null);
                let dialogVisible = ref(false);

                function oj8k(args) {
                    if (args.extra_ext && args.extra_ext.handler) {
                        eval(args.extra_ext.handler, args);
                    }
                    dialogVisible.value = false;
                }

                function cancel() {
                    dialogVisible.value = false;
                }

                let serverTime = ref("xxxx/xx/xx xx:xx:xx");

                function changeTime() {
                    dialogArgs.value = [['time', '服务器时间', 'time', serverTime.value], ['pass', '秘钥']];
                    dialogRules.value = [['time'],['pass']];
                    dialogExt.value = {handler: 'changeTime'};
                    dialogVisible.value = true;
                }

                let switchSync = ref(false);
                let switchSync_mess = computed(() => {
                    return switchSync.value ? '关闭' : '开启';
                });
                let syncColor = computed(() => {
                    return switchSync.value ? 'orange' : 'aliceblue';
                })

                function changeSwitchSync() {
                    switchSync.value = !switchSync.value;
                    eval('changeSwitch', {key: CONST.SWITCH.syncData, isOpen: !!switchSync.value});
                }

                function reconnection() {
                    eval('reconnection', null);
                }

                function enter() {
                    eval('enter', null);
                }

                function update_info() {
                    callProcedure('auto');
                }

                return {
                    menuList,
                    addPath,
                    activeName,
                    isMo,

                    dialogArgs,
                    dialogRules,
                    dialogVisible,
                    dialogExt,
                    oj8k,
                    cancel,

                    serverTime,
                    changeTime,
                    syncColor,
                    switchSync_mess,
                    changeSwitchSync,
                    reconnection,
                    enter,
                    update_info,
                }
            },
            template: `
<div>
    <el-container>
        <el-main v-if="isMo">
            <hhw-dialog v-model="dialogVisible" :args="dialogArgs" :rules="dialogRules" :ext="dialogExt" @oj8k="oj8k" @cancel="cancel"></hhw-dialog>
            <div class="common-layout">
                <el-container>
                    <el-header height="50px" class="center_header">
                        <div>
                            <h2 class="center_time" @click="changeTime">{{ "服务器时间:" + serverTime }}</h2>
                            <h1 class="center_font" :style="{color: syncColor}" @click="changeSwitchSync">{{ switchSync_mess + "数据监听"}}</h1>
                            <h1 class="center_font" @click="enter">同步数据</h1>
                            <h1 class="center_font" @click="reconnection">断线重连</h1>
                            <h1 class="center_font" @click="update_info">刷号</h1>
                        </div>
                    </el-header>
                    <el-main>
                        <div>
                            <el-tabs class="center-tabs" v-model="activeName">
                                <el-tab-pane v-for="(info, idx) in menuList" :key="idx" :label="info.name" :name="info.path"></el-tab-pane>
                            </el-tabs>
                        </div>
                        <div>
                            <router-view v-slot="{ Component }">
	                            <keep-alive>
	                                <component :is="Component"/>
	                            </keep-alive>
	                        </router-view>
                        </div>   
                    </el-main> 
                </el-container>
            </div>           
        </el-main>
        <img v-else align="middle" src="../png/404.png"  style="margin: 10% auto; color: white"/>
    </el-container>
</div>            
            `,
        }
    }

    export function router_center_usrInfo() {
        return {
            setup(props, ctx) {
                let usrData = ref({});
                let loops = [];
                let personalMess = ref('');
                let procedure_name = ref('');
                let quick_name = ref('');
                let activeName = ref('item');
                let procedure_list = ref([]);

                let item_select_list = ref([]);
                let c_item_list = ref([]);
                let item_num = ref(0);

                let testRequest_list = reactive([]);
                let iface_name = ref('');
                let args = reactive([]);
                let note = ref('');

                let once_times = ref(1);
                let interval_time = ref(1);
                let exec_times = ref(1);

                onMounted(() => {
                    hMitt.on(CONST.EVENT.test_request, initTestRequest);
                    hMitt.on(CONST.EVENT.update_proxy_data, init);
                    hMitt.on(CONST.EVENT.procedure_list, initProcedureList);
                    hMitt.on(CONST.EVENT.init_data, initData);
                    init();
                    initProcedureList();
                    initData();
                    initTestRequest();
                    // 加载 usr 表数据
                    loops.push(setInterval(() => {
                        eval2('HHW.getUsrData()', (result) => {
                            usrData.value = result
                        })
                    }, 100))
                })

                onUnmounted(() => {
                    hMitt.off(CONST.EVENT.test_request, initTestRequest);
                    hMitt.off(CONST.EVENT.init_data, initData);
                    hMitt.off(CONST.EVENT.update_proxy_data, init);
                    hMitt.off(CONST.EVENT.procedure_list, initProcedureList);
                    loops.forEach((loop) => clearInterval(loop))
                })

                function initTestRequest() {
                    eval2('HHW.testRequestList', (rst: ITestRequest[]) => {
                        if (rst && rst.length) {
                            for (let info of rst) {
                                let flag = false;
                                testRequest_list.some((item: ITestRequest) => {
                                    if (item.name == info.name) {
                                        flag = true;
                                        item.ext = info.ext;
                                        let list = Object.keys(info.args);
                                        for (let key in item.args) {
                                            let idx = list.indexOf(key);
                                            if (idx == -1) {
                                                delete item.args[key];
                                            } else {
                                                list.splice(idx, 1);
                                            }
                                        }
                                        list.forEach((key) => {
                                            item.args[key] = '';
                                        })
                                        return true;
                                    }
                                })
                                if (!flag) {
                                    testRequest_list.push(info);
                                }
                            }
                        }
                    })
                }

                function initData() {
                    c_item_list.value = cfgMap.c_item;
                }

                function initProcedureList() {
                    eval2('HHW.procedureList', (rst: IHhw[]) => {
                        procedure_list.value = rst;
                    })
                }

                function init() {
                    if (proxy_data.id) {
                        personalMess.value = `${proxy_data.id}(${proxy_data.name})(${proxy_data.accName})[${proxy_data.fmlId || 0}]`
                    } else  {
                        personalMess.value = '';
                    }
                }

                function callP(procedure_name) {
                    callProcedure(procedure_name);
                }

                function callQ(quick_name) {
                    callQuick(quick_name);
                }

                function addItem() {
                    if (!item_num.value) {
                        showWarn('请填写数量');
                    } else if (!item_select_list.value) {
                        showWarn('请选择物品');
                    } else {
                        eval('addItem', {list: item_select_list.value, num: item_num.value})
                    }
                }

                function addOne() {
                    args.push(['', '']);
                }

                function delOne(idx: number) {
                    args.splice(idx, 1);
                }

                function updateTestQequest() {
                    if (!iface_name.value) {
                        return showErr('请填写接口名');
                    }
                    eval('updateTestQequest', {cnd: {name: iface_name.value}, ext: {
                            once_times: parseInt(once_times.value || 1),
                            interval_time: parseInt(interval_time.value || 1),
                            exec_times: parseInt(exec_times.value || 1),
                        }, data: <ITestRequest>{ext: note.value, args: arr2obj(args)}});
                }

                function changeIfaceName(v) {
                    if (!v) return;
                    let info = testRequest_list.find((item: ITestRequest) => item.name == v);
                    args.length = 0;
                    if (info) {
                        note.value = info.ext;
                        for (let key in info.args) {
                            args.push([key, '']);
                        }
                    } else {
                        note.value = '';
                    }
                }

                //二维数组转对象
                function arr2obj(arr: any[][]): {[key: string]: any} {
                    let obj: {[key: string]: any} = {};
                    arr.forEach(v => {
                        if (v[0] && v[0] != '请填写参数名') obj[v[0]] = (v[1]);
                    });
                    return obj;
                }

                return {
                    usrData,
                    personalMess,
                    activeName,
                    procedure_name,
                    quick_name,
                    callP,
                    callQ,
                    procedure_list,
                    item_select_list,
                    c_item_list,
                    item_num,
                    addItem,

                    changeIfaceName,
                    testRequest_list,
                    updateTestQequest,
                    iface_name,
                    args,
                    note,
                    addOne,
                    delOne,

                    once_times,
                    interval_time,
                    exec_times,
                }
            },
            template: `
<div>
    <div v-if="personalMess">
        <div>
            <el-descriptions title="" :column="1" border style="width: 220px">
              <el-descriptions-item label="金币">{{ usrData.gld }}</el-descriptions-item>
              <el-descriptions-item label="钻石">{{ usrData.dmd }}</el-descriptions-item>
            </el-descriptions>
            <p class="center_font3">{{ personalMess }}</p>
            <p class="center_font2" style="margin-left: 50px">存储器执行:</p>
            <el-select style="width: 200px; margin-top: -10px" v-model="procedure_name" filterable allow-create>
                <el-option v-for="item in procedure_list" :key="item.name" :label="item.ext + '(' + item.name + ')'" :value="item.name"></el-option>
            </el-select>
            <el-button style="margin-left: 15px; margin-top: -10px" type="success" @click="callP(procedure_name)">执行</el-button>
<!--            <p class="center_font2" style="margin-left: 50px">快速调试:</p>-->
<!--            <hhw-edit-input v-model:value="quick_name" height="25px" lineHeight="10px" width="180px" style="margin-left: 10px;"></hhw-edit-input>-->
<!--            <el-button style="margin-left: 15px; margin-top: -7px" type="success" size="small" @click="callQ(quick_name)">执行</el-button>-->
        </div>
        <el-tabs v-model="activeName" tab-position="left" style="margin-top: 20px; border-radius: 4px; min-height: 200px; background-color: white">
            <el-tab-pane label="道具添加" name="item">
                <div style="margin-left: 10px">
                    <div style="padding-left: 10px;">
                        <br><br>
                        <hhw-load-select v-model="item_select_list" :options="c_item_list" title="请选择要道具" style="width: 500px"></hhw-load-select>
                        <el-input-number style="display: block; margin-top: 10px;" v-model="item_num" :min="-9999999999" :max="9999999999"/>
                    </div>
                    <el-button style="margin: 10px 10px" type="primary" @click="addItem">添加道具</el-button>
                </div>                                         
            </el-tab-pane>
            <el-tab-pane label="接口调试" name="interface">
                <div style="margin-left: 10px">
                    <br><br>
                    <el-select style="width: 300px;" v-model="iface_name" placeholder="请填写接口名" filterable allow-create @change="changeIfaceName">
                        <el-option v-for="item in testRequest_list" :key="item.name" :label="'(' + item.name + ')' +item.ext" :value="item.name"></el-option>
                    </el-select>
                    <br><br>
                    <el-input type="textarea" :rows="2" placeholder="接口请求注释内容" v-model="note"></el-input>
                    <br><br>
                    <el-button type="primary" @click="addOne">添加参数</el-button>
                    <el-button style="margin-left: 10px" type="success" @click="updateTestQequest">请求接口</el-button>
                    <br><br>
                    单次请求接口次数<el-input v-model="once_times" style="width: 120px"></el-input>
                    连续请求次数<el-input v-model="exec_times" style="width: 120px"></el-input>
                    连续请求间隔（毫秒）<el-input v-model="interval_time" style="width: 120px"></el-input>
                    <hr><br>
                    <div style="margin-bottom: 15px" v-for="(item, idx) in args" :key="idx">
                        <el-input style="width: 100px" v-model="item[0]" placeholder="参数名"></el-input>
                        <el-input style="width: 200px; margin-left: 10px; margin-right: 10px" v-model="item[1]" placeholder="参数值"></el-input> 
                        <el-button type="danger" @click="delOne(idx)" >删除</el-button>     
                    </div>
                </div>
            </el-tab-pane>                      
        </el-tabs>
    </div>
    <p v-else class="center_font2" style="color: aliceblue">请先进入游戏</p>
</div>            
            `,
        }
    }

    export function router_center_appList() {
        return {
            setup(props, ctx) {
                let appList = ref([]);
                let appList_list = computed(() => {
                    let list = [];
                    for (let i = 0; i < appList.value.length; i++) {
                        list.push([appList.value[i]]);
                    }
                    return list;
                })

                let columns_app = [
                    {
                        label: '进程名',
                        key: '0',
                        width: 400
                    },
                ];

                let oper_list_app = [{
                    key: "restart",
                    label: "重启",
                    click: (row: any) => {
                        restartApp(row['0']);
                    }
                }];

                onMounted(() => {
                    hMitt.on(CONST.EVENT.app_list, init);
                    init();
                })

                onUnmounted(() => {
                    hMitt.off(CONST.EVENT.app_list, init);
                })

                function init() {
                    eval2('HHW.appList', (rst) => {
                        if (rst) appList.value = rst.reverse();
                    })
                }

                function restartApp(name: string) {
                    confirm("确定重启" + name + "?", () => {
                        eval("restartApp", {name}, null);
                    });
                }

                return {
                    appList_list,
                    columns_app,
                    oper_list_app,
                }
            },
            template: `
<div>
   <div v-if="appList_list.length">
        <div style="width: 100%; margin-top: 5px; box-shadow:0px 5px 8px rgba(0, 0, 0, 0.6); padding-top: 15px;">
            <el-table :data="appList_list" style="width: 100%">
                <el-table-column :show-overflow-tooltip="true"  v-for="(item) in columns_app" :key="item.key" :label="item.label" 
                    :width="item.width || 200" :formatter="item.handler" :prop="item.key" align="center"></el-table-column>
                <el-table-column v-if="oper_list_app.length" label="操作" align="center" :width="200">
                    <template v-slot="scope">
                        <el-button v-for="item in oper_list_app" :key="item.key" size="small" type="danger"
                            @click="item.click(scope.row)">{{ item.label }}</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>                       
    </div>    
   <p v-else class="center_font2" style="color: aliceblue">请联系hhw</p>
</div>            
            `,
        }
    }

    export function router_center_egret() {
        return {
            setup(props, ctx) {
                let hhw_tree = ref([]);//存放树的结构
                let hhw_tree_data = ref([]);//存放实例的data结构
                let egret_scene = ref('');
                let nodeMap = {};

                let debug_highlight_title = computed(() => {
                    return debug_highlight_status.value ? "关闭高亮" : "开启高亮";
                })

                let debug_highlight_color = computed(() => {
                    return debug_highlight_status.value ? 'orange' : 'aliceblue';
                })

                let debug_highlight_status = ref(false);

                let debug_listen_title = computed(() => {
                    return debug_listen_status.value ? "关闭点击监听" : "开启点击监听";
                })

                let debug_listen_color = computed(() => {
                    return debug_listen_status.value ? 'orange' : 'aliceblue';
                })

                let debug_listen_status = ref(false);

                onMounted(() => {
                    eval('changeSwitch', {key: CONST.SWITCH.light_egret, isOpen: false});
                    eval('changeSwitch', {key: CONST.SWITCH.listen_egret, isOpen: false});

                    hMitt.on(CONST.EVENT.init, init);
                    hMitt.on(CONST.EVENT.init_egret_fail, initEgretFail);

                    eval2('HHW.hhw_tree', (rst: EgretInfo) => {
                        initEgret(rst);
                    })
                })

                onUnmounted(() => {
                    hMitt.off(CONST.EVENT.init, init);
                    hMitt.off(CONST.EVENT.init_egret_fail, initEgretFail);
                })

                onActivated(() => {
                    hMitt.on(CONST.EVENT.init_egret, initEgret);
                    hMitt.on(CONST.EVENT.click_egret, clickEgret);
                })

                onDeactivated(() => {
                    hMitt.off(CONST.EVENT.init_egret, initEgret);
                    hMitt.off(CONST.EVENT.click_egret, clickEgret);
                })

                watch(debug_listen_status, (newV, oldV) => {
                    if (!newV) {
                        hhw_tree_data.value = [];//清空hhw_tree_data
                        nodeMap = {};
                        egret_scene.value = '';
                        hhw_tree.value = [];
                    }
                })

                function initEgretFail() {
                    debug_highlight_status.value = false;
                    debug_listen_status.value = false;
                }

                function init() {
                    debug_highlight_status.value = false;
                    debug_listen_status.value = false;
                }

                function initEgret(tree: EgretInfo) {
                    hhw_tree_data.value = [];//清空hhw_tree_data
                    nodeMap = {}
                    if (tree) {
                        egret_scene.value = tree.__label__;
                        if (tree.children && tree.children.length) {
                            hhw_tree.value = tree.children;
                        }
                    } else {
                        egret_scene.value = '';
                        hhw_tree.value = [];
                    }
                }

                function clickEgret(hashCode) {
                    treeRefresh(hashCode, true);
                    if (nodeMap[hashCode]) {
                        dealData(hashCode, nodeMap[hashCode].data)
                    }
                }

                function switchHighlight() {
                    debug_highlight_status.value = !debug_highlight_status.value;
                    eval('changeSwitch', {key: CONST.SWITCH.light_egret, isOpen: !!debug_highlight_status.value});
                }

                function switchListen() {
                    debug_listen_status.value = !debug_listen_status.value;
                    eval('changeSwitch', {key: CONST.SWITCH.listen_egret, isOpen: !!debug_listen_status.value});
                }

                /**************************** 处理数据 **************************************/

                function treeNodeRecord (node, data) {
                    const a = (node) => {
                        if (node && node.data && node.data.hashCode) {
                            nodeMap[node.data.hashCode] = node;
                            if (node.childNodes && node.childNodes.length) {
                                for (let v of node.childNodes) {
                                    a(v);
                                }
                            }
                        }
                    }
                    a(node);
                }

                function treeRefresh(hashCode, is_hight_light?: boolean) {
                    let parentList = [];
                    const a = (node) => {
                        if (node && node.data && node.data.hashCode) {
                            if (parentList.indexOf(node.data.hashCode) == -1) {
                                parentList.push(node.data.hashCode);
                            }
                            if (node.parent) {
                                a(node.parent);
                            }
                        }
                    }
                    let number = 0;//计算在这之上有几个节点
                    const b = (node) => {
                        if (node.parent) {
                            number ++;
                            let parent = node.parent;
                            if (parent.childNodes && parent.childNodes.length) {
                                let idx = parent.childNodes.indexOf(node);
                                if (idx > 0) {
                                    number += idx;
                                }
                            }
                            b(node.parent);
                        }
                    }
                    a(nodeMap[hashCode]);
                    for (let key in nodeMap) {
                        if (parentList.indexOf(parseInt(key)) == -1) {
                            if (nodeMap[key].expanded == true) nodeMap[key].expanded = false;
                        } else {
                            if (nodeMap[key].expanded == false) nodeMap[key].expanded = true;
                        }

                        if (is_hight_light) {
                            if (parseInt(key) == hashCode) {
                                nodeMap[key].isCurrent = true;
                                b(nodeMap[key]);
                            } else {
                                if (nodeMap[key].isCurrent == true) nodeMap[key].isCurrent = false;
                            }

                            let hight = document.documentElement.clientHeight;
                            let offset = number * 20 + 200 - hight / 2;
                            offset = (offset > 0 ? offset : 0);
                            setTimeout(function() {
                                window.scrollTo({
                                    top: offset,
                                    behavior: "smooth"
                                });
                            }, 200)
                        }
                    }
                }

                /** 处理实例的data */
                function dealData(hashCode, data: EgretInfo) {
                    let list = [];
                    const a = (val, key, list) => {
                        let info: any = {};
                        info.hashCode = hashCode;
                        if (val && typeof val == 'object') {
                            let isArray = (val instanceof Array);
                            info.name = key;
                            info.label = isArray ? 'Array' : 'Object';
                            let children = info.children = [];
                            list.push(info);
                            if (isArray) {
                                for (let i = 0; i < val.length; i++) {
                                    a(val[i], i, children);
                                }
                            } else {
                                for (let key in val) {
                                    a(val[key], key, children);
                                }
                            }
                        } else {
                            info.name = key;
                            info.label = val == null ? null : val.toString();
                            if (data.disabled_list && data.disabled_list.indexOf(key) > -1) info.disabled = true;
                            list.push(info);
                        }
                    }

                    for (let key in data) {
                        if (['children', '__label__', 'visible', 'disabled_list'].indexOf(key) > -1) continue;
                        let l = [];
                        a(data[key], key, l);
                        list.push(...l);
                    }
                    hhw_tree_data.value = list;
                }

                function treeNodeClick(data, node, self) {//点击
                    if (debug_highlight_status.value) {
                        eval("egret_highlight", { hashCode: data.hashCode, isDraw: true });
                    }
                    treeRefresh(data.hashCode, true);
                    dealData(data.hashCode, data);
                }

                function treeNodeExpand(data, node) {//展开
                    treeRefresh(data.hashCode);
                }

                function treeDataUpdate(val, node, data, nameList) {
                    const a = (node) => {
                        if (node) {
                            if (node.data && node.data.name) {
                                nameList.splice(0, 0, node.data.name);
                            }
                            if (node.parent) {
                                a(node.parent)
                            }
                        }
                    }

                    if (!nameList) {
                        nameList = [];
                        a(node);
                    }

                    eval('egret_change', {
                        nameList: nameList,
                        value: val,
                        hashCode: data.hashCode
                    });
                }

                function visibleChange(node, data, val) {
                    treeDataUpdate(val, node, data, ['visible'])
                }

                function unEdit(data) {
                    return data.disabled || ['Object', 'Array'].indexOf(data.label) > -1;
                }

                function console() {
                    eval('consoleIns', null);
                }

                return {
                    treeNodeClick,
                    hhw_tree,
                    debug_highlight_title,//title
                    debug_highlight_color,
                    debug_listen_title,
                    debug_listen_color,
                    switchHighlight,//改变状态
                    switchListen,//改变是否监听树变化
                    egret_scene,
                    treeNodeRecord,//记录节点
                    treeNodeExpand,//树节点展开
                    treeDataUpdate,
                    hhw_tree_data,
                    visibleChange,
                    unEdit,
                    console,
                }
            },
            template: `
<div>
    <el-container>
        <el-header height="50px" class="debug_header">
            <h1 class="debug_font" :style="{color: debug_highlight_color}" @click="switchHighlight">{{ debug_highlight_title }}</h1>
            <h1 class="debug_font" :style="{color: debug_listen_color}" @click="switchListen">{{ debug_listen_title }}</h1>
            <h1 class="debug_font" style="color: aliceblue" @click="console">打印选中实例</h1>
        </el-header>
        <el-main>
            <span class="custom_tree" style="display: inline-block; width: 70%">
                <p v-show="egret_scene" class="debug_tree_title">{{ \`场景: \` + egret_scene }}</p>
                <el-tree empty-text="数据呢？" :data="hhw_tree" node-key="hashCode" @node-click="treeNodeClick" :expand-on-click-node="false" 
                    :highlight-current="true" @node-expand="treeNodeExpand" style="background-color: unset; margin-top: 15px">
                    <template #default="{node, data}">
                        <span class="custom_tree_node">
                            {{ treeNodeRecord(node, data) }}
                            <span>{{ data.name }}
                                <span class="custom_tree_node_child">
                                    {{ \`【\` }} <span style="color: rgb(50,205,50)">{{ data.class_name }}</span>{{ \`】\` }}
                                </span>
                            </span>  
                        </span>  
                        <el-checkbox v-model="data.visible" label="是否显示" @change="visibleChange(node, data, data.visible)"></el-checkbox>  
                    </template>
                </el-tree> 
            </span>
            <span class="debug_tree_data">
                <el-tree empty-text="暂无数据" :data="hhw_tree_data">
                    <template #default="{node, data}">
                        <span class="custom_tree_data_node">
                            {{ data.name + ":" }}
                            <hhw-edit-input :disabled="unEdit(data)" v-model:value="data.label" height="25px" lineHeight="10px"
                                width="150px" @blur="treeDataUpdate($event, node, data)" style="margin-left: 5px"></hhw-edit-input>
                        </span>  
                    </template>
                </el-tree> 
            </span>        
        </el-main>     
    </el-container>      
</div>            
            `,
        }
    }

    export function router_center_robot() {
        return {
            setup(props, ctx) {
                let dialogArgs = ref(null);
                let dialogRules = ref(null);
                let dialogExt = ref(null);
                let dialogVisible = ref(false);
                let id = ref(0);

                onMounted(() => {
                    hMitt.on(CONST.EVENT.update_proxy_data, init);
                    init();
                });

                onUnmounted(() => {
                    hMitt.off(CONST.EVENT.update_proxy_data, init);
                })

                function init() {
                    if (proxy_data.id) {
                        id.value = proxy_data.id;
                    } else {
                        id.value = 0;
                    }
                }

                function oj8k(args) {
                    if (args.extra_ext && args.extra_ext.handler) {
                        eval(args.extra_ext.handler, args);
                    }
                    dialogVisible.value = false;
                }

                function cancel() {
                    dialogVisible.value = false;
                }

                function addRobot() {
                    dialogArgs.value = [['num', '添加数量']];
                    dialogRules.value = [['num']];
                    dialogExt.value = {handler: 'addRobot'};
                    dialogVisible.value = true;
                }

                function addRobotToRb() {
                    dialogArgs.value = [['num', '添加数量'], ['list', '分数范围', 'between', ['', '']], ['roomId', '房间id', '', '1']];
                    dialogRules.value = [['num']];
                    dialogExt.value = {handler: 'addRobotToRb'};
                    dialogVisible.value = true;
                }

                function addRobotToPeak() {
                    dialogArgs.value = [['num', '添加数量']];
                    dialogRules.value = [['num']];
                    dialogExt.value = {handler: 'addRobotToPeak'};
                    dialogVisible.value = true;
                }

                const fixList = [
                    {value: [0], label: '报名结束'},
                    {value: [1], label: '海选赛'},
                    {value: [2], label: '海选赛结束'},
                    {value: [3, 1, 1], label: '64强第一场'},
                    {value: [3, 1, 2], label: '64强第二场'},
                    {value: [3, 1, 3], label: '64强第三场'},
                    {value: [3, 2, 1], label: '32强第一场'},
                    {value: [3, 2, 2], label: '32强第二场'},
                    {value: [3, 2, 3], label: '32强第三场'},
                    {value: [3, 3, 1], label: '16强第一场'},
                    {value: [3, 3, 2], label: '16强第二场'},
                    {value: [3, 3, 3], label: '16强第三场'},
                    {value: [3, 4, 1], label: '8强第一场'},
                    {value: [3, 4, 2], label: '8强第二场'},
                    {value: [3, 4, 3], label: '8强第三场'},
                    {value: [3, 5, 1], label: '4强第一场'},
                    {value: [3, 5, 2], label: '4强第二场'},
                    {value: [3, 5, 3], label: '4强第三场'},
                    {value: [3, 6, 1], label: '半决赛第一场'},
                    {value: [3, 6, 2], label: '半决赛强第二场'},
                    {value: [3, 6, 3], label: '半决赛强第三场'},
                    {value: [3, 7, 1], label: '决赛第一场'},
                    {value: [3, 7, 2], label: '决赛第二场'},
                    {value: [3, 7, 3], label: '决赛第三场'},
                    {value: [3, 7, 4], label: '决赛第四场'},
                    {value: [3, 7, 5], label: '决赛第五场'},
                    {value: [4], label: '活动结算'},
                ]

                function fixPeak() {
                    dialogArgs.value = [
                        ['step', '阶段', 'select', null, null, fixList],
                        ['type', '是否一键', 'select', 0, null, [{value: 0, label: '否'}, {value: 1, label: '是'}]],
                        ['num', '海选赛场数'],
                    ]
                    dialogRules.value = [[]];
                    dialogExt.value = {handler: 'fixPeak'};
                    dialogVisible.value = true;
                }

                const fixList2 = [
                    {value: '[0]', label: '报名结束'},
                    {value: '[1]', label: '海选赛'},
                    {value: '[2]', label: '海选赛结束'},
                    {value: '[3, 1, 1]', label: '64强第一场'},
                    {value: '[3, 1, 2]', label: '64强第二场'},
                    {value: '[3, 1, 3]', label: '64强第三场'},
                    {value: '[3, 2, 1]', label: '32强第一场'},
                    {value: '[3, 2, 2]', label: '32强第二场'},
                    {value: '[3, 2, 3]', label: '32强第三场'},
                    {value: '[3, 3, 1]', label: '16强第一场'},
                    {value: '[3, 3, 2]', label: '16强第二场'},
                    {value: '[3, 3, 3]', label: '16强第三场'},
                    {value: '[3, 4, 1]', label: '8强第一场'},
                    {value: '[3, 4, 2]', label: '8强第二场'},
                    {value: '[3, 4, 3]', label: '8强第三场'},
                    {value: '[3, 5, 1]', label: '4强第一场'},
                    {value: '[3, 5, 2]', label: '4强第二场'},
                    {value: '[3, 5, 3]', label: '4强第三场'},
                    {value: '[3, 6, 1]', label: '半决赛第一场'},
                    {value: '[3, 6, 2]', label: '半决赛强第二场'},
                    {value: '[3, 6, 3]', label: '半决赛强第三场'},
                    {value: '[3, 7, 1]', label: '决赛第一场'},
                    {value: '[3, 7, 2]', label: '决赛第二场'},
                    {value: '[3, 7, 3]', label: '决赛第三场'},
                    {value: '[3, 7, 4]', label: '决赛第四场'},
                    {value: '[3, 7, 5]', label: '决赛第五场'},
                    {value: '[4]', label: '活动结算'},
                ]

                // 巅峰赛补操作
                 function peakFix() {
                     dialogArgs.value = [
                        ['batchId', '活动批次'],
                        ['roomId', '房间id'],
                        ['step', '阶段', 'select', null, null, fixList2],
                        ['type', '是否一键', 'select', 0, null, [{value: 0, label: '否'}, {value: 1, label: '是'}]],
                        ['num', '海选场数'],
                    ]
                     dialogRules.value = [['batchId']];
                     dialogExt.value = {handler: 'peakFix'};
                     dialogVisible.value = true;
                }

                function oneKeyJoinFml() {
                    dialogArgs.value = [
                        ['batchId', '活动批次'],
                    ]
                    dialogRules.value = [['batchId']];
                    dialogExt.value = {handler: 'oneKeyJoinFml'};
                    dialogVisible.value = true;
                }

                function oneKeyFight() {
                    dialogArgs.value = [
                        ['batchId', '活动批次'],
                    ]
                    dialogRules.value = [['batchId']];
                    dialogExt.value = {handler: 'oneKeyFight'};
                    dialogVisible.value = true;
                }

                function gbFix() {
                    const fixList = [
                        {value: '[0]', label: '第一阶段结算'},
                        {value: '[1, 2]', label: '8强结算'},
                        {value: '[1, 3]', label: '4强结算'},
                        {value: '[1, 4]', label: '2强结算'},
                        {value: '[2]', label: '第二阶段结算'},
                        {value: '[3]', label: '活动结算'},
                    ]
                    dialogArgs.value = [
                        ['batchId', '活动批次'],
                        ['roomId', '房间id'],
                        ['step', '阶段', 'select', null, null, fixList],
                    ]
                    dialogRules.value = [['batchId']];
                    dialogExt.value = {handler: 'gbFix'};
                    dialogVisible.value = true;
                }

                // 巅峰赛一键报名
                function oneKeySignUp() {
                    dialogArgs.value = [
                        ['batchId', '活动批次'],
                    ]
                    dialogRules.value = [['batchId']];
                    dialogExt.value = {handler: 'oneKeySignUp'};
                    dialogVisible.value = true;
                }


                return {
                    dialogArgs,
                    dialogRules,
                    dialogVisible,
                    dialogExt,
                    oj8k,
                    cancel,

                    id,
                    addRobotToRb,
                    addRobot,
                    addRobotToPeak,
                    fixPeak,
                    peakFix,
                    oneKeyJoinFml,
                    oneKeyFight,
                    gbFix,
                    oneKeySignUp
                }
            },
            template: `
<div>
    <hhw-dialog v-model="dialogVisible" :args="dialogArgs" :rules="dialogRules" :ext="dialogExt" @oj8k="oj8k" @cancel="cancel"></hhw-dialog>
    <div v-if="id">
        <hhw-button :active="true" type="3" @click="addRobot" name="添加机器人"></hhw-button>
        <hhw-button :active="true" type="4" @click="addRobotToRb" name="参加排位赛机器人"></hhw-button>
        <hhw-button :active="true" type="11" @click="addRobotToPeak" name="参加巅峰赛机器人"></hhw-button>
        <hhw-button :active="true" type="11" @click="oneKeySignUp" name="本服巅峰赛一键报名"></hhw-button>
        <hhw-button :active="true" type="8" @click="fixPeak" name="巅峰赛活动快速操作"></hhw-button>
        <hhw-button :active="true" type="8" @click="peakFix" name="巅峰赛补操作"></hhw-button>
        <hhw-button :active="true" type="8" @click="oneKeyJoinFml" name="公会战一键加入公会"></hhw-button>
        <hhw-button :active="true" type="8" @click="oneKeyFight" name="公会战一键打boss"></hhw-button>
        <hhw-button :active="true" type="8" @click="gbFix" name="公会战补操作"></hhw-button>
    </div>
    <p v-else class="center_font2" style="color: aliceblue">请先进入游戏</p>
</div>            
            `,
        }
    }

    export function router_center_actList() {
        return {
            setup(props, ctx) {
                let id = ref(0);
                let act_list = ref([]);
                let interval = null;

                let dialogArgs = ref(null);
                let dialogRules = ref(null);
                let dialogExt = ref(null);
                let dialogVisible = ref(false);

                let popup_act = ref(false);

                onActivated(() => {
                    eval('getActTypeList', null);
                })

                onMounted(() => {
                    hMitt.on(CONST.EVENT.init, initAct);
                    hMitt.on(CONST.EVENT.update_proxy_data, init);
                    hMitt.on(CONST.EVENT.update_act, initAct);
                    init();
                    initAct();
                    interval = setInterval(() => {
                        initAct();
                    }, 1000 * 30);
                });

                onUnmounted(() => {
                    hMitt.off(CONST.EVENT.init, initAct);
                    hMitt.off(CONST.EVENT.update_proxy_data, init);
                    hMitt.off(CONST.EVENT.update_act, initAct);

                    if (interval) {
                        clearInterval(interval);
                    }
                })

                function init() {
                    if (proxy_data.id) {
                        id.value = proxy_data.id;
                    } else {
                        id.value = 0;
                    }
                }

                function initAct() {
                    eval2('HHW.getActList()', (rst) => {
                        act_list.value = rst;
                    })
                }

                let columns = [
                    {
                        label: '批次id',
                        key: 'batchId',
                        fixed: 'left',
                        width: 100
                    },
                    {
                        label: '活动类型',
                        key: 'type',
                        width: 200,
                        handler: (row, column, v, index) => {
                            if (cfgMap["c_act"][v]) {
                                return cfgMap["c_act"][v] + '(' + v + ')';
                            } else {
                                return v
                            }
                        }
                    },
                    {
                        label: '模板id',
                        key: 'tempId',
                        width: 100,
                    },
                    {
                        label: '活动显示',
                        key: 'status',
                        width: 120,
                        handler: (row, column, v, index) => {
                            if (v) {
                                return "生效"
                            } else {
                                return "失效"
                            }
                        },
                        style: (v) => {
                            if (v) {
                                return {color: 'green'};
                            } else {
                                return {color: 'red'};
                            }
                        }
                    },
                    {
                        label: '活动开始时间',
                        key: 'beginTime',
                    },
                    {
                        label: '活动结束时间',
                        key: 'endTime',
                    },
                    {
                        label: '活动展示时间',
                        key: 'showEndTime',
                    },
                ];

                let opers = [
                    {
                        key: "close",
                        label: "活动关闭",
                        click: (row) => {
                            if (!row || !row.batchId) {
                                showErr("数据有误");
                                return;
                            }
                            let cnd = { id: row.batchId};
                            let data = {status: 0};
                            let type = "batch";
                            eval("configurationAct", {cfgList: [{cnd, data, type}]})
                        }
                    },
                    {
                        key: "changeStatus",
                        label: "时间调整",
                        click: (row) => {
                            if (!row || !row.batchId) {
                                showErr("数据有误");
                                return;
                            }
                            changeStatus(row);
                        }
                    }
                ]

                function refreshAct() {
                    eval('refreshAct', {});
                }

                function oj8k(args) {
                    output(args);
                    if (args.extra_ext && args.extra_ext.handler) {
                        let beginTime = typeof args.beginTime == 'string' ? args.beginTime : dateFormat(args.beginTime);
                        let endTime = typeof args.endTime == 'string' ? args.endTime : dateFormat(args.endTime);
                        let showEndTime = typeof args.showEndTime == 'string' ? args.showEndTime : dateFormat(args.showEndTime);

                        let cnd = { id: args.batchId};
                        let data: any = {status: args.status, beginTime: beginTime, effType: 0};
                        let type = "batch";

                        data.duration = getBetween(endTime, beginTime);
                        data.duration_after = getBetween(showEndTime, endTime);

                        eval(args.extra_ext.handler, {cfgList: [{cnd, data, type}]});
                    }
                    dialogVisible.value = false;
                }

                function cancel() {
                    dialogVisible.value = false;
                }

                function changeStatus(row: any) {
                    dialogArgs.value = [['batchId', '活动批次', null, row.batchId.toString(), 1], ['name', '活动名称', null, row.name, 1]
                        , ['status', '状态', null, row.status.toString()], ['beginTime', '活动开始时间', 'time', row.beginTime]
                        , ['endTime', '活动结束时间', 'time', row.endTime], ['showEndTime', '活动展示时间', 'time', row.showEndTime]];
                    dialogRules.value = [];
                    dialogExt.value = {handler: 'configurationAct'};
                    dialogVisible.value = true;
                }

                function getBetween(dataStr1, dataStr2) {
                    let dataNum1 = new Date(dataStr1).getTime();
                    let dataNum2 = new Date(dataStr2).getTime();
                    let minutesBetween = Math.ceil((dataNum1 - dataNum2) / 60 / 1000) ;
                    if (minutesBetween > 0) {
                        let d = Math.floor(minutesBetween / 24 / 60);
                        let left = minutesBetween % (24 * 60);
                        let h = Math.floor(left / 60);
                        left = left % 60;
                        let s = Math.floor(left);
                        return [d, h, s].join(",");
                    } else {
                        return "0,0,0";
                    }
                };

                function configuration() {
                    popup_act.value = true;
                }

                function close_act() {
                    popup_act.value = false;
                }

                return {
                    id,
                    act_list,
                    columns,
                    opers,

                    refreshAct,
                    dialogArgs,
                    dialogRules,
                    dialogVisible,
                    dialogExt,
                    oj8k,
                    cancel,

                    configuration,
                    close_act,
                    popup_act,
                }
            },
            template: `
<div>
    <hhw-dialog v-model="dialogVisible" :args="dialogArgs" :rules="dialogRules" :ext="dialogExt" @oj8k="oj8k" @cancel="cancel"></hhw-dialog>
    <hhw-dialog-act v-model="popup_act" @oj8k="close_act" @cancel="close_act"></hhw-dialog-act>
    <div v-if="id">
        <div style="width: 100%; margin-top: 10px;">
            <el-button size="default" style="margin-left: 10px" type="primary" @click="refreshAct">活动刷新</el-button>
            <el-button size="default" style="margin-left: 10px" type="primary" @click="configuration">活动配置</el-button>
        </div>    
        <div style="width: 100%; margin-top: 5px; box-shadow:0px 5px 8px rgba(0, 0, 0, 0.6); padding-top: 15px;">
            <hhw-table v-model="act_list" :col_data_list="columns" :oper_list="opers" :oper_width="220"></hhw-table>
        </div>    
    </div>    
    <p v-else class="center_font2" style="color: aliceblue">请先进入游戏</p>
</div>            
            `,
        }
    }

    export function router_center_teamCfg() {
        return {
            setup(props, ctx) {
                let teamCfg_list = ref([]);

                onMounted(() => {
                    hMitt.on(CONST.EVENT.team_list, init);
                    init();
                });

                onUnmounted(() => {
                    hMitt.off(CONST.EVENT.team_list, init);
                })

                function init() {
                    eval2('HHW.teamCfgList', (rst: ITeamCfg[]) => {
                        teamCfg_list.value = rst;
                    })
                }

                function openNewWindow(href, status) {
                    function openNew() {
                        chrome.tabs.create({
                            url: href
                        });
                    }
                    if (status) {
                        openNew();
                    } else {
                        confirm('是否执行该操作', function () {
                            openNew();
                        })
                    }
                }

                function updateExt(name: string, key: string, value: string) {
                    eval('updateTeamExt', {name, key, value});
                }

                return {
                    teamCfg_list,
                    openNewWindow,
                    updateExt,
                }
            },
            template: `
<div>
   <p v-if="!teamCfg_list.length" class="center_font2" style="color: aliceblue">暂无游戏入口 • • •</p>
   <el-card v-else class="box-card" v-for="(info,idx) in teamCfg_list" :key="idx" style="width: 550px;margin-top:20px;margin-right:30px;display:inline-block">
        <template #header>
            <div class="card-header">
                <span>
                    <h3 style="display: inline-block; font-size: 20px; vertical-align: middle">{{ info.name }}</h3> 
                    <h3 style="display: inline-block; font-size: 20px; vertical-align: middle; margin-left: 5px;" >版本号:</h3>  
                    <hhw-edit-input v-model:value="info.ext.ver" height="30px" lineHeight="20px" width="110px" fontSize="20px"
                        @blur="updateExt(info.name, 'ver', info.ext.ver)" style="margin-left: 5px; vertical-align: middle"></hhw-edit-input>
                    <h3 style="display: inline-block; font-size: 20px; vertical-align: middle;  margin-left: 5px;" >版本内容:</h3>      
                    <hhw-edit-input v-model:value="info.ext.title" height="30px" lineHeight="20px" width="150px" fontSize="20px"
                        @blur="updateExt(info.name, 'title', info.ext.title)" style="margin-left: 5px; vertical-align: middle"></hhw-edit-input>
                </span>        
            </div>
        </template>
        <div v-for="(list,idx1) in info.cfgList" :key="idx1" class="hhwUrl" @click="openNewWindow(list[1],list[2])">{{ list[0] }}</div> 
   </el-card>
</div>            
            `,
        }
    }

    export function router_center_panel2_0() {
        return {
            setup(props, ctx) {
                let id = ref(0);
                let dialogArgs = ref(null);
                let dialogRules = ref(null);
                let dialogExt = ref(null);
                let dialogVisible = ref(false);

                onMounted(() => {
                    hMitt.on(CONST.EVENT.update_proxy_data, init);
                    init();
                });
                onUnmounted(() => {
                    hMitt.off(CONST.EVENT.update_proxy_data, init);
                })

                /**
                 * 初始化数据
                 */
                function init() {
                    if (proxy_data.id) {
                        id.value = proxy_data.id;
                    } else {
                        id.value = 0;
                    }
                }

                function oj8k(args) {
                    if (args.extra_ext && args.extra_ext.handler) {
                        eval(args.extra_ext.handler, args);
                    }
                    dialogVisible.value = false;
                }
                function cancel() { dialogVisible.value = false; }

                /**
                 * 修改玩家等级
                 */
                function updateUsrLevel() {
                    dialogArgs.value = [['level', '目标等级']];
                    dialogExt.value = {handler: 'updateUsrLevel'};
                    dialogVisible.value = true;
                }

                return {
                    // param
                    id,
                    dialogArgs,
                    dialogRules,
                    dialogExt,
                    dialogVisible,

                    // fun
                    oj8k,
                    cancel,
                    updateUsrLevel
                }
            },
            template: `
<div>
    <hhw-dialog v-model="dialogVisible" :args="dialogArgs" :rules="dialogRules" :ext="dialogExt" @oj8k="oj8k" @cancel="cancel"></hhw-dialog>
    <div v-if="id">
        <el-row :gutter="20">
            <el-col :span="6">
                <el-button type="primary" plain @click="updateUsrLevel">修改玩家等级</el-button>
            </el-col>
            <el-col :span="6"><div class="grid-content bg-purple"></div>
            </el-col>
            <el-col :span="6"><div class="grid-content bg-purple"></div>
            </el-col>
            <el-col :span="6"><div class="grid-content bg-purple"></div>
            </el-col>
        </el-row>
    </div>
    <p v-else class="center_font2" style="color: aliceblue">请先进入游戏</p>
</div>
            `,
        }
    }

    /**
     * 模板参考，直接复制来用
     */
    export function template() {
        return {
            setup(props, ctx) {
                let id = ref(0);
                onMounted(() => {
                    init();
                });
                onUnmounted(() => {
                })
                function init() {
                    id.value = proxy_data.id || 0
                }
                return {
                    id
                }
            },
            template: `
<div>
    <div v-if="id"></div>
    <p v-else class="center_font2" style="color: aliceblue">请先进入游戏</p>
</div>
            `,
        }
    }
}
