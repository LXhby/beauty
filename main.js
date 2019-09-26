import Vue from 'vue'
import App from './App'
import store from './common/store/index.js'
Vue.config.productionTip = false
import Request from './plugins/request/js/index'
import router from './common/uni-app-router/useRouter.js'
App.mpType = 'app'
Vue.prototype.$http = Request();
import Moment from 'moment'
Vue.filter('convertTime', function (data, formatStr) {
  return Moment(data).format(formatStr)
})
const app = new Vue({
	store,
    ...App,
	router
})
app.$mount()
