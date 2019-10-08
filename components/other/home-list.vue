<template>
	<view class='home-list'>
		<view v-for="(item, index) in list" :key="index" class="news-item" @click="navToDetails(item)">
			<view class="item uni-flex uni-row">
				<view class="left uni-flex uni-row">
					<image :src="url+item.image" mode="aspectFill"></image>
					<view class="detail uni-flex uni-column">
						<text class="title">{{item.name}}</text>
						<view class="bottom ">
							<text style="margin-right:10rpx;">销量{{item.sold_count}}笔</text>
							<text>好评{{item.rate}}</text>
						</view>
					</view>
				</view>

				<view class="right">
					<view class="money">
						<text>￥</text>
						<text class="num">{{item.price}}</text>
					</view>
					<view class="btn" @click.stop="addcar(item)">
						+购物车
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { mapGetters } from "vuex";
	export default {
		props: {
			list: { // 数据列表
				type: Array,
				default () {
					return []
				}
			},
			type: {
				type: String,
				default () {
					return ''
				}
			}
		},
		data() {
			return {
				url: ''
			}
		},
		created() {
			this.url = this.$baseUrl;
			console.log('this.list', this.list)
		},
		computed: {
		      ...mapGetters(['cartnum']),
			  
		},
		methods:{
			addcar(item){
				 this.$store.commit("cartnum/setnum", 1);
				 this.$store.commit("cartnum/setShopcar", item);
				 uni.setTabBarBadge({
				 	index: 2,
				 	text: this.cartnum.toString()
				 });
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
	.item {
		padding: 20rpx;
		justify-content: space-between;
		align-items: center;
		border-bottom: 20rpx solid $uni-border-color;

		.left {
			// color: $uni-text-color;

			image {
				width: 200rpx;
				height: 150rpx;
				margin-right: 20rpx;
			}

			.detail {
				width: 240rpx;
				justify-content: space-between;

				.title {
					font-size: 28rpx;
				}

				.bottom {
					text {
						font-size: 22rpx;
						color: $uni-text-color-grey;
					}
				}
			}
		}

		.right {
			text-align: center;
			color: $uni-text-color;

			.dark-color {
				color: $uni-bg-color;
				font-size: 24rpx;
			}

			.money {
				font-size: 24rpx;
				margin-bottom: 20rpx;
				.num {
					font-size: 32rpx;
				}
			}

			.btn {
				width: 140rpx;
				height: 45rpx;
				margin-top: 8rpx;
				border-radius: 45rpx;
				background: $uni-bg-color;
				text-align: center;
				color: #fff;
				line-height: 45rpx;
				font-size: 24rpx;
			}
		}
	}
</style>
