const state = {
    userInfo: {
        id: 5,
        coin_count: 1,
		u:1
    },
    token: '0ab538e92c6db78d10b1694e645f3625',
    config: {},
    appurl: null
}

const mutations = {
    setUserInfo: (state, info) => {
        console.log('setUserInfo', info);
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