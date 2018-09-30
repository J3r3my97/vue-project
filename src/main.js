// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import routes from "./routes";
import VueRouter from "vue-router";
import { store } from "./store/index";
import NavBar from "./components/NavBar";

window.eventBus = new Vue();

Vue.config.productionTip = false;
Vue.use(VueRouter);

const router = new VueRouter({
  routes
});

new Vue({
  el: "#app",
  router,
  components: { NavBar },
  store,
  template: "<NavBar/>"
});
