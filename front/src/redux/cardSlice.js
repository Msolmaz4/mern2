import { createSlice } from '@reduxjs/toolkit'


const fetchFromLoacal = ()=>{
    let cart = localStorage.getItem('cart')
    if(cart){
        return JSON.parse(localStorage.getItem('cart'))
    }else{
        return []
    }
    
}
const storeInLocalStorage = (data)=>{
    localStorage.setItem('cart',JSON.stringify(data))

}


const initialState = {
 carts : fetchFromLoacal()
}


export const generalSlice = createSlice({
  name: 'genera]',
  initialState,
  reducers: {
    addtoCart: (state,action)=>{
        //ayni urunden bir tan daha varsa
        const isItem = state.carts.fin(cart=>cart.id === action.payload.id)
        if(isItem){
            const tempCard =state.carts.map((item)=>{
                if(item.id === action.payload.id){
                    let tempQuanry =item.quantity+action.payload.quantity
                    return {
                        ...item,quantity : tempQuanry
                    }

                }else{
                    return item
                }
            })
            state.carts =tempCard
            storeInLocalStorage(state.carts)
        }
      
    }
  },
  

})

// Action creators are generated for each case reducer function
export const {getKeyword } = generalSlice.actions

export default generalSlice.reducer