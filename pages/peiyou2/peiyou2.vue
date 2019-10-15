<template>
	<view>
		<view class="uni-list">
			<view class="uni-list-cell" :key="index" @tap="tabList(list)" v-for="(list,index) in listData">
				<view class="uni-list-cell-navigate">
					{{list.name}}
					<uni-badge :text="list.newCount" size="24" type="error" :inverted="false"></uni-badge>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniBadge from '@/components/uni-badge/uni-badge.vue';
	export default {
		components: { uniBadge },
		data() {
			return {
				listData: [],
				user:{},
				token:'',
				clockId:-1
			};
		},
		onLoad(e) {
			this.user = JSON.parse(e.user);
			this.token = e.token;
			this.clockId = e.clockId;
			let url = 'manageUserUploads/selectHabitClockInfo.json';
			const data = {
				clockId:this.clockId,
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
			tabList(list){
				// console.log(list)
				uni.redirectTo({
					url: '../peiyou3/peiyou3?user=' + JSON.stringify(this.user) + '&token=' + this.token+'&mealId='+list.id
				});
			}
		}
	}
</script>

<style>

</style>
