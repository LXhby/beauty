const state = {
    userInfo: {
        headimgurl: "http://thirdwx.qlogo.cn/mmopen/vi_32/oSFOkm2TX3cIepOvPI9Ox6pFXhUvicsC5CTagypSPwBqRLEOzzXL3Iqvfh2jrS9FlG2ydpgQ5J7MaRObdxTk9hA/132",
        id: 1
    },
    token: '0ab538e92c6db78d10b1694e645f3625',
	config:{}
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
	setconfig:(state,info)=>{
		state.config = info;
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