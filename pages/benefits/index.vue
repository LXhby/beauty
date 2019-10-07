<template>
	<view class="benifit-page">
		<top-bar rightText="店铺设置" :detailist="detailist" :isreal="false"></top-bar>
		<view class="nav-list">
			<uni-grid :column="4" :show-border="false" :square="false" class="my-list"  @change="goPage">
				<uni-grid-item>
					<image class="image" src="../../static/meeting.png" mode="widthFix" />
					<text class="text" :class="{'light-color':lightIndex==0}">会议活动</text>
				</uni-grid-item>
				<uni-grid-item>
					<image class="image" src="../../static/promotion.png" mode="widthFix" />
					<text class="text" :class="{'light-color':lightIndex==1}">特惠购</text>
				</uni-grid-item>
				<uni-grid-item>
					<image class="image" src="../../static/integral.png" mode="widthFix" />
					<text class="text" :class="{'light-color':lightIndex==2}">积分购</text>
				</uni-grid-item>
				<uni-grid-item>
					<image class="image" src="../../static/vip.png" mode="widthFix" />
					<text class="text" :class="{'light-color':lightIndex==3}">升级VIP</text>
				</uni-grid-item>
			</uni-grid>
		</view>
		<view class="swiper-box">
			<swiper class="swiper" :indicator-dots="true" :autoplay="true" :interval="interval" :duration="duration" :circular="true">
				<swiper-item v-for="(item,index) in bannerList" :key="index">
					<image :src="url+item.image" mode="aspectFill"></image>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>


<script>
	import topBar from "@/components/account/index1.vue";
	import uniGrid from "@/components/uni-grid/uni-grid.vue";
	import uniGridItem from "@/components/uni-grid-item/uni-grid-item.vue";
	export default {
		components: {
			topBar,
			uniGrid,
			uniGridItem
		},
		props: ["lightIndex"],
		data() {
			return {
				detailist: ["可提现", "待提现", "产品额度"],
				interval: 2000,
				duration: 500,
				bannerList:[]
			}
		},
		created() {
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
				console.log(this.bannerList)
				this.url = this.$baseUrl;
			});
		},
		methods:{
			goPage(event){
				var index = event.detail.index;
				switch (index){
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

		}
	}
</script>

<style lang="scss" scoped>
	@import "../../style/topaccount.scss";
	@import "../../common/common.scss";

	.benifit-page {
		.nav-list {
			image {
				width: 90rpx;
				height: 90rpx;
			}

			.text {
				font-size: 24rpx;
			}

			.light-color {
				color: $uni-bg-color;
			}
		}

		.swiper-box {
			margin-top: 20rpx;
			padding: 20rpx;
			border-top: 20rpx solid #f5f5f5;
			border-bottom: 20rpx solid #f5f5f5;

			.swiper {
				height: 180rpx;

				image {
					width: 100%;
					height: 100%;
				}
			}
		}
	}
</style>
