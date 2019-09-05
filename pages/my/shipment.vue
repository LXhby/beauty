<template>
	<view class="reward-page">
		<top-bar rightText="实名认证" :detailist="detailist" :isreal="false"></top-bar>
		<view class="main">
			<view class="main-title">
				<view class="line"></view>
				<text class="text">出货记录</text>
			</view>
			<view class="main-content">
				<view class="total-top uni-flex uni-row" style="justify-content: space-between;">
					<text>本月流水：￥2340.00元</text>
					<text>本年：￥2340.00元</text>
				</view>
				<view class="list">
					<view class="item uni-flex uni-row">
						<image src="../../static/ad3.jpg" mode="aspectFill"></image>
						<view class="box">
							<view class="goods-detail uni-flex uni-row">
								<view class="goods-name">
									美白黄金美白黄金美白黄金
								</view>
								<text class="width">2019.4.24 18：23</text>
							</view>
							<view class="bottom-detail  uni-flex uni-row">
								<view class="">
									<text class="iconfont">&#xe679;</text>
									<text class="num">318.00元</text>
								</view>
								<view class="name">
									购买人：王晓文
								</view>
							</view>
						</view>	
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
				detailist:["可提现","待提现","产品额度","粉丝量"]
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
				.list{
					.item{
						padding: 20rpx 12rpx;
						border-bottom: 1px solid $uni-border-color;
						align-items:center;
						image{
							width: 85rpx;
							height: 64rpx;
						}
						.box{
							flex: 1;
							margin-left:14rpx ;
							.width{
								width: 200rpx;
								text-align: right;
							}
							.goods-name{
								width: 340rpx;
								white-space: nowrap;
								overflow: hidden;
								text-overflow: ellipsis;
							}
						}
						.goods-detail{
							justify-content: space-between;
							align-items: flex-end;
							color: #304455;
							font-size: 28rpx;
							text{
								font-size: 24rpx;
								color:$uni-text-color-grey;
							}
						}
						.bottom-detail{
							justify-content: space-between;
							align-items: flex-end;
							font-size: 24rpx;
							text-align:right;
							.iconfont{
								color: #ffce2c;
							}
							.num{
								color: $uni-bg-color;
							}
							.name{
								font-size: 24rpx;
								color:$uni-text-color-grey;
							}
						}
					}
				}
			}
		}
	}
</style>
