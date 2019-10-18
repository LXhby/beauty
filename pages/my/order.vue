<template>
	<view class="order-page">
		<tabs-sticky v-model="tabType" :tabs="tabTitle" @change="changeTab"></tabs-sticky>
		<mescroll-uni :down="downOption" @down="downCallback" @up="upCallback" :up="upOption" top="80" @emptyclick="emptyClick" @init="mescrollInit">
			<!-- 数据列表 -->
			<pd-list :list="listItem"></pd-list>
		</mescroll-uni>
	</view>

</template>

<script>
	const util = require('@/util/util.js');
	import {
		mapGetters
	} from "vuex";
	import TabsSticky from "@/components/other/tabs-home.vue";
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
	
	import MescrollUni from "@/components/mescroll-uni/mescroll-uni.vue";
	import PdList from "@/components/other/orderlist.vue";
	export default {
		components: {
			uniLoadMore,
			TabsSticky,
	
			MescrollUni,
			PdList
		},
		computed: {
			...mapGetters(["userInfo"])
		},
		data() {
			return {
				userId: 1,
				tabType: 0,
				tabTitle: ['全部', '待付款', '待发货', '待收货', '待评价'], //导航栏格式 --导航栏组件
				listItem: [], //数据格式
				bottom: false,
				mescroll: null, //mescroll实例对象
				upOption: {
					noMoreSize: 1,
					textNoMore: "-- 我是有底线的卡瑞塔 --",
					onScroll: true, // 是否监听滚动
					empty: {
						tip: '~ 搜索无数据 ~', // 提示
						btnText: '去看看'
					}
				},
				downOption: {
					auto: false //是否在初始化后,自动执行下拉回调callback; 默认true
				},
				url: '',
				orderStatus: ''
			}
		},
		onLoad(option) {
			this.changeTab(option.state)
		},
		methods: {
			//点击空布局按钮的回调
			emptyClick() {
				uni.switchTab({
					url:'/pages/home/index'
				})
			},

			mescrollInit(mescroll) {
				this.mescroll = mescroll;
			},
			/*下拉刷新的回调 */
			downCallback(mescroll) {
				// 这里加载你想下拉刷新的数据, 比如刷新轮播数据
				// loadSwiper();
				// 下拉刷新的回调,默认重置上拉加载列表为第一页 (自动执行 mescroll.num=1, 再触发upCallback方法 )
				mescroll.resetUpScroll()
			},
			/*上拉加载的回调: mescroll携带page的参数, 其中num:当前页 从1开始, size:每页数据条数,默认10 */
			upCallback(mescroll) {
				//联网加载数据
				this.getListDataFromNet(mescroll.num, mescroll.size, (curPageData, totalSize) => {
					//联网成功的回调,隐藏下拉刷新和上拉加载的状态;
					mescroll.endBySize(curPageData.length, totalSize);
					//设置列表数据
					if (mescroll.num == 1) this.listItem = []; //如果是第一页需手动制空列表
					this.listItem = this.listItem.concat(curPageData); //追加新数据
				}, () => {
					//联网失败的回调,隐藏下拉刷新的状态
					mescroll.endErr();
				})
			},
			//点击空布局按钮的回调
			emptyClick() {
				uni.showToast({
					title: '点击了按钮,具体逻辑自行实现'
				})
			},

			// 切换菜单
			changeTab(type) {
				console.log('type',type)
				switch (type) {
					case 0:
						this.orderStatus = '';
						break;
					case 1:
						this.orderStatus = '待付款';
						break;
					case 2:
						this.orderStatus = '待发货';
						break;
					case 3:
						this.orderStatus = '待收货';
						break;
					case 4:
						this.orderStatus = '待评价';
						break;
				}
				
				this.mescroll.resetUpScroll() // 刷新列表数据
			},

			/*联网加载列表数据
			在您的实际项目中,请参考官方写法: http://www.mescroll.com/uni.html#tagUpCallback
			请忽略getListDataFromNet的逻辑,这里仅仅是在本地模拟分页数据,本地演示用
			实际项目以您服务器接口返回的数据为准,无需本地处理分页.
			* */
			getListDataFromNet(pageNum, pageSize, successCallback, errorCallback) {
				this.$http.request({
					url: 'order',
					method: 'get',
					params: {
						'OrderSearch[user_id]': this.userInfo.id,
						'OrderSearch[status]': this.orderStatus,
						'expand': 'orderProducts,orderProducts.product',
						'page': pageNum,
						'per-page': pageSize
					}
				}).then(res => {
					try {
						let listData = [];
						listData = res.data.items;
						successCallback && successCallback(listData, res.data._meta.totalCount);
					} catch (e) {
						//联网失败的回调
						errorCallback && errorCallback();
					}
				})
			}

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
	@import "@/common/common.scss";

	page {
		width: 100%;
		height: 100%;
	}

	.order-page {
		background: #f5f5f5;
		height: 100%;


		.swiper-box {
			height: 100%;

			.tab-content {
				overflow: auto;
			}
		}


		.coment-form {
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
			}

			.star {
				margin: 30rpx 0 20rpx 0;

				.iconfont {
					margin: 0 10rpx;
					color: #999;
				}

				.dark-color {
					color: $uni-bg-color;
				}
			}

		}

		.upload {
			padding: 0 40rpx;
			align-items: center;

			.up-image {
				display: flex;
				justify-content: center;
				align-items: center;
				width: 90rpx;
				height: 90rpx;
				margin-right: 10rpx;
				background: $uni-bg-color;
				border-radius: 5rpx;
			}

			.up-text {
				flex: 1;
				text-align: left;

				.title {
					padding-top: 0px;
					font-size: 24rpx;
				}

				text {
					color: $uni-text-color-grey;
					font-size: 20rpx;
					line-height: 20rpx;
				}
			}

			.iconfont {
				color: #fff;
				font-size: 46rpx;
			}
		}

		.noname {
			margin-top: 30rpx;
			padding-left: 40rpx;
			text-align: left;

			label {
				font-size: 24rpx;
			}
		}

		.uni-btnv {
			padding: 20rpx 0 40rpx 0;

			button {
				width: 276rpx;
				height: 54rpx;
				line-height: 54rpx;
				border-radius: 54rpx;
				color: #fff;
				font-size: 28rpx;
				background: $uni-bg-color;

				&:after {
					border: none;
				}
			}
		}


	}
</style>
