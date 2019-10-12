<template>
	<view>
		<!-- #ifdef APP-PLUS -->
		<!-- <view class="status_bar"></view> -->
		<!-- #endif -->
		<uni-list>
			<uni-list-item :key="index" v-for="(list, index) in listData" @click="tabList(list)" :title="list.name" :note="list.note"></uni-list-item>
			<!-- <uni-list-item @click="tabList('人事')" title="人事" note="描述信息"></uni-list-item> -->
		</uni-list>
	</view>
</template>

<script>
import uniList from '../../components/uni-list/uni-list.vue';
import uniListItem from '../../components/uni-list-item/uni-list-item.vue';
export default {
	components: {
		uniList,
		uniListItem
	},
	data() {
		return {
			bgImg: '../../static/images/pyinit.png',
			listData: [
				{ name: '教师', id: '0', note: '招聘教师', img: '../../static/images/pyinit.png' },
				{ name: '人事', id: '1', note: '招聘人事', img: '../../static/images/pyinit.png' },
				{ name: '技术', id: '2', note: '招聘开发人员', img: '../../static/images/pyinit.png' }
			]
		};
	},
	onNavigationBarButtonTap(e) {
		if (e.index == 0) {
			// console.log('分享');
			uni.share({
			    provider: "weixin",
			    scene: "WXSceneSession",
			    type: 0,
			    href: "http://uniapp.dcloud.io/",
			    title: "uni-app分享",
			    summary: "我正在使用HBuilderX开发uni-app，赶紧跟我一起来体验！",
			    imageUrl: "https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/uni@2x.png",
			    success: function (res) {
			        console.log("success:" + JSON.stringify(res));
			    },
			    fail: function (err) {
			        console.log("fail:" + JSON.stringify(err));
			    }
			});
		}
	},
	methods: {
		tabList(list) {
			uni.navigateTo({
				url: '../recruitmentDetail/recruitmentDetail?list=' + encodeURIComponent(JSON.stringify(list))
			});
		}
	}
};
</script>

<style></style>
