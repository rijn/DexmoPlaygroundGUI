import Vue from 'vue';
import Router from 'vue-router';
import Hello from 'components/Hello';
import Main from 'components/Main';
import Server from 'components/Server';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'hello',
            component: Hello
        },
        {
            path: '/main',
            name: 'main',
            component: Main
        },
        {
            path: '/server',
            name: 'server',
            component: Server
        }
    ]
});
