<template>
	<view style="background: #EEEEEE;width: 100%;height: 100vh;">
		<view v-if="user.account">
			<view class="uni-list">
				<view class="uni-list-cell u_f_jc u_f_ac" style="padding: 20upx 0;">
					<view class="userImg">
						<image src="../../static/images/homeed.png" mode="widthFix"></image>
					</view>
				</view>
				<view class="uni-list-cell">
					<view class="uni-list-cell-navigate">
						账号:{{user.account}}
					</view>
				</view>
				<view class="uni-list-cell" @tap="reviseUser">
					<view class="uni-list-cell-navigate uni-navigate-right">
						姓名:{{user.realName}}
					</view>
				</view>
				<view class="uni-list-cell" @tap="reviseUser">
					<view class="uni-list-cell-navigate uni-navigate-right">
						单位:{{user.unit}}
					</view>
				</view>
				<view class="uni-list-cell" @tap="reviseUser">
					<view class="uni-list-cell-navigate uni-navigate-right">
						紧急联系电话:{{user.telephone}}
					</view>
				</view>
				<view class="uni-list-cell" @tap="reviseUser">
					<view class="uni-list-cell-navigate uni-navigate-right">
						微信:{{user.weixin}}
					</view>
				</view>
				<view class="uni-list-cell" @tap="reviseUser">
					<view class="uni-list-cell-navigate uni-navigate-right">
						QQ:{{user.tenxun}}
					</view>
				</view>
				<view class="uni-list-cell" @tap="reviseUser">
					<view class="uni-list-cell-navigate uni-navigate-right">
						情况:{{user.picture}}
					</view>
				</view>
				<view class="uni-list-cell" @tap="revisePwd">
					<view class="uni-list-cell-navigate uni-navigate-right">
						修改密码
					</view>
				</view>
			</view>
		</view>
		<view class="user u_f_jfs u_f_ac" v-else @tap="login">
			<view class="userImg">
				<image src="../../static/images/homeed.png" mode="widthFix"></image>
			</view>
			<view class="userInfo login">
				Hi,您还未登录
			</view>
		</view>
		<view class="btn-row" v-if="user.account">
			<button type="primary" class="primary" @tap="logout">退出登录</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				user: {
					realName: '',
					weixin: '',
					telephone: '',
					qq: '',
					picture: '',
					img:'../../static/images/homeed.png'
				}
			}
		},
		onShow() {
			let _this = this;
			uni.getStorage({
			    key: 'userInfo',
			    success: function (res) {
					if(res.data){
						_this.user = res.data;
						_this.user.img = '../../static/images/homeed.png';
					}else{
						uni.redirectTo({
							url: '../login/login',
						});
					}
			    }
			});
		},
		methods: {
			// 登录事件
			login() {
				uni.navigateTo({
					url: '../login/login',
				});
			},
			logout() {
				let _this = this;
				uni.setStorage({
				    key: 'userInfo',
				    data: '',
				    success: function () {
						_this.user.account='';
				        uni.showToast({
				            title: '退出成功',
							icon: 'none',
				            duration: 2000
				        });
						uni.setStorage({
						    key: 'token',
						    data: ''
						});
				    }
				});
			},
			revisePwd(){
				uni.navigateTo({
					url: '../revisePwd/revisePwd'
				});
			},
			reviseUser(){
				uni.navigateTo({
					url: '../reviseUser/reviseUser',
				});
			}
		}
	}
</script>

<style>
	.status_bar {
		background: #FFFFFF;
	}

	.user {
		width: 100%;
		height: 200upx;
		background: #FFFFFF;
	}

	.uni-list::before {
		height: 0;
	}

	.userImg {
		width: 140upx;
		height: 140upx;
		overflow: hidden;
		border: 2upx solid #FA6814;
		border-radius: 50%;
		margin: 0 20upx;
	}

	.userImg image {
		width: 100%;
		height: 100%;
	}

	.userInfo text {
		font-size: 28upx;
	}

	.btn-row {
		margin: 60upx 20% 0;
	}
</style>
