<script>
	import {
		mapGetters
	} from "vuex";
	export default {
		onLaunch: function() {
			this.getconfig();
			if (uni.getStorageSync("store")) {
				this.$store.replaceState(Object.assign({}, this.$store.state, JSON.parse(uni.getStorageSync("store"))))
			}

			//在页面刷新时将vuex里的信息保存到sessionStorage里
			window.addEventListener("beforeunload", () => {
				uni.setStorageSync("store", JSON.stringify(this.$store.state))
			})
			
			if (this.cartnum) {
				uni.setTabBarBadge({
					index: 2,
					text: this.cartnum.toString()
				});
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
		data() {
			return {
				baseURL: ""
			};
		}
	};
</script>

<style>
	/* #ifndef APP-PLUS-NVUE */
	@import "./common/uni.css";

	/*每个页面公共css */
	/* #endif*/
</style>
<style lang="scss">
	@font-face {
		font-family: "iconfont";
		/* project id 1377410 */
		src: url("https://at.alicdn.com/t/font_1377410_01qi30m3m2dn.eot");
		src: url("https://at.alicdn.com/t/font_1377410_01qi30m3m2dn.ttf") format("truetype");
	}

	.iconfont {
		font-family: iconfont !important;
		font-size: 32upx;
		font-style: normal;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}
</style>
