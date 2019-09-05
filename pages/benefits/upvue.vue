<template>
	<view class="meeting-page">
		<commom-top :lightIndex="lightIndex"></commom-top>
	</view>
</template>

<script>
	import commomTop from "./index.vue";
	export default {
		components: {
			commomTop,
		},
		data(){
			return{
				lightIndex:3
			}
		},
	}
</script>

<style>
</style>
