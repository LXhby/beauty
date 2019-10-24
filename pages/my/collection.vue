<template>
	<view class="collect-page">
		<top-bar rightText="实名认证" :detailist="detailist" :isreal="false"></top-bar>
		<view class="main">
			<view class="main-title">
				<view class="line"></view>
				<text class="text">我的收藏</text>
			</view>
			<view class="main-content">
				<view class="item uni-flex uni-row" v-for="item in collect" @click="navToDetails(item)">
					<view class="left uni-flex uni-row">
						<image :src="'http://backend.krtamall.yiidev.cn' + item.image" mode="aspectFill"></image>
						<view class="detail">
							<text class="title">{{item.name}}</text>
							<view class="bottom uni-flex uni-row">
								<text>销量{{item.sold_count}}笔</text>
								<text>好评{{item.rate}}</text>
							</view>
						</view>
					</view>
					
					<view class="right">
						<view class="money">
							<text class="num">￥{{item.price}}</text>
						</view>
						<view class="btn" @click.stop="addcar(item)">
							+购物车
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="bottom-line">-- 我是有底线的卡瑞塔 --</view>
	</view>
</template>


<script>
	import {
		mapGetters
	} from "vuex";
	import topBar from "@/components/account/index1.vue";
	export default {
		components: {
			topBar
		},
		computed: {
			...mapGetters(["collect", "cartnum"])
		},
		data() {
			return {
				detailist: ["可提现", "待提现", "产品额度", "粉丝量"]
			};
		},
		onLoad() {
			//this.$store.commit("cartnum/clearcollect");
			console.log(this.collect)
		},
		methods:{
			addcar(item){
				 this.$store.commit("cartnum/setnum", 1);
				 this.$store.commit("cartnum/setShopcar", item);
				 if (this.cartnum) {
				 	uni.setTabBarBadge({
				 		index: 2,
				 		text: this.cartnum.toString()
				 	});
				 }else{
				 	uni.removeTabBarBadge({
				 		index:2
				 	})
				 }
				 uni.showToast({
				 	title:'加入购物车成功！'
				 })
				 console.log('cartnum',this.cartnum)
			},
			navToDetails(item){
				uni.navigateTo({
					url: '/pages/home/detail?id='+item.id
				});
			}
		}
	};
</script>

<style lang="scss" scoped>
	@import "../../style/topaccount.scss";
	@import "../../common/common.scss";

	.collect-page {
		.main {
			.main-content {
				.item{
					padding: 20rpx;
					justify-content: space-between;
					align-items: center;
					border-bottom:20rpx solid $uni-border-color;
					.left{
						color:$uni-text-color;
						align-items:center;
						image{
							width: 200rpx;
							height: 150rpx;
							margin-right:20rpx;
						}
						.detail{
							min-height:150rpx;
							display: flex;
							flex-direction: column;
							justify-content: space-around;
							width:240rpx;
							.title{
								font-size: 28rpx;
							}
							.bottom{
								justify-content: space-between;
								// margin-top:20rpx;
								text{
									font-size: 20rpx;
									color: $uni-text-color-grey;
								}
							}
						}
					}
					.right{
						
						color:$uni-text-color;
						.money{
							font-size: 24rpx;
							.num{
								font-size: 32rpx;
							}
						}
						.btn{
							width: 140rpx;
							height: 45rpx;
							margin-top:20rpx;
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
		}
	}
</style>
