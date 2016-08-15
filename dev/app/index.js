import Vue from 'vue'
import VueRouter from 'vue-router'
import { configRouter } from './route.config.js'

Vue.use(VueRouter);
require('less/index.less');

const router = new VueRouter({
  history: true
});

configRouter(router);
const App = Vue.extend(require('./app.vue'));

router.start(App, '#app');
