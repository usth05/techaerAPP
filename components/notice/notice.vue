<template>
	<view class="notice u_f_ac">
		<image class="laba" src="../../static/images/laba.png" mode="widthFix"></image>
		<text class="noticeText">{{text}}</text>
	</view>
</template>

<script>
	export default {
		props: {
			text: String
		},
		onLoad() {
			console.log("run")
		},
	}
</script>

<style scoped>
	.laba{
		width: 40upx;
		height: 40upx;
	}
	
	.notice{
		width: 100%;
		padding:6upx 22upx;
		background: #FFFFFF;
		box-sizing: border-box;
	}
	.notice image{
		margin-right: 10upx;
	}
	.noticeText {
		font-size: 24upx;
		max-width: 90%;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		color: red;
	}
</style>
