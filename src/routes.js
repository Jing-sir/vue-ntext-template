export default [
    {
        path: '/',
        name: 'main',
        component: () => import(/* webpackChunkName: "main" */ './views/Main.vue'),
        children: [
            {
                path: '',
                name: 'home',
                component: () => import(/* webpackChunkName: "home" */ './views/Home.vue'),
                meta: { title: '首页' }, //
            },
        ],
    },
];
