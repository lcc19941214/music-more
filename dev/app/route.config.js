export function configRouter (router) {
  router.map({
    '/index': {
      name: 'index',
      component: require('./views/index.vue')
    },
    '/about': {
      name: '/about',
      component: require('./views/about.vue')
    }
  });

  router.redirect({
    '*': '/about'
  });
}