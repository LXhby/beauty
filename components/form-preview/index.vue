<template>
  <view class="pay-preview">
    <view class="preview__hd">
      <label class="label" v-html="headerLabel"></label>
      <em class="preview__value" v-html="headerValue || '&nbsp;'"></em>
    </view>
    <view class="preview__bd">
      <view class="preview__item" v-for="item in bodyItems">
        <label class="preview__label">{{(item.label)}}</label>
        <span class="preview__value">{{(item.value)}}</span>
      </view>
    </view>
    <view class="preview__ft">
      <button  v-for="(button,index) in footerButtons" :key="index" color="primary" depressed @click="onButtonClick(button.onButtonClick, button.link)" large class="regist-btn">{{button.text}}</button>
    </view>
  </view>
</template>

<script>
export default {
  name: "form-preview",
  props: ["headerLabel", "headerValue", "bodyItems", "footerButtons", "name"],
  methods: {
    onButtonClick(cb, link) {
      cb && cb(this.name);
      if (link) {
        this.go(link, this.$router);
      }
    },
    go(url, $router) {
      if (/^javas/.test(url) || !url) return;
      const useRouter =
        typeof url === "object" ||
        ($router && typeof url === "string" && !/http/.test(url));
      if (useRouter) {
        if (typeof url === "object" && url.replace === true) {
          $router.replace(url);
        } else {
          url === "BACK" ? $router.go(-1) : $router.push(url);
        }
      } else {
        window.location.href = url;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.pay-preview {
  color: #999999;
  background-color: #fff;
  .preview__hd {
    position: relative;
    padding: 20rpx 30rpx;
    text-align: right;
    line-height: 80rpx;
    &:after {
      position: absolute;
      content: " ";
      bottom: 0;
      right: 0;
      left: 30rpx;
      height: 2px;
      border-bottom: 1rpx solid #d9d9d9;
      color: #d9d9d9;
    }
    .label {
      float: left;
      margin-right: 32rpx;
      font-size: 32rpx;
      color: #999999;
      font-weight: 500;
      text-align: justify;
      text-align-last: justify;
    }
    .preview__value {
      display: block;
      overflow: hidden;
      word-break: normal;
      word-wrap: break-word;
      font-size: 46rpx;
      color: #000;
      font-style: normal;
    }
  }
  .preview__bd {
    padding: 20rpx 30rpx;
    .preview__item {
      line-height: 56rpx;
      text-align: right;
      .preview__label {
        float: left;
        font-size: 28rpx;
        margin-right: 28rpx;
        min-width: 115rpx;
        color: #999999;
        font-weight: 500;
        text-align: justify;
        text-align-last: justify;
      }
      .preview__value {
        font-size: 28rpx;
        font-weight: 500;
        display: block;
        overflow: hidden;
        word-break: normal;
        word-wrap: break-word;
      }
    }
  }
  .preview__ft {
    position: relative;
    text-align: center;
    line-height: 100rpx;
    &:after {
      content: " ";
      position: absolute;
      left: 0;
      bottom: 0;
      right: 0;
      height: 2rpx;
      border-top: 2rpx solid $uni-bg-color;
      color: #d5d5d6;
    }
    .regist-btn {
      position: relative;
      display: block;
      flex: 1;
      text-align: center;
      font-size: 32rpx;
	  border-radius: 0px;
	  background: $uni-bg-color;
	  color: #fff;
      &:after {
        content: " ";
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        height: 2rpx;
        border-top: 2rpx solid $uni-bg-color;
        color: #d5d5d6;
      }
    }
  }
}
</style>
