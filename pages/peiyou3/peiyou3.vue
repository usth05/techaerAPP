<template>
	<view>
		<view class="uni-list">
			<view class="uni-list-cell" :key="index" @tap="tabList(list)" v-for="(list,index) in listData">
				<view class="uni-list-cell-navigate">
					<view class="richText">
						<rich-text :nodes="list.name"></rich-text>
					</view>
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
				mealId:-1,
			};
		},
		onLoad(e) {
			this.user = JSON.parse(e.user);
			this.token = e.token;
			this.mealId = e.mealId;
			let url = 'manageUserUploads/selectHabitByMealId.json';
			const data = {
				mealId:this.mealId,
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
				uni.redirectTo({
				   url: '../peiyouUser/peiyouUser?user='+JSON.stringify(this.user)+'&token='+this.token+'&typeId='+list.id,
				});
			}
		}
	}
</script>

<style>
.richText,.richText p,.richText p img,.richText p table,.richText p div,.richText rich-text img,,.richText rich-text image{
	width: 100%;
}

</style>
