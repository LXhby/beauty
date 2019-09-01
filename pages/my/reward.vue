<template>
	<view class="reward-page">
		<top-bar rightText="实名认证" :detailist="detailist" :isreal="false"></top-bar>
		<view class="main">
			<view class="main-title">
				<view class="line"></view>
				<text class="text">服务条款</text>
			</view>
			<view class="main-content">
				<view class="total-top uni-flex uni-row" style="justify-content: space-between;">
					<text>总收益：￥2340.00元</text>
					<text>本月：￥2340.00元</text>
				</view>
				<view class="item">
					<view class="money uni-flex uni-row" style="justify-content: space-between;align-items: center;">
						<text class="bold">VIP会员奖金：￥1000.00元</text>
						<text class="status">状态：待提现</text>
					</view>
					<view class="from uni-flex uni-row" style="justify-content: space-between;">
						<text class="first">奖金来源：王晓文加入VIP会员</text>
						<text class="time">2019.4.24 18:23</text>
					</view>
				</view>
			</view>
		</view>
		<view class="bottom-line">
			-- 我是有底线的卡瑞塔 --
		</view>
	</view>
</template>


<script>
	import topBar from "@/components/account/index1.vue";
	export default {
		components: {
			topBar,
		},
		data(){
			return{
				detailist:["可提现","待提现","产品余额","粉丝量"]
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "../../style/topaccount.scss";
		@import "../../common/common.scss";
	@font-face {
	  font-family: 'iconfont';  /* project id 1377410 */
	  src: url('https://at.alicdn.com/t/font_1377410_wk4mbv1sumf.eot');
	  src: url('https://at.alicdn.com/t/font_1377410_wk4mbv1sumf.ttf') format('truetype');
	}
	.iconfont {
		font-family: iconfont !important;
		font-size: 32upx;
		font-style: normal;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale
	}
	.reward-page{
		.main{
			.main-content{
				padding:0 36rpx;
				color: $uni-text-color;
				.total-top{
					padding: 20rpx 12rpx;
					border-bottom: 1px solid $uni-border-color;
					font-size: 28rpx;
					color: #304455;
				}
				.item{
					padding: 20rpx 12rpx;
					border-bottom: 1px solid $uni-border-color;
					.money{
						.bold{
							color: $uni-bg-color;
						}
						.status{
							font-size: 24rpx;
						}
					}
					.from{
						margin-top:8rpx;
						font-size: 24rpx;
						.first{
							flex: 1;
						}
						.time{
							color: $uni-text-color-grey;
						}
					}
				}
			}
		}
	}
</style>
