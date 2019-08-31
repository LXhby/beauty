<template>
	<view class="top-account">
		<view class="top-content">
			<!-- 头部第一行 -->
			<view class="top-main">
				<view class="uni-flex uni-row top-detail">
					<view class="account-img" >
						<image src="../../static/image_massge_people2.png" mode=""></image>
						<text class="iconfont icon-vip">&#xe678;</text>	
					</view>
					<view class="shop-detail uni-flex uni-column" style="-webkit-flex: 1;flex: 1;">
						<view class="shop-name">
							普瑞塔美妆总店
						</view>
						<text class="shop-busis">浙江乘风萨科技地方生物科技有限公司</text>
					</view>
					<view class="shop-right" style="width: 228upx;">
						<view class="time">
							<text >服务期限</text> <text class="text">365天</text>
						</view>
						<view class="shop-nav uni-flex uni-row" style="-webkit-align-items: center;align-items: center;">
							<view class="start">
								<text class="iconfont">&#xe623;</text>
							</view>
							<view class="text uni-flex uni-row" style="-webkit-flex: 1;flex: 1;-webkit-align-items: center;align-items: center;">
								<text class="name">{{rightText}}</text>
								<text class="iconfont right">&#xe642;</text>
							</view>
							
						</view>
					</view>
				</view>
			<!-- 数字显示第二行 -->
			<view class="example-body">
				<uni-grid :column="detailist.length" :show-border="false" :square="false">
					<uni-grid-item v-for="(item,index) in detailist" :key="index">
						<view class="text-one">16</view>
						<text class="text ">{{item}}</text>
					</uni-grid-item>
				</uni-grid>
			</view>
			</view>
			<image src="../../static/WechatIMG311.png" mode="" class="bg-img"></image>
			<image src="../../static/WechatIMG391.png" mode="" class="bg-weave"></image>
			<image src="../../static/real.png" mode="" class="real" v-if="isreal"></image>
		</view>
	</view>
</template>

<script>
	import uniGrid from '@/components/uni-grid/uni-grid.vue'
	import uniGridItem from '@/components/uni-grid-item/uni-grid-item.vue'
	export default {
		components: {
			uniGrid,
			uniGridItem
		},
		props:["rightText","navurl","isreal","detailist"]
	}
</script>

<style lang="scss" scoped>
	@import "../../style/topaccount.scss";
	@font-face {
	  font-family: 'iconfont';  /* project id 1377410 */
	  src: url('//at.alicdn.com/t/font_1377410_wk4mbv1sumf.eot');
	  src: url('//at.alicdn.com/t/font_1377410_wk4mbv1sumf.ttf') format('truetype');
	}
	.iconfont {
		font-family: iconfont !important;
		font-size: 32upx;
		font-style: normal;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale
	}
</style>
