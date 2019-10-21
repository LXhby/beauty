<template>
	<view class="back-list">
		<mescroll-uni :down="downOption" @down="downCallback" @up="upCallback" :up="upOption">
			<view class="order-item" v-for="(item,index) in rewardList" :key="index">
				<view class="top uni-flex uni-row">
					<view class="left">
						<text class="iconfont">&#xe608;</text>
						<text class="time">{{item.created_at}}</text>
					</view>
				</view>
				<view class="item-main uni-flex uni-row" v-for="product in item.order.orderProducts" @click="gogoodsdetail(product)">
					<view class="left uni-flex uni-row">
						<image :src="url + product.product.image" mode="aspectFill"></image>
						<view class="item-title">
							<view class="name">
								{{product.product.name}}
							</view>
							<text>{{product.product.summary}}</text>
						</view>
					</view>
					<view class="right">
						<view class="money">￥{{product.price}}</view>
						<text class="num">X{{product.quantity}}</text>
					</view>
				</view>
				<view class="btn-list uni-flex uni-row">
					<button type="primary" class="detail" @click="godetail(item.id)">退款详情</button>
				</view>
			</view>
		</mescroll-uni>
	</view>
</template>

<script>
	import {
		mapGetters
	} from "vuex";
	import MescrollUni from "@/components/mescroll-uni/mescroll-uni.vue";
	export default {
		components: {
			MescrollUni
		},
		computed: {
			...mapGetters(["userInfo"])
		},
		data() {
			return {
				page: 1,
				rewardList: [],
				url: '',
				upOption: {
					noMoreSize: 1,
					textNoMore: "-- 我是有底线的卡瑞塔 --",
					onScroll: true, // 是否监听滚动
				},
				downOption: {
					auto: false //是否在初始化后,自动执行下拉回调callback; 默认true
				},
			}
		},
		onLoad() {
			this.url = this.$baseUrl;
		},
		methods: {
			gogoodsdetail(item){
				uni.navigateTo({
					url:'/pages/home/detail?id='+item.product.id
				})
			},
			godetail(item){
				uni.navigateTo({
					url:'/pages/my/returngoods?refundId='+item
				})
			},
			/*下拉刷新的回调 */
			downCallback(mescroll) {
				//联网加载数据
				this.getListDataFromNet(0, 1, (data) => {
					//联网成功的回调,隐藏下拉刷新的状态
					mescroll.endSuccess();
					//设置列表数据
					this.rewardList.unshift(data[0]);
				}, () => {
					//联网失败的回调,隐藏下拉刷新的状态
					mescroll.endErr();
				})
			},
			/*上拉加载的回调: mescroll携带page的参数, 其中num:当前页 从1开始, size:每页数据条数,默认10 */
			upCallback(mescroll) {
				//联网加载数据
				this.getListDataFromNet(mescroll.num, mescroll.size, (curPageData, totalSize) => {

					mescroll.endBySize(curPageData.length, totalSize);
					//设置列表数据
					this.rewardList = this.rewardList.concat(curPageData);
				}, () => {
					//联网失败的回调,隐藏下拉刷新的状态
					mescroll.endErr();
				})
			},
			getListDataFromNet(pageNum, pageSize, successCallback, errorCallback) {
				let listData = [];
				this.$http
					.request({
						url: "refund",
						method: "get",
						params: {
							'expand': 'order,order.orderProducts,order.orderProducts.product',
							'page': pageNum,
							'per-page': pageSize
						}
					})
					.then(res => {
						listData = (res.data.items);
						successCallback && successCallback(listData, res.data._meta.totalCount);
					});
			}
		}
	}
</script>

<style lang="scss">
	page {
		height: 100%;
	}

	.back-list {
		height: 100%;
		background: #f5f5f5;

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

					&:after {
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
	}
</style>
