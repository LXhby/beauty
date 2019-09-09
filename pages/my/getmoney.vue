<template>
	<view class="withdrawal-page">
		<top-bar rightText="实名认证" :detailist="detailist" :isreal="false"></top-bar>
		<view class="main">
			<view class="main-title">
				<view class="line"></view>
				<text class="text">提现申请</text>
			</view>
			<view class="main-content">
				<input class="uni-input" type="number" placeholder="自动获取可提现的总额度金额" />
				<label class="radio"><radio value="r2" style="transform:scale(0.7)" />银行卡</label>
				<button type="primary">提现申请</button>
				<view class="instructions">
					<text>*提现周期为每周四，每天最高提现额度为微信支付限额；</text><br>
					<text>*提现申请后财务会在1个工作日内审核，到账时间24小时内；</text><br>
					<text>*提现需要扣除微信提现手续费和个人所得税；</text><br>
					<text>*如您在提现过程中遇到问题可致电010-888888</text>
				</view>
				<view class="bottom-line">-- 我是有底线的卡瑞塔 --</view>
			</view>
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

<style lang="scss">
	@import "../../common/common.scss";
	.withdrawal-page {
		.main-content{
			padding:0 44rpx;
			input{
				margin-bottom: 24rpx;
				padding-left: 0px;
				border-bottom: 1px solid $uni-border-color;
			}
			label{
				color:$uni-text-color;
			}
			button{
				width: 520rpx;
				height: 76rpx;
				margin-top: 60rpx;
				margin-bottom: 50rpx;
				line-height: 76rpx;
				border-radius: 76rpx;
				background: $uni-bg-color;
			}
			.instructions{
				color:$uni-text-color;
				font-size: 24rpx;
				line-height: 40rpx;
			}
		}
	}
</style>
