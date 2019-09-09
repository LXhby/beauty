<template>
	<view class="info-page">
		<view class="banner">
			<image src="../../static/37d52be5170e1b25d30ff44db4b0791c.jpg" mode="aspectFill"></image>
			<view class="shop-car">
				<text class="iconfont">&#xe603;</text>
				<uni-badge text="9" type="error" class="shopcar-badge" />
			</view>
		</view>
		<view class="main">
			<view class="main-box">
				<view class="title">
					2019中国互联网大会：阿里巴巴将亮相
				</view>
				<view class="main-content">
					<view class="sub-detail uni-flex uni-row">
						<view class="gray-color">
							<text>来源：某公众号</text>
							<text>时间：2019-07-09</text>
						</view>
						<text class="hot">热度 3980℃</text>
					</view>
					<view class="shop">
						<view class="shop-main  uni-flex uni-row">
							<view class="left uni-flex uni-row">
								<image src="../../static/logo.png" mode="aspectFill"></image>
								<view class="name">
									<view class="user">
										王晓文的VIP会员店铺
									</view>
									<text class="company">浙江晨风有限公司</text>
								</view>
							</view>
							<view class="right">
								<text class="iconfont">&#xe606;</text>
								<view class="right-text">
									本周第一名
								</view>
							</view>
						</view>
						<view class="shop-bottom uni-flex uni-row">
							<view class="item">
								<image src="../../static/phone2.png" mode="widthFix"></image>
								<text>王晓文</text>
							</view>
							<view class="item">
								<image src="../../static/phone1.png" mode="widthFix"></image>
								<text>186-1008-8750</text>
							</view>
							<view class="item">
								<image src="../../static/phone3.png" mode="widthFix"></image>
								<text>北京市-朝阳区</text>
							</view>
						</view>
					</view>
					<view class="article">
						<view class="article-text">
							姚明加油。中国球迷永远是你坚强的后盾。//@东土大唐三俗和尚:
							做篮协主席，和他其他各种身份相比来说，绝对是最吃力不讨好的事情，尤其姚明是个聪明且精明的人，之所以还愿意做，我想不出除了真的热爱篮球、特别是热爱中国篮球事业之外，还有其他原因
						</view>
						<image src="../../static/deccf025gy1g6szgrnfmcj21900u0b2j.jpg" mode="widthFix"></image>
						<view class="aarticle-text">
							姚明加油。中国球迷永远是你坚强的后盾。//@东土大唐三俗和尚:
							做篮协主席，和他其他各种身份相比来说，绝对是最吃力不讨好的事情，尤其姚明是个聪明且精明的人，之所以还愿意做，我想不出除了真的热爱篮球、特别是热爱中国篮球事业之外，还有其他原因
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="related">
			<view class="main-title">
				<view class="left">
					<view class="line"></view>
					<text class="text">相关资讯</text>
				</view>
				<view class="right">
					<text>全部资讯 </text>
					<text class="iconfont">&#xe612;</text>
				</view>
			</view>
			<view class="item uni-flex uni-row">
				<view class="left">
					<view class="title">
						盛世黄金12月21日评：税改投票落地 金价小幅上涨
					</view>
					<view class="left-bo uni-flex uni-row">
						<view class="badge">
							分类名称
						</view>
						<view class="time-ago">
							<text class="iconfont">&#xe6dd;</text>
							<text>12小时前</text>
						</view>
					</view>
				</view>
				<image src="../../static/816a66edef10673b4768128b41804cae.jpg" mode="aspectFill"></image>
			</view>
			<view class="item uni-flex uni-row">
				<view class="left">
					<view class="title">
						盛世黄金12月21日评：税改投票落地 金价小幅上涨
					</view>
					<view class="left-bo uni-flex uni-row">
						<view class="badge">
							分类名称
						</view>
						<view class="time-ago ">
							<text class="iconfont">&#xe6dd;</text>
							<text>12小时前</text>
						</view>
					</view>
				</view>
				<image src="../../static/816a66edef10673b4768128b41804cae.jpg" mode="aspectFill"></image>
			</view>
		</view>
		<view class="foot-advert uni-flex uni-row">
			<image src="../../static/8e494512gy1g4kbmo6p80j21400u0woc.jpg" mode="scaleToFill"></image>
			<view class="title">
				<view class="h-title">
					零投资 零风险 轻松开启一份事业
				</view>
				<text class="sm">8大尊享特权 人人都可以成为成功的创业者</text>
			</view>
		</view>
	</view>
</template>

<script>
	import uniBadge from '@/components/uni-badge/uni-badge.vue'
	export default {
		components: {
			uniBadge
		},
		data() {
			return {}
		}
	}
</script>

<style lang="scss" scoped>
	@import "../../common/common.scss";

	.info-page {
		position: relative;
		background: #f1f1f1;

		.banner {
			position: absolute;
			width: 100%;
			height: 420rpx;
			left: 0;
			top: 0;

			image {
				width: 100%;
				position: absolute;
				top: 0;
				left: 0;
				height: 420rpx;
			}

			.shop-car {
				position: absolute;
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
				.shopcar-badge{
					position: absolute;
					top: -16rpx;
					right: -10rpx;
				}
			}
		}

		.main {
			position: relative;
			z-index: 999;
			box-sizing: border-box;
			padding: 344rpx 20rpx 20rpx 20rpx;

			.main-box {
				border-radius: 5px;
				padding-bottom: 27rpx;
				background: #fff;

				.title {
					height: 76rpx;
					margin: 0 10rpx;
					padding-left: 10rpx;
					border-bottom: 1px solid $uni-border-color;
					font-size: 36rpx;
					line-height: 76rpx;
				}

				.main-content {
					padding: 0 20rpx;

					.sub-detail {
						justify-content: space-between;
						margin-top: 20rpx;
						font-size: 24rpx;
						line-height: 24rpx;

						.gray-color {
							font-size: 24rpx;
							color: $uni-text-color;
							text{
								margin-right: 20rpx;
							}
						}

						.hot {
							color: $uni-bg-color;
						}
					}

					.shop {
						margin: 20rpx 0;
						padding: 27rpx;
						background: $uni-bg-color-hovers;
						border-radius: 5px;

						.shop-main {
							align-items: center;
							justify-content: space-between;
							padding-bottom: 27rpx;
							margin-bottom: 27rpx;
							border-bottom: 1px solid $uni-border-color;
						}

						.left {
							align-items: center;

							image {
								width: 100rpx;
								height: 100rpx;
								margin-right: 20rpx;
								border-radius: 5px;
							}

							.user {
								font-size: 32rpx;
							}

							.company {
								font-size: 24rpx;
								color: $uni-text-color;
							}
						}

						.right {
							color: $uni-bg-color;
							text-align: center;

							.iconfont {
								font-size: 60rpx;
								color: $uni-bg-color;
							}

							.right-text {
								font-size: 24rpx;
							}
						}

						.shop-bottom {
							align-items: center;
							justify-content: space-between;

							text {
								color: $uni-text-color;
								font-size: 24rpx;
								vertical-align: middle;
							}

							image {
								vertical-align: middle;
								width: 36rpx;
								margin-right: 10rpx;
								;
							}

							.icon3 {
								font-size: 38rpx;
							}
						}
					}

					.article {
						padding-top: 10rpx;
						color: $uni-text-color;
					}
				}
			}
		}

		.related {
			margin: 0 20rpx;
			background: #fff;
			border-radius: 5px;

			.main-title {
				padding-top: 20rpx;
				padding-right: 20rpx;
				justify-content: space-between;
				border-bottom: 1px solid $uni-border-color;

				.left {
					display: flex;
					align-content: center;
				}

				.right {
					display: flex;
					align-content: center;

					color: $uni-bg-color;
					font-size: 24rpx;
					line-height: 42rpx;

					.iconfont {
						margin-left: 8rpx;
						color: $uni-bg-color;
						font-size: 42rpx;
					}
				}
			}

			.item {
				justify-content:space-between;
				margin:0 20rpx ;
				padding:20rpx 0;
				border-bottom:1px solid $uni-border-color;
				.left{
					width: 470rpx;
					font-size: 32rpx;
					.title{
						color: $uni-text-color;
						line-height: 36rpx;
					}
					.left-bo{
						margin-top: 15rpx;
						justify-content:space-between;
						align-items:center;
						.badge{
							padding: 6rpx 20rpx;
							border-radius: 40rpx;
							font-size: 24rpx;
							line-height: 26rpx;
							color:$uni-bg-color-grey;
							background: $uni-bg-color-hovers;
						}
						.time-ago{
							text{
								vertical-align: middle;
							}
							.iconfont{
								margin-right: 10rpx;
							}
							font-size: 24rpx;
							color:$uni-text-color-grey;
						}
					}
				}
				image{
					width: 180rpx;
					height: 120rpx;
					border-radius: 5px;
				}
			}
		}

		.foot-advert {
			margin-top: 27rpx;
			border-bottom: 27rpx solid #f1f1f1;
			align-items: center;
			background: #fff;
			padding: 25rpx 38rpx;

			image {
				width: 80rpx;
				height: 80rpx;
			}

			.title {
				margin-left: 25rpx;

				.h-title {
					font-size: 32rpx;
					color: #d04cfd;
				}

				.sm {
					font-size: 24rpx;
					color: $uni-text-color;
				}
			}
		}
	}
</style>
