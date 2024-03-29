const state = {
    title: '',
    userInfo: {
        id: 5,
        coin_count: 1,
        u: 1
    },
    token: '0ab538e92c6db78d10b1694e645f3625',
    config: {},
    appurl: null,
    shopId: null,
    orderadress: {},
    shopcarorder: {}
}

const mutations = {
    setTitle: (state, info) => {
        state.title = info
    },
    setUserInfo: (state, info) => {

        state.userInfo = info
    },
    setToken: (state, token) => {
        console.log('setToken', token);
        state.token = token
    },
    setconfig: (state, info) => {
        state.config = info;
    },
    setUrl: (state, url) => {
        state.appurl = url;
    },
    setShopId: (state, id) => {
        state.shopId = id;
    },
    clearShopId: (state) => {
        state.shopId = null;
    },
    setorderadress: (state, info) => {
        state.orderadress = info;
    },
    setshopcarorder: (state, info) => {
        state.shopcarorder = info;
    }
}

const actions = {

}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}