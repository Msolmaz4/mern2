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



export const cardSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addtoCart: (state, action) => {
        const { id, name, image, price, quantity } = action.payload;
        const isItem = state.carts.find((item) => item.id === id);
  
        if (isItem) {
          state.carts = state.carts.map((item) =>
            item.id === id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
        } else {
          state.carts = [...state.carts, { id, name, image, price, quantity }];
        }
  
        storeInLocalStorage(state.carts);
      },
    removeFromCart:(state,action)=>{
        const tempCart = state.carts.filter(item=>item.id !== action.payload)
        state.carts = tempCart
        storeInLocalStorage(state.carts)
    },
    clearCart :(state,action)=>{
      state.carts= []
      storeInLocalStorage(state.carts)
    }
  },
  

})

// Action creators are generated for each case reducer function
export const { clearCart,removeFromCart,addtoCart} = cardSlice.actions

export default cardSlice.reducer





  // addtoCart: (state,action)=>{
    //     console.log(state.carts,'addtoacart')
    //     //ayni urunden bir tan daha varsa
    //     //const isItem = state.carts.find(cart=>cart.id === action.payload.id)
    //     if(isItem){
    //         const tempCard =state.carts.map((item)=>{
    //             if(item.id === action.payload.id){
    //                 let tempQuanry =item.quantity+action.payload.quantity
    //                 return {
    //                     ...item,quantity : tempQuanry
    //                 }

    //             }else{
    //                 return item
    //             }
    //         })
    //         state.carts =tempCard
    //         storeInLocalStorage(state.carts)
    //     }else{
    //         state.carts.push(action.payload)
    //         storeInLocalStorage(state.carts)
    //     }
      
    // },