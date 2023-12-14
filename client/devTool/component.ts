/// <reference path="./basics.ts" />
module HHW {
    /** 确认框 */
    export function getDialog() {
        return {
            name: "hhw-dialog",
            emits: ["oj8k", "cancel"],
            data: function () {
                return {
                    rule: {},
                    formData: {},
                    visible: false,
                }
            },
            props: {
                modelValue: {
                    type: Boolean,
                    default: false,
                },
                args: {
                    type: Array,
                    default: [],
                },
                rules: {
                    type: Array,
                    default: [],
                },
                checkFuc: {
                    type: Function,
                    default: (form, cb) => {
                        cb()
                    }
                },
                ext: {
                    type: Object,
                    default: {},
                },
            },
            mounted() {
                hMitt.on(CONST.EVENT.init, this.handleClose);
            },
            destroyed() {
                hMitt.off(CONST.EVENT.init, this.handleClose);
            },
            methods: {
                ok() {
                    let self = this;
                    this.checkFuc(self['formData'], () => {
                        self.$refs.ruleForm.validate((valid) => {
                            if (valid) {
                                let obj = {
                                    extra_ext: self.ext
                                };
                                Object.assign(obj, self['formData'])
                                self.$emit('oj8k', obj);
                            } else {
                                showErr("表单校验失败");
                            }
                        })
                    })

                },
                handleClose() {
                    this.$emit('cancel');
                }
            },
            watch: {
                modelValue(val) {
                    this.visible = val;
                    // this.$emit('update:modelValue', val);
                },
                args(val) {
                    this.formData = {};
                    for (let itemList of val) {
                        if (itemList && itemList[0] && itemList[3] && "xxxx/xx/xx xx:xx:xx" != itemList[3]) {
                            this.formData[itemList[0]] = itemList[3];
                        }
                    }
                },
                rules(val) {
                    this.rule = [];
                    let l_i = val ? val.length : 0;
                    for (let i = 0; i < l_i; i++) {
                        if (val[i][1]) {
                            this.rule[val[i][0]] = val[i][1];
                        } else {
                            this.rule[val[i][0]] = [{
                                required: true,
                                message: '不能为空',
                                trigger: 'change'
                            }];
                        }

                    }
                }
            },
            template: `
<el-dialog v-model="visible" title="请填写参数" width="550px" :before-close="handleClose">
    <el-form :model="formData" :rules="rule" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item v-for="v in args" :key="v[0]" :value="v[0]" :label="v[1]" :prop="v[0]">
            <el-date-picker v-if="v[2] == 'time'" v-model="formData[v[0]]"
                format="YYYY/MM/DD HH:mm:ss"></el-date-picker>
            <el-input v-else-if="v[2] == 'textarea'" type="textarea" :rows="2" placeholder="请输入内容" v-model="formData[v[0]]"></el-input>
            <div v-else-if="v[2] == 'between'">
                <el-input v-model="formData[v[0]][0]" style="width: 120px"></el-input>
                -
                <el-input v-model="formData[v[0]][1]" style="width: 120px"></el-input>
            </div>
            <el-select v-else-if="v[2] == 'select'" filterable clearable v-model="formData[v[0]]" style="width: 60%">
                <el-option v-for="(item, idx) in v[5]" :key="idx" :label="item.label" :value="item.value"/>
            </el-select>
            <el-input v-else v-model="formData[v[0]]" style="width: 60%" :disabled="!!v[4]"></el-input>
        </el-form-item>
    </el-form>
    <template #footer>
        <span class="dialog-footer">
            <el-button @click="handleClose">取 消</el-button>
            <el-button type="primary" @click="ok">确 定</el-button>
        </span>
    </template>
</el-dialog>
    `
        }
    }

    /** 表格 */
    export function getTable() {
        return {
            props: {
                modelValue: {
                    type: Array,
                    default: [],
                },
                col_data_list: {
                    type: Array,
                    default: [],
                },
                oper_list: {
                    type: Array,
                    default: [],
                },
                oper_width: {
                    type: Number,
                    default: 100
                }
            },
            data() {
                return {
                    dataList: [],
                    total: 0,
                    page: 1,
                    pageSize: 10,
                };
            },

            methods: {
                pageChange(v) {
                    this.page = v;
                    this.getDataList();
                },

                sizeChange(v) {
                    this.pageSize = v;
                    this.getDataList();
                },

                getDataList() {
                    let list = [];
                    for (let i = (this.page - 1) * this.pageSize; i < this.page * this.pageSize; i++) {
                        if (!this.modelValue[i]) {
                            break;
                        }
                        list.push(this.modelValue[i]);
                    }
                    this.dataList = list;
                },

                isShow(item, row) {
                    return !item.isShow || item.isShow(row);
                }
            },
            computed: {
                col_data_list2: function () {
                    return this.col_data_list.filter((item) => { return !!item.status })
                }
            },
            watch: {
                modelValue(a, b) {
                    this.page = 1;
                    this.pageSize = 10;
                    this.total = a.length;
                    this.getDataList();
                }
            },
            template: `
<el-table :data="dataList" style="width: 100%">
    <el-table-column v-if="col_data_list2.length" type="expand">
        <template v-slot="props">
            <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item  v-for="(item) in col_data_list2" :key="item.key"
                    :label="item.label">
                    <span>{{ props.row[item.key] }}</span>
                </el-form-item>
            </el-form>
        </template>
    </el-table-column>
    <el-table-column :show-overflow-tooltip="true"  v-for="(item) in col_data_list" :key="item.key" :width="item.width || 200" :prop="item.key"
        :label="item.label" :fixed="item.fixed" align="center">
        <template v-slot="props">
            <p :style="item.style ? item.style(props.row[item.key]) : {}">{{ item.handler ? item.handler(null, null, props.row[item.key]) : props.row[item.key] }}</p>
        </template>    
    </el-table-column>
    <el-table-column v-if="oper_list.length" label="操作" align="center" fixed="right" :width="oper_width">
        <template v-slot="scope">
            <el-button v-for="item1 in oper_list" v-show="isShow(item1, scope.row)" :key="item1.key" size="small" type="danger"
                @click="item1.click(scope.row)">{{ item1.label }}</el-button>
        </template>
    </el-table-column>
</el-table>
<div class="block" style="float: right; margin-top: 30px;">
    <el-pagination @size-change="sizeChange" @current-change="pageChange"
        :current-page="page" :page-sizes="[10, 20, 50, 100]" :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper" :total="total">
    </el-pagination>
</div>`
        }
    }

    export function getButton() {
        return {
            props: {
                type: {
                    type: String,
                    default: '1',
                },
                name: {
                    type: String,
                    default: 'test',
                },
                active: {
                    type: Boolean,
                    default: false,
                },
                width: {
                    type: String,
                    default: '220px',
                },
                height: {
                    type: String,
                    default: '80px'
                },
                font_size: {
                    type: String,
                    default: '20px'
                }
            },
            computed: {
                activeClass() {
                    let activeClass = {
                        'h-btn-hover': true,
                        'h-is-active': this.active
                    };
                    let key = 'color-' + this.type;
                    activeClass[key] = true;
                    return activeClass;
                }
            },
            template: `
<div class="h-btn">
    <button :class="activeClass" :style="{width: width, height: height, fontSize: font_size}">{{ name }}</button>
</div>            
            `

        }
    }

    export function getEditInput() {
        return {
            emits: ["update","update:value","blur"],
            props: {
                value: {
                    type: String,
                    default: '',
                },
                width: {
                    type: String,
                    default: 'auto',
                },
                height: {
                    type: String,
                    default: '',
                },
                lineHeight: {
                    type: String,
                    default: 'auto',
                },
                disabled: {
                    type: Boolean,
                    default: false,
                },
                fontSize: {
                    type: String,
                    default: '16px',
                },
                fontWeight: {
                    type: String,
                    default: 'none',
                }
            },
            setup(props, ctx) {
                let iRef = ref(null);
                onMounted(() => {
                    v.value = props.value;
                    if (iRef.value && iRef.value.$refs.input.parentNode.style && iRef.value.$refs.input.parentNode.style) {
                        let style = iRef.value.$refs.input.parentNode.style;
                        style.boxShadow = 'none';
                        if (props.height) style.height = props.height;
                    }
                })

                let v = ref('');
                watch(
                    () => props.value,
                    (after, before) => {
                        v.value = after;
                    }
                )
                watch(
                    () => v.value,
                    (after, before) => {
                        ctx.emit("update", after);
                        ctx.emit("update:value", after);
                    }
                )
                function blur() {
                    if (iRef.value && iRef.value.$refs.input.parentNode.style && iRef.value.$refs.input.parentNode.style) {
                        let style = iRef.value.$refs.input.parentNode.style;
                        style.boxShadow = 'none';
                    }
                    ctx.emit("blur", v.value);
                }
                function focus() {
                    if (iRef.value && iRef.value.$refs.input.parentNode.style && iRef.value.$refs.input.parentNode.style) {
                        let style = iRef.value.$refs.input.parentNode.style;
                        style.boxShadow = '0 0 0 1px #409eff inset';
                    }
                }
                return {
                    blur,
                    focus,
                    iRef,
                    v
                }
            },
            template: `
<div style="display: inline-block; cursor: pointer;"> 
    <el-input class="edit_input" :disabled="disabled" v-model="v" @blur="blur" @focus="focus" placeholder="" 
        :style="{width: width, lineHeight: lineHeight, textAlign: 'center', border: 'unset',  fontSize: fontSize, fontWeight: fontWeight}" ref="iRef"></el-input>
</div>  `
        }
    }

    export function getLoadSelect() {
        return {
            directives: {
                'lazy-load': {
                    updated: function(el, binding, vnode) {
                        if (el.childNodes[1].attributes["aria-describedby"] && !this.status) {
                            this.status = true;
                            let id = el.childNodes[1].attributes["aria-describedby"].value;
                            const DOM = document.querySelector(`#${id} .el-select-dropdown .el-select-dropdown__wrap`);
                            DOM.addEventListener('scroll', function listener() {
                                /**
                                 * scrollHeight 获取元素内容高度(只读)
                                 * scrollTop 获取或者设置元素的偏移值,常用于, 计算滚动条的位置, 当一个元素的容器没有产生垂直方向的滚动条, 那它的scrollTop的值默认为0.
                                 * clientHeight 读取元素的可见高度(只读)
                                 * 如果元素滚动到底, 下面等式返回true, 没有则返回false:
                                 * ele.scrollHeight - ele.scrollTop === ele.clientHeight;
                                 */
                                const condition = this.scrollHeight - this.scrollTop <= (this.clientHeight + 50);
                                if (condition) {
                                    binding.value();//执行v-lazy-load的方法
                                }
                            });
                        }
                    }
                }
            },
            props: {
                modelValue: {
                    type: Array,
                    default: [],
                },
                title: {
                    type: String,
                    default: '请选择',
                },
                options: {
                    type: Array,
                    default: []
                },
                eval: {
                    type: Function,
                    default: (itemList) => {
                        return itemList[1] + "[" + itemList[0] + "]";
                    },
                },
                filterFuc: {
                    type: Function,
                    default: (itemList, query) => {
                        const a = (item, query) => {
                            if (!item) return false;
                            if (typeof item == "number") {
                                return item.toString().indexOf(query) > -1;
                            } else {
                                return item.indexOf(query) > -1;
                            }
                        }
                        if (itemList) {
                            for (let i = 0; i < itemList.length; i++) {
                                if (a(itemList[i], query)) {
                                    return true;
                                }
                            }
                        }
                        return false
                    },
                }

            },
            data() {
                return {
                    status: false,
                    query: '',
                    queryList: [],
                    itemList: [],
                    itemSum: 0,
                    value: [],
                };
            },

            methods: {
                getMaxLen(max) {
                    return max > this.queryList.length ? this.queryList.length : max;
                },
                loadMore() {
                    for (let i = 0; i < 10; i++) {
                        if (this.queryList[this.itemSum]) {
                            this.itemList.push(this.queryList[this.itemSum]);
                            this.itemSum++;
                        }
                    }
                },
                remote_method(query) {
                    let self = this;
                    self.itemList = [];
                    self.itemSum = 0;
                    self.query = query;
                    self.queryList = [];
                    if (query) {
                        self.queryList = self.options.filter(itemList => {
                            return self.filterFuc(itemList, query);
                        });
                        self.itemSum = self.getMaxLen(20);//默认20
                        for (let i = 0; i < self.itemSum; i++) {
                            self.itemList.push(self.queryList[i]);
                        }
                    }
                },
            },
            watch: {
                value(a, b){
                    this.$emit("update:modelValue", a);
                }
            },
            template: `
<el-select v-model="value" size="large" :placeholder="title" multiple remote filterable v-lazy-load="loadMore"
    :remote-method="remote_method" >
    <el-option v-for="item in itemList" :key="item[0]" :value="item[0]" :label="eval(item)"></el-option>
</el-select>`
        }
    }

    export function getDialogWhitAct() {
        return {
            emits: ["oj8k", "cancel"],
            data: function () {
                let obj_check = (rule, value, cb) => {
                    if (value) {
                        try {
                            JSON.parse(value);
                            return cb();
                        } catch (e) {
                            return cb("配置有误");
                        }
                    } else {
                        return cb();
                    }
                };
                let arr_check = (rule, value, cb) => {
                    if (value) {
                        try {
                            let list = JSON.parse(value);
                            if (!(list instanceof Array)) return cb("配置有误");
                            return cb();
                        } catch (e) {
                            return cb("活动配置有误");
                        }
                    } else {
                        return cb();
                    }
                }
                return {
                    rule: {
                        content: [{
                            validator: arr_check, trigger: 'change'
                        }],
                        giftbag: [{
                            validator: arr_check, trigger: 'change'
                        }],
                        rank: [{
                            validator: obj_check, trigger: 'change'
                        }],
                        task: [{
                            validator: arr_check, trigger: 'change'
                        }],
                        buy: [{
                            validator: arr_check, trigger: 'change'
                        }],
                        sItemIds: [{
                            validator: arr_check, trigger: 'change'
                        }],
                        ext: [{
                            validator: obj_check, trigger: 'change'
                        }],
                        roomMap: [{
                            validator: obj_check, trigger: 'change'
                        }],
                        beginTime: [{ required: true, message: '开启不能为空', trigger: 'change' }]
                    },
                    formData: {},
                    oldData: {},
                    visible: false,

                    actType_list: [],
                    data: {},
                    cfg_map: {},
                    info: null,
                    idx: null,
                }
            },
            props: {
                modelValue: {
                    type: Boolean,
                    default: false,
                },
            },
            mounted() {
                this.init();
                hMitt.on(CONST.EVENT.init, this.handleClose2);
                hMitt.on(CONST.EVENT.cfg_act_list, this.initActList);
                hMitt.on(CONST.EVENT.cfg_act, this.initAct);
                hMitt.on(CONST.EVENT.reset_batch, this.searchAct);
                eval('getActTypeList', null);
            },
            destroyed() {
                hMitt.off(CONST.EVENT.init, this.handleClose2);
                hMitt.off(CONST.EVENT.cfg_act_list, this.initActList);
                hMitt.off(CONST.EVENT.cfg_act, this.initAct);
                hMitt.off(CONST.EVENT.reset_batch, this.searchAct);
            },
            computed: {
                unShow: function() {
                    return !this.formData.type || !this.formData.batchId;
                },
                actType_list2: function () {
                    this.init();
                    return this.actType_list.filter((info) => {
                        if (info && cfgMap["c_act"] && cfgMap["c_act"][info.type]) {
                            return info;
                        }
                    })
                }
            },
            methods: {
                initActList(rst) {
                    if (!isEmptyObject(rst)) {
                        this.actType_list = rst;
                    }
                },
                initAct(rst) {
                    if (!isEmptyObject(rst)) {
                        this.data = rst;
                    }
                },
                reset(){
                    if (!this.formData.batchId) {
                        showErr("请选择要重置的活动");
                        return;
                    }
                    confirm("确定重置该活动批次吗", () => {
                        eval('resetBatch', {batchId: this.formData.batchId});
                    });
                },
                sync() {
                    if (!this.formData.batchId) {
                        showErr("请选择要同步配置的活动");
                        return;
                    }
                    if (!this.formData.type) {
                        showErr("请选择活动类型");
                        return;
                    }
                    if (!this.formData.tempId) {
                        showErr("请选择活动模板");
                        return;
                    }
                    let info = this.info;
                    if (!info) {
                        showErr("模板数据不存在");
                        return;
                    }

                    this.formData.content = info.content;
                    this.formData.giftbag = info.giftbag;
                    this.formData.rank = info.rank;
                    this.formData.task = info.task;
                    this.formData.buy = info.buy;
                    this.formData.sItemIds = info.sItemIds;
                    this.formData.ext = info.ext;
                    showSuccess('同步结束');
                },

                init(status) {
                    this.oldData = {};
                    this.formData.batchId = '';
                    this.formData.name = '';
                    this.formData.status = 0;
                    this.formData.beginTime = '';
                    this.formData.endTime = '';
                    this.formData.showEndTime = '';
                    this.formData.noticeId = 0;

                    this.formData.content = '';
                    this.formData.giftbag = '';
                    this.formData.rank = '';
                    this.formData.task = '';
                    this.formData.buy = '';
                    this.formData.sItemIds = '';
                    this.formData.ext = '';
                    this.formData.roomMap = '';
                    if (!status) {
                        this.formData.type = '';
                        this.formData.tempId = '';
                        this.info = null;
                        this.idx = null;
                    }
                },
                getBetween(dataStr1, dataStr2) {
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
                },
                ok() {
                    let self = this;
                    if (this.unShow) {
                        showWarn("已取消配置");
                        this.$emit('cancel');
                    } else {
                        self.$refs.ruleForm.validate((valid) => {
                            if (valid) {
                                let list = [];
                                list[0] = { type: "batch", cnd: { id: this.formData.batchId }, data: {effType: 0} };
                                list[1] = { type: "temp", cnd: { id: this.formData.tempId }, data: {} };

                                let beginTime = typeof self['formData']["beginTime"]  == 'string' ? self['formData']["beginTime"]  : dateFormat(self['formData']["beginTime"]);
                                let endTime = typeof self['formData']["endTime"]  == 'string' ? self['formData']["endTime"]  : dateFormat(self['formData']["endTime"] );
                                let showEndTime = typeof self['formData']["showEndTime"]  == 'string' ? self['formData']["showEndTime"]  : dateFormat(self['formData']["showEndTime"] );

                                output(self['formData']);
                                self['formData']["beginTime"] = beginTime;
                                for (let key in self['formData']) {
                                    if (key == 'type' || key == 'tempId') continue;

                                    if (self['formData'][key] != self.oldData[key]) {
                                        if (["ext", "content", "giftbag", "rank", "task", "buy", "sItemIds"].indexOf(key) > -1) {
                                            if (self['formData'][key]) {
                                                list[1].data[key] = JSON.parse(self['formData'][key]);
                                            } else {
                                                list[1].data[key] = self['formData'][key];
                                            }
                                        } else if (key == "roomMap") {
                                            if (self['formData'][key]) {
                                                list[0].data[key] = JSON.parse(self['formData'][key]);
                                            } else {
                                                list[0].data[key] = self['formData'][key];
                                            }
                                        } else if (key == "name") {
                                            list[1].data["name"] = self['formData'][key];
                                            list[0].data["name"] = self['formData'][key];
                                        } else if (key == "endTime") {
                                            list[0].data["duration"] = self.getBetween(endTime, beginTime);
                                        } else if (key == "showEndTime") {
                                            list[0].data["duration_after"] = self.getBetween(showEndTime, endTime);
                                        } else {
                                            list[0].data[key] = self['formData'][key]
                                        }
                                    }
                                }
                                eval("configurationAct", {cfgList: list});
                                self.$emit('oj8k');
                                self.init(1);
                            } else {
                                showErr("表单校验失败");
                            }
                        })
                    }
                },
                handleClose() {
                    this.init();
                    showWarn("已取消配置");
                    this.$emit('cancel');
                },
                handleClose2() {
                    this.init();
                    this.$emit('cancel');
                },
                searchAct() {
                    this.init(1);
                    if (!this.formData.type) {
                        showErr("请选择活动类型");
                        return;
                    }
                    if (!this.formData.tempId) {
                        showErr("请选择活动模板");
                        return;
                    }
                    eval("searchActInfo", {info: this.info});
                },
                showLabel(info) {
                    return "活动类型:[" + info.type + "] 模板:[" + info.ID + "]  " + info.name + "";
                },
                getKey(item) {
                    return item.ID + '-' + item.type;
                }
            },
            watch: {
                modelValue(val) {
                    this.visible = val;
                },
                data(val) {
                    if (val && val.type == this.formData.type) {
                        for (let key in this.formData) {
                            if (val[key] || val[key] == 0) {
                                this.formData[key] = val[key];
                            }
                            this.oldData[key] = val[key];
                        }
                    }
                },
                idx(val) {
                    let info = this.info = this.actType_list2[val];
                    if (info) {
                        this.formData.tempId = info.ID;
                        this.formData.type = info.type;
                        this.init(1);
                    } else {
                        this.init();
                    }
                }
            },
            template: `
<el-dialog v-model="visible" title="活动配置" width="550px" :before-close="handleClose">
    <el-form :model="formData" :rules="rule" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="活动类型">
            <el-select  filterable clearable v-model="idx" style="width: 300px">
                <el-option v-for="(item, idx) in actType_list2" :key="getKey(item)" :label="showLabel(item)" :value="idx"/>
            </el-select>
        </el-form-item>
        <el-form-item label="模板id" prop="tempId" v-show="formData.type">
            <el-input v-model="formData.tempId" disabled style="width: 60%" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="searchAct">开启配置</el-button>
        </el-form-item>
        <br><hr><br>
        <div v-if="!unShow">
            <el-form-item label="批次" prop="batchId">
                <el-input v-model="formData.batchId" style="width: 60%" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="活动名称" prop="name">
                <el-input v-model="formData.name" style="width: 60%"></el-input>
            </el-form-item>
            <el-form-item label="status" prop="status">
                <el-input v-model="formData.status" style="width: 60%"></el-input>
             </el-form-item>
            <el-form-item label="活动开启" prop="beginTime">
                <el-date-picker v-model="formData.beginTime" format="YYYY/MM/DD HH:mm:ss"></el-date-picker>
            </el-form-item>
            <el-form-item label="活动结束" prop="endTime">
                <el-date-picker v-model="formData.endTime" format="YYYY/MM/DD HH:mm:ss"></el-date-picker>
            </el-form-item>
            <el-form-item label="活动展示期" prop="showEndTime">
                <el-date-picker  v-model="formData.showEndTime" format="YYYY/MM/DD HH:mm:ss"></el-date-picker>
            </el-form-item>
            <el-form-item label="公告notice" prop="noticeId">
                <el-input v-model="formData.noticeId" style="width: 60%"></el-input>
            </el-form-item>
            <el-form-item label="配置content" prop="content">
                <el-input type="textarea" :rows="2" v-model="formData.content"></el-input>
            </el-form-item>
            <el-form-item label="活动礼包" prop="giftbag">
                <el-input type="textarea" :rows="2" v-model="formData.giftbag"></el-input>
            </el-form-item>
            <el-form-item label="排行奖励" prop="rank">
                <el-input type="textarea" :rows="2" v-model="formData.rank"></el-input>
            </el-form-item>
            <el-form-item label="任务奖励" prop="task">
                <el-input type="textarea" :rows="2" v-model="formData.task"></el-input>
            </el-form-item>
            <el-form-item label="商店" prop="buy">
                <el-input type="textarea" :rows="2" v-model="formData.buy"></el-input>
            </el-form-item>
            <el-form-item label="显示道具" prop="sItemIds">
                <el-input type="textarea" :rows="2" v-model="formData.sItemIds"></el-input>
            </el-form-item>
            <el-form-item label="ext" prop="ext">
                <el-input type="textarea" :rows="2" v-model="formData.ext"></el-input>
            </el-form-item>
             <el-form-item label="跨服分组配置" prop="roomMap">
                <el-input type="textarea" :rows="2" v-model="formData.roomMap"></el-input>
            </el-form-item>
        </div>
    </el-form>
    <template #footer>
        <span class="dialog-footer">
            <el-button @click="handleClose">取 消</el-button>
            <el-button type="primary" @click="ok">确 定</el-button>
            <el-button type="primary" @click="sync">同步配置</el-button>
            <el-button type="primary" @click="reset">新开批次</el-button>
        </span>
    </template>
</el-dialog>
    `
        }
    }
}
