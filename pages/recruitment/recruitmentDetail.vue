<template>
	<view>
		<view class="">
			<image :src="list.img" mode="widthFix"></image>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			list:{},
		};
	},
	onLoad: function(option) {
		//option为object类型，会序列化上个页面传递的参数
		// console.log(option); //打印出上个页面传递的参数。
		uni.showLoading({
		    title: '加载中'
		});
		const list = JSON.parse(decodeURIComponent(option.list));
		this.list = list;
		uni.setNavigationBarTitle({
		    title: list.name
		});
	},
	onReady(){
		uni.hideLoading();
	},
	methods: {}
};
</script>

<style>
	image{
		width: 100%;
	}
</style>
