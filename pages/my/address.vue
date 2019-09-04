<template>
	<view class="address-page">
		<top-bar rightText="实名认证" :detailist="detailist" :isreal="false"></top-bar>
		<view class="main">
			<view class="main-title">
				<view class="left uni-flex uni-row">
					<view class="line"></view>
					<text class="text">收货地址</text>
				</view>
				<view class="right">
					<view class="mini-btn btn" type="primary">获取微信</view>
					<navigator url="/pages/my/newaddress">
						<view class="btn" type="primary">新增地址</view>
					</navigator>
				</view>

			</view>
			<view class="main-content">
				<view class="item-box">
					<view class="item">
						<view class="user">
							<text class="name">王晓文</text>
							<text>18676766667</text>
						</view>
						<text class="address">北京市平昌区回龙观镇东村家园物业写字楼205室</text>
					</view>
					<view class="edit uni-flex uni-row">
						<label class="radio">
							<radio value="r1" checked="true" color="#ff0080" style="transform:scale(0.7)" />设置默认</label>
						<view class="uni-flex uni-row handle-box">
							<view class="">
								<text class="iconfont">&#xe73e;</text>
								<text>修改</text>
							</view>
							<view class="delete">
								<text class="iconfont">&#xe614;</text>
								<text>删除</text>
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
		data() {
			return {
				detailist: ["可提现", "待提现", "产品余额", "粉丝量"]
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "../../style/topaccount.scss";
	@import "../../common/common.scss";

	@font-face {
		font-family: 'iconfont';
		/* project id 1377410 */
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

	.address-page {
		.main {
			.main-title {
				justify-content: space-between;
				align-items: center;

				.right {
					flex: 1;
					display: flex;
					align-items: center;
					justify-content: flex-end;
					padding-right: 47rpx;

					.btn {
						padding: 0px;
						margin: 0px;
						width: 100rpx;
						height: 37rpx;
						line-height: 37rpx;
						background-color: $uni-bg-color;
						font-size: 20rpx;
						text-align: center;
						color: #fff;
						border-radius: 4rpx;
						border: 1px solid $uni-bg-color;
					}

					.mini-btn {
						margin-right: 20rpx;
					}
				}
			}

			.main-content {
				.item-box {
					padding: 0 38rpx;
					margin-bottom: 20rpx;
					background-color: #f1f1f1;

					.item {
						padding: 4rpx 12rpx;
						line-height: 50rpx;
						border-bottom: 1px solid #e6e6e6;
						color: $uni-text-color;

						.user {
							.name {
								margin-right: 20rpx;
							}
						}

					}

					.edit {
						height: 58rpx;
						align-items: center;
						justify-content: space-between;
						color: $uni-text-color;

						.handle-box {
							padding-right: 9rpx;

							.delete {
								margin-left: 24rpx;
							}
						}

						.iconfont {
							font-size: 24rpx;
						}
					}
				}

			}
		}
	}
</style>
