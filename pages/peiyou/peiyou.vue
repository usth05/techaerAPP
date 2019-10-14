<template>
	<view>
		<!-- <view class="uni-list">
			<view class="uni-list-cell" :key="index" @tap="tabList(list)" v-for="(list,index) in listData">
				<view class="uni-list-cell-navigate">
					一级分类: <text>{{list.name}}</text>
					<uni-badge :text="list.newCount" size="24" type="error" :inverted="false"></uni-badge>
				</view>
			</view>
		</view> -->
		<view class="uni-list">
			<view class="uni-list-cell">
				<view class="uni-list-cell-left">1级分类</view>
				<view class="uni-list-cell-db">
					<picker @change="bindPickerOneChange" :value="oneData.index" :range="oneData.nameArr">
						<view class="uni-input">{{ oneData.nameArr[oneData.index] }}</view>
					</picker>
				</view>
				<uni-badge :text="list.newCount" size="24" type="error" :inverted="false"></uni-badge>
			</view>
		</view>
		<view class="uni-list">
			<view class="uni-list-cell">
				<view class="uni-list-cell-left">2级分类</view>
				<view class="uni-list-cell-db">
					<picker @change="bindPickerTwoChange" :value="twoData.index" :range="twoData.nameArr">
						<view class="uni-input">{{ twoData.nameArr[twoData.index] }}</view>
					</picker>
				</view>
				<uni-badge :text="list.newCount" size="24" type="error" :inverted="false"></uni-badge>
			</view>
		</view>
		<view class="uni-list">
			<view class="uni-list-cell">
				<view class="uni-list-cell-left">3级分类</view>
				<view class="uni-list-cell-db">
					<picker @change="bindPickerThreeChange" :value="threeData.index" :range="threeData.nameArr">
						<view class="uni-input">{{ threeData.nameArr[threeData.index] }}</view>
					</picker>
				</view>
				<uni-badge :text="list.newCount" size="24" type="error" :inverted="false"></uni-badge>
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
			user: {},
			token: '',
			oneData: {
				//1级分类的数据
				index: 0, //1级分类的选中项
				data: [], //1级分类的数据
				nameArr: ['请选择'], //1级分类的名称
				newCount: 0 //1级分类的数量
			},
			twoData: {
				//1级分类的数据
				index: 0, //1级分类的选中项
				data: [], //1级分类的数据
				nameArr: ['请选择'], //1级分类的名称
				newCount: 0 //1级分类的数量
			},
			threeData: {
				//1级分类的数据
				index: 0, //1级分类的选中项
				data: [], //1级分类的数据
				nameArr: ['请选择'], //1级分类的名称
				newCount: 0 //1级分类的数量
			}
		};
	},
	onLoad(e) {
		this.user = JSON.parse(e.list);
		this.token = e.token;
	},
	onShow() {
		this.tabList('one');
	},
	methods: {
		tabList(type) {
			let url = '';
			const data = {
				teacherId: this.user.id,
				token: this.token
			};
			let typeN = type + 'Data';
			if (type == 'one') {
				url = 'manageUserUploads/selectHabit.json';
			} else if (type == 'two') {
				url = 'manageUserUploads/selectHabitClock.json';
				let index = this.oneData.index;
				console.log(index);
				console.log(this.oneData.data[index]);
				data.typeId = this.oneData.data[index - 1].id;
			} else if (type == 'three') {
				url = 'manageUserUploads/selectHabitClockInfo.json';
				let index = this.twoData.index;
				data.clockId = this.twoData.data[index - 1].id;
			}
			this.uniHttp.getJSON(url, data, res => {
				console.log(res);
				if (res.data.success) {
					let myData = res.data.data;
					this[typeN].data = myData;
					this[typeN].nameArr = ['请选择'];
					for (let i = 0; i < myData.length; i++) {
						this[typeN].nameArr.push(myData[i].name);
					}
					this[typeN].newCount = myData.newCount;
					this[typeN].index = 0;
				}
			});
		},
		bindPickerOneChange(e) {
			if (e.target.value != this.oneData.oneindex) {
				this.oneData.index = parseInt(e.target.value);
				console.log(this.oneData.index);
				if (this.oneData.index > 0) {
					this.tabList('two');
				} else {
					this.twoData = {
						//1级分类的数据
						index: 0, //1级分类的选中项
						data: [], //1级分类的数据
						nameArr: ['请选择'], //1级分类的名称
						newCount: 0 //1级分类的数量
					};
					this.threeData = {
						//1级分类的数据
						index: 0, //1级分类的选中项
						data: [], //1级分类的数据
						nameArr: ['请选择'], //1级分类的名称
						newCount: 0 //1级分类的数量
					};
				}
			}
		},
		bindPickerTwoChange(e) {
			if (e.target.value != this.oneData.oneindex) {
				this.twoData.index = parseInt(e.target.value);
				if (this.oneData.index > 0) {
					this.tabList('three');
				} else {
					this.threeData = {
						//1级分类的数据
						index: 0, //1级分类的选中项
						data: [], //1级分类的数据
						nameArr: ['请选择'], //1级分类的名称
						newCount: 0 //1级分类的数量
					};
				}
			}
		},
		bindPickerThreeChange(e) {
			if (e.target.value != this.oneData.oneindex) {
				this.threeData.index = parseInt(e.target.value);
			}
		}
	}
};
</script>

<style></style>
