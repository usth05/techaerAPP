<template>
	<view class="user u_f_jsb">
		<view class="userLeft u_f_jfs" v-if="account">
			<view class="userImg"><image :src="img ? img : '../../static/images/homeed.png'" mode="widthFix"></image></view>
			<view class="userInfo u_f_flc u_f_jc u_f_as">
				<text :style="{'color': fontColor}" v-if="realName">姓名:{{ realName }}</text>
				<text :style="{'color': fontColor}">账号:{{ account }}</text>
			</view>
		</view>
		<view class="userLeft u_f_jfs" v-else @tap="login">
			<view class="userImg"><image :src="img ? img : '../../static/images/homeed.png'" mode="widthFix"></image></view>
			<view class="userInfo u_f_flc u_f_jc u_f_as"><text>登录</text></view>
		</view>
		<view class="userRight">
			<slot></slot>
		</view>
	</view>
</template>

<script>
export default {
	name: 'UserInfo',
	props: {
		account:{
			type:String,
			default: '',
		},
		img:{
			type:String,
			default: '',
		},
		realName:{
			type:String,
			default: '',
		},
		age:{
			type:String,
			default: '',
		},
		fontColor:{
			type: String,
			default: '#ffffff',
		}
	},
	methods: {
		login() {
			uni.redirectTo({
				url: '/pages/login/login'
			});
		}
	}
};
</script>

<style scoped>
.user {
	padding: 16upx;
}

.userLeft {
	height: 80upx;
}
.userRight{
	width: 80upx;
	height: 80upx;
}
.userRight .share {
	width: 80upx;
	height: 80upx;
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
