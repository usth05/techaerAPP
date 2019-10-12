<template>
	<view>
		培优实验室
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		onLoad() {
			let url = ''
			const data = {
				id:''
			}
			this.uniHttp.getJSON(url,data,res=>{
				console.log(res.data)
			})
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
