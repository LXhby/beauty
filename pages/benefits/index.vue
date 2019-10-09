<template>
	<view class="benifit-page">
		<top-bar rightText="店铺设置" :detailist="detailist" :isreal="false"></top-bar>
		<view class="nav-list">
			<view class="my-list uni-flex uni-row">
				<view class="item" @click="goPage('/pages/benefits/meeting')">
					<view class="text-one">
						<image class="image" src="../../static/meeting.png" mode="widthFix" />
					</view>
					<text class="text" :class="{'light-color':lightIndex==0}">会议活动</text>
				</view>
				<view class="item" @click="goPage('/pages/benefits/preferential')">
					<view class="text-one">
						<image class="image" src="../../static/promotion.png" mode="widthFix" />
					</view>
					<text class="text" :class="{'light-color':lightIndex==1}">特惠购</text>
				</view>
				<view class="item" @click="goPage('/pages/benefits/integral')">
					<view class="text-one">
						<image class="image" src="../../static/integral.png" mode="widthFix" />
					</view>
					<text class="text" :class="{'light-color':lightIndex==2}">积分购</text>
				</view>
				<view class="item" @click="goPage('/pages/benefits/upvue')">
					<view class="text-one">
						<image class="image" src="../../static/vip.png" mode="widthFix" />
					</view>
					<text class="text" :class="{'light-color':lightIndex==3}">升级VIP</text>
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
				bannerList: []
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
		methods: {
			goPage(event) {
				uni.navigateTo({
					url: event
				});
			}
		},
	}
</script>

<style lang="scss" scoped>
	@import "../../style/topaccount.scss";
	@import "../../common/common.scss";

	.benifit-page {
		.nav-list {
			margin-top: 14rpx;
			padding: 0 20rpx;
			margin-bottom: 34rpx;

			.my-list {
				justify-content: space-around;
				text-align: center;
			}

			.text-one {
				width: 90rpx;
				height: 90rpx;

				image {
					width: 90rpx;
					height: 90rpx;
				}
			}


			.text {
				display: block;
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
				overflow: hidden;
				border-radius: 5px;

				image {
					width: 100%;
					height: 100%;
				}
			}
		}
	}
</style>
