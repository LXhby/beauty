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
							<checkbox value="cb" checked="true"  color="#ff0080" style="transform:scale(0.8);" />
							<image src="../../static/image_massge_people2.png" mode="aspectFill"></image>
							<text>王晓文的VIP会员店铺</text>
						</view>
						<text class="iconfont right">&#xe60e;</text>
					</view>
					<view class="detail uni-flex uni-row" v-for="item in newShopcerVals">
						<view class="left uni-flex uni-row" style="align-items: center;">
							<checkbox value="cb" checked="true" color="#ff0080" style="transform:scale(0.8);" />
							<image :src="item[0].image" mode="aspectFill"></image>
						</view>
						<view class="right">
							<view class="name">{{item[0].name}}</view>
							<view class="size">
								商品规格
							</view>
							<view class="bottom  uni-flex uni-row">
								<view class="num-box" style="overflow: hidden;">
									<text class="num">￥{{item[0].price * item.length}}</text>
									<text class="send">赠送128个金币</text>
								</view>
								<view class="number-box" @click="clickNumberBox(item[0].id)">
									<uni-number-box :min="1" :value="item.length"  @change="bindChange"></uni-number-box>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="handle-bottom ">
				<view class="shop-bottom uni-flex uni-row">
					<view class="all-left">
						<label class="radio">
							<checkbox value="cb" checked="true" color="#ff0080" style="transform:scale(0.8);" />全选
						</label>
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
						<button type="primary" size="mini">确认订单</button>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniNumberBox from "@/components/uni-number-box/uni-number-box.vue"
	export default {
		data() {
			return {
				hasData: true,
				shopcerVals: [],
				newShopcerVals: [],
				productNum: 0,
			}
		},
		components: {
			uniNumberBox
		},
		onLoad() {
			this.shopcerVals = JSON.parse(uni.getStorageSync('cartnum'))
			console.log(this.shopcerVals)
			let arr = []
			let arr1 = []
			this.shopcerVals.forEach(ele => {
				if(arr1.length === 0) {
					arr1.push(ele)
				} else {
					if(arr1[0].id === ele.id) {
						arr1.push(ele)
					} else {
						return
					}
					arr.push(arr1)
				}
			})
			this.newShopcerVals = arr
			console.log(arr)
		},
		methods: {
			bindChange(value) {
				this.productNum = value
			},
			clickNumberBox(productId) {
				console.log(this.productNum)
			}
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
			position: relative;
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
					border-radius: 5px;
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
							margin-left: 10rpx;
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
							margin-right: 20rpx;
							image{
								width: 150rpx;
								height: 150rpx;
								margin-left: 10rpx;
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
								margin: 2rpx 0;
								height: 40rpx;
								padding: 0 84rpx 0 15rpx;
								line-height: 40rpx;
								font-size: 22rpx;
								color: $uni-text-color-grey;
								background: #f9f9f9;
							}
							.bottom{
								align-items:flex-end;
								flex-wrap: wrap;
								justify-content:space-between;
								text{
									font-size: 24rpx;
								}
								.num-box{
									white-space:nowrap;
									.num{
										color: $uni-bg-color;
									}
									.send{
										color: $uni-text-color-grey;
										font-size: 20rpx;
										margin-left: 10rpx;
									}
								}
								.number-box{
									flex: 1;
									text-align: right;
								}
							}
						}
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
				.shop-bottom{
					width: 100%;
					height: 100%;
					justify-content: space-between;
					align-items:center;
					.all-left{
						margin-left: 20rpx;
						text{
							color: $uni-bg-color;
							font-size: 20rpx;
							margin-left: 10rpx;
						}
					}
					.all-right{
						margin-right: 20rpx;
						align-items: center;
						.combined{
							margin-right: 10rpx;
						}
						.count-box{
							margin-right:20rpx;
							.count-num{
								color: $uni-bg-color;
								font-size: 28rpx;
							}
							.gray-color{
								font-size: 20rpx;
								color: $uni-text-color-grey;
							}
						}
						
						button{
							display: flex;
							align-content: center;
							justify-content: center;
							width: 212rpx;
							height: 58rpx;
							border-radius: 58rpx;
							font-size: 28rpx;
							background-color: $uni-bg-color ;
						}
					}
				}
			}
		}

	}
</style>
<style lang="scss">

</style>
