<template>
	<view class="meeting-page">
		<commom-top :lightIndex="lightIndex"></commom-top>
		<scroll-view id="nav-bar" class="nav-bar" scroll-x scroll-with-animation :scroll-left="scrollLeft">
			<view 
				v-for="(item,index) in tabBars" :key="index"
				class="nav-item"
				:class="{current: index === tabCurrentIndex}"
				:id="'tab'+index"
				@click="changeTab(index)"
			>{{item.name}}</view>
		</scroll-view>
		
		<!-- 下拉刷新组件 -->
		<mix-pulldown-refresh ref="mixPulldownRefresh" class="panel-content" :top="90" @refresh="onPulldownReresh" @setEnableScroll="setEnableScroll">
			<!-- 内容部分 -->
			<swiper 
				id="swiper"
				class="swiper-box" 
				:duration="300" 
				:current="tabCurrentIndex" 
				@change="changeTab"
			>
				<swiper-item v-for="tabItem in tabBars" :key="tabItem.id">
					<scroll-view 
						class="panel-scroll-box" 
						:scroll-y="enableScroll" 
						@scrolltolower="loadMore"
						>
						
						<view v-for="(item, index) in tabItem.newsList" :key="index" class="news-item" @click="navToDetails(item)">
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
						
						<!-- 上滑加载更多组件 -->
						<mix-load-more :status="tabItem.loadMoreStatus"></mix-load-more>
					</scroll-view>
				</swiper-item>
			</swiper>
		</mix-pulldown-refresh>
		<!-- <view class="bottom-line">-- 我是有底线的卡瑞塔 --</view> -->
	</view>
</template>

<script>
	import commomTop from "./index.vue";
	import mixPulldownRefresh from '@/components/mix-pulldown-refresh/mix-pulldown-refresh';
	import mixLoadMore from '@/components/mix-load-more/mix-load-more';
	let windowWidth = 0, scrollTimer = false, tabBar;
	export default {
		data(){
			return{
				lightIndex:1,
				tabCurrentIndex: 0, //当前选项卡索引
				scrollLeft: 0, //顶部选项卡左滑距离
				tabBars:[
					{name:'限时特惠',newsList:[1,2,3]},
					{name:'全部商品',newsList:[2]},
				],
				enableScroll: true,
			}
		},
		components: {
			commomTop,
			mixPulldownRefresh,
			mixLoadMore,
		},
		methods:{
			//获得元素的size
			getElSize(id) { 
				return new Promise((res, rej) => {
					let el = uni.createSelectorQuery().select('#' + id);
					el.fields({
						size: true,
						scrollOffset: true,
						rect: true
					}, (data) => {
						res(data);
					}).exec();
				});
			},
			//tab切换
			async changeTab(e){
				if(scrollTimer){
					//多次切换只执行最后一次
					clearTimeout(scrollTimer);
					scrollTimer = false;
				}
				let index = e;
				//e=number为点击切换，e=object为swiper滑动切换
				if(typeof e === 'object'){
					index = e.detail.current
				}
				if(typeof tabBar !== 'object'){
					tabBar = await this.getElSize("nav-bar")
				}
				//计算宽度相关
				let tabBarScrollLeft = tabBar.scrollLeft;
				let width = 0; 
				let nowWidth = 0;
				//获取可滑动总宽度
				for (let i = 0; i <= index; i++) {
					let result = await this.getElSize('tab' + i);
					width += result.width;
					if(i === index){
						nowWidth = result.width;
					}
				}
				if(typeof e === 'number'){
					//点击切换时先切换再滚动tabbar，避免同时切换视觉错位
					this.tabCurrentIndex = index; 
				}
				//延迟300ms,等待swiper动画结束再修改tabbar
				scrollTimer = setTimeout(()=>{
					if (width - nowWidth/2 > windowWidth / 2) {
						//如果当前项越过中心点，将其放在屏幕中心
						this.scrollLeft = width - nowWidth/2 - windowWidth / 2;
					}else{
						this.scrollLeft = 0;
					}
					if(typeof e === 'object'){
						this.tabCurrentIndex = index; 
					}
					this.tabCurrentIndex = index; 
					
					
					//第一次切换tab，动画结束后需要加载数据
					let tabItem = this.tabBars[this.tabCurrentIndex];
					if(this.tabCurrentIndex !== 0 && tabItem.loaded !== true){
						this.loadNewsList();
						tabItem.loaded = true;
					}
				}, 300)
				
			},
			//请求数据
			loadNewsList(type){
				let tabItem = this.tabBars[this.tabCurrentIndex];
				
				//type add 加载更多 refresh下拉刷新
				if(type === 'add'){
					if(tabItem.loadMoreStatus === 2){
						return;
					}
					tabItem.loadMoreStatus = 1;
				}
				// #ifdef APP-PLUS
				else if(type === 'refresh'){
					tabItem.refreshing = true;
				}
				// #endif
				
				//setTimeout模拟异步请求数据
				setTimeout(()=>{
					let list = json.newsList;
					list.sort((a,b)=>{
						return Math.random() > .5 ? -1 : 1; //静态数据打乱顺序
					})
					if(type === 'refresh'){
						tabItem.newsList = []; //刷新前清空数组
					}
					list.forEach(item=>{
						item.id = parseInt(Math.random() * 10000);
						tabItem.newsList.push(item);
					})
					//下拉刷新 关闭刷新动画
					if(type === 'refresh'){
						this.$refs.mixPulldownRefresh && this.$refs.mixPulldownRefresh.endPulldownRefresh();
						// #ifdef APP-PLUS
						tabItem.refreshing = false;
						// #endif
						tabItem.loadMoreStatus = 0;
					}
					//上滑加载 处理状态
					if(type === 'add'){
						tabItem.loadMoreStatus = tabItem.newsList.length > 40 ? 2: 0;
					}
				}, 600)
			},
			//新闻详情
		}
	}
</script>

<style lang="scss">
	@import "../../common/common.scss";
	page{
		height: 100%;
		overflow: hidden;
	}
	.meeting-page{
		height: 100%;
		overflow: hidden;
		.nav-bar{
			position: relative;
			z-index: 10;
			height: 82rpx;
			white-space: nowrap;
			box-shadow: 0 2upx 8upx rgba(0,0,0,.06);
			background-color: #fff;
			.nav-item{
				display: inline-block;
				width: 50%;
				height: 82rpx;
				text-align: center;
				line-height:82rpx;
				font-size: 28rpx;
				color: $uni-text-color-grey;
				position: relative;
				&:after{
					content: '';
					width: 0;
					height: 0;
					border-bottom: 4upx solid $uni-bg-color;
					position: absolute;
					left: 50%;
					bottom: 0;
					transform: translateX(-50%);
					transition: .3s;
				}
			}
			.current{
				color: $uni-bg-color;
				&:after{
					width: 100%;
				}
			}
			.swiper-box{
				height: 100%;
			}
			
			.panel-scroll-box{
				height: 100%;
				
				.panel-item{
					background: #fff;
					padding: 30px 0;
					border-bottom: 2px solid #000;
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
