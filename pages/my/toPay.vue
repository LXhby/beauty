<template>
	<view class="to-pay">
		<view class="user-info" @click="goadress">
			<view class="user-word">
				<view class="users uni-flex uni-row">
					<text class="user-name">收件人：{{adressInfo.receiver}}</text>
					<text class="num">{{adressInfo.mobile}}</text>
				</view>
				<view class="user-order uni-flex uni-row">
					<view class="icon">
						<text class="iconfont">&#xe657;</text>
					</view>
					<view class="address uni-flex">
						<text class="detail">收货地址：{{adressInfo.address}}</text>
						<view class="icon icon-right">
							<text class="iconfont">&#xe642;</text>
						</view>
					</view>

				</view>
			</view>
			<image class="bg-bottom" src="../../static/add_bg.jpg"></image>
		</view>
		<view class="goods-list">
			<view class="goods-item">
				<view class="shop-name uni-flex uni-row" style="align-items: center; justify-content: space-between;">
					<view class="uni-flex uni-row name-box" style="align-items: center; ">
						<image :src="url+info.image" mode="aspectFill"></image>
						<text>王晓文的VIP会员店铺</text>
					</view>
					<text class="iconfont right">&#xe642;</text>
				</view>
				<view v-if="!iscarorder">
					<view class="detail uni-flex uni-row" >
						<view class="left uni-flex uni-row" style="align-items: center;">
							<image :src="url+info.image" mode="aspectFill"></image>
						</view>
						<view class="right">
							<view class="name">{{info.name}}</view>
							<view class="size">
								商品规格
							</view>
							<view class="bottom  uni-flex uni-row">
								<view class="num-box" style="overflow: hidden;">
									<view class="money">
										<text class="num">￥{{info.price}}</text>
										<text class="send">赠送128个金币</text>
									</view>
									<text class="total-num">x{{info.num}}</text>
								</view>
							</view>
						</view>
					</view>
					<view class="number-box uni-flex uni-row" style="padding:0 30rpx;margin-bottom: 30rpx;justify-content: space-between;">
						<text>购买数量：</text>
						<uni-number-box :min="1" :max="info.stock" :value="info.num" @change="bindChange"></uni-number-box>
					</view>
				</view>
				<view v-else v-for="(info,index) in shopcarorder.cardetail">
					<view class="detail uni-flex uni-row" >
						<view class="left uni-flex uni-row" style="align-items: center;">
							<image :src="url+info.image" mode="aspectFill"></image>
						</view>
						<view class="right">
							<view class="name">{{info.name}}</view>
							<view class="size">
								商品规格
							</view>
							<view class="bottom  uni-flex uni-row">
								<view class="num-box" style="overflow: hidden;">
									<view class="money">
										<text class="num">￥{{info.price}}</text>
										<text class="send">赠送128个金币</text>
									</view>
									<text class="total-num">x{{info.num}}</text>
								</view>
							</view>
						</view>
					</view>
				</view>
				
			</view>
		</view>
		<view class="pay-method">
			<view class="uni-flex">
				<text>配送方式</text>
				<text>快递配送</text>
			</view>
			<view class="uni-flex">
				<text>运费</text>
				<text v-if="!iscarorder">￥{{info.freight}}</text>
				<text v-else>￥{{shopcarorder.feig}}</text>
			</view>
			<view class="uni-flex">
				<text>留言</text>
				<input class="uni-input" placeholder-style="color:#999;" placeholder="选填:请留下您的要求"  v-model="remark" />
			</view>
		</view>
		<view class="height-box">

		</view>
		<view class="handle-bottom ">
			<view class="shop-bottom uni-flex uni-row">
				<view class="all-left">
					<text class="word-grey" v-if="!iscarorder">共{{info.num}}件商品</text>
					<text class="word-grey" v-else>共{{shopcarorder.quantity}}件商品</text>
					<text>赠送128个金币</text>
				</view>
				<view class="all-right uni-flex uni-row">
					<text class="combined">合计</text>
					<view>
						<view class="count-box">
							<view class="count-num" v-if="!iscarorder">￥{{totalamount}}</view>
							<view class="count-num" v-else>￥{{shopcarorder.amount}}</view>
							<!-- 大于7位数 弹窗-->
							<text class="gray-color">
								省256元
							</text>
						</view>
					</view>
					<button type="primary" size="mini" @click="gopay">立即付款</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniNumberBox from "@/components/uni-number-box/uni-number-box.vue"
	import {
		mapGetters
	} from "vuex";
	export default {
		data() {
			return {
				info: {},
				url: '',
				adressInfo: {},
				remark:'',
				iscarorder:false,
				means:'微信支付',
				totalamount:0
			};
		},
		computed: {
			...mapGetters(["userInfo","shopId","orderadress","shopcarorder"]),
			
		},
		components: {
			uniNumberBox
		},
		onLoad(option) {
			this.url = this.$baseUrl;
			if(option.product_id){
				this.iscarorder = false;
				this.$http.request({
					url: 'products/' + option.product_id,
					method: 'get',
				}).then(res => {
					this.info = res.data;
					this.info.num = 1;
					this.settotalamount()
					
				}).catch(console.log)
			}else if(option.shopcarorder){
				this.iscarorder = true;
				console.log('shopcarorder',this.shopcarorder)
			}
			
			

			if(this.orderadress.receiver){
				this.adressInfo = this.orderadress;
			}else{
				this.setdefaultAddress()
			}
			console.log('this.orderadress',this.orderadress)
		},
		methods: {
			settotalamount(){
				this.totalamount= (this.info.num*this.info.price)+this.info.freight*1
			},
			setdefaultAddress(){
				this.$http.request({
					url: 'address',
					method: 'get',
					params: {
						'AddressSearch[user_id]': this.userInfo.id,
						'AddressSearch[is_default]': 1,
					}
				}).then(res => {
					if(res.data.items.length){
						this.adressInfo = {
							address:res.data.items[0].province+"-"+res.data.items[0].city+"-"+res.data.items[0].address,
							mobile:res.data.items[0].mobile,
							receiver:res.data.items[0].receiver
						};
						this.$store.commit("user/setorderadress",this.adressInfo)
						
					}else{
						this.$store.commit("user/setorderadress",{})
						this.adressInfo = {};
					}
				}).catch(console.log)
			},
			goadress() {
				if(this.iscarorder){
					uni.navigateTo({
						url: '/pages/my/address?getaddress=1'
					})
				}else{
					uni.navigateTo({
						url: '/pages/my/address?product_id='+this.info.id
					})
				}
				
			},
			bindChange(value) {
				this.$set(this.info,"num",value)
				console.log('this.info',this.info);
				this.$forceUpdate();
				this.settotalamount();
				// this.info.num = value
			},
			requestPayment(id) {
				if (this.means == "微信支付") {
					const info = {
						type: 'FORUM_ORDER',//todo
						id: id,
						means: this.means
					};
					// todoing
					this.$http
						.request({
							url: "payment/start",
							method: "post",
							data: info
						}).then(res => {
							const data = res.data;
							this.$wechat.chooseWXPay({
								timestamp: data.timestamp,
								nonceStr: data.nonceStr,
								package: data.package,
								signType: data.signType,
								paySign: data.paySign, // 支付签名
								success: res => {
									uni.navigateTo({
										url: '/pages/benefits/PaySuccess'
									})
								}
							});
						});
				}
			},
			gopay(){
				if(!this.adressInfo.receiver){
					uni.showToast({
						title:'请填写收货地址',
						icon:"none"
					})
					if(this.iscarorder){
						uni.navigateTo({
							url:"/pages/my/address?getaddress=1"
						})
					}else{
						uni.navigateTo({
							url:"/pages/my/address?product_id="+this.info.id
						})
					}
					
				}else{
					var postdata ={};
					if(this.iscarorder){
						postdata={
							user_id: this.userInfo.id,
							quantity:this.shopcarorder.quantity,
							seller_user_id:this.shopcarorder.seller_user_id,
							receiver:this.adressInfo.receiver,
							mobile:this.adressInfo.mobile,
							address:this.adressInfo.address,
							amount:this.shopcarorder.amount,
							remark:this.remark,
							products:this.shopcarorder.products
						}
					}else{
						postdata = {
							user_id: this.userInfo.id,
							quantity: this.info.num,
							seller_user_id:this.shopId?this.shopId:this.userInfo.id,
							receiver:this.adressInfo.receiver,
							mobile:this.adressInfo.mobile,
							address:this.adressInfo.address,
							amount:this.totalamount,
							remark:this.remark,
							products:[{
								product_id:this.info.id,
								quantity:this.num
							}]
						}
					}
					this.$http.request({
						url: 'orders',
						method: 'post',
						data: postdata
					}).then(res => {
						// 获取到订单id
						this.setdefaultAddress();
						this.requestPayment(res.data.id)
					
					}).catch(console.log)
				}
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	page {
		height: 100%;
	}

	.to-pay {
		height: 100%;
		background-color: #f5f5f5;

		.user-info {
			margin-bottom: 20rpx;
			background-color: $uni-text-color-inverse;

			.users {
				justify-content: space-between;
				padding: 35rpx 80rpx 20rpx 80rpx;

				.user-name {
					font-size: 28rpx;
				}

				.num {
					font-size: 28rpx;
				}
			}

			.user-word {
				align-items: center;
				justify-content: space-between;
				color: #333;

				.iconfont {

					font-size: 42rpx;
					color: $uni-bg-color;
				}

				.user-order {
					align-items: center;

					.icon {
						width: 80rpx;
						text-align: center;
					}

					.address {
						flex: 1;

						.detail {
							flex: 1;
						}
					}

					.icon-right {
						.iconfont {
							color: #999;
							font-size: 32rpx;
						}
					}
				}
			}

			.bg-bottom {
				width: 100%;
				height: 8rpx;
			}
		}

		.goods-list {
			overflow: scroll;
			box-sizing: border-box;
			width: 100%;

			.goods-item {
				border-radius: 5px;
				background-color: #fff;
				border-bottom: 1px solid $uni-border-color;

				.shop-name {
					border-bottom: 1px solid $uni-border-color;

					.name-box {
						height: 80rpx;
						padding-left: 30rpx;
					}

					.right {
						margin-right: 30rpx;
					}

					text {
						color: $uni-bg-color;
					}

					image {
						width: 40rpx;
						height: 40rpx;
						margin-left: 10rpx;
						margin-right: 10rpx;
						border-radius: 50%;
						overflow: hidden;
					}
				}

				.detail {
					padding: 30rpx 0;
					margin: 0 30rpx;

					align-items: center;

					.left {
						margin-right: 20rpx;

						image {
							width: 140rpx;
							height: 140rpx;
							margin-left: 10rpx;
						}
					}

					.right {
						flex: 1;
						font-size: 24rpx;

						.name {
							font-size: 28rpx;
							color: #333;
						}

						.size {
							display: inline-block;
							margin: 2rpx 0;
							height: 40rpx;
							line-height: 40rpx;
							font-size: 24rpx;
							color: $uni-text-color-grey;
						}

						.bottom {
							align-items: flex-end;
							flex-wrap: wrap;
							justify-content: space-between;

							text {
								font-size: 24rpx;
							}

							.num-box {
								display: flex;
								align-items: center;
								justify-content: space-between;
								width: 100%;
								white-space: nowrap;

								.money {
									.num {
										font-size: 28rpx;
										color: $uni-bg-color;
									}

									.send {
										color: $uni-text-color-grey;
										font-size: 20rpx;
										margin-left: 20rpx;
									}
								}

								.total-num {
									font-size: 32rpx;
									color: #333;
								}

							}
						}
					}
				}
			}
		}

		.pay-method {
			margin-top: 20rpx;
			padding: 10rpx 0 28rpx 0;
			background-color: $uni-text-color-inverse;

			.uni-flex {
				margin: 0 30rpx;
				height: 80rpx;
				align-items: center;
				justify-content: space-between;
				border-bottom: 1px solid #f5f5f5;
				color: #333;

				.uni-input {
					color: $uni-text-color-grey;
				}
			}
		}

		.height-box {
			height: 90rpx;
		}

		.handle-bottom {
			position: fixed;
			bottom: 0px;
			left: 0px;
			width: 100%;
			height: 90rpx;
			background-color: #fff;

			.shop-bottom {
				width: 100%;
				height: 100%;
				justify-content: space-between;
				align-items: center;

				.all-left {
					margin-left: 20rpx;

					.word-grey {
						color: $uni-text-color-grey;
						font-size: $uni-font-size-sm;
					}

					text {
						color: $uni-bg-color;
						font-size: 20rpx;
						margin-left: 10rpx;
					}
				}

				.all-right {
					flex: 1;
					align-items: center;
					justify-content:flex-end;
					.combined {
						margin-right: 10rpx;
					}

					.count-box {
						width: 70rpx;
						display: flex;
						align-items: center;
						flex-direction: column;
						text-align: left;
						align-items: center;
						margin-right: 20rpx;
						vertical-align: top;

						.count-num {
							text-align: left;
							color: $uni-bg-color;
							font-size: 28rpx;
							line-height: 20rpx;
						}

						.gray-color {
							white-space: nowrap;
							font-size: 20rpx;
							height: 20rpx;
							color: $uni-text-color-grey;
						}
					}

					button {
						display: flex;
						align-content: center;
						justify-content: center;
						margin-right:30rpx;
						margin-left: 20rpx;
						width: 212rpx;
						height: 58rpx;
						line-height: 58rpx;
						padding: 0;
						border-radius: 58rpx;
						font-size: 28rpx;
						background-color: $uni-bg-color;

						&:after {
							border: none;
						}
					}
				}
			}
		}

	}
</style>
