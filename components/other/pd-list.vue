<!-- 商品列表组件 <pd-list :list="xx"></pd-list> -->
<template>
	<view class="pd-list">
		<view class='content' >
			<view class='card' v-for="(item,index) in list"  :key="index" @click="goPage(item.id)">
				<view class="letter-img" >
					<view class='card-left'>
						<text>{{item.title}}</text><br />
						<view class="tag">
							<view class="uni-class" >{{type}}</view>
							<text class="word-grey">{{getTime(item.created_at)}}</text>
						</view>
					</view>
					<image :src="url+item.image" mode=""></image>
				</view>
				<!-- <view class="more-img">
					<text>盛世黄金12月21日评：税改投票落地 金价小幅上涨</text><br/>
					<view class="imgs">
						<image src="" mode=""></image>
						<image class="middle-img" src="" mode=""></image>
						<image src="" mode=""></image>
					</view>
				</view> -->
			</view>
		</view>
	</view>
</template>

<script>
	import Moment from "moment";
	export default {
		props:{
			list: { // 数据列表
				type: Array,
				default(){
					return []
				}
			},
			type:{
				type: String,
				default(){
					return ''
				}
			}
		},
		data(){
			return{
				url:''
			}
		},
		created() {
			this.url= this.$baseUrl;
			console.log('this.list',this.list)
		},
		methods:{
			goPage(id) {
				uni.navigateTo({
					url: '/pages/goods/consulting?id='+id
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
				}else if(str < 3600*24)
				return "23"
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "@/common/common.scss";
	/*数据列表*/
	.content {
		width: 100%;
		margin-top: 20rpx;
		background-color: #fff;
	}
	
	.card {
		
		.letter-img {
			display: flex;
			padding: 25rpx 0;
			border-bottom: 1px solid $uni-border-color;
			background-color: white;
			margin: 0 25rpx;
			background: #FFFFFF;
			border-radius: 5px;
			position: relative;
			.card-left {
				flex: 1;
				margin-right: 20rpx;
			
				.tag {
					display: flex;
					align-items: center;
					justify-content: space-between;
					margin-top: 20rpx;
			
					.uni-class {
						width: 126rpx;
						height: 40rpx;
						text-align: center;
						line-height: 40rpx;
						border-radius: 40rpx;
						font-size: 24rpx;
						background-color: #fce0f5;
						color: $uni-bg-color-grey;
					}
			
					.word-grey {
						font-size: $uni-font-size-ssm;
						color: $uni-text-color-grey;
					}
				}
			
			}
			image {
				width: 210rpx;
				height: 140rpx;
				border-radius: $uni-border-radius-base;
				background-color: $uni-text-color-grey;
			}
			
		}
		.more-img {
			padding: 25rpx 0;
			border-bottom: 1px solid #f5f5f5;
			background-color: white;
			margin: 0 25rpx;
			background: #FFFFFF;
			
			border-radius: 5px;
			.imgs {
				display: flex;
				align-items: center;
				flex-wrap: wrap;
				margin: 10rpx 0;
				image {
					width: 210rpx;
					height: 140rpx;
					border-radius: $uni-border-radius-base;
					background-color: $uni-text-color-grey;
					&:nth-child(3n-1){
						margin: 0 35rpx;
					}
				}	
			}
			
		}
	}
	
</style>
