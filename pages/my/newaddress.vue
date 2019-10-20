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
        </view>-->
			</view>
			<view class="main-content">
				<form @submit="formSubmit" class="form-content">
					<view class="uni-form-item uni-column">
						<input name="receiver" :value="updateAddr.receiver" class="uni-input" focus placeholder="请输入收件人姓名" />
					</view>
					<view class="uni-form-item uni-column">
						<input name="mobile" :value="updateAddr.mobile" class="uni-input" type="number" placeholder="请输入收件人手机号" />
					</view>
					<view class="uni-form-item uni-column">
						<input name="city" :value="pickerText" @focus="showMulLinkageTwoPicker" placeholder="请输入所在地区" class="select-box"></input>
					</view>
					<view class="uni-form-item uni-column">
						<input name="address" :value="updateAddr.address" class="uni-input" placeholder="请输入详情地址" />
					</view>
					<view class="uni-form-item uni-column">
						<checkbox-group name="checkbox">
							<label>
								<checkbox value="checkbox" :checked="updateAddr.is_default" color="#ff0080" />设置默认收货地址
							</label>
						</checkbox-group>
					</view>
					<view class="uni-btn-v">
						<button formType="submit">提交</button>
					</view>
				</form>
			</view>
		</view>
		<mpvue-picker :themeColor="themeColor" ref="mpvuePicker" :mode="mode" :deepLength="deepLength" :pickerValueDefault="pickerValueDefault"
		 @onConfirm="onConfirm" :pickerValueArray="pickerValueArray"></mpvue-picker>
		<view class="bottom-line">-- 我是有底线的卜瑞塔 --</view>
	</view>
</template>


<script>
	import {
		mapGetters
	} from "vuex";
	import topBar from "@/components/account/index1.vue";
	import mpvuePicker from '@/components/mpvue-picker/mpvuePicker.vue';
	import mpvueCityPicker from "../../components/mpvue-citypicker/mpvueCityPicker.vue";
	import cityData from "../../common/city.data.js";
	export default {
		components: {
			topBar,
			mpvuePicker,
			mpvueCityPicker
		},
		computed: {
			...mapGetters(["userInfo"])
		},
		data() {
			return {
				mulLinkageTwoPicker: cityData,
				themeColor: "#ff0080",
				pickerText: "",
				cityPickerValueDefault: [0, 0, 1],
				pickerValueDefault: [0],
				pickerValueArray: [],
				mode: '',
				deepLength: 1,
				detailist: ["可提现", "待提现", "产品额度", "粉丝量"],
				city: '',
				addressId: 0,
				updateAddr: ''
			};
		},
		onLoad(option) {
			console.log(this.userInfo)
			if (JSON.stringify(option) != "{}") {
				this.$http.request({
					url: 'addresses/' + option.addrId,
					method: 'get'
				}).then(res => {
					this.updateAddr = res.data
					this.pickerText = this.updateAddr.province + '-' + this.updateAddr.city
					this.updateAddr.is_default = this.updateAddr.is_default === 0 ? false : true
					console.log(this.updateAddr)
				}).catch(console.log)
			}
		},
		methods: {
			formSubmit(e) {
				console.log(e.detail.value)
				let loginRules = [{
						name: 'receiver',
						type: 'required',
						errmsg: '收件人姓名不能为空'
					},
					{
						name: 'mobile',
						required: true,
						type: 'phone',
						errmsg: '请输入正确的手机号'
					},
					{
						name: 'city',
						type: 'required',
						errmsg: '省份和城市不能为空'
					},
					{
						name: 'address',
						type: 'required',
						errmsg: '地址不能为空'
					},
				]
				let valLoginRes = this.$validate.validate(e.detail.value, loginRules)
				if (!valLoginRes.isOk) {
					uni.showToast({
						icon: 'none',
						title: valLoginRes.errmsg
					})
					return false
				} else {
					if (this.updateAddr != '') {
						if (e.detail.value.checkbox.length != 0) {
							this.$http.request({
								url: 'address',
								method: 'get',
								params: {
									'addressSearch[user_id]': this.userInfo.id
								}
							}).then(res => {
								res.data.items.forEach(ele => {
									if (ele.is_default === 1 && ele.id != this.addressId) {
										this.$http.request({
											url: 'addresses/' + ele.id,
											method: 'put',
											data: {
												'is_default': 0
											}
										}).then(res => {
											console.log(res)
										}).catch(console.log)
									}
								})
							}).catch(console.log)
						}
						this.$http.request({
							url: 'addresses/' + this.updateAddr.id,
							method: 'put',
							data: {
								'user_id': this.userInfo.id,
								'mobile': e.detail.value.mobile,
								'province': e.detail.value.city.split('-')[0],
								'city': e.detail.value.city.split('-')[1],
								'receiver': e.detail.value.receiver,
								'address': e.detail.value.address,
								'is_default': e.detail.value.checkbox.length
							}
						}).then(res => {
							console.log(res)
							this.addressId = res.data.id
							if (res.statusCode === 200) {
								uni.showToast({
									icon: 'none',
									title: '修改成功'
								})
								uni.navigateBack()
							}
						}).catch(console.log)
					} else {
						if (e.detail.value.checkbox.length != 0) {
							this.$http.request({
								url: 'address',
								method: 'get',
								params: {
									'addressSearch[user_id]': this.userInfo.id
								}
							}).then(res => {
								res.data.items.forEach(ele => {
									if (ele.is_default === 1 && ele.id != this.addressId) {
										this.$http.request({
											url: 'addresses/' + ele.id,
											method: 'put',
											data: {
												'is_default': 0
											}
										}).then(res => {
											console.log(res)
										}).catch(console.log)
									}
								})
							}).catch(console.log)
						}
						this.$http.request({
							url: 'addresses',
							method: 'post',
							data: {
								'user_id': this.userInfo.id,
								'mobile': e.detail.value.mobile,
								'province': e.detail.value.city.split('-')[0],
								'city': e.detail.value.city.split('-')[1],
								'receiver': e.detail.value.receiver,
								'address': e.detail.value.address,
								'is_default': e.detail.value.checkbox.length
							}
						}).then(res => {
							console.log(res)
							this.addressId = res.data.id
							if (res.statusCode === 201) {
								uni.showToast({
									icon: 'none',
									title: '新增成功'
								})
								uni.navigateBack()
							}
						}).catch(console.log)
					}
				}
			},
			// 二级联动选择
			showMulLinkageTwoPicker() {
				this.pickerValueArray = this.mulLinkageTwoPicker
				this.mode = 'multiLinkageSelector'
				this.deepLength = 2
				this.pickerValueDefault = [0, 0]
				this.$refs.mpvuePicker.show()
			},
			onConfirm(e) {
				this.pickerText = e.label
			}
		}
	};
</script>

<style lang="scss" scoped>
	@import "../../style/topaccount.scss";
	@import "../../common/common.scss";

	@font-face {
		font-family: "iconfont";
		/* project id 1377410 */
		src: url("https://at.alicdn.com/t/font_1377410_wk4mbv1sumf.eot");
		src: url("https://at.alicdn.com/t/font_1377410_wk4mbv1sumf.ttf") format("truetype");
	}

	.iconfont {
		font-family: iconfont !important;
		font-size: 32upx;
		font-style: normal;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
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

						label {
							color: grey;
						}

						checkbox {
							margin-top: 7px;
							margin-left: 12px;
						}
					}

					.uni-input {
						border-bottom: 1px solid $uni-border-color;
					}

					.uni-btn-v {
						margin: 0 20rpx;

						button {
							background-color: $uni-bg-color;
							color: #fff;
						}
					}
				}
			}
		}
	}
</style>
