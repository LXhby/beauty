<template>
	<view class="reward-page">
		<top-bar rightText="实名认证" :detailist="detailist" :isreal="false"></top-bar>
		<view class="main">
			<view class="main-title">
				<view class="line"></view>
				<text class="text">上课记录</text>
			</view>
			<view class="main-content">
				<view class="list">
					<view class="item uni-flex uni-row" v-for="item in studyRecords" @click="gopage(item.forum.id)">
						<view class="left uni-flex uni-column">
							<view class="title">{{item.forum.name}}</view>
							<view class="bottom-box uni-flex uni-row">
								<view class="time">
									<text class="iconfont">&#xe6dd;</text>
									<text>{{getTime(item.forum.start_date,item.forum.end_date)}}</text>
								</view>
								<view class="address">
									<text class="iconfont">&#xe853;</text>
									<text>{{item.forum.address}}</text>
								</view>
							</view>
						</view>
						<view v-if="new Date(item.forum.start_date).getTime() > new Date().getTime()" class="right dark">
							<view class="num">
								<text>{{Math.ceil((new Date(item.forum.start_date).getTime() - new Date().getTime())/1000/60/60/24)}}</text>天
							</view>
							<text>倒计时</text>
						</view>
						<view v-if="new Date(item.forum.start_date).getTime() < new Date().getTime() && item.is_signed_in" class="right dark">
							<text>已签到</text>
						</view>
						<view v-if="new Date(item.forum.start_date).getTime() < new Date().getTime() && !item.is_signed_in" class="right dark gray">
							<text>未签到</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="bottom-line">-- 我是有底线的卡瑞塔 --</view>
	</view>
</template>


<script>
	import topBar from "@/components/account/index1.vue";
	import {
		mapGetters
	} from "vuex";
	import Moment from "moment";
	export default {
		components: {
			topBar
		},
		computed: {
			...mapGetters(["userInfo"])
		},
		data() {
			return {
				detailist: ["可提现", "待提现", "产品额度", "粉丝量"],
				studyRecords: [], // 学习记录
			};
		},
		onLoad() {
			this.$http.request({
				url: 'forum-order',
				method: 'get',
				params: {
					'ForumOrderSearch[user_id]': this.userInfo.id,
					'expand': 'forum'
				}
			}).then(res => {
				this.studyRecords = res.data.items
			}).catch(console.log)
		},
		methods: {
			gopage(courseId) {
				uni.navigateTo({
					url: '/pages/benefits/courseinfo?courseId=' + courseId
				})
			},
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
		}
	};
</script>

<style lang="scss" scoped>
	@import "../../style/topaccount.scss";
	@import "../../common/common.scss";

	.reward-page {
		.main {
			.main-content {
				.total-top {
					padding: 20rpx 12rpx;
					border-bottom: 1px solid $uni-border-color;
					font-size: 28rpx;
					color: #304455;
				}

				.list {
					padding: 0 30rpx;

					.item {
						align-items: center;
						justify-content: space-between;
						margin-top: 30rpx;
						padding: 30rpx;
						background-color: $uni-bg-color-hovers;
						border-radius: 5px;

						.left {
							width: 500rpx;
							height: 100rpx;
							justify-content: space-between;

							.title {
								width: 100%;
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
									font-size: 24rpx;
								}

								.address {
									font-size: 24rpx;
								}

								.iconfont {
									color: $uni-text-color;
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
									font-size: 28rpx;
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
	}
</style>
