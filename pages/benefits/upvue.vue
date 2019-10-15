<template>
	<view class="vip-page">
		<view class="bg-box">
			<view class="uni-flex uni-row title">
				<text>Kissyouth品牌运营扶持</text>
				<text class="iconfont">&#xe641;</text>
			</view>
		</view>
		<view class="content">
			<view class="main">
				<view class="main-top">
					<image src="../../static/vip_bg.png" mode="widthFix" class="bg-img"></image>
					<view class="top-shop">
						<view class="uni-flex uni-row shop-main">
							<image src="../../static/image_massge_people2.png" mode="widthFix"></image>
							<view class="detail ">
								<view class="title">
									王晓文的VIP店铺
								</view>
								<text>浙江晨风生物科技有限公司</text>
							</view>
						</view>
						<view class="text">
							<text>零投资</text>
							<text>零风险</text>
							<text>轻松开启一份事业</text> 
						</view>
					</view>
				</view>
				<view class="main-content">
					<view class="title  uni-flex uni-row">
						<view class="circle circle1">		
						</view>
						<text>尊享特权</text>
						<view class="circle">	
						</view>
					</view>
					<view class="word">
						<text>自购省钱</text>
						<text>分享赚钱</text>
					</view>
					<view class="nav-list">
						<view  class="my-list uni-flex uni-row"  @change="goPage">
							<view class="item">
								<image class="image" src="../../static/vip_buy01.png" mode="widthFix" />
								<text class="text">超值礼包</text>
							</view>
							<view class="item">
								<image class="image" src="../../static/vip_buy02.png" mode="widthFix" />
								<text class="text" >尊享店铺</text>
							</view>
							<view class="item">
								<image class="image" src="../../static/vip_buy03.png" mode="widthFix" />
								<text class="text" >会员折扣</text>
							</view>
							<view class="item">
								<image class="image" src="../../static/vip_buy04.png" mode="widthFix" />
								<text class="text" >超级福利</text>
							</view>
							<view class="item">
								<image class="image" src="../../static/vip_buy05.png" mode="widthFix" />
								<text class="text" >运营扶持</text>
							</view>
							<view class="item">
								<image class="image" src="../../static/vip_buy06.png" mode="widthFix" />
								<text class="text" >培训赋能</text>
							</view>
							<view class="item">
								<image class="image" src="../../static/vip_buy07.png" mode="widthFix" />
								<text class="text" >宣传助力</text>
							</view>
							<view class="item">
								<image class="image" src="../../static/vip_buy08.png" mode="widthFix" />
								<text class="text" >丰厚收益</text>
							</view>
						</view>
					</view>
					<view class="title  uni-flex uni-row">
						<view class="circle circle1">		
						</view>
						<text>超级礼包</text>
						<view class="circle">	
						</view>
					</view>
					<view class="word">
						<text>请任意选择一个VIP会员套餐</text>
					</view>
					<view class="chose-list" v-if="list.length">
						<view class="item uni-flex uni-row" v-for="(item,index) in list" :key="index" @click="chooseIndex = index">
							<image :src="url+item.image" mode=""></image>
							<text class="name">{{item.name}}</text>
							<view class="icon" v-if="chooseIndex == index">
								<text class="iconfont">&#xe63e;</text>
							</view>	
						</view>
					</view>
				</view>
			</view>
			<button type="primary" @click="showpop">立即升级</button>
		</view>
		<uni-popup ref="popup" type="center" :custom="true" v-if="chooseIndex != null">
			<view class="alert-box">
				<view class="img">
					<image :src="url+list[chooseIndex].image"></image>
				</view>
				<view class="text">
					{{list[chooseIndex].name}}
				</view>
				<view class="content-box" v-html="list[chooseIndex].detail">
					
				</view>
				
				<view class="btn" @click="submitorder">
					确认套餐
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import uniGrid from "@/components/uni-grid/uni-grid.vue";
	import uniGridItem from "@/components/uni-grid-item/uni-grid-item.vue";
	import uniPopup from '@/components/uni-popup/uni-popup.vue';
	export default {
		components: {
			uniGrid,
			uniGridItem,
			uniPopup
		},
		data(){
			return{
				list:[],
				url:'',
				chooseIndex:null
			}
		},
		mounted(){
			uni.showLoading({
				title:'正在加载中'
			})
			this.$http
				.request({
					url: "products",
					method: "get",
					params: {
						'ProductSearch[is_enabled]':1,
						'ProductSearch[is_vip]':1
					}
				})
				.then(res => {
					uni.hideLoading();
					this.url = this.$baseUrl;
					this.list = res.data.items;
				});
		},
		methods:{
			showpop(){
				if(this.chooseIndex != null){
					this.$refs.popup.open();
					console.log(this.chooseIndex)
				}else{
					uni.showToast({
						title:'请选择套餐',
						icon:"none"
					})
				}
			},
			submitorder(){
				uni.navigateTo({
					url: '/pages/my/toPay?product_id='+this.list[this.chooseIndex].id
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.vip-page{
		position:relative;
		.bg-box{
			width: 100%;
			height: 578rpx;
			background:#da73f8;
			.title{
				align-items:center;
				justify-content: space-between;
				padding: 40rpx;
				font-size: 36rpx;
				color: #fff;
			}
			.iconfont{
				font-size: 58rpx;
			}
		}
		.content{
			position: absolute;
			top:289rpx;
			left:20rpx;
			right: 20rpx;
		}
		.main{
			position: relative;
			padding-bottom: 20rpx;
			background: #fff;
			border-radius: 5px;
			box-shadow:0 0 4px 1px #da73f8;
			.main-top{
				position: absolute;
				width: 100%;
				top:-148rpx;
				.bg-img{
					width: 100%;
				}
				.top-shop{
					position:absolute;
					top:0px;
					left:46rpx;
					right:46rpx;
					.shop-main{
						margin-top:54rpx;
						align-items:center;
						image{
							overflow: hidden;
							width: 94rpx;
							height:94rpx;
							margin-right:18rpx;
							border-radius: 50%;
						}
						.detail{
							color:#fff;
							.title{
								font-size: 32rpx;
							}
							text{
								font-size: 24rpx;
							}
						}
					}
					.text{
						margin-top:60rpx;
						color: #fff;
						text-align:center;
						font-size: 34rpx;
						text{
							margin:0 10rpx;
						}
					}
				}
			}
			.main-content{
				padding-top:170rpx;
				.title{
					align-items:center;
					justify-content:center;
					.circle{
						position: relative;
						width: 5px;
						height: 5px;
						border-radius: 50%;
						background-color: #d04cfd;
						&:before{
							content: '';
							position: absolute;
							top: 0;
							bottom: 0;
							margin: auto 0;
							width: 120rpx;
							height: 1px;
							background-color: #d04cfd;
						}
						
					}
					.circle1{
						&:before{
							right: 0;
						}
					}
					text{
						color: #d04cfd;
						font-size: 48rpx;
						margin: 0 38rpx;
					}
				}
				.word{
					margin-top:12rpx;
					text-align: center;
					color: $uni-text-color-grey;
					font-size: 32rpx;
					text{
						margin: 0 8rpx;
					}
				}
				.nav-list {
					.my-list{
						flex-wrap: wrap;
						margin-bottom: 10rpx;
						.item{
							width: 25%;
							text-align: center;
						}
					}
					margin:34rpx 0;
					image {
						width: 90rpx;
						height: 90rpx;
						vertical-align: top;
					}
				
					.text {
						display: block;
						margin-top: 14rpx;
						margin-bottom: 30rpx;
						font-size: 28rpx;
						color: $uni-text-color;
					}
				}
				.chose-list{
					padding:0 26rpx;
					.item{
						position: relative;
						margin: 32rpx 0;
						padding: 10rpx;
						align-items:center;
						background-color:#d770f7;
						border-radius:5px;
						overflow: hidden;
						color:#fff;
						font-size:32rpx;
						image{
							width: 66rpx;
							height: 66rpx;
							border-radius: 50%;
							margin-right: 4rpx;
						}
						.name{
							flex: 1;
							overflow: hidden;
							white-space: nowrap;
						}
						.icon{
							position: absolute;
							top:0px;
							right:0px;
							width:0px;
							height: 0px;
							color: #fff;
							border:20rpx solid transparent;
							border-top-color:#ff2c70;
							border-right-color:#ff2c70;
							.iconfont{
								position:absolute;
								
								font-size: 24rpx;
								width:20rpx;
								height: 20rpx;
								right: -16rpx;
								bottom:-2rpx;
								margin: auto auto;
							}
						}
					}
				}
			}
		}
		button{
			width: 636rpx;
			height: 90rpx;
			border-radius: 90rpx;
			margin-top: 50rpx;
		
			background: $uni-bg-color;
		}
		.alert-box{
			position: relative;
			width: 710rpx;
			border-radius: 8px;
			background-color:#fff;
			.img{
				position: absolute;
				left: 0;
				right: 0;
				margin:0 auto;
				top: -45rpx;
				box-sizing: border-box;
				width: 136rpx;
				height: 136rpx;
				border-radius: 50%;
				padding: 24rpx;
				background:#fff;
				image{
					width: 88rpx;
					height: 88rpx;
					border-radius: 50%;
				}
			}
			.text{
				margin:0 20rpx ;
				padding: 90rpx 0 20rpx 0;
				border-bottom: 1px solid $uni-border-color;
				font-size: 32rpx;
			}
			.content-box{
				padding:20rpx ;
				text-align: left;
				color: $uni-text-color;
			}
			.btn{
				width: 100%;
				height: 90rpx;
				line-height: 90rpx;
				color: #fff;
				text-align: center;
				font-size: 32rpx;
				background-color: #d04cfd;
			}
		}
	}
</style>
