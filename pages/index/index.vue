<template>
	<view style="padding-top: 10px;">
		<!-- 背景图 -->
		<!-- #ifdef APP-PLUS -->
		<view class="status_bar"></view>
		<!-- #endif -->
		<image class="qbg" :src="bgImg" mode="widthFix"></image>
		<user-info :realName="user.realName" :account="user.account" :img="user.img">
			<template>
				<image class="share" @tap="share" src="../../static/images/share3.png" mode="widthFix"></image>
			</template>
		</user-info>
	</view>
</template>

<script>
import userInfo from '../../components/user/userInfo.vue';
export default {
	components: {
		userInfo
	},
	data() {
		return {
			bgImg: '../../static/images/pyinit.png',
			notice: '十月1日至十月7日放假,十月1日至十月7日放假,十月1日至十月7日放假,十月1日至十月7日放假',
			audio: '',
			user: {
				realName: '',
				account: '',
				img: ''
			}
		};
	},
	onShow() {
		let _this = this;
		uni.hideTabBar()
		uni.getStorage({
			key: 'userInfo',
			success: function(res) {
				if (res.data) {
					_this.user = res.data;
					// _this.user.img = '../../static/images/homeed.png';
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
				// console.log(data);
			}
		});
	},
	methods: {
		login() {
			uni.redirectTo({
				url: '/pages/login/login'
			});
		},
		share() {
			uni.getProvider({
				service: 'share',
				success: function(res) {
					console.log(res.provider);
					if (~res.provider.indexOf('qq')) {
						uni.login({
							provider: 'qq',
							success: function(loginRes) {
								console.log(JSON.stringify(loginRes));
							}
						});
					} else if (~res.provider.indexOf('weixin')) {
						console.log();
					}
				}
			});
			console.log('share');
		}
	}
};
</script>

<style>
.claer {
	clear: both;
}
.share {
	width: 80upx;
	height: 80upx;
	position: relative;
	z-index: 99999 !important;
}
#share {
	width: 100%;
	height: 200upx;
	position: fixed;
	bottom: 0;
	left: 0;
	z-index: 999999;
	background: #FFFFFF;
}
#share .shareBox {
	width: 33%;
	height: 100%;
}
#share .shareBox image {
	width: 80%;
}
</style>
