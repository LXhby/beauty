<template>
	<view class="home-page">
		<top-bar rightText="店铺设置" :detailist="detailist" :isreal="false"></top-bar>
		<view class="active-nav">
			<uni-grid :column="4" :show-border="false" :square="false" @change="goPage">
				<uni-grid-item>
					<image class="image" src="../../static/meeting.png" mode="aspectFill" />
					<text class="text">会议活动</text>
				</uni-grid-item>
				<uni-grid-item>
					<image class="image" src="../../static/promotion.png" mode="aspectFill" />
					<text class="text">特实惠</text>
				</uni-grid-item>
				<uni-grid-item>
					<image class="image" src="../../static/integral.png" mode="aspectFill" />
					<text class="text">积分购</text>
				</uni-grid-item>
				<uni-grid-item>
					<image class="image" src="../../static/vip.png" mode="aspectFill" />
					<text class="text">升级VIP</text>
				</uni-grid-item>
			</uni-grid>
		</view>
		<!-- 限时特惠 -->
		<view class="goods-example uni-flex uni-row">
			<view class="preferential" @click="goDetail">
				<view class="hot-right">
					<text class="iconfont">&#xe6c6;</text>
					<text class="text1">热</text>
					<text class="text2">销</text>
				</view>
				<view class="title">
					限时特惠
				</view>
				<text class="sub-title">
					今日推荐特实惠
				</text>
				<view class="image-box uni-flex uni-row">
					<image src="../../static/cp01.png" class="good-image" mode="widthFix"></image>
					<view class="circle">
						￥10.00
					</view>
				</view>
				<view class="word-black">美白美金美白美金</view>
			</view>
			<view class="uni-flex uni-column goods-right">
				<view class="top">
					<view class="top-main">
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
					<image src="../../static/cp01.png" mode="aspectFit"></image>
				</view>
				<view class="top">
					<view class="top-main">
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
					<image src="../../static/cp01.png" mode="aspectFit"></image>
				</view>
			</view>
		</view>


		<view class="swiper-box">
			<swiper class="swiper" :indicator-dots="true" :autoplay="true" :interval="interval" :duration="duration" :circular="true">
				<swiper-item>
					<image src="../../static/ad3.jpg" mode="aspectFill"></image>
				</swiper-item>
				<swiper-item>
					<image src="../../static/chuke.jpg" mode="aspectFill"></image>
				</swiper-item>
				<swiper-item>
					<image src="../../static/order_bm_bg.jpg" mode="aspectFill"></image>
				</swiper-item>
			</swiper>
		</view>

		<view class="navbar">
			<!-- 导航栏 agents导航栏标题 -->
			<navTab ref="navTab" :tabTitle="tabTitle" @changeTab='changeTab'></navTab>
		</view>
		<!-- swiper切换 swiper-item表示一页 scroll-view表示滚动视窗 -->
		<swiper style="min-height: 100vh;" :current="tabCurrentIndex" @change="swiperTab">
			<swiper-item v-for="(listItem,listIndex) in list" :key="listIndex">
				<scroll-view style="height: 100%;" scroll-y="true" @scrolltolower="lower1" scroll-with-animation>
					<view class='content'>
						<view v-for="(item, index) in list" :key="index" class="news-item" @click="navToDetails(item)">
							<view class="item uni-flex uni-row">
								<view class="left uni-flex uni-row">
									<image src="../../static/ad3.jpg" mode="aspectFill"></image>
									<view class="detail">
										<text class="title">美白黄金美白黄金美白黄金美白黄金</text>
										<view class="bottom ">
											<text>限时购：3天18小时45秒</text>
										</view>
									</view>
								</view>
								
								<view class="right">
									<text class="dark-color">限时价</text>
									<view class="money">
										<text class="num">20600</text>
										<text>积分</text>
									</view>
									<view class="btn">
										+购物车
									</view>
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
		
		<view class="bottom-line">-- 我是有底线的卡瑞塔 --</view>
	</view>
</template>

<script>
	const util = require('@/util/util.js');
	import refresh from '@/components/refresh.vue';
	import navTab from '@/components/navTab.vue';
	import topBar from "@/components/account/index1.vue";
	import uniGrid from '@/components/uni-grid/uni-grid.vue'
	import uniGridItem from '@/components/uni-grid-item/uni-grid-item.vue'
	export default {
		components: {
			navTab,
			topBar,
			uniGrid,
			uniGridItem
		},
		data() {
			return {
				detailist: ["可提现", "待提现", "产品额度"],
				tabCurrentIndex: 0,
				currentPage: 'index',
				tabTitle: ['全部商品', '促销活动'], //导航栏格式 --导航栏组件
				currentTab: 0, //sweiper所在页
				pages: [1, 1, 1, 1], //第几个swiper的第几页
				list: [
					[1, 2, 3, 4, 5, 6],
					['a', 'b', 'c', 'd', 'e', 'f']
				], //数据格式
			}
		},
		methods: {
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
						let newData = ['新数据1','新数据2','新数据3']
						resolve(newData)
					}, 1000)
				})
			},
			// swiper 滑动
			swiperTab: function(e) {
				var index = e.detail.current //获取索引
				if(this.tabTitle.length<=5){
					this.$refs.navTab.navClick(index)
				}else{
					this.$refs.navTab.longClick(index)
				}
			},
			// 加载更多 util.throttle为防抖函数
			lower1: util.throttle(function(e) {
			console.log(`加载${this.currentTab}`)//currentTab表示当前所在页数 根据当前所在页数发起请求并带上page页数
			uni.showLoading({
				title: '加载中',
				mask:true
			})
				this.isRequest().then((res)=>{
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
			refreshMove(e){
				this.$refs.refresh.refreshMove(e);
			},
			refreshEnd(e) {
				this.$refs.refresh.refreshEnd(e);
			},
			isRefresh(){
					setTimeout(() => {
						uni.showToast({
							icon: 'success',
							title: '刷新成功'
						})
						this.$refs.refresh.endAfter() //刷新结束调用
					}, 1000)
			},
			goPage(event) {
				var index = event.detail.index;
				switch (index) {
					case 0:
						uni.navigateTo({
							url: '/pages/benefits/meeting'
						});
						break;
					case 1:
						uni.navigateTo({
							url: '/pages/benefits/preferential'
						});
						break;
					case 2:
						uni.navigateTo({
							url: '/pages/benefits/integral'
						});
						break;
					case 3:
						uni.navigateTo({
							url: '/pages/benefits/upvue'
						});
						break;
				}

			},
			goDetail() {
				uni.navigateTo({
					url: '/pages/home/detail'
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "../../common/common.scss";

	.home-page {
		.active-nav {
			.image {
				width: 90rpx;
				height: 90rpx;
			}

			.text {
				font-size: 24rpx;
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
		
		.item{
			padding: 20rpx;
			justify-content: space-between;
			align-items: center;
			border-bottom:20rpx solid $uni-border-color;
			.left{
				color:$uni-text-color;
				
				image{
					width: 200rpx;
					height: 150rpx;
					margin-right:20rpx;
				}
				.detail{
					width:240rpx;
					
					.title{
						font-size: 28rpx;
					}
					.bottom{
						margin-top:26rpx;
						text{
							font-size: 22rpx;
							color: $uni-bg-color;
						}
					}
				}
			}
			.right{
				text-align: center;
				color:$uni-text-color;
				.dark-color{
					color: $uni-bg-color;
					font-size: 24rpx;
				}
				.money{
					font-size: 24rpx;
					.num{
						font-size: 32rpx;
					}
				}
				.btn{
					width: 140rpx;
					height: 45rpx;
					margin-top:8rpx;
					border-radius: 45rpx;
					background: $uni-bg-color;
					text-align: center;
					color: #fff;
					line-height: 45rpx;
					font-size: 24rpx;
				}
			}
		}

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
