const getters = {
    userInfo: state => state.user.userInfo,
    token: state => state.user.token,
    config: state => state.user.config,
	cartnum:state=>state.cartnum.num,
	collect:state=>state.cartnum.collect,
	shopcar:state=>state.cartnum.shopcar,
}
export default getters