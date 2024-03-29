import Vue from 'vue'
import App from './App'
import config from "./common/config.js"
import request from "./common/request.js"
import imgOss from "./common/imgOss.js"
import videoOss from './common/videoOss.js'
Vue.config.productionTip = false

Vue.prototype.config = config 

Vue.prototype.uniHttp = new request.uniHttp()
Vue.prototype.$http = request.http
Vue.prototype.$axios = request.axios
Vue.prototype.$imgOss = new imgOss.uniImgOss()
Vue.prototype.$videoOss = new videoOss.uniVideoOss()
App.mpType = 'app'



const app = new Vue({
	...App
})
app.$mount()
