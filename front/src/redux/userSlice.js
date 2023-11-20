import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {

  user:{},
  isAuth:false,//kullanici girdimimtrue donsun
  loading:false
}

export const register = createAsyncThunk(
  'register',
  async (data) => {
    const response = await axios.post(`http://localhost:4000/register`,data)
    return response
  }
)
export const login = createAsyncThunk(
  'login',
  async (data) => {
    const response = await axios.post(`http://localhost:4000/login`,{email:data.email,password:data.password})
    localStorage.setItem('token',response?.token)
    return response
  }
)
export const profile = createAsyncThunk(
  'profile',
  async () => {
    const token = localStorage.getItem('token')
    const response = await axios.post(`http://localhost:4000/me` ,{
      headers:{authorization:`Bearer ${token}` }
    })
    return response
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
    builder.addCase(login.pending,(state,action)=>{
      state.loading= true
      state.isAuth =false
    })
    builder.addCase(login.fulfilled,(state,action)=>{
      state.loading= false
      state.user = action.payload
      state.isAuth =true
    })
    builder.addCase(profile.pending,(state,action)=>{
      state.loading= true
      state.isAuth =false
    })
    builder.addCase(profile.fulfilled,(state,action)=>{
      state.loading= false
      state.user = action.payload
      state.isAuth =true
    })
   
  },

})

// Action creators are generated for each case reducer function
export const { } = userSlice.actions

export default userSlice.reducer