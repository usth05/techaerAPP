<template>
	<view>
		<uni-notice-bar scrollable="true" single="true" show-icon="true" text="[单行] 这是 NoticeBar 通告栏，这是 NoticeBar 通告栏，这是 NoticeBar 通告栏"></uni-notice-bar>
		<view class="typeItem u_f_jsb u_f_ac u_f_fw">
			<view class="item" @tap="goDetail('peiyou')"><image src="../../static/images/peiyou.png" mode="widthFix"></image></view>
			<view class="item"><image src="../../static/images/evaluation.png" mode="widthFix"></image></view>
			<view class="item"><image src="../../static/images/yuedu.png" mode="widthFix"></image></view>
		</view>
	</view>
</template>

<script>
import { uniNoticeBar } from '../../components/uni-notice-bar/uni-notice-bar.vue';
export default {
	components: { uniNoticeBar },
	data() {
		return {
			user: {},
			token: ''
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
			}
		});
		uni.getStorage({
			key: 'token',
			success: function(res) {
				_this.token = res.data;
			}
		});
	},
	methods: {
		goDetail(type) {
			let url = '';
			switch (type) {
				case 'peiyou':
					url = '../peiyou/peiyou';
					break;
				case 'ceping':
					url = '../ceping/ceping';
					break;
				case '书本':
					url = '../book/book';
					break;
				default:
					break;
			}
			url += '?list=' + JSON.stringify(this.user) + '&token=' + this.token;
			uni.navigateTo({
				url: url
			});
		}
	}
};
</script>

<style>
.typeItem {
	padding: 0 10upx;
}
.item {
	width: 48%;
	line-height: 0;
	font-size: 0;
	margin: 10upx 0;
}
.item image {
	width: 100%;
}
</style>
