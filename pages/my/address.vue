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
					<button class="mini-btn" type="primary" size="mini">获取微信</button>
					<button class="mini-btn" type="primary" size="mini">新增地址</button>
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
					<view class="edit">
						<label class="radio"><radio value="r1" checked="true" />设置默认</label>
					</view>
				</view>
				<view class="item-box">
					<view class="item">
						<view class="user">
							<text class="name">王晓文</text>
							<text>18676766667</text>
						</view>
						<text class="address">北京市平昌区回龙观镇东村家园物业写字楼205室</text>
					</view>
					<view class="edit">
						<label class="radio"><radio value="r1" checked="true" />设置默认</label>
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
				align-items: center;
			}

			.main-content {
				.item-box {
					padding: 0 38rpx;
					margin-bottom: 20rpx;
					background-color:#f4f4f4;
					.item {
						padding:0 12rpx;
						border-bottom: 1px solid $uni-border-color;
						color: $uni-text-color;
						.user{
							.name{
								margin-right: 20rpx;
							}
						}
					}
				}

			}
		}
	}
</style>
