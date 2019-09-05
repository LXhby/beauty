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
	</view>
</template>

<script>
	import commomTop from "./index.vue";
	let windowWidth = 0, scrollTimer = false, tabBar;
	export default {
		data(){
			return{
				lightIndex:1,
				tabCurrentIndex: 0, //当前选项卡索引
				scrollLeft: 0, //顶部选项卡左滑距离
				tabBars:[
					{name:'限时特惠'},
					{name:'全部商品'},
				]
			}
		},
		components: {
			commomTop,
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
				console.log(e)
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
			loadNewsList(){}
		}
	}
</script>

<style lang="scss">
	.meeting-page{
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
	}
</style>
