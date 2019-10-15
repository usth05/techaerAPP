<template>
	<view class="content">
		<view class="input-group">
			<!-- 姓名 -->
			<view class="input-row u_f_jfs u_f_ac">
				<text class="title">姓名：</text>
				<input type="text" class="m-input" placeholder-class="placeholderClass" placeholder="请输入姓名" v-model="user.realName" />
				<view v-if="user.realName.length > 0" @tap="clear(2)" class="icon iconfont icon-guanbi"></view>
			</view>
			<!-- 单位 -->
			<view class="input-row u_f_jfs u_f_ac">
				<text class="title">单位：</text>
				<input type="text" class="m-input" placeholder-class="placeholderClass" placeholder="请输入工作地址" v-model="user.unit" />
				<view v-if="user.unit.length > 0" @tap="clear(7)" class="icon iconfont icon-guanbi"></view>
			</view>
			<!-- 微信 -->
			<view class="input-row u_f_jfs u_f_ac">
				<text class="title">微信：</text>
				<input type="text" class="m-input" placeholder-class="placeholderClass" placeholder="请输入微信" v-model="user.weixin" />
				<view v-if="user.weixin.length > 0" @tap="clear(3)" class="icon iconfont icon-guanbi"></view>
			</view>
			<!-- QQ -->
			<view class="input-row u_f_jfs u_f_ac">
				<text class="title">QQ：</text>
				<input type="number" class="m-input" placeholder-class="placeholderClass" placeholder="请输入QQ" v-model="user.tenxun" />
				<view v-if="user.tenxun.length > 0" @tap="clear(4)" class="icon iconfont icon-guanbi"></view>
			</view>
			<!-- 紧急电话 -->
			<view class="input-row u_f_jfs u_f_ac">
				<text class="title">紧急电话：</text>
				<input type="number" class="m-input" placeholder-class="placeholderClass" placeholder="请输入紧急电话" v-model="user.telephone" />
				<view v-if="user.telephone.length > 0" @tap="clear(5)" class="icon iconfont icon-guanbi"></view>
			</view>
			<!-- 个人情况 -->
			<view class="input-row u_f_jfs u_f_ac">
				<text class="title">个人情况：</text>
				<input type="text" class="m-input" placeholder-class="placeholderClass" placeholder="请输入个人情况" v-model="user.picture" />
				<view v-if="user.picture.length > 0" @tap="clear(6)" class="icon iconfont icon-guanbi"></view>
			</view>
		</view>
		<view class="btn-row"><button type="primary" class="primary" @tap="register">修改个人信息</button></view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			providerList: [],
			showPassword: true,
			showPassword1: true,
			isOk: false,
			n: 60,
			positionTop: 0,
			user:{
				
			}
		};
	},
	onShow() {
		let _this = this;
		uni.getStorage({
		    key: 'userInfo',
		    success: function (res) {
				if(res.data){
					_this.user = res.data;
					_this.user.img = '../../static/images/homeed.png';
				}
		    }
		});
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
			if (!this.user.realName) {
				uni.showToast({
					icon: 'none',
					title: '请输入姓名'
				});
				return;
			}
			if (!this.user.weixin) {
				uni.showToast({
					icon: 'none',
					title: '请输入微信'
				});
				return;
			}
			if (!this.user.tenxun) {
				uni.showToast({
					icon: 'none',
					title: '请输入QQ'
				});
				return;
			}
			var mPattern = /^1[3456789]\d{9}$/;
			if (!mPattern.test(this.user.telephone)) {
				uni.showToast({
					icon: 'none',
					title: '请输入正确的紧急电话'
				});
				return;
			}
			if (!this.user.picture) {
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
			// const data = this.user;
			const data = {
				realName: this.user.realName,
				weixin: this.user.weixin,
				tenxun: this.user.tenxun,
				telephone: this.user.telephone,
				picture: this.user.picture,
				unit: this.user.unit,
				id:this.user.id
			};
			const _this = this;
			console.log(JSON.stringify(data))
			let url = 'teacherUser/updateTeacherUser.json';
			this.uniHttp.getJSON(
				url,
				data,
				res => {
					console.log(res);
					if (res.data.success) {
						uni.setStorage({
							key:'userInfo',
							data:_this.user,
							success() {
								uni.showToast({
									icon: 'none',
									title: '修改用户信息成功'
								});
								uni.navigateBack({
									delta: 1
								});
							}
						})
					} else {
						uni.showToast({
							icon: 'none',
							title: '修改用户信息失败'
						});
					}
				},
				err => {
					uni.showToast({
						icon: 'none',
						title: '修改用户信息失败'
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
	position: absolute;
	right: 5upx;
}
.title {
	min-width: 20%; 
} 
</style>
