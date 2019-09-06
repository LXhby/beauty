<template>
	<view class="collect-page">
		<top-bar rightText="实名认证" :detailist="detailist" :isreal="false"></top-bar>
		<view class="main">
			<view class="main-title">
				<view class="line"></view>
				<text class="text">我的收藏</text>
			</view>
			<view class="main-content">
				<view class="item uni-flex uni-row">
					<view class="left uni-flex uni-row">
						<image src="../../static/ad3.jpg" mode="aspectFill"></image>
						<view class="detail">
							<text class="title">美白黄金美白黄金美白黄金美白黄金</text>
							<view class="bottom uni-flex uni-row">
								<text>销量234笔</text>
								<text>好评96%</text>
							</view>
						</view>
					</view>
					
					<view class="right">
						<view class="money">
							<text class="num">￥506.00</text>
						</view>
						<view class="btn">
							+购物车
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="bottom-line">-- 我是有底线的卡瑞塔 --</view>
	</view>
</template>


<script>
	import topBar from "@/components/account/index1.vue";
	export default {
		components: {
			topBar
		},
		data() {
			return {
				detailist: ["可提现", "待提现", "产品额度", "粉丝量"]
			};
		}
	};
</script>

<style lang="scss" scoped>
	@import "../../style/topaccount.scss";
	@import "../../common/common.scss";

	.collect-page {
		.main {
			.main-content {
				.item{
					padding: 20rpx;
					justify-content: space-between;
					align-items: center;
					border-bottom:20rpx solid $uni-border-color;
					.left{
						color:$uni-text-color;
						align-items:center;
						image{
							width: 200rpx;
							height: 150rpx;
							margin-right:20rpx;
						}
						.detail{
							min-height:150rpx;
							display: flex;
							flex-direction: column;
							justify-content: space-around;
							width:240rpx;
							.title{
								font-size: 28rpx;
							}
							.bottom{
								justify-content: space-between;
								// margin-top:20rpx;
								text{
									font-size: 20rpx;
									color: $uni-text-color-grey;
								}
							}
						}
					}
					.right{
						
						color:$uni-text-color;
						.money{
							font-size: 24rpx;
							.num{
								font-size: 32rpx;
							}
						}
						.btn{
							width: 140rpx;
							height: 45rpx;
							margin-top:20rpx;
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
	}
</style>
