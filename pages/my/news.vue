<template>
	<view class="news-page">
		<mescroll-uni :down="downOption" @down="downCallback" @up="upCallback" :up="upOption">
			<top-bar rightText="实名认证" :detailist="detailist" :isreal="false"></top-bar>
			<view class="main">
				<view class="main-title">
					<view class="left">
						<view class="line"></view>
						<text class="text">我的消息</text>
					</view>
					<view class="right">
						<sl-filter :themeColor="themeColor" :menuList="menuList" @result="result"></sl-filter>
					</view>
				</view>
				<view class="main-content">
					<view class="news-item" v-for="item in newsList">
						<view class="title">
							<text>【系统消息】</text>
							<text class="time">2019.08.31 10:23</text>
						</view>
						<view class="content">系统将系统将系统将系统将系统将系统将系统将系统将v系统将系统将系统将系统将系统将系统将</view>
					</view>
				</view>
			</view>
		</mescroll-uni>
	</view>
</template>


<script>
	import topBar from "@/components/account/index1.vue";
	import slFilter from '@/components/sl-filter/sl-filter.vue';
	import MescrollUni from "@/components/mescroll-uni/mescroll-uni.vue";
	export default {
		components: {
			topBar,
			slFilter,
			MescrollUni
		},
		data() {
			return {
				detailist: ["可提现", "待提现", "产品额度", "粉丝量"],
				themeColor: '#000000',
				page: 1,
				newsList: [],
				searchParam: '',
				upOption: {
					noMoreSize: 1,
					textNoMore: "-- 我是有底线的卡瑞塔 --",
					onScroll: true, // 是否监听滚动
				},
				downOption: {
					auto: false //是否在初始化后,自动执行下拉回调callback; 默认true
				},
				menuList: [{
					'title': '筛选',
					'key': 'sort',
					'isSort': true,
					'reflexTitle': true,
					'detailList': [{
							title: "全部",
							value: null
						},
						{
							title: "会员通知",
							value: "member.order.create"
						},
						{
							title: "报名通知",
							value: "forum.order.create"
						},
						{
							title: "会议提醒",
							value: "forum.order.notify"
						},
						{
							title: "会议签到通知",
							value: "forum.siginin.notify"
						},
						{
							title: "签到成功通知",
							value: "forum.siginedin.notify"
						},
						{
							title: "推荐成功通知",
							value: "user.commend.success"
						},
						{
							title: "收益到账提醒",
							value: "income.repay.notify"
						},
						{
							title: "提现申请通知",
							value: "income.settle.create"
						},
						{
							title: "提现审核受理通知",
							value: "income.settle.approved"
						},
						{
							title: "提现成功通知",
							value: "income.settle.success"
						},
					],
				}],
			};
		},
		onLoad() {
			this.findAllNews(null)
		},
		methods: {
			findAllNews(data) {
				this.$http.request({
					url: 'wechat-notifications',
					method: 'get',
					params: {
						'WechatNotificationSearch[type]': data,
						page: this.page,
						"per-page": 10,
						sort: '-send_at'
					}
				}).then(res => {
					this.newsList = res.data.items
				}).catch(console.log)
			},
			result(val) {
				this.searchParam = val.sort
				this.findAllNews(val.sort)
			},
			/*下拉刷新的回调 */
			downCallback(mescroll) {
				//联网加载数据
				this.getListDataFromNet(0, 1, (data) => {
					//联网成功的回调,隐藏下拉刷新的状态
					mescroll.endSuccess();
					//设置列表数据
					this.newsList.unshift(data[0]);
				}, () => {
					//联网失败的回调,隐藏下拉刷新的状态
					mescroll.endErr();
				})
			},
			/*上拉加载的回调: mescroll携带page的参数, 其中num:当前页 从1开始, size:每页数据条数,默认10 */
			upCallback(mescroll) {
				console.log(1)
				//联网加载数据
				this.getListDataFromNet(mescroll.num, mescroll.size, (curPageData, totalSize) => {

					mescroll.endBySize(curPageData.length, totalSize);
					//设置列表数据
					this.newsList = this.newsList.concat(curPageData);
				}, () => {
					//联网失败的回调,隐藏下拉刷新的状态
					mescroll.endErr();
				})
			},
			getListDataFromNet(pageNum, pageSize, successCallback, errorCallback) {
				let listData = [];
				this.$http
					.request({
						url: "wechat-notifications",
						method: "get",
						params: {
							'WechatNotificationSearch[type]': this.searchParam,
							sort: '-send_at',
							page: pageNum,
							"per-page": pageSize,
						}
					})
					.then(res => {
						listData = (res.data.items);
						successCallback && successCallback(listData, res.data._meta.totalCount);
					});
			}
		}
	};
</script>

<style lang="scss" scoped>
	@import "../../style/topaccount.scss";
	@import "../../common/common.scss";

	@font-face {
		font-family: "iconfont";
		/* project id 1377410 */
		src: url("https://at.alicdn.com/t/font_1377410_wk4mbv1sumf.eot");
		src: url("https://at.alicdn.com/t/font_1377410_wk4mbv1sumf.ttf") format("truetype");
	}

	.iconfont {
		font-family: iconfont !important;
		font-size: 32upx;
		font-style: normal;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}

	.news-page {
		.main {
			.main-title {
				justify-content: space-between;

				.left {
					display: flex;
					align-content: center;
				}

				.right {
					display: flex;
					align-content: center;
					margin-right: 46rpx;
					margin-top: -22rpx;
					color: $uni-text-color-grey;
					font-size: 32rpx;
					line-height: 32rpx;
				}
			}

			.main-content {
				padding: 20rpx;
				font-size: 28rpx;
				color: $uni-text-color;

				.news-item {
					padding: 20rpx 40rpx;
					margin-bottom: 34rpx;
					background-color: #f5f5f5;
					border: 1px solid #dddddd;
					border-radius: 4px;

					.title {
						margin-left: -14rpx;
						margin-bottom: 10rpx;
						color: $uni-text-color-title;
						line-height: 40rpx;

						.time {
							float: right;
							font-size: 24rpx;
							color: $uni-text-color-grey;
						}
					}

					.content {}

					&:last-child {
						margin-bottom: 0px;
					}
				}
			}
		}
	}
</style>
