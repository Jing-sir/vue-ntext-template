import { createRouter, createWebHistory } from 'vue-router';
import routes from '../routes';
import { TITLE } from '../utils/constant';

const history = createWebHistory();

const router = createRouter({
    history,
    routes,
    scrollBehavior(to, from, savedPosition) {
        return savedPosition || { x: 0, y: 0 };
    },
});

const routerNext = {
    /* setLanguage({ meta }) { // 语言设置
        return Promise.resolve(true);
    }, */
    setTitle({ meta }) { // 窗口标题设置
        const { title } = meta;
        window.document.title = typeof title === 'function' ? title() : title || TITLE; // 动态修改窗口标题
        return Promise.resolve(true);
    },
    /* setRequiresAuth({ meta }) { // 路由鉴权
        const { requiresAuth } = meta;
        return Promise.resolve(true);
    }, */
    setRedirect({ meta }) { // 动态路由重定向
        const { redirection } = meta;
        // eslint-disable-next-line prefer-rest-params
        if (redirection) return Promise.resolve(typeof redirection === 'function' ? redirection.apply(router, arguments) : redirection);
        return Promise.resolve(true);
    },
};

router.beforeEach((to, from, next) => Promise.all(
    Object.values(routerNext).map(func => func(to, from)),
).then((response) => {
    const path = [...response].reverse().find(_path => _path && typeof _path === 'string');

    switch (true) {
        case Boolean(path):
            return next({ path, replace: true });
        case response.some(isNext => !isNext):
            return next(false);
        default:
            return next();
    }
}).catch(error => next(error)));

router.afterEach((/* to, from */) => { // 自定义元素滚动到顶部
    const el = document.getElementById('app');
    if (el) el.scrollTop = 0;
});

export const route = [
    'params',
    'query',
    'path',
    'name',
    'meta',
    'matched',
    'hash',
    'fullPath',
].reduce(
    (acc, cur) => Object.defineProperty(acc, cur, { get: () => router.history.current[cur] }) || acc,
    Object.create(null),
);

export default router;
