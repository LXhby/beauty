<template>
	<view class="order">
		<view class="header">
			<image src="../../static/order_top_bg.jpg" mode="widthFix"></image>
			<view class="text uni-flex uni-row">
				<text v-if="orderInfo.status === '待付款'">{{orderInfo.status}}：订单倒计时30分钟，订单取消</text>
				<text v-if="orderInfo.status === '待发货'">{{orderInfo.status}}：仓库正在紧张发货中</text>
				<text v-if="orderInfo.status === '待收货'">{{orderInfo.status}}：系统将在X天后自动确认收货</text>
				<text v-if="orderInfo.status === '待评价'">{{orderInfo.status}}：评价有奖哦！</text>
			</view>
		</view>
		<view class="store-name">
			<view class="store-header">
				<view class="header-left">
					<image src="../../static/image_massge_people2.png"></image>
					<text>某某店铺名称</text>
					<text class="iconfont">&#xe642;</text>
				</view>
				<view class="header-right">
					<button v-if="orderInfo.status === '待付款'" class="friend-pay btn" type="primary" size="mini">朋友代付</button>
					<button v-if="orderInfo.status === '待付款'" class="me-pay btn" type="primary" size="mini" @click="goPay">立即付款</button>
					<button v-if="orderInfo.status === '待发货'" class="me-pay btn" type="primary" size="mini" @click="sendGoods">提醒发货</button>
					<button v-if="orderInfo.status === '待收货'" class="me-pay btn" type="primary" size="mini" @click="getGoods">确认收货</button>
					<button v-if="orderInfo.status === '待评价'" class="me-pay btn" type="primary" size="mini" @click="goAssess">立即评价</button>
				</view>
			</view>
			<view class="store-content">
				<view class="goods-info" v-for="item in orderInfo.orderProducts">
					<image :src="'http://backend.krtamall.yiidev.cn' + item.product.image"></image>
					<view class="goods-src">
						<p>{{item.product.name}}</p>
						<text>{{item.product.summary}}</text>
					</view>
					<view class="goods-price">
						<p>￥{{item.price}}</p>
						<text>x{{item.quantity}}</text>
					</view>
				</view>
			</view>
		</view>
		<view class="user-info">
			<view class="user-word">
				<text class="iconfont">&#xe853;</text>
				<view class="user-order">
					<view>
						<text class="user-name">{{orderInfo.receiver}}</text>
						<text class="num">{{orderInfo.mobile}}</text>
					</view>
					<view>
						{{orderInfo.address}}
					</view>

				</view>
			</view>
			<image class="bg-bottom" src="../../static/add_bg.jpg"></image>
		</view>
		<view class="order-info">
			<p class="to-pay">
				<text v-if="orderInfo.status === '待付款'">待付金额:</text>
				<text v-else>实付金额:</text>
				<text class="money">￥{{orderInfo.amount}}</text>
			</p>
			<p>
				<text v-if="orderInfo.status === '待付款'">待赠金币:</text>
				<text v-else>实赠金币:</text>
				<text>{{orderInfo.commission}}个金币</text>
			</p>
			<p>
				<text>订单编号:</text>
				<text>{{orderInfo.id}}</text>
			</p>
			<p>
				<text>付款时间:</text>
				<text>{{orderInfo.pay_at}}</text>
			</p>
			<p>
				<text>发货时间:</text>
				<text>{{orderInfo.sent_at}}</text>  
			</p>
		</view>
		<view class="progress" v-if="orderInfo.status === '待收货' || orderInfo.status === '待评价'">
			<view class="title">
				{{orderInfo.express_com}}快递单号：{{orderInfo.express_sn}}
				</view>
			<view class="progress-detail uni-flex uni-row">
				<view class="flow-li">
					<view class="flow-bor"></view>
					<view class="flow-text">
						<view>已发货</view>
					</view>
				</view>
				<view class="flow-line"></view>
				<view class="flow-li">
					<view class="flow-bor"></view>
					<view class="flow-text">
						<view>运输中</view>
					</view>
				</view>
				<!-- fail-line -->
				<view class="flow-line "></view>
				<view class="flow-li ">
					<!-- fail-li -->
					<view class="flow-bor"></view>
					<view class="flow-text">
						<view>已签收</view>
					</view>
				</view>
			</view>
			<view class="progress-time">
				<view class="time-list uni-flex uni-row">
					<view class="left">
						<view class="time">
							21:13
						</view>
						<text>2018-07-23</text>
					</view>
					<view class="right">
						[茂名市]快件已在茂名高州签收 签收人：拍照签收，感谢您使用中通快递，期待再次为您服务！
					</view>
				</view>
			</view>
		</view>
		<view class="bottom-line">-- 我是有底线的卡瑞塔 --</view>

		<!-- //评价 -->
		<uni-popup ref="popup" type="center" :custom="true">
			<view class="coment-form">
				<view class="shop-image">
					<image src="../../static/image_massge_people2.png" mode="aspectFill"></image>
				</view>
				<view class="title">
					王晓文的店铺
				</view>
				<view class="star">
					<text class="iconfont star dark-color" @click="clickStar(1)">&#xe623;</text>
					<text class="iconfont star" @click="clickStar(2)">&#xe623;</text>
					<text class="iconfont star" @click="clickStar(3)">&#xe623;</text>
					<text class="iconfont star" @click="clickStar(4)">&#xe623;</text>
					<text class="iconfont star" @click="clickStar(5)">&#xe623;</text>
				</view>
				<textarea maxlength="200" placeholder-style="width:100%;border-radius: 5px; background: #f5f5f5;" placeholder=""
				 value="非常好" />
				<view class="upload uni-flex uni-row">
					<view class="up-image">
						<text class="iconfont">&#xe64a;</text>
					</view>
					<view class="up-text">
						<view class="title">
							上传照片
						</view>
						<text>内容丰富的评价更容易成为优质评价哦！</text>
					</view>
				</view>
				<view class="noname">
					<label>
						<checkbox value="cb" checked="true" style="transform:scale(0.7)" color="#ff0080" />匿名评价
					</label>
				</view>
				<view class="uni-btnv">
					<button type="primary" @click="formSubmit">提交评价</button>
				</view>
			</view>
		</uni-popup>
		
		<!-- 提醒发货 -->
		<uni-popup ref="popups" type="center" :custom="true">
			<view class="alert-pop">
				<view class="shop-image">
					<image src="../../static/image_massge_people2.png" mode="aspectFill"></image>
				</view>
				<view class="title">
					王晓文的店铺
				</view>
				<view class="text">亲，我们已收到提醒，将尽快发货！</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import uniPopup from '@/components/uni-popup/uni-popup.vue';
	import {
		mapGetters
	} from "vuex";
	export default {
		components: {
			uniPopup
		},
		computed: {
			...mapGetters(['userInfo'])
		},
		data() {
			return {
				orderInfo: '',
				orderId: '',
				starsNum:1,
			}
		},
		mounted(){
			// this.$refs.popups.open()
		},
		onLoad(option) {
			this.orderId = option.orderId
			this.$http.request({
				url: 'orders/' + option.orderId,
				method: 'get',
				params: {
					'expand': 'orderProducts,orderProducts.product'
				}
			}).then(res => {
				this.orderInfo = res.data;
				
			}).catch(console.log)
		},
		methods:{
			// 立即付款
			goPay(){
				uni.navigateTo({
					url: '/pages/my/toPay?orderId=' + this.orderId,
				})
			},
			// 提醒发货
			sendGoods() {
				this.$refs.popups.open()
			},
			// 确认收货
			getGoods() {
				this.$refs.popup.open()
			},
			// 立即评价
			goAssess() {
				uni.navigateTo({
					url: '/pages/my/postcomment?orderId='+this.orderId
				});
			},
			// 提交评价
			formSubmit() {
				
			},
			// 点星星
			clickStar(num) {
				this.starsNum = num
				let stars = document.getElementsByClassName("star");
				for(let i = 1; i <= num; i++) {
					stars[i].classList.add("dark-color");
				}
				while(num < 5) {
					num++
					stars[num].classList.remove("dark-color");
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "@/common/common.scss";

	.order {
		background-color: #f5f5f5;

		.header {
			position: relative;
			height: 200rpx;

			color: #fff;

			image {
				width: 100%;
			}

			.text {
				position: absolute;
				left: 30rpx;
				top: 0;
				bottom: 0;
				margin: auto;
				width: 100%;
				height: 200rpx;
				align-items: center;
				font-size: 32rpx;
			}
		}

		.store-name {
			margin: 20rpx 0;
			background-color: $uni-text-color-inverse;

			.store-header {
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 0 20rpx;
				height: 75rpx;
				border-bottom: 1px solid #f5f5f5;

				.header-left {
					display: flex;
					align-items: center;

					image {
						width: 44rpx;
						height: 44rpx;
						margin-right: 4rpx;
						border-radius: 50%;
					}

					text {
						color: $uni-bg-color;
						font-size: 24rpx;
					}

					.iconfont {
						font-size: 24rpx;
						margin-left: 4rpx;
						color: #999;
					}
				}

				.header-right {
					display: flex;
					align-items: center;

					.btn {
						display: flex;
						justify-content: center;
						align-items: center;
						font-size: 24rpx;
						height: 42rpx;
						width: 140rpx;
						padding: 0px;
						border-radius: 42rpx;
						&:after{
							border: none;
						}
					}

					.friend-pay {
						margin-right: 10rpx;
						background-color: #4aa3f0;
					}

					.me-pay {
						background-color: $uni-bg-color;
						&:after{
							border: none;
						}
					}
				}
			}

			.store-content {
				padding-bottom: 20rpx;
				color: #333;

				.goods-info {
					display: flex;
					justify-content: space-between;
					padding: 30rpx 0;
					margin: 0 30rpx;
					border-bottom: 1px solid #f5f5f5;

					image {
						width: 135rpx;
						height: 135rpx;
						border-radius: 10rpx;
					}

					.goods-src {
						display: flex;
						flex-wrap: wrap;
						margin-left: 20rpx;
						width: 450rpx;
						letter-spacing: 3rpx;

						text {
							margin-top: 30rpx;
						}
					}

					.goods-price {
						text-align: right;
					}

					text {
						font-size: $uni-font-size-ssm;
						color: $uni-text-color-grey;
					}
				}
			}
		}

		.user-info {
			background-color: $uni-text-color-inverse;

			.user-word {
				display: flex;
				align-items: center;
				;
				padding: 20rpx 60rpx 0rpx 30rpx;
				color: $uni-text-color-grey;

				.iconfont {

					font-size: 42rpx;
					color: $uni-bg-color;
				}

				.user-order {
					margin-left: 30rpx;
					letter-spacing: 3rpx;

					view {
						margin: 10rpx 0;

						.user-name {
							margin-right: 30rpx;
							font-size: 28rpx;
							font-weight: bold;
						}

						.num {
							font-size: 28rpx;
						}
					}
				}
			}

			.bg-bottom {
				width: 100%;
				height: 8rpx;
			}
		}

		.order-info {
			margin: 20rpx 0;
			padding: 30rpx;
			background-color: $uni-text-color-inverse;

			p {
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin-bottom: 10rpx;
				color: $uni-text-color-grey;
			}

			.to-pay {
				color: #333;
			}

			.money {
				color: $uni-bg-color;
			}
		}

		.progress {
			background: #fff;

			.title {
				padding: 30rpx;
				color: #333;
			}

			.progress-detail {
				box-sizing: border-box;
				height: 125rpx;
				padding: 20rpx 97rpx 0 97rpx;
				justify-content: space-between;
				align-items: flex-start;
				background: #fff;
				border-bottom: 1px solid $uni-border-color;

				.flow-li {
					width: 12rpx;
					height: 12rpx;
					position: relative;
					z-index: 1;

					.flow-bor {
						background-color: #FF4000;
						position: absolute;
						left: 0;
						top: 0;
						width: 12rpx;
						height: 12rpx;
						border-radius: 50%;
						text-align: center;
					}

					.flow-text {
						position: absolute;
						font-size: 28rpx;
						line-height: 1rem;
						top: 38rpx;
						left: 50%;
						white-space: nowrap;
						text-align: center;
						transform: translate(-50%, 0);

						view {
							font-size: 24rpx;
							color: #333;
						}
					}

				}

				.flow-line {
					flex: 1;
					background-color: #FF4000;
					margin-top: 4rpx;
					height: 4rpx;
					position: relative;
				}

				.fail-line {
					background-color: #edecea;
				}

				.fail-li {
					.flow-bor {
						background: #edecea;
					}

					.flow-text {
						view {
							font-size: 24rpx;
							color: $uni-textbg-color-grey
						}
					}
				}
			}
		}

		.progress-time {
			.time-list {
				align-items: center;
				padding: 40rpx 30rpx 40rpx 0;

				.left {
					width: 180rpx;
					margin-right: 20rpx;
					text-align: center;

					.time {
						font-size: 32rpx;
						color: #000;
					}

					text {
						color: $uni-text-color-grey;
						font-size: 24rpx;
						text-align: center;
					}
				}

				.right {
					flex: 1;
					font-size: 28rpx;
					color: #333;
					line-height: 46rpx;
				}
			}
		}

		.bottom-line {
			padding-bottom: 40rpx;
			color: $uni-text-color-grey;
			text-align: center;
		}
		.coment-form{
			position: relative;
			width: 550rpx;
			border-radius: 5px;
			background:#fff;
			.shop-image{
				position: absolute;
				width:138rpx;
				height:138rpx;
				top: -64rpx;
				left: 0;
				right: 0;
				margin:0 auto;
				border-radius: 50%;
				overflow:hidden;
				image{
					width:138rpx;
					height:138rpx;
					border-radius: 50%;
				}
			}
			.title{
				padding-top:84rpx;
				color: #333;
			}
			
		}
		.upload{
			padding:0 40rpx;
			align-items:center;
			.up-image{
				display: flex;
				justify-content: center;
				align-items: center;
				width: 90rpx;
				height: 90rpx;
				margin-right: 10rpx;
				background: $uni-bg-color;
				border-radius: 5rpx;
			}
			.up-text{
				flex: 1;
				text-align:left;
				.title{
					padding-top: 0px;
					font-size: 24rpx;
				}
				text{
					color:$uni-text-color-grey;
					font-size: 20rpx;
					line-height: 20rpx;
				}
			}
			.iconfont{
				color: #fff;
				font-size: 46rpx;
			}
		}
		.noname{
			margin-top: 30rpx;
			padding-left: 40rpx;
			text-align: left;
			label{
				font-size: 24rpx;
			}
		}
		.uni-btnv{
			padding:20rpx 0 40rpx 0;
			button{
				width: 276rpx;
				height: 54rpx;
				line-height: 54rpx;
				border-radius: 54rpx;
				color: #fff;
				font-size: 28rpx;
				background: $uni-bg-color;
				&:after{
					border: none;
				}
			}
		}
		.alert-pop{
			position: relative;
			width: 550rpx;
			border-radius: 5px;
			background:#fff;
			.shop-image{
				position: absolute;
				width:138rpx;
				height:138rpx;
				top: -64rpx;
				left: 0;
				right: 0;
				margin:0 auto;
				border-radius: 50%;
				overflow:hidden;
				image{
					width:138rpx;
					height:138rpx;
					border-radius: 50%;
				}
			}
			.title{
				padding-top:84rpx;
				color: #333;
				font-size: 26rpx;
			}
			.text{
				padding: 50rpx 0;
			}
		}
	}
</style>
