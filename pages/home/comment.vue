<template>
	<view class="comment-page">
		<view class="goods">
			<view class="shop-car">
				<text class="iconfont">&#xe603;</text>
				<uni-badge text="9" type="error" class="shopcar-badge" />
			</view>
			<view class="goods-detail">
				<view class="title uni-flex uni-row">
					<text class="title-text">Deerma女士护肤面霜</text>
					<text class="iconfont">&#xe641;</text>
				</view>
				<view class="img-box uni-flex uni-row">
					<image src="../../static/006tlvijgy1g6ldbo6anuj30e20e2wjb.jpg" mode="aspectFill"></image>
					<view class="right">
						<view class="num">
							￥98.00
						</view>
						<text>销量234笔</text>
						<text>好评96%</text>
					</view>
				</view>
			</view>
		</view>
		<view class="comment-main">
			<view class="main-title">
				<view class="line"></view>
				<text class="text">粉丝们好评如潮</text>
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
						<view class="comments-image">
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
		<view class="height-box">
			
		</view>
		<view class="foot-main">
			<view class="main-btns uni-flex uni-row">
				<view class="icon-btn uni-flex uni-row">
					<view class="btn-sm">
						<text class="iconfont icon1">&#xe660;</text>
						<view class="text-nav nav1">
							首页
						</view>
					</view>
					<view class="btn-sm">
						<text class="iconfont">&#xe6c5;</text>
						<view class="text-nav">
							客服
						</view>
					</view>
					<view class="btn-sm">
						<text class="iconfont">&#xe69b;</text>
						<view class="text-nav">
							收藏
						</view>
					</view>
				</view>
				<button type="primary" class="btn1">加入购物车</button>
				<button type="primary" class="btn2">立即购买</button>
			</view>
			
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
	page{
		width: 100%;
		height: 100%;
	}
	.comment-page {
		width: 100%;
		height: 100%;
		background: #f1f1f1;
		.goods {
			position: relative;
			padding: 60rpx 30rpx 30rpx 30rpx;
			margin-bottom: 20rpx;
			background: #fff;

			.shop-car {
				position: absolute;
				top: 20rpx;
				right: 30rpx;
				width: 60rpx;
				height: 60rpx;
				border-radius: 50%;
				background: rgba(0, 0, 0, 0.5);
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

			.goods-detail {
				padding: 30rpx;
				box-shadow: 0 0 5px .5px rgba(0, 0, 0, .2);

				.title {
					justify-content: space-between;
					margin-bottom: 20rpx;

					.title-text {
						font-size: 36rpx;
					}

					.iconfont {
						font-size: 46rpx;
						color: $uni-text-color-grey;
					}
				}

				.img-box {
					align-items: center;

					image {
						width: 150rpx;
						height: 112rpx;
					}

					.right {
						margin-left: 30rpx;

						.num {
							margin-bottom: 10rpx;
							font-size: 32rpx;
							color: #ff4b0f;
						}

						text {
							font-size: 28rpx;
							margin-right: 10rpx;
							color: $uni-text-color-grey;
						}
					}
				}
			}
		}
		.comment-main{
			background: #fff;
			.main-title{
				padding-top: 20rpx;
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
						font-size: 24rpx;
						font-size: $uni-text-color;
					}
			
					.comments-image {
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
			margin-bottom: 100rpx;
			background: #f1f1f1;
		}
		.height-box{
			height:100rpx;
		}
		.foot-main{
			position: fixed;
			left: 0;
			bottom: 0;
			width:100%;
			height:100rpx;
			overflow:hidden;
			.main-btns{
				align-items: center;
				height: 100%;
			}
			.icon-btn{
				flex:1;
				display: flex;
				height: 100%;
				flex-direction: row;
				justify-content: space-around;
				background:#fff;
				align-items:center;
				
				.btn-sm{
					text-align:center;
					.iconfont{
						color: #4aa3f0;
						font-size: 32rpx;
					}
					.text-nav{
						font-size: 24rpx;
						color: $uni-text-color-grey;
					}
					.icon1{
						color: $uni-bg-color;
					}
					.nav1{
						color: $uni-bg-color;
					}
				}
				
			}
			button{
				width: 242rpx;
				height: 100%;
				font-size: 32rpx;
				line-height:100rpx;
				border-radius: 0px;
			}
			.btn1{
				background: #4aa3f0;
			}
			.btn2{
				background: $uni-bg-color;
			}
		}
	
	}
</style>
