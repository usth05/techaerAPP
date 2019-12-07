<template>
	<view class="content">
		<view class="input-group">
			<!-- 账号 -->
			<view class="input-row u_f_jfs u_f_ac">
				<text class="title">账号：</text>
				<input type="number" class="m-input" placeholder-class="placeholderClass" placeholder="请输入手机号" v-model="account" />
				<view v-if="account.length > 0" @tap="clear(1)" class="icon iconfont icon-guanbi"></view>
			</view>
			<!-- 验证码 -->
			<view class="input-row u_f_jfs u_f_ac">
				<text class="title">验证码：</text>
				<input type="number" class="m-input" placeholder-class="placeholderClass" placeholder="请输入短信验证码" v-model="vCode" />
				<button class="code" type="primary" @tap="setUp($event)" v-if="!isOk">获取验证码</button>
				<button class="code" style="background: #bbb;" v-if="isOk">
					重新发送
					<span>{{ n }}</span>
				</button>
			</view>
			<!-- 密码 -->
			<view class="input-row u_f_jfs u_f_ac">
				<text class="title">密码：</text>
				<input type="text" :password="showPassword" placeholder-class="placeholderClass" class="m-input" placeholder="请输入密码" v-model="password" />
				<view v-if="password.length > 0" @tap="look(1)" class="icon iconfont icon-liulan"></view>
			</view>
			<view class="input-row u_f_jfs u_f_ac">
				<text class="title">确认密码：</text>
				<input type="text" :password="showPassword1" placeholder-class="placeholderClass" class="m-input" placeholder="请输入密码" v-model="conPassword" />
				<view v-if="conPassword.length > 0" @tap="look(2)" class="icon iconfont icon-liulan"></view>
			</view>
			<!-- 姓名 -->
			<view class="input-row u_f_jfs u_f_ac">
				<text class="title">姓名：</text>
				<input type="text" class="m-input" placeholder-class="placeholderClass" placeholder="请输入姓名" v-model="realName" />
				<view v-if="realName.length > 0" @tap="clear(2)" class="icon iconfont icon-guanbi"></view>
			</view>
			<!-- 单位 -->
			<view class="input-row u_f_jfs u_f_ac">
				<text class="title">单位：</text>
				<input type="text" class="m-input" placeholder-class="placeholderClass" placeholder="请输入工作地址" v-model="unit" />
				<view v-if="unit.length > 0" @tap="clear(7)" class="icon iconfont icon-guanbi"></view>
			</view>
			<!-- 微信 -->
			<view class="input-row u_f_jfs u_f_ac">
				<text class="title">微信：</text>
				<input type="text" class="m-input" placeholder-class="placeholderClass" placeholder="请输入微信" v-model="weixin" />
				<view v-if="weixin.length > 0" @tap="clear(3)" class="icon iconfont icon-guanbi"></view>
			</view>
			<!-- QQ -->
			<view class="input-row u_f_jfs u_f_ac">
				<text class="title">QQ：</text>
				<input type="number" class="m-input" placeholder-class="placeholderClass" placeholder="请输入QQ" v-model="tenxun" />
				<view v-if="tenxun.length > 0" @tap="clear(4)" class="icon iconfont icon-guanbi"></view>
			</view>
			<!-- 紧急电话 -->
			<view class="input-row u_f_jfs u_f_ac">
				<text class="title">紧急电话：</text>
				<input type="number" class="m-input" placeholder-class="placeholderClass" placeholder="请输入紧急电话" v-model="telephone" />
				<view v-if="telephone.length > 0" @tap="clear(5)" class="icon iconfont icon-guanbi"></view>
			</view>
			<!-- 个人情况 -->
			<view class="input-row u_f_jfs u_f_ac">
				<text class="title">个人情况：</text>
				<input type="text" class="m-input" placeholder-class="placeholderClass" placeholder="请输入个人情况" v-model="picture" />
				<view v-if="picture.length > 0" @tap="clear(6)" class="icon iconfont icon-guanbi"></view>
			</view>
		</view>
		<view class="btn-row"><button type="primary" class="primary" @tap="register">注册</button></view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			providerList: [],
			showPassword: true,
			showPassword1: true,
			realName: '', //姓名
			account: '', //账号
			password: '', //密码
			conPassword: '', //确认密码
			telephone: '', //紧急电话
			picture: '', //个人情况
			weixin: '', //微信
			tenxun: '', //qq
			vCode: '', //填写的验证码
			code: '', //获取的验证码
			isOk: false,
			unit: '', //单位
			n: 60,
			positionTop: 0
		};
	},
	methods: {
		clear(i) {
			switch (i) {
				case 1:
					this.account = '';
					break;
				case 2:
					this.realName = '';
					break;
				case 3:
					this.weixin = '';
					break;
				case 4:
					this.tenxun = '';
					break;
				case 5:
					this.telephone = '';
					break;
				case 6:
					this.picture = '';
					break;
				case 7:
					this.unit = '';
					break;
				default:
					break;
			}
		},
		look(i) {
			switch (i) {
				case 1:
					this.showPassword = !this.showPassword;
					break;
				case 2:
					this.showPassword1 = !this.showPassword1;
					break;
			}
		},
		setUp() {
			var that = this;
			if (/^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/.test(that.account)) {
				that.n = 60;
				var time = setInterval(function() {
					that.isOk = true;
					that.n--;
					if (that.n < 0) {
						clearInterval(time);
						that.isOk = false;
					}
				}, 1000);
				var url = 'teacherUser/sendCode.json';
				var data = {
					mobile: this.account
				};
				this.uniHttp.getJSON(
					url,
					data,
					res => {
						// console.log(res.header);
						for (let i in res.header) {
							if (i == 'Set-Cookie') {
								console.log(res.header[i]);
								this.config.cleanUserCookie();
								this.config.normalizeUserCookie(res.header[i]);
								uni.showToast({
									icon: 'none',
									title: res.data.msg
								});
							}
						}
					},
					err => {
						console.log(err);
					}
				);
			} else {
				uni.showToast({
					icon: 'none',
					title: '手机号码有误'
				});
				return;
			}
		},
		initPosition() {
			/**
			 * 使用 absolute 定位，并且设置 bottom 值进行定位。软键盘弹出时，底部会因为窗口变化而被顶上来。
			 * 反向使用 top 进行定位，可以避免此问题。
			 */
			this.positionTop = uni.getSystemInfoSync().windowHeight - 100;
		},
		register() {
			/**
			 * 客户端对账号信息进行一些必要的校验。
			 * 实际开发中，根据业务需要进行处理，这里仅做示例。
			 */
			var mPattern = /^1[3456789]\d{9}$/;
			if (!mPattern.test(this.account)) {
				uni.showToast({
					icon: 'none',
					title: '请输入正确的手机号'
				});
				return;
			}
			if (this.password.length < 6) {
				uni.showToast({
					icon: 'none',
					title: '密码最短为 6 个字符'
				});
				return;
			}
			if (this.password != this.conPassword) {
				uni.showToast({
					icon: 'none',
					title: '输入的俩次的密码不一致'
				});
				return;
			}
			if (!this.realName) {
				uni.showToast({
					icon: 'none',
					title: '请输入姓名'
				});
				return;
			}
			if (!this.weixin) {
				uni.showToast({
					icon: 'none',
					title: '请输入微信'
				});
				return;
			}
			if (!this.tenxun) {
				uni.showToast({
					icon: 'none',
					title: '请输入QQ'
				});
				return;
			}
			if (!mPattern.test(this.telephone)) {
				uni.showToast({
					icon: 'none',
					title: '请输入正确的紧急电话'
				});
				return;
			}
			if (!this.picture) {
				uni.showToast({
					icon: 'none',
					title: '请输入个人情况'
				});
				return;
			}
			/**
			 * 下面简单模拟下服务端的处理
			 * 检测用户账号密码是否在已注册的用户列表中
			 * 实际开发中，使用 uni.request 将账号信息发送至服务端，客户端在回调函数中获取结果信息。
			 */
			const data = {
				account: this.account,
				password: this.password,
				realName: this.realName,
				vCode: this.vCode,
				weixin: this.weixin,
				tenxun: this.tenxun,
				telephone: this.telephone,
				picture: this.picture,
				unit: this.unit
			};
			console.log(JSON.stringify(data))
			let url = 'teacherUser/registerUser.json';
			this.uniHttp.getJSON(
				url,
				data,
				res => {
					console.log(res);
					if (res.data.success) {
						uni.showToast({
							icon: 'none',
							title: '注册成功'
						});
						uni.redirectTo({
							url: '../login/login'
						});
					} else {
						uni.showToast({
							icon: 'none',
							title: '注册失败，请重启获取验证码后注册'
						});
					}
				},
				err => {
					uni.showToast({
						icon: 'none',
						title: '注册失败'
					});
				}
			);
		}
	}
};
</script>

<style>
/* @import '../../common/iconfont.css'; */
.content {
	padding: 0 20upx;
	box-sizing: border-box;
}

.placeholderClass {
	font-size: 28upx;
	color: #cccccc;
}

.input-group {
	margin-bottom: 100upx;
}

.input-row {
	padding: 10upx;
	border-bottom: 2upx solid #cccccc;
	position: relative;
}
.icon {
	width: 60upx;
	height: 60upx;
	position: absolute;
	top: 0;
	right: 0;
	bottom: 0;
	margin: auto;
	z-index: 10;
}

.btn-row {
	margin: 20upx 10%;
}
.code {
	font-size: 25upx;
	width: 200upx;
	position: absolute;
	right: 5upx;
	z-index: 99;
}
.title {
	min-width: 20%; 
} 
</style>
