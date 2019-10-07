<template>
	<view class="reward-page">
		<mescroll-uni :down="downOption" @down="downCallback" @up="upCallback" :up="upOption">
			<top-bar rightText="实名认证" :detailist="detailist" :isreal="false"></top-bar>
			<view class="main">
				<view class="main-title">
					<view class="line"></view>
					<text class="text">我的奖金</text>
				</view>
				<view class="main-content" v-for="item in rewardList">
					<view class="total-top uni-flex uni-row" style="justify-content: space-between;">
						<text>总收益：￥{{item.amount}}元</text>
						<text>本月：￥2340.00元</text>
					</view>
					<view class="item">
						<view class="money uni-flex uni-row" style="justify-content: space-between;align-items: center;">
							<text class="bold">VIP会员奖金：￥1000.00元</text>
							<text class="status">状态：{{item.status}}</text>
						</view>
						<view class="from uni-flex uni-row" style="justify-content: space-between;">
							<text class="first">奖金来源：{{item.remark}}</text>
							<text class="time">{{item.updated_at | convertTime('YYYY-MM-DD HH:mm:ss')}}</text>
						</view>
					</view>
				</view>
			</view>
		</mescroll-uni>
	</view>
</template>


<script>
	import {
		mapGetters
	} from "vuex";
	import topBar from "@/components/account/index1.vue";
	import MescrollUni from "@/components/mescroll-uni/mescroll-uni.vue";
	export default {
		components: {
			topBar,
			MescrollUni
		},
		computed: {
			...mapGetters(["userInfo"])
		},
		data() {
			return {
				detailist: ["可提现", "待提现", "产品额度", "粉丝量"],
				page: 1,
				rewardList: [],
				upOption: {
					noMoreSize: 1,
					textNoMore: "-- 我是有底线的卡瑞塔 --",
					onScroll: true, // 是否监听滚动
				},
				downOption: {
					auto: false //是否在初始化后,自动执行下拉回调callback; 默认true
				},
			}
		},
		onLoad() {
			this.findAllReward()
		},
		methods: {
			findAllReward() {
				this.$http.request({
					url: 'incomes',
					method: 'get',
					params: {
						'incomeSearch[user_id]': this.userInfo.id,
						sort: '-updated_at',
						page: this.page,
						"per-page": 10
					}
				}).then(res => {
					this.rewardList = res.data.items
				}).catch(console.log)
			},
			/*下拉刷新的回调 */
			downCallback(mescroll) {
				//联网加载数据
				this.getListDataFromNet(0, 1, (data) => {
					//联网成功的回调,隐藏下拉刷新的状态
					mescroll.endSuccess();
					//设置列表数据
					this.rewardList.unshift(data[0]);
				}, () => {
					//联网失败的回调,隐藏下拉刷新的状态
					mescroll.endErr();
				})
			},
			/*上拉加载的回调: mescroll携带page的参数, 其中num:当前页 从1开始, size:每页数据条数,默认10 */
			upCallback(mescroll) {
				//联网加载数据
				this.getListDataFromNet(mescroll.num, mescroll.size, (curPageData, totalSize) => {

					mescroll.endBySize(curPageData.length, totalSize);
					//设置列表数据
					this.rewardList = this.rewardList.concat(curPageData);
				}, () => {
					//联网失败的回调,隐藏下拉刷新的状态
					mescroll.endErr();
				})
			},
			getListDataFromNet(pageNum, pageSize, successCallback, errorCallback) {
				let listData = [];
				this.$http
					.request({
						url: "incomes",
						method: "get",
						params: {
							'incomeSearch[user_id]': this.userInfo.id,
							page: pageNum,
							sort: '-updated_at',
							"per-page": pageSize,
						}
					})
					.then(res => {
						listData = (res.data.items);
						successCallback && successCallback(listData, res.data._meta.totalCount);
					});
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "../../style/topaccount.scss";
	@import "../../common/common.scss";

	@font-face {
		font-family: 'iconfont';
		/* project id 1377410 */
		src: url('https://at.alicdn.com/t/font_1377410_wk4mbv1sumf.eot');
		src: url('https://at.alicdn.com/t/font_1377410_wk4mbv1sumf.ttf') format('truetype');
	}

	.iconfont {
		font-family: iconfont !important;
		font-size: 32upx;
		font-style: normal;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale
	}

	.reward-page {
		.main {
			.main-content {
				padding: 0 36rpx;
				color: $uni-text-color;

				.total-top {
					padding: 20rpx 12rpx;
					border-bottom: 1px solid $uni-border-color;
					font-size: 28rpx;
					color: #304455;
				}

				.item {
					padding: 20rpx 12rpx;
					border-bottom: 1px solid $uni-border-color;

					.money {
						.bold {
							color: $uni-bg-color;
						}

						.status {
							font-size: 24rpx;
						}
					}

					.from {
						margin-top: 8rpx;
						font-size: 24rpx;

						.first {
							flex: 1;
						}

						.time {
							color: $uni-text-color-grey;
						}
					}
				}
			}
		}
	}
</style>
