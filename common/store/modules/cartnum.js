const state = {
	num:0,
	collect:[]
};

const mutations = {
    setnum: (state, info) => {   
        state.num++;
		console.log(state.num)
    },
	setcollect:(state,info)=>{
		var item = state.collect.find((ele)=>ele==info)
		if(!item){
			state.collect.push(info)
		}else{
			return false;
		}
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