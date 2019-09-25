<script>
	export default {
		onLaunch: function() {
			this.getconfig();
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		methods:{
			getconfig(){
				this.$http.request({
					url: 'config/get-all',
					method: 'get',
				}).then(res=>{
					
				});
			}
		},
		data(){
			return{
				baseURL:'http://api.krtamall.yiidev.cn/v1/'
			}
		}
	}
</script>

<style>
	/* #ifndef APP-PLUS-NVUE */
	@import "./common/uni.css";

	/*每个页面公共css */
	/* #endif*/
</style>
<style lang="scss">
	@font-face {
		font-family: 'iconfont';
		/* project id 1377410 */
		src: url('https://at.alicdn.com/t/font_1377410_q6oz88gwvn.eot');
		src: url('https://at.alicdn.com/t/font_1377410_q6oz88gwvn.ttf') format('truetype');
	}
	.iconfont {
		font-family: iconfont !important;
		font-size: 32upx;
		font-style: normal;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale
	}
</style>
