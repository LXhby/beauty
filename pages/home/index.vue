<template>
	<view class="home-page">
		<tabs-sticky v-if="isShowSticky" v-model="tabIndex" :fixed="true" :tabs="tabs" @change="changeTab"></tabs-sticky>
		<mescroll-uni @down="downCallback" @up="upCallback" :up="upOption" @scroll="scroll" @init="mescrollInit" @topclick="topClick">
			<top-bar rightText="店铺设置" :detailist="detailist" :isreal="isreal"></top-bar>
			<view class="active-nav">
				<view class="list uni-row uni-flex" style="justify-content: space-around;margin-bottom: 35rpx;">
					<view class="item"  style="text-align: center;" @click="goPage('/pages/benefits/meeting')">
						<view class="text-one" >
							<image class="image" src="../../static/meeting.png" mode="widthFix" />
						</view>
						<text class="text">会议活动</text>
					</view>
					<view class="item"  style="text-align: center;" @click="goPage('/pages/benefits/preferential')">
						<view class="text-one" >
							<image class="image" src="../../static/promotion.png" mode="widthFix" />
						</view>
						<text class="text">特实惠</text>
					</view>
					<view class="item"  style="text-align: center;" @click="goPage('/pages/benefits/integral')">
						<view class="text-one" >
							<image class="image" src="../../static/integral.png" mode="widthFix" />
						</view>
						<text class="text">积分购</text>
					</view>
					<view class="item"  style="text-align: center;" @click="goPage('/pages/benefits/upvue')">
						<view class="text-one" >
							<image class="image" src="../../static/vip.png" mode="widthFix" />
						</view>
						<text class="text">升级VIP</text>
					</view>
				</view>
			</view>
			<!-- 限时特惠 -->
			<view class="goods-example uni-flex uni-row" v-if="adverList.length">
				<view class="preferential" @click="goDetail(adverList[0])">
					<image :src="url+adverList[0].image" mode="widthFix" class="adver-img"></image>
					<!-- <view class="hot-right">
					<text class="iconfont">&#xe6c6;</text>
					<text class="text1">热</text>
					<text class="text2">销</text>
				</view>
				<view class="title">
					店主推荐
				</view>
				<text class="sub-title">
					今日热销产品
				</text>
				<view class="image-box uni-flex uni-row">
					<image src="../../static/cp01.png" class="good-image" mode="widthFix"></image>
					<view class="circle">
						￥10.00
					</view>
				</view>
				<view class="word-black">美白美金美白美金</view> -->
				</view>
				<view class="uni-flex uni-column goods-right">
					<view class="top" @click="goDetail(adverList[1])">
						<image :src="url+adverList[1].image" mode="widthFix" class="adver-img"></image>
						<!-- <view class="top-main">
						<view class="text">
							<text class="title">美白黄金</text>
							<view class="subtitle">
								美白修复
							</view>
						</view>
						<view class="money">
							88元 / 盒
						</view>
					</view>
					<image src="../../static/cp01.png" mode="aspectFit"></image> -->
					</view>
					<view class="top" @click="goDetail(adverList[2])">
						<image :src="url+adverList[2].image" mode="widthFix" v-if="adverList.length" class="adver-img"></image>
						<!-- <view class="top-main">
						<view class="text">
							<text class="title">美白黄金</text>
							<view class="subtitle">
								美白修复
							</view>
						</view>
						<view class="money">
							88元 / 盒
						</view>
					</view>
					<image src="../../static/cp01.png" mode="aspectFit"></image> -->
					</view>
				</view>
			</view>


			<view class="swiper-box">
				<swiper class="swiper" :indicator-dots="true" :autoplay="true" :interval="interval" :duration="duration" :circular="true">
					<swiper-item v-for="(item,index) in bannerList" :key="index">
						<image :src="url+item.image" mode="aspectFill"></image>
					</swiper-item>
				</swiper>
			</view>



			<view id="tabInList">
				<tabs-sticky v-model="tabIndex" :tabs="tabs" @change="changeTab"></tabs-sticky>
			</view>
			<!-- 筛选条件 -->
			<view :class="[{ 'active': isShowSticky }, 'screen-btn','uni-flex','uni-row']"  v-if="tabIndex == 0">
				<view :class="[{'active-sort':sortType.indexOf('price') != -1},'price']" @click="handlesort('price')">
					<text>价格</text>
					<text class="iconfont ">&#xe71c;</text>
				</view>
				<view :class="[{'active-sort':sortType.indexOf('discount') != -1},'price']" @click="handlesort('discount')">
					<text>折扣</text>
					<text class="iconfont ">&#xe71c;</text>
				</view>
				<view :class="[{'active-sort':sortType.indexOf('sold_count') != -1},'price']" @click="handlesort('sold_count')">
					<text>销量</text>
					<text class="iconfont ">&#xe71c;</text>
				</view>
				<view class="price all">
					<sl-filter :independence="true" color="#000000" themeColor="#000000" :menuList.sync="menuList" @result="result" ></sl-filter>
				</view>
			</view>
			<!-- 数据列表 -->
			<pd-list :list="pdList" :type="tabs[tabIndex].name"></pd-list>
		</mescroll-uni>
	</view>
</template>

<script>
	const util = require('@/util/util.js');
	import refresh from '@/components/refresh.vue';
	import navTab from '@/components/navTab.vue';
	import topBar from "@/components/account/index1.vue";
	import uniGrid from '@/components/uni-grid/uni-grid.vue'
	import uniGridItem from '@/components/uni-grid-item/uni-grid-item.vue'
	import MescrollUni from "@/components/mescroll-uni/mescroll-uni.vue";
	import TabsSticky from "@/components/other/tabs-home.vue";
	import PdList from "@/components/other/home-list.vue";
	import slFilter from '@/components/sl-filter/sl-filter.vue';
	import {mapGetters} from "vuex";
	export default {
		components: {
			navTab,
			topBar,
			uniGrid,
			uniGridItem,
			MescrollUni,
			TabsSticky,
			PdList,
			slFilter
		},
		data() {
			return {
				detailist: ["可提现", "待提现", "产品额度"],
				bannerList: [],
				mescroll: null, //mescroll实例对象
				url: '',
				adverList: [],
				currentPage: 'index',
				tabs: ['全部商品', '积分商品'], //导航栏格式 --导航栏组件
				tabIndex: 0, // 当前菜单下标
				navTop: null, // nav距离到顶部的距离 (如计算不准确,可直接写死某个值)
				isShowSticky: false, // 是否悬浮
				pdList: [], // 数据列表
				interval: 2000,
				duration: 1000,
				isreal: false,
				upOption: {
					noMoreSize: 1,
					textNoMore: "-- 我是有底线的卡瑞塔 --",
					onScroll: true, // 是否监听滚动
				},
				menuList: [{
					'title': '全部商品',
					'key': 'sort',
					'isSort': true,
					'reflexTitle': true,
					'detailList': [{
						'title': '全部商品',
						'value': ''
					}
					]
				}],
				sortType:'',
				category_id:''
			}
		},
		onLoad() {
			uni.showLoading({
				title: "加载中"
			});
			// 获取轮播图
			this.$http
				.request({
					url: "carousels",
					method: "get",
					params: {
						"CarouselSearch[group]": "home"
					}
				})
				.then(res => {
					this.bannerList = res.data.items;
					this.url = this.$baseUrl;
				});
			this.getadvertising();
			// 获取商品分类
			this.$http
				.request({
					url: "product-categories",
					method: "get"
				})
				.then(res => {
					if (res.data.items.length) {
						var datalist = res.data.items;
						datalist.forEach(item => {
							var obj = {
								title: item.name,
								value: item.id
							}
							this.menuList[0].detailList.push(obj);
						})
						console.log(this.menuList[0].detailList)
					}


				});
		},
		methods: {
			result(val) {
				this.category_id = val.sort;
				this.mescroll.resetUpScroll()
			},
			handlesort(item){
				if(!this.sortType){
					this.sortType = item;
				}else{
					console.log()
					if(this.sortType.indexOf(item) != -1){
						if(this.sortType.indexOf('-') != -1){
							this.sortType = item
						}else{
							this.sortType = '-'+item
						}
						
					}else{
						this.sortType = item;
					}
				}
				this.mescroll.resetUpScroll()
			},
			// 获取广告
			getadvertising() {
				this.$http.request({
					url: 'link',
					params: {
						"LinkSearch[group]": "home"
					}
				}).then(res => {
					uni.hideLoading();
					this.adverList = res.data.items;
				})
			},
			goPage(event) {
				
				uni.navigateTo({
					url: event
				});

			},
			goDetail(item) {
				console.log(item)
				this.$Router.push({
					name: item.route_name,
					query: {
						id: item.params_id
					}
				})
				// uni.navigateTo({
				// 	url: '/pages/home/detail'
				// });
			},
			// 切换tab
			mescrollInit(mescroll) {
				this.mescroll = mescroll;
			},
			downCallback(mescroll) {
				mescroll.resetUpScroll()
			},
			upCallback(mescroll) {
				//联网加载数据
				if (this.isChangeTab) {
					mescroll.hideUpScroll(); // 切换菜单,不显示mescroll进度, 显示系统进度条
					uni.showLoading();
				}
				this.getListDataFromNet(mescroll.num, mescroll.size, (curPageData,totalSize) => {
					//联网成功的回调
					console.log("mescroll.num=" + mescroll.num + ", mescroll.size=" + mescroll.size + ", curPageData.length=" +
						curPageData.length);

					//设置列表数据
					if (mescroll.num == 1) this.pdList = []; //如果是第一页需手动制空列表
					this.pdList = this.pdList.concat(curPageData); //追加新数据
					console.log('this.pdList', this.pdList)
					// 数据渲染完毕再隐藏加载状态
					this.$nextTick(() => {
						mescroll.endBySize(curPageData.length, totalSize);
						// 设置nav到顶部的距离 (需根据自身的情况获取navTop的值, 这里放到列表数据渲染完毕之后)
						// 也可以放到onReady里面,或者菜单顶部的数据(轮播等)加载完毕之后..
						if (!this.navTop) this.setNavTop()
						// 保持tab悬浮,列表数据显示第一条
						if (this.isChangeTab) {
							this.isChangeTab = false;
							uni.hideLoading();
							if (this.isShowSticky) mescroll.scrollTo(this.navTop, 0)
						}
					})
				}, () => {
					//联网失败的回调,隐藏下拉刷新的状态
					mescroll.endErr();
				})
			},
			setNavTop() {
				let view = uni.createSelectorQuery().in(this).select('#tabInList');
				view.boundingClientRect(data => {
					console.log('tabInList基本信息 = ' + JSON.stringify(data));
					this.navTop = data.top // 到屏幕顶部的距离
				}).exec();
			},
			scroll(mescroll) {
				if (mescroll.getScrollTop() >= this.navTop) {
					this.isShowSticky = true // 显示悬浮菜单
				} else {
					this.isShowSticky = false // 隐藏悬浮菜单
				}
			},
			topClick() {
				this.isShowSticky = false
			},
			changeTab(index) {
				this.isChangeTab = true;
				this.mescroll.resetUpScroll()
			},
			getListDataFromNet(pageNum, pageSize, successCallback, errorCallback) {

				try {
					let listData = []
					console.log('tabIndex', this.tabIndex)
					this.$http
						.request({
							url: "products",
							method: "get",
							params: {
								page: pageNum,
								"per-page": pageSize,
								'ProductSearch[is_enabled]':1,
								'ProductSearch[is_coin_usable]':this.tabIndex?1:0,
								sort:this.sortType,
								'ProductSearch[category_id]':this.category_id
							}
						})
						.then(res => {
							listData = (res.data.items);
							successCallback && successCallback(listData,res.data._meta.totalCount);
						});

				} catch (e) {
					//联网失败的回调
					errorCallback && errorCallback();
				}

			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "../../common/common.scss";

	.home-page {
		.active-nav {
			margin-top:15rpx;
			padding:0 20rpx;
			.text-one {
				width: 90rpx;
				height: 90rpx;
				.image{
					width: 100%;
					height: 90rpx;
				}
			}

			.text {
				font-size: 24rpx;
				color: $uni-text-color;
			}
		}

		// 限时特惠
		.goods-example {
			border-top: 20rpx solid #f5f5f5;
			width: 100%;

			.sub-title {
				margin-left: 20rpx;
				font-size: 20rpx;
				color: $uni-text-color-grey;
			}

			.preferential {
				width: 50%;
				position: relative;
				border-right: 1px solid #f4f4f4;

				.adver-img {
					width: 100%;
				}

				.hot-right {
					position: absolute;
					right: 0px;
					top: 0px;
					width: 70rpx;
					height: 80rpx;


					.iconfont {
						margin-top: -2rpx;
						vertical-align: top;
						font-size: 70rpx;
						color: $uni-bg-color;
					}

					text {
						position: absolute;
						top: 0;
						bottom: 0;
						left: 0;
						right: 0;
						margin: auto auto;
						color: #fff;
						font-size: 20rpx;

					}

					.text1 {
						margin-left: 26rpx;
					}

					.text2 {
						margin-top: 23rpx;
						margin-left: 46rpx;
					}
				}

				.title {
					padding: 20rpx 0 0 20rpx;
					color: $uni-bg-color;
					font-size: 32rpx;
					line-height: 32rpx;
				}

				.image-box {
					padding: 0 40rpx;
					margin-top: 20rpx;
					justify-content: space-between;

					.good-image {
						width: 160rpx;
						padding-top: 20rpx;
					}

					.circle {
						width: 106rpx;
						height: 106rpx;

						background: #fce0f5;
						border-radius: 50%;
						text-align: center;
						line-height: 106rpx;
						font-size: 20rpx;
						color: $uni-bg-color-grey;
					}
				}

				.word-black {
					margin-top: 26rpx;
					margin-left: 16rpx;
					font-size: 28rpx;
					line-height: 32rpx;
					color: #333;
				}
			}

			.goods-right {
				width: 50%;

				.top {
					display: flex;
					justify-content: space-between;
					padding: 20rpx;
					border-bottom: 1px solid #f4f4f4;

					.adver-img {
						width: 100%;
					}

					.text {
						color: #333;

						.title {
							font-size: 28rpx;
							line-height: 32rpx;
						}

						.subtitle {
							margin-left: 5rpx;
							font-size: 20rpx;
							color: $uni-text-color-grey;
						}
					}

					.money {
						margin-top: 40rpx;
						height: 40rpx;
						line-height: 40rpx;
						padding: 0 16rpx;
						border-radius: 20rpx;
						font-size: 20rpx;
						color: $uni-bg-color-grey;
						background: #fce0f5;
					}

					image {
						width: 140rpx;
						height: 140rpx;
					}
				}
			}
		}

		// 筛选
		.active{
			width:100%;
			height:80rpx;
			position: fixed;
			z-index: 998;
			top: 80rpx;
			left: 0;
			width: 100%;
		}
		.active-sort{
			color: $uni-bg-color;
		}
		.screen-btn {
			justify-content: space-around;
			height: 80rpx;
			border-bottom: 20rpx solid #f5f5f5;
			background: #fff;
			.price {
				font-size: 28rpx;

				text {
					line-height: 80rpx;
				}

				.iconfont {
					margin-left: 4rpx;
					font-size: 22rpx;
					color: $uni-text-color-grey;
				}
			}

			.all {
				.iconfont {
					font-size: 24rpx;
					color: $uni-text-color;
				}
			}
		}

		// .item {
		// 	padding: 20rpx;
		// 	justify-content: space-between;
		// 	align-items: center;
		// 	border-bottom: 20rpx solid $uni-border-color;

		// 	.left {
		// 		color: $uni-text-color;

		// 		image {
		// 			width: 200rpx;
		// 			height: 150rpx;
		// 			margin-right: 20rpx;
		// 		}

		// 		.detail {
		// 			width: 240rpx;

		// 			.title {
		// 				font-size: 28rpx;
		// 			}

		// 			.bottom {
		// 				margin-top: 26rpx;

		// 				text {
		// 					font-size: 22rpx;
		// 					color: $uni-bg-color;
		// 				}
		// 			}
		// 		}
		// 	}

		// 	.right {
		// 		text-align: center;
		// 		color: $uni-text-color;

		// 		.dark-color {
		// 			color: $uni-bg-color;
		// 			font-size: 24rpx;
		// 		}

		// 		.money {
		// 			font-size: 24rpx;

		// 			.num {
		// 				font-size: 32rpx;
		// 			}
		// 		}

		// 		.btn {
		// 			width: 140rpx;
		// 			height: 45rpx;
		// 			margin-top: 8rpx;
		// 			border-radius: 45rpx;
		// 			background: $uni-bg-color;
		// 			text-align: center;
		// 			color: #fff;
		// 			line-height: 45rpx;
		// 			font-size: 24rpx;
		// 		}
		// 	}
		// }

	}
</style>
<style lang="scss">
	.home-page {
		.swiper-box {
			padding: 20rpx;
			border-top: 20rpx solid #f5f5f5;
			border-bottom: 20rpx solid #f5f5f5;

			.swiper {
				overflow: hidden;
				height: 180rpx;
				border-radius: 5px;

				image {
					width: 100%;
					height: 100%;
				}
			}

		}

		.all {
			.select-tab-item {
				width: 100% !important;
				line-height: 80rpx;
			}
		}
	}

	.navbar {
		.navTabBox {
			.shortTab {
				.underlineBox {
					.underline {
						width: 200rpx;
					}
				}
			}
		}

	}
</style>
