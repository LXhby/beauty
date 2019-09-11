<template>
	<view class="order">
		<view class="header">
			<text>待付款：订单倒计时30分钟，订单取消</text>
			<image src="../../static/car.png"></image>
		</view>
		<view class="store-name">
			<view class="store-header">
				<view class="header-left">
					<image src="../../static/image_massge_people2.png"></image>
					<text>某某店铺名称</text>
				</view>
				<view class="header-right">
					<button class="friend-pay btn" type="primary" size="mini">朋友代付</button>
					<button class="me-pay btn" type="primary" size="mini">立即付款</button>
				</view>
			</view>
			<view class="store-content">
				<view class="goods-info" v-for="o in 2">
					<image src=""></image>
					<view class="goods-src">
						<p>护肤的第一步就是做好面部清洁工作，敏感肌肤应该选择水润</p>
						<text>套装护肤+洁面</text>
					</view>
					<view class="goods-price">
						<p>￥99.9</p>
						<text>x1</text>
					</view>
				</view>
			</view>
		</view>
		<view class="user-info">
			<view class="user-word">
				<text class="iconfont">&#xe853;</text>
				<view class="user-order">
					<view>
						<text class="user-name">叶小天</text>
						<text class="num">1869536545</text>
					</view>
					<view>
						北京市 北京市 朝阳区 花园路甲22号建国路甲13号215室
					</view>

				</view>
			</view>
			<image class="bg-bottom" src="../../static/add_bg.jpg"></image>
		</view>
		<view class="order-info">
			<p class="to-pay">
				<text>待付金额:</text>
				<text class="money">￥19.9</text>
			</p>
			<p>
				<text>待赠金币:</text>
				<text>100个金币</text>
			</p>
			<p>
				<text>订单编号:</text>
				<text>201803150002625365445</text>
			</p>
			<p>
				<text>付款时间:</text>
				<text>2018-07-15 15:30:23</text>
			</p>
			<p>
				<text>发货时间:</text>
				<text>2018-07-15 15:30:23</text>
			</p>
		</view>
		<view class="bottom-line">-- 我是有底线的卡瑞塔 --</view>
	</view>
</template>

<script>
</script>

<style lang="scss" scoped>
	.order {
		background-color: #f4f4f4;

		.header {
			display: flex;
			align-items: center;
			justify-content: space-around;
			height: 200rpx;
			font-size: 32rpx;
			color: #fff;
			background: linear-gradient(to right, #ff0180 0%, #ff8175 100%);

			image {
				width: 120rpx;
				height: 80rpx;
			}
		}

		.store-name {
			margin: 20rpx 0;
			background-color: $uni-text-color-inverse;

			.store-header {
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 20rpx;
				border-bottom: 1px solid #f4f4f4;

				.header-left {
					display: flex;
					align-items: center;

					image {
						width: 50rpx;
						height: 50rpx;
						border-radius: 50%;
					}

					text {
						margin: 0 10rpx;
						color: $uni-bg-color;
					}
				}

				.header-right {
					display: flex;
					align-items: center;

					.btn {
						margin: 6rpx;
						padding: 0 8rpx;
						height: 50rpx;
						width: 160rpx;
						line-height: 50rpx;
						border-radius: 30rpx;
					}

					.friend-pay {
						background-color: #4aa3f0;
					}

					.me-pay {
						background-color: $uni-bg-color;
					}
				}
			}

			.store-content {
				padding-bottom: 20rpx;

				.goods-info {
					display: flex;
					justify-content: space-between;
					padding: 40rpx 0;
					margin: 0 40rpx;
					border-bottom: 1px solid #f4f4f4;

					image {
						width: 140rpx;
						height: 140rpx;
						border-radius: 10rpx;
						background-color: red;
					}

					.goods-src {
						display: flex;
						flex-wrap: wrap;
						margin-left: 20rpx;
						width: 450rpx;
						letter-spacing: 3rpx;

						text {
							margin-top: 30rpx;
						}
					}

					.goods-price {
						text-align: right;
					}

					text {
						font-size: $uni-font-size-sm;
						color: $uni-text-color-grey;
					}
				}
			}
		}

		.user-info {
			background-color: $uni-text-color-inverse;

			.user-word {
				display: flex;
				align-items: center;
				;
				padding: 20rpx 60rpx 0rpx 30rpx;
				color: $uni-text-color-grey;

				.iconfont {
					
					font-size: 42rpx;
					color: $uni-bg-color;
				}

				.user-order {
					margin-left: 30rpx;
					letter-spacing: 3rpx;

					view {
						margin: 10rpx 0;

						.user-name {
							margin-right: 30rpx;
							font-size: 28rpx;
							font-weight: bold;
						}
						.num{
							font-size: 24rpx;
						}
					}
				}
			}

			.bg-bottom {
				width: 100%;
				height: 8rpx;
			}
		}

		.order-info {
			margin: 20rpx 0;
			padding: 40rpx;
			background-color: $uni-text-color-inverse;

			p {
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin-bottom: 10rpx;
				color: $uni-text-color-grey;
			}

			.to-pay {
				color: #000;
			}

			.money {
				color: $uni-bg-color;
			}
		}

		.bottom-line {
			padding-bottom: 40rpx;
			color: $uni-text-color-grey;
			text-align: center;
		}
	}
</style>
