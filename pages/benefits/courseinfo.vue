<template>
	<view class="course">
		<view class="">
			<image src="../../static/chuke.jpg"></image>
		</view>

		<view class="course-show">
			<view class="course-name">
				<text>某某课程名称</text>
				<view class="course-content">
					<view class="course-list">
						轮播图
					</view>
					<view class="course-position">
						<p>
							<icon type="success" size="26" />
							<text>2019年7月16号 至 2019年7月19号</text>
						</p>
						<p>
							<icon type="success" size="26" />
							<text>北京·九华山庄宾馆楼</text>
						</p>
						<p>
							<icon type="success" size="26" />
							<text>200人</text>
						</p>
						<p>
							<icon type="success" size="26" />
							<text>
								课程简介课程简介课程简介课程简介课程简介课程简介
								课程简介课程简介课程简介课程简介课程简介课程简介
								课程简介课程简介课程简介
							</text>
						</p>
					</view>
				</view>
			</view>
			<view class="course-info">
				<view class="course-title">
					<view class="line"></view>
					<text class="text">课程详情</text>
				</view>
				<view class="course-word">
					课程详情
				</view>
			</view>

		</view>
		<view class="couse-money">
			<text class="new-price">￥ 5800元</text>
			<text class="old-price">原价: ￥ 12800元</text>
			<button class="btn" type="primary">立即报名</button>
		</view>
		<view class="bottom">
			<button class="btn" type="primary">报名成功</button>
		</view>
	</view>
</template>

<script>
</script>

<style lang="scss" scoped>
	@import "../../common/common.scss";

	.course {
		background-color: $uni-textbg-color-grey;

		image {
			width: 100%;
			height: 340rpx;
			vertical-align: top;
		}

		.course-show {
			padding: 0 40rpx;

			.course-name {
				margin-bottom: 40rpx;
				border-radius: $uni-border-radius-base;
				background-color: #fff;

				.course-content {
					padding: 10rpx 30rpx 30rpx;

					.course-position {
						color: $uni-text-color;
						font-size: $uni-font-size-sm;

						p {
							padding: 18rpx 0;
							border-bottom: 1px solid $uni-border-color;
						}
					}
				}
			}
		}

		.course-info {
			margin-bottom: 40rpx;
			padding: 20rpx 0;
			background-color: #fff;
			.course-title{
				display: flex;
				align-content: center;
				padding:10rpx 0  20rpx 28rpx;
				border-bottom:1px solid $uni-border-color;
				.line{
					width: 8rpx;
					font-size: 32rpx;
					height: 32rpx;
					border-radius: 8rpx;
					background-color: $uni-bg-color ;
				}
				.text{
					margin-left: 10rpx;
					font-size: 32rpx;
					line-height: 32rpx;
					color: $uni-bg-color;
				}
			}
		}

		.couse-money {
			display: flex;
			align-items: center;
			padding: 10rpx 30rpx;
			margin-bottom: 40rpx;
			background-color: #fff;
			.new-price {
				color: $uni-bg-color;
			}
			.old-price {
				margin: 0 30rpx 0 20rpx;
				text-decoration:line-through;
				font-size: $uni-font-size-sm;
				color: $uni-text-color-grey;
			}
			.btn {
				width: 300rpx;
				height: 60rpx;
				font-size: $uni-spacing-row-base;
				background-color: $uni-bg-color;
			}
		}

		.bottom {
			padding: 40rpx;
			background-color: #fff;

			.btn {
				height: 60rpx;
				font-size: $uni-spacing-row-base;
				background-color: #09BB07;
			}
		}
	}
</style>
