const getters = {
    userInfo: state => state.user.userInfo,
    token: state => state.user.token,
    shopId: state => state.user.shopId,
    config: state => state.user.config,
    orderadress: state => state.user.orderadress,
    shopcarorder: state => state.user.shopcarorder,
	cartnum:state=>state.cartnum.num,
	collect:state=>state.cartnum.collect,
	shopcar:state=>state.cartnum.shopcar,
}
export default getters