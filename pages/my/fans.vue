<template>
	<view class="fans-page">
		<top-bar rightText="实名认证" :detailist="detailist" :isreal="false"></top-bar>
		<view class="main">
			<view class="main-title">
				<view class="line"></view>
				<text class="text">我的粉丝</text>
			</view>
			<view class="main-content">
				<view class="fans-item uni-flex uni-row">
					<view class="account-img" >
						<image src="../../static/image_massge_people2.png" mode=""></image>
						<text class="iconfont icon-vip">&#xe678;</text>	
					</view>
					<view class="item-text">
						<view class="uni-flex unfi-row">
							粉丝昵称（<text class="role">会员角色</text>）
						</view>
						<view class="uni-flex unfi-row" style="justify-content: space-between;">
							<text>粉丝数量：118人</text>
							<text>VIP数量：118人</text>
						</view>
						<view class="uni-flex unfi-row" style="justify-content: space-between;">
							<text>推荐人：王晓文</text>
							<text>归属团队：王晓文</text>
						</view>
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
				detailist:["可提现","待提现","产品额度","粉丝量"]
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
	.fans-page{
		.main-content{
			padding:0 36rpx;
			.fans-item{
				line-height: 32rpx;
				padding:30rpx 0 20rpx 0;
				border-bottom: 1px solid $uni-border-color;
				color:$uni-text-color;
				// 头像
				.account-img{
					position:relative;   
					width: 94rpx;
					height: 94rpx;
					margin-left:12rpx;
					image{
						width: 94rpx;
						height: 94rpx;
					}
					.icon-vip{
						position: absolute;
						top:-10rpx;
						right: 0rpx;
						color: #f4ea2a;
					}
				}
				.item-text{
					width: 100%;
					margin-left: 16rpx;
					padding-right:12rpx;
					.uni-flex{
						width: 100%;
						font-size:24rpx;
						.role{
							color: $uni-bg-color;
						}
					}
				}
			} 
		}
		
	}
</style>
