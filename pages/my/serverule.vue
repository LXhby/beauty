<template>
  <view class="about-page">
    <top-bar rightText="实名认证" :detailist="detailist" :isreal="false"></top-bar>
    <view class="main">
      <view class="main-title">
        <view class="line"></view>
        <text class="text">服务条款</text>
      </view>
      <view class="main-content" v-html="config.member_rights">后台设置</view>
    </view>
    <view class="bottom-line">-- 我是有底线的{{config.app_name}} --</view>
  </view>
</template>


<script>
import topBar from "@/components/account/index1.vue";
import { mapGetters } from "vuex";
export default {
  components: {
    topBar
  },
  computed: {
      ...mapGetters(['config'])
    },
  data() {
    return {
      detailist: ["可提现", "待提现", "产品额度", "粉丝量"],
	  items: [
	          { title: "会员通知", value: "member.order.create" },
	          { title: "报名通知", value: "forum.order.create" },
	          { title: "会议提醒", value: "forum.order.notify" },
	          { title: "会议签到通知", value: "forum.siginin.notify" },
	          { title: "签到成功通知", value: "forum.siginedin.notify" },
	          { title: "推荐成功通知", value: "user.commend.success" },
	          { title: "收益到账提醒", value: "income.repay.notify" },
	          { title: "提现申请通知", value: "income.settle.create" },
	          { title: "提现审核受理通知", value: "income.settle.approved" },
	          { title: "提现成功通知", value: "income.settle.success" },
	        ],
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
