<template>
	<view>
		<view class="uni-list">
			<view class="uni-list-cell" :key="index" @tap="tabList(list)" v-for="(list,index) in listData">
				<view class="uni-list-cell-navigate">
					{{list.name}}
					<uni-badge :text="list.newCount" type="error" :inverted="false"></uni-badge>
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
				typeId:-1,
				oldtitle:'',
			};
		},
		onLoad(e) {
			this.user = JSON.parse(e.user);
			this.token = e.token;
			this.typeId = e.typeId;
			this.oldtitle = e.title;
			uni.setNavigationBarTitle({
			    title: this.oldtitle
			});
			let url = 'manageUserUploads/selectHabitClock.json';
			const data = { 
				typeId: this.typeId,
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
					url: './peiyou2?user=' + JSON.stringify(this.user) + '&token=' + this.token+'&clockId='+list.id+'&oldtitle='+this.oldtitle+'&title='+list.name
				});
			}
		}
	}
</script>

<style>

</style>
