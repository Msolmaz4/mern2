import React from 'react'
import { useSelector } from 'react-redux'
import Button from '../components/Button'

import {  useNavigate } from 'react-router'

const Profile = () => {

    const {user,isAuth} = useSelector(state=>state.user)
    console.log(user,isAuth,'profil')
    const navi = useNavigate()
  return (
    <div className='min-h-screen'>
    
   
   {
    isAuth ? ( <div>

   
      <div>
    <img src={user?.user?.avatar?.url } alt="" />
   </div>
   <div>
    <div>{user?.user?.name}</div>
    {
      user?.user && <Button name={'profile Upgrade'} onClick={()=>{}}></Button>
    }
    
   </div> </div>):(navi('/auth'))
   }
   


    </div>
  )
}

export default Profile