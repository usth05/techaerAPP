<template>
	<view>
		<view class="uni-list">
			<view class="uni-list-cell" :key="index" @tap="tabList(list)" v-for="(list, index) in listData">
				<view class="uni-list-cell-navigate">
					{{ list.name }}
					<uni-badge :text="list.newCount" size="24" type="error" :inverted="false"></uni-badge>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import uniBadge from '@/components/uni-badge/uni-badge.vue';
import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
export default {
	components: {
		uniBadge,
		uniNavBar
	},
	data() {
		return {
			listData: [],
			user: {},
			token: '',
			index:0,
			selectData:["未读","所有"]
		};
	},
	onLoad(e) {
		this.user = JSON.parse(e.list);
		this.token = e.token;
	},
	onShow() {
		let url = 'manageUserUploads/selectHabit.json';
		const data = {
			teacherId: this.user.id,
			token: this.token
		};
		this.uniHttp.getJSON(url, data, res => {
			if (res.data.success) {
				this.listData = res.data.data;
			}
		});
	},
	methods: {
		tabList(list) {
			uni.navigateTo({
				url: '../peiyou1/peiyou1?user=' + JSON.stringify(this.user) + '&token=' + this.token+'&typeId='+list.id
			});
		}
	}
};
</script>

<style>
.navBar {
	width: 90%;
	font-size: 28upx;
}
</style>
