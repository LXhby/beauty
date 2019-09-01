<template>
	<view class="cart-page">
		<view class="have-none">
			<image src="../../static/order_no_bg.png" mode="widthFix"></image>
			<view class="title">
				不过节吗！什么也没有啊~
			</view>
			<view class="text">到底还过不过了，啥也不买</view>
			<text>买不买得，先加个购物车再说嘛</text>
			 <button >我想看看</button>
		</view>
	</view>
</template>

<script>
</script>

<style lang="scss" scoped>
	.cart-page{
		.have-none{
			font-size: 24rpx;
			text-align:center;
			color:$uni-text-color;
			image{
				width: 500rpx;
				margin-top: 140rpx;
			}
			.title{
				margin-top: 50rpx;
				margin-bottom: 24rpx;
				font-size: 32rpx;
			}
			.text{
				margin-bottom: 8rpx;
				font-size: 24rpx;
			}
			button{
				width: 214rpx;
				height: 52rpx;
				line-height: 52rpx;
				margin-top:130rpx;
				background: #fd3f6f;
				color: #fff;
				border-radius: 52rpx;
				font-size: 32rpx;
				&:after{
					border: none;
				}
			}
		}
	}
</style>
