<template>
	<view style="background: #CCCCCC;">
		<scroll-view id="scroll" scroll-y="true" >
			<view id="video" v-show="isLook"><video id="myVideo" :src="lookObj.video" @error="videoErrorCallback" controls direction="-90" :poster="lookObj.img"></video></view>
			<view :class="{ isLook: isLook }">
				<view class="card" v-for="(list, index) in listData" :key="index">
					<view class="headCard u_f_jfs u_f u_f_ac">
						<view class="imgBox"><image :src="list.imageUrl" mode="widthFix"></image></view>
						<view class="title">
							<view class="">昵称:{{ list.nickName }}</view>
							<view class="">账号:{{ list.account }}</view>
						</view>
					</view>
					<!-- <view class="contentCard u_f_jc u_f u_f_ac u_f_fw" v-if="list.type == 2">
						<view class="imgBox u_f_jsb u_f u_f_ac" v-if="list.workUrl">
							<image @tap="lookImg(v, i)" v-if="v.img" :key="i" v-for="(v, i) in list.videoArr" :src="v.img" mode="widthFix"></image>
						</view>
					</view> -->
					<!-- <view class="contentCard u_f_jc u_f u_f_ac u_f_fw" v-if="list.type==1">
						<view class="videoBox u_f_jc u_f u_f_ac u_f_fw" v-if="list.workUrl">
							<view>用户上传1</view>
							<video id="myVideo" :src="list.workUrl" @error="videoErrorCallback" controls direction="-90" :poster="list.photoUrl"></video>
						</view>
					</view> -->
					<view class="contentCard u_f_jc u_f u_f_ac u_f_fw" v-if="list.type == 2">
						<view class="imgBox u_f_jc u_f u_f_ac u_f_fw" v-if="list.workUrl">
							<image @tap="lookVideo(v)" v-if="v.img" :key="i" v-for="(v, i) in list.videoArr" :src="v.img" mode="widthFix"></image>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
import uniCard from '@/components/uni-card/uni-card';
export default {
	components: {
		uniCard
	},
	data() {
		return {
			listData: [],
			user: {},
			token: '',
			typeId: -1,
			lookObj: {},
			isLook: false
		};
	},
	onLoad(e) {
		this.user = JSON.parse(e.user);
		this.token = e.token;
		this.typeId = e.typeId;
		let url = 'manageHabit/selectUserHabits.json';
		const data = {
			typeId: this.typeId,
			teacherId: this.user.id,
			token: this.token
		};
		this.uniHttp.getJSON(url, data, res => {
			if (res.data.success) {
				let data = res.data.data;
				this.listData = data;
				for (let i = 0; i < data.length; i++) {
					if (data[i].type == 0) {
						let imgArr = [];
						if (data[i].workUrl) {
						}
					} else if (data[i].type == 1) {
					} else if (data[i].type == 2) {
						let videoArr = [];
						if (data[i].workUrl) {
							let obj = {
								img: data[i].photoUrl,
								video: data[i].workUrl
							};
							videoArr.push(obj);
						} else {
							videoArr.push('');
						}
						if (data[i].twoWork) {
							let obj = {
								img: data[i].twoPhoto,
								video: data[i].twoWork
							};
							videoArr.push(obj);
						} else {
							videoArr.push('');
						}
						if (data[i].threeWorl) {
							let obj = {
								img: data[i].twoPhoto,
								video: data[i].threeWorl
							};
							videoArr.push(obj);
						} else {
							videoArr.push('');
						}
						data[i].videoArr = videoArr;
					}
				}
			}
		});
	},
	methods: {
		videoErrorCallback() {},
		lookImg(urls, i) {
			// uni.previewImage({
			// 	urls: urls[i].img
			// });
		},
		lookVideo(v) {
			this.isLook = true;
			this.lookObj = v;
		}
	}
};
</script>

<style scoped>
	#scroll{
		height: 100vh;
	}
#video {
	width: 100%;
	height: 400upx;
	position: fixed;
	top: 0;
	left: 0;
}
#video video {
	width: 100%;
	height: 100%;
	position: absolute;
	top: 0;
	left: 0;
}
.isLook {
	margin-top: 400upx;
}
.card {
	width: 100%;
	padding: 10upx;
	border: 2upx solid #ffffff;
	background: #ffffff;
	box-sizing: border-box;
	margin: 10upx 0;
}
.card::after {
	content: '';
	clear: both;
}
.card .headCard {
	width: 100%;
	height: 130upx;
}
.card .headCard .imgBox {
	width: 120upx;
	height: 120upx;
	border-radius: 50%;
	border: 2upx solid #fa6814;
	overflow: hidden;
	margin-right: 10upx;
}
.card .headCard .imgBox image {
	width: 100%;
}
.card .contentCard {
	width: 100%;
	margin-top: 10upx;
	/* max-height: 400upx; */
}
.card .contentCard .videoBox {
	width: 100%;
	height: 100%;
}
.card .contentCard .videoBox view {
	width: 100%;
}
.card .contentCard .videoBox video {
	width: 80%;
}
.card .contentCard .imgBox {
	width: 100%;
}
.card .contentCard .imgBox image {
	width: 30%;
}
</style>
