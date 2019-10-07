<template>
  <view class="meeting-page">
    <tabs-sticky
      v-if="isShowSticky"
      v-model="tabIndex"
      :fixed="true"
      :tabs="tabs"
      @change="changeTab"
    ></tabs-sticky>
    <mescroll-uni
      @down="downCallback"
      @up="upCallback"
      :up="upOption"
      @scroll="scroll"
      @init="mescrollInit"
      @topclick="topClick"
    >
      <commom-top :lightIndex="lightIndex"></commom-top>

      <view id="tabInList">
        <tabs-sticky v-model="tabIndex" :tabs="tabs" @change="changeTab"></tabs-sticky>
      </view>
      <!-- 筛选条件 -->
      <view
        :class="[{ 'active': isShowSticky }, 'screen-btn','uni-flex','uni-row']"
        v-if="tabIndex == 0"
      >
        <view class="price">
          <text>价格</text>
          <text class="iconfont">&#xe71c;</text>
        </view>
        <view class="price">
          <text>折扣</text>
          <text class="iconfont">&#xe71c;</text>
        </view>
        <view class="price">
          <text>销量</text>
          <text class="iconfont">&#xe71c;</text>
        </view>
        <view class="price all">
          <sl-filter
            :independence="true"
            color="#000000"
            themeColor="#000000"
            :menuList.sync="menuList"
            @result="result"
          ></sl-filter>
        </view>
      </view>
      <!-- 数据列表 -->
      <pd-list :list="pdList" :type="tabs[tabIndex].name"></pd-list>
    </mescroll-uni>
  </view>
</template>

<script>
import commomTop from "./index.vue";
import mixPulldownRefresh from "@/components/mix-pulldown-refresh/mix-pulldown-refresh";
import mixLoadMore from "@/components/mix-load-more/mix-load-more";
import MescrollUni from "@/components/mescroll-uni/mescroll-uni.vue";
import TabsSticky from "@/components/other/tabs-home.vue";
import PdList from "@/components/other/home-list.vue";
import slFilter from "@/components/sl-filter/sl-filter.vue";
import mapGetters from "vuex";
export default {
  data() {
    return {
      lightIndex: 1,
      tabs: ["全部商品", "积分商品"], //导航栏格式 --导航栏组件
      tabIndex: 0, // 当前菜单下标
      navTop: null, // nav距离到顶部的距离 (如计算不准确,可直接写死某个值)
      isShowSticky: false, // 是否悬浮
      pdList: [], // 数据列表
      upOption: {
        noMoreSize: 1,
        textNoMore: "-- 我是有底线的卡瑞塔 --",
        onScroll: true // 是否监听滚动事件, 默认false (配置为true时,可@scroll="scroll"获取到滚动条位置和方向)
      },
      menuList: [
        {
          title: "全部商品",
          key: "sort",
          isSort: true,
          reflexTitle: false,
          defaultSelectedIndex: 0,
          detailList: [
            {
              title: "全部商品",
              value: null
            }
          ]
        }
      ]
    };
  },
  components: {
    commomTop,
    MescrollUni,
    TabsSticky,
    PdList,
    slFilter
  },
  onLoad() {
    uni.showLoading({
      title: "加载中"
    });
    // 获取商品分类
    this.$http
      .request({
        url: "product-categories",
        method: "get"
      })
      .then(res => {
        uni.hideLoading();
        if (res.data.items.length) {
          var datalist = res.data.items;
          datalist.forEach(item => {
            var obj = {
              title: item.name,
              value: item.id
            };
            this.menuList[0].detailList.push(obj);
          });
        }
      });
  },
  methods: {
    result(val) {
      console.log("filter_result:" + JSON.stringify(val));
    },
    // 切换tab
    mescrollInit(mescroll) {
      this.mescroll = mescroll;
    },
    downCallback(mescroll) {
      mescroll.resetUpScroll();
    },
    upCallback(mescroll) {
      //联网加载数据
      if (this.isChangeTab) {
        mescroll.hideUpScroll(); // 切换菜单,不显示mescroll进度, 显示系统进度条
        uni.showLoading();
      }
      this.getListDataFromNet(
        mescroll.num,
        mescroll.size,
        curPageData => {
          //联网成功的回调
          console.log(
            "mescroll.num=" +
              mescroll.num +
              ", mescroll.size=" +
              mescroll.size +
              ", curPageData.length=" +
              curPageData.length
          );

          //设置列表数据
          if (mescroll.num == 1) this.pdList = []; //如果是第一页需手动制空列表
          this.pdList = this.pdList.concat(curPageData); //追加新数据
          console.log("this.pdList", this.pdList);
          // 数据渲染完毕再隐藏加载状态
          this.$nextTick(() => {
            mescroll.endSuccess(curPageData.length);
            // 设置nav到顶部的距离 (需根据自身的情况获取navTop的值, 这里放到列表数据渲染完毕之后)
            // 也可以放到onReady里面,或者菜单顶部的数据(轮播等)加载完毕之后..
            if (!this.navTop) this.setNavTop();
            // 保持tab悬浮,列表数据显示第一条
            if (this.isChangeTab) {
              this.isChangeTab = false;
              uni.hideLoading();
              if (this.isShowSticky) mescroll.scrollTo(this.navTop, 0);
            }
          });
        },
        () => {
          //联网失败的回调,隐藏下拉刷新的状态
          mescroll.endErr();
        }
      );
    },
    setNavTop() {
      let view = uni
        .createSelectorQuery()
        .in(this)
        .select("#tabInList");
      view
        .boundingClientRect(data => {
          console.log("tabInList基本信息 = " + JSON.stringify(data));
          this.navTop = data.top; // 到屏幕顶部的距离
        })
        .exec();
    },
    scroll(mescroll) {
      if (mescroll.getScrollTop() >= this.navTop) {
        this.isShowSticky = true; // 显示悬浮菜单
      } else {
        this.isShowSticky = false; // 隐藏悬浮菜单
      }
    },
    topClick() {
      this.isShowSticky = false;
    },
    changeTab(index) {
      this.isChangeTab = true;
      this.mescroll.resetUpScroll();
    },
    getListDataFromNet(pageNum, pageSize, successCallback, errorCallback) {
      try {
        let listData = [];
        console.log("tabIndex", this.tabIndex);
        this.$http
          .request({
            url: "products",
            method: "get",
            params: {
              "ProductSearch[category_id]": this.tabIndex ? 2 : null,
              page: pageNum,
              "per-page": pageSize
            }
          })
          .then(res => {
            listData = res.data.items;
            successCallback && successCallback(listData);
          });
      } catch (e) {
        //联网失败的回调
        errorCallback && errorCallback();
      }
    }
  }
};
</script>

<style lang="scss">
@import "../../common/common.scss";
page {
  height: 100%;
  overflow: hidden;
}
.meeting-page {
  height: 100%;
  overflow: hidden;
  .nav-bar {
    position: relative;
    z-index: 10;
    height: 82rpx;
    white-space: nowrap;
    box-shadow: 0 2upx 8upx rgba(0, 0, 0, 0.06);
    background-color: #fff;
    .nav-item {
      display: inline-block;
      width: 50%;
      height: 82rpx;
      text-align: center;
      line-height: 82rpx;
      font-size: 28rpx;
      color: $uni-text-color-grey;
      position: relative;
      &:after {
        content: "";
        width: 0;
        height: 0;
        border-bottom: 4upx solid $uni-bg-color;
        position: absolute;
        left: 50%;
        bottom: 0;
        transform: translateX(-50%);
        transition: 0.3s;
      }
    }
    .current {
      color: $uni-bg-color;
      &:after {
        width: 100%;
      }
    }
    .swiper-box {
      height: 100%;
    }

    .panel-scroll-box {
      height: 100%;

      .panel-item {
        background: #fff;
        padding: 30px 0;
        border-bottom: 2px solid #000;
      }
    }
  }
  // 筛选
  .active {
    width: 100%;
    height: 80rpx;
    position: fixed;
    z-index: 998;
    top: 80rpx;
    left: 0;
    width: 100%;
  }
  .screen-btn {
    justify-content: space-around;
    height: 80rpx;
    border-bottom: 20rpx solid #f5f5f5;
    background: #fff;
    .price {
      font-size: 28rpx;

      text {
        line-height: 80rpx;
      }

      .iconfont {
        margin-left: 4rpx;
        font-size: 22rpx;
        color: $uni-text-color-grey;
      }
    }

    .all {
      .iconfont {
        font-size: 24rpx;
        color: $uni-text-color;
      }
    }
  }
}
</style>
