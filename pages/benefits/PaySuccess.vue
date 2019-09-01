<template>
	<view class="pay-success">
		<view class="bg-img">

		</view>
		<view class="content">
			<text class="success-word">恭喜您，付款成功！</text>
			<view class="success-tips">
				<text>
					订单已成功提交，仓库紧张备货中......
					一般 3-5 天送到，系统将在9天后确认订单
				</text>
			</view>
			<view class="button-sp-area">
				<button class="order" type="primary">查看订单</button>
				<button class="gohome" type="primary">返回首页</button>
			</view>
		</view>

	</view>
</template>

<script>
</script>

<style lang="scss" scoped>
	.pay-success {
		padding: 40rpx;;
		text-align: center;

		.bg-img {
			width: 100%;
			height: 400rpx;
			background-image: url(../../static/payment_bg.jpg);
			background-position: 50%;
			background-repeat: no-repeat;
			background-size: 100% 100%;
		}
		.content {
			padding: 0 60rpx;
			margin: -280rpx 0 0;
			.success-word {
				color: $uni-bg-color-grey;
				font-size: 40rpx;
				font-weight: bold;
			}
			
			.success-tips {
				margin: 280rpx 0 70rpx 0;
				font-weight: bold;
				line-height: 45rpx;
				color: $uni-text-color-grey;
			}
			
			.order {
				margin-bottom: 30rpx;
			}
			
			.gohome {
				background-color: $uni-bg-color;
			}
			
		}
	}
</style>
