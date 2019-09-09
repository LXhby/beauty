<template>
	<view class="good-detail">
		<view class="banner">
			<image src="../../static/37d52be5170e1b25d30ff44db4b0791c.jpg" mode="aspectFill"></image>
			<view class="shop-car">
				<text class="iconfont">&#xe603;</text>
				<uni-badge text="9" type="error" class="shopcar-badge" />
			</view>
		</view>
		<view class="good-top">
			<view class="goods-name">
				<view class="name-top uni-flex uni-row">
					<view class="left">
						<view class="title">
							<text class="title-h">Deerma女式护肤面霜Deerma女式护肤面霜Deerma女式护肤面霜</text>
							<text class="sm">包邮</text>
						</view>
						<text class="details">女式最爱的护肤面霜，美白，保湿</text>
					</view>
					<text class="iconfont erweima">&#xe641;</text>
				</view>
				<view class="price uni-flex uni-row">
					<text class="one">￥98.00</text>
					<text class="two">已售646件</text>
				</view>
			</view>
			<view class="ensure uni-flex uni-row">
				<view class="text">
					<text class="iconfont">&#xe678;</text>
					<text>正品保障</text>
				</view>
				<view class="text">
					<text class="iconfont">&#xe604;</text>
					<text>自营销售</text>
				</view>
				<view class="text">
					<text class="iconfont">&#xe64d;</text>
					<text>假一赔十</text>
				</view>
				<view class="text">
					<text class="iconfont">&#xe63d;</text>
					<text>售后无忧</text>
				</view>
			</view>

		</view>
		<view class="goods-detail">
			<view class="main-title">
				<view class="line"></view>
				<text class="text">商品详情介绍</text>
			</view>
			<view class="image-box">
				<image src="../../static/816a66edef10673b4768128b41804cae.jpg" mode="widthFix"></image>
				<image src="../../static/816a66edef10673b4768128b41804cae.jpg" mode="widthFix"></image>
			</view>
		</view>
		<view class="fans-detail">
			<view class="main-title">
				<view class="line"></view>
				<text class="text">粉丝们还在浏览</text>
			</view>
			<view class="image-box uni-flex uni-row">
				<image src="../../static/e7b51b721c3319e9c2916cc41cd9c695.jpg" mode="aspectFill"></image>
				<image src="../../static/e7b51b721c3319e9c2916cc41cd9c695.jpg" mode="aspectFill"></image>
				<image src="../../static/816a66edef10673b4768128b41804cae.jpg" mode="aspectFill"></image>
			</view>
		</view>
		<view class="good-coment">
			<view class="main-title">
				<view class="left">
					<view class="line"></view>
					<text class="text">粉丝们好评如潮</text>
				</view>
				<view class="right">
					620评论
					<text class="iconfont">&#xe642;</text>
				</view>
			</view>
			<view class="comment-list">
				<view class="comment-item uni-flex uni-row">
					<image src="../../static/image_massge_people2.png" mode="widthFix" class="headurl"></image>
					<view class="comment-main">
						<view class="comment-user uni-flex uni-row">
							<view >
								<text class="name">王晓文</text>
								<text class="time">3天前</text>
							</view>
							<view class="star">
								<text class="iconfont light-star">&#xe623;</text>
								<text class="iconfont light-star">&#xe623;</text>
								<text class="iconfont light-star">&#xe623;</text>
								<text class="iconfont">&#xe623;</text>
								<text class="iconfont">&#xe623;</text>
							</view>
						</view>
						<view class="comment-text">
							很不错哦很不错哦
						</view>
						<view class="comment-image">
							<image src="../../static/006tlvijgy1g6ldbo6anuj30e20e2wjb.jpg" mode="aspectFill"></image>
							<image src="../../static/006tlvijgy1g6ldbo6anuj30e20e2wjb.jpg" mode="aspectFill"></image>
							<image src="../../static/006tlvijgy1g6ldbo6anuj30e20e2wjb.jpg" mode="aspectFill"></image>
						</view>
					</view>
				</view>
				<view class="comment-item uni-flex uni-row">
					<image src="../../static/image_massge_people2.png" mode="widthFix" class="headurl"></image>
					<view class="comment-main">
						<view class="comment-user uni-flex uni-row">
							<view >
								<text class="name">王晓文</text>
								<text class="time">3天前</text>
							</view>
							<view class="star">
								<text class="iconfont light-star">&#xe623;</text>
								<text class="iconfont">&#xe623;</text>
								<text class="iconfont">&#xe623;</text>
								<text class="iconfont">&#xe623;</text>
								<text class="iconfont">&#xe623;</text>
							</view>
						</view>
						<view class="comment-text">
							很不错哦很不错哦很不错哦很不错哦很不错哦很不错哦很不错哦很不错哦
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="bottom-line">-- 我是有底线的卡瑞塔 --</view>
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

	.good-detail {
		position: relative;
		background: #fff;

		.banner {
			position: absolute;
			z-index: 2;
			width: 100%;
			height: 465rpx;
			top: 0;
			left: 0;

			image {
				width: 100%;
				position: absolute;
				top: 0;
				left: 0;
				height: 465rpx;
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

				.shopcar-badge {
					position: absolute;
					top: -16rpx;
					right: -10rpx;
				}
			}
		}

		.good-top {
			position: relative;
			z-index: 3;
			border-top: 392rpx solid rgba(0, 0, 0, 0);
			padding-left: 20rpx;
			padding-right: 20rpx;

			.goods-name {
				overflow: hidden;
				border-radius: 5px;
				box-shadow: 0 0 5px .5px rgba(0, 0, 0, .2);
				background: #fff;

				.name-top {
					padding: 20rpx;
					justify-content: space-between;
					align-items: center;

					.left {
						width: 570rpx;

						.title {
							position: relative;

							.title-h {
								font-size: 36rpx;
							}

							.sm {
								position: absolute;
								bottom: 20rpx;
								font-size: 20rpx;
								color: #fdc77b;
							}
						}

						.details {
							font-size: 28rpx;
							color: $uni-text-color-grey;
						}
					}

					.erweima {
						font-size: 46rpx;
						color: $uni-text-color-grey;
					}
				}

				.price {
					justify-content: space-between;
					align-items: center;
					padding: 0 20rpx 20rpx 20rpx;

					.one {
						font-size: 32rpx;
						color: #ff4000;
					}

					.two {
						font-size: 28rpx;
						color: $uni-text-color-grey;
					}
				}
			}

			.ensure {
				padding: 20rpx 0;
				justify-content: space-around;

				.iconfont {
					font-size: 28rpx;
					color: $uni-bg-color;
					margin-right: 10rpx;
				}

				text {
					font-size: 24rpx;
					color: $uni-text-color-grey;
				}
			}
		}

		.goods-detail {
			padding: 20rpx 0;
			border-top: 20rpx solid #f1f1f1;

			.image-box {
				padding: 0 30rpx 46rpx 30rpx;

				image {
					margin-top: 20rpx;
					width: 100%;
				}
			}
		}

		.fans-detail {
			padding: 20rpx 0;
			border-top: 20rpx solid #f1f1f1;

			.image-box {
				flex-wrap: wrap;

				image {
					margin-top: 20rpx;
					margin-left: 30rpx;
					width: 210rpx;
					height: 210rpx;
					border-radius: 5px;
				}
			}
		}

		.good-coment {
			padding: 20rpx 0;
			border-top: 20rpx solid #f1f1f1;
			.main-title{
				align-items:center;
				justify-content:space-between;
				.left{
					display: flex;
				}
				.right{
					margin-right: 30rpx;
					color: $uni-text-color-grey;
					line-height:30rpx;
					.iconfont{
						font-size: 26rpx;
					}
				}
			}
			.comment-item {
				padding: 20rpx 0;
				margin: 0 30rpx;
				border-bottom: 1px solid $uni-border-color;

				.headurl {
					width: 60rpx;
					height: 60rpx;
					border-radius: 50%;
				}

				.comment-main {
					flex: 1;
					margin-left:20rpx;
					.comment-user {
						justify-content: space-between;
						font-size: 32rpx;
						.name{
							font-size: 28rpx;
						}
						.time{
							margin-left: 20rpx;
							font-size: 24rpx;
							color: $uni-text-color-grey;
						}
						.star{
							.iconfont{
								font-size: 20rpx;
								color: $uni-text-color-grey;
								margin-left: 4rpx;
							}
							.light-star{
								color: $uni-bg-color;
							}
						}
					}

					.comment-text {
						width: 470rpx;
						white-space: nowrap;
						overflow: hidden;
						text-overflow: ellipsis;
						font-size: 24rpx;
						font-size: $uni-text-color;
					}

					.comment-image {
						margin-top:10rpx;
						image {
							width: 112rpx;
							height: 112rpx;
							border-radius: 2px;
							margin-right: 20rpx;
						}
					}
				}
			}
		}
		.bottom-line{
			padding: 30rpx 0;
			background: #f1f1f1;
		}
	}
</style>
