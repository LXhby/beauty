<template>
  <view class="meeting-page">
    <commom-top :lightIndex="lightIndex"></commom-top>
    <view class="main">
      <view class="main-title">
        <view class="line"></view>
        <text class="text">活动预告</text>
      </view>
      <view class="list">
        <view class="item uni-flex uni-row" v-for="(item,index) in forumsList" :key="index">
          <view class="left uni-flex uni-column">
            <view class="title">{{item.name}}</view>
            <view class="bottom-box uni-flex uni-row">
              <view class="time">
                <text class="iconfont">&#xe6dd;</text>
                <text>{{getTime(item.start_date,item.end_date)}}</text>
              </view>
              <view class="address">
                <text class="iconfont">&#xe657;</text>
                <text>{{item.address}}</text>
              </view>
            </view>
          </view>
          <view
            :class="[getCount(item.start_date,item.end_date)[1] === '已结束'?'gray':'dark','right']"
          >
            <view class="num">
              <text
                v-if="getCount(item.start_date,item.end_date)[0]"
              >{{getCount(item.start_date,item.end_date)[0]}}天</text>
            </view>
            <text>{{getCount(item.start_date,item.end_date)[1]}}</text>
          </view>
        </view>
      </view>
    </view>
    <view class="bottom-line">-- 我是有底线的{{config.app_name}} --</view>
  </view>
</template>

<script>
import commomTop from "./index.vue";
import { mapGetters } from "vuex";
import Moment from "moment";
export default {
  components: {
    commomTop
  },
  computed: {
    ...mapGetters(["config"])
  },
  data() {
    return {
      lightIndex: 0,
      forumsList: [],
      bannerList: []
    };
  },
  onLoad() {
    uni.showLoading({
      title: "加载中"
    });
    this.$http
      .request({
        url: "forums",
        method: "get"
      })
      .then(res => {
        uni.hideLoading();
        this.forumsList = res.data.items;
      });
  },
  methods: {
    getTime(start, end) {
      if (Moment(start).year() != Moment(end).year()) {
        return (
          Moment(start).format("YYYY年MM月DD日") +
          "-" +
          Moment(end).format("YYYY年MM月DD日")
        );
      } else {
        if (Moment(start).month() != Moment(end).month()) {
          return (
            Moment(start).format("YYYY年MM月DD日") +
            "-" +
            Moment(end).format("MM月DD日")
          );
        } else {
          return (
            Moment(start).format("YYYY年MM月DD日") +
            "-" +
            Moment(end).format("DD日")
          );
        }
      }
    },
    getCount(start, end) {
      if (Moment().isBefore(start)) {
        var time = Moment(start).format("X") - Moment().format("X");
        console.log(time / 60 / 60 / 24);
        var str = parseInt(time / 60 / 60 / 24);
        return [str, "倒计时"];
      } else {
        if (Moment().isAfter(end)) {
          return ["0", "已结束"];
        } else {
          return [null, "进行中"];
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../common/common.scss";

.meeting-page {
  .main {
    padding-top: 20rpx;

    .main-title {
      border-bottom: none;
    }

    .list {
      margin-top: -20rpx;
      padding: 0 20rpx;

      .item {
        align-items: center;
        justify-content: space-between;
        margin-top: 30rpx;
        padding: 30rpx;
        background-color: $uni-bg-color-hovers;
        border-radius: 5px;

        .left {
          flex: 1;
          height: 100rpx;
          margin-right: 10rpx;
          justify-content: space-between;

          .title {
            flex: 1;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            font-size: 32rpx;
            color: #000000;
            font-weight: 600;
          }

          .bottom-box {
            color: $uni-text-color;
            justify-content: space-between;
            align-items: center;

            .time {
              width: 330rpx;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
              font-size: 28rpx;
              vertical-align: middle;
              text {
                vertical-align: middle;
              }
            }

            .address {
              width: 200rpx;
              margin-left: 20rpx;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              font-size: 28rpx;
            }

            .iconfont {
              font-size: 32rpx;
              margin-right: 6rpx;
              color: $uni-text-color;
              vertical-align: middle;
            }
          }
        }

        .right {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          align-items: center;
          width: 90rpx;
          height: 90rpx;
          color: #fff;
          border-radius: 5px;

          text {
            font-size: 24rpx;
            line-height: 24rpx;
          }

          .num {
            font-size: 24rpx;
            line-height: 24rpx;

            text {
            }
          }
        }

        .dark {
          background-color: $uni-bg-color-grey;
        }

        .gray {
          background-color: $uni-textbg-color-grey;
        }
      }
    }
  }
}
</style>
