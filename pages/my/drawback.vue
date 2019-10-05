<template>
	<view class="draw-back">
		<view class="order-info">
			<view class="title">
				<text class="iconfont">&#xe675;</text>
				<text>订单信息</text>
			</view>
			<view class="content">
				<view class="uni-flex">
					<text>订单号</text>
					<text>{{orderInfo.id}}</text>
				</view>
				<view class="uni-flex">
					<text>手机号</text>
					<text>{{orderInfo.mobile}}</text>
				</view>
				<view class="uni-flex">
					<text>下单时间</text>
					<text>{{orderInfo.created_at}}</text>
				</view>
				<view class="uni-flex">
					<text>交易状态</text>
					<text>{{orderInfo.status}}</text>
				</view>
				<view class="uni-flex">
					<text>退还金币</text>
					<text>128个</text>
				</view>
				<view class="uni-flex">
					<text>退款金额</text>
					<text class="red">￥{{orderInfo.amount}}</text>
				</view>
			</view>
		</view>
		<view class="back-reason">
			<view class="title">
				<text>退款原因</text>
				<view class="other uni-flex uni-row">
					<text>其他</text>
					<text class="iconfont">&#xe642;</text>
				</view>
			</view>
			<view class="content">
				<textarea maxlength="200" placeholder-style="width:100%;border-radius: 5px;font-size:28rpx;" placeholder="请添加退款原因描述..." />
				<view class="upload-photo">
          <view class="photo uni-flex uni-row">
            <text class="iconfont">&#xe64a;</text>
          </view>
          <view class="word-info">
            <view class="word-ml">上传照片</view>
            <view class="word-sm">产品质量问题，运输过程中破损等问题，可申请退货退款。</view>
          </view>
        </view>
        <view class="address">
          <text>请把商品快递到：</text>
          <br />
          <text class="word-grey">快递地址：北京市昌平区东村家园物业写字楼205室</text>
          <br />
          <text class="word-grey">收货姓名：某某公司客服中心</text>
          <br />
          <text class="word-grey">联系电话：18610088705</text>
        </view>
        <view class="beizhu">
          <text>请在快递单上备注快递号，快递费用由退款申请方承担；</text>
          <br />
          <text>我们收到商品后，会尽快安排退款服务，一般在3-5个工作日内处理好</text>
        </view>
      </view>
    </view>
    <view class="bottom-line">-- 我是有底线的卡瑞塔 --</view>
  </view>
</template>

<script>
	export default {
	  data() {
	    return {
	      orderInfo: '',
	    };
	  },
		onLoad(option) {
			this.$http.request({
				url: 'orders/' + option.orderId,
				method: 'get',
				params: {
					'expand': 'orderProducts,orderProducts.product'
				}
			}).then(res => {
				this.orderInfo = res.data
				console.log(this.orderInfo)
			}).catch(console.log)
		}
	 }
</script>

<style lang="scss" scoped>
@import "@/common/common.scss";
.draw-back {
  background-color: #f4f4f4;
  .order-info {
    margin-bottom: 20rpx;
    background-color: #fff;
    .title {
      color: #333;
      .iconfont {
        margin-right: 20rpx;
      }
    }
    .content {
      padding-bottom: 20rpx;
      .uni-flex {
        margin: 20rpx 40rpx;
        justify-content: space-between;
        color: #333;
        .red {
          color: $uni-bg-color;
        }
      }
    }
  }
  .back-reason {
    background-color: #fff;
    .title {
      color: #333;
      justify-content: space-between;
      .other {
        align-items: center;
        width: 90rpx;
        .iconfont {
          margin-left: 10rpx;
          font-size: 24rpx;
        }
      }
    }
    .content {
      width: 100%;
      uni-textarea {
        box-sizing: border-box;
        width: 670rpx;
        height: 230rpx;
        padding: 20rpx;
        margin: 20rpx 40rpx;
        background: #f4f4f4;
        border-radius: 5px;
      }

      .upload-photo {
        display: flex;
        align-items: center;
        padding: 0 40rpx;
        padding-bottom: 20rpx;
        border-bottom: 1px solid $uni-border-color;
        .photo {
          width: 90rpx;
          height: 90rpx;
          margin-right: 28rpx;
          justify-content: center;
          align-items: center;
          border-radius: 4px;
          background: $uni-bg-color;
          .iconfont {
            font-size: 50rpx;
            color: #fff;
          }
        }
        .word-ml {
          color: #333;
          font-size: 28rpx;
        }
        .word-sm {
          color: $uni-text-color-grey;
          font-size: $uni-font-size-ssm;
        }
      }
      .address {
        padding: 20rpx 40rpx;
        font-size: $uni-font-size-ssm;
        .word-grey {
          color: $uni-text-color-grey;
        }
      }
      .beizhu {
        color: #333;
        padding: 0rpx 40rpx;
        padding-bottom: 30rpx;
        font-size: $uni-font-size-ssm;
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
