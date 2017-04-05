import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import { routes } from './routes.js'
import store from './store/store.js'

Vue.use(VueRouter);
Vue.use(VueResource);

//configure routes
const router = new VueRouter({
  routes
});

//configure authorization of application
router.beforeEach((to, from, next) => {
  //if no user logged in then redirect to login page  
  if(to.path != '/' && !store.getters.user) {
    next('/');
  }  
  else {
    next();
  }
});

//Event Bus to communicate between siblings
export const eventBus = new Vue();


new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
});


