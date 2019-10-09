<template>
	<view>
		<!-- 背景图 -->
		<!-- #ifdef APP-PLUS -->
		<view class="tabTop"></view>
		<!-- #endif -->
		<image class="qbg" :src="bgImg" mode="widthFix"></image>
		<!-- <audio name="小学阅读吧"></audio> -->
		<notice :text="notice"></notice>
		<view class="user u_f_jfs">
			<view class="userImg">
				<image :src="user.img" mode="widthFix"></image>
			</view>
			<view class="userInfo u_f_jc">
				<text>昵称:{{user.name}}</text>
				<text>性别:{{user.sex}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	import notice from "../../components/notice/notice.vue"
	export default {
		components:{
			notice
		},
		data() {
			return {
				bgImg:"../../static/images/pyinit.png",
				notice:"十月1日至十月7日放假,十月1日至十月7日放假,十月1日至十月7日放假,十月1日至十月7日放假",
				audio:'',
				user:{
					name:'小明',
					sex:'男',
					img:'../../static/images/homeed.png'
				}
			}
		},
		onLoad() {
			console.log("onLoad")
		},
		onShow(){
			console.log("onShow")
		},
		onReady(){
			console.log("onShow")
		},
		methods: {

		}
	}
</script>

<style>
	.user  {
		padding:10upx 16upx;
	}
	.user .userImg{
		width: 80upx;
		height: 80upx;
		border: 2upx solid #FFB400;
		border-radius: 100%;
		overflow: hidden;
		margin-right: 8upx;
	}
	.user .userImg image{
		width: 80upx;
		height: 80upx;
	}
	.user .userInfo {
		font-size: 28upx;
		color: #FFFFFF;
	}
</style>
