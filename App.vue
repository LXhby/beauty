
<script>
	import {
		mapGetters
	} from "vuex";
	export default {
		data() {
			return {
				baseURL: ""
			};
		},
		onLaunch: function() {
			this.getconfig();
			if (uni.getStorageSync("store")) {
				this.$store.replaceState(Object.assign({}, this.$store.state, JSON.parse(uni.getStorageSync("store"))))
			}


			window.addEventListener("beforeunload", () => {
				uni.setStorageSync("store", JSON.stringify(this.$store.state))
			})
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
		},
		onShow: function() {

		},
		onHide: function() {
			console.log("App Hide");
		},
		computed: {
			...mapGetters(['cartnum']),
		},
		provide() {
			return {
				reload: this.reload
			}
		},
		methods: {
			getconfig() {
				this.$http
					.request({
						url: "config/get-all",
						method: "get"
					})
					.then(res => {
						this.$store.commit("user/setconfig", res.data);
					});
			},

		},
		
	};
</script>

<style>
	/* #ifndef APP-PLUS-NVUE */
	@import "./common/uni.css";

	/*每个页面公共css */
	/* #endif*/
</style>
<style lang="scss">
	body {
		font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimSun, sans-serif;
	}

	@font-face {
		font-family: "iconfont";
		/* project id 1377410 */
		src: url("https://at.alicdn.com/t/font_1377410_m1ypr87tdl.eot");
		src: url("https://at.alicdn.com/t/font_1377410_m1ypr87tdl.ttf") format("truetype");
	}

	.iconfont {
		font-family: iconfont !important;
		font-size: 32upx;
		font-style: normal;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}
</style>
