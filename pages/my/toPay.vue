<template>
	<view class="to-pay">
		<view class="user-info">
			<view class="user-word">
				<text class="iconfont">&#xe853;</text>
				<view class="user-order">
					<view class="users">
						<text class="user-name">收件人：王晓文</text>
						<text class="num">1869536545</text>
					</view>
					<view class="address">
						<text>收货地址：北京市 北京市 朝阳区 花园路甲22号建国路甲13号215室</text>
						<text class="iconfont">&#xe642;</text>
					</view>

				</view>
			</view>
			<image class="bg-bottom" src="../../static/add_bg.jpg"></image>
		</view>
		<view class="goods-list">
			<view class="goods-item">
				<view class="shop-name uni-flex uni-row" style="align-items: center; justify-content: space-between;">
					<view class="uni-flex uni-row name-box" style="align-items: center; ">
						<image src="../../static/image_massge_people2.png" mode="aspectFill"></image>
						<text>王晓文的VIP会员店铺</text>
					</view>
					<text class="iconfont right">&#xe642;</text>
				</view>
				<view class="detail uni-flex uni-row" v-for="o in 2">
					<view class="left uni-flex uni-row" style="align-items: center;">
						<image src="https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/shuijiao.jpg?imageView2/3/w/200/h/100/q/90" mode="aspectFill"></image>
					</view>
					<view class="right">
						<view class="name">包图新款女式化妆护肤防晒霜 长效保湿安全护肤</view>
						<view class="size">
							商品规格
						</view>
						<view class="bottom  uni-flex uni-row">
							<view class="num-box" style="overflow: hidden;">
								<view class="money">
									<text class="num">￥1288</text>
									<text class="send">赠送128个金币</text>
								</view>
								<text>x1</text>
							</view>
							<view class="number-box">
								<uni-number-box :min="1"></uni-number-box>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="pay-method">
			<view class="uni-flex">
				<text>配送方式</text>
				<text>快递配送</text>
			</view>
			<view class="uni-flex">
				<text>运费</text>
				<text>￥10</text>
			</view>
			<view class="uni-flex">
				<text>留言</text>
				<input class="uni-input" placeholder-style="color:#999;" placeholder="选填:请留下您的要求" />
			</view>
		</view>
		<view class="handle-bottom ">
			<view class="shop-bottom uni-flex uni-row">
				<view class="all-left">
					<text class="word-grey">共2件商品</text>
					<text>赠送128个金币</text>
				</view>
				<view class="all-right uni-flex uni-row">
					<text class="combined">合计</text>
					<view>
						<view class="count-box">
							<view class="count-num">￥256</view>
							<!-- 大于7位数 弹窗-->
							<text class="gray-color">
								省256元
							</text>
						</view>
					</view>
					<button type="primary" size="mini">立即付款</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
</script>

<style lang="scss" scoped>
	.to-pay {
		background-color: #f4f4f4;

		.user-info {
			margin-bottom: 30rpx;
			background-color: $uni-text-color-inverse;

			.user-word {
				display: flex;
				align-items: center;
				padding: 20rpx 20rpx 0rpx 30rpx;
				color: $uni-text-color-grey;

				.iconfont {

					font-size: 42rpx;
					color: $uni-bg-color;
				}

				.user-order {
					margin-left: 30rpx;
					letter-spacing: 3rpx;

					.users {
						margin: 10rpx 0;

						.user-name {
							margin-right: 30rpx;
							font-size: 28rpx;
							font-weight: bold;
						}

						.num {
							font-size: 28rpx;
						}
					}

					.address {
						display: flex;

						.iconfont {
							margin-left: 20rpx;
						}
					}
				}
			}

			.bg-bottom {
				width: 100%;
				height: 8rpx;
			}
		}

		.goods-list {
			overflow: scroll;
			box-sizing: border-box;
			width: 100%;
			height: calc(100% - 90rpx);

			.goods-item {
				border-radius: 5px;
				background-color: #fff;

				.shop-name {
					border-bottom: 1px solid $uni-border-color;

					.name-box {
						height: 80rpx;
						padding-left: 30rpx;
					}

					.right {
						margin-right: 30rpx;
					}

					text {
						color: $uni-bg-color;
					}

					image {
						width: 40rpx;
						height: 40rpx;
						margin-left: 10rpx;
						margin-right: 10rpx;
						border-radius: 50%;
						overflow: hidden;
					}
				}

				.detail {
					padding: 30rpx 0;
					margin: 0 30rpx;
					border-bottom: 1px solid $uni-border-color;
					align-items: flex-start;

					.left {
						margin-right: 20rpx;

						image {
							width: 150rpx;
							height: 150rpx;
							margin-left: 10rpx;
						}
					}

					.right {
						flex: 1;
						font-size: 24rpx;

						.name {
							font-size: 24rpx;
						}

						.size {
							display: inline-block;
							margin: 2rpx 0;
							height: 40rpx;
							line-height: 40rpx;
							font-size: 22rpx;
							color: $uni-text-color-grey;
							background: #f9f9f9;
						}

						.bottom {
							align-items: flex-end;
							flex-wrap: wrap;
							justify-content: space-between;

							text {
								font-size: 24rpx;
							}

							.num-box {
								display: flex;
								align-items: center;
								justify-content: space-between;
								width: 100%;
								white-space: nowrap;

								.money {
									.num {
										color: $uni-bg-color;
									}

									.send {
										color: $uni-text-color-grey;
										font-size: 20rpx;
										margin-left: 10rpx;
									}
								}

							}

							.number-box {
								flex: 1;
								text-align: right;
							}
						}
					}
				}
			}
		}
		
		.pay-method {
			margin-top: 30rpx;
			background-color: $uni-text-color-inverse;
			.uni-flex {
				padding: 20rpx;
				align-items: center;
				justify-content: space-between;
				border-bottom: 1px solid #f4f4f4;
				.uni-input {
					color: $uni-text-color-grey;
				}
			}
		}
		.handle-bottom {
			position: fixed;
			bottom: 0px;
			left: 0px;
			width: 100%;
			height: 90rpx;
			background-color: #fff;

			.shop-bottom {
				width: 100%;
				height: 100%;
				justify-content: space-between;
				align-items: center;

				.all-left {
					margin-left: 20rpx;
					
					.word-grey {
						color: $uni-text-color-grey;
						font-size: $uni-font-size-sm;
					}
					text {
						color: $uni-bg-color;
						font-size: 20rpx;
						margin-left: 10rpx;
					}
				}

				.all-right {
					margin-right: 20rpx;
					align-items: center;

					.combined {
						margin-right: 10rpx;
					}

					.count-box {
						margin-right: 20rpx;

						.count-num {
							color: $uni-bg-color;
							font-size: 28rpx;
						}

						.gray-color {
							font-size: 20rpx;
							color: $uni-text-color-grey;
						}
					}

					button {
						display: flex;
						align-content: center;
						justify-content: center;
						width: 212rpx;
						height: 58rpx;
						border-radius: 58rpx;
						font-size: 28rpx;
						background-color: $uni-bg-color;
					}
				}
			}
		}
	
	}
</style>
