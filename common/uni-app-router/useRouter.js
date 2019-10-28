import Vue from 'vue'
import Router from 'uni-simple-router';
import store from '../store/index'
Vue.use(Router);
import Request from '../../plugins/request/js/index'
const router = new Router({
	routes: [{
			path: "/pages/home/index",
			name: 'tabbar-1',
			meta: {
				title: '辰风生物·卜瑞塔美妆'
			}
		}, {
			path: '/pages/goods/info',
			name: 'tabbar-2',
			meta: {
				title: '美妆帮'
			}
		}, {
			path: '/pages/home/detail',
			name: "product-view",
			meta: {
				title: "商品详情"
			}
		}, {
			path: '/pages/home/comment',
			name: 'comment',
			meta: {
				title: '更多评论'
			}
		},
		{
			path: '/pages/goods/consulting',
			name: 'article-view',
			meta: {
				title: '咨询内容页'
			}
		},
		{
			path: '/pages/benefits/meeting',
			name: 'meeting',
			meta: {
				title: '会议活动'
			}
		},
		{
			path: '/pages/benefits/courseinfo',
			name: 'course-view',
			meta: {
				title: '课程详情'
			}
		},
		{
			path: '/pages/benefits/preferential',
			name: 'preferential',
			meta: {
				title: '特实惠'
			}
		},
		{
			path: '/pages/benefits/integral',
			name: 'integral',
			meta: {
				title: '积分购'
			}
		},
		{
			path: '/pages/benefits/upvue',
			name: 'upvue',
			meta: {
				title: '升级VIP'
			}
		},
		{
			path: '/pages/shopcar/index',
			name: 'shopcar',
			meta: {
				title: '购物车'
			}
		},
		{
			path: '/pages/my/index',
			name: 'my',
			meta: {
				title: '我的'
			}
		},
		{
			path: '/pages/my/order',
			name: 'order',
			meta: {
				title: '我的订单'
			}
		},
		{
			path: '/pages/my/returngoods',
			name: 'returngoods',
			meta: {
				title: '退款详情'
			}
		},
		{
			path: '/pages/my/orderinfo',
			name: 'orderinfo',
			meta: {
				title: '订单详情'
			}
		},
		{
			path: '/pages/my/shipment',
			name: 'shipment',
			meta: {
				title: '出货记录'
			}
		},
		{
			path: '/pages/my/fans',
			name: 'fans',
			meta: {
				title: '我的粉丝'
			}
		},
		{
			path: '/pages/my/reward',
			name: 'reward',
			meta: {
				title: '我的奖金'
			}
		},
		{
			path: '/pages/my/getmoney',
			name: 'getmoney',
			meta: {
				title: '提现申请'
			}
		},
		{
			path: '/pages/my/haveclass',
			name: 'haveclass',
			meta: {
				title: '上课记录'
			}
		},
		{
			path: '/pages/my/collection',
			name: 'collection',
			meta: {
				title: '我的收藏'
			}
		},
		{
			path: '/pages/my/address',
			name: 'address',
			meta: {
				title: '收货地址'
			}
		},
		{
			path: '/pages/my/newaddress',
			name: 'newaddress',
			meta: {
				title: '新建地址'
			}
		},
		{
			path: '/pages/my/news',
			name: 'news',
			meta: {
				title: '我的消息'
			}
		},
		{
			path: '/pages/my/serverule',
			name: 'serverule',
			meta: {
				title: '服务条款'
			}
		},
		{
			path: '/pages/about/index',
			name: 'about',
			meta: {
				title: '关于我们'
			}
		},
		{
			path: '/pages/benefits/PaySuccess',
			name: 'PaySuccess',
			meta: {
				title: '付款成功'
			}
		},
		{
			path: '/pages/my/drawback',
			name: 'drawback',
			meta: {
				title: '退款申请'
			}
		},
		{
			path: '/pages/my/toPay',
			name: 'toPay',
			meta: {
				title: '订单待付款'
			}
		},
		{
			path: '/pages/my/postcomment',
			name: 'postComment',
			meta: {
				title: '发表评论'
			}
		},
		{
			path: '/pages/my/investmoney',
			name: 'postComment',
			meta: {
				title: '余额充值'
			}
		},
		{
			path: '/pages/shopcar/paypage',
			name: 'paypage',
			meta: {
				title: '支付'
			}
		},
		{
			path: '/pages/my/order-pay',
			name: 'orderpay',
			meta: {
				title: '待付款'
			}
		},
		{
			path: '/pages/my/backdetail',
			name: 'backdetail',
			meta: {
				title: '退款详情'
			}
		},
		{
			path: '/pages/my/backlist',
			name: 'backlist',
			meta: {
				title: '订单退款'
			}
		}
	]
});

var http = Request();

function getCookie(name) {
	var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
	if (arr != null) return unescape(arr[2]);
	return null;
}

function delCookie(name) {
	var exp = new Date();
	exp.setTime(exp.getTime() - 1);
	var cval = getCookie(name);
	if (cval != null) {
		// 这里删除操作其实是将expires过期时间设置为当前时间，使cookie立即过期
		document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
	}
}

function getQueryStringByName(name) {
	var result = location.search.match(new RegExp("[\?\&]" + name + "=([^\&]+)", "i"));
	if (result == null || result.length < 1) {
		return "";
	}
	return result[1];
}


router.beforeEach((to, from, next) => {
	//#ifdef H5
	store.commit("user/setTitle", to.meta.title);
	var redirectUrl = "http://" + location.hostname + to.path;
	var userid = getQueryStringByName('userid');
	var code = getQueryStringByName('code');
	if (userid) {
		redirectUrl += "?userid=" + userid;
	}
	if (!store.state.user.userInfo && !code) {
		window.localStorage.clear();
		http.request({
			url: 'oauth/get-redirect-url',
			method: 'get',
			params: {
				redirectUrl: redirectUrl
			}
		}).then(res => {
			console.log(res)
			window.location.href = res.data;
		})
	} else if (code) {
		http.request({
			url: 'oauth/login',
			method: 'get',
			params: {
				code: code
			}
		}).then(res => {
			store.commit('user/setUserInfo', res.data);
			uni.setStorageSync('userinfo', res.data)
		}).catch(err => {
			console.log(err)
		})
		if (!store.state.appurl) {
			store.commit('user/setUrl', document.URL)
		}
		next();
	} else {
		next();
	}
	//#endif
})
router.afterEach((to, from) => {
	Vue.nextTick(() => {
		var url = ''
		// 判断是否是ios微信浏览器
		if (window.__wxjs_is_wkwebview === true) {
			if (store.state.app.url) {
				url = store.state.app.url.split('#')[0]
			} else {
				url = window.location.href.split('#')[0]
			}
		} else {
			url = window.location.href.split('#')[0]
		}

		http
			.request({
				url: "wechat/js-sdk-config",
				method: "get",
				params: {
					url: url
				}
			}).then(response => {
				// js-sdk配置
				Vue.prototype.$wechat.config(response.data);
				Vue.prototype.$wechat.ready(() => {
					const options = {
						title: store.state.user.title, // 分享标题
						desc: store.state.user.config.app_desc,
						link: "http://" +
							location.hostname +
							"/#" +
							to.fullPath +
							"?userid=" +
							store.state.user.userInfo.id, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
						imgUrl: store.state.user.config.logo, // 分享图标  todoing
						success: () => {
							store.commit('app/showSnackbar', {
								show: true,
								color: 'success',
								text: '分享成功！'
							});
						}
					};
					Vue.prototype.$wechat.onMenuShareTimeline(options);
					Vue.prototype.$wechat.onMenuShareAppMessage(options);
				});
			})

	}, 1000)
})
// console.log(router)

export default router