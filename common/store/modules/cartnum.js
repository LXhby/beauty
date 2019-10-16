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
		console.log('shopId',info.shopId)
		var shop = state.shopcar.find((ele)=>ele.shopId==info.shopId);
		if(shop){
			console.log('同一个店铺')
			var item = shop.products.find((ele)=>ele.id==info.item.id)
			if(!item){
				var obj = Object.assign({num:1},info.item)
				shop.products.push(obj)
			}else{
				item.num++;
			}
		}else{
			console.log('不一样的店铺')
			var ob={
				shopId:info.shopId,
				products:[]
			};
			var oa= Object.assign({num:1},info.item)
			ob.products.push(oa);
			console.log(ob)
			state.shopcar.push(ob)
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