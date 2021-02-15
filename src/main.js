import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import LoadingPage from "@/components/general/LoadingPage";

/*FontAwesome*/
import "@fortawesome/fontawesome-free";
import "@fortawesome/fontawesome-free/css/fontawesome.min.css";
import "@fortawesome/fontawesome-free/css/brands.min.css";
import "@fortawesome/fontawesome-free/css/solid.min.css";
import "@fortawesome/fontawesome-free/js/fontawesome.min.js";

Vue.config.productionTip = false
Vue.component("LoadingPage", LoadingPage)

Vue.filter("numberPrice", value => {
  value = Number(value);
  if(!isNaN(value)) {
    return value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL"
    });
  } else {
    return ""
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
