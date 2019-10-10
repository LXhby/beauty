<template>
	<view class="info-page">
		<view class="banner">
			<image :src="url+info.image" mode="aspectFill"></image>
			<view class="shop-car" @click="gocart">
				<text class="iconfont">&#xe603;</text>
				<uni-badge :text="cartnum.toString()" type="error" class="shopcar-badge" />
			</view>
		</view>
		<view class="main">
			<view class="main-box">
				<view class="title">
					{{info.title}}
				</view>
				<view class="main-content">
					<view class="sub-detail uni-flex uni-row">
						<view class="gray-color">
							<text>来源：{{info.source}}</text>
							<text>时间：{{info.created_at | convertTime('YYYY-MM-DD')}}</text>
						</view>
						<text class="hot">热度 {{info.views}}</text>
					</view>
					<view class="shop">
						<view class="shop-main  uni-flex uni-row">
							<view class="left uni-flex uni-row">
								<image src="../../static/logo.png" mode="aspectFill"></image>
								<view class="name">
									<view class="user">
										王晓文的VIP会员店铺
									</view>
									<text class="company">浙江晨风有限公司</text>
								</view>
							</view>
							<view class="right">
								<text class="iconfont">&#xe606;</text>
								<view class="right-text">
									本周第一名
								</view>
							</view>
						</view>
						<view class="shop-bottom uni-flex uni-row">
							<view class="item">
								<image src="../../static/phone2.png" mode="widthFix"></image>
								<text>王晓文</text>
							</view>
							<view class="item">
								<image src="../../static/phone1.png" mode="widthFix"></image>
								<text>186-1008-8750</text>
							</view>
							<view class="item">
								<image src="../../static/phone3.png" mode="widthFix"></image>
								<text>北京市-朝阳区</text>
							</view>
						</view>
					</view>
					<view class="article">
						<view class="article-text" v-html="info.content">
							
						</view>
						
					</view>
				</view>
			</view>
		</view>
		<view class="related">
			<view class="main-title">
				<view class="left">
					<view class="line"></view>
					<text class="text">相关资讯</text>
				</view>
				<view class="right" @click="goArticle">
					<text>全部资讯 </text>
					<text class="iconfont">&#xe612;</text>
				</view>
			</view>
			<view class="item uni-flex uni-row" v-for="(item,index) in relativeList" :key="index">
				<view class="left uni-flex uni-column">
					<view class="title">
						{{item.title}}
					</view>
					<view class="left-bo uni-flex uni-row">
						<view class="badge">
							{{columnname}}
						</view>
						<view class="time-ago">
							<text class="iconfont">&#xe6dd;</text>
							<text>{{getTime(item.created_at)}}</text>
						</view>
					</view>
				</view>
				<image src="../../static/816a66edef10673b4768128b41804cae.jpg" mode="aspectFill"></image>
			</view>
		</view>
		<view class="foot-advert uni-flex uni-row">
			<image src="../../static/8e494512gy1g4kbmo6p80j21400u0woc.jpg" mode="scaleToFill"></image>
			<view class="title">
				<view class="h-title">
					零投资 零风险 轻松开启一份事业
				</view>
				<text class="sm">8大尊享特权 人人都可以成为成功的创业者</text>
			</view>
		</view>
	</view>
</template>

<script>
	import uniBadge from '@/components/uni-badge/uni-badge.vue';
	import Moment from "moment";
	import {
		mapGetters
	} from "vuex";
	export default {
		components: {
			uniBadge
		},
		data() {
			return {
				id:null,
				url:'',
				info:{},
				column_id:'',
				relativeList:[],
				columnname:''
			}
		},
		computed: {
			...mapGetters(['config', 'cartnum'])
		},
		onLoad() {
			this.id = this.$route.query.id;
			this.getInfo();
		},
		methods:{
			gocart() {
				uni.switchTab({
					url: '/pages/shopcar/index'
				})
			},
			goArticle(){
				uni.switchTab({
					url: '/pages/goods/info'
				})
			},
			getInfo(){
				uni.showLoading({
					title:'加载中'
				})
				this.$http.request({
					url: "articles/"+this.id,
					method: "get",
				})
				.then(res => {
					this.info = res.data;
					this.column_id = this.info.column_id;
					this.url = this.$baseUrl;
					
					this.getRelative()
				});	
			},
			getRelative(){
				this.$http.request({
					url: "articles",
					method: "get",
					params:{
						"ArticleSearch[column_id]":this.column_id,
						expand:'column'
					}
				}).then(res=>{
					uni.hideLoading();
					this.relativeList = res.data.items;
					if(res.data.items.length){
						this.columnname = res.data.items[0].column.name;
					}
					
				})
			},
			getTime(time){
				var str = Moment().diff(Moment(time),"seconds");
				console.log(str);
				if(str <60){
					return str+'秒前'
				}else if(str < 3600){
					return parseInt(str/60)+'分钟前'
				}else if(str<3600*24){
					return parseInt(str/60/60)+'小时前'
				}else{
					return parseInt(str/60/60/24)+'天前'
				}
			
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "../../common/common.scss";

	.info-page {
		position: relative;
		background: #f1f1f1;

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
				.shopcar-badge{
					position: absolute;
					top: -16rpx;
					right: -10rpx;
				}
			}
		}

		.main {
			position: relative;
			z-index: 999;
			box-sizing: border-box;
			padding: 0 20rpx 20rpx 20rpx;
			margin-top:-80rpx;

			.main-box {
				border-radius: 5px;
				padding-bottom: 27rpx;
				background: #fff;

				.title {
					margin: 0 10rpx;
					padding-left: 10rpx;
					border-bottom: 1px solid $uni-border-color;
					font-size: 36rpx;
					line-height: 76rpx;
				}

				.main-content {
					padding: 0 20rpx;

					.sub-detail {
						justify-content: space-between;
						margin-top: 20rpx;
						font-size: 24rpx;
						line-height: 24rpx;

						.gray-color {
							font-size: 24rpx;
							color: $uni-text-color;
							text{
								margin-right: 20rpx;
							}
						}

						.hot {
							color: $uni-bg-color;
						}
					}

					.shop {
						margin: 20rpx 0;
						padding: 27rpx;
						background: $uni-bg-color-hovers;
						border-radius: 5px;

						.shop-main {
							align-items: center;
							justify-content: space-between;
							padding-bottom: 27rpx;
							margin-bottom: 27rpx;
							border-bottom: 1px solid $uni-border-color;
						}

						.left {
							align-items: center;

							image {
								width: 100rpx;
								height: 100rpx;
								margin-right: 20rpx;
								border-radius: 5px;
							}

							.user {
								font-size: 32rpx;
							}

							.company {
								font-size: 24rpx;
								color: $uni-text-color;
							}
						}

						.right {
							color: $uni-bg-color;
							text-align: center;

							.iconfont {
								font-size: 60rpx;
								color: $uni-bg-color;
							}

							.right-text {
								font-size: 24rpx;
							}
						}

						.shop-bottom {
							align-items: center;
							justify-content: space-between;

							text {
								color: $uni-text-color;
								font-size: 24rpx;
								vertical-align: middle;
							}

							image {
								vertical-align: middle;
								width: 36rpx;
								margin-right: 10rpx;
								;
							}

							.icon3 {
								font-size: 38rpx;
							}
						}
					}

					.article {
						padding-top: 10rpx;
						color: $uni-text-color;
					}
				}
			}
		}

		.related {
			margin: 0 20rpx;
			background: #fff;
			border-radius: 5px;

			.main-title {
				padding-top: 20rpx;
				padding-right: 20rpx;
				justify-content: space-between;
				border-bottom: 1px solid $uni-border-color;

				.left {
					display: flex;
					align-content: center;
				}

				.right {
					display: flex;
					align-content: center;

					color: $uni-bg-color;
					font-size: 24rpx;
					line-height: 42rpx;

					.iconfont {
						margin-left: 8rpx;
						color: $uni-bg-color;
						font-size: 42rpx;
					}
				}
			}

			.item {
				justify-content:space-between;
				align-items: center;
				margin:0 20rpx ;
				padding:20rpx 0;
				border-bottom:1px solid $uni-border-color;
				.left{
					width: 470rpx;
					min-height: 120rpx;
					justify-content: space-between;
					font-size: 32rpx;
					.title{
						color: $uni-text-color;
						line-height: 36rpx;
					}
					.left-bo{
						margin-top: 15rpx;
						justify-content:space-between;
						align-items:center;
						.badge{
							padding: 6rpx 20rpx;
							border-radius: 40rpx;
							font-size: 24rpx;
							line-height: 26rpx;
							color:$uni-bg-color-grey;
							background: $uni-bg-color-hovers;
						}
						.time-ago{
							text{
								vertical-align: middle;
							}
							.iconfont{
								margin-right: 5rpx;
							}
							font-size: 24rpx;
							color:$uni-text-color-grey;
						}
					}
				}
				image{
					width: 180rpx;
					height: 120rpx;
					border-radius: 5px;
				}
			}
		}

		.foot-advert {
			margin-top: 27rpx;
			border-bottom: 27rpx solid #f1f1f1;
			align-items: center;
			background: #fff;
			padding: 25rpx 38rpx;

			image {
				width: 80rpx;
				height: 80rpx;
			}

			.title {
				margin-left: 25rpx;

				.h-title {
					font-size: 32rpx;
					color: #d04cfd;
				}

				.sm {
					font-size: 24rpx;
					color: $uni-text-color;
				}
			}
		}
	}
</style>
