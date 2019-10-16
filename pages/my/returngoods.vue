<template>
	<view class="returngood-page">
		<view class="top">
			<image src="../../static/order_bm_bg.jpg" mode="widthFix"></image>
			<view class="text-box">
				<view class="status">
					{{orderInfo.status}}
				</view>
				<text>{{orderInfo.updated_at}}</text>
			</view>
		</view>
		<view class="return-total">
			<view class="total-first uni-flex uni-row">
				<text class="first-text">退款总金额</text>
				<view class="first-num">
					<text>共计：</text>
					<text class="dark-color">{{orderInfo.refund_amount}}</text>
				</view>
			</view>
			<view class="total-second uni-flex uni-row">
				<text class="first-text">退款方式</text>
				<text class="dark-color">原路返回</text>
			</view>
		</view>
		<view class="return-progress">
			<view class="progress-title">
				退款进度
			</view>
			<view class="progress-detail uni-flex uni-row">
				<view :class="[{'flow-yes':orderInfo.refund_status},'flow-li']">
					<view class="flow-bor"></view>
					<view class="flow-text">
						<view>客服审核</view>
						<text>{{orderInfo.refund_aduit_at}}</text>
					</view>
				</view>
				<view :class="[{'line-yes':orderInfo.refund_status},'flow-line']"></view>
				<view :class="[{'flow-yes':orderInfo.refund_status == 'REFUND_STATUS_PROCESSING' || orderInfo.refund_status == 'REFUND_STATUS_SUCCESS'},'flow-li']">
					<view class="flow-bor"></view>
					<view class="flow-text">
						<view>系统受理</view>
						<text>{{orderInfo.refund_process_at }}</text>
					</view>
				</view>
				<view :class="[{'line-yes':orderInfo.refund_status == 'REFUND_STATUS_PROCESSING' || orderInfo.refund_status == 'REFUND_STATUS_SUCCESS'},'flow-line']"></view>
				<view :class="[{'flow-yes':orderInfo.refund_status == 'REFUND_STATUS_SUCCESS'},'flow-li']">
					<!-- <view class="flow-bor"></view> -->
					<view class="iconfont flow-icon">&#xe63e;</view>
					<view class="flow-text">
						<view>退款成功</view>
						<text>{{orderInfo.refund_done_at}}</text>
					</view>
				</view>
			</view>
		</view>
		<view class="return-detail">
			<view class="detail-title uni-flex uni-row" @click="orderdetail">
				<text>退款订单信息</text>
				<text class="iconfont">&#xe642;</text>
			</view>
			<view class="detail-goods uni-flex uni-row" v-for="(ele,index) in orderInfo.orderProducts" :key="index" @click="gogoodsdetail(ele.product)">
				<image :src="url+ele.product.image" mode="aspectFill"></image>
				<view class="goods-detail">
					<view class="title">
						{{ele.product.name}}
					</view>
					<view class="goods-num uni-flex uni-row">
						<text class="dark-color">￥{{ele.product.price}}</text>
						<text class="num">x{{ele.quantity}}</text>
					</view>
				</view>
			</view>
			<view class="return-resean">
				<view class="text">
					退款原因：{{orderInfo.refund_reason}}
				</view>
				<view class="text">
					退款金额：￥{{orderInfo.refund_amount}}
				</view>
				<view class="text">
					申请时间：{{orderInfo.updated_at}}
				</view>
				<view class="text">
					退款编号：{{orderInfo.id}}
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
	export default{
		data(){
			return{
				orderInfo:{},
				url:''
			}
		},
		computed: {
			...mapGetters(['userInfo'])
		},
		onLoad(option) {
			this.orderId = option.orderId;
			this.url = this.$baseUrl;
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
			orderdetail(){
				uni.navigateTo({
					url:'/pages/my/backdetail?orderId='+this.orderInfo.id
				})
			},
			gogoodsdetail(item){
				console.log(item);
				uni.navigateTo({
					url:'/pages/home/detail?id='+item.id
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "../../common/common.scss";
	page {
		width: 100%;
		height: 100%;
	}

	.returngood-page {
		height: 100%;
		background: #f1f1f1;

		.top {
			position: relative;

			image {
				width: 100%;
			}

			.text-box {
				position: absolute;
				width: 100%;
				top: 0px;
				left: 0px;
				padding: 45rpx;
				color: #fff;

				.status {
					margin-bottom: 10rpx;
					font-size: 32rpx;
				}

				text {
					font-size: 24rpx;
				}
			}
		}

		.return-total {
			font-size: 28rpx;
			background: #fff;
			padding-top: 20rpx;
			margin-bottom: 20rpx;
			color:#333;
			.total-first {
				border-bottom: 1px solid $uni-border-color;
			}

			.total-first,
			.total-second {
				padding: 20rpx;
				justify-content: space-between;
			}

			.dark-color {
				font-size: 32rpx;
				color: $uni-bg-color;
			}

		}

		.return-progress {
			margin-bottom:20rpx;
			.progress-title {
				padding:40rpx 20rpx 20rpx 20rpx;
				font-size: 28rpx;
				background: #fff;
				color:#333;
				border-bottom: 1px solid $uni-border-color;
			}

			.progress-detail {
				box-sizing: border-box;
				height: 240rpx;
				padding: 60rpx 134rpx 0 134rpx;
				justify-content: space-between;
				align-items: flex-start;
				background: #fff;
				.flow-yes{
					.flow-bor {
						background-color: #FF4000;
					}
					.flow-icon{
						background-color: #FF4000;
					}
				}
				.line-yes{
					background-color: #FF4000;
				}
				.flow-li {
					width: 12rpx;
					height: 12rpx;
					position: relative;
					z-index: 1;

					.flow-bor {
						background-color: #999;
						position: absolute;
						left: 0;
						top: 0;
						width: 12rpx;
						height: 12rpx;
						border-radius: 50%;
						text-align: center;
					}
					.flow-icon{
						width: 30rpx;
						height: 30rpx;
						position: absolute;
						left: 0;
						top: -9rpx;
						border-radius: 50%;
						background-color: #999;
						color: #fff;
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
							margin-bottom: 6rpx;
							color: $uni-text-color;
						}

						text {
							color: $uni-text-color-grey;
							font-size: 24rpx;
						}
					}

				}

				.flow-line {
					flex: 1;
					background-color: #999;
					margin-top: 4rpx;
					height: 4rpx;
					position: relative;
				}
			}
		
		}
		.return-detail{
			background:#fff;
			.detail-title{
				padding: 20rpx;
				color: #333;
				justify-content: space-between;
				align-items: center;
				border-bottom: 1px solid $uni-border-color;
			}
			.detail-goods{
				margin:0 30rpx 0 20rpx;
				padding:20rpx 0;
				border-bottom:1px solid $uni-border-color;
				image{
					width: 165rpx;
					height: 165rpx;
					margin-right: 28rpx;
				}
				.goods-detail{
					flex: 1;
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					color: #333;
					min-height:165rpx;
					.title{
						font-size: 28rpx;
					}
					.goods-num{
						
						justify-content:space-between;
						align-items:center;
						.num{
							font-size: 20rpx;
						}
						
					}
				}
				.dark-color{
					font-size: 32rpx;
					color: $uni-bg-color;
				}
			}
			.return-resean{
				padding: 20rpx 20rpx 50rpx 20rpx;
				.text{
					margin-bottom: 10rpx;
					font-size: 24rpx;
					color: $uni-text-color-grey;
				}
			}
		}
		.bottom-line{
			background: #f1f1f1;
		}
	}
</style>
