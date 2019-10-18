<template>
	<view class="integral-page">
		<mescroll-uni :down="downOption" @down="downCallback" @up="upCallback">

			<commom-top :lightIndex="lightIndex"></commom-top>
			<view class="main">
				<view class="top uni-flex uni-row">
					<view>
						<text>我的积分：</text>
						<text class="dark-color">{{userInfo.coin_count}}金币</text>
					</view>
					<view>
						<text>已用积分：</text>
						<text class="dark-color">{{userInfo.coin_used}}金币</text>
					</view>

				</view>
				<view class="item uni-flex uni-row" v-for="(item,index) in dataList" :key="index">
					<view class="left uni-flex uni-row">
						<image :src="url+item.image" mode="aspectFill"></image>
						<view class="detail">
							<text class="title">{{item.name}}</text>
							<view class="bottom ">
								<text style="margin-right:10rpx;">已兑换{{item.sold_count}}个</text>
								<text >剩余{{item.stock}}个</text>
							</view>
						</view>
					</view>

					<view class="right">
						<view class="money">
							<text class="num">{{item.price}}</text>
							<text>金币</text>
						</view>
						<view class="btn">
							+兑换
						</view>
					</view>
				</view>
			</view>
		</mescroll-uni>
	</view>
</template>

<script>
	import MescrollUni from "@/components/mescroll-uni/mescroll-uni.vue";
	import {
		mapGetters
	} from "vuex";
	import commomTop from "./index.vue";
	export default {
		components: {
			commomTop,
			MescrollUni
		},
		computed: {
			...mapGetters(['userInfo'])
		},
		data() {
			return {
				lightIndex: 2,
				url: '',
				upOption: {
					noMoreSize: 1,
					textNoMore: "-- 我是有底线的卡瑞塔 --",
					onScroll: true, // 是否监听滚动
				},
				downOption: {
					auto: false //是否在初始化后,自动执行下拉回调callback; 默认true
				},
				dataList: []
			}
		},
		onLoad() {
			this.url = this.$baseUrl;
		},
		methods: {
			/*下拉刷新的回调 */
			downCallback(mescroll) {
				//联网加载数据
				this.getListDataFromNet(0, 1, (data) => {
					//联网成功的回调,隐藏下拉刷新的状态
					mescroll.endSuccess();
					//设置列表数据
					this.dataList.unshift(data[0]);
				}, () => {
					//联网失败的回调,隐藏下拉刷新的状态
					mescroll.endErr();
				})
			},
			/*上拉加载的回调: mescroll携带page的参数, 其中num:当前页 从1开始, size:每页数据条数,默认10 */
			upCallback(mescroll) {
				//联网加载数据
				this.getListDataFromNet(mescroll.num, mescroll.size, (curPageData, totalSize) => {


					//方法一(推荐): 后台接口有返回列表的总页数 totalPage
					//mescroll.endByPage(curPageData.length, totalPage); //必传参数(当前页的数据个数, 总页数)

					//方法二(推荐): 后台接口有返回列表的总数据量 totalSize
					//mescroll.endBySize(curPageData.length, totalSize); //必传参数(当前页的数据个数, 总数据量)

					//方法三(推荐): 您有其他方式知道是否有下一页 hasNext
					//mescroll.endSuccess(curPageData.length, hasNext); //必传参数(当前页的数据个数, 是否有下一页true/false)

					//方法四 (不推荐),会存在一个小问题:比如列表共有20条数据,每页加载10条,共2页.如果只根据当前页的数据个数判断,则需翻到第三页才会知道无更多数据.
					// mescroll.endSuccess(curPageData.length);

					mescroll.endBySize(curPageData.length, totalSize);
					//设置列表数据
					this.dataList = this.dataList.concat(curPageData);
				}, () => {
					//联网失败的回调,隐藏下拉刷新的状态
					mescroll.endErr();
				})
			},
			getListDataFromNet(pageNum, pageSize, successCallback, errorCallback) {
				let listData = [];
				this.$http
					.request({
						url: "products",
						method: "get",
						params: {
							"ProductSearch[category_id]": 2,
							page: pageNum,
							"per-page": pageSize,
						}
					})
					.then(res => {
						listData = (res.data.items);
						successCallback && successCallback(listData, res.data._meta.totalCount);
					});
			}
		},
	}
</script>

<style lang="scss" scoped>
	@import "../../common/common.scss";

	.integral-page {
		.main {
			.top {
				height: 80rpx;
				padding: 0 20rpx;
				justify-content: space-between;
				align-items: center;
				border-bottom: 1px solid $uni-border-color;

				text {
					color: $uni-text-color;
					font-size: 28rpx;
				}

				.dark-color {
					color: $uni-bg-color;
				}
			}

			.item {
				padding: 20rpx;
				justify-content: space-between;
				align-items: center;
				border-bottom: 20rpx solid $uni-border-color;

				.left {
					color: $uni-text-color;
					align-items: center;

					image {
						width: 200rpx;
						height: 150rpx;
						margin-right: 20rpx;
					}

					.detail {
						min-height: 150rpx;
						display: flex;
						flex-direction: column;
						justify-content: space-between;
						width: 300rpx;

						.title {
							font-size: 28rpx;
						}

						.bottom {

							// margin-top:20rpx;
							text {
								font-size: 20rpx;
								color: $uni-text-color-grey;
							}
						}
					}
				}

				.right {

					color: $uni-text-color;

					.money {
						font-size: 24rpx;

						.num {
							font-size: 32rpx;
						}
					}

					.btn {
						width: 140rpx;
						height: 45rpx;
						margin-top: 20rpx;
						border-radius: 45rpx;
						background: $uni-bg-color;
						text-align: center;
						color: #fff;
						line-height: 45rpx;
						font-size: 24rpx;
					}
				}
			}
		}

	}
</style>
