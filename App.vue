<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	.tabTop {
		width: 100%;
		height: 40upx;
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
	.u_f_ac,
	.u_f_jfs,
	.u_f_jsb,
	.u_f_jfe,
	.u_f_jc {
		display: flex;
	}
	.u_f_jc {
		flex-flow: column;
		justify-content: space-around; 
		align-items: flex-start;
	}
	.u_f_jc {
		justify-content: center;
	}

	.u_f_jfs {
		justify-content: flex-start;
	}

	.u_f_jsb {
		justify-content: space-between;
	}

	.u_f_jfe {
		justify-content: flex-end;
	}

	.u_f_ac {
		justify-content: center;
		align-items: center;
	}

	/* uni.css - 通用组件、模板样式库，可以当作一套ui库应用 */
	@import './common/uni.css';
	/* 引入动画库 */
	@import './common/animate.css';
</style>
