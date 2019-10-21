<template>
	<view class="withdrawal-page">
		<view class="main">
			<view class="select-bank">
				<view class="show-bank uni-flex uni-row">
					<text>{{choseBank.label}}</text>
					<text class="iconfont arow" @click="changcar">&#xe610;</text>
<!-- 					<button type="primary" class="addbtn" @>更换</button> -->
				</view>
			</view>
			
			
			
			<view class="main-title">
				<view class="line"></view>
				<text class="text">充值金额（元）</text>
			</view>
			<view class="main-content">
				<view class="uni-flex uni-row input-money">
					<text style="font-size:46rpx;">￥</text>
					<input class="uni-input" type="number" placeholder="请输入充值金额" v-model="money" />
				</view>
				
				
				<button type="primary" class="subbtn" @click="submitgetmoney">确认充值</button>
				<!-- <view class="instructions">
					<text>*提现周期为{{config.min_settle_interval}}天，每天最高提现额度为￥{{config.min_settle_amount}}；</text><br>
					<text>*提现申请后财务会在1个工作日内审核，到账时间24小时内；</text><br>
					<text>*提现需要扣除微信提现手续费和个人所得税；</text><br>
					<text>*如您在提现过程中遇到问题可致电{{config.service_phone}}</text>
				</view> -->
				<view class="bottom-line">-- 我是有底线的卡瑞塔 --</view>
			</view>
		</view>
		<uni-popup ref="popupout" type="center" :custom="true">
			<view class="alert-box">
				<view class="title">
					提现确认
				</view>
				<view class="get-box uni-flex uni-row">
					<view class="item">
						<view class="item-text">
							提现金额
						</view>
						<text class="item-money">￥{{money}}</text>
					</view>
					<view class="item">
						<view class="item-text">
							提现手续费
						</view>
						<text class="item-money">￥{{poundage}}</text>
					</view>
				</view>
				<view class="get-total uni-flex uni-row">
					<view class="item-text">
						到账金额
					</view>
					<view class="item-money">
						￥{{lastMoney}}
					</view>
				</view>

				<button class="btn" @click="submitMoney" :disabled="lastMoney<=0">
					提现确认
				</button>
			</view>
		</uni-popup>
		<w-picker v-if="myBank.length!=0" mode="selector" @confirm="onConfirm" ref="selector" themeColor="#f00" :selectList="myBank"
		 @cancel="cancelselect">
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
							<input class="uni-input" placeholder="请输入真实姓名" name="name" />
						</view>
						<view class="uni-form-item uni-flex uni-row padding-botom">
							<view class="title">卡号</view>
							<input class="uni-input" placeholder="请输入卡号" name="number" />
						</view>
						<view class="uni-form-item uni-flex uni-row padding-botom">
							<view class="title">
								开户银行
							</view>
							<view class="uni-list-cell-db">
								<xfl-select :list="banks" :clearable="false" :showItemNum="4" :listShow="false" :isCanInput="true"
								 :style_Container="'height: 30px; font-size: 16px;'" placeholder="请选择" :selectHideType="'hideAll'" @change="selectbank">
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
	import uniPopup from '@/components/uni-popup/uni-popup.vue';
	import moment from "moment";
	import wPicker from "@/components/w-picker/w-picker.vue";
	import xflSelect from '@/components/xfl-select/xfl-select.vue'; //导入
	import {
		mapGetters
	} from "vuex";
	var graceChecker = require("../../js_sdk/graceui-dataChecker/graceChecker.js");
	export default {
		components: {
			uniPopup,
			wPicker,
			xflSelect
		},
		computed: {
			...mapGetters(["userInfo", "config"]),
			poundage() {
				const a = this.money * this.config.settle_fee;
				return a.toFixed(2);
			},
			tax() {
				return this.money * 0;
			},
			lastMoney() {
				let last = this.money - this.poundage - this.tax;
				if (last < 0) last = 0;
				return last.toFixed(2);
			},
			weixinEnabled() {
				return (this.config.settle_to_wechat_balance == 1);
			}
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
				radioGroup: false,
				selectbankname: '',
				choseBank: {}, //选择的银行卡
			}
		},
		watch: {
			myBank(val) {
				this.choseBank = val[0]
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
			submitMoney() {
				const info = {
					account_id: this.radioGroup == "bank" ? this.choseBank.value : "wechat"
				};
				this.$http.request({
					url: 'settle/apply',
					method: 'post',
					data:info
				}).then(res => {
				          if(res.data.success){
				           this.$refs.popupout.close()
				            uni.showToast({
				            	title:res.data.message,
								icon:'none'
				            })
				            
				            uni.switchTab({
				            	url:"/pages/my/index"
				            })
				          }
				          else{
				            uni.showToast({
				            	title:res.data.message,
				            	icon:'none'
				            })
				
				            this.$http.request({
				            	url: 'settle/sign',
				            	method: 'get'
				            }).then(res=>{
				              window.location.href = res.data;
				            }).catch(err => {
								uni.showToast({
									title:err.response.data.message,
									icon:'none'
								})
				              });
				          }
				        })
				        .catch(err => {
				          this.dialog = false;
				          console.log("err", err.response);
				          this.snackbar = true;
				          this.alerttext = err.response.data.message;
				          this.alerttype = "error";
				        });
			},
			selectbank(item) {
				this.selectbankname = item.newVal;
			},
			cancelselect() {
				this.radioGroup = false;
			},
			onConfirm(val) {
				console.log(val)
				if(val.result == '添加银行卡'){
					this.addcar()
					this.radioGroup = false;
					//this.choseBank = {}
				} else {
					this.choseBank = val.checkArr;
					console.log('this.choseBank', this.choseBank)
				}
			},
			addcar() {
				this.$refs.popupbank.open()
			},
			changcar() {
				this.$refs.selector.show()
			},
			submitgetmoney() {
				if (!this.choseBank.value) {
					uni.showToast({
						title: '请选择银行卡',
						icon: "none"
					});
					return false
				}
				if (!this.money) {
					uni.showToast({
						title: '请选择银行卡',
						icon: "none"
					});
					return false
				}
				// if(this.money > this.userInfo.balance){
				// 	uni.showToast({
				// 		title: '填的金额大于余额',
				// 		icon: "none"
				// 	});
				// 	return false
				// }
				this.$refs.popupout.open()
			},
			formSubmit(e) {
				var rule = [{
						name: "name",
						checkType: "notnull",
						errorMsg: "请输入持卡人"
					},
					{
						name: "number",
						checkType: "notnull",
						errorMsg: "请输入卡号"
					},
					{
						name: "number",
						checkType: "reg",
						checkRule: /^([1-9]{1})(\d{15}|\d{18})$/,
						errorMsg: "卡号填写有误"
					}
				];
				//进行表单检查
				var formData = e.detail.value;
				var checkRes = graceChecker.check(formData, rule);
				console.log('checkRes', checkRes)
				if (checkRes) {
					var obj = {
						user_id: this.userInfo.id,
						name: formData.name,
						number: formData.number,
						bank: this.selectbankname
					}
					this.$http
						.request({
							url: "accounts",
							method: "post",
							data: obj
						}).then(res => {
							uni.showToast({
								title: "添加成功!",
								icon: "none"
							});
							this.$refs.popupbank.close();
							//查看是否本人有银行卡
							this.getAccounts()
						}).catch(err=>{
							uni.showToast({
								title:err.error,
								icon:"none"
							})
						})
				} else {
					console.log('graceChecker', graceChecker)
					if (graceChecker.error) {
						uni.showToast({
							title: graceChecker.error,
							icon: "none"
						});
					} else {
						uni.showToast({
							title: '请选择银行',
							icon: "none"
						});
					}

				}
			},
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
						data.forEach(ele => {
							var le = {
								label: ele.bank + ':' + ele.number,
								value: ele.id
							}
							this.myBank.push(le);
						})
						let obj = {
							label: '添加银行卡',
							value: '添加银行卡'
						}
						this.myBank.push(obj)
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
	page {
		height: 100%;
	}
	.withdrawal-page {
		height: 100%;
		background: $uni-border-color;
		
		.select-bank {
			padding: 30rpx 20rpx 20rpx;
			margin-bottom: 20rpx;
			background: #fff;
			.addbtn {
				background: $uni-bg-color;
				width: 180rpx;
				height: 40rpx;
				margin: 0px;
				padding: 0;
				line-height: 40rpx;
				font-size: 24rpx;
			}
			
			.show-bank {
				align-items: center;
				justify-content: space-between;
				margin-top: 20rpx;
				color: $uni-text-color;
			}
		}
		.main-title {
			padding-top: 30rpx;
			background: #fff;
		}
		
		.main-content {
			padding: 0 44rpx;
			background: #fff;
			
			.input-money {
				align-items: baseline;
				.uni-input {
					font-size: 36rpx;
				}
			}
			
			input {
				margin-bottom: 24rpx;
				padding-left: 0px;
				border-bottom: 1px solid $uni-border-color;
			}

			label {
				color: $uni-text-color;
			}

			uni-radio-group {
				flex: 1;
			}

			.subbtn {
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
				line-height: 45rpx;
				font-size: 28rpx;
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
				width: 120rpx;
				padding: 0px;
				text-align: left;
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
