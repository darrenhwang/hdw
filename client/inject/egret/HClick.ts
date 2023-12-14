module HHW {
    export class HClick {
        public readonly TOUCH_METHODS: string[] = ['onTouchBegin', 'onTouchMove', 'onTouchEnd'];
        private _webTouchHandler: any;
        /** 存储被替换的touch */
        private _origTouch: { [method: string]: Function };
        private _isDown: boolean;
        private _status: boolean;
        constructor() {
            this._isDown = false;
            this._origTouch = {};
            this.init();
        }

        public init() {
            let self = this;
            if (isMo() && hasEgret() && !self._status) {
                self._status = true;
                let webTouchHandler = this._webTouchHandler = document.querySelector(".egret-player")['egret-player'].webTouchHandler;
                const methodList = self.TOUCH_METHODS;

                methodList.map((method) => {
                    self._origTouch[method] = webTouchHandler.touch[method];
                });

                methodList.map((method) => {
                    webTouchHandler.touch[method] = function (...args) {
                        self._origTouch[method].apply(webTouchHandler.touch, args);
                        self['_' + method].apply(self, args);
                    }
                });
            }
        }

        private _onTouchBegin(x, y, identifier) {
            this._isDown = true;

            let target = document.querySelector(".egret-player")['egret-player'].stage.$hitTest(x, y);
            if (getSwitchMap(CONST.SWITCH.listen_egret)) {//开启开关
                mousedown(target);
            }
            if (getSwitchMap(CONST.SWITCH.light_egret)) {
                el_expand.drawTarget(target, true);
            }
        }

        private _onTouchMove(x, y, identifier) {
            if (this._isDown) {

            }
        }

        private _onTouchEnd(x, y, identifier) {
            if (this._isDown == false) return;
            this._isDown = false;
        }
    }
    export const hClick: HClick = new HClick();
}