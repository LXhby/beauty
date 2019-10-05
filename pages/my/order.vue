<template>
	<view class="order-page" @touchstart="refreshStart" @touchmove="refreshMove" @touchend="refreshEnd">
		<!-- 刷新事件isRefresh需要异步操作返回resolve -->
		<refresh ref="refresh" @isRefresh='isRefresh'></refresh>
		<view class="navbar">
			<!-- 导航栏 agents导航栏标题 -->
			<navTab ref="navTab" :tabTitle="tabTitle" @changeTab='changeTab'></navTab>
		</view>
		<!-- swiper切换 swiper-item表示一页 scroll-view表示滚动视窗 -->
		<swiper style="min-height: 100vh;" :current="tabCurrentIndex" @change="swiperTab">
			<swiper-item v-for="(listItem,listIndex) in list" :key="listIndex">
				<scroll-view style="height: 100%;" scroll-y="true" @scrolltolower="lower1" scroll-with-animation>
					<view class='content'>
						<!-- 订单列表 -->
						<view v-for="(item,index) in listItem" :key="index" class="order-item">
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
									<button type="primary" class="dark">提醒发货</button>
								</view>
								<view v-if="item.status === '待收货'" class="right-btn uni-flex uni-row">
									<button type="primary" class="blue btn1" @click="drawBack(item.id)">申请退款</button>
									<button type="primary" class="dark">确认发货</button>
								</view>
								<view v-if="item.status === '待评价'" class="right-btn uni-flex uni-row">
									<button type="primary" class="blue btn1">再来一单</button>
									<button type="primary" class="dark">评价有奖</button>
								</view>
							</view>


						</view>
					</view>
					<view class='noCard' v-if="listItem.length===0">
						暂无信息
					</view>
					<view style="width: 100%;height: 100upx;opacity:0;">底部占位盒子</view>
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>

</template>

<script>
	const util = require('@/util/util.js');
	import {
		mapGetters
	} from "vuex";
	import refresh from '@/components/refresh.vue';
	import navTab from '@/components/navTab.vue';
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
	export default {
		components: {
			uniLoadMore,
			navTab,
			refresh
		},
		computed: {
			...mapGetters(["userInfo"])
		},
		data() {
			return {
				userId: 1,
				tabCurrentIndex: 0,
				currentPage: 'index',
				tabTitle: ['全部', '待付款', '待发货', '待收货', '待评价'], //导航栏格式 --导航栏组件
				currentTab: 0, //sweiper所在页
				pages: [1, 1, 1, 1], //第几个swiper的第几页
				list: [
					[],
					[],
					[],
					[],
					[]
				], //数据格式
				navList: [{
						state: 0,
						text: '全部',
						loadingType: 'more',
						orderList: []
					},
					{
						state: 1,
						text: '待付款',
						loadingType: 'more',
						orderList: []
					},
					{
						state: 2,
						text: '待发货',
						loadingType: 'more',
						orderList: []
					},
					{
						state: 3,
						text: '待收货',
						loadingType: 'more',
						orderList: []
					},
					{
						state: 4,
						text: '待评价',
						loadingType: 'more',
						orderList: []
					}
				],
				menuLists: [{
						state: 1,
						time: "2019-01-04"
					},
					{

						state: 2,
						time: "2019-01-04"
					},
					{
						state: 3,
						time: "2019-01-04"
					},
					{
						state: 4,
						time: "2019-01-04"
					},
					{

						time: "2019-01-04"
					},
				]
			}
		},
		// 		onLoad(options) {
		// 			/**
		// 			 * 修复app端点击除全部订单外的按钮进入时不加载数据的问题
		// 			 * 替换onLoad下代码即可
		// 			 */
		// 			console.log('tabCurrentIndex', this.tabCurrentIndex)
		// 			console.log('options.state', options.state)
		// 			this.tabCurrentIndex = +options.state;
		// 			// #ifndef MP
		// 			this.loadData()
		// 			// #endif
		// 			// #ifdef MP
		// 			if (options.state == 0) {
		// 				this.loadData()
		// 			}
		// 			// #endif
		// 
		// 		},
		onLoad() {
			this.changeTab(this.$route.query.state)
			this.$http.request({
				url: 'order?OrderSearch[user_id]=' + this.userInfo.id,
				method: 'get',
				params: {
					'expand': 'orderProducts,orderProducts.product'
				}
			}).then(res => {
				this.list[0] = res.data.items
				res.data.items.forEach(ele => {
					if (ele.status === '待付款') {
						this.list[1].push(ele)
					} else if (ele.status === '待发货') {
						this.list[2].push(ele)
					} else if (ele.status === '待收货') {
						this.list[3].push(ele)
					} else if (ele.status === '待评价') {
						this.list[4].push(ele)
					}
				})
			}).catch(console.log)
		},
		methods: {
			// 立即付款
			goPay(orderId) {
				uni.navigateTo({
					url: '/pages/my/toPay?orderId=' + orderId,
				})
			},
			// 申请退款
			drawBack(orderId) {
				uni.navigateTo({
					url: '/pages/my/drawback?orderId=' + orderId,
				})
			},
			changeTab(index) {
				this.tabCurrentIndex = index
			},
			// 其他请求事件 当然刷新和其他请求可以写一起 多一层判断。
			isRequest(pages) {
				return new Promise((resolve, reject) => {
					this.pages[this.currentTab]++
					var that = this
					setTimeout(() => {
						uni.hideLoading()
						uni.showToast({
							icon: 'none',
							title: `请求第${that.currentTab + 1 }个导航栏的第${that.pages[that.currentTab]}页数据成功`
						})
						let newData = ['新数据1', '新数据2', '新数据3']
						resolve(newData)
					}, 1000)
				})
			},
			// swiper 滑动
			swiperTab(e) {
				console.log(e)
				var index = e.detail.current //获取索引
				if (this.tabTitle.length <= 5) {
					this.$refs.navTab.navClick(index)
				} else {
					this.$refs.navTab.longClick(index)
				}
			},
			// 加载更多 util.throttle为防抖函数
			lower1: util.throttle(function(e) {
				console.log(`加载${this.currentTab}`) //currentTab表示当前所在页数 根据当前所在页数发起请求并带上page页数
				uni.showLoading({
					title: '加载中',
					mask: true
				})
				this.isRequest().then((res) => {
					let tempList = this.list
					tempList[this.currentTab] = tempList[this.currentTab].concat(res)
					console.log(tempList)
					this.list = tempList
					this.$forceUpdate() //二维数组，开启强制渲染
				})
			}, 300),
			// 刷新touch监听
			refreshStart(e) {
				this.$refs.refresh.refreshStart(e);
			},
			refreshMove(e) {
				this.$refs.refresh.refreshMove(e);
			},
			refreshEnd(e) {
				this.$refs.refresh.refreshEnd(e);
			},
			isRefresh() {
				setTimeout(() => {
					uni.showToast({
						icon: 'success',
						title: '刷新成功'
					})
					this.$refs.refresh.endAfter() //刷新结束调用
				}, 1000)
			},
			godetail(orderId) {
				uni.navigateTo({
					url: '/pages/my/orderinfo?orderId=' + orderId,
				})
			},
			// 			//获取订单列表
			// 			loadData(source) {
			// 				//这里是将订单挂载到tab列表下
			// 				let index = this.tabCurrentIndex;
			// 				let navItem = this.navList[index];
			// 				let state = navItem.state;
			// 				console.log(navItem)
			// 				if (source === 'tabChange' && navItem.loaded === true) {
			// 					//tab切换只有第一次需要加载数据
			// 					return;
			// 				}
			// 				if (navItem.loadingType === 'loading') {
			// 					//防止重复加载
			// 					return;
			// 				}
			// 
			// 				navItem.loadingType = 'loading';
			// 
			// 				setTimeout(() => {
			// 					let orderList = this.menuLists.filter(item => {
			// 						//演示数据所以自己进行状态筛选
			// 						if (state === 0) {
			// 							//0为全部订单
			// 							return item;
			// 						}
			// 						return item.state === state
			// 					});
			// 					orderList.forEach(item => {
			// 						navItem.orderList.push(item);
			// 					})
			// 					console.log(navItem)
			// 					//loaded新字段用于表示数据加载完毕，如果为空可以显示空白页
			// 					this.$set(navItem, 'loaded', true);
			// 
			// 					//判断是否还有数据， 有改为 more， 没有改为noMore 
			// 					navItem.loadingType = 'more';
			// 				}, 600);
			// 			},
			// 
			// 			//swiper 切换
			// 			// changeTab(e) {
			// 			// 	this.tabCurrentIndex = e.target.current;
			// 			// 	this.loadData('tabChange');
			// 			// },
			// 			//顶部tab点击
			// 			tabClick(index) {
			// 				this.tabCurrentIndex = index;
			// 			},
			// 			//删除订单
			// 			deleteOrder(index) {
			// 				uni.showLoading({
			// 					title: '请稍后'
			// 				})
			// 				setTimeout(() => {
			// 					this.navList[this.tabCurrentIndex].orderList.splice(index, 1);
			// 					uni.hideLoading();
			// 				}, 600)
			// 			},
			// 			//取消订单
			// 			cancelOrder(item) {
			// 				uni.showLoading({
			// 					title: '请稍后'
			// 				})
			// 				setTimeout(() => {
			// 					let {
			// 						stateTip,
			// 						stateTipColor
			// 					} = this.orderStateExp(9);
			// 					item = Object.assign(item, {
			// 						state: 9,
			// 						stateTip,
			// 						stateTipColor
			// 					})
			// 
			// 					//取消订单后删除待付款中该项
			// 					let list = this.navList[1].orderList;
			// 					let index = list.findIndex(val => val.id === item.id);
			// 					index !== -1 && list.splice(index, 1);
			// 
			// 					uni.hideLoading();
			// 				}, 600)
			// 			},

		}
	}
</script>

<style lang="scss" scoped>
	page {
		width: 100%;
		height: 100%;
	}

	.order-page {
		background: #f1f1f1;
		height: 100%;

		.navbar {
			display: flex;
			height: 40px;
			background: #fff;
			box-shadow: 0 1px 5px rgba(0, 0, 0, .06);
			position: relative;
			z-index: 10;

			.nav-item {
				flex: 1;
				display: flex;
				justify-content: center;
				align-items: center;
				height: 100%;
				font-size: 15px;
				color: $uni-text-color;
				position: relative;

				&.current {
					color: $uni-bg-color;

					&:after {
						content: '';
						position: absolute;
						left: 50%;
						bottom: 0;
						transform: translateX(-50%);
						width: 44px;
						height: 0;
						border-bottom: 2px solid $uni-bg-color;
					}
				}
			}
		}

		.swiper-box {
			height: 100%;

			.tab-content {
				overflow: auto;
			}
		}

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
				}

				.detail {
					color: $uni-text-color;
					background: #ddd;
				}

				.btn1 {
					margin-right: 20rpx;
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
