<template>
  <view class="my-page">
    <top-bar rightText="实名认证" :detailist="detailist" :isreal="false"></top-bar>
    <view class="active-nav">
      <navigator url="/pages/my/order">
        <view class="uni-flex uni-row nav-title">
          <view class="nav-left">
            <text class="iconfont">&#xe643;</text>
            <text>我的订单</text>
          </view>
          <view class="order-nav">
            <text>全部订单</text>
            <text class="iconfont">&#xe642;</text>
          </view>
        </view>
      </navigator>

      <uni-grid :column="5" :show-border="false" :square="false" class="my-list">
        <uni-grid-item>
          <image class="image" src="../../static/ic_待付款.png" mode="aspectFill" />
          <text class="text">代付款</text>
        </uni-grid-item>
        <uni-grid-item>
          <image class="image" src="../../static/待发货订单.png" mode="aspectFill" />
          <text class="text">代发货</text>
        </uni-grid-item>
        <uni-grid-item>
          <image class="image" src="../../static/待收货.png" mode="aspectFill" />
          <text class="text">待收货</text>
        </uni-grid-item>
        <uni-grid-item>
          <image class="image" src="../../static/待评价订单.png" mode="aspectFill" />
          <text class="text">待评价</text>
        </uni-grid-item>
        <uni-grid-item>
          <image class="image" src="../../static/退款.png" mode="aspectFill" />
          <text class="text">退款</text>
        </uni-grid-item>
      </uni-grid>
    </view>

    <view class="all-list">
      <navigator url="/pages/my/shipment">
        <view class="all-item">
          <view class="item-left">
            <text class="iconfont">&#xe64f;</text>
            <text class="nav-text">出货记录</text>
          </view>
          <text class="iconfont arow">&#xe610;</text>
        </view>
      </navigator>
      <navigator url="/pages/my/fans">
        <view class="all-item">
          <view class="item-left">
            <text class="iconfont" :style="{color:'#5eccf6'}">&#xe61d;</text>
            <text class="nav-text">我的粉丝</text>
          </view>
          <text class="iconfont arow">&#xe610;</text>
        </view>
      </navigator>
      <navigator url="/pages/my/reward">
        <view class="all-item">
          <view class="item-left">
            <text class="iconfont font-40" :style="{color:'#ffce2c'}">&#xe679;</text>
            <text class="nav-text">我的奖金</text>
          </view>
          <text class="iconfont arow">&#xe610;</text>
        </view>
      </navigator>
      <view class="all-item">
        <view class="item-left">
          <text class="iconfont" :style="{color:'#ff9858'}" style="font-size: 46rpx;">&#xe841;</text>
          <text class="nav-text">提现申请</text>
        </view>
        <text class="iconfont arow">&#xe610;</text>
      </view>
      <navigator url="/pages/my/haveclass">
        <view class="all-item">
          <view class="item-left">
            <text class="iconfont" :style="{color:'#d351ff'}" style="font-size: 44rpx;">&#xe620;</text>
            <text class="nav-text">上课记录</text>
          </view>
          <text class="iconfont arow">&#xe610;</text>
        </view>
      </navigator>
	  <navigator url="/pages/my/collection">
	    <view class="all-item">
	      <view class="item-left">
	        <text class="iconfont" :style="{color:'#d351ff'}" style="font-size: 44rpx;">&#xe620;</text>
	        <text class="nav-text">我的收藏</text>
	      </view>
	      <text class="iconfont arow">&#xe610;</text>
	    </view>
	  </navigator>
      <navigator url="/pages/my/address">
        <view class="all-item">
          <view class="item-left">
            <text class="iconfont" :style="{color:'#00b2b2'}" style="font-size: 44rpx;">&#xe657;</text>
            <text class="nav-text">收获地址</text>
          </view>
          <text class="iconfont arow">&#xe610;</text>
        </view>
      </navigator>
      <navigator url="/pages/my/news">
        <view class="all-item">
          <view class="item-left">
            <text class="iconfont" :style="{color:'#2cd080'}" style="font-size: 42rpx;">&#xe60b;</text>
            <text class="nav-text">我的消息</text>
          </view>
          <text class="iconfont arow">&#xe610;</text>
        </view>
      </navigator>
      <navigator url="/pages/my/serverule">
        <view class="all-item">
          <view class="item-left">
            <text class="iconfont" :style="{color:'#a2d262'}" style="font-size: 36rpx;">&#xe69b;</text>
            <text class="nav-text">服务条款</text>
          </view>
          <text class="iconfont arow">&#xe610;</text>
        </view>
      </navigator>
      <navigator url="/pages/about/index">
        <view class="all-item">
          <view class="item-left">
            <text class="iconfont" :style="{color:'#006dd9'}" style="font-size: 44rpx;">&#xe7ca;</text>
            <text class="nav-text">关于我们</text>
          </view>
          <text class="iconfont arow">&#xe610;</text>
        </view>
      </navigator>
      <view class="all-item">
        <view class="item-left">
          <text class="iconfont" :style="{color:'#ff8db7'}" style="font-size: 44rpx;">&#xe61b;</text>
          <text class="nav-text">客服电话</text>
        </view>
        <view class="arow">后台设置电话</view>
      </view>
    </view>
  </view>
</template>

<script>
import topBar from "@/components/account/index1.vue";
import uniGrid from "@/components/uni-grid/uni-grid.vue";
import uniGridItem from "@/components/uni-grid-item/uni-grid-item.vue";
export default {
  components: {
    topBar,
    uniGrid,
    uniGridItem
  },
  data() {
    return {
      detailist: ["可提现", "待提现", "产品额度", "粉丝量"]
    };
  }
};
</script>

<style lang="scss" scoped>
@import "../../style/topaccount.scss";


.my-page {
  .active-nav {
    border-bottom: $uni-border-height solid #f5f5f5;

    .nav-title {
      .nav-left {
        .iconfont {
          color: $uni-bg-color-hover;
        }

        text {
          font-size: 32rpx;
        }
      }

      .order-nav {
        text {
          font-size: 24rpx;
        }
      }
    }

    .my-list {
      text {
        font-size: 24rpx;
        color: #000;
      }

      image {
        width: 60rpx;
        height: 60rpx;
      }
    }
  }

  .all-list {
    padding: 0 42rpx;

    .all-item {
      position: relative;
      height: 86rpx;
      border-bottom: 1px solid $uni-border-color;

      .item-left {
        .iconfont {
          font-size: 40rpx;
          line-height: 86rpx;
        }

        .font-40 {
          font-size: 44rpx;
        }

        .nav-text {
          position: absolute;
          height: 100%;
          left: 36px;
          line-height: 86rpx;
          font-size: 32rpx;
          color: #c2c2c2;
        }
      }

      .arow {
        position: absolute;
        top: 0px;
        bottom: 0px;
        margin: auto;
        right: 0;
        height: 28rpx;
        font-size: 32rpx;
        color: #ccc;
      }
    }
  }
}
</style>
