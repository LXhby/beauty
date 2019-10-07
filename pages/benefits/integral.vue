<template>
	<view class="integral-page">
		<commom-top :lightIndex="lightIndex"></commom-top>
		<view class="main">
			<view class="top uni-flex uni-row">
				<view>
					<text>我的积分：</text>
					<text class="dark-color">{{userInfo.coin_count}}金币</text>
				</view>
				<view>
					<text>已用积分：</text>
					<text class="dark-color">380金币</text>
				</view>

			</view>
			<view class="item uni-flex uni-row">
				<view class="left uni-flex uni-row">
					<image src="../../static/ad3.jpg" mode="aspectFill"></image>
					<view class="detail">
						<text class="title">美白黄金美白黄金美白黄金美白黄金</text>
						<view class="bottom uni-flex uni-row">
							<text>已兑换234个</text>
							<text>剩余31个</text>
						</view>
					</view>
				</view>

				<view class="right">
					<view class="money">
						<text class="num">20600</text>
						<text>金币</text>
					</view>
					<view class="btn">
						+兑换
					</view>
				</view>
			</view>
		</view>
		<view class="bottom-line">-- 我是有底线的卡瑞塔 --</view>
	</view>
</template>

<script>
	import {
		mapGetters
	} from "vuex";
	import commomTop from "./index.vue";
	export default {
		components: {
			commomTop,
		},
		computed: {
			...mapGetters(['userInfo'])
		},
		data() {
			return {
				lightIndex: 2
			}
		},
		onLoad() {
			console.log(this.userInfo)
		}
	}
</script>

<style lang="scss" scoped>
	@import "../../common/common.scss";

	.integral-page {
		.main {
			.top {
				height: 80rpx;
				padding: 0 20rpx;
				justify-content: space-between;
				align-items: center;
				border-bottom: 1px solid $uni-border-color;

				text {
					color: $uni-text-color;
					font-size: 28rpx;
				}

				.dark-color {
					color: $uni-bg-color;
				}
			}

			.item {
				padding: 20rpx;
				justify-content: space-between;
				align-items: center;
				border-bottom: 20rpx solid $uni-border-color;

				.left {
					color: $uni-text-color;
					align-items: center;

					image {
						width: 200rpx;
						height: 150rpx;
						margin-right: 20rpx;
					}

					.detail {
						min-height: 150rpx;
						display: flex;
						flex-direction: column;
						justify-content: space-around;
						width: 240rpx;

						.title {
							font-size: 28rpx;
						}

						.bottom {
							justify-content: space-between;

							// margin-top:20rpx;
							text {
								font-size: 20rpx;
								color: $uni-text-color-grey;
							}
						}
					}
				}

				.right {

					color: $uni-text-color;

					.money {
						font-size: 24rpx;

						.num {
							font-size: 32rpx;
						}
					}

					.btn {
						width: 140rpx;
						height: 45rpx;
						margin-top: 20rpx;
						border-radius: 45rpx;
						background: $uni-bg-color;
						text-align: center;
						color: #fff;
						line-height: 45rpx;
						font-size: 24rpx;
					}
				}
			}
		}

	}
</style>
