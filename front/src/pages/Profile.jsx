import React from 'react'
import { useSelector } from 'react-redux'
import Button from '../components/Button'

const Profile = () => {

    const {user,isAuth} = useSelector(state=>state.user)
    console.log(user,isAuth,'profil')
  return (
    <div className='min-h-screen'>
    denemr
   <div>
    <img src={user?.user?.avatar?.url } alt="" />
   </div>
   <div>
    <div>{user?.user?.name}</div>
    {
      user?.user && <Button name={'profile Upgrade'} onClick={()=>{}}></Button>
    }
    
   </div>


    </div>
  )
}

export default Profile