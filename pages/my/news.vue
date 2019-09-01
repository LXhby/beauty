<template>
	<view class="news-page">
		<top-bar rightText="实名认证" :detailist="detailist" :isreal="false"></top-bar>
		<view class="main">
			<view class="main-title">
				<view class="left">
					<view class="line"></view>
					<text class="text">我的消息</text>
				</view>
				<view class="right">
					<text class="iconfont">&#xe60a;</text>
					<text>筛选</text>
				</view>
			</view>
			<view class="main-content">
				<view class="news-item">
					<view class="title">
						<text>【系统消息】</text>
						<text class="time">2019.08.31 10:23</text>
					</view>
					<view class="content">
						系统将系统将系统将系统将系统将系统将系统将系统将v系统将系统将系统将系统将系统将系统将
					</view>
				</view>
				<view class="news-item">
					<view class="title">
						<text>【系统消息】</text>
						<text class="time">2019.08.31 10:23</text>
					</view>
					<view class="content">
						系统将系统将系统将系统将系统将系统将系统将系统将v系统将系统将系统将系统将系统将系统将
					</view>
				</view>
			</view>
		</view>
		<view class="bottom-line">
			-- 我是有底线的卡瑞塔 --
		</view>
	</view>
</template>


<script>
	import topBar from "@/components/account/index1.vue";
	export default {
		components: {
			topBar,
		},
		data(){
			return{
				detailist:["可提现","待提现","产品余额","粉丝量"]
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "../../style/topaccount.scss";
		@import "../../common/common.scss";
	@font-face {
	  font-family: 'iconfont';  /* project id 1377410 */
	  src: url('https://at.alicdn.com/t/font_1377410_wk4mbv1sumf.eot');
	  src: url('https://at.alicdn.com/t/font_1377410_wk4mbv1sumf.ttf') format('truetype');
	}
	.iconfont {
		font-family: iconfont !important;
		font-size: 32upx;
		font-style: normal;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale
	}
	.news-page{
		.main{
			.main-title{
				justify-content: space-between;
				.left{
					display: flex;
					align-content: center;
				}
				.right{
					display: flex;
					align-content: center;
					margin-right: 46rpx;
					color: $uni-text-color-grey;
					font-size: 32rpx;
					line-height: 32rpx;
					.iconfont{
						margin-right: 10rpx;
						color: $uni-text-color-grey;
						font-size: 14px;
					}
				}
			}
			.main-content{
				padding: 20rpx ;
				font-size: 28rpx;
				color: $uni-text-color;
				.news-item{	
					padding:20rpx 40rpx;
					margin-bottom: 34rpx;
					background-color: #f4f4f4;
					border: 1px solid #dddddd;
					border-radius: 4px;
					.title{
						margin-left: -14rpx;
						margin-bottom: 10rpx;
						color: $uni-text-color-title;
						line-height:40rpx;
						.time{
							float: right;
							font-size: 24rpx;
							color: $uni-text-color-grey;
						}
					}
					.content{
					}
					&:last-child{
						margin-bottom: 0px;
					}
				}
			}
		}
	}
</style>
