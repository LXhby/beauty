<template>
	<view class="course">
		<view class="banner">
			<image :src="'http://backend.krtamall.yiidev.cn' + forum.banner" mode="aspectFill" v-if="forum.banner"></image>
			<view class="shop-car" @click="gocart">
				<text class="iconfont">&#xe603;</text>
				<uni-badge :text="cartnum.toString()" type="error" class="shopcar-badge" />
			</view>
		</view>

		<view class="course-show">
			<view class="course-name">
				<view class="title">{{forum.name}}</view>
				<view class="course-content">
					<view class="course-list uni-flex uni-row">
						<view class="icon-btn" @click="pushforword">
							<text class="iconfont">&#xe60c;</text>
						</view>
						<swiper class="swiper" :indicator-dots="false" :autoplay="false" :interval="interval" :duration="duration"
						 :current="current">
							<swiper-item v-for="(ele,index) in courseList" :key="index">
								<view class="item-box uni-flex uni-row">
									<view :class="[getSatus(item),'item' ]" v-for="(item,index) in ele" :key="index" @click="goOtherCourse(item)">
										<view class="phase">
											第{{item.courseIndex}}期
										</view>
										<text>{{item.start_date | convertTime('YYYY年MM月DD日')}}</text>
									</view>
								</view>
							</swiper-item>

						</swiper>
						<view class="icon-btn" @click="pushback">
							<text class="iconfont">&#xe60d;</text>
						</view>
					</view>
					<view class="course-position">
						<view class="uni-flex uni-row">
							<text class="iconfont">&#xe608;</text>
							<text>{{forum.start_date}} 至 {{forum.end_date}}</text>
						</view>
						<view class="uni-flex uni-row">
							<text class="iconfont">&#xe602;</text>
							<text>{{forum.address}}</text>
						</view>
						<view class="uni-flex uni-row">
							<text class="iconfont">&#xe63f;</text>
							<text>{{forum.max_count}}人</text>
						</view>
						<view class="uni-flex uni-row">
							<text class="iconfont">&#xe675;</text>
							<text>
								{{forum.summary}}
							</text>
						</view>
					</view>
				</view>
			</view>
			<view class="course-info">
				<view class="course-title">
					<view class="line"></view>
					<text class="text">课程详情</text>
				</view>
				<view class="course-word" v-html="forum.detail"></view>
			</view>

		</view>
		<view class="couse-money">
			<text class="new-price">￥{{forum.price}}</text>
			<text class="old-price">原价: ￥{{forum.original_price}}</text>
			<button :class="[signBtn == '立即报名'?'redstyle':'infostyle','btn']" type="primary" @click="goPay">{{signBtn}}</button>
		</view>
		<!-- <w-picker ref="picker" mode="selector" themeColor="#f00"
    :selectList="selectList" level="1" v-if="selectList.length" :defaultVal="[1]"></w-picker> -->
	</view>
</template>

<script>
	import uniBadge from '@/components/uni-badge/uni-badge.vue';
	import wPicker from "@/components/w-picker/w-picker.vue"
	import {
		mapGetters
	} from "vuex";
	export default {
		components: {
			uniBadge,
			wPicker
		},
		computed: {
			...mapGetters(['config', 'cartnum', 'userInfo'])
		},
		data() {
			return {
				forum: {}, // 课程信息
				interval: 1000,
				duration: 1000,
				bundle_id: '',
				id: '',
				courseList: [],
				nowCourse: {},
				saveIndex: "",
				current: 0,
				signBtn: '立即报名',
				btntype: 'primary',
				selectList: []
			}
		},
		onLoad(option) {
			uni.showLoading({
				title: '正在加载中'
			})
			this.bundle_id = option.bundle_id * 1;
			this.id = option.courseId * 1;
			this.$http.request({
				url: 'forums/' + option.courseId,
				method: 'get',
			}).then(res => {
				this.forum = res.data;
				this.getSameList();
				this.hasBuyForum();
			}).catch(console.log)
		},
		methods: {
			gocart() {
				uni.switchTab({
					url: '/pages/shopcar/index'
				})
			},
			getSatus(item) {
				console.log('item', item)
				if (item.status == '已结束') {
					return 'third'
				} else {
					if (item.id == this.id) {
						return 'one'
					} else {
						return 'two'
					}
				}
			},
			getSameList() {
				this.$http.request({
					url: 'forums',
					method: 'get',
					params: {
						'ForumSearch[bundle_id]': this.bundle_id,
						sort: 'start_date'
					}
				}).then(res => {
					uni.hideLoading();
					var arr = res.data.items;
					arr.forEach((item, index) => {
						this.$set(item, "courseIndex", index + 1);
						if (item.id == this.id) {
							this.nowCourse = item;
							this.saveIndex = index;
						} else {
							this.courseList.push(item);
						}
					});
					this.courseList.unshift(this.nowCourse)
					var result = [];
					for (var i = 0; i < this.courseList.length; i += 3) {
						result.push(this.courseList.slice(i, i + 3));
					}
					this.courseList = result;
					this.selectList = [];
					arr.forEach(item => {
						var obj = {
							label: '第' + item.courseIndex + '期(' + item.start_date + ')',
							value: item.id
						}
						this.selectList.push(obj)
					})
					console.log('this.selectList', this.selectList)
				}).catch(console.log)
			},
			goOtherCourse(item) {
				if (item.status == "已结束") {
					return false;
				} else {
					uni.navigateTo({
						url: '/pages/benefits/courseinfo?courseId=' + item.id + '&bundle_id=' + item.bundle_id
					})
					const info = {
						id: item.id,
						bundle_id: item.bundle_id
					};
				}
			},
			pushforword() {
				if (this.current > 0) {
					this.current -= 1;
				} else {
					return false
				}
			},
			pushback() {
				if (this.current < this.courseList.length - 1) {
					this.current += 1;
				} else {
					return false
				}

			},
			hasBuyForum() {
				this.$http.request({
					url: 'forum-orders',
					method: 'get',
					params: {
						'ForumOrderSearch[user_id]': this.userInfo.id,
						'ForumOrderSearch[forum_id]': this.id,
					}
				}).then(res => {
					if (res.data.items.length > 0 && res.data.items[0].status == "已支付") {
						this.signBtn = "已报名";
					} else {
						this.signBtn = "立即报名";
					}
				})
			},
			goPay() {
				if (this.signBtn != "已报名") {
					this.$http.request({
						url: 'forum-orders',
						method: 'post',
						data: {
							user_id: this.userInfo.id,
							forum_id: this.id,
							quantity: 1
						}
					}).then(res => {
						console.log(res)
						if (res.statusCode == 201) {
							let order = res.data;
							console.log(order)
							if (order.status == "未支付") {
								uni.setStorageSync('payment', JSON.stringify({
									id: order.id,
									type: "FORUM_ORDER"
								}))
								window.location.href = "/#/pages/shopcar/paypage";
							} else {
								uni.showModal({
									title:'恭喜您已报名成功！',
									confirmText:'知道了',
									showCancel:false,
									success:()=>{
										uni.navigateTo({
											url:'/pages/benefits/meeting'
										})
									}
								})
							}
						}
					})
				} else {
					return false;
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	@import "../../common/common.scss";

	page {
		height: 100%;
	}

	.course {
		height: 100%;
		background-color: #f1f1f1;

		.banner {
			position: relative;
			width: 100%;
			height: 420rpx;

			image {
				width: 100%;
				height: 420rpx;
			}

			.shop-car {
				position: absolute;
				top: 20rpx;
				right: 20rpx;
				width: 60rpx;
				height: 60rpx;
				border-radius: 50%;
				background: rgba(0, 0, 0, 0.3);
				text-align: center;

				.iconfont {
					line-height: 60rpx;
					color: #fff;
					font-size: 36rpx;
				}

				.shopcar-badge {
					position: absolute;
					top: -16rpx;
					right: -10rpx;
				}
			}
		}

		.course-show {
			position: relative;
			z-index: 3;
			margin-top: -72rpx;
			margin-bottom: 100rpx;
			box-sizing: border-box;
			padding: 0 20rpx 20rpx 20rpx;

			.course-name {
				margin-bottom: 20rpx;
				border-radius: $uni-border-radius-base;
				background-color: #fff;

				.title {
					height: 70rpx;
					margin-left: 10rpx;
					line-height: 70rpx;
					font-size: 32rpx;
					border-bottom: 1px solid $uni-border-color;
					color: #333;
				}

				.course-content {
					padding: 20rpx;

					.course-list {
						justify-content: space-between;
						align-items: center;

						.icon-btn {
							width: 40rpx;

							.iconfont {
								font-size: 38rpx;

							}
						}

						.swiper {
							flex: 1;
							height: 60rpx;

							.item-box {
								.item {
									display: flex;
									flex-direction: column;
									justify-content: center;
									width: 180rpx;
									height: 60rpx;
									color: #fff;
									text-align: center;
									border-radius: 3px;

									.phase {
										font-size: 24rpx;
										line-height: 24rpx;
									}

									text {
										font-size: 20rpx;
										line-height: 24rpx;
									}

									&:first-child {
										margin-right: 20rpx;
									}

									&:nth-child(2) {
										margin-right: 20rpx;
									}
								}

								.one {
									background: #ca26a9;
								}

								.two {
									background: #e36dcb;
								}

								.third {
									background: #eee;
								}
							}
						}
					}

					.course-position {
						color: $uni-text-color;
						font-size: 28rpx;

						view {
							align-items: center;
							padding: 18rpx 0;
							border-bottom: 1px solid $uni-border-color;

							.iconfont {
								margin-right: 20rpx;
							}
						}
					}
				}
			}
		}

		.course-info {
			padding: 20rpx 0;
			background-color: #fff;
			border-radius: $uni-border-radius-base;

			.course-title {
				display: flex;
				align-content: center;
				padding: 10rpx 0 20rpx 28rpx;
				border-bottom: 1px solid $uni-border-color;

				.line {
					width: 8rpx;
					font-size: 32rpx;
					height: 32rpx;
					border-radius: 8rpx;
					background-color: $uni-bg-color;
				}

				.text {
					margin-left: 10rpx;
					font-size: 32rpx;
					line-height: 32rpx;
					color: $uni-bg-color;
				}
			}

			.course-word {
				padding: 20rpx;
				font-size: 28rpx;
				color: $uni-text-color;

				img {
					width: 100%;
				}
			}
		}

		.couse-money {
			position: fixed;
			z-index: 999;
			left: 0;
			bottom: 0;
			display: flex;
			width: 100%;
			align-items: center;
			padding: 20rpx;
			// margin-bottom: 20rpx;
			background-color: #fff;
			box-sizing: border-box;

			.new-price {
				color: $uni-bg-color;
				font-size: 32rpx;
			}

			.old-price {
				flex: 1;
				margin: 0 30rpx 0 20rpx;
				text-decoration: line-through;
				font-size: 28rpx;
				color: $uni-text-color-grey;
			}

			.btn {
				width: 200rpx;
				height: 60rpx;
				padding: 0;
				line-height: 60rpx;
				border-radius: 60rpx;
				font-size: 32rpx;

				&:after {
					border: none;
				}

			}

			.redstyle {
				background-color: $uni-bg-color;
			}

			.infostyle {
				color: $uni-text-color;
				background-color: #f5f5f5;
			}
		}

		.height-box {
			height: 100rpx;
		}

		.bottom {
			position: fixed;
			display: flex;
			align-items: center;
			bottom: 0;
			left: 0;
			box-sizing: border-box;
			width: 100%;
			height: 100rpx;

			background-color: #fff;

			.btn {
				width: 666rpx;
				height: 60rpx;
				padding: 0;
				line-height: 60rpx;
				font-size: 32rpx;
				background-color: #6dd900;

				&:after {
					border: none;
				}
			}
		}
	}
</style>
<style lang="scss">
	.course-word {
		image {
			width: 100% !important;
		}
	}
</style>
