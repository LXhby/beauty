import Vue from 'vue'
import Router from 'uni-simple-router';
import store from '../store/index'
Vue.use(Router);
import Request from '../../plugins/request/js/index'
const router = new Router({
	routes: [{
			path: "/pages/home/index",
			name: 'tabbar-1'
		}, {
			path: '/pages/goods/info',
			name: 'tabbar-2'
		}, {
			path: '/pages/home/detail',
			name: "product-view"
		}, {
			path: '/pages/home/comment',
			name: 'comment'
		},
		{
			path: '/pages/goods/consulting',
			name: 'article-view'
		},
		{
			path: '/pages/benefits/meeting',
			name: 'meeting'
		},
		{
			path: '/pages/benefits/courseinfo',
			name: 'course-view'
		},
		{
			path: '/pages/benefits/preferential',
			name: 'preferential'
		},
		{
			path: '/pages/benefits/integral',
			name: 'integral'
		},
		{
			path: '/pages/benefits/upvue',
			name: 'upvue'
		},
		{
			path: '/pages/shopcar/index',
			name: 'shopcar'
		},
		{
			path: '/pages/my/index',
			name: 'my'
		},
		{
			path: '/pages/my/order',
			name: 'order'
		},
		{
			path: '/pages/my/returngoods',
			name: 'returngoods'
		},
		{
			path: '/pages/my/orderinfo',
			name: 'orderinfo'
		},
		{
			path: '/pages/my/shipment',
			name: 'shipment'
		},
		{
			path: '/pages/my/fans',
			name: 'fans'
		},
		{
			path: '/pages/my/reward',
			name: 'reward'
		},
		{
			path: '/pages/my/getmoney',
			name: 'getmoney'
		},
		{
			path: '/pages/my/haveclass',
			name: 'haveclass'
		},
		{
			path: '/pages/my/collection',
			name: 'collection'
		},
		{
			path: '/pages/my/address',
			name: 'address'
		},
		{
			path: '/pages/my/newaddress',
			name: 'newaddress'
		},
		{
			path: '/pages/my/news',
			name: 'news'
		},
		{
			path: '/pages/my/serverule',
			name: 'serverule'
		},
		{
			path: '/pages/about/index',
			name: 'about'
		},
		{
			path: '/pages/benefits/PaySuccess',
			name: 'PaySuccess'
		},
		{
			path: '/pages/my/drawback',
			name: 'drawback'
		},
		{
			path: '/pages/my/toPay',
			name: 'toPay'
		},
		{
			path:'/pages/my/postcomment',
			name:'postComment'
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


router.beforeEach((to, from, next) => {
	//#ifdef H5
	var redirectUrl = document.URL;
	if (!getCookie('_identity-user') && !store.state.user.userInfo) {
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
	} else if (!store.state.user.userInfo) {
		http.request({
			url: 'oauth/get-current-user',
			method: 'get'
		}).then(res => {
			store.commit('user/setUserInfo', res.data);
			uni.setStorageSync('userinfo', res.data)
		}).catch(err => {
			delCookie('_identity-user')
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
		})
	} else {
		if (!store.state.appurl) {
			store.commit('user/setUrl', document.URL)
		}
		if (/\/http/.test(to.path)) {
			let url = to.path.split("http")[1];
			window.location.href = `http${url}`;
		} else {
			next();
		}
	}
	//#endif
})
router.afterEach((to, from) => {
	// console.log(to);
	// console.log(from)
})
// console.log(router)

export default router