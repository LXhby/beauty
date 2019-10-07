const state = {
	num:0
};

const mutations = {
    setnum: (state, info) => {   
        state.num++;
		console.log(state.num)
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