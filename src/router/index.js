import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            name: 'home',
            component: resolve => require.ensure([], () => {
                resolve(require('../components/home/home.vue'))
            }, 'home')
        },
        {
            path: '/detail',
            name: 'detail',
            component: resolve => require.ensure([], () => {
                resolve(require('../components/home/detail.vue'))
            }, 'home')
        },
        {
            path: '/events',
            name: 'events',
            component: resolve => require.ensure([], () => {
                resolve(require('../components/home/events.vue'))
            }, 'home')
        },
        {
            path: '/botany',
            name: 'botany',
            component: resolve => require.ensure([], () => {
                resolve(require('../components/home/botany.vue'))
            }, 'home')
        },
        {
            path: '/oldTrees/:id/:name',
            name: 'oldTrees',
            component: resolve => require.ensure([], () => {
                resolve(require('../components/home/oldTrees.vue'))
            }, 'home')
        }
    ]
})