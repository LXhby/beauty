<template>
	<view class="comment-page">
		<mescroll-uni bottom="100" :down="downOption" @down="downCallback" @up="upCallback" :up="upOption">
			<view class="goods">
				<view class="shop-car" @click="gocart">
					<text class="iconfont">&#xe603;</text>
					<uni-badge :text="cartnum.toString()" type="error" class="shopcar-badge" />
				</view>
				<view class="goods-detail" @click="gogood">
					<view class="title uni-flex uni-row">
						<text class="title-text">{{info.name}}</text>
						<text class="iconfont">&#xe641;</text>
					</view>
					<view class="img-box uni-flex uni-row">
						<image :src="url+info.image" mode="aspectFill"></image>
						<view class="right">
							<view class="num">
								￥{{info.price}}
							</view>
							<text>销量{{info.sold_count}}笔</text>
							<text>好评{{getrate(info.rate)}}</text>
						</view>
					</view>
				</view>
			</view>
			<view class="comment-main">
				<view class="main-title">
					<view class="line"></view>
					<text class="text">粉丝们好评如潮</text>
				</view>
				<view class="comment-list">
					<view class="comment-item uni-flex uni-row" v-for="(item,index) in commentList" :key="index">
						<image :src="url+item.user.headimgurl" mode="widthFix" class="headurl" v-if="item.user.headimgurl"></image>
						<image :src="url+item.user.avatar" mode="widthFix" class="headurl" v-if="item.user.avatar"></image>
						<view class="comment-main">
							<view class="comment-user uni-flex uni-row">
								<view>
									<text class="name">{{item.user.maskedName}}</text>
									<text class="time">{{gettimeago(item.updated_at)}}</text>
								</view>
								<view class="star">
									<text :class="[{'light-star':item.rate>=1},'iconfont']">&#xe623;</text>
									<text :class="[{'light-star':item.rate>=2},'iconfont']">&#xe623;</text>
									<text :class="[{'light-star':item.rate>=3},'iconfont']">&#xe623;</text>
									<text :class="[{'light-star':item.rate>=4},'iconfont']">&#xe623;</text>
									<text :class="[{'light-star':item.rate>=5},'iconfont']">&#xe623;</text>
								</view>
							</view>
							<view class="comment-text" v-if="item.content">
								{{item.content}}
							</view>
							<view class="comment-text" v-else>
								此用户没有填写评价
							</view>
							<view class="comments-image">
								<image :src="url+ele" mode="aspectFill" v-for="(ele,index) in item.images" :key="index"></image>
							</view>
						</view>
					</view>
				</view>
			</view>
		</mescroll-uni>
		<view class="foot-main">
			<view class="main-btns uni-flex uni-row">
				<view class="icon-btn uni-flex uni-row">
					<view class="btn-sm" @click="goHome">
						<text class="iconfont icon1">&#xe660;</text>
						<view class="text-nav nav1">
							首页
						</view>
					</view>
					<view class="btn-sm" @click="getcall">
						<text class="iconfont">&#xe6c5;</text>
						<view class="text-nav">
							客服
						</view>
					</view>
					<view class="btn-sm" @click="handlecollection">
						<text class="iconfont">&#xe69b;</text>
						<view class="text-nav">
							收藏
						</view>
					</view>
				</view>
				<button type="primary" class="btn1" @click="addcar">加入购物车</button>
				<button type="primary" class="btn2">立即购买</button>
			</view>
		</view>
	</view>
</template>

<script>
	import uniBadge from '@/components/uni-badge/uni-badge.vue';
	import MescrollUni from "@/components/mescroll-uni/mescroll-uni.vue";
	import {
		mapGetters
	} from "vuex";
	import Moment from "moment";
	export default {
		components: {
			uniBadge,
			MescrollUni
		},
		data() {
			return {
				id: '',
				url: '',
				info: {},
				commentList: [],
				upOption: {
					noMoreSize: 1,
					textNoMore: "-- 我是有底线的卡瑞塔 --",
					onScroll: true, // 是否监听滚动
				},
				downOption: {
					auto: false //是否在初始化后,自动执行下拉回调callback; 默认true
				},
				top: 0
			}
		},
		computed: {
			...mapGetters(['config', 'cartnum'])
		},
		onLoad() {
			this.id = this.$route.query.id;
			this.$http.request({
					url: "products/" + this.id,
					method: "get",
				})
				.then(res => {
					uni.hideLoading();
					this.info = res.data;
					this.url = this.$baseUrl;
				});
		},
		methods: {
			gettimeago(value) {
				var time = Moment().format("X") - Moment(value).format("X");
				var minite = parseInt(time / 60);
				var hour = parseInt(time / 60 / 60);
				var day = parseInt(time / 60 / 60 / 24);
				if (day >= 1) {
					return day + '天前'
				} else {
					if (hour >= 1) {
						return hour + '小时前'
					} else {
						if (minite >= 1) {
							return minite + '分钟前'
						} else {
							return time + '秒前'
						}
					}
				}
			},
			/*下拉刷新的回调 */
			downCallback(mescroll) {
				//联网加载数据
				this.getListDataFromNet(0, 1, (data) => {
					//联网成功的回调,隐藏下拉刷新的状态
					mescroll.endSuccess();
					//设置列表数据
					this.commentList.unshift(data[0]);

				}, () => {
					//联网失败的回调,隐藏下拉刷新的状态
					mescroll.endErr();
				})
			},
			/*上拉加载的回调: mescroll携带page的参数, 其中num:当前页 从1开始, size:每页数据条数,默认10 */
			upCallback(mescroll) {
				//联网加载数据
				this.getListDataFromNet(mescroll.num, mescroll.size, (curPageData, totalSize) => {

					mescroll.endBySize(curPageData.length, totalSize);
					//设置列表数据
					this.commentList = this.commentList.concat(curPageData);
				}, () => {
					//联网失败的回调,隐藏下拉刷新的状态
					mescroll.endErr();
				})
			},
			getListDataFromNet(pageNum, pageSize, successCallback, errorCallback) {
				let listData = [];
				this.$http
					.request({
						url: "product-comment",
						method: "get",
						params: {
							expand: 'member',
							page: pageNum,
							"per-page": pageSize,
							'ProductCommentSearch[product_id]': this.id,
							expand: 'user'
						}
					})
					.then(res => {
						listData = (res.data.items);
						successCallback && successCallback(listData, res.data._meta.totalCount);
					});
			},
			getrate(rate) {
				return (Math.round(rate / 5 * 10000) / 100.00 + "%");
			},
			gocomment() {
				uni.navigateTo({
					url: '/pages/home/comment?id=' + this.id
				});
			},
			goHome() {
				uni.switchTab({
					url: '/pages/home/index'
				})
			},
			gocart() {
				uni.switchTab({
					url: '/pages/shopcar/index'
				})
			},
			gogood() {
				uni.navigateTo({
					url: '/pages/home/detail?id=' + this.id
				});
			},
			// 收藏
			handlecollection() {
				this.$store.commit('cartnum/setcollect', this.info);
				uni.showToast({
					title: '收藏成功！',
					icon: 'none'
				})
			},
			getcall() {
				window.location.href = `tel:${this.config.service_phone}`;
			},
			addcar() {
				this.$store.commit("cartnum/setnum", 1);
				this.$store.commit("cartnum/setShopcar", this.info);
				uni.setTabBarBadge({
					index: 2,
					text: this.cartnum.toString()
				});
				uni.showToast({
					title: '加入购物车成功',
					icon: 'none'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "../../common/common.scss";

	page {
		width: 100%;
		height: 100%;
	}

	.comment-page {
		width: 100%;
		height: 100%;
		background: #f5f5f5;


		.goods {
			position: relative;
			padding: 60rpx 30rpx 30rpx 30rpx;
			margin-bottom: 20rpx;
			background: #fff;

			.shop-car {
				position: absolute;
				top: 20rpx;
				right: 30rpx;
				width: 60rpx;
				height: 60rpx;
				border-radius: 50%;
				background: rgba(0, 0, 0, 0.5);
				text-align: center;

				.iconfont {
					line-height: 60rpx;
					color: #fff;
					font-size: 36rpx;
				}

				.shopcar-badge {
					position: absolute;
					top: -16rpx;
					right: -10rpx;
				}

			}

			.goods-detail {
				padding: 30rpx;
				box-shadow: 0 0 5px .5px rgba(0, 0, 0, .2);

				.title {
					justify-content: space-between;
					margin-bottom: 20rpx;

					.title-text {
						font-size: 36rpx;
					}

					.iconfont {
						font-size: 46rpx;
						color: $uni-text-color-grey;
					}
				}

				.img-box {
					align-items: center;

					image {
						width: 150rpx;
						height: 112rpx;
					}

					.right {
						margin-left: 30rpx;

						.num {
							margin-bottom: 10rpx;
							font-size: 32rpx;
							color: #ff4b0f;
						}

						text {
							font-size: 28rpx;
							margin-right: 10rpx;
							color: $uni-text-color-grey;
						}
					}
				}
			}
		}

		.comment-main {
			background: #fff;

			.main-title {
				padding-top: 20rpx;
			}

			.comment-item {
				padding: 20rpx 0;
				margin: 0 30rpx;
				border-bottom: 1px solid $uni-border-color;

				.headurl {
					width: 60rpx;
					height: 60rpx;
					border-radius: 50%;
				}

				.comment-main {
					flex: 1;
					margin-left: 20rpx;

					.comment-user {
						justify-content: space-between;
						font-size: 32rpx;

						.name {
							font-size: 28rpx;
						}

						.time {
							margin-left: 20rpx;
							font-size: 24rpx;
							color: $uni-text-color-grey;
						}

						.star {
							.iconfont {
								font-size: 20rpx;
								color: $uni-text-color-grey;
								margin-left: 4rpx;
							}

							.light-star {
								color: $uni-bg-color;
							}
						}
					}

					.comment-text {
						font-size: 24rpx;
						font-size: $uni-text-color;
					}

					.comments-image {
						margin-top: 10rpx;

						image {
							width: 112rpx;
							height: 112rpx;
							border-radius: 2px;
							margin-right: 20rpx;
						}
					}
				}
			}
		}

		.bottom-line {
			padding: 30rpx 0;
			margin-bottom: 100rpx;
			background: #f5f5f5;
		}

		.height-box {
			height: 100rpx;
		}

		.foot-main {
			position: fixed;
			left: 0;
			bottom: 0;
			width: 100%;
			height: 100rpx;
			overflow: hidden;

			.main-btns {
				align-items: center;
				height: 100%;
			}

			.icon-btn {
				flex: 1;
				display: flex;
				height: 100%;
				flex-direction: row;
				justify-content: space-around;
				background: #fff;
				align-items: center;

				.btn-sm {
					text-align: center;

					.iconfont {
						color: #4aa3f0;
						font-size: 32rpx;
					}

					.text-nav {
						font-size: 24rpx;
						color: $uni-text-color-grey;
					}

					.icon1 {
						color: $uni-bg-color;
					}

					.nav1 {
						color: $uni-bg-color;
					}
				}

			}

			button {
				width: 242rpx;
				height: 100%;
				font-size: 32rpx;
				line-height: 100rpx;
				border-radius: 0px;
			}

			.btn1 {
				background: #4aa3f0;
			}

			.btn2 {
				background: $uni-bg-color;
			}
		}

	}
</style>
<style lang="scss">
	.comment-page {
		.mescroll-uni {
			position: relative !important;
		}
	}
</style>
