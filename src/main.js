import Vue from 'vue'
import VueResource from 'vue-resource'
import VueLocalStorage from 'vue-localstorage'
import App from './App.vue'

Vue.use(VueResource)
Vue.use(VueLocalStorage)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
