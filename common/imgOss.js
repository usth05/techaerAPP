import config from "./config.js"
let server = ""; //申请到的阿里云OSS地址
let OSSAccessKeyId = ""; //申请到的阿里云AccessKeyId和AccessKeySecret
let AccessKeySecret = ""; //需要用自己申请的进行替换
let files = []; //存储文件信息的数组
let fname = ""; //表示文件名
let dir = ""; //指定上传目录，此处指定上传到app目录下
let now;
let nowTime; //服务器时间对象
let testName; //本地测试用的
/*
 * 阿里云参数设置，用于计算签名signature
 */
let policyBase64 = "";
let message = policyBase64;

let signature = "";
// 获取阿里云OSS地址，AccessKeyId和AccessKeySecret
function getParamA(data) {
	let _this = this;
	const header = {
		'Content-Type': 'application/x-www-form-urlencoded',
	}
	uni.request({
		url: config._serverAddr + "practice/uploadOss.json", //仅为示例，并非真实接口地址。
		method: 'POST',
		xhrFields: {
			withCredentials: true
		},
		crossDomain: true,
		header: header,
		data: data,
		success: (res) => {
			if (res.data.success) {
				OSSAccessKeyId = res.data.data.accessid;
				AccessKeySecret = res.data.data.accessKey;
				signature = res.data.data.signature;
				server = res.data.data.host;
				dir = res.data.data.dir;
				policyBase64 = res.data.data.policy;
				now = res.data.data.currentTime;
				nowTime = new Date(parseInt(now + "000"));
			}
		},
		fail: (err) => {
			console.log(err)
		},
		complete: (data) => {
			console.log(data)
		}
	});
}

function uniImgOss() {
	var _succCallback = function() {};
	var _errCallback = function() {};
};
uniImgOss.prototype.getParam = getParamA;
uniImgOss.prototype.getJSON = function(url, succCallback, errCallback) {
	let _this = this;
	let n = url.substr(url.lastIndexOf('/') + 1);
	fname = n;
	files.unshift({
		name: "uploadkey" + index,
		path: url
	});
	index++;
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
	if (files.length <= 0) {
		plus.nativeUI.alert("没有添加上传文件！");
		return;
	}
	var task = plus.uploader.createUpload(server, {
		method: "POST",
	}, function(t, status) { //上传完成
		_this._succCallback(t, status, testName)
	});
	var suffix1 = get_suffixA(fname); //文件后缀  例如   .jpg
	var keyname = dir + getUploadPathA() + new Date().getTime() + suffix1;

	testName = keyname;

	//按照之前说明的参数类型，按顺序添加参数
	task.addData("key", keyname);
	task.addData("policy", policyBase64);
	task.addData("OSSAccessKeyId", OSSAccessKeyId);
	task.addData("success_action_status", "200");
	task.addData("signature", signature);
	var f = files[0];
	task.addFile(f.path, {
		key: "file",
		name: "file",
		mime: "image/jpg"
	});
	task.start();
}

//得到文件名的后缀
function get_suffixA(filename) {
	let pos = filename.lastIndexOf('.');
	let suffix = '';
	if (pos != -1) {
		suffix = filename.substring(pos)
	}
	return suffix;
}
// 添加文件
let index = 1;

//获取上传路径
function getUploadPathA() {
	console.log(nowTime)
	let NowDate = nowTime.getFullYear() + ((nowTime.getMonth() + 1) < 10 ? "0" : "") + (nowTime.getMonth() + 1) + (nowTime
		.getDate() <
		10 ? "0" : "") + nowTime.getDate();
	let uploadeUrl = "/" + NowDate + "/";
	return uploadeUrl;
}

function resizeA(src) {
	uni.compressImage({
		src: src,
		success: res => {
			appendFileA(res.tempFilePath)
		},
		complete: data => {
			console.log(data);
		}
	})
}
export default {
	uniImgOss
}
