<template>
	<view>
		<!-- 背景图 -->
		<!-- #ifdef APP-PLUS -->
		<view class="status_bar"></view>
		<!-- #endif -->
		<image class="qbg" :src="bgImg" mode="widthFix"></image>
		<!-- <audio name="小学阅读吧"></audio> -->
		<notice :text="notice"></notice>
		<view class="user u_f_jfs" v-if="user.account">
			<view class="userImg"><image :src="user.img" mode="widthFix"></image></view>
			<view class="userInfo u_f_flc u_f_jc u_f_as">
				<text>姓名:{{ user.realName }}</text>
				<text>账号:{{ user.account }}</text>
			</view>
		</view>
		<view class="user u_f_jfs" v-else @tap="login">
			<view class="userImg"><image :src="user.img" mode="widthFix"></image></view>
			<view class="userInfo u_f_flc u_f_jc u_f_as"><text>登录</text></view>
		</view>
	</view>
</template>

<script>
import notice from '../../components/notice/notice.vue';
export default {
	components: {
		notice
	},
	data() {
		return {
			bgImg: '../../static/images/pyinit.png',
			notice: '十月1日至十月7日放假,十月1日至十月7日放假,十月1日至十月7日放假,十月1日至十月7日放假',
			audio: '',
			user: {
				realName: '',
				account: '',
				img: '../../static/images/homeed.png'
			}
		};
	},
	onShow() {
		let _this = this;
		uni.getStorage({
			key: 'userInfo',
			success: function(res) {
				if (res.data) {
					_this.user = res.data;
					_this.user.img = '../../static/images/homeed.png';
				} else {
					uni.redirectTo({
						url: '../login/login'
					});
				}
			},
			fail: function(err) {
				uni.redirectTo({
					url: '../login/login'
				});
			},
			complete: function(data) {
				console.log(data);
			}
		});
	},
	methods: {
		login() {
			uni.navigateTo({
				url: '../login/login'
			});
		}
	}
};
</script>

<style>
.user {
	padding: 10upx 16upx;
}

.user .userImg {
	width: 80upx;
	height: 80upx;
	border: 2upx solid #ffb400;
	border-radius: 100%;
	overflow: hidden;
	margin-right: 8upx;
}

.user .userImg image {
	width: 80upx;
	height: 80upx;
}

.user .userInfo {
	height: 80upx;
	font-size: 28upx;
	color: #ffffff;
}
</style>
