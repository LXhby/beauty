<template>
	<view class="pay">
		<form-preview header-label="付款金额" :header-value="amount" :body-items="list" :footer-buttons="buttons"></form-preview>
	</view>
</template>

<script>
	import formPreview from "@/components/form-preview/index.vue";
	export default {
		components: {
			formPreview,
		},
		data() {
			return {
				order: {},
				amount: "¥0.00",
				list: [],
				params: {},
				buttons: [{
					style: "primary",
					text: "微信支付",
					onButtonClick: name => {
						this.requestPayment("微信支付");
					}
				}],
			}
		},
		onLoad() {
			this.$wechat.ready(() => {
				this.params = JSON.parse(uni.getStorageSync("payment"));
				this.fetchData();
			});

		},
		methods: {
			fetchData() {
				if (this.params.type == "MEMBER_ORDER") {
					this.$http
						.request({
							url: "forum-orders/" + this.params.id,
							method: "get",
							params: {
								expand: 'forum'
							}
						})
						.then(res => {
							const order = res.data;
							console.log("order", order);
							this.list = [{
									label: "交易类型",
									value: "会员服务"
								},
								{
									label: "服务期限",
									value: "3年"
								},
								{
									label: "会员类型",
									value: order.membership.name
								}
							];
							this.amount = "￥" + order.amount;
						});


				} else if (this.params.type == "FORUM_ORDER") {
					this.$http
						.request({
							url: "forum-orders/" + this.params.id,
							method: "get",
							params: {
								expand: 'forum'
							}
						}).then(res => {
							const order = res.data;
							console.log("order", order);
							this.list = [{
									label: "交易类型",
									value: "课程服务"
								},
								{
									label: "课程名称",
									value: order.forum.name
								},
								{
									label: "开课日期",
									value: order.forum.start_date
								}
							];
							this.amount = "￥" + order.amount;
						});
				}
			},
			requestPayment(means) {
				if (means == "微信支付") {
					const info = {
						type: this.params.type,
						id: this.params.id,
						means: means
					};
					// todoing
					this.$http
						.request({
							url: "payment/start",
							method: "post",
							data: info
						}).then(res => {
							const data = res.data;
							this.$wechat.chooseWXPay({
								timestamp: data.timestamp,
								nonceStr: data.nonceStr,
								package: data.package,
								signType: data.signType,
								paySign: data.paySign, // 支付签名
								success: res => {
									uni.showToast({
										title: '支付成功'
									})
									const id = this.params.id;
									uni.removeStorageSync("payment");

									if (info.type == "FORUM_ORDER") {
										uni.navigateTo({
											url: '、pages/my/haveclass'
										})
									}
								}
							});
						});
				}
			}
		}
	}
</script>

<style>
</style>
