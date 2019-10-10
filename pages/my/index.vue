<template>
	<view class="my-page">
		<top-bar rightText="实名认证" :detailist="detailist" :isreal="false"></top-bar>
		<view class="active-nav">
			<navigator url="/pages/my/order">
				<view class="uni-flex uni-row nav-title">
					<view class="nav-left">
						<text class="iconfont">&#xe643;</text>
						<text>我的订单</text>
					</view>
					<view class="order-nav">
						<text>全部订单</text>
						<text class="iconfont">&#xe642;</text>
					</view>
				</view>
			</navigator>

			<view class="my-list uni-flex uni-row" >
				<view  class="item" @click="navTo(0)">
					<image class="image" src="../../static/ic_待付款.png" mode="aspectFill"  />
					<text class="text">待付款</text>
				</view>
				<view class="item" @click="navTo(1)">
					<image class="image" src="../../static/待发货订单.png" mode="aspectFill" />
					<text class="text">待发货</text>
				</view>
				<view class="item" @click="navTo(2)">
					<image class="image" src="../../static/待收货.png" mode="aspectFill" />
					<text class="text">待收货</text>
				</view>
				<view class="item" @click="navTo(3)">
					<image class="image" src="../../static/待评价订单.png" mode="aspectFill" />
					<text class="text">待评价</text>
				</view>
				<view class="item" @click="returngood">
					<image class="image" src="../../static/退款.png" mode="aspectFill" />
					<text class="text">退款</text>
				</view>
			</view>
		</view>


		<view class="all-list">


			<navigator url="/pages/my/shipment">
				<view class="all-item">
					<view class="item-left">
						<text class="iconfont font1" :style="{color:'#57b928'}">&#xe64f;</text>
						<text class="nav-text">出货记录</text>
					</view>
					<text class="iconfont arow">&#xe610;</text>
				</view>
			</navigator>
			<navigator url="/pages/my/fans">
				<view class="all-item">
					<view class="item-left">
						<text class="iconfont" :style="{color:'#5eccf6'}">&#xe61d;</text>
						<text class="nav-text">我的粉丝</text>
					</view>
					<text class="iconfont arow">&#xe610;</text>
				</view>
			</navigator>
			<navigator url="/pages/my/reward">
				<view class="all-item">
					<view class="item-left">
						<text class="iconfont font-40" :style="{color:'#ffce2c'}">&#xe679;</text>
						<text class="nav-text">我的奖金</text>
					</view>
					<text class="iconfont arow">&#xe610;</text>
				</view>
			</navigator>
			<navigator url="/pages/my/getmoney">
				<view class="all-item">
					<view class="item-left">
						<text class="iconfont" :style="{color:'#ff9858'}" style="font-size: 46rpx;">&#xe841;</text>
						<text class="nav-text">提现申请</text>
					</view>
					<text class="iconfont arow">&#xe610;</text>
				</view>
			</navigator>
			<navigator url="/pages/my/haveclass">
				<view class="all-item">
					<view class="item-left">
						<text class="iconfont" :style="{color:'#d351ff'}" style="font-size: 44rpx;">&#xe620;</text>
						<text class="nav-text">上课记录</text>
					</view>
					<text class="iconfont arow">&#xe610;</text>
				</view>
			</navigator>
			<navigator url="/pages/my/collection">
				<view class="all-item">
					<view class="item-left">
						<text class="iconfont" :style="{color:'#fd82d1'}" style="font-size: 44rpx;">&#xe605;</text>
						<text class="nav-text">我的收藏</text>
					</view>
					<text class="iconfont arow">&#xe610;</text>
				</view>
			</navigator>
			<navigator url="/pages/my/address">
				<view class="all-item">
					<view class="item-left">
						<text class="iconfont" :style="{color:'#00b2b2'}" style="font-size: 44rpx;">&#xe657;</text>
						<text class="nav-text">收获地址</text>
					</view>
					<text class="iconfont arow">&#xe610;</text>
				</view>
			</navigator>
			<navigator url="/pages/my/news">
				<view class="all-item">
					<view class="item-left">
						<text class="iconfont" :style="{color:'#2cd080'}" style="font-size: 42rpx;">&#xe60b;</text>
						<text class="nav-text">我的消息</text>
					</view>
					<text class="iconfont arow">&#xe610;</text>
				</view>
			</navigator>
			<navigator url="/pages/my/serverule">
				<view class="all-item">
					<view class="item-left">
						<text class="iconfont" :style="{color:'#a2d262'}" style="font-size: 36rpx;">&#xe69b;</text>
						<text class="nav-text">服务条款</text>
					</view>
					<text class="iconfont arow">&#xe610;</text>
				</view>
			</navigator>
			<navigator url="/pages/about/index">
				<view class="all-item">
					<view class="item-left">
						<text class="iconfont" :style="{color:'#006dd9'}" style="font-size: 44rpx;">&#xe7ca;</text>
						<text class="nav-text">关于我们</text>
					</view>
					<text class="iconfont arow">&#xe610;</text>
				</view>
			</navigator>
			<view class="all-item" @click="getcall">
				<view class="item-left">
					<text class="iconfont" :style="{color:'#ff8db7'}" style="font-size: 44rpx;">&#xe61b;</text>
					<text class="nav-text">客服电话</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import topBar from "@/components/account/index1.vue";
	import uniGrid from "@/components/uni-grid/uni-grid.vue";
	import uniGridItem from "@/components/uni-grid-item/uni-grid-item.vue";
	import uniList from '@/components/uni-list/uni-list.vue'
	import uniListItem from '@/components/uni-list-item/uni-list-item.vue'
	import { mapGetters } from "vuex";
	export default {
		components: {
			topBar,
			uniGrid,
			uniGridItem,
			uniList,
			uniListItem
		},
		computed: {
		    ...mapGetters(['config'])
		  },
		data() {
			return {
				detailist: ["可提现", "待提现", "产品额度", "粉丝量"]
			};
		},
		methods:{
			navTo(url){
				uni.navigateTo({
					url:'/pages/my/order?state='+ url
				}) 
			},
			returngood(){
				uni.navigateTo({
					url:'/pages/my/drawback'
				})
			},
			getcall(){
				window.location.href = `tel:${this.config.service_phone}`;
			}
		}
	};
</script>

<style lang="scss" scoped>
	@import "../../style/topaccount.scss";


	.my-page {
		.active-nav {
			border-bottom: $uni-border-height solid #f5f5f5;

			.nav-title {
				padding: 10rpx 20rpx 20rpx 20rpx;
				justify-content: space-between;
				align-items: center;
				border-bottom: 1px solid $uni-border-color;

				.nav-left {
					.iconfont {
						color: $uni-bg-color-hover;
						line-height: 32rpx;
						margin-right: 8rpx;
					}

					text {
						color: $uni-text-color;
						font-size: 32rpx;
						line-height: 32rpx;
					}
				}

				.order-nav {
					text {
						font-size: 24rpx;
						line-height: 24rpx;
						color: $uni-text-color;
					}
					.iconfont{
						font-size: 20rpx;
						line-height: 24rpx;
					}
				}
			}

			.my-list {
				padding: 20rpx 0;
				justify-content:space-around;
				text-align: center;
				text {
					display: block;
					font-size: 24rpx;
					color: #000;
					
				}

				image {
					width: 60rpx;
					height: 60rpx;
					margin-bottom: 10rpx;
				}
			}
		}

		.all-list {
			padding: 0 42rpx;

			.all-item {
				position: relative;
				height: 86rpx;
				border-bottom: 1px solid $uni-border-color;

				.item-left {
					.iconfont {
						font-size: 40rpx;
						line-height: 86rpx;
					}
					.font1{
						font-size: 28rpx;
					}

					.font-40 {
						font-size: 44rpx;
					}

					.nav-text {
						position: absolute;
						height: 100%;
						left: 36px;
						line-height: 86rpx;
						font-size: 28rpx;
						color: #303133;
					}
				}

				.arow {
					position: absolute;
					top: 0px;
					bottom: 0px;
					margin: auto;
					right: 0;
					height: 28rpx;
					font-size: 28rpx;
					color: #909399;
				}
			}
		}
	}
</style>
