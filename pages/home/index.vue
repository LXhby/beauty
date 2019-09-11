<template>
	<view class="home-page">
		<top-bar rightText="店铺设置" :detailist="detailist" :isreal="false"></top-bar>
		<view class="active-nav">
			<uni-grid :column="4" :show-border="false" :square="false" @change="goPage">
				<uni-grid-item >
					<image class="image" src="../../static/meeting.png" mode="aspectFill" />
					<text class="text">会议活动</text>
				</uni-grid-item>
				<uni-grid-item>
					<image class="image" src="../../static/promotion.png" mode="aspectFill" />
					<text class="text">特实惠</text>
				</uni-grid-item>
				<uni-grid-item>
					<image class="image" src="../../static/integral.png" mode="aspectFill" />
					<text class="text">积分购</text>
				</uni-grid-item>
				<uni-grid-item>
					<image class="image" src="../../static/vip.png" mode="aspectFill" />
					<text class="text">升级VIP</text>
				</uni-grid-item>
			</uni-grid>
		</view>
		<!-- 限时特惠 -->
		<view class="goods-example uni-flex uni-row">
			<view class="preferential" @click="goDetail">
				<view class="hot-right">
					<text class="iconfont">&#xe6c6;</text>
					<text class="text">热销</text>
				</view>
				<view class="title">
					限时特惠
				</view>
				<text>
					今日推荐特实惠
				</text>
				<image src="../../static/TB1y_c6JVXXXXX1XXXX433t9pXX_042320.jpg" class="good-image"></image>
			</view>
			<view class="uni-flex uni-column goods-right" >
				<view class="text" >
					文字居左，留出左间距
				</view>
				<view class="uni-flex uni-row">
					<view class="text" style="-webkit-flex: 1;flex: 1;">剩余数量</view>
					<view class="text" style="-webkit-flex: 1;flex: 1;">立即购买</view>
				</view>
			</view>
		</view>
		<view class="swiper-box">
			<swiper class="swiper" :indicator-dots="true" :autoplay="true" :interval="interval" :duration="duration" :circular="true">
				<swiper-item>
					<image src="../../static/ad3.jpg" mode=""></image>
				</swiper-item>
				<swiper-item>
					<image src="../../static/chuke.jpg" mode=""></image>
				</swiper-item>
				<swiper-item>
					<image src="../../static/order_bm_bg.jpg" mode=""></image>
				</swiper-item>
			</swiper>
		</view>
		
	</view>
</template>

<script>
	import topBar from "@/components/account/index1.vue";
	import uniGrid from '@/components/uni-grid/uni-grid.vue'
	import uniGridItem from '@/components/uni-grid-item/uni-grid-item.vue'
	export default {
		components: {
			topBar,
			uniGrid,
			uniGridItem
		},
		data(){
			return{
				detailist:["可提现","待提现","产品额度"]
			}
		},
		methods:{
			goPage(event){
				var index = event.detail.index;
				switch (index){
					case 0:
					uni.navigateTo({
					    url: '/pages/benefits/meeting'
					});
					break;
					case 1:
					uni.navigateTo({
					    url: '/pages/benefits/preferential'
					});
					break;
					case 2:
					uni.navigateTo({
					    url: '/pages/benefits/integral'
					});
					break;
					case 3:
					uni.navigateTo({
					    url: '/pages/benefits/upvue'
					});
					break;
				}
				
			},
			goDetail(){
				uni.navigateTo({
				    url: '/pages/home/detail'
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.home-page{
		.active-nav{
			.image{
				width: 90rpx;
				height: 90rpx;
			}
			.text{
				font-size: 24rpx;
			}
		}
		// 限时特惠
		.goods-example{
			border-top:20rpx solid #f5f5f5;
			width:100%;
			.preferential{
				width: 50%;
				position:relative;
				.hot-right{
					position: absolute;
					right: 0px;
					top:0px;
					width:70rpx;
					height:70rpx;
					.iconfont{
						color:$uni-bg-color ;
					}
					.text{
						
					}
				}
			}
			.goods-right{
				width: 50%;
			}	
		}
		
	}
</style>
<style lang="scss">
	.home-page{
		.swiper-box {
			padding: 20rpx;
			border-top: 20rpx solid #f5f5f5;
			border-bottom: 20rpx solid #f5f5f5;
			
			.swiper {
				overflow: hidden;
				height: 180rpx;
				border-radius:5px;
				image {
					width: 100%;
					height: 100%;
				}
			}
		}
	}
</style>
