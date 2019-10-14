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
				token:''
			};
		},
		onLoad(e) {
			this.user = JSON.parse(e.user);
			this.token = e.token;
			this.listData = JSON.parse(e.data);
		},
		onShow() {
			console.log(this.user)
			console.log(this.token)
		},
		methods: {
			tabList(list){
				// console.log(list)
				let url = 'manageUserUploads/selectHabitByMealId.json';
				const data = {
					mealId:list.id,
					teacherId: this.user.id,
					token: this.token
				};
				this.uniHttp.getJSON(url, data, res => {
					console.log(res)
					if (res.data.success) {
						uni.navigateTo({
							url: '../peiyou3/peiyou3?data='+JSON.stringify(res.data.data)+'&user='+JSON.stringify(this.user)+'&token='+this.token,
						});
					}
				});
			}
		}
	}
</script>

<style>

</style>
