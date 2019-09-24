<template>
	<view class="reward-page">
		<top-bar rightText="实名认证" :detailist="detailist" :isreal="false"></top-bar>
		<view class="main">
			<view class="main-title">
				<view class="line"></view>
				<text class="text">上课记录</text>
			</view>
			<view class="main-content">
				<view class="list">
					<view class="item uni-flex uni-row" @click="gopage">
						<view class="left uni-flex uni-column">
							<view class="title">第一期某某课程某某课程某某课程</view>
							<view class="bottom-box uni-flex uni-row">
								<view class="time">
									<text class="iconfont">&#xe6dd;</text>
									<text>2019.09.12-2019.09.15</text>
								</view>
								<view class="address">
									<text class="iconfont">&#xe853;</text>
									<text>北京 九华山庄</text>
								</view>
							</view>
						</view>
						<view class="right dark">
							<view class="num">
								<text>9</text>天
							</view>
							<text>倒计时</text>
						</view>
					</view>
					<view class="item uni-flex uni-row">
						<view class="left uni-flex uni-column">
							<view class="title">第一期某某课程某某课程某某课程</view>
							<view class="bottom-box uni-flex uni-row">
								<view class="time">
									<text class="iconfont">&#xe6dd;</text>
									<text>2019.09.12-2019.09.15</text>
								</view>
								<view class="address">
									<text class="iconfont">&#xe853;</text>
									<text>北京 九华山庄</text>
								</view>
							</view>
						</view>
						<view class="right dark">
							<text>已签到</text>
						</view>
					</view>
					<view class="item uni-flex uni-row">
						<view class="left uni-flex uni-column">
							<view class="title">第一期某某课程某某课程某某课程</view>
							<view class="bottom-box uni-flex uni-row">
								<view class="time">
									<text class="iconfont">&#xe6dd;</text>
									<text>2019.09.12-2019.09.15</text>
								</view>
								<view class="address">
									<text class="iconfont">&#xe853;</text>
									<text>北京 九华山庄</text>
								</view>
							</view>
						</view>
						<view class="right gray">
							<text>未签到</text>
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
		},
		methods:{
			gopage(){
				uni.navigateTo({
					url:'/pages/benefits/courseinfo'
				})
			}
		}
	};
</script>

<style lang="scss" scoped>
	@import "../../style/topaccount.scss";
	@import "../../common/common.scss";
	.reward-page {
		.main {
			.main-content {
				.total-top {
					padding: 20rpx 12rpx;
					border-bottom: 1px solid $uni-border-color;
					font-size: 28rpx;
					color: #304455;
				}

				.list {
					padding: 0 30rpx;

					.item {
						align-items: center;
						justify-content: space-between;
						margin-top: 30rpx;
						padding: 30rpx;
						background-color: $uni-bg-color-hovers;
						border-radius: 5px;

						.left {
							width: 500rpx;
							height: 100rpx;
							justify-content: space-between;

							.title {
								width: 100%;
								overflow: hidden;
								white-space: nowrap;
								text-overflow: ellipsis;
								font-size: 32rpx;
								color: #000000;
								font-weight: 600;
							}

							.bottom-box {
								color: $uni-text-color;
								justify-content: space-between;
								align-items: center;

								.time {
									font-size: 24rpx;
								}

								.address {
									font-size: 24rpx;
								}

								.iconfont {
									color: $uni-text-color;
								}
							}
						}

						.right {
							display: flex;
							justify-content: center;
							flex-wrap: wrap;
							align-items: center;
							width: 90rpx;
							height: 90rpx;
							color: #fff;
							border-radius: 5px;

							text {
								font-size: 24rpx;
								line-height: 24rpx;
							}

							.num {
								font-size: 24rpx;
								line-height: 24rpx;

								text {
									font-size: 28rpx;
								}
							}
						}

						.dark {
							background-color: $uni-bg-color-grey;
						}

						.gray {
							background-color: $uni-textbg-color-grey;
						}
					}
				}
			}
		}
	}
</style>
