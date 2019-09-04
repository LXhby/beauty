<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
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
		src: url('https://at.alicdn.com/t/font_1377503_wk4mbv1sumf.eot');
		src: url('https://at.alicdn.com/t/font_1377503_on63jn93awp.ttf') format('truetype');
	}
	.iconfont {
		font-family: iconfont !important;
		font-size: 32upx;
		font-style: normal;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale
	}
	.cart-page {
	}
</style>
