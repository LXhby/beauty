<template>
	<view class="cart-page">
		<view class="have-none" v-if="!hasData">
			<image src="../../static/order_no_bg.png" mode="widthFix"></image>
			<view class="title">
				不过节吗！什么也没有啊~
			</view>
			<view class="text">到底还过不过了，啥也不买</view>
			<text>买不买得，先加个购物车再说嘛</text>
			<button>我想看看</button>
		</view>
		<view class="goods-content" v-else>
			<view class="goods-list">
				<view class="goods-item">
					<view class="shop-name uni-flex uni-row" style="align-items: center; justify-content: space-between;">
						<view class="uni-flex uni-row name-box" style="align-items: center; ">
							<checkbox value="cb" checked="true" color="#fff" style="transform:scale(0.8);" />
							<image src="../../static/image_massge_people2.png" mode="aspectFill"></image>
							<text>王晓文的VIP会员店铺</text>
						</view>
						<text class="iconfont right">&#xe60e;</text>
					</view>
					<view class="detail uni-flex uni-row">
						<view class="left uni-flex uni-row" style="align-items: center;">
							<checkbox value="cb" checked="true" color="#fff" style="transform:scale(0.8);" />
							<image src="https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/shuijiao.jpg?imageView2/3/w/200/h/100/q/90" mode="aspectFill"></image>
						</view>
						<view class="right">
							<view class="name">包图新款女式化妆护肤防晒霜 长效保湿安全护肤</view>
							<view class="size">
								商品规格
							</view>
							<view class="bottom">
								<text class="num">￥128</text>
								<text class="send">赠送128个金币</text>
								<uni-number-box :min="1"></uni-number-box>
							</view>
						</view>
					</view>
					<view class="detail">
						<view class="left uni-flex uni-row" style="align-items: center;">
							<checkbox value="cb" checked="true" color="#fff" style="transform:scale(0.8);" />
							<image src="https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/shuijiao.jpg?imageView2/3/w/200/h/100/q/90" mode="aspectFill"></image>
						</view>
						<view class="right">
							<text class="name">包图新款女式化妆护肤防晒霜 长效保湿安全护肤</text>
							<view class="size">
								商品规格
							</view>
							<view class="bottom">
								<text>￥128</text>
								<text>赠送128个金币</text>
								<uni-number-box :min="1"></uni-number-box>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="handle-bottom uni-flex uni-row">
				<label class="radio">
					<checkbox value="cb" checked="true" color="#fff" style="transform:scale(0.8);" />全选
				</label>
			</view>
		</view>
	</view>
</template>

<script>
	import uniNumberBox from "@/components/uni-number-box/uni-number-box.vue"
	export default {
		data() {
			return {
				hasData: true

			}
		},
		components: {
			uniNumberBox
		}
	}
</script>

<style lang="scss" scoped>
	uni-page-body {
		width: 100%;
		height: 100%;
	}

	.cart-page {
		width: 100%;
		height: 100%;

		.have-none {
			font-size: 24rpx;
			text-align: center;
			color: $uni-text-color;

			image {
				width: 500rpx;
				margin-top: 140rpx;
			}

			.title {
				margin-top: 50rpx;
				margin-bottom: 24rpx;
				font-size: 32rpx;
			}

			.text {
				margin-bottom: 8rpx;
				font-size: 24rpx;
			}

			button {
				width: 214rpx;
				height: 52rpx;
				line-height: 52rpx;
				margin-top: 130rpx;
				background: #fd3f6f;
				color: #fff;
				border-radius: 52rpx;
				font-size: 32rpx;

				&:after {
					border: none;
				}
			}
		}

		.goods-content {
			width: 100%;
			height: 100%;
			background: #f1f1f1;

			.goods-list {
				overflow: scroll;
				box-sizing: border-box;
				width: 100%;
				padding: 30rpx;
				height: calc(100% - 90rpx);

				.goods-item {
					background-color: #fff;

					.shop-name {
						border-bottom: 1px solid $uni-border-color;

						.name-box {
							height: 80rpx;
							padding-left:30rpx;
						}
						.right{
							margin-right:30rpx;
						}

						text {
							color: $uni-bg-color;
						}

						image {
							width: 40rpx;
							height: 40rpx;
							margin-right:10rpx;
							border-radius: 50%;
							overflow: hidden;
						}
					}

					.detail {
						padding: 30rpx 0;
						margin: 0 30rpx;
						border-bottom:1px solid $uni-border-color;
						align-items:flex-start;
						.left{
							margin-right: 25rpx;
							image{
								width: 140rpx;
								height: 140rpx;
							}
						}
						.right{
							flex: 1;
							font-size: 24rpx;
							.name{
								font-size: 24rpx;
							}
							.size{
								display: inline-block;
								height: 40rpx;
								padding: 0 84rpx 0 15rpx;
								line-height: 40rpx;
								font-size: 24rpx;
								color: $uni-text-color-grey;
								background: #f9f9f9;
							}
							.bottom{
								text{
									font-size: 24rpx;
								}
								.num{			
									color: $uni-bg-color;
								}
								.send{
									color: $uni-text-color-grey;
								}
							}
						}
					}
				}
			}

			.handle-bottom {
				position: absolute;
				bottom: 0px;
				left: 0px;
				width: 100%;
				height: 90rpx;
				background-color: #fff;
			}
		}

	}
</style>
<style lang="scss">

</style>
