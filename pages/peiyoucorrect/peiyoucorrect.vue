<template>
	<view>
		<scroll-view id="scroll" scroll-y="true">
			<!-- <button type="primary" @tap="send()">发布</button> -->
			<view id="video" v-if="isLook">
				<view class="icon iconfont icon-guanbi close" @tap="close()"></view>
				<view id="myVideo"><video :src="lookObj.video" controls direction="-90" :poster="lookObj.img"></video></view>
			</view>
			<view :class="{ isLook: isLook }">
				<block v-for="(list, index) in listData" :key="index">
					<view class="card" :class="{ first: index == 0 }">
						<view class="headCard u_f_jfs u_f u_f_ac">
							<view class="title">
								<view class="">名称:{{ list.name }}</view>
							</view>
						</view>
						<view class="contentCard u_f_jc u_f u_f_ac u_f_fw" v-if="list.correctionType == 0">
							<view class="imgBox u_f_jsb u_f u_f_ac">
								<image @tap="lookImg(list.imgArr, i)" v-if="v" :key="i" v-for="(v, i) in list.imgArr" :src="v" mode="widthFix"></image>
							</view>
						</view>
						<view class="contentCard u_f_jc u_f u_f_ac u_f_fw" v-if="list.correctionType == 1">
							<view class="audioBox u_f_jc u_f u_f_ac u_f_fw" :key="i" v-for="(v, i) in list.imgArr">
								<audio :src="v" :poster="list.imageUrl" :name="'音频' + i + 1" :author="list.nickName" controls></audio>
							</view>
						</view>
						<view class="contentCard u_f_jc u_f u_f_ac u_f_fw" v-if="list.correctionType == 2">
							<view class="videoBox u_f_jfs u_f u_f_ac u_f_fw">
								<view class="videobody" @tap="lookVideo(v.img, v.video, index, i)" v-if="v.img" :key="i" v-for="(v, i) in list.videoArr">
									<image :src="v.img" mode="widthFix"></image>
									<view class="icon iconfont icon-bofang play"></view>
								</view>
							</view>
						</view>
					</view>
				</block>
				<view id="releaseBox">
					<!-- 图片上传 -->
					<view class="releaseTitle">
						<text v-if="!isRevise">名称</text>
						<text v-else>修改名称</text>
						<input type="text" v-model="name" placeholder="请输入标题" />
					</view>
					<view class="u_f_jfs u_f_ac" v-if="correctionType == 0">
						<view class="imgAdd imgbox" :key="index" v-for="(img, index) in imgArr">
							<image :src="img" @tap="lookImg(imgArr, index)"></image>
							<view class="delete icon iconfont icon-shanchu" @tap="deleteImg(index)"></view>
						</view>
						<view v-if="imgArr.length == 0" class="icon iconfont icon-zengjia imgAdd" @tap="uploadImg()"></view>
					</view>
					<view class="recordBox" v-if="correctionType == 1">
						<!-- <view class="icon iconfont icon-luyin imgAdd" @tap="record(isRecord)"></view> -->
						<image
							@tap="record(isRecord)"
							class="record"
							:src="!isRecord ? '../../static/images/play_new02.png' : '../../static/images/play_new01.gif'"
							mode=""
						></image>
						<image
							v-show="isPlayShow"
							@tap="playVoice(isPlay)"
							class="record"
							:src="!isPlay ? '../../static/images/playNew.png' : '../../static/images/play02.png'"
							mode=""
						></image>
					</view>
					<!-- 视频上传 -->
					<view v-if="correctionType == 2">
						<text>上传封面</text>
						<view class="imgAdd imgbox" :key="index" v-for="(img, index) in imgArr">
							<image :src="img" @tap="lookImg(imgArr, index)"></image>
							<view class="delete icon iconfont icon-shanchu" @tap="deleteImg(index)"></view>
						</view>
						<view v-if="imgArr.length == 0" class="icon iconfont icon-zengjia imgAdd" @tap="uploadImg()"></view>
					</view>
					<view v-if="correctionType == 2">
						<text>上传视频</text>
						<view class="imgAdd imgbox" v-show="videoUrl != ''">
							<!-- <video :src="videoUrl"></video> -->
							<image @tap="lookVideo(imgArr[0], videoUrl, 0, -1)" :src="imgArr[0]" mode="widthFix"></image>
							<view class="icon iconfont icon-bofang play"></view>
							<view class="delete icon iconfont icon-shanchu" @tap="deleteVideo()"></view>
						</view>
						<view v-show="videoUrl == ''" class="icon iconfont icon-zengjia imgAdd" @tap="uploadVideo()"></view>
					</view>
				</view>
				<view style="width: 100%;height: 100upx;"></view>
				<view class="typeBar u_f u_f_jsb u_f_ac">
					<view :class="{ active: correctionType == 0 }" @tap="tapPrompt(0)">图片</view>
					<view :class="{ active: correctionType == 1 }" @tap="tapPrompt(1)">音频</view>
					<view :class="{ active: correctionType == 2 }" @tap="tapPrompt(2)">视频</view>
				</view>
			</view>
		</scroll-view>
		<view v-show="isPrompt" class="prompt u_f u_f_jc u_f_ac">
			<view class="promptContent">
				<view class="promptTitle u_f u_f_jc u_f_ac">温馨提示</view>
				<view class="promptBody u_f u_f_jc u_f_ac">切换模式后，不会保存当前页面信息，你确定要切换吗</view>
				<view class="promptBtn u_f u_f_jsb u_f_ac">
					<button type="warn" @tap="tapClose()">取消</button>
					<button type="primary" @tap="tapBar(tabIndex)">确认</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import uniCard from '@/components/uni-card/uni-card';
const recorderManager = uni.getRecorderManager();
const innerAudioContext = uni.createInnerAudioContext();
innerAudioContext.autoplay = true;
export default {
	components: {
		uniCard
	},
	data() {
		return {
			listData: [], //获取到的批改数据
			token: '',
			userDictationaId: -1, //上一页传来的id
			lookObj: {}, //视频预览的数据
			isLook: false, //是否显示视频预览
			correctionType: 0, //上传的模式
			name: '', //上传的标题
			imageUrl: '', //封面地址
			dataUrl: '', //上传的地址
			videoUrl: '', //视频地址
			imgArr: [], //上传图片
			isPrompt: false, //是否显示提示框
			tabIndex: 0, //点击了哪一个模式
			isRecord: false,
			voicePath: '', //录制音频地址
			isPlayShow: false, //是否显示音频播放插件
			isPlay: false, //是否为播放状态
			isRevise: false //是否为修改
		};
	},
	onLoad(e) {
		let self = this;
		const param = {
			hz: 'content' //修改文件格式 找后台要 音频的是 voice 视频video  图片 content   第一个地方
		};
		this.$imgOss.getParam(param);
		recorderManager.onStop(function(res) {
			self.voicePath = res.tempFilePath;
			self.audioUrl = res.tempFilePath;
			this.isPlayShow = true;
		});
		innerAudioContext.onEnded(res => {
			this.isPlay = false;
		});
		this.token = e.token;
		this.userDictationaId = e.id;
		let url = 'manageHabit/selectHabitCorrection.json';
		const data = {
			userDictationaId: this.userDictationaId,
			token: this.token,
			enable: 1
		};
		this.uniHttp.getJSON(url, data, res => {
			if (res.data.success) {
				let data = res.data.data;
				if (data != null) {
					this.listData = [];
					this.isRevise = true;
					this.listData.push(data);
					if (data.correctionType == 0 || data.correctionType == 1) {
						//图片
						let imgArr = [];
						imgArr.push(data.videoUrl);
						data.imgArr = imgArr;
					} else if (data.correctionType == 2) {
						//视频
						let videoArr = [];
						if (data.videoUrl) {
							let obj = {
								img: data.photoUrl,
								video: data.videoUrl
							};
							videoArr.push(obj);
						}
						data.videoArr = videoArr;
					}
				}
			}
		});
	},
	onNavigationBarButtonTap(e) {
		if (e.index == 0) {
			plus.nativeUI.showWaiting();
			this.verification();
		}
	},
	methods: {
		// 上传批改
		verification() {
			let _this = this;
			if (this.name == '') {
				plus.nativeUI.toast('标题不能为空');
				plus.nativeUI.closeWaiting();
				return;
			}
			if (this.correctionType == 0) {
				if (this.imgArr[0]) {
					this.upFile('$imgOss', this.imgArr[0], 'dataUrl', true);//上传图片
				} else {
					plus.nativeUI.toast('请先添加上传的图片');
					plus.nativeUI.closeWaiting();
					return;
				}
			} else if (this.correctionType == 1) {
				if (this.voicePath) {
					this.upFile('$imgOss', this.voicePath, 'dataUrl', true);//上传音频
				} else {
					plus.nativeUI.toast('请先录制音频');
					plus.nativeUI.closeWaiting();
					return;
				}
			} else if (this.correctionType == 2) {
				if (this.videoUrl) {
					this.upFile('$imgOss', this.imgArr[0], 'imageUrl', false); //上传封面
					this.upFile('$videoOss', this.videoUrl, 'dataUrl', true); // 上传视频
				} else {
					plus.nativeUI.toast('请先添加上传的视频');
					plus.nativeUI.closeWaiting();
					return;
				}
			}
		},
		send() {
			let url;
			this.isRevise ? (url = 'manageHabit/updateHabitCorrection.json') : (url = 'manageHabit/insertHabitCorrection.json');
			const dataHabit = {
				userDictationaId: this.userDictationaId,
				token: this.token,
				enable: 1,
				name: this.name,
				photoUrl: this.imageUrl,
				videoUrl: this.dataUrl,
				correctionType: this.correctionType
			};
			this.isRevise ? (dataHabit.id = this.listData[0].id) : false;
			this.uniHttp.getJSON(
				url,
				dataHabit,
				data => {
					if (data.data.success) {
						plus.nativeUI.toast('发布成功');
						uni.navigateBack({
							delta: 1
						});
					} else {
						plus.nativeUI.toast(data.data.msg);
					}
					plus.nativeUI.closeWaiting();
				},
				err => {
					plus.nativeUI.toast('发布失败');
				}
			);
		},
		upFile(type, file, name, isSend) {
			this[type].getJSON(
				file,
				res => {
					if (res.status == 200) {
						this[name] = res.url;
						if (isSend) {
							this.send();
						} else {
							return false;
						}
					} else {
						plus.nativeUI.toast(file + '文件上传失败');
					}
				},
				err => {
					console.log('run');
				}
			);
		},
		record(type) {
			if (!type) {
				this.startRecord();
				this.isRecord = true;
			} else {
				this.endRecord();
				this.isRecord = false;
			}
		},
		startRecord() {
			plus.nativeUI.toast('开始录音');
			recorderManager.start({
				format: 'mp3'
			});
		},
		endRecord() {
			plus.nativeUI.toast('录音结束');
			this.isPlayShow = true;
			recorderManager.stop();
		},
		playVoice(isPlay) {
			if (!isPlay) {
				innerAudioContext.src = this.voicePath;
				innerAudioContext.play();
				this.isPlay = true;
			} else {
				innerAudioContext.pause();
				this.isPlay = false;
			}
		},
		// 上传图片
		uploadImg() {
			//上传图片
			var _this = this;
			uni.chooseImage({
				count: 1, //默认9
				sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				success: function(res) {
					_this.imgArr = res.tempFilePaths;
				}
			});
		},
		// 上传视频
		uploadVideo() {
			var _this = this;
			if (this.imgArr.length == 0) {
				uni.showToast({
					type: 'none',
					title: '请先上传视频封面'
				});
			} else {
				uni.chooseVideo({
					count: 1,
					sourceType: ['camera', 'album'],
					success: function(res) {
						_this.videoUrl = res.tempFilePath;
					}
				});
			}
		},
		deleteImg(index) {
			//删除图片
			this.imgArr.splice(index, 1);
		},
		tapPrompt(type) {
			if (this.name != '' || this.imgArr.length != 0 || this.voicePath != '' || this.videoUrl != '') {
				this.tabIndex = type;
				this.isPrompt = true;
			} else {
				this.tapBar(type);
			}
		},
		tapClose() {
			this.isPrompt = false;
		},
		tapBar(type) {
			//切换上传模式
			let param, data;
			if (type == 0) {
				param = {
					hz: 'content' //修改文件格式 找后台要 音频的是 voice 视频video  图片 content   第一个地方
				};
			} else if (type == 1) {
				param = {
					hz: 'voice' //修改文件格式 找后台要 音频的是 voice 视频video  图片 content   第一个地方
				};
			} else if (type == 2) {
				data = {
					hz: 'video' //修改文件格式 找后台要 音频的是 voice 视频video  图片 content   第一个地方
				};
				param = {
					hz: 'content' //修改文件格式 找后台要 音频的是 voice 视频video  图片 content   第一个地方
				};
				this.$videoOss.getParam(data);
			}
			this.$imgOss.getParam(param);
			this.correctionType = type;
			this.name = '';
			this.imgArr = [];
			this.voicePath = '';
			this.videoUrl = '';
			this.isPlay = false;
			this.isRecord = false;
			this.tapClose();
		},
		lookImg(urls, i) {
			//预览图片
			uni.previewImage({
				current: i,
				urls: urls
			});
		},
		lookVideo(img, video, index, i) {
			//预览视频
			if (this.lookObj.index == index && this.lookObj.i == i) {
				this.isLook = false;
			} else {
				this.isLook = true;
				this.lookObj.index = index;
				this.lookObj.i = i;
			}
			if (this.isLook) {
				this.lookObj.img = img;
				this.lookObj.video = video;
			} else {
				this.lookObj = {};
				this.lookObj.index = -1;
				this.lookObj.i = -1;
			}
		},
		close() {
			//关闭视频
			this.isLook = false;
			this.lookObj = {};
		},
		tabPi(list) {
			//点击批改
			uni.navigateTo({
				url: '../peiyoucorrect/peiyoucorrect?id=' + list.id
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
.card .headCard .rightBox .pi {
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
.card .contentCard .imgBox,
.card .contentCard .videoBox {
	width: 100%;
}
.card .contentCard .imgBox image {
	width: 32%;
	margin-right: 2%;
}
.card .contentCard .imgBox image:nth-child(-1) {
	margin-right: 0;
}
.card .contentCard .audioBox {
	width: 100%;
	background: #ffffff;
	margin-bottom: 10upx;
}
.card .contentCard .videoBox view {
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
.card .contentCard .videoBox .play,
#releaseBox .imgbox .play {
	width: 140upx;
	height: 140upx;
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	margin: auto;
	color: #ffffff;
	text-align: center;
	font-size: 36px;
}
#releaseBox {
	padding: 10upx 20upx;
}
#releaseBox .releaseTitle {
	margin-bottom: 10upx;
}
#releaseBox .releaseTitle input {
	width: 100%;
	border-bottom: 2upx solid #cccccc;
}
#releaseBox .imgbox {
	position: relative;
	margin-right: 10upx;
}
#releaseBox .imgbox .delete,
#releaseBox .videoBox .delete {
	width: 40upx;
	height: 40upx;
	position: absolute;
	top: 0;
	right: 0;
	background: rgba(51, 51, 51, 0.5);
	color: #ffffff;
	font-size: 24upx;
	text-align: center;
}
#releaseBox .videoBox {
	width: 100%;
	height: 300upx;
	position: relative;
	margin-bottom: 20upx;
}
#releaseBox .videoBox image,
#releaseBox .videoBox video {
	width: 100%;
	height: 100%;
}
#releaseBox .imgAdd {
	width: 200upx;
	height: 200upx;
	font-size: 126upx;
	text-align: center;
	color: #cccccc;
	border: 2upx solid #cccccc;
}
#releaseBox .imgAdd image {
	width: 100%;
	height: 100%;
}
.recordBox .record {
	width: 120upx;
	height: 120upx;
	margin: 20upx;
}
.typeBar {
	width: 100%;
	height: 100upx;
	border-top: 2upx solid #cccccc;
	position: fixed;
	bottom: 0;
	left: 0;
	background: #ffffff;
	z-index: 10;
}
.typeBar view {
	width: 33%;
	height: 100%;
	line-height: 100upx;
	text-align: center;
	border-left: 2upx solid #cccccc;
}
.typeBar view.active {
	background: #cccccc;
	color: #000;
}

.prompt {
	width: 100%;
	height: 100vh;
	position: fixed;
	top: 0;
	left: 0;
	background: rgba(0, 0, 0, 0.6);
}
.prompt .promptContent {
	width: 80%;
	background: #ffffff;
	border-radius: 20upx;
	padding: 20upx;
	box-sizing: border-box;
}
.prompt .promptContent .promptTitle {
	width: 100%;
	height: 100upx;
	font-size: 36upx;
}
.prompt .promptContent .promptBody {
	width: 100%;
	margin-bottom: 20upx;
	text-align: center;
}
.prompt .promptContent .promptBtn {
	width: 100%;
}
.prompt .promptContent .promptBtn button {
	width: 40%;
	height: 80upx;
	line-height: 80upx;
}
</style>
