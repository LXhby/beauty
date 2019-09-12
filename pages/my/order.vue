<template>
	<view class="order-page">
		<view class="navbar">
			<view v-for="(item, index) in navList" :key="index" class="nav-item" :class="{current: tabCurrentIndex === index}"
			 @click="tabClick(index)">
				{{item.text}}
			</view>
		</view>
		<swiper :current="tabCurrentIndex" class="swiper-box" duration="300" @change="changeTab">
			<swiper-item class="tab-content" v-for="(tabItem,tabIndex) in navList" :key="tabIndex">
				<scroll-view class="list-scroll-content" scroll-y @scrolltolower="loadData">
					<!-- 空白页 -->
					<!-- <empty v-if="tabItem.loaded === true && tabItem.orderList.length === 0"></empty> -->

					<!-- 订单列表 -->
					<view v-for="(item,index) in tabItem.orderList" :key="index" class="order-item">
						<view class="top uni-flex uni-row">
							<view class="left">
								<text class="iconfont">&#xe608;</text>
								<text class="time">2019-09-02 15:00</text>
							</view>
							<text class="status">交易成功</text>
						</view>
						<view class="item-main uni-flex uni-row">
							<view class="left uni-flex uni-row">
								<image src="../../static/006tlvijgy1g6ldbo6anuj30e20e2wjb.jpg" mode="aspectFill"></image>
								<view class="item-title">
									<view class="name">
										家收到货氨基酸考得好发送加快速度哈弗
									</view>
									<text>套装产品加乳液</text>
								</view>
							</view>
							<view class="right">
								<view class="money">￥99</view>
								<text class="num">X1</text>
							</view>
						</view>
						<view class="item-main uni-flex uni-row">
							<view class="left uni-flex uni-row">
								<image src="../../static/006tlvijgy1g6ldbo6anuj30e20e2wjb.jpg" mode="aspectFill"></image>
								<view class="item-title">
									<view class="name">
										家收到货氨基酸考得好发送加快速度哈弗
									</view>
									<text>套装产品加乳液</text>
								</view>
							</view>
							<view class="right">
								<view class="money">￥99</view>
								<text class="num">X1</text>
							</view>
						</view>
						<view class="total uni-flex uni-row">
							<view class="total-glod">
								<text>赠送</text>
								<text class="dark-color">100</text>
								<text>个金币</text>
							</view>
							<view class="total-num uni-flex uni-row">
								<text class="heji">共2件商品</text>
								<view class="">
									<text >合计：</text>
									<text class="dark-color">￥128.00</text>
								</view>
							</view>
						</view>
						<view class="btn-list uni-flex uni-row">
							<button type="primary" class="detail" @click="godetail">订单详情</button>
							<view class="right-btn uni-flex uni-row">
								<button type="primary" class="blue btn1">申请退款</button>
								<button type="primary" class="dark">立即付款</button>
							</view>
						</view>


					</view>

					<uni-load-more :status="tabItem.loadingType"></uni-load-more>

				</scroll-view>
			</swiper-item>
		</swiper>
	</view>

</template>

<script>
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
	export default {
		components: {
			uniLoadMore,

		},
		data() {
			return {
				tabCurrentIndex: 0,
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
		onLoad(options) {
			/**
			 * 修复app端点击除全部订单外的按钮进入时不加载数据的问题
			 * 替换onLoad下代码即可
			 */
			console.log('tabCurrentIndex', this.tabCurrentIndex)
			console.log('options.state', options.state)
			this.tabCurrentIndex = +options.state;
			// #ifndef MP
			this.loadData()
			// #endif
			// #ifdef MP
			if (options.state == 0) {
				this.loadData()
			}
			// #endif

		},
		methods: {
			godetail(){
				uni.navigateTo({
					url:'/pages/my/orderinfo'
				})
			},
			//获取订单列表
			loadData(source) {
				//这里是将订单挂载到tab列表下
				let index = this.tabCurrentIndex;
				let navItem = this.navList[index];
				let state = navItem.state;
				console.log(navItem)
				if (source === 'tabChange' && navItem.loaded === true) {
					//tab切换只有第一次需要加载数据
					return;
				}
				if (navItem.loadingType === 'loading') {
					//防止重复加载
					return;
				}

				navItem.loadingType = 'loading';

				setTimeout(() => {
					let orderList = this.menuLists.filter(item => {
						//演示数据所以自己进行状态筛选
						if (state === 0) {
							//0为全部订单
							return item;
						}
						return item.state === state
					});
					orderList.forEach(item => {
						navItem.orderList.push(item);
					})
					console.log(navItem)
					//loaded新字段用于表示数据加载完毕，如果为空可以显示空白页
					this.$set(navItem, 'loaded', true);

					//判断是否还有数据， 有改为 more， 没有改为noMore 
					navItem.loadingType = 'more';
				}, 600);
			},

			//swiper 切换
			changeTab(e) {
				this.tabCurrentIndex = e.target.current;
				this.loadData('tabChange');
			},
			//顶部tab点击
			tabClick(index) {
				this.tabCurrentIndex = index;
			},
			//删除订单
			deleteOrder(index) {
				uni.showLoading({
					title: '请稍后'
				})
				setTimeout(() => {
					this.navList[this.tabCurrentIndex].orderList.splice(index, 1);
					uni.hideLoading();
				}, 600)
			},
			//取消订单
			cancelOrder(item) {
				uni.showLoading({
					title: '请稍后'
				})
				setTimeout(() => {
					let {
						stateTip,
						stateTipColor
					} = this.orderStateExp(9);
					item = Object.assign(item, {
						state: 9,
						stateTip,
						stateTipColor
					})

					//取消订单后删除待付款中该项
					let list = this.navList[1].orderList;
					let index = list.findIndex(val => val.id === item.id);
					index !== -1 && list.splice(index, 1);

					uni.hideLoading();
				}, 600)
			},

		}
	}
</script>

<style lang="scss" scoped>
	page{
		width: 100%;
		height: 100%;
	}
	.order-page {
		background:#f1f1f1;
		height: 100%;
		.navbar {
			display: flex;
			height: 40px;
			padding: 0 5px;
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
		.swiper-box{
			height: 100%;
			.tab-content{
				overflow: auto;
			}
		}
		.order-item{
			margin-top:20rpx;
			background:#fff;
			.top{
				height: 74rpx;
				padding: 0 30rpx;
				justify-content: space-between;
				align-items: center;
				border-bottom: 1px solid $uni-border-color;
				.left{
					line-height: 74rpx;
					color:$uni-text-color;
					.iconfont{
						font-size: 24rpx;
						margin-right: 8rpx;
						line-height: 74rpx;
					}
				}
				.status{
					color: $uni-bg-color;
				}
			}
			.item-main{
				margin:0 30rpx;
				padding: 30rpx 0;
				justify-content:space-between;
				border-bottom: 1px solid $uni-border-color;
				.left{
					width: 580rpx;
					
					image{
						overflow: hidden;
						width: 135rpx;
						height: 135rpx;
						margin-right: 20rpx;
						border-radius: 5px;
					}
					.item-title{
						.name{
							margin-bottom: 20rpx;
							font-size: 28rpx;
						}
						text{
							font-size: 24rpx;
							color: $uni-text-color-grey;
						}
					}
				}
				.right{
					flex:1;
					text-align:right;
					.money{
						
					}
					.num{
						font-size: 20rpx;
						color: $uni-text-color-grey;
					}
				}
			}
			.total{
				margin: 0 30rpx;
				height: 75rpx;
				justify-content:space-between;
				align-items: center;
				border-bottom: 1px solid $uni-border-color;
				.dark-color{
					color: $uni-bg-color;
				}
				.total-num{
					.heji{
						margin-right: 20rpx;
					}
				}
			}
			.btn-list{
				margin: 0 30rpx;
				padding: 20rpx 0;
				justify-content:space-between;
				button{
					display: flex;
					align-items: center;
					justify-content: center;
					width: 180rpx;
					height: 56rpx;
					border-radius: 56rpx;
					margin: 0px;
					font-size: 28rpx;
				}
				.detail{
					color: $uni-text-color;
					background: #ddd;
				}
				.btn1{
					margin-right: 20rpx;
				}
				.blue{
					color: #fff;
					background: #4aa3f0;
				}
				.dark{
					color: #fff;
					background-color: $uni-bg-color;
				}
			}
		}
	}
</style>
