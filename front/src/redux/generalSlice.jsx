import { createSlice } from '@reduxjs/toolkit'

const initialState = {
 keywords :''
}


export const generalSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  

})

// Action creators are generated for each case reducer function
export const { } = generalSlice.actions

export default generalSlice.reducer