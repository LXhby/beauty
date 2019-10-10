const state = {
	num:0,
	collect:[],
	shopcar:[]
};

const mutations = {
    setnum: (state, info) => {
        state.num = state.num + info;
    },
	setcollect:(state,info)=>{
		var item = state.collect.find((ele)=>ele.id==info.id)
		if(!item){
			state.collect.push(info)
		}else{
			return false;
		}
	},
	delcollect:(state,info)=>{
		var item = state.collect.forEach((item,index)=>{
			if(item.id == info.id){
				state.collect.splice(index,1)
			}
		})
	},
	setShopcar:(state,info)=>{
		var item = state.shopcar.find((ele)=>ele.id==info.id)
		if(!item){
			var obj = Object.assign({num:1},info)
			state.shopcar.push(obj)
		}else{
			item.num++;
		}
		console.log('shopcar',state.shopcar)
	},
	clearnum: (state) => {
		state.num = 0
	},
	clearcollect:(state) => {
		state.collect = []
	},
	clearShopcar:(state) => {
		state.shopcar = []
	},
}

const actions = {

}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}