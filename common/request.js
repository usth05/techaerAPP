import config from "./config.js"
function uniHttp() {
	var _succCallback = function() {};
	var _errCallback = function() {};
	var _comCallbac = function() {};
};
uniHttp.prototype.getJSON = function(url, data, succCallback, errCallback, comCallbac) {
	let _this = this;
	let cookies = '';
	let token = ';'
	if (typeof(succCallback) == "function") {
		this._succCallback = succCallback;
	} else {
		this._succCallback = function() {};
	}
	if (typeof(errCallback) == "function") {
		this._errCallback = errCallback;
	} else {
		this._errCallback = function() {};
	}
	if (typeof(comCallbac) == "function") {
		this._comCallbac = comCallbac;
	} else {
		this._comCallbac = function() {};
	}
	uni.getStorage({
		key: config.COOKIE_KEY,
		success: function(res) {
			cookies = res.data[0];
		}
	});
	const header = {
		'Content-Type': 'application/x-www-form-urlencoded',
		'Cookie': cookies,
	}
	uni.getStorage({
		key: 'token',
		success: function(res) {
			token = res.data;
			header.token = token
		}
	});
	setTimeout(() => {
		uni.request({
			url: config._serverAddr + url, //仅为示例，并非真实接口地址。
			method: 'POST',
			xhrFields: {
				withCredentials: true
			},
			crossDomain: true,
			header: header,
			data: postDataFormat(data),
			success: (res) => {
				_this._succCallback(res)
			},
			fail: (err) => {
				_this._errCallback(err);
			},
			complete: (data) => {
				_this._comCallbac(data);
			}
		});
	}, 200)
}

function postDataFormat(obj) {
	if (typeof obj != "object") {
		console.log("输入的参数必须是对象");
		return;
	}
	var arr = new Array();
	var i = 0;
	for (var attr in obj) {
		arr[i] = encodeURIComponent(attr) + "=" + encodeURIComponent(obj[attr]);
		i++;
	}
	return arr.join("&");
	//  }
}

// axios 
import axios from '../js_sdk/gangdiedao-uni-axios/index.js'
axios.defaults.withCredentials = true;
/**
 * 请求接口日志记录
 */
function _reqlog(req) {
	if (process.env.NODE_ENV === 'development') {
		console.log("请求地址：" + req.url, req.data || req.params)
	}
	//TODO 调接口异步写入日志数据库
}

/**
 * 响应接口日志记录
 */
function _reslog(res) {
	if (process.env.NODE_ENV === 'development') {
		console.log(`${res.config.url}响应结果：`, res)
	}
}

// 创建自定义接口服务实例
const http = axios.create({
	withCredentials: true,
	headers: {
		'Content-Type': 'application/x-www-form-urlencoded',
	},
	crossDomain: true,
})

// 拦截器 在请求之前拦截
http.interceptors.request.use(config => {
	// code...
	_reqlog(config)
	return config
})

// 拦截器 在请求之后拦截
http.interceptors.response.use(response => {
	_reslog(response)
	// code...
})

// 获取伤处权限
export default {
	uniHttp,
	http,
	axios
};
