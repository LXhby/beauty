<template>
	<view class="post-comment">
		<view class="item">
			<view class="item-top uni-flex uni-row">
				<image src="../../static/006tlvijgy1g6ldbo6anuj30e20e2wjb.jpg" mode="aspectFill"></image>
				<text>实打实大空间</text>
			</view>
			<view class="star-item uni-flex uni-row">
				<text>整体评价</text>
				<view class="star">
					<text class="iconfont star dark-color" @click="clickStar(1)">&#xe623;</text>
					<text class="iconfont star" @click="clickStar(2)">&#xe623;</text>
					<text class="iconfont star" @click="clickStar(3)">&#xe623;</text>
					<text class="iconfont star" @click="clickStar(4)">&#xe623;</text>
					<text class="iconfont star" @click="clickStar(5)">&#xe623;</text>
				</view>
			</view>
			<textarea maxlength="200" placeholder-style="width:750rpx
			;border-radius: 5px; background: #f5f5f5;" placeholder=""
			 value="非常好" />
			 <view class="upload uni-flex uni-row">
			 	<view class="up-image">
			 		<text class="iconfont">&#xe64a;</text>
			 	</view>
			 	<view class="up-text">
			 		<view class="title">
			 			上传照片
			 		</view>
			 		<text>内容丰富的评价更容易成为优质评价哦！</text>
			 	</view>
			 </view>
			 <view class="noname">
			 	<label>
			 		<checkbox value="cb" checked="true" style="transform:scale(0.7)" color="#ff0080" />匿名评价
			 	</label>
			 </view>
		</view>
	</view>
</template>

<script>
	export default {
		data(){
			return{
				commentinfo:{
					user_id:'',
					product_id:'',
					rate: 1, // 星星数量
					content:'',
					image:[],
					is_anonymous:false
				}
			}
		}
	}
</script>

<style scoped lang="scss">
.post-comment{
	.item{
		color:$uni-text-color;
		.item-top{
			padding: 10rpx 20rpx;
			border-bottom: 1px solid $uni-border-color;
			align-items:center;
			image{
				width: 80rpx;
				height: 80rpx;
				border-radius: 5rpx;
				margin-right:10rpx;
				overflow: hidden;
			}
		}
		.star-item{
			padding:20rpx;
			align-items:center;
			.star{
				margin-left:20rpx ;
				.iconfont{
					margin: 0 10rpx;
					color: #999;
				}
				.dark-color{
					color: $uni-bg-color;
				}
			}
		}
		.upload{
			padding:0 20rpx;
			align-items:center;
			.up-image{
				display: flex;
				justify-content: center;
				align-items: center;
				width: 90rpx;
				height: 90rpx;
				margin-right: 10rpx;
				background: $uni-bg-color;
				border-radius: 5rpx;
			}
			.up-text{
				flex: 1;
				text-align:left;
				.title{
					padding-top: 0px;
					font-size: 24rpx;
				}
				text{
					color:$uni-text-color-grey;
					font-size: 20rpx;
					line-height: 20rpx;
				}
			}
			.iconfont{
				color: #fff;
				font-size: 46rpx;
			}
		}
		.noname{
			margin-top: 30rpx;
			padding-left: 40rpx;
			text-align: left;
			label{
				font-size: 24rpx;
			}
		}
	}
}
</style>