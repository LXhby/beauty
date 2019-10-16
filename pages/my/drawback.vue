<template>
	<view class="draw-back">
		<view class="order-info">
			<view class="title">
				<text class="iconfont">&#xe675;</text>
				<text>订单信息</text>
			</view>
			<view class="content">
				<view class="uni-flex">
					<text>订单号</text>
					<text>{{orderInfo.id}}</text>
				</view>
				<view class="uni-flex">
					<text>手机号</text>
					<text>{{orderInfo.mobile}}</text>
				</view>
				<view class="uni-flex">
					<text>下单时间</text>
					<text>{{orderInfo.created_at}}</text>
				</view>
				<view class="uni-flex">
					<text>交易状态</text>
					<text>{{orderInfo.status}}</text>
				</view>
				<view class="uni-flex">
					<text>退还金币</text>
					<text>128个</text>
				</view>
				<view class="uni-flex">
					<text>退款金额</text>
					<text class="red">￥{{orderInfo.amount}}</text>
				</view>
			</view>
		</view>
		<view class="back-reason ">
			<view class="title uni-flex uni-row">
				<text>退款原因</text>
				<view class="other uni-flex uni-row" @click="openresonlist">
					<text>{{reson}}</text>
					<text class="iconfont">&#xe642;</text>
				</view>
			</view>
			<view class="content">
				<textarea maxlength="200" placeholder-style="width:100%;border-radius: 5px;font-size:28rpx;" placeholder="请添加退款原因描述..." v-model="form.refund_reason" />
				<view class="img-list uni-flex uni-row">
					<view class="item" v-for="(ele,index) in form.image" :key="index">
						<image :src="ele" mode="aspectFill" @click="previewImg(ele)"></image>
						<text class="iconfont" @click="deleteImg(index)">&#xe632;</text>
					</view>
				</view>
				
				<view class="upload-photo">
          <view class="photo uni-flex uni-row" @click="upload">
            <text class="iconfont">&#xe64a;</text>
          </view>
          <view class="word-info">
            <view class="word-ml">上传照片</view>
            <view class="word-sm">产品质量问题，运输过程中破损等问题，可申请退货退款。</view>
          </view>
        </view>
        <view class="address">
          <text>请把商品快递到：</text>
          <br />
          <text class="word-grey">快递地址：{{orderInfo.address}}</text>
          <br />
          <text class="word-grey">收货姓名：{{orderInfo.receiver}}</text>
          <br />
          <text class="word-grey">联系电话：{{orderInfo.mobile}}</text>
        </view>
        <view class="beizhu">
          <text>请在快递单上备注快递号，快递费用由退款申请方承担；</text>
          <br />
          <text>我们收到商品后，会尽快安排退款服务，一般在3-5个工作日内处理好</text>
        </view>
      </view>
	  <view style="padding:0 40rpx;" class="subbtn">
	  	<button type="primary" @click="submitdraw">提交申请</button>
	  </view>
    </view>
	<w-picker ref="resonpicker" mode="selector" themeColor="#f00"
	:selectList="selectList" level="1" v-if="selectList.length" :defaultVal="[0]" @confirm="onConfirm2" ></w-picker>
    <view class="bottom-line">-- 我是有底线的卡瑞塔 --</view>
  </view>
</template>

<script>
	import wPicker from "@/components/w-picker/w-picker.vue"
	export default {
		components: {
			wPicker
		},
	  data() {
	    return {
	      orderInfo: {},
		  orderId:'',
		  form:{
			  refund_reason:'',
			  image:[]
		  },
		  reson:'其他',
		  selectList:[
			  {
				  label:"拍错/多拍/不想要",
				  value:"拍错/多拍/不想要"
			  },
			  {
				  label:"协商一致退款",
				  value:"协商一致退款"
			  },
			  {
				  label:"缺货",
				  value:"缺货"
			  },
			  {
				  label:"未按约定时间发货",
				  value:"未按约定时间发货"
			  },
			  {
				  label:"其他",
				  value:"其他"
			  }
		  ]
	    };
	  },
		onLoad(option) {
			this.orderId = option.orderId;
			this.$http.request({
				url: 'orders/' + option.orderId,
				method: 'get',
				params: {
					'expand': 'orderProducts,orderProducts.product'
				}
			}).then(res => {
				this.orderInfo = res.data
				console.log(this.orderInfo)
			}).catch(console.log)
		},
		methods:{
			openresonlist(){
				this.$refs.resonpicker.show();
			},
			onConfirm2(val){
				this.reson = val.result;
			},
			previewImg(url){
				this.$wechat.previewImage({
				     current: url, // 当前显示图片的http链接
				     urls: [ele], // 需要预览的图片http链接列表
				     success: res => {
				       console.log('res', res);
				     }
				   });
			},
			deleteImg(index){
				uni.showModal({
				    title: '提示',
				    content: '你确定要删除？',
				    success: function (res) {
				        if (res.confirm) {
				            this.form.image.splice(index,1)
				        } else if (res.cancel) {
				            console.log('用户点击取消');
				        }
				    }
				});
			},
			upload(){
				if(this.form.image.length>=3){
						uni.showToast({
							title:"最多上传三张图片",
							icon: "none"
						})
						return false;
				}else{
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
						this.form.image.push(response.data);
						resolve();
					  })
					  .catch(error => {
						reject(error);
					  });
				  }
				});
			  });
			},
			submitdraw(){
				if(this.reson == '其他'&& !this.form.refund_reason){
					uni.showToast({
						title:"请填写退款原因",
						icon:"none"
					})
					return false
				}else{
					var str;
					if(this.reson == '其他'){
						str = this.form.refund_reason
					}else{
						 str = this.reson+this.form.refund_reason
					}
					
					this.$http.request({
						url: 'order/refund',
						method: 'post',
						data: {
							id:this.orderId,
							refund_reason:str,
							refund_amount:this.orderInfo.amount,
							refund_images:this.form.image
						}
					}).then(res => {
						uni.showToast({
							title:"申请成功！",
							icon:"none"
						})
						uni.switchTab({
							url:'/pages/my/index'
						})
					}).catch(console.log)
				}
				
			}
		}
	 }
</script>

<style lang="scss" scoped>
@import "@/common/common.scss";
.draw-back {
  background-color: #f5f5f5;
  .order-info {
    margin-bottom: 20rpx;
    background-color: #fff;
    .title {
      color: #333;
      .iconfont {
        margin-right: 20rpx;
      }
    }
    .content {
      padding-bottom: 20rpx;
      .uni-flex {
        margin: 20rpx 40rpx;
        justify-content: space-between;
        color: #333;
        .red {
          color: $uni-bg-color;
        }
      }
    }
  }
  .back-reason {
    background-color: #fff;
    .title {
      color: #333;
      justify-content: space-between;
      .other {
		  flex: 1;
		  text-align: right;
        align-items: center;
		justify-content: flex-end;
        width: 90rpx;
        .iconfont {
		
          margin-left: 10rpx;
          font-size: 24rpx;
        }
      }
    }
    .content {
      width: 100%;
      uni-textarea {
        box-sizing: border-box;
        width: 670rpx;
        height: 230rpx;
        padding: 20rpx;
        margin: 20rpx 40rpx;
        background: #f5f5f5;
        border-radius: 5px;
      }
	  .img-list{
		  padding:0 40rpx;
		  margin-bottom:20rpx;
		  .item{
		  	width:160rpx;
		  	height: 160rpx;
			margin-right: 40rpx;
		  		position: relative;
		  		.iconfont{
		  			position: absolute;
		  			top:0;
		  			right: 0rpx;
		  			background: red;	
		  		}
		  		image{
		  			width:160rpx;
		  			height: 160rpx;
		  			margin-right: 20rpx;
		  		}
		  	}
	  }
		
      .upload-photo {
        display: flex;
        align-items: center;
        padding: 0 40rpx;
        padding-bottom: 20rpx;
        border-bottom: 1px solid $uni-border-color;
        .photo {
          width: 90rpx;
          height: 90rpx;
          margin-right: 28rpx;
          justify-content: center;
          align-items: center;
          border-radius: 4px;
          background: $uni-bg-color;
          .iconfont {
            font-size: 50rpx;
            color: #fff;
          }
        }
        .word-ml {
          color: #333;
          font-size: 28rpx;
        }
        .word-sm {
          color: $uni-text-color-grey;
          font-size: $uni-font-size-ssm;
        }
      }
      .address {
        padding: 20rpx 40rpx;
        font-size: $uni-font-size-ssm;
        .word-grey {
          color: $uni-text-color-grey;
        }
      }
      .beizhu {
        color: #333;
        padding: 0rpx 40rpx;
        padding-bottom: 30rpx;
        font-size: $uni-font-size-ssm;
      }
    }
  }
  .title {
    display: flex;
    align-items: center;
    padding: 30rpx 20rpx;
    border-bottom: 1px solid #f5f5f5;
  }
  .subbtn{
	  border-bottom:40rpx solid #fff;
	  button{
		  width: 636rpx;
		  height: 90rpx;
		  border-radius: 90rpx;
		  margin-top: 50rpx;
		  background: $uni-bg-color;
		  border-color:  $uni-bg-color;
	  }
  }
}
</style>
