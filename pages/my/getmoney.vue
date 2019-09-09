<template>
	<view class="withdrawal-page">
		<top-bar rightText="实名认证" :detailist="detailist" :isreal="false"></top-bar>
		<view class="main">
			<view class="main-title">
				<view class="line"></view>
				<text class="text">我的粉丝</text>
			</view>
		</view>
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
				detailist:["可提现","待提现","产品额度","粉丝量"]
			}
		}
	}
</script>

<style lang="scss">
	.withdrawal-page {}
</style>
