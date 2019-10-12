<template>
	<view class="content">
		<view class="input-group">
			<view class="input-row u_f_jfs u_f_ac">
				<text class="title">账号：</text>
				<input type="number" class="m-input" placeholder-class="placeholderClass" placeholder="请输入账号" v-model="account" />
				<view v-if="account.length > 0" @tap="clear" class="icon iconfont icon-guanbi"></view>
			</view>
			<view class="input-row u_f_jfs u_f_ac">
				<text class="title">密码：</text>
				<input type="text" :password="showPassword" placeholder-class="placeholderClass" class="m-input" placeholder="请输入密码" v-model="password" />
				<view v-if="password.length > 0" @tap="look" class="icon iconfont icon-liulan"></view>
			</view>
			<view class="u_f_jfe u_f_ac" @tap="revisePwd">
				忘记密码
			</view>
		</view>
		<view class="btn-row"><button type="primary" class="primary" @tap="bindLogin">登录</button></view>
		<view class="btn-row"><button type="primary" class="primary" @tap="bindRegister">注册</button></view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			providerList: [],
			showPassword: true,
			account: '',
			password: '',
			positionTop: 0
		};
	},
	methods: {
		clear() {
			this.account = '';
		},
		look() {
			this.showPassword = !this.showPassword;
		},
		initPosition() {
			/**
			 * 使用 absolute 定位，并且设置 bottom 值进行定位。软键盘弹出时，底部会因为窗口变化而被顶上来。
			 * 反向使用 top 进行定位，可以避免此问题。
			 */
			this.positionTop = uni.getSystemInfoSync().windowHeight - 100;
		},
		bindLogin() {
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
			/**
			 * 下面简单模拟下服务端的处理
			 * 检测用户账号密码是否在已注册的用户列表中
			 * 实际开发中，使用 uni.request 将账号信息发送至服务端，客户端在回调函数中获取结果信息。
			 */
			const url = 'teacherUser/login.json';
			const data = {
				account: this.account,
				password:this.password,
			}
			var _this = this;
			this.uniHttp.getJSON(
				url,
				data,
				res => {
					if (res.data.success) {
						console.log(res);
						uni.setStorage({
							key: 'token',
							data: res.data.data.token,
							success: function() {
								uni.showToast({
									title: '登陆成功',
									duration: 2000,
									icon: 'none',
								});
								let data = {
									id:res.data.data.id
								}
								_this.uniHttp.getJSON('teacherUser/selectTeacherUser.json',data,suc=>{
									console.log(suc)
									uni.setStorage({
										key: 'userInfo',
										data: suc.data.data,
										success: function() {
											// uni.redirectTo({
											// 	url: '../home/home'
											// });
											uni.switchTab({
											    url: '/pages/home/home'
											});
										}
									})		
								})
							}
						});
					}else{
						uni.showToast({
							title: res.data.msg,
							icon: 'none',
							duration: 2000
						});
					}
				},
				err => {
					console.log(err);
				}
			);
		},
		bindRegister() {
			uni.navigateTo({
				url: '../register/register'
			});
		},
		revisePwd(){
			uni.navigateTo({
				url: '../revisePwd/revisePwd'
			});
		},
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
}

.btn-row {
	margin: 20upx 10%;
}
.revise::after,.revise::before{
	height: 0;
}
</style>
