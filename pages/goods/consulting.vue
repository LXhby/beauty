<template>
	<view class="info-page">
		<view class="banner">
			<image src="../../static/37d52be5170e1b25d30ff44db4b0791c.jpg" mode="aspectFill"></image>
			<view class="shop-car">
				<text class="iconfont">&#xe603;</text>
			</view>
		</view>
		<view class="main">
			<view class="main-box">
				<view class="title">
					2019中国互联网大会：阿里巴巴将亮相
				</view>
				<view class="main-content">
					<view class="sub-detail uni-flex uni-row">
						<view class="">
							<text>来源：某公众号</text>
							<text>时间：2019-07-09</text>
						</view>
						<text>热度 3980℃</text>
					</view>
					<view class="shop">
						<view class="shop-main  uni-flex uni-row">
							<view class="left uni-flex uni-row">
								<image src="../../static/logo.png" mode="aspectFill"></image>
								<view class="name">
									<view class="user">
										王晓文的VIP会员店铺
									</view>
									<text>浙江晨风有限公司</text>
								</view>
							</view>
							<view class="right">
								<text class="iconfont">&#xe606;</text>
							</view>
						</view>
					</view>
				</view>
			</view>
			

		</view>
	</view>
</template>

<script>
</script>

<style lang="scss" scoped>
	.info-page {
		position: relative;
		background: #f1f1f1;
		.banner {
			position: relative;
			height: 420rpx;
			image {
				width: 100%;
				position: absolute;
				top: 0;
				left: 0;
				height: 420rpx;
			}

			.shop-car {
				position: absolute;
				top: 10rpx;
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
			}
		}

		.main {
			position: absolute;
			box-sizing: border-box;
			width: 100%;
			top: 344rpx;
			left:0;
			padding: 0rpx 20rpx 20rpx 20rpx;
			.main-box{
				border-radius: 5px;
				background: #fff;
				.title {
					margin: 0 10rpx;
					border-bottom: 1px solid $uni-border-color;
				}
				.main-content {
					padding: 0 20rpx;
				
					.sub-detail {}
				
					.shop {
						.shop-main{
							align-items: center;
							justify-content: space-between;
						}
						.left {
							image {
								width: 100rpx;
								height: 100rpx;
								border-radius: 5px;
							}
						}
				
						.right {}
					}
				}
			}
			

			
		}
	}
</style>
