<template>
	<view class="about-page">
		<top-bar rightText="实名认证" :detailist="detailist" :isreal="false"></top-bar>
	</view>
</template>


<script>
	import topBar from "@/components/account/index1.vue";
	export default {
		components: {
			topBar,
		},
		data(){
			return{
				detailist:["可提现","待提现","产品余额","粉丝量"]
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "../../style/topaccount.scss";
	@font-face {
	  font-family: 'iconfont';  /* project id 1377410 */
	  src: url('//at.alicdn.com/t/font_1377410_wk4mbv1sumf.eot');
	  src: url('//at.alicdn.com/t/font_1377410_wk4mbv1sumf.ttf') format('truetype');
	}
</style>
