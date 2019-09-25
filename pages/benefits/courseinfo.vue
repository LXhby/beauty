<template>
	<view class="course">
		<view class="banner">
			<image src="../../static/37d52be5170e1b25d30ff44db4b0791c.jpg" mode="aspectFill"></image>
			<view class="shop-car">
				<text class="iconfont">&#xe603;</text>
				<uni-badge text="9" type="error" class="shopcar-badge" />
			</view>
		</view>

		<view class="course-show">
			<view class="course-name">
				<view class="title">某某课程名称</view>
				<view class="course-content">
					<view class="course-list uni-flex uni-row">
						<view class="icon-btn">
							<text class="iconfont">&#xe60c;</text>
						</view>
						<swiper class="swiper" :indicator-dots="false" :autoplay="false" :interval="interval" :duration="duration" :circular="true">
							<swiper-item>
								<view class="item-box uni-flex uni-row">
									<view class="item one">
										<view class="phase ">
											第二期
										</view>
										<text>2019年7月16日</text>
									</view>
									<view class="item two">
										<view class="phase">
											第二期
										</view>
										<text>2019年7月16日</text>
									</view>
									<view class="item third">
										<view class="phase">
											第二期
										</view>
										<text>2019年7月16日</text>
									</view>
								</view>
							</swiper-item>
							<swiper-item>
								<image src="../../static/chuke.jpg" mode=""></image>
							</swiper-item>
							
						</swiper>
						<view class="icon-btn">
							<text class="iconfont">&#xe60d;</text>
						</view>
					</view>
					<view class="course-position">
						<view class="uni-flex uni-row">
							<text class="iconfont">&#xe608;</text>
							<text>2019年7月16号 至 2019年7月19号</text>
						</view>
						<view class="uni-flex uni-row">
							<text class="iconfont">&#xe602;</text>
							<text>北京·九华山庄宾馆楼</text>
						</view>
						<view class="uni-flex uni-row">
							<text class="iconfont">&#xe63f;</text>
							<text>200人</text>
						</view>
						<view class="uni-flex uni-row">
							<text class="iconfont">&#xe675;</text>
							<text>
								课程简介课程简介课程简介课程简介
							</text>
						</view>
					</view>
				</view>
			</view>
			<view class="course-info">
				<view class="course-title">
					<view class="line"></view>
					<text class="text">课程详情</text>
				</view>
				<view class="course-word">
					课程详情
				</view>
			</view>

		</view>
		<view class="couse-money">
			<text class="new-price">￥ 5800元</text>
			<text class="old-price">原价: ￥ 12800元</text>
			<button class="btn" type="primary">立即报名</button>
		</view>
		<view class="height-box">
			
		</view>
		<view class="bottom">
			<button class="btn" type="primary">报名成功</button>
		</view>
	</view>
</template>

<script>
	import uniBadge from '@/components/uni-badge/uni-badge.vue'
	export default {
		components: {
			uniBadge
		},
		data() {
			return {}
		}
	}
</script>

<style lang="scss" scoped>
	@import "../../common/common.scss";

	.course {
		background-color: #f1f1f1;

		.banner {
			position: absolute;
			width: 100%;
			height: 420rpx;
			left: 0;
			top: 0;
		
			image {
				width: 100%;
				position: absolute;
				top: 0;
				left: 0;
				height: 420rpx;
			}
		
			.shop-car {
				position: absolute;
				top: 20rpx;
				right: 20rpx;
				width: 60rpx;
				height: 60rpx;
				border-radius: 50%;
				background: rgba(0, 0, 0, 0.3);
				text-align: center;
		
				.iconfont {
					line-height: 60rpx;
					color: #fff;
					font-size: 36rpx;
				}
				.shopcar-badge{
					position: absolute;
					top: -16rpx;
					right: -10rpx;
				}
			}
		}

		.course-show {
			position: relative;
			z-index: 999;
			box-sizing: border-box;
			padding: 350rpx 20rpx 20rpx 20rpx;

			.course-name {
				margin-bottom: 20rpx;
				border-radius: $uni-border-radius-base;
				background-color: #fff;
				.title{
					height: 70rpx;
					margin-left: 10rpx;
					line-height: 70rpx;
					font-size: 32rpx;
					border-bottom: 1px solid $uni-border-color;
					color: #333;
				}
				.course-content {
					padding: 20rpx;
					.course-list{
						justify-content:space-between;
						align-items:center;
						.icon-btn{
							width: 40rpx;
							.iconfont{
								font-size: 38rpx;
								
							}
						}
						.swiper{
							flex: 1;
							height:60rpx;
							.item-box{
								.item{
									display: flex;
									flex-direction: column;
									justify-content: center;
									width: 180rpx;
									height: 60rpx;
									color:#fff;
									text-align: center;
									border-radius:3px;
									.phase{
										font-size: 24rpx;
										line-height: 24rpx;
									}
									text{
										font-size: 20rpx;
										line-height: 24rpx;
									}
									&:first-child{
										margin-right: 20rpx;
									}
									&:nth-child(2){
										margin-right: 20rpx;
									}
								}
								.one{
									background: #ca26a9;
								}
								.two{
									background: #e36dcb;
								}
								.third{
									background: #eee;
								}
							}
						}
					}
					.course-position {
						color: $uni-text-color;
						font-size: 28rpx;

						view {
							align-items: center;
							padding: 18rpx 0;
							border-bottom: 1px solid $uni-border-color;
							.iconfont{
								margin-right: 20rpx;
							}
						}
					}
				}
			}
		}

		.course-info {
			padding: 20rpx 0;
			background-color: #fff;
			border-radius: $uni-border-radius-base;
			.course-title{
				display: flex;
				align-content: center;
				padding:10rpx 0  20rpx 28rpx;
				border-bottom:1px solid $uni-border-color;
				.line{
					width: 8rpx;
					font-size: 32rpx;
					height: 32rpx;
					border-radius: 8rpx;
					background-color: $uni-bg-color ;
				}
				.text{
					margin-left: 10rpx;
					font-size: 32rpx;
					line-height: 32rpx;
					color: $uni-bg-color;
				}
			}
			.course-word{
				padding: 20rpx;
				font-size: 28rpx;
				color: $uni-text-color;
			}
		}

		.couse-money {
			display: flex;
			align-items: center;
			padding: 20rpx;
			margin-bottom: 20rpx;
			background-color: #fff;
			.new-price {
				color: $uni-bg-color;
				font-size: 32rpx;
			}
			.old-price {
				margin: 0 30rpx 0 20rpx;
				text-decoration:line-through;
				font-size: 28rpx;
				color: $uni-text-color-grey;
			}
			.btn {
				width: 292rpx;
				height: 60rpx;
				padding: 0;
				line-height: 60rpx;
				
				font-size: 32rpx;
				background-color: $uni-bg-color;
			}
		}
		.height-box{
			height: 100rpx;
		}
		.bottom {
			position: fixed;
			display: flex;
			align-items: center;
			bottom: 0;
			left: 0;
			box-sizing: border-box;
			width: 100%;
			height: 100rpx;
			
			background-color: #fff;

			.btn {
				width: 666rpx;
				height: 60rpx;
				padding: 0;
				line-height: 60rpx;
				font-size: 32rpx;
				background-color: #6dd900;
				&:after{
					border: none;
				}
			}
		}
	}
</style>
