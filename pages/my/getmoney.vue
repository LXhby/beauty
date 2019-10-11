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
				<radio-group @change="radioChange">
					<label class="radio">
						<radio value="银行卡" style="transform:scale(0.7)" :checked="radioGroup" color="#ff0080" />银行卡
					</label>
				</radio-group>
				<button type="primary">提现申请</button>
				<view class="instructions">
					<text>*提现周期为{{config.min_settle_interval}}天，每天最高提现额度为￥{{config.min_settle_amount}}；</text><br>
					<text>*提现申请后财务会在1个工作日内审核，到账时间24小时内；</text><br>
					<text>*提现需要扣除微信提现手续费和个人所得税；</text><br>
					<text>*如您在提现过程中遇到问题可致电{{config.service_phone}}</text>
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
		<w-picker v-if="myBank.length!=0" mode="selector" @confirm="onConfirm" ref="selector" themeColor="#f00" :selectList="myBank">
		</w-picker>
		<uni-popup ref="popupbank" type="center" :custom="true">
			<view class="real-form">
				<view class="titles">
					添加提现银行卡
				</view>
				<form @submit="formSubmit">
					<view class="form-box">
						<view class="uni-form-item uni-flex uni-row padding-botom">
							<view class="title">持卡人</view>
							<input class="uni-input" placeholder="请输入真实姓名" name="realname" />
						</view>
						<view class="uni-form-item uni-flex uni-row padding-botom">
							<view class="title">卡号</view>
							<input class="uni-input" placeholder="请输入卡号" name="idsn" />
						</view>
						<view class="uni-form-item uni-flex uni-row padding-botom">
							<view class="uni-list-cell-left">
								开户银行
							</view>
							<view class="uni-list-cell-db">
								<xfl-select :list="banks" :clearable="false" :showItemNum="5" :listShow="true" :isCanInput="true"
								 :style_Container="'height: 50px; font-size: 16px;'" :placeholder="'placeholder'" :initValue="banks[index]"
								 :selectHideType="'hideAll'">
								</xfl-select>
							</view>
						</view>
					</view>
					<view class="list-text">
						<view class="text">
							*请务必完成个人信息实名认证，便于线下活动签到和交流；
						</view>
						<view class="text">
							*用户信息和隐私我们承诺绝不向外泄密。
						</view>
					</view>
					<view class="uni-btn">
						<button form-type="submit">确认设置</button>
					</view>
				</form>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import topBar from "@/components/account/index1.vue";
	import uniPopup from '@/components/uni-popup/uni-popup.vue';
	import moment from "moment";
	import wPicker from "@/components/w-picker/w-picker.vue";
	import xflSelect from '@/components/xfl-select/xfl-select.vue'; //导入
	import {
		mapGetters
	} from "vuex";
	export default {
		components: {
			topBar,
			uniPopup,
			wPicker,
			xflSelect
		},
		computed: {
			...mapGetters(["userInfo", "config"])
		},
		data() {
			return {
				detailist: ["可提现", "待提现", "产品额度", "粉丝量"],
				myBank: [],
				money: '',
				banks: [], //能选择的银行卡
				formdata: {
					name: "",
					number: "",
					bank: ""
				},
				index: 0,
				radioGroup: false
			}
		},
		mounted() {

		},
		onLoad() {
			this.money = this.userInfo.balance;
			this.banks = [];
			this.$http.request({
				url: 'config/params?key=bank_icons',
				method: 'get'
			}).then(res => {
				for (let i in res.data) {
					this.banks.push(i);
				}
			})
			//获取设置
			this.nextTime = moment()
				.add(this.config.min_settle_interval, "days")
				.format("YYYY.MM.DD");
			this.getAccounts();
			this.formdata.name = this.userInfo.realname;
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
				}).then(res => {
					const data = res.data.items;
					if (data.length) {
						this.myBank = data;
					} else {
						this.myBank = [];
					}
				})
			},
			bindPickerChange(e) {
				this.index = e.target.value
			},
			radioChange(val) {
				console.log(val)
				this.radioGroup = val.detail.value == '银行卡' ? true : false;
				if (this.radioGroup) {
					if (this.myBank.length) {
						this.$refs.selector.show()
					} else {
						this.$refs.popupbank.open()
					}
				}
			}
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

	.real-form {
		width: 552rpx;
		background: #fff;
		font-size: 28rpx;
		border-radius: 5px;

		.titles {
			height: 90rpx;
			line-height: 90rpx;
			border-bottom: 1px solid $uni-border-color;
		}

		.padding-botom {
			margin-bottom: 30rpx;
		}

		.form-box {
			padding: 40rpx 0;
			border-bottom: 1px solid $uni-border-color;
		}

		.uni-form-item {
			width: 100%;
			box-sizing: border-box;
			padding: 0 30rpx;
			align-items: center;

			.title {
				padding: 0px;
				margin-right: 20rpx;
			}

			input {
				flex: 1;
				height: 25rpx;
				font-size: 28rpx;
				line-height: 25rpx;
				padding: 8rpx 0 8rpx 16rpx;
				background: #f5f5f5;
				border-radius: 4px;
				text-align: left;
			}

			button {
				width: 140rpx;
				height: 40rpx;
				margin-left: 10rpx;
				line-height: 40rpx;
				color: #fff;
				background: linear-gradient(to right, #ffda73, #ffb33f);
				padding: 0;
				border-radius: 40rpx;
				font-size: 20rpx;

				&:after {
					border: none;
				}
			}
		}

		.list-text {
			padding: 30rpx 30rpx 0 30rpx;
			color: $uni-text-color-grey;
			text-align: left;

			.text {
				font-size: 24rpx;
			}
		}

		.uni-btn {
			padding: 40rpx;

			button {
				width: 278rpx;
				height: 54rpx;
				line-height: 54rpx;
				font-size: 28rpx;
				background: $uni-bg-color;
				color: #fff;
				border: none;
				border-radius: 54rpx;
			}
		}
	}
</style>
