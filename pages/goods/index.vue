<template>
	<view class="beautiful">
		<image class="header-bg" src="../../static/chuke.jpg" mode="widthFix"></image>
		<view class="search">
			<input class="uni-input" placeholder="请输入搜索关键字" />
		</view>
		<view class="nav">
			<!-- 导航栏 agents导航栏标题 -->
			<view class="lalala">
					<navTab class="navTabs" ref="navTab" :tabTitle="tabTitle" @changeTab='changeTab'></navTab>
					<image class="search-img" src="../../static/vip_buy08.png" mode="aspectFit" @click="showSearch"></image>
			</view>
			
			<!-- swiper切换 swiper-item表示一页 scroll-view表示滚动视窗 -->
			<swiper style="min-height: 80vh;" :current="currentTab" @change="swiperTab">
				<swiper-item v-for="(listItem,listIndex) in list" :key="listIndex">
					<scroll-view style="height: 100%;" scroll-y="true" scroll-with-animation>
						<view class='content'>
							<view class='card' v-for="(item,index) in listItem" v-if="listItem.length > 0" :key="index" @click="goPage">
								<view class="letter-img">
									<view class='card-left'>
										<text>盛世黄金12月21日评：税改投票落地 金价小幅上涨</text><br />
										<view class="tag">
											<uni-tag class="uni-tag" text="分类名称" circle="true" size="small" type="error"></uni-tag>
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
					</scroll-view>
				</swiper-item>
			</swiper>
		</view>
		<view class="bottom-line">-- 我是有底线的卡瑞塔 --</view>
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
				currentPage: 'index',
				toView: '', //回到顶部id
				tabTitle: ['全部', '分类1', '分类2', '分类3', '全部', '分类1', '分类2', '分类3'], //导航栏格式 --导航栏组件
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
			changeTab(index) {
				this.currentTab = index
			},
			// swiper 滑动
			swiperTab(e) {
				var index = e.detail.current //获取索引
				if (this.tabTitle.length <= 5) {
					this.$refs.navTab.navClick(index)
				} else {
					this.$refs.navTab.longClick(index)
				}
			},
			goPage() {
				uni.navigateTo({
					url: '/pages/goods/consulting'
				})
			},
			showSearch() {
				
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

	.beautiful {
		position: relative;
		background-color: #f4f4f4;

		.header-bg {
			width: 100%;
			height: 200rpx;
			vertical-align: top;
		}
		
		.search {
			position: absolute;
			top: 206rpx;
			right: 65rpx;
			z-index: 999;
			.uni-input {
				width: 200rpx;
				padding: 0 30rpx;
				border: 1px solid pink;
				border-radius: 30rpx;
				font-size: $uni-font-size-ssm;
				background-color: pink;
			}
		}

		.nav {
			.lalala {
				display: flex;
				justify-content: space-around;
				.navTabs {
					width: 90%;
					margin-bottom: 20rpx;
					background-color: #fff;
				}
				.search-img {
					margin-top: 16rpx;
					width: 50rpx;
					height: 50rpx;
				}
			}
			.content {
				padding: 20rpx 0;
				width: 100%;
				background-color: #fff;
			}

			.card {
				
				.letter-img {
					display: flex;
					padding: 20rpx 0;
					width: 90%;
					border-bottom: 1px solid #f4f4f4;
					background-color: white;
					margin: 0 40rpx;
					background: #FFFFFF;
					box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.10);
					border-radius: 5px;
					position: relative;
					.card-left {
						margin-right: 20rpx;
					
						.tag {
							display: flex;
							align-items: center;
							justify-content: space-between;
							margin-top: 20rpx;
					
							.uni-tag {
								border: 1px solid pink;
								background-color: pink;
								color: $uni-bg-color;
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
					padding: 20rpx 0;
					width: 90%;
					border-bottom: 1px solid #f4f4f4;
					background-color: white;
					margin: 0 40rpx;
					background: #FFFFFF;
					box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.10);
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
