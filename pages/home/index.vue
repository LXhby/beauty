<template>
	<view class="home-page">
		<top-bar rightText="店铺设置" :detailist="detailist" :isreal="false"></top-bar>
		<view class="active-nav">
			<uni-grid :column="4" :show-border="false" :square="false" @change="goPage">
				<uni-grid-item>
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
					<text class="text1">热</text>
					<text class="text2">销</text>
				</view>
				<view class="title">
					限时特惠
				</view>
				<text class="sub-title">
					今日推荐特实惠
				</text>
				<view class="image-box uni-flex uni-row">
					<image src="../../static/cp01.png" class="good-image" mode="widthFix"></image>
					<view class="circle">
						￥10.00
					</view>
				</view>
				<text class="word-black">美白美金美白美金</text><br />
				<text class="word-red">倒计时：3天18小时56秒</text>
			</view>
			<view class="uni-flex uni-column goods-right">
				<view class="top">
					<view class="top-main">
						<view class="text">
							<text class="title">美白黄金</text>
							<view class="subtitle">
								美白修复
							</view>
						</view>
						<view class="money">
							拼团 388元 / 盒
						</view>
					</view>
					<image src="../../static/cp01.png" mode="aspectFit"></image>
				</view>
				<view class="top">
					<view class="top-main">
						<view class="text">
							<text class="title">美白黄金</text>
							<view class="subtitle">
								美白修复
							</view>
						</view>
						<view class="money">
							秒杀 388元 / 盒
						</view>
					</view>
					<image src="../../static/cp01.png" mode="aspectFit"></image>
				</view>
			</view>
		</view>


		<view class="swiper-box">
			<swiper class="swiper" :indicator-dots="true" :autoplay="true" :interval="interval" :duration="duration" :circular="true">
				<swiper-item>
					<image src="../../static/ad3.jpg" mode="aspectFill"></image>
				</swiper-item>
				<swiper-item>
					<image src="../../static/chuke.jpg" mode="aspectFill"></image>
				</swiper-item>
				<swiper-item>
					<image src="../../static/order_bm_bg.jpg" mode="aspectFill"></image>
				</swiper-item>
			</swiper>
		</view>

		<view class="bottom-line">-- 我是有底线的卡瑞塔 --</view>
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
		data() {
			return {
				detailist: ["可提现", "待提现", "产品额度"]
			}
		},
		methods: {
			goPage(event) {
				var index = event.detail.index;
				switch (index) {
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
			goDetail() {
				uni.navigateTo({
					url: '/pages/home/detail'
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "../../common/common.scss";

	.home-page {
		.active-nav {
			.image {
				width: 90rpx;
				height: 90rpx;
			}

			.text {
				font-size: 24rpx;
			}
		}

		// 限时特惠
		.goods-example {
			border-top: 20rpx solid #f5f5f5;
			width: 100%;

			.sub-title {
				margin-left: 20rpx;
				font-size: 20rpx;
				color: $uni-text-color-grey;
			}

			.preferential {
				width: 50%;
				position: relative;

				.hot-right {
					position: absolute;
					right: 0px;
					top: 0px;
					width: 70rpx;
					height: 80rpx;


					.iconfont {
						margin-top: -2rpx;
						vertical-align: top;
						font-size: 70rpx;
						color: $uni-bg-color;
					}

					text {
						position: absolute;
						top: 0;
						bottom: 0;
						left: 0;
						right: 0;
						margin: auto auto;
						color: #fff;
						font-size: 20rpx;

					}

					.text1 {
						margin-left: 26rpx;
					}

					.text2 {
						margin-top: 23rpx;
						margin-left: 46rpx;
					}
				}

				.title {
					padding: 20rpx 0 0 20rpx;
					color: $uni-bg-color;
					font-size: 32rpx;
					line-height: 32rpx;
				}

				.image-box {
					padding: 0 40rpx;
					margin-top: 20rpx;
					justify-content: space-between;

					.good-image {
						width: 160rpx;
						padding-top: 20rpx;
					}

					.circle {
						width: 106rpx;
						height: 106rpx;

						background: #fce0f5;
						border-radius: 50%;
						text-align: center;
						line-height: 106rpx;
						font-size: 20rpx;
						color: $uni-bg-color;
					}
				}

				.word-black {
					margin-left: 16rpx;
					font-size: 32rpx;
					line-height: 32rpx;
				}

				.word-red {
					margin-left: 16rpx;
					color: $uni-bg-color;
					font-size: 20rpx;
				}
			}

			.goods-right {
				width: 50%;

				.top {
					display: flex;
					justify-content: space-between;
					padding: 20rpx;
					border-bottom: 1px solid #f4f4f4;

					.text {
						.title {
							font-size: 32rpx;
							line-height: 32rpx;
						}

						.subtitle {
							margin-left: 5rpx;
							font-size: 20rpx;
							color: $uni-text-color-grey;
						}
					}

					.money {
						margin-top: 40rpx;
						padding: 4rpx 10rpx;
						border-radius: 20rpx;
						font-size: 24rpx;
						color: $uni-bg-color;
						background-color: #fce0f5;
					}

					image {
						width: 140rpx;
						height: 140rpx;
					}
				}
			}
		}

	}
</style>
<style lang="scss">
	.home-page {
		.swiper-box {
			padding: 20rpx;
			border-top: 20rpx solid #f5f5f5;
			border-bottom: 20rpx solid #f5f5f5;

			.swiper {
				overflow: hidden;
				height: 180rpx;
				border-radius: 5px;

				image {
					width: 100%;
					height: 100%;
				}
			}

		}
	}
</style>
