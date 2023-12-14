/// <reference path="./page.ts" />
module HHW {
    export const routes = [
        {
            path: '/',
            redirect: '/center'
        },
        {
            path: '/center',
            component: router_center(),
            children: [
                {
                    path: CONST.MENU.usrInfo,
                    component: router_center_usrInfo(),
                },
                {
                    path: CONST.MENU.appList,
                    component: router_center_appList(),
                },
                {
                    path: CONST.MENU.egret,
                    component: router_center_egret(),
                },
                {
                    path: CONST.MENU.actList,
                    component: router_center_actList(),
                },
                {
                    path: CONST.MENU.teamCfg,
                    component: router_center_teamCfg(),
                },
                {
                    path: CONST.MENU.robot,
                    component: router_center_robot(),
                },
            ],
        },

    ]

    export const router = VueRouter.createRouter({
        history: VueRouter.createWebHashHistory(),
        routes,
    })

    router.beforeEach((to, from, next) => {
        // console.log("路由跳转了");
        if (from && from.path === "/" && to && to.path !== "/center") {
            next({
                path: "/center",
            })
        } else {
            next();
        }
    });
    router.afterEach(() => {
        window.scrollTo(0, 0);
    });
}
