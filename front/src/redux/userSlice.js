import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const initialState = {

  user:{},
  isAuth:false,//kullanici girdimimtrue donsun
  loading:false
}

export const register = createAsyncThunk(
  'register',

  async (data) => {
    const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // İhtiyaca göre diğer başlıkları ekleyebilirsiniz
        },
        body: data
     }
    
    const response = await fetch(`http://localhost:4000/register`,requestOptions)

    return (await response.json()) 
  }
)


export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers:(builder)=>{
    builder.addCase(register.pending,(state,action)=>{
      state.loading= true
      state.isAuth =false
    })
    builder.addCase(register.fulfilled,(state,action)=>{
      state.loading= false
      state.user = action.payload
      state.isAuth =true
    })
   
  },

})

// Action creators are generated for each case reducer function
export const { } = userSlice.actions

export default userSlice.reducer