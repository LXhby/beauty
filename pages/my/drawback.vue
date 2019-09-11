<template>
	<view class="draw-back">
		<view class="order-info">
			<view class="title">
				<image src="" mode="aspectFit"></image>
				<text>订单信息</text>
			</view>
			<view class="content">
				<view class="uni-flex">
					<text>订单号</text>
					<text>12345678954</text>
				</view>
				<view class="uni-flex">
					<text>手机号</text>
					<text>xxx xxxx xxxx</text>
				</view>
				<view class="uni-flex">
					<text>下单时间</text>
					<text>2018-11-13 15:15</text>
				</view>
				<view class="uni-flex">
					<text>交易状态</text>
					<text>已送达</text>
				</view>
				<view class="uni-flex">
					<text>退还金币</text>
					<text>128个</text>
				</view>
				<view class="uni-flex">
					<text>退款金额</text>
					<text class="red">￥128.00</text>
				</view>
			</view>
		</view>
		<view class="back-reason">
			<view class="title">
				<text>退款原因</text>
				<view class="other">
					<text>其他</text>
					<text>></text>
				</view>
			</view>
			<view class="content">
				<textarea maxlength='200' placeholder-style="padding:20rpx;width:100%;height:200rpx;background-color:#f4f4f4;font-size:28rpx;" placeholder="请添加退款原因描述..." />
				<view class="upload-photo">
					<image src="" mode="aspectFit"></image>
					<view class="word-info">
						<view class="word-ml">上传照片</view>
						<view class="word-sm">产品质量问题，运输过程中破损等问题，可申请退货退款。</view>
					</view>
				</view>
				<view class="address">
					<text>请把商品快递到：</text><br/>
					<text class="word-grey">快递地址：北京市昌平区东村家园物业写字楼205室</text><br/>
					<text class="word-grey">收货姓名：某某公司客服中心</text><br/>
					<text class="word-grey">联系电话：18610088705</text>
				</view>
				<view class="beizhu">
					<text>请在快递单上备注快递号，快递费用由退款申请方承担；</text><br/>
					<text>我们收到商品后，会尽快安排退款服务，一般在3-5个工作日内处理好</text>
				</view>
			</view>
		</view>
		<view class="bottom-line">-- 我是有底线的卡瑞塔 --</view>
	</view>
</template>

<script>
</script>

<style lang="scss" scoped>
@import "@/common/common.scss";
.draw-back {
	background-color: #f4f4f4;
	.order-info {
		margin-bottom: 20rpx;
		background-color: #fff;
		.title {
			image{
				margin-right: 20rpx;
				width: 40rpx;
				height: 40rpx;
			}
		}
		.content {
			padding-bottom: 20rpx;
			.uni-flex {
				margin: 20rpx 30rpx;
				justify-content: space-between;
				.red {
					color: $uni-bg-color;
				}
			}
		}
	}
	.back-reason {
		background-color: #fff;
		.title {
			justify-content: space-between;
			.other {
				display: flex;
				justify-content: space-between;
				width: 90rpx;
			}
		}
		.content {
			padding: 20rpx 40rpx;
			.upload-photo {
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin-bottom: 40rpx;
				image {
					margin-right: 30rpx;
					width: 80rpx;
					height: 80rpx;
					background-color: $uni-bg-color;
				}
				.word-ml {
					font-size: $uni-font-size-sm;
				}
				.word-sm {
					color: $uni-text-color-grey;
					font-size: $uni-font-size-ssm;
				}
			}
			.address {
				margin-bottom: 20rpx;
				font-size: $uni-font-size-sm;
				.word-grey {
					color: $uni-text-color-grey;
				}
			}
			.beizhu {
				font-size: $uni-font-size-sm;
			}
		}
	}
	.title {
		display: flex;
		align-items: center;
		padding: 30rpx 20rpx;
		border-bottom: 1px solid #f4f4f4;
	}
}
</style>
