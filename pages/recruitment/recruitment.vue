<template>
	<view>
		<image class="qbg" :src="bgImg" mode="widthFix"></image>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				bgImg:'../../static/images/pyinit.png'
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
	
</style>
