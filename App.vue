<script>
export default {
	onLaunch: function() {
		console.log('App Launch');
		console.log(this.config.webUrl);
	},
	onShow: function() {
		console.log('App Show');
	},
	onHide: function() {
		console.log('App Hide');
	}
};
</script>

<style>
/* uni.css - 通用组件、模板样式库，可以当作一套ui库应用 */
@import './common/css/uni.css';
/* 引入动画库 */
@import './common/css/animate.css';
@import './common/css/iconfont.css';
/*每个页面公共css */
.status_bar {
	height: var(--status-bar-height);
	width: 100%;
}
.qbg {
	width: 100%;
	/* height: 100vh; */
	position: fixed;
	top: 0;
	left: 0;
	z-index: -1;
}

.u_f,
.u_f_jc,
.u_f_jfs,
.u_f_jsb,
.u_f_jfe,
.u_f_flc,
.u_f_afstr,
.u_f_afs,
.u_f_afe,
.u_f_ac,
.u_f_fw {
	display: flex;
}

.u_f_flc {
	flex-flow: column;
}

.u_f_jc {
	justify-content: center;
}

.u_f_jfs {
	justify-content: flex-start;
}

.u_f_jfe {
	justify-content: flex-end;
}

.u_f_jsb {
	justify-content: space-between;
}

.u_f_ac {
	align-items: center;
}

.u_f_afs {
	align-items: flex-start;
}

.u_f_afe {
	align-items: flex-end;
}

.u_f_afstr {
	align-items: stretch;
}
.u_f_fw {
	flex-wrap: wrap;
}
</style>
