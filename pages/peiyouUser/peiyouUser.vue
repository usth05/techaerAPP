<template>
	<view style="background: #CCCCCC;">
		<scroll-view id="scroll" scroll-y="true">
			<view id="video" v-if="isLook">
				<view class="icon iconfont icon-guanbi close" @tap="close()"></view>
				<view id="myVideo"><video :src="lookObj.video" @error="videoErrorCallback" controls direction="-90" :poster="lookObj.img"></video></view>
			</view>
			<view :class="{ isLook: isLook }">
				<block v-for="(list, index) in listData" :key="index">
					<view class="card" :class="{ first: index == 0 }">
						<view class="headCard u_f_jfs u_f u_f_ac">
							<view class="imgBox"><image :src="list.imageUrl" mode="widthFix"></image></view>
							<view class="title">
								<view class="">昵称:{{ list.nickName }}</view>
								<view class="">账号:{{ list.account }}</view>
							</view>
							<view class="rightBox  u_f_jc u_f u_f_ac" @tap="tabPi(list)">
								<view class="pi">
									批
								</view>
							</view>
						</view>
						<view class="contentCard u_f_jc u_f u_f_ac u_f_fw" v-if="list.type == 2">
							<view class="imgBox u_f_jsb u_f u_f_ac" v-if="list.workUrl">
								<image @tap="lookImg(list.imgArr, i)" v-if="v" :key="i" v-for="(v, i) in list.imgArr" :src="v" mode="widthFix"></image>
							</view>
						</view>
						<view class="contentCard u_f_jc u_f u_f_ac u_f_fw" v-if="list.type==3">
							<view class="audioBox u_f_jc u_f u_f_ac u_f_fw" :key="i" v-for="(v, i) in list.imgArr">
								<audio :src="v" :poster="list.imageUrl" :name="'音频'+i+1" :author="list.nickName" controls></audio>
							</view>
						</view>
						<view class="contentCard u_f_jc u_f u_f_ac u_f_fw" v-if="list.type == 4">
							<view class="videoBox u_f_jfs u_f u_f_ac u_f_fw" v-if="list.workUrl">
								<view class="videobody" @tap="lookVideo(v, index, i)" v-if="v.img" :key="i" v-for="(v, i) in list.videoArr" >
									<image :src="v.img" mode="widthFix"></image>
									<view class="icon iconfont icon-bofang play"></view>
								</view>
							</view>
						</view>
					</view>
				</block>
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
					if (data[i].type == 2||data[i].type == 3) {//图片
						let imgArr = [];
						imgArr.push(data[i].workUrl);
						imgArr.push(data[i].twoWork);
						imgArr.push(data[i].threeWorl)
						data[i].imgArr = imgArr;
					}else if (data[i].type == 4) {//视频
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
			uni.previewImage({
				current:i,
				urls: urls
			});
		},
		lookVideo(v, index, i) {
			if (this.lookObj.index == index && this.lookObj.i == i) {
				this.isLook = false;
			} else {
				this.isLook = true;
				this.lookObj.index = index;
				this.lookObj.i = i;
			}
			if (this.isLook) {
				this.lookObj.img = v.img;
				this.lookObj.video = v.video;
			} else {
				this.lookObj = {};
				this.lookObj.index = -1;
				this.lookObj.i = -1;
			}
		},
		close() {
			this.isLook = false;
			this.lookObj = {};
		},
		tabPi(list){
			uni.navigateTo({
				url: '../peiyoucorrect/peiyoucorrect?id=' + list.id+'&token='+this.token,
			});
		}
	}
};
</script>

<style scoped>
#scroll {
	height: 100vh;
}
#video {
	width: 100%;
	height: 400upx;
	position: fixed;
	top: 0;
	left: 0;
	z-index: 10;
}
#video #myVideo {
	width: 100%;
	height: 100%;
}
#video #myVideo video {
	width: 100%;
	height: 100%;
}
#video .close {
	color: #ffffff;
	position: absolute;
	width: 40upx;
	height: 40upx;
	top: 20upx;
	right: 40upx;
	z-index: 100 !important;
}
#video .icon-guanbi:before {
	position: absolute;
	right: 0;
	top: 0;
	z-index: 10;
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
.first {
	margin-top: 0;
}

.card .headCard {
	width: 100%;
	height: 130upx;
	position: relative;
}
.card .headCard .rightBox {
	position: absolute;
	width: 100upx;
	height: 100%;
	right: 0;
}
.card .headCard .rightBox .pi{
	width: 60upx;
	height: 60upx;
	text-align: center;
	line-height: 60upx;
	border-radius: 50%;
	border: 2upx solid #000000;
}
.card .headCard .imgBox {
	width: 120upx;
	height: 120upx;
	border-radius: 50%;
	border: 2upx solid #fa6814;
	overflow: hidden;
	margin-right: 10upx;
}
.card .contentCard {
	width: 100%;
	margin-top: 10upx;
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
.card .contentCard .imgBox,.card .contentCard .videoBox{
	width: 100%;
}
.card .contentCard .imgBox image {
	width: 32%;
	margin-right: 2%;
}
.card .contentCard .imgBox image:nth-child(-1) {
	margin-right: 0;
}
.card .contentCard .audioBox{
	width: 100%;
	background: #FFFFFF;
	margin-bottom: 10upx;
}
.card .contentCard .videoBox view{
	width: 32%;
	margin-right: 2%;
	position: relative;
}
.card .contentCard .videoBox view:nth-child(-1) {
	margin-right: 0;
}
.card .contentCard .videoBox view image {
	width: 100%;
}
.card .contentCard .videoBox .play{
	width: 140upx;
	height: 140upx;
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	margin: auto;
	color: #FFFFFF;
	text-align: center;
	font-size: 36px;
}
</style>
