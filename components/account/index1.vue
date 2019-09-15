<template>
	<view class="top-account">
		<view class="top-content">
			<!-- 头部第一行 -->
			<view class="top-main">
				<view class="uni-flex uni-row top-detail">
					<view class="account-img">
						<image src="../../static/image_massge_people2.png" mode=""></image>
						<text class="iconfont icon-vip">&#xe678;</text>
					</view>
					<view class="shop-detail uni-flex uni-column" style="-webkit-flex: 1;flex: 1;">
						<view class="shop-name">
							普瑞塔美妆总店
						</view>
						<text class="shop-busis">浙江乘风萨科技地方生物科技有限公司</text>
					</view>
					<view class="shop-right" style="width: 228upx;">
						<view class="time">
							<text>服务期限</text> <text class="text">365天</text>
						</view>
						<view class="shop-nav uni-flex uni-row" style="-webkit-align-items: center;align-items: center;" @click="handleNav">
							<view class="start">
								<text class="iconfont">&#xe623;</text>
							</view>
							<view class="text uni-flex uni-row" style="-webkit-flex: 1;flex: 1;-webkit-align-items: center;align-items: center;">
								<text class="name">{{rightText}}</text>
								<text class="iconfont right">&#xe642;</text>
							</view>

						</view>
					</view>
				</view>
				<!-- 数字显示第二行 -->
				<view class="example-body">
					<uni-grid :column="detailist.length" :show-border="false" :square="false">
						<uni-grid-item v-for="(item,index) in detailist" :key="index">
							<view class="text-one">16</view>
							<text class="text ">{{item}}</text>
						</uni-grid-item>
					</uni-grid>
				</view>
			</view>
			<image src="../../static/WechatIMG311.png" mode="" class="bg-img"></image>
			<image src="../../static/WechatIMG391.png" mode="" class="bg-weave"></image>
			<image src="../../static/real.png" mode="" class="real" v-if="isreal"></image>
		</view>
		<uni-popup ref="popup" type="center" custom="true">
			<view class="real-form">
				<view class="titles">
					实名认证
				</view>
				<form @submit="formSubmit">
					<view class="form-box">
						<view class="uni-form-item uni-flex uni-row padding-botom">
							<view class="title">真实姓名</view>
							<input class="uni-input" placeholder="请输入真实姓名" />
						</view>
						<view class="uni-form-item uni-flex uni-row padding-botom">
							<view class="title">身份证号</view>
							<input class="uni-input" placeholder="请输入真实身份证号" />
						</view>
						<view class="uni-form-item uni-flex uni-row ">
							<view class="title">手机号码</view>
							<input class="uni-input" placeholder="请输入手机号" />
							<button>获取验证码</button>
						</view>
					</view>
					<view class="list-text">
						<view class="text">
							*请务必完成个人信息实名认证，便于线下活动签到和交流；
						</view>
						<view class="text">
							*用户信息和隐私我们承诺绝不向外泄密。
						</view>
					</view>
					<view class="uni-btn">
						<button form-type="submit">确认设置</button>
					</view>
				</form>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import uniGrid from '@/components/uni-grid/uni-grid.vue'
	import uniGridItem from '@/components/uni-grid-item/uni-grid-item.vue'
	import uniPopup from '@/components/uni-popup/uni-popup.vue';
	export default {
		components: {
			uniGrid,
			uniGridItem,
			uniPopup
		},
		props: ["rightText", "navurl", "isreal", "detailist"],
		methods: {
			handleNav() {
				if (this.rightText == '实名认证') {
					this.$refs.popup.open()
				}
			}
		},
		mounted() {
			
		}
	}
</script>

<style lang="scss">
	@import "../../style/topaccount.scss";

	.top-account {
		.real-form {
			width: 552rpx;
			background: #fff;
			font-size: 28rpx;
			border-radius: 5px;

			.titles {
				height: 90rpx;
				line-height: 90rpx;
				border-bottom: 1px solid $uni-border-color;
			}
			.padding-botom{
				margin-bottom: 30rpx;
			}
			.form-box{
				padding: 40rpx 0;
				border-bottom: 1px solid $uni-border-color;
			}
			.uni-form-item {
				width: 100%;
				box-sizing: border-box;
				padding:0 30rpx;
				align-items:center;
				.title{
					padding: 0px;
					margin-right:20rpx ;
				}
				input{
					flex: 1;
					height: 25rpx;
					font-size: 28rpx;
					line-height: 25rpx;
					padding: 8rpx 0 8rpx 16rpx;
					background: #f4f4f4;
					border-radius: 4px;
					text-align: left;
				}
				button{
					width: 118rpx;
					height: 40rpx;
					margin-left: 10rpx;
					line-height: 40rpx;
					color: #fff;
					background:linear-gradient(to right,#ffda73,#ffb33f) ;
					padding: 0;
					border-radius: 40rpx;
					font-size: 20rpx;
					&:after{
						border: none;
					}
				}
			}
			.list-text{
				padding: 30rpx 30rpx 0 30rpx;
				color: $uni-text-color-grey;
				text-align: left;
				.text{
					font-size: 24rpx;
				}
			}
			.uni-btn {
				padding:40rpx;
				button {
					width: 278rpx;
					height: 54rpx;
					line-height: 54rpx;
					font-size: 28rpx;
					background: $uni-bg-color;
					color: #fff;
					border: none;
					border-radius: 54rpx;
				}
			}
		}
	}
</style>
