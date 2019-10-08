<template>
	<view class="good-detail">
		<view class="banner">
			<image src="../../static/37d52be5170e1b25d30ff44db4b0791c.jpg" mode="aspectFill"></image>
		</view>
		<view class="shop-car" @click="gocart">
			<text class="iconfont">&#xe603;</text>
			<uni-badge :text="cartnum.toString()" type="error" class="shopcar-badge" />
		</view>
		<view class="good-top">
			<view class="goods-name">
				<view class="name-top uni-flex uni-row">
					<view class="left">
						<view class="title">
							<text class="title-h">{{info.name}}</text>
							<text class="sm" v-if="info.freight == '0.00'">包邮</text>
						</view>
						<text class="details">{{info.summary}}</text>
					</view>
					<text class="iconfont erweima">&#xe641;</text>
				</view>
				<view class="price uni-flex uni-row">
					<text class="one">￥{{info.pay_price}}</text>
					<text class="two">已售{{info.sold_count}}件</text>
				</view>
			</view>
			<view class="ensure uni-flex uni-row">
				<view class="text">
					<text class="iconfont">&#xe678;</text>
					<text>正品保障</text>
				</view>
				<view class="text">
					<text class="iconfont">&#xe604;</text>
					<text>自营销售</text>
				</view>
				<view class="text">
					<text class="iconfont">&#xe64d;</text>
					<text>假一赔十</text>
				</view>
				<view class="text">
					<text class="iconfont">&#xe63d;</text>
					<text>售后无忧</text>
				</view>
			</view>

		</view>
		<view class="goods-detail">
			<view class="main-title">
				<view class="line"></view>
				<text class="text">商品详情介绍</text>
			</view>
			<view class="image-box" v-html="info.detail">

			</view>
		</view>
		<view class="fans-detail">
			<view class="main-title">
				<view class="line"></view>
				<text class="text">粉丝们还在浏览</text>
			</view>
			<view class="image-box uni-flex uni-row" >
				<image :src="url+item.image" mode="aspectFill" @click="gopage(item.id)" v-for="(item,index) in browseList" :key="index"></image>
			</view>
		</view>
		<view class="good-coment">
			<view class="main-title">
				<view class="left">
					<view class="line"></view>
					<text class="text">粉丝们好评如潮</text>
				</view>
				<view class="right" @click="gocomment">
					620评论
					<text class="iconfont">&#xe642;</text>
				</view>
			</view>
			<view class="comment-list">
				<view class="comment-item uni-flex uni-row">
					<image src="../../static/image_massge_people2.png" mode="widthFix" class="headurl"></image>
					<view class="comment-main">
						<view class="comment-user uni-flex uni-row">
							<view>
								<text class="name">王晓文</text>
								<text class="time">3天前</text>
							</view>
							<view class="star">
								<text class="iconfont light-star">&#xe623;</text>
								<text class="iconfont light-star">&#xe623;</text>
								<text class="iconfont light-star">&#xe623;</text>
								<text class="iconfont">&#xe623;</text>
								<text class="iconfont">&#xe623;</text>
							</view>
						</view>
						<view class="comment-text">
							很不错哦很不错哦
						</view>
						<view class="comment-image">
							<image src="../../static/006tlvijgy1g6ldbo6anuj30e20e2wjb.jpg" mode="aspectFill"></image>
							<image src="../../static/006tlvijgy1g6ldbo6anuj30e20e2wjb.jpg" mode="aspectFill"></image>
							<image src="../../static/006tlvijgy1g6ldbo6anuj30e20e2wjb.jpg" mode="aspectFill"></image>
						</view>
					</view>
				</view>
				<view class="comment-item uni-flex uni-row">
					<image src="../../static/image_massge_people2.png" mode="widthFix" class="headurl"></image>
					<view class="comment-main">
						<view class="comment-user uni-flex uni-row">
							<view>
								<text class="name">王晓文</text>
								<text class="time">3天前</text>
							</view>
							<view class="star">
								<text class="iconfont light-star">&#xe623;</text>
								<text class="iconfont">&#xe623;</text>
								<text class="iconfont">&#xe623;</text>
								<text class="iconfont">&#xe623;</text>
								<text class="iconfont">&#xe623;</text>
							</view>
						</view>
						<view class="comment-text">
							很不错哦很不错哦很不错哦很不错哦很不错哦很不错哦很不错哦很不错哦
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="bottom-line">-- 我是有底线的卡瑞塔 --</view>
		<view class="height-box">

		</view>
		<view class="foot-main">
			<view class="main-btns uni-flex uni-row">
				<view class="icon-btn uni-flex uni-row">
					<view class="btn-sm">
						<text class="iconfont icon1">&#xe660;</text>
						<view class="text-nav nav1" @click="goHome">
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
				<button type="primary" class="btn2" @click="payGoods">立即购买</button>
			</view>

		</view>
	</view>
</template>

<script>
	import uniBadge from '@/components/uni-badge/uni-badge.vue';
	import {
		mapGetters
	} from "vuex";
	export default {
		components: {
			uniBadge
		},
		data() {
			return {
				url: '',
				info: {},
				browseList:[]
			}
		},
		computed: {
			...mapGetters(['config', 'cartnum'])
		},
		onLoad() {
			this.id = this.$route.query.id;
			this.getInfo();
		},
		methods: {
			getInfo() {
				uni.showLoading({
					title: '加载中'
				})
				this.$http.request({
						url: "products",
						method: "get",
						params: {
							"ProductSearch[category_id]": this.tabIndex ? 2 : null,
							page: 1,
							"per-page": 10,
							is_enabled:1
						}
					})
					.then(res => {
						var data = res.data.items;
						this.deletSelf(data);
						console.log('data',data)
						this.browseList = this.getRandomArrayElements(data,3);
						console.log(this.browseList)
					});
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
			deletSelf(arr){
				arr.forEach((ele,index)=>{
					if(ele.id == this.id){
						arr.splice(index,1)
					}
				})
			},
			getRandomArrayElements(arr, count) {
			    var shuffled = arr.slice(0), i = arr.length, min = i - count, temp, index;
			    while (i-- > min) {
			        index = Math.floor((i + 1) * Math.random());
			        temp = shuffled[index];
			        shuffled[index] = shuffled[i];
			        shuffled[i] = temp;
			    }
			    return shuffled.slice(min);
			},
			gocomment() {
				uni.navigateTo({
					url: '/pages/home/comment'
				});
			},
			gopage(id){
			uni.navigateTo({
				url: '/pages/home/detail?id='+id
			});	
			},
			payGoods() {
				uni.navigateTo({
					url: '/pages/benefits/PaySuccess'
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

	.good-detail {
		position: relative;
		background: #fff;

		.banner {

			width: 100%;
			height: 465rpx;


			image {
				width: 100%;
				position: absolute;
				top: 0;
				left: 0;
				height: 465rpx;
			}


		}

		.shop-car {
			position: absolute;
			z-index: 3;
			top: 20rpx;
			right: 20rpx;
			width: 60rpx;
			height: 60rpx;
			border-radius: 50%;
			background: rgba(0, 0, 0, 0.3);
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

		.good-top {
			margin-top: -70rpx;
			position: relative;
			padding-left: 20rpx;
			padding-right: 20rpx;

			.goods-name {

				overflow: hidden;
				border-radius: 5px;
				box-shadow: 0 0 5px .5px rgba(0, 0, 0, .2);
				background: #fff;

				.name-top {

					padding: 20rpx;
					justify-content: space-between;
					align-items: center;

					.left {
						width: 570rpx;

						.title {
							position: relative;

							.title-h {
								font-size: 36rpx;
							}

							.sm {
								position: absolute;
								bottom: 20rpx;
								font-size: 20rpx;
								color: #fdc77b;
							}
						}

						.details {
							font-size: 28rpx;
							color: $uni-text-color-grey;
						}
					}

					.erweima {
						font-size: 46rpx;
						color: $uni-text-color-grey;
					}
				}

				.price {
					justify-content: space-between;
					align-items: center;
					padding: 0 20rpx 20rpx 20rpx;

					.one {
						font-size: 32rpx;
						color: #ff4000;
					}

					.two {
						font-size: 28rpx;
						color: $uni-text-color-grey;
					}
				}
			}

			.ensure {
				padding: 20rpx 0;
				justify-content: space-around;

				.iconfont {
					font-size: 28rpx;
					color: $uni-bg-color;
					margin-right: 10rpx;
				}

				text {
					font-size: 24rpx;
					color: $uni-text-color-grey;
				}
			}
		}

		.goods-detail {
			padding: 20rpx 0;
			border-top: 20rpx solid #f1f1f1;

			.image-box {
				padding: 30rpx 30rpx 46rpx 30rpx;

				image {
					margin-top: 20rpx;
					width: 100%;
				}
			}
		}

		.fans-detail {
			padding: 20rpx 0;
			border-top: 20rpx solid #f1f1f1;

			.image-box {
				flex-wrap: wrap;

				image {
					margin-top: 20rpx;
					margin-left: 30rpx;
					width: 210rpx;
					height: 210rpx;
					border-radius: 5px;
				}
			}
		}

		.good-coment {
			padding: 20rpx 0;
			border-top: 20rpx solid #f1f1f1;

			.main-title {
				align-items: center;
				justify-content: space-between;

				.left {
					display: flex;
				}

				.right {
					margin-right: 30rpx;
					color: $uni-text-color-grey;
					line-height: 30rpx;

					.iconfont {
						font-size: 26rpx;
					}
				}
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
						width: 470rpx;
						white-space: nowrap;
						overflow: hidden;
						text-overflow: ellipsis;
						font-size: 24rpx;
						font-size: $uni-text-color;
					}

					.comment-image {
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

			background: #f1f1f1;
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
