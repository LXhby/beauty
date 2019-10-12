<template>
	<view class="top-account">
		<view class="top-content">
			<!-- 头部第一行 -->
			<view class="top-main">
				<view class="uni-flex uni-row top-detail">
					<view class="account-img">
						<image src="../../static/image_massge_people2.png" mode=""></image>
						<text class="iconfont icon-vip">&#xe678;</text>
					</view>
					<view class="shop-detail uni-flex uni-column" style="-webkit-flex: 1;flex: 1;">
						<view class="shop-name">
							普瑞塔美妆总店
						</view>
						<text class="shop-busis">浙江乘风萨科技地方生物科技有限公司</text>
					</view>
					<view class="shop-right" style="width: 228upx;">
						<view class="time">
							<text>服务期限</text> <text class="text">365天</text>
						</view>
						<view class="shop-nav uni-flex uni-row" style="-webkit-align-items: center;align-items: center;" @click="handleNav">
							<view class="start">
								<text class="iconfont">&#xe623;</text>
							</view>
							<view class="text uni-flex uni-row" style="-webkit-flex: 1;flex: 1;-webkit-align-items: center;align-items: center;">
								<text class="name">{{rightText}}</text>
								<text class="iconfont right">&#xe642;</text>
							</view>
						</view>
					</view>
				</view>
				<!-- 数字显示第二行 -->
				<view class="example-body">
					<view class="list uni-row uni-flex" style="justify-content: space-around;">
						<view class="item" v-for="(item,index) in detailist" :key="index" style="text-align: center;">
							<view class="text-one">
								16
							</view>
							<text class="text">{{item}}</text>
						</view>
					</view>
					<!-- <uni-grid :column="detailist.length" :show-border="false" :square="false" :highlight="false">
						<uni-grid-item v-for="(item,index) in detailist" :key="index">
							<view class="text-one">16</view>
							<text class="text ">{{item}}</text>
						</uni-grid-item>
					</uni-grid> -->
				</view>
			</view>
			<image src="../../static/WechatIMG311.png" mode="" class="bg-img"></image>
			<image src="../../static/WechatIMG391.png" mode="" class="bg-weave"></image>
			<image src="../../static/real.png" mode="" class="real" v-if="isreal"></image>
		</view>
		<uni-popup ref="popup" type="center" :custom="true">
			<view class="real-form">
				<view class="titles">
					实名认证
				</view>
				<form @submit="formSubmit">
					<view class="form-box">
						<view class="uni-form-item uni-flex uni-row padding-botom">
							<view class="title">真实姓名</view>
							<input class="uni-input" placeholder="请输入真实姓名" name="realname" />
						</view>
						<view class="uni-form-item uni-flex uni-row padding-botom">
							<view class="title">身份证号</view>
							<input class="uni-input" placeholder="请输入真实身份证号" name="idsn" />
						</view>
						<view class="uni-form-item uni-flex uni-row padding-botom">
							<view class="title">手机号码</view>
							<input class="uni-input" placeholder="请输入手机号" name="mobile" v-model="form.mobile" />
						</view>
						<view class="uni-form-item uni-flex uni-row ">
							<view class="title">验证码</view>
							<input class="uni-input" placeholder="请输入验证码" name="verifycode" />
							<button @click="sendVerifycode" :disabled="btnDisabled">{{btnText}}</button>
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
		<uni-popup ref="popupshop" type="center" :custom="true">
			<view class="real-form">
				<view class="titles">
					店铺设置
				</view>
				<form @submit="formSubmitshop">
					<view class="form-box">
						<view class="uni-form-item uni-flex uni-row padding-botom">
							<view class="title">店铺名称</view>
							<input class="uni-input" placeholder="最多五个汉字" name="shop_name" />
						</view>
						<view class="uni-form-item uni-flex uni-row padding-botom">
							<view class="title">店铺头像</view>
							<view class="img" style="margin-right: 20rpx;" @click="upload(1)">
								<image :src="avatar" mode="aspectFill"></image>
								<text class="iconfont">&#xe64a;</text>
							</view>
							<view class="title">背景</view>
							<view class="img" @click="upload(2)">
								<image :src="shop_banner" mode="aspectFill"></image>
								<text class="iconfont">&#xe64a;</text>
							</view>
						</view>
					</view>
					<view class="list-text">
						<view class="text">
							*店铺名称建议使用真实姓名；
						</view>
						<view class="text">
							*店铺名称、头像、店铺背景图不得使用国家领导人，法律明文规定的违法信息。
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
	import uniGrid from '@/components/uni-grid/uni-grid.vue'
	import uniGridItem from '@/components/uni-grid-item/uni-grid-item.vue'
	import uniPopup from '@/components/uni-popup/uni-popup.vue';
	var graceChecker = require("../../js_sdk/graceui-dataChecker/graceChecker.js");
	import {
		mapGetters
	} from "vuex";
	export default {
		components: {
			uniGrid,
			uniGridItem,
			uniPopup
		},
		props: {
			detailist: {
				type: Array,
				default: ['', '', '']
			},
			rightText: {
				type: String,
				default: ''
			},
			navurl: {
				type: String,
				default: ''
			},
			isreal: {
				type: Boolean,
				default: false
			}
		},
		computed: {
			...mapGetters(['userInfo'])
		},
		data() {
			return {
				form: {
					mobile: ''
				},
				btnDisabled: false,
				btnText: '获取验证码',
				avatar: '',
				shop_banner: '',
				index:1
			}
		},
		methods: {
			upload(index){
				this.index = index;
				this.$wechat.chooseImage({
				        count: 1,
				        sizeType: ["compressed"], // 可以指定是原图还是压缩图，默认二者都有
				        sourceType: ["album", "camera"], // 可以指定来源是相册还是相机，默认二者都有
				        success: async res => {
				          try {
				            for (let index = 0; index < res.localIds.length; index++) {
				              const serverId = res.localIds[index];
				              await this.uploadImage(serverId);
				            }
				          } catch (error) {
				            console.log(error);
				          }
				        }
				      });
			},
			uploadImage(serverId) {
			  return new Promise((resolve, reject) => {
				this.$wechat.uploadImage({
				  localId: serverId,
				  isShowProgressTips: 1,
				  success: res => {
					var serverId = res.serverId; // 返回图片的服务器端ID
					  this.$http.request({
						url: 'wechat/download-image',
						method: 'get',
						params: {
							'serverId':serverId
						}
					  }).then(response => {
						if(this.index == 1){
							this.avatar = response.data;
						}else{
							this.shop_banner = response.data;
						}
						resolve();
					  })
					  .catch(error => {
						reject(error);
					  });
				  }
				});
			  });
			},
			handleNav() {
				if (this.rightText == '实名认证') {
					this.$refs.popup.open()
				} else if (this.rightText == '店铺设置') {
					this.$refs.popupshop.open();
				}
			},
			sendVerifycode() {
				console.log('this.form.mobile', this.form.mobile)
				if (!this.form.mobile || this.form.mobile.length != 11) {
					return false;
				} else {

					this.$http
						.request({
							url: "sms",
							method: "post",
							data: {
								mobile: this.form.mobile,
								user_id: this.userInfo.id,
								type: '验证码'
							}
						})
						.then(response => {
							this.startTimer();
						})
						.catch(error => {
							console.log(error);
							// this.$vux.toast.text(error.response.data.message);
						});
				}

			},
			startTimer() {
				this.btnDisabled = true;
				let seconds = 60;
				this.timer = setInterval(() => {
					seconds--;
					this.btnText = seconds + "秒";
					if (seconds <= 0) {
						clearInterval(this.timer);
						this.btnText = "重发验证码";
						this.btnDisabled = false;
					}
				}, 1000);
			},
			formSubmitshop(e) {
				var rule = [{
						name: "shop_name",
						checkType: "notnull",
						errorMsg: "请输入店铺名称"
					},
					{
						name: "shop_name",
						checkType: "reg",
						checkRule: /^[\u4E00-\u9FA5]{1,5}$/,
						errorMsg: "最多填写五个汉字"
					},
				];
				//进行表单检查
				var formData = e.detail.value;
				var checkRes = graceChecker.check(formData, rule);
				console.log('checkRes',checkRes)
				if (checkRes&&this.avatar&&this.shop_bannerthis.avatar&&this.shop_banner) {
					var obj = {
						shop_name: formData.shop_name,
						avatar:this.avatar,
						shop_banner:this.shop_banner
					}
					this.$http
						.request({
							url: "users/" + this.userInfo.id,
							method: "put",
							data: obj
						}).then(res => {
							uni.showToast({
								title: "设置成功!",
								icon: "none"
							});
							this.$refs.popupshop.close();
							this.$store.commit('user/setUserInfo', res.data);
						})
				} else {
					if(graceChecker.error){
						uni.showToast({
							title: graceChecker.error,
							icon: "none"
						});
					}else{
						uni.showToast({
							title: '请上传图片',
							icon: "none"
						});
					}
					
				}
			},
			formSubmit(e) {
				var rule = [{
						name: "realname",
						checkType: "notnull",
						errorMsg: "请输入真实姓名"
					},
					{
						name: "idsn",
						checkType: "notnull",
						errorMsg: "请输入身份证号"
					},
					{
						name: "idsn",
						checkType: "reg",
						checkRule: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
						errorMsg: "身份证号填写有误"
					},
					{
						name: "mobile",
						checkType: "notnull",
						errorMsg: "请输入手机号"
					},
					{
						name: "mobile",
						checkType: "phoneno",
						errorMsg: "手机号填写有误"
					},
					{
						name: 'verifycode',
						checkType: "notnull",
						errorMsg: "请输入验证码"
					},
					{
						name: 'verifycode',
						checkType: "reg",
						checkRule: /^\d{6}$/,
						errorMsg: "验证码填写有误"
					}
				];
				//进行表单检查
				var formData = e.detail.value;
				var checkRes = graceChecker.check(formData, rule);
				if (checkRes) {
					this.$http
						.request({
							url: "users/" + this.userInfo.id,
							method: "put",
							data: formData
						}).then(res => {
							uni.showToast({
								title: "实名成功!",
								icon: "none"
							});
							this.$refs.popupshop.close();
							this.$store.commit('user/setUserInfo', res.data);
						})
				} else {
					uni.showToast({
						title: graceChecker.error,
						icon: "none"
					});
				}
			}
		},
		mounted() {
			// this.$refs.popupshop.open();
		}
	}
</script>

<style lang="scss">
	@import "../../style/topaccount.scss";

	.top-account {
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

				.img {
					position: relative;
					width: 130rpx;
					height: 130rpx;
					background: #f5f5f5;

					image {
						width: 130rpx;
						height: 130rpx;
					}

					.iconfont {
						position: absolute;
						top: 0;
						bottom: 0;
						left: 0;
						right: 0;
						margin: auto auto;
						width: 32rpx;
						height: 32rpx;
						font-size: 32rpx;
					}
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
	}
</style>
