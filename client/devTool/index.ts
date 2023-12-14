/// <reference path="./component.ts" />
/// <reference path="./router.ts" />
module HHW {
    const App = {
        
    }
    app = Vue.createApp(App);
    app.use(ElementPlus, {
        locale: zhCn
    })
    .use(router)
    .component('hhw-dialog', getDialog())
    .component('hhw-table', getTable())
    .component('hhw-button', getButton())
    .component('hhw-edit-input', getEditInput())
    .component('hhw-load-select', getLoadSelect())
    .component('hhw-dialog-act', getDialogWhitAct())
    .mount('#app')
}