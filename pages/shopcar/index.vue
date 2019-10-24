<template>
	<view class="cart-page">
		<view class="have-none" v-if="!myshopcar.length || !myshopcar[0].products.length">
			<image src="../../static/order_no_bg.png" mode="widthFix"></image>
			<view class="title">
				不过节吗！什么也没有啊~
			</view>
			<view class="text">到底还过不过了，啥也不买</view>
			<text>买不买得，先加个购物车再说嘛</text>
			<button @click="gohome">我想看看</button>
		</view>
		<view class="goods-content" v-else>
			<view class="goods-list">
				<view class="goods-item" v-for="(ele,index) in myshopcar">
					<view class="shop-name uni-flex uni-row" style="align-items: center; justify-content: space-between;">
						<view class="uni-flex uni-row name-box" style="align-items: center; ">
							<checkbox-group @change="selectshopAll(ele.shopId,$event)" style="width:44rpx;margin-right: 10rpx;">
								<label class="radio">
									<checkbox value="cb" :checked="ele.status" color="#ff0080" style="transform:scale(0.8);" />
								</label>
							</checkbox-group>
							
						</view>
						<view class="uni-flex uni-row" style="flex:1;justify-content: space-between;align-items: center;height: 100%;" @click="goshop(ele.id)">
							<view class="uni-flex uni-row" style="align-items: center;">
								<image :src="ele.headimgurl" mode="aspectFill" v-if="ele.headimgurl"></image>
								<image src="../../static/vip_buy06.png" mode="" v-else></image>
								<text v-if="ele.shop_name">{{ele.shop_name}}</text>
								<text v-else>{{ele.maskedName}}的店铺</text>
							</view>
							<text class="iconfont right" style="font-size: 24rpx;">&#xe642;</text>
						</view>
						
					</view>
					<view class="detail uni-flex uni-row" v-for="(item,index) in ele.products">
						<view class="left uni-flex uni-row" style="align-items: center;">
							<checkbox-group class="checkbox-group" @change="oneChange(ele.shopId,item,$event)">
								<checkbox :value="item.id.toString()" :checked="item.status" color="#ff0080" style="transform:scale(0.8);" />
							</checkbox-group>
							<image :src="'http://backend.krtamall.yiidev.cn'+ item.image" mode="aspectFill"></image>
						</view>
						<view class="right">
							<view class="name">{{item.name}}</view>
							<view class="size">
								商品规格
							</view>
							<view class="bottom  uni-flex uni-row" style="align-items: center;">
								<view class="num-box" style="overflow: hidden;">
									<text class="num">￥{{item.price}}</text>
									
								</view>
								<view class="number-box" >
									<uni-number-box :min="1" :max="item.stock" :value="item.num" @change="bindChange(ele.shopId,item,$event)"></uni-number-box>
								</view>
							</view>
							<view class="bottom-line uni-flex uni-row" style="margin-top: 20rpx;">
								<text class="send">赠送128个金币</text>
								<text class="send" style="margin-left:20rpx;">运费：{{item.freight}}</text>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="handle-bottom ">
				<view class="shop-bottom uni-flex uni-row">
					<view class="all-left">
						<checkbox-group @change="selectAll">
							<label class="radio">
								<checkbox value="cb" :checked="selectStatus" color="#ff0080" style="transform:scale(0.8);" />全选
							</label>
						</checkbox-group>
						<text>赠送128个金币</text>
					</view>
					<view class="all-right uni-flex uni-row">
						<text class="combined">合计</text>
						<view>
							<view class="count-box">
								<view class="count-num">￥{{totalMoney}}</view>
								<!-- 大于7位数 弹窗-->
								<text class="gray-color">
									省256元
								</text>
							</view>
						</view>
						<button type="primary" size="mini" @click="submitOrder">确认订单</button>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapGetters
	} from "vuex";
	import uniNumberBox from "@/components/uni-number-box/uni-number-box.vue"
	export default {
		data() {
			return {
				totalMoney: 0,
				checklist:[],
				selectStatus: false,
				adressInfo:{},
				feig:0
			}
		},
		computed: {
			...mapGetters(["shopcar", "cartnum","userInfo","shopId"]),
			myshopcar(){
				var id = this.shopId?this.shopId:this.userInfo.id;
				var arr = [];
				if(this.shopcar.length){
					this.shopcar.forEach(item=>{
						if(item.shopId == id){
							arr.push(item)
						}
					})
					arr.forEach(item=>{
						this.$http.request({
							url: 'users/' + item.shopId,
							method: 'get',
						}).then(info=>{
							Object.assign(item,info.data)
						})
					})
					console.log('arr',arr)
				}
				return arr
			}
		},
		components: {
			uniNumberBox
		},
		onShow() {
			if (this.cartnum) {
				uni.setTabBarBadge({
					index: 2,
					text: this.cartnum.toString()
				});
			}else{
				uni.removeTabBarBadge({
					index:2
				})
			}
			this.$http.request({
				url: 'address',
				method: 'get',
				params: {
					'AddressSearch[user_id]': this.userInfo.id,
					'AddressSearch[is_default]': 1,
				}
			}).then(res => {
				if(res.data.items.length){
					this.adressInfo = {
						address:res.data.items[0].province+"-"+res.data.items[0].city+"-"+res.data.items[0].address,
						mobile:res.data.items[0].mobile,
						receiver:res.data.items[0].receiver
					};
					this.$store.commit("user/setorderadress",this.adressInfo)
					
				}else{
					this.$store.commit("user/setorderadress",{})
					this.adressInfo = {};
				}
			}).catch(console.log)
		},
		onLoad() {
			console.log('this.shopcar',this.myshopcar)
			if(this.myshopcar.length){
				this.myshopcar.forEach(item=>{
					this.$set(item, "status", false);
					item.products.forEach(ee=>{
						this.$set(ee, "status", false);
					})
				})
			}
			this.$http.request({
				url: 'address',
				method: 'get',
				params: {
					'AddressSearch[user_id]': this.userInfo.id,
					'AddressSearch[is_default]': 1,
				}
			}).then(res => {
				this.adressInfo = res.data.items[0];
			}).catch(console.log)
		},
		methods: {
			goshop(id){
				console.log('id',id)
				console.log(window)
				var url = window.location.protocol+"//"+window.location.host+"/#/pages/home/index?userid="+id;
				console.log('url',url)
				window.location.href = url;
			},
			handlechecklist(){
				if(this.checklist.length){
					this.totalMoney= 0;
					console.log('this.checklist',this.checklist)
					this.checklist.forEach(item=>{
						var feig = [];
						var shopitem = this.myshopcar.find(ele=>ele.shopId == item.shopId);
						item.productId.forEach(child=>{
							
							var selectItem = shopitem.products.find(eles=>eles.id*1 == child*1);
							if(selectItem){
								feig.push(selectItem.freight)
								this.totalMoney+=selectItem.price*selectItem.num
							}
							
						})
						this.totalMoney+= Math.max.apply(null,feig)*1
						this.feig = Math.max.apply(null,feig)*1;
					})
					
				}else{
					this.totalMoney = 0;
				}
			},
			submitOrder(){
				if(!this.checklist.length){
					uni.showToast({
						title:'请选择商品',
						icon:"none"
					})
				}else{
					var product=[];
					
					var arr = this.myshopcar.find(ele=>ele.shopId == this.checklist[0].shopId);
					var num=0;
					var cardetail=[];
					this.checklist[0].productId.forEach(item=>{
						arr.products.forEach(child=>{
							if(item*1==child.id){
								var obj={
									product_id:child.id,
									quantity:child.num
								}
								cardetail.push(child)
								num+=child.num;
								product.push(obj)
							}
						})
					})
					var shopcarorder={
						user_id: this.userInfo.id,
						quantity: num,
						seller_user_id:this.shopId?this.shopId:this.userInfo.id,
						amount:this.totalMoney,
						remark:'',
						products:product,
						cardetail:cardetail,
						feig:this.feig
					}
					this.$store.commit('user/setshopcarorder',shopcarorder)
					uni.navigateTo({
						url:'/pages/my/toPay?shopcarorder=1'
					})
				}
			},
			
			gohome(){
				uni.switchTab({
					url:'/pages/home/index'
				})
			},
			bindChange(id,item,value) {
				console.log(value)
				var obj = this.myshopcar.find(ele=>ele.shopId*1== id*1);
				if(obj){
					var item = obj.products.find(child=>child.id == item.id);
					if(item){
						if(item.num >value){
							this.$store.commit('cartnum/setnum',-1)
						}else{
							this.$store.commit('cartnum/setnum',1)
						}
						item.num = value
						uni.setTabBarBadge({
							index: 2,
							text: this.cartnum.toString()
						});
					}
				}
				this.handlechecklist()
			},
			// 单个选
			oneChange(id,item,e) {
				var arr = e.detail.value;
				if(arr[0]){
					var hasshop = this.checklist.find(ele=>ele.shopId == id);
					if(hasshop){	
						hasshop.productId.push(arr[0]);
					}else{
						var obj={
							shopId:id,
							productId:[]
						}
						obj.productId.push(arr[0])
						this.checklist.push(obj);
					}

					
					var shopProduct= this.myshopcar.find(er=>er.shopId == id);
					var hasshops = this.checklist.find(ele=>ele.shopId == id);
					if(hasshops.productId.length== shopProduct.products.length){
						
						shopProduct.status = true;
						
					}else{
				
						shopProduct.status = false;
					}
					item.status = true;
				}else{
					var products = this.checklist.find(a=>a.shopId == id);
					var shopProduct= this.myshopcar.find(er=>er.shopId == id);
					shopProduct.status = false;
					item.status = false;
					products.productId.forEach((ele,index)=>{
						if(ele*1 == item.id*1){
							products.productId.splice(index,1)
						}
					})
					this.checklist.forEach((ele,index)=>{
						if(!ele.productId.length){
							this.checklist.splice(index,1)
						}
					})
				}
				if(this.checklist.length == this.myshopcar.length){
					var length = 0;
					var length2=0;
					this.checklist.forEach(ele=>{
						length+=ele.productId.length;
					})
					this.myshopcar.forEach(ele=>{
						length2+=ele.products.length;
					})
					if(length == length2){
						this.selectStatus = true
					}else{
						this.selectStatus = false
					}
				}else{
					this.selectStatus = false
				}
				this.handlechecklist()
			},
			//选中一个店铺所有
			selectshopAll(data,e){
				if(e.target.value.length != 0){
					var item =this.myshopcar.find(ele=>ele.shopId == data);
						if(item){
							var checkItem = this.checklist.find(ele=>ele.shopId == data);
							if(checkItem){
								checkItem.productId=[];
								item.products.forEach(child=>{
									checkItem.productId.push(child.id)
								})
							}else{
								var obj={
									shopId:data,
									productId:[]
								}
								item.products.forEach(child=>{
									obj.productId.push(child.id)
								})
								this.checklist.push(obj)
							}
							item.products.forEach(child=>{
								this.$set(child, "status", true);
								
							})
							
						}
					item.status = true;
				}else{
					var item =this.myshopcar.find(ele=>ele.shopId == data);
					if(item){
						item.products.forEach(child=>{
							this.$set(child, "status", false);
						})
					}
					item.status = false;
					var checkItem = this.checklist.find(ele=>ele.shopId == data);
					if(checkItem){
						checkItem.productId=[]
					}
				}
				if(this.checklist.length == this.myshopcar.length){
					var length = 0;
					var length2=0;
					this.checklist.forEach(ele=>{
						length+=ele.productId.length;
					})
					this.myshopcar.forEach(ele=>{
						length2+=ele.products.length;
					})
					if(length == length2){
						this.selectStatus = true
					}else{
						this.selectStatus = false
					}
				}else{
					this.selectStatus = false
				}
				
				this.checklist.forEach((ele,index)=>{
					if(!ele.productId.length){
						this.checklist.splice(index,1)
					}
				})
				
				
				this.handlechecklist()
			},
			// 全选
			selectAll(data) {

				if (data.target.value.length != 0) {
					// 全选
					let totalMoney = 0;
					this.checklist=[]
					this.myshopcar.forEach(ele => {
						ele.status = true;
						var obj={
							shopId:ele.shopId,
							productId:[]
						}
						ele.products.forEach(item=>{
							item.status = true;
							obj.productId.push(item.id)
						})
						this.checklist.push(obj)
					})
					this.totalMoney = totalMoney
					this.selectStatus = true
				
				} else {
					this.totalMoney = 0
					this.selectStatus = false;
					this.checklist=[];
					this.myshopcar.forEach(ele => {
						ele.status = false;
						ele.products.forEach(item=>item.status = false)
					})
				}
			this.handlechecklist()
			},
		}
	}
</script>

<style lang="scss" scoped>
	uni-page-body {
		width: 100%;
		height: 100%;
	}

	.cart-page {
		width: 100%;
		height: 100%;

		.have-none {
			font-size: 24rpx;
			text-align: center;
			color: $uni-text-color;

			image {
				width: 500rpx;
				margin-top: 140rpx;
			}

			.title {
				margin-top: 50rpx;
				margin-bottom: 24rpx;
				font-size: 32rpx;
			}

			.text {
				margin-bottom: 8rpx;
				font-size: 24rpx;
			}

			button {
				width: 214rpx;
				height: 52rpx;
				line-height: 52rpx;
				margin-top: 130rpx;
				background: #fd3f6f;
				color: #fff;
				border-radius: 52rpx;
				font-size: 32rpx;

				&:after {
					border: none;
				}
			}
		}

		.goods-content {
			position: relative;
			width: 100%;
			height: 100%;
			background: #f5f5f5;

			.goods-list {
				overflow: scroll;
				box-sizing: border-box;
				width: 100%;
				padding: 30rpx;
				height: calc(100% - 90rpx);

				.goods-item {
					border-radius: 5px;
					background-color: #fff;

					.shop-name {
						border-bottom: 1px solid $uni-border-color;

						.name-box {
							height: 80rpx;
							padding-left: 30rpx;
						}

						.right {
							margin-right: 30rpx;
						}

						text {
							color: $uni-bg-color;
						}

						image {
							width: 40rpx;
							height: 40rpx;
							margin-left: 10rpx;
							margin-right: 10rpx;
							border-radius: 50%;
							overflow: hidden;
						}
					}

					.detail {
						padding: 30rpx 0;
						margin: 0 30rpx;
						border-bottom: 1px solid $uni-border-color;
						align-items: flex-start;

						.left {
							margin-right: 20rpx;

							image {
								width: 150rpx;
								height: 150rpx;
								margin-left: 10rpx;
							}

							.checkbox-group {
								width: 60rpx;
							}
						}

						.right {
							flex: 1;
							font-size: 24rpx;

							.name {
								font-size: 24rpx;
							}

							.size {
								display: inline-block;
								margin: 2rpx 0;
								height: 40rpx;
								padding: 0 84rpx 0 15rpx;
								line-height: 40rpx;
								font-size: 22rpx;
								color: $uni-text-color-grey;
								background: #f9f9f9;
							}
							.bottom-line{
								.send {
									color: $uni-text-color-grey;
									font-size: 20rpx;
									margin-left: 10rpx;
								}
							}
							.bottom {
								align-items: flex-end;
								flex-wrap: wrap;
								justify-content: space-between;

								text {
									font-size: 24rpx;
								}

								.num-box {
									white-space: nowrap;

									.num {
										color: $uni-bg-color;
									}

									
								}

								.number-box {
									flex: 1;
									text-align: right;
								}
							}
						}
					}
				}
			}

			.handle-bottom {
				//position: fixed;
				bottom: 0px;
				left: 0px;
				width: 100%;
				height: 90rpx;
				background-color: #fff;

				.shop-bottom {
					width: 100%;
					height: 100%;
					justify-content: space-between;
					align-items: center;

					.all-left {
						margin-left: 20rpx;

						text {
							color: $uni-bg-color;
							font-size: 20rpx;
							margin-left: 10rpx;
						}
					}

					.all-right {
						margin-right: 20rpx;
						align-items: center;

						.combined {
							margin-right: 10rpx;
						}

						.count-box {
							margin-right: 20rpx;

							.count-num {
								color: $uni-bg-color;
								font-size: 28rpx;
							}

							.gray-color {
								font-size: 20rpx;
								color: $uni-text-color-grey;
							}
						}

						button {
							display: flex;
							align-content: center;
							justify-content: center;
							width: 212rpx;
							height: 58rpx;
							line-height: 58rpx;
							border-radius: 58rpx;
							font-size: 28rpx;
							background-color: $uni-bg-color;
						}
					}
				}
			}
		}

	}
</style>
<style lang="scss">

</style>
