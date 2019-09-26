<template>
	<view class="beautiful">
		<view class="swiper-box">
			<swiper class="swiper" indicator-dots="true" autoplay="true" :interval="interval" :duration="duration" :circular="true">
				<swiper-item>
					<image src="../../static/816a66edef10673b4768128b41804cae.jpg" mode=""></image>
				</swiper-item>
				<swiper-item>
					<image src="../../static/37d52be5170e1b25d30ff44db4b0791c.jpg" mode=""></image>
				</swiper-item>
				<swiper-item>
					<image src="../../static/e7b51b721c3319e9c2916cc41cd9c695.jpg" mode=""></image>
				</swiper-item>
			</swiper>
		</view>
		
		<view class="nav">
			<view class="search" v-show="showipt">
				<input class="uni-input" placeholder="请输入搜索关键字" />
			</view>
			<!-- 导航栏 agents导航栏标题 -->
			<view class="lalala">
				<view class="navTabs">
					<view
						v-for="(item, index) in tabTitle" :key="index" 
						class="nav-item" 
						:class="{current: tabCurrentIndex === index}"
						@click="tabClick(index)"
					>
						{{item}}
					</view>
				</view>
				<text class="iconfont"  @click="showSearch">&#xe607;</text>
			</view>
			
			<!-- swiper切换 swiper-item表示一页 scroll-view表示滚动视窗 -->
			<swiper class="swiper-big" :current="tabCurrentIndex" @change="swiperTab">
				<swiper-item v-for="(listItem,listIndex) in list" :key="listIndex">
					<scroll-view style="height: 100%;" scroll-y="true" scroll-with-animation>
						<view class='content'>
							<view class='card' v-for="(item,index) in listItem" v-if="listItem.length > 0" :key="index" @click="goPage">
								<view class="letter-img">
									<view class='card-left'>
										<text>盛世黄金12月21日评：税改投票落地 金价小幅上涨</text><br />
										<view class="tag">
											<view class="uni-class" >分类名称</view>
											<text class="word-grey">12小时前</text>
										</view>
									</view>
									<image src="" mode=""></image>
								</view>
								<view class="more-img">
									<text>盛世黄金12月21日评：税改投票落地 金价小幅上涨</text><br/>
									<view class="imgs">
										<image src="" mode=""></image>
										<image class="middle-img" src="" mode=""></image>
										<image src="" mode=""></image>
									</view>
								</view>
							</view>
						</view>
						<view class='noCard' v-if="listItem.length===0">
							暂无信息
						</view>
						<view class="bottom-line">-- 我是有底线的卡瑞塔 --</view>
					</scroll-view>
				</swiper-item>
			</swiper>
		</view>
		
	</view>
</template>

<script>
	import navTab from '../../components/navTab.vue';
	import uniTag from "@/components/uni-tag/uni-tag.vue"
	export default {
		components: {
			navTab,
			uniTag
		},
		data() {
			return {
				tabCurrentIndex: 0,
				showipt:false,
				interval:2000,
				duration:1000,
				tabTitle: ['全部', '分类1', '分类2', '分类3'], //导航栏格式 --导航栏组件
				currentTab: 0, //sweiper所在页
				pages: [1, 1, 1, 1], //第几个swiper的第几页
				list: [
					[1, 2, 3, 4, 5, 6],
					['a', 'b', 'c', 'd', 'e', 'f'],
					[],
					['2233', '4234', '13144', '324244']
				] //数据格式
			};
		},
		methods: {
			// swiper 滑动
			tabClick(index){
				this.tabCurrentIndex = index;
			},
			goPage() {
				uni.navigateTo({
					url: '/pages/goods/consulting'
				})
			},
			showSearch() {
				this.showipt = !this.showipt;
			}
			// 加载更多 util.throttle为防抖函数
			// lower1: util.throttle(function(e) {
			// console.log(`加载${this.currentTab}`)//currentTab表示当前所在页数 根据当前所在页数发起请求并带上page页数
			// uni.showLoading({
			// 	title: '加载中',
			// 	mask:true
			// })
			// 	this.isRequest().then((res)=>{
			// 		let tempList = this.list
			// 		tempList[this.currentTab] = tempList[this.currentTab].concat(res)
			// 		console.log(tempList)
			// 		this.list = tempList
			// 		this.$forceUpdate() //二维数组，开启强制渲染
			// 	})
			// }, 300),
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
		
		

		.nav {
			position: relative;
			height:calc(100% - 420rpx);
			.search {
				position: absolute;
				height: 44rpx;
				top: 14rpx;
				right:64rpx;
				z-index: 999;
				.uni-input {
					width: 200rpx;
					height: 44rpx;
					padding: 0 30rpx;
					
					border-radius: 30rpx;
					font-size: $uni-font-size-ssm;
					background-color: #fce0f5;
				}
			}
			.lalala {
				display: flex;
				justify-content: space-around;
				align-items: center;
				margin-bottom: 20rpx;
				background-color:#fff;
				.navTabs {
					flex: 1;
					background-color: #fff;
					display: flex;
					height: 80rpx;
					padding: 0 5px;
					background: #fff;
					.nav-item{
						flex: 1;
						display: flex;
						justify-content: center;
						align-items: center;
						height: 100%;
						font-size: 15px;
						color: #333;
						position: relative;
						&.current{
							color:$uni-bg-color;
							&:after{
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
				.iconfont {
					width: 60rpx;
					color: $uni-bg-color;
					font-size: 40rpx;
				}
			}
			.swiper-big{
				// height: calc(100% - 80rpx);
				height: 560rpx;
			}
			.content {
				width: 100%;
				background-color: #fff;
			}

			.card {
				
				.letter-img {
					display: flex;
					padding: 25rpx 0;
					border-bottom: 1px solid $uni-border-color;
					background-color: white;
					margin: 0 25rpx;
					background: #FFFFFF;
					border-radius: 5px;
					position: relative;
					.card-left {
						margin-right: 20rpx;
					
						.tag {
							display: flex;
							align-items: center;
							justify-content: space-between;
							margin-top: 20rpx;
					
							.uni-class {
								width: 126rpx;
								height: 40rpx;
								text-align: center;
								line-height: 40rpx;
								border-radius: 40rpx;
								font-size: 24rpx;
								background-color: #fce0f5;
								color: $uni-bg-color-grey;
							}
					
							.word-grey {
								font-size: $uni-font-size-ssm;
								color: $uni-text-color-grey;
							}
						}
					
					}
					image {
						width: 300rpx;
						height: 140rpx;
						border-radius: $uni-border-radius-base;
						background-color: $uni-text-color-grey;
					}
					
				}
				.more-img {
					padding: 25rpx 0;
					border-bottom: 1px solid #f4f4f4;
					background-color: white;
					margin: 0 25rpx;
					background: #FFFFFF;
					
					border-radius: 5px;
					.imgs {
						display: flex;
						align-items: center;
						flex-wrap: wrap;
						margin: 10rpx 0;
						image {
							flex: 1;
							height: 140rpx;
							border-radius: $uni-border-radius-base;
							background-color: $uni-text-color-grey;
						}
						.middle-img {
							margin: 0 30rpx;
						}
						
					}
					
				}
			}

			.noCard {
				width: 90%;
				height: 200upx;
				margin: auto;
				background-color: white;
				display: flex;
				align-items: center;
				justify-content: center;
				color: #999999;
				box-shadow: 0 0 10upx 0 rgba(0, 0, 0, 0.10);
				border-radius: 10upx;
			}
		}
	}
</style>
