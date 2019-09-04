<template>
	<view class="address-page">
		<top-bar rightText="实名认证" :detailist="detailist" :isreal="false"></top-bar>
		<view class="main">
			<view class="main-title">
				<view class="left uni-flex uni-row">
					<view class="line"></view>
					<text class="text">收货地址</text>
				</view>
				<!-- <view class="right">
					<view class="mini-btn btn" type="primary">获取微信</view>
					<navigator url="/pages/my/newaddress">
						<view class="btn" type="primary">新增地址</view>
					</navigator>
				</view> -->

			</view>
			<view class="main-content">
				<form @submit="formSubmit" class="form-content">
					<view class="uni-form-item uni-column">
						<input class="uni-input" focus placeholder="请输入收件人姓名" />
					</view>
					<view class="uni-form-item uni-column">
						<input class="uni-input" type="number" placeholder="请输入收件人手机号" />
					</view>
					<view class="uni-form-item uni-column">
						<view @click="showMulLinkageThreePicker" class="select-box">请输入所在地区</view>
					</view>
					<view class="uni-form-item uni-column">
						<input class="uni-input" placeholder="请输入详情地址" />
					</view>
					<view class="uni-form-item uni-column">
						<label>
							<checkbox value="checkbox1" color="#ff0080" />设置默认收货地址
						</label>
					</view>
					<view class="uni-btn-v">
						<button formType="submit">提交</button>
					</view>
				</form>
			</view>
		</view>
		<mpvue-city-picker :themeColor="themeColor" ref="mpvueCityPicker" :pickerValueDefault="cityPickerValueDefault"
		 @onConfirm="onConfirm"></mpvue-city-picker>
		<view class="bottom-line">
			-- 我是有底线的卡瑞塔 --
		</view>
	</view>
</template>


<script>
	import topBar from "@/components/account/index1.vue";
	import mpvueCityPicker from "../../components/mpvue-citypicker/mpvueCityPicker.vue";
	import cityData from "../../common/city.data.js";
	export default {
		components: {
			topBar,
			mpvueCityPicker
		},
		data() {
			return {
				mulLinkageTwoPicker: cityData,
				themeColor: '#ff0080',
				pickerText: '',
				cityPickerValueDefault: [0, 0, 1],
				detailist: ["可提现", "待提现", "产品余额", "粉丝量"]
			}
		},
		methods: {
			formSubmit() {},
			// 三级联动选择
			showMulLinkageThreePicker() {
				this.$refs.mpvueCityPicker.show()
			},
			onConfirm(e) {
				this.pickerText = JSON.stringify(e)
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
				.form-content {
					.uni-form-item {
						padding: 5px 20rpx;
						box-sizing: border-box;

						.select-box {
							color: grey;
							height: 25px;
							padding: 7px 12px;
							line-height: 25px;
							font-size: 14px;
							border-bottom: 1px solid $uni-border-color;
						}
						label{
							color: grey;
						}
						checkbox{
							margin-top:7px;
							    margin-left: 12px;
						}
					}

					.uni-input {
						border-bottom: 1px solid $uni-border-color;
					}
					.uni-btn-v{
						margin: 0 20rpx;
						button{
							background-color: $uni-bg-color;
							color: #fff;
						}
					}
				}

			}
		}
	}
</style>
