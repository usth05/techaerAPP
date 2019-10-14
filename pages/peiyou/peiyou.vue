<template>
	<view>
		<view class="uni-list">
			<view class="uni-list-cell">
				<view class="uni-list-cell-left">请选择分类</view>
				<view class="uni-list-cell-db">
					<picker @change="bindPickerChange" :value="index" :range="selectData">
						<view class="uni-input">{{ selectData[index] }}</view>
					</picker>
				</view>
			</view>
		</view>
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
export default {
	components: {
		uniBadge
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
			let url = 'manageUserUploads/selectHabitClock.json';
			const data = {
				typeId: list.id,
				teacherId: this.user.id,
				token: this.token
			};
			this.uniHttp.getJSON(url, data, res => {
				if (res.data.success) {
					uni.navigateTo({
						url: '../peiyou1/peiyou1?data=' + JSON.stringify(res.data.data) + '&user=' + JSON.stringify(this.user) + '&token=' + this.token
					});
				}
			});
		},
		bindPickerChange(){
			
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
