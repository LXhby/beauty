<template>
	<view class="fans-page">
		<mescroll-uni :down="downOption" @down="downCallback" @up="upCallback" :up="upOption">
			<top-bar rightText="实名认证" :detailist="detailist" :isreal="false"></top-bar>
			<view class="main">
				<view class="main-title">
					<view class="line"></view>
					<text class="text">我的粉丝</text>
				</view>
				<view class="main-content">
					<view class="fans-item uni-flex uni-row" v-for="item in fansList">
						<view class="account-img">
							<image src="../../static/image_massge_people2.png" mode=""></image>
							<text class="iconfont icon-vip">&#xe678;</text>
						</view>
						<view class="item-text">
							<view class="uni-flex unfi-row">
								粉丝昵称（<text class="role">会员角色</text>）
							</view>
							<view class="uni-flex unfi-row" style="justify-content: space-between;">
								<text>粉丝数量：118人</text>
								<text>VIP数量：118人</text>
							</view>
							<view class="uni-flex unfi-row" style="justify-content: space-between;">
								<text>推荐人：王晓文</text>
								<text>归属团队：王晓文</text>
							</view>
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
				fansList: [],
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
					url: 'users',
					method: 'get',
					params: {
						"UserSearch[from_user_id]": this.userInfo.id,
						page: this.page,
						expand: 'member',
						"per-page": 10
					}
				}).then(res => {
					this.fansList = res.data.items
				}).catch(console.log)
			},
			/*下拉刷新的回调 */
			downCallback(mescroll) {
				//联网加载数据
				this.getListDataFromNet(0, 1, (data) => {
					//联网成功的回调,隐藏下拉刷新的状态
					mescroll.endSuccess();
					//设置列表数据
					this.fansList.unshift(data[0]);
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
					this.fansList = this.fansList.concat(curPageData);
				}, () => {
					//联网失败的回调,隐藏下拉刷新的状态
					mescroll.endErr();
				})
			},
			getListDataFromNet(pageNum, pageSize, successCallback, errorCallback) {
				let listData = [];
				this.$http
					.request({
						url: "users",
						method: "get",
						params: {
							"UserSearch[from_user_id]": this.userInfo.id,
							expand: 'member',
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

	.fans-page {
		.main-content {
			padding: 0 36rpx;

			.fans-item {
				line-height: 32rpx;
				padding: 30rpx 0 20rpx 0;
				border-bottom: 1px solid $uni-border-color;
				color: $uni-text-color;

				// 头像
				.account-img {
					position: relative;
					width: 94rpx;
					height: 94rpx;
					margin-left: 12rpx;

					image {
						width: 94rpx;
						height: 94rpx;
					}

					.icon-vip {
						position: absolute;
						top: -10rpx;
						right: 0rpx;
						color: #f4ea2a;
					}
				}

				.item-text {
					width: 100%;
					margin-left: 16rpx;
					padding-right: 12rpx;

					.uni-flex {
						width: 100%;
						font-size: 24rpx;

						.role {
							color: $uni-bg-color;
						}
					}
				}
			}
		}

	}
</style>
