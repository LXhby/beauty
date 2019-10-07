<!-- 菜单悬浮的原理: 监听滚动条的位置大于某个值时,控制顶部菜单的显示和隐藏 -->
<template>
	<view class="beautiful">
		<!-- 菜单 (悬浮,预先隐藏)-->
		<tabs-sticky v-if="isShowSticky" v-model="tabIndex" :fixed="true" :tabs="tabs" @change="changeTab"></tabs-sticky>
		
		<mescroll-uni @down="downCallback" @up="upCallback" :up="upOption" @scroll="scroll" @init="mescrollInit" @topclick="topClick" >
			<!--轮播-->
			<view class="swiper-box">
				<swiper class="swiper" indicator-dots="true" autoplay="true" :interval="interval" :duration="duration" :circular="true">
					<swiper-item v-for="(item,index) in bannerList" :key="index">
						<image :src="url+item.image" mode="aspectFill"></image>
					</swiper-item>
				</swiper>
			</view>
			
			
			<!-- 菜单 (在mescroll-uni中不能使用fixed,否则iOS滚动时会抖动, 所以需在mescroll-uni之外存在一个一样的菜单) -->
			<view id="tabInList">
				<tabs-sticky v-model="tabIndex" :tabs="tabs" @change="changeTab" @search="searchWord"></tabs-sticky>
			</view>
			
			
			
			<!-- 数据列表 -->
			<pd-list :list="pdList" :type="tabs[tabIndex].name"></pd-list>
		</mescroll-uni>
	</view>
</template>

<script>
	import MescrollUni from "@/components/mescroll-uni/mescroll-uni.vue";
	import TabsSticky from "@/components/other/tabs-sticky.vue";
	import PdList from "@/components/other/pd-list.vue";
	
	export default {
		components: {
			MescrollUni,
			TabsSticky,
			PdList
		},
		data() {
			return {
				bannerList:[],
				url:'',
				mescroll: null, //mescroll实例对象
				interval:2000,
				duration:1000,
				pdList: [], // 数据列表
				upOption: {
					noMoreSize:1,
					textNoMore:"-- 我是有底线的卜瑞塔 --",
					onScroll: true, // 是否监听滚动事件, 默认false (配置为true时,可@scroll="scroll"获取到滚动条位置和方向)
				},
				tabs:[{name:''}],
				tabIndex: 0, // 当前菜单下标
				navTop: null, // nav距离到顶部的距离 (如计算不准确,可直接写死某个值)
				isShowSticky: false ,// 是否悬浮
				curWord:''
			}
		},
		onLoad() {
			// 获取轮播图
			this.getColumns();
			this.$http.request({
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
		},
		methods: {
			getColumns(){
				this.$http
				.request({
					url: "columns",
					method: "get",
				})
				.then(res => {
					this.tabs = res.data.items;
				});
			},
			searchWord(data){
				console.log(11,data)
				this.curWord = data;
				this.mescroll.resetUpScroll();
			},
			// mescroll组件初始化的回调,可获取到mescroll对象
			mescrollInit(mescroll) {
				this.mescroll = mescroll;
			},
			/*下拉刷新的回调 */
			downCallback(mescroll) {
				mescroll.resetUpScroll()
			},
			/*上拉加载的回调: mescroll携带page的参数, 其中num:当前页 从1开始, size:每页数据条数,默认10 */
			upCallback(mescroll) {
				//联网加载数据
				if(this.isChangeTab){
					mescroll.hideUpScroll(); // 切换菜单,不显示mescroll进度, 显示系统进度条
					uni.showLoading();
				}
				this.getListDataFromNet(this.curWord,mescroll.num, mescroll.size, (curPageData)=>{
					//联网成功的回调
					console.log("mescroll.num=" + mescroll.num + ", mescroll.size=" + mescroll.size + ", curPageData.length=" + curPageData.length);

					//设置列表数据
					if(mescroll.num == 1) this.pdList = []; //如果是第一页需手动制空列表
					this.pdList=this.pdList.concat(curPageData); //追加新数据
					console.log('this.pdList',this.pdList)
					// 数据渲染完毕再隐藏加载状态
					this.$nextTick(()=>{
						mescroll.endSuccess(curPageData.length);
						// 设置nav到顶部的距离 (需根据自身的情况获取navTop的值, 这里放到列表数据渲染完毕之后)
						// 也可以放到onReady里面,或者菜单顶部的数据(轮播等)加载完毕之后..
						if(!this.navTop) this.setNavTop()
						// 保持tab悬浮,列表数据显示第一条
						if(this.isChangeTab){
							this.isChangeTab = false;
							uni.hideLoading();
							if(this.isShowSticky) mescroll.scrollTo(this.navTop, 0)
						}
					})
				}, () => {
					//联网失败的回调,隐藏下拉刷新的状态
					mescroll.endErr();
				})
			},
			// 设置nav到顶部的距离 (滚动条为0, 菜单顶部的数据加载完毕获取到的navTop数值是最精确的)
			setNavTop(){
				let view = uni.createSelectorQuery().in(this).select('#tabInList');
				view.boundingClientRect(data => {
					console.log('tabInList基本信息 = ' + JSON.stringify(data));
					this.navTop = data.top // 到屏幕顶部的距离
				}).exec();
			},
			// 滚动事件 (需在up配置onScroll:true才生效)
			scroll(mescroll){
				console.log('滚动条位置 = ' + mescroll.getScrollTop() + ', navTop = ' + this.navTop);
				// 菜单悬浮的原理: 监听滚动条的位置大于某个值时,控制顶部菜单的显示和隐藏
				if (mescroll.getScrollTop() >= this.navTop) {
					this.isShowSticky = true // 显示悬浮菜单
				} else {
					this.isShowSticky = false // 隐藏悬浮菜单
				}
			},
			// 点击回到顶部按钮时,先隐藏悬浮菜单,避免闪动
			topClick(){
				this.isShowSticky = false
			},
			// 切换菜单
			changeTab (index) {
				this.isChangeTab = true;
				this.mescroll.resetUpScroll()
			},
			getListDataFromNet(curWord,pageNum,pageSize,successCallback,errorCallback) {
				
				try{
					let listData = []
					this.$http
					.request({
						url: "columns",
						method: "get",
					})
					.then(res => {
						this.tabs = res.data.items;
						this.$http
						.request({
							url: "articles",
							method: "get",
							params:{
								"ArticleSearch[column_id]":this.tabs[this.tabIndex].id,
								page:pageNum,
								"per-page":pageSize,
								'ArticleSearch[title]':this.curWord
							}
						})
						.then(res => {
							listData=(res.data.items);
							console.log('listData',listData)
							successCallback && successCallback(listData);
						});
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
	@import "@/common/common.scss";
	page{
		height: 100%;
	}
	.beautiful {
		height: 100%;
		position: relative;
		background-color: #f4f4f4;
	
		.swiper-box {
			width: 100%;
			height: 420rpx;
			vertical-align: top;
			.swiper{
				height: 100%;
			}
			image{
				width: 100%;
				height: 420rpx;
			}
		}
	}
</style>
