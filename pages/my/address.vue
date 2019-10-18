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
				<view class="item-box" v-for="(item, i) in addressList">
					<radio-group @change="radioChange">
						<view class="item">
							<view class="user">
								<text class="name">{{item.receiver}}</text>
								<text>{{item.mobile}}</text>
							</view>
							<text class="address">{{item.address}}</text>
						</view>
						<view class="edit uni-flex uni-row">
							<label class="radio">
								<radio :value="item.id.toString()" :checked="i === currentIndex" color="#ff0080" style="transform:scale(0.7)" />设置默认
							</label>
							<view class="uni-flex uni-row handle-box">
								<view class @click="updateAddress(item.id)">
									<text class="iconfont">&#xe73e;</text>
									<text>修改</text>
								</view>
								<view class="delete" @click="deleteAddress(item.id)">
									<text class="iconfont">&#xe614;</text>
									<text>删除</text>
								</view>
							</view>
						</view>
					</radio-group>
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
	import topBar from "@/components/account/index1.vue";
	export default {
		components: {
			topBar
		},
		inject:["reload"],
		computed: {
			...mapGetters(["userInfo"])
		},
		data() {
			return {
				detailist: ["可提现", "待提现", "产品额度", "粉丝量"],
				addressList: [],
				current: {},
				currentIndex:0
			};
		},
		onLoad() {
			this.findAllAddr()
		},
		methods: {
			findAllAddr() {

				this.$http.request({
					url: 'address',
					method: 'get',
					params: {
						'AddressSearch[user_id]': this.userInfo.id,
						'sort': '-is_default'
					}
				}).then(res => {
					this.addressList = res.data.items;
					
					for (let i = 0; i < this.addressList.length; i++) {
						if (this.addressList[i].is_default === 1) {
							this.current = this.addressList[i];
							this.currentIndex= i;
							break;
						}
					}

				}).catch(console.log)
			},
			radioChange(evt) {
				this.$http.request({
					url: 'addresses/' + this.current.id,
					method: 'put',
					data: {
						'is_default': 0
					}
				}).then(res => {
					if (res.statusCode === 200) {
						this.$http.request({
							url: 'addresses/' + evt.detail.value * 1,
							method: 'put',
							data: {
								'is_default': 1
							}
						}).then(res => {
							if (res.statusCode === 200) {
								uni.redirectTo({
									url:'/pages/my/address'
								})
								setTimeout(()=>{
									uni.showToast({
										icon: 'none',
										title: '默认地址修改成功'
									})
								},1000)
							}
						}).catch(console.log)
					}
				}).catch(console.log)


			},
			// 修改地址
			updateAddress(id) {
				uni.navigateTo({
					url: '/pages/my/newaddress?addrId=' + id
				})
			},
			// 删除地址
			deleteAddress(id) {
				this.$http.request({
					url: 'addresses/' + id,
					method: 'delete'
				}).then(res => {
					if (res.statusCode === 204) {
						uni.showToast({
							icon: 'none',
							title: '删除成功'
						})
						this.reload()
					}
				}).catch(console.log)
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
							margin-right: 10rpx;
						}
					}
				}
			}
		}
	}
</style>
