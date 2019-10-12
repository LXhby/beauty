<template>
	<view class="post-comment">
		<view class="item" v-for="(item,index) in orderInfo" :key="index" v-if="orderInfo.length">
			<view class="item-top uni-flex uni-row" @click="gogoodsinfo(item.product.id)">
				<image :src="url+item.product.image" mode="aspectFill"></image>
				<text>{{item.product.name}}</text>
			</view>
			<view class="star-item uni-flex uni-row">
				<text>整体评价</text>
				<view class="star">
					<text :class="[{'dark-color':commentarr[index].rate>=1},'iconfont','star']" @click="clickStar(1,commentarr[index])">&#xe623;</text>
					<text :class="[{'dark-color':commentarr[index].rate>=2},'iconfont','star']" @click="clickStar(2,commentarr[index])">&#xe623;</text>
					<text :class="[{'dark-color':commentarr[index].rate>=3},'iconfont','star']" @click="clickStar(3,commentarr[index])">&#xe623;</text>
					<text :class="[{'dark-color':commentarr[index].rate>=4},'iconfont','star']" @click="clickStar(4,commentarr[index])">&#xe623;</text>
					<text :class="[{'dark-color':commentarr[index].rate>=5},'iconfont','star']" @click="clickStar(5,commentarr[index])">&#xe623;</text>
				</view>
			</view>
			<textarea maxlength="200" placeholder-style="width:750rpx
			;border-radius: 5px; background: #f5f5f5;" placeholder=""
			 :value="commentarr[index].content" />
			<view class="uni-flex uni-row upimg-list">
				<view class="item" v-for="(ele,index) in commentarr[index].image" :key="index">
					<image :src="ele" mode="aspectFill" @click="previewImg(ele)"></image>
					<text class="iconfont" @click="deleteImg(commentarr[index].image,index)">&#xe632;</text>
				</view>

				
				 <!-- <image :src="ele" mode="aspectFill" v-for="(ele,index) in commentarr[index].image" :key="index"></image> -->
			 </view>
			<view class="upload uni-flex uni-row">
			 	<view class="up-image" @click="upload(commentarr[index],index)">
			 		<text class="iconfont">&#xe64a;</text>
			 	</view>
			 	<view class="up-text">
			 		<view class="title">
			 			上传照片
			 		</view>
			 		<text>内容丰富的评价更容易成为优质评价哦！</text>
			 	</view>
			 </view>
			 <view class="noname">
			 	<label>
			 		<checkbox value="cb" :checked="commentarr[index].is_anonymous" style="transform:scale(0.7)" color="#ff0080" />匿名评价
			 	</label>
			 </view>
		</view>
		<button type="primary" @click="sendcomment" class="send-btn">提交评价</button>
	</view>
</template>

<script>
	import {
		mapGetters
	} from "vuex";
	export default {
		computed: {
			...mapGetters(['userInfo'])
		},
		data(){
			return{
				orderId:'',
				orderInfo:[],
				url:'',
				commentarr:[],
				numindex:''
			}
		},
		onLoad(option) {
			this.orderId = option.orderId;
			uni.showLoading({
				title:'正在加载中'
			})
			this.$http.request({
				url: 'orders/' + option.orderId,
				method: 'get',
				params: {
					'expand': 'orderProducts,orderProducts.product'
				}
			}).then(res => {
				uni.hideLoading();
				this.url = this.$baseUrl;
				this.orderInfo= res.data.orderProducts;
				if(this.orderInfo.length){
					this.commentarr = [];
					this.orderInfo.forEach(item=>{
						var obj = {
							user_id:this.userInfo.id,
							product_id:item.product.id,
							rate: 5, // 星星数量
							content:'非常好',
							image:[],
							is_anonymous:false
						}
						this.commentarr.push(obj)
					})
					console.log(arr)
				}
				console.log('this.orderInfo',this.orderInfo)
				// this.commentinfo.product_id = 1;
			}).catch(console.log)
		},
		methods:{
			gogoodsinfo(id){
				uni.navigateTo({
					url:'/pages/home/detail?id='+id
				})
			},
			// 点星星
			clickStar(num,item) {
				item.rate = num;
			},
			sendcomment(){
				var list = [];
			this.commentarr.forEach(item=>{
				list.push(new Promise(resolve=>{
					this.$http.request({
							url: 'product-comments',
							method: 'post',
							data: item
						}).then(res=>{
							resolve(res)
						})
				}))
			})
				Promise.all(list).then(result=>{
				  uni.showToast({
				  	title:'评价成功',
					icon:'none'
				  })
				  uni.navigateTo({
				  	url:'/pages/my/order'
				  })
				})
			},
			upload(item,index){
				console.log('item',item)
				if(item.image.length >=3){
					uni.showToast({
						title:"最多上传三张图片",
						icon: "none"
					})
					return false;
				}else{
					this.numindex = index;
					console.log('index',index)
					this.$wechat.chooseImage({
					        count: 3,
					        sizeType: ["compressed"], // 可以指定是原图还是压缩图，默认二者都有
					        sourceType: ["album", "camera"], // 可以指定来源是相册还是相机，默认二者都有
					        success: async res => {
					          try {
					            for (let index = 0; index < res.localIds.length; index++) {
					              const serverId = res.localIds[index];
					              await this.uploadImage(serverId);
					            }
					          } catch (error) {
					            console.log(error);
					          }
					        }
					      });
				}
			},
			deleteImg(item,index){
				uni.showModal({
				    title: '提示',
				    content: '你确定要删除？',
				    success: function (res) {
				        if (res.confirm) {
				            item.splice(index,1)
				        } else if (res.cancel) {
				            console.log('用户点击取消');
				        }
				    }
				});
			},
			previewImg(ele){
				 this.$wechat.previewImage({
				      current: url, // 当前显示图片的http链接
				      urls: [ele], // 需要预览的图片http链接列表
				      success: res => {
				        console.log('res', res);
				      }
				    });
			},
			 uploadImage(serverId) {
			  return new Promise((resolve, reject) => {
				this.$wechat.uploadImage({
				  localId: serverId,
				  isShowProgressTips: 1,
				  success: res => {
					var serverId = res.serverId; // 返回图片的服务器端ID
					  this.$http.request({
						url: 'wechat/download-image',
						method: 'get',
						params: {
							'serverId':serverId
						}
					  }).then(response => {
						this.commentarr[this.numindex].images.push(response.data);
						resolve();
					  })
					  .catch(error => {
						reject(error);
					  });
				  }
				});
			  });
			},
		}
	}
</script>

<style scoped lang="scss">
	page{
		height: 100%;
	}
.post-comment{
	height: 100%;
	background:#f5f5f5;
	.item{
		color:$uni-text-color;
		background:#fff;
		margin-bottom:20rpx;
		.item-top{
			padding: 10rpx 20rpx;
			border-bottom: 1px solid $uni-border-color;
			align-items:center;
			image{
				width: 80rpx;
				height: 80rpx;
				border-radius: 5rpx;
				margin-right:10rpx;
				overflow: hidden;
			}
		}
		.star-item{
			padding:20rpx;
			align-items:center;
			.star{
				margin-left:20rpx ;
				.iconfont{
					margin: 0 10rpx;
					color: #999;
				}
				.dark-color{
					color: $uni-bg-color;
				}
			}
		}
		.upimg-list{
			margin-top:20rpx;
			padding:0 20rpx;
			.item{
				position: relative;
				.iconfont{
					position: absolute;
					top:0;
					right: 20rpx;
					background: red;
				}
			}
			image{
				width:160rpx;
				height: 160rpx;
				margin-right: 20rpx;
			}
		}
		.upload{
			margin-top: 20rpx;
			padding:0 20rpx;
			align-items:center;
			.up-image{
				display: flex;
				justify-content: center;
				align-items: center;
				width: 90rpx;
				height: 90rpx;
				margin-right: 10rpx;
				background: $uni-bg-color;
				border-radius: 5rpx;
			}
			.up-text{
				
				flex: 1;
				text-align:left;
				.title{
					padding-top: 0px;
					font-size: 24rpx;
				}
				text{
					color:$uni-text-color-grey;
					font-size: 20rpx;
					line-height: 20rpx;
				}
			}
			.iconfont{
				color: #fff;
				font-size: 46rpx;
			}
		}
		.noname{
			margin-top: 30rpx;
			padding-left: 20rpx;
			text-align: left;
			label{
				font-size: 24rpx;
			}
		}
	}
	.send-btn{
		background: $uni-bg-color;
		border-radius:0;
		&:after{
			border-radius:0;
			}
	}
}
</style>
<style lang="scss">
	uni-textarea{
		width:100%;
		box-sizing: border-box;
		padding: 20rpx;
		background: #f5f5f5;
	}
</style>
