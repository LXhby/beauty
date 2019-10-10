<!-- 商品列表组件 <pd-list :list="xx"></pd-list> -->
<template>
	<view class='content'>
		<!-- 订单列表 -->
		<view v-for="(item,index) in list" :key="index" class="order-item">
			<view class="top uni-flex uni-row">
				<view class="left">
					<text class="iconfont">&#xe608;</text>
					<text class="time">{{item.created_at}}</text>
				</view>
				<view class="right">
					<text class="status" v-if="item.status === '待付款'">待付款</text>
					<text class="status" style="margin-right: 10rpx;padding-right: 10rpx;border-right: 1px solid #f5f5f5;" v-if="item.status === '待发货'">待发货</text>
					<text class="status" style="margin-right: 10rpx;padding-right: 10rpx;border-right: 1px solid #f5f5f5;" v-if="item.status === '待收货'">待确认</text>
					<text class="status" v-if="item.status === '待评价'">待评价</text>
					<text class="status" v-if="item.status === '已评价'">交易成功</text>
					<image v-if="item.status === '待收货' || item.status === '待发货'" src="../../static/car.png" mode="widthFix"></image>
				</view>
			</view>
			<view class="item-main uni-flex uni-row" v-for="product in item.orderProducts">
				<view class="left uni-flex uni-row">
					<image :src="'http://backend.krtamall.yiidev.cn' + product.product.image" mode="aspectFill"></image>
					<view class="item-title">
						<view class="name">
							{{product.product.name}}
						</view>
						<text>套装产品加乳液</text>
					</view>
				</view>
				<view class="right">
					<view class="money">￥{{product.price}}</view>
					<text class="num">X{{product.quantity}}</text>
				</view>
			</view>
			<view class="total uni-flex uni-row">
				<view class="total-glod">
					<text>赠送</text>
					<text class="dark-color">100</text>
					<text>个金币</text>
				</view>
				<view class="total-num uni-flex uni-row">
					<text class="heji">共{{item.quantity}}件商品</text>
					<view class="">
						<text>合计：</text>
						<text class="dark-color">￥{{item.amount}}</text>
					</view>
				</view>
			</view>
			<view class="btn-list uni-flex uni-row">
				<button type="primary" class="detail" @click="godetail(item.id)">订单详情</button>
				<view v-if="item.status === '待付款'" class="right-btn uni-flex uni-row">
					<button type="primary" class="blue btn1">朋友代付</button>
					<button type="primary" class="dark" @click="goPay(item.id)">立即付款</button>
				</view>
				<view v-if="item.status === '待发货'" class="right-btn uni-flex uni-row">
					<button type="primary" class="blue btn1" @click="drawBack(item.id)">申请退款</button>
					<button type="primary" class="dark" @click="sendGoods">提醒发货</button>
				</view>
				<view v-if="item.status === '待收货'" class="right-btn uni-flex uni-row">
					<button type="primary" class="blue btn1" @click="drawBack(item.id)">申请退款</button>
					<button type="primary" class="dark" @click="getGoods">确认发货</button>
				</view>
				<view v-if="item.status === '待评价'" class="right-btn uni-flex uni-row">
					<button type="primary" class="blue btn1">再来一单</button>
					<button type="primary" class="dark" @click="goAssess(item.id)">评价有奖</button>
				</view>
			</view>
		</view>
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
	import Moment from "moment";
	import uniPopup from '@/components/uni-popup/uni-popup.vue';
	export default {
		props: {
			list: { // 数据列表
				type: Array,
				default () {
					return []
				}
			},
			type: {
				type: String,
				default () {
					return ''
				}
			}
		},
		components: {
			uniPopup,
		},
		data() {
			return {
				url: ''
			}
		},
		created() {
			this.url = this.$baseUrl;
			console.log('this.list', this.list)
		},
		methods: {
			godetail(orderId) {
				uni.navigateTo({
					url: '/pages/my/orderinfo?orderId=' + orderId,
				})
			},
			// 立即评价
			goAssess(orderId) {
				uni.navigateTo({
					url: '/pages/my/postcomment?orderId=' + orderId,
				})
			},
			// 确认收货
			getGoods() {
				this.$refs.popup.open()
			},
			// 提醒发货
			sendGoods() {
				this.$refs.popups.open()
			},
			// 申请退款
			drawBack(orderId) {
				uni.navigateTo({
					url: '/pages/my/drawback?orderId=' + orderId,
				})
			},
			getTime(time) {
				var str = Moment().diff(Moment(time), "seconds");
				console.log(str);
				if (str < 60) {
					return str + '秒前'
				} else if (str < 3600) {
					return parseInt(str / 60) + '分钟前'
				} else if (str < 3600 * 24) {
					return parseInt(str / 60 / 60) + '小时前'
				} else {
					return parseInt(str / 60 / 60 / 24) + '天前'
				}

			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "@/common/common.scss";
	/*数据列表*/

	.order-item {
		margin-top: 20rpx;
		background: #fff;

		.top {
			height: 74rpx;
			padding: 0 30rpx;
			justify-content: space-between;
			align-items: center;
			border-bottom: 1px solid $uni-border-color;

			.left {
				line-height: 74rpx;
				color: $uni-text-color;

				.iconfont {
					font-size: 24rpx;
					margin-right: 8rpx;
					line-height: 74rpx;
				}
			}

			.right {
				display: flex;
				align-items: center;

				image {
					width: 60rpx;
					height: 40rpx;
				}

				.status {
					color: $uni-bg-color;
				}
			}


		}

		.item-main {
			margin: 0 30rpx;
			padding: 30rpx 0;
			justify-content: space-between;
			border-bottom: 1px solid $uni-border-color;

			.left {
				width: 580rpx;

				image {
					overflow: hidden;
					width: 135rpx;
					height: 135rpx;
					margin-right: 20rpx;
					border-radius: 5px;
				}

				.item-title {
					.name {
						margin-bottom: 20rpx;
						font-size: 28rpx;
					}

					text {
						font-size: 24rpx;
						color: $uni-text-color-grey;
					}
				}
			}

			.right {
				flex: 1;
				text-align: right;

				.money {}

				.num {
					font-size: 20rpx;
					color: $uni-text-color-grey;
				}
			}
		}

		.total {
			margin: 0 30rpx;
			height: 75rpx;
			justify-content: space-between;
			align-items: center;
			border-bottom: 1px solid $uni-border-color;

			.dark-color {
				color: $uni-bg-color;
			}

			.total-num {
				.heji {
					margin-right: 20rpx;
				}
			}
		}

		.btn-list {
			margin: 0 30rpx;
			padding: 20rpx 0;
			justify-content: space-between;

			button {
				display: flex;
				align-items: center;
				justify-content: center;
				width: 180rpx;
				height: 56rpx;
				border-radius: 56rpx;
				margin: 0px;
				font-size: 28rpx;
				&:after{
				border: none;
					
				}
			}

			.detail {
				color: $uni-text-color;
				background: #ddd;
				border: none;
			}

			.btn1 {
				margin-right: 20rpx;
				border: none;
			}

			.blue {
				color: #fff;
				background: #4aa3f0;
			}

			.dark {
				color: #fff;
				background-color: $uni-bg-color;
			}
		}
	}
	.alert-pop {
		position: relative;
		width: 550rpx;
		border-radius: 5px;
		background: #fff;
	
		.shop-image {
			position: absolute;
			width: 138rpx;
			height: 138rpx;
			top: -64rpx;
			left: 0;
			right: 0;
			margin: 0 auto;
			border-radius: 50%;
			overflow: hidden;
	
			image {
				width: 138rpx;
				height: 138rpx;
				border-radius: 50%;
			}
		}
	
		.title {
			padding-top: 84rpx;
			color: #333;
			font-size: 26rpx;
		}
	
		.text {
			padding: 50rpx 0;
		}
	}
</style>
