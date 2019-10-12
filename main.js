import Vue from 'vue'
import App from './App'
import config from "./common/config.js"
import request from "./common/request.js"

Vue.config.productionTip = false

Vue.prototype.config = config

Vue.prototype.uniHttp = new request.uniHttp()
Vue.prototype.$http = request.http
Vue.prototype.$axios = request.axios
App.mpType = 'app'

 

const app = new Vue({
	...App
})
app.$mount()
