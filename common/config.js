const _serverAddrImg = "http://47.98.249.149:8020/readbaoss/"; //查看线上服务器图片地址
const _serverAddr = "http://47.98.249.149:8020/readba/"; //线上服务器地址
// const _serverAddr = "http://192.168.1.105:8080/zhijian-app-web/"; //本地服务器地址


// cookie 的本地存储位置
const COOKIE_KEY = '__cookie_key__';
const cleanUserCookie = () => {
	uni.setStorage({
	    key: COOKIE_KEY,
	    data: '',
	});
}
const normalizeUserCookie = (cookies = '') => {
	let __cookies = [];
	(cookies.match(/([\w\-.]*)=([^\s=]+);/g) || []).forEach((str) => {
		if (str !== 'path=/;' && str.indexOf('csrfToken=') !== 0) {
			__cookies.push(str);
		}
	});
	uni.setStorage({
	    key: COOKIE_KEY,
	    data: __cookies,
	});
};
/* const seveCsrfTokenCookie = (cookie) => {
	if (cookie) {
		wx.setStorageSync(COOKIE_KEY, cookie);
	}
}; */

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
export default {
	_serverAddrImg,
	_serverAddr,
	postDataFormat,
	COOKIE_KEY,
	cleanUserCookie,
	normalizeUserCookie,
	// seveCsrfTokenCookie
};
