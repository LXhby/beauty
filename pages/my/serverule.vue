<template>
  <view class="about-page">
    <top-bar rightText="实名认证" :detailist="detailist" :isreal="false"></top-bar>
    <view class="main">
      <view class="main-title">
        <view class="line"></view>
        <text class="text">服务条款</text>
      </view>
      <view class="main-content">后台设置</view>
    </view>
    <view class="bottom-line">-- 我是有底线的卡瑞塔 --</view>
  </view>
</template>


<script>
import topBar from "@/components/account/index1.vue";
export default {
  components: {
    topBar
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
@import "../../common/common.scss";
@font-face {
  font-family: "iconfont"; /* project id 1377410 */
  src: url("https://at.alicdn.com/t/font_1377410_wk4mbv1sumf.eot");
  src: url("https://at.alicdn.com/t/font_1377410_wk4mbv1sumf.ttf")
    format("truetype");
}
.iconfont {
  font-family: iconfont !important;
  font-size: 32upx;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.about-page {
  .main {
    .main-content {
      padding: 20rpx 48rpx;
      font-size: 28rpx;
      color: $uni-text-color;
    }
  }
}
</style>
