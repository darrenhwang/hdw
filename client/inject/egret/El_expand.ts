module HHW {
    class El_expand {
        private _hashCode;
        public keyMap;

        constructor() {
            this.keyMap = {
                data: 'data',
                x: 'x',
                y: 'y',
                width: 'width',
                height: 'height',
                visible: 'visible',
                source: 'source',
                skinName: 'skinName',
                touchEnabled: 'touchEnabled',
                zIndex: 'zIndex',
                icon: 'icon',
                text: 'text',
                label: 'label',
            };
        }

        /**
         * el 操作实例对象
         * isDraw 是否渲染
         * num_H 16进制数字
         */
        public drawTarget(el?, isDraw?: boolean, num_H?) {
            if (hasEgretPlugin()) {
                currentInspector.mask.metrics.visible = false;//隐藏坐标
                currentInspector.mask.shape.graphics.clear()//清除
                if (isDraw) {
                    if (this._hashCode == el.hashCode) {
                        this._hashCode = null;
                    } else {
                        this._hashCode = el.hashCode;
                        currentInspector.mask.drawTarget_hhw(el, num_H)//渲染遮罩
                        currentInspector.mask.showMetrics(el)
                    }
                } else {
                    this._hashCode = null;
                }

            }
        }

        /** 获取父组件实例列表 */
        public $getParentList(el) {
            let list = [];
            let target = el;
            while (target) {
                list.push(target);
                target = target.$parent;
            }
            return list;
        }

        /** /获取父组件实例 下的数据 */
        public $getParentListByData(el) {
            return this.$getParentList(el);
        }

        /** 获取子组件实例列表 */
        public $getChildrenList(el) {
            return el.$children || [];
        }

        /** 返回该页面的树形结构 */
        public $show_tree() {
            // let data = Object.assign(currentStage);
            let tree: EgretInfo = {};
            let hashMap = {};

            const getTreeNode = (parent, tree: EgretInfo) => {
                if (parent && parent.hashCode) {
                    tree.hashCode = parent.hashCode;
                    hashMap[parent.hashCode] = parent;
                    parent.class_name = parent.getDisplayName();
                    let _children = parent.$children;
                    if (_children && _children.length) {
                        tree.children = [];
                        for (let i = 0; i < _children.length; i++) {
                            let child = _children[i];
                            tree.children[i] = {};
                            getTreeNode(child, tree.children[i]);
                        }
                    }
                }
            }

            let scene = document.querySelector(".egret-player")["egret-player"].stage.$children[0].$children[0]
            getTreeNode(scene, tree);

            const getTreeData = (parent: EgretInfo) => {
                if (parent && parent.hashCode && hashMap && hashMap[parent.hashCode]) {
                    let instance = hashMap[parent.hashCode];
                    parent.disabled_list = ['hashCode', 'name', 'class_name'];
                    parent.name = instance.name;
                    parent.class_name = instance.class_name;
                    parent.__label__ = instance.name + ` 【` +  instance.class_name + `】`;
                    if (instance.class_name != "egret.Stage") {//egret.Stage不允许访问这些属性
                        parent.visible = instance.visible;
                        parent.x = instance.x;
                        parent.y = instance.y;
                    }
                    parent.width = instance.width;
                    parent.height = instance.height;
                    if (instance.data && typeof instance.data == 'object') {
                        let data = {};
                        for(let key in instance.data) {
                            let d = instance.data[key];
                            if (d && typeof d == 'object') {
                                try {
                                    JSON.stringify(d);
                                    data[key] = d;
                                } catch (error) {
                                    if (d.__class__) {
                                        data[d.__class__] = "Object";
                                    }
                                }
                            } else {
                                data[key] = d;
                            }

                        }
                        parent.data = data;
                    } else {
                        parent.data = instance.data;
                    }

                    parent.source = instance.source;
                    parent.skinName = instance.skinName;
                    parent.touchEnabled = instance.touchEnabled;
                    parent.zIndex = instance.zIndex;
                    if (instance.icon && typeof instance.icon == "object") {
                        parent.icon = instance.icon.__class__;
                        parent.disabled_list.push('icon');
                    } else {
                        parent.icon = instance.icon;
                    }
                    parent.resModule = instance.resModule;
                    parent.text = instance.text;
                    parent.label = instance.label;

                    let children = parent.children;
                    if (children && children.length) {
                        for (let i = 0; i < children.length; i++) {
                            let child = children[i];
                            if (child) getTreeData(child);
                        }
                    }
                }
            }

            getTreeData(tree);

            return {
                tree: JSON.parse(JSON.stringify(tree)),
                hashMap,
            }
        }
    }

    export const el_expand = new El_expand();
}