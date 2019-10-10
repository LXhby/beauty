<template>
	<view class="withdrawal-page">
		<top-bar rightText="实名认证" :detailist="detailist" :isreal="false"></top-bar>
		<view class="main">
			<view class="main-title">
				<view class="line"></view>
				<text class="text">提现申请</text>
			</view>
			<view class="main-content">
				<input class="uni-input" type="number" placeholder="自动获取可提现的总额度金额" />
				<label class="radio">
					<radio value="r2" style="transform:scale(0.7)" />银行卡</label>
				<button type="primary">提现申请</button>
				<view class="instructions">
					<text>*提现周期为每周四，每天最高提现额度为微信支付限额；</text><br>
					<text>*提现申请后财务会在1个工作日内审核，到账时间24小时内；</text><br>
					<text>*提现需要扣除微信提现手续费和个人所得税；</text><br>
					<text>*如您在提现过程中遇到问题可致电010-888888</text>
				</view>
				<view class="bottom-line">-- 我是有底线的卡瑞塔 --</view>
			</view>
		</view>
		<uni-popup ref="popup" type="center" :custom="true">
			<view class="alert-box">
				<view class="title">
					提现确认
				</view>
				<view class="get-box uni-flex uni-row">
					<view class="item">
						<view class="item-text">
							提现金额
						</view>
						<text class="item-money">￥9000.00</text>
					</view>
					<view class="item">
						<view class="item-text">
							提现手续费
						</view>
						<text class="item-money">￥180.00</text>
					</view>
				</view>
				<view class="get-total uni-flex uni-row">
					<view class="item-text">
						到账金额
					</view>
					<view class="item-money">
						￥8640.00
					</view>
				</view>

				<view class="btn">
					提现确认
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import topBar from "@/components/account/index1.vue";
	import uniPopup from '@/components/uni-popup/uni-popup.vue';
	import {
		mapGetters
	} from "vuex";
	export default {
		components: {
			topBar,
			uniPopup
		},
		computed: {
			...mapGetters(["userInfo"])
		},
		data() {
			return {
				detailist: ["可提现", "待提现", "产品额度", "粉丝量"],
				myBank:[],
				money:''
			}
		},
		mounted() {
			// this.$refs.popup.open()
		},
		onLoad() {
				this.money = this.userInfo.balance;
		},
		methods: {
			getAccounts() {
				//查看是否本人有银行卡
				this.$http.request({
					url: 'accounts',
					method: 'get',
					params: {
						'AccountSearch[user_id]': this.userInfo.id
					}
				}).then(res=>{
					const data = res.data.items;
					if (data.length) {
						this.myBank = data;
					} else {
						this.myBank = [];
					}
				})
			},
		}
	}
</script>

<style lang="scss">
	@import "../../common/common.scss";

	.withdrawal-page {
		.main-content {
			padding: 0 44rpx;

			input {
				margin-bottom: 24rpx;
				padding-left: 0px;
				border-bottom: 1px solid $uni-border-color;
			}

			label {
				color: $uni-text-color;
			}

			button {
				width: 520rpx;
				height: 76rpx;
				margin-top: 60rpx;
				margin-bottom: 50rpx;
				line-height: 76rpx;
				border-radius: 76rpx;
				background: $uni-bg-color;
			}

			.instructions {
				color: $uni-text-color;
				font-size: 24rpx;
				line-height: 40rpx;
			}
		}

		.alert-box {
			position: relative;
			width: 480rpx;
			padding-bottom: 36rpx;
			border-radius: 5px;
			background-color: #fff;

			.title {
				height: 78rpx;
				line-height: 78rpx;
				border-bottom: 1px solid $uni-border-color;
				color: $uni-bg-color;
				font-size: 36rpx;
				font-weight: 600;
			}

			.item-text {
				color: $uni-text-color;
			}

			.item-money {
				color: $uni-bg-color;
			}

			.get-box {
				justify-content: space-between;
				border-bottom: 1px solid $uni-border-color;
				padding: 26rpx 40rpx;
			}

			.get-total {
				justify-content: space-between;
				padding: 26rpx 40rpx;
			}

			.btn {
				width: 300rpx;
				height: 45rpx;
				margin: 0 auto;
				border-radius: 45rpx;
				color: #fff;
				background: $uni-bg-color;
			}
		}
	}
</style>
