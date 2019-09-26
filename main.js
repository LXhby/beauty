import Vue from 'vue'
import App from './App'
import store from './common/store/index.js'
Vue.config.productionTip = false
import Request from './plugins/request/js/index'
App.mpType = 'app'
Vue.prototype.$http = Request();
const app = new Vue({
	store,
    ...App
})
app.$mount()
