import React, { useState } from 'react'
import Input from '../components/Input'
import Button from '../components/Button'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router'
import { resetPass } from '../redux/userSlice'



const ResetPassword = () => {
    const [password,setPassword] = useState('')
    const dispatch = useDispatch()
    const {token} = useParams()
    //console.log(tok.token,'resetToken')
  const navi = useNavigate()
  
   

  const resetFunc = async()=>{
    try {
      //console.log(tok.token)
    await dispatch(resetPass({token,password}))
    // Şifre sıfırlama başarılı olduğunda ana sayfaya yönlendirme
    navi('/')
    } catch (error) {
  
    }
    
    
  }

  return (
    <div className="h-screen flex items-center justify-center ">
      <div className=" w-1/3">
        <div> Neue Password eingeben</div>
        <Input
          placeholder={"Neues Password "}
          onChange={(e) =>setPassword(e.target.value)}
          name={"password"}
          id={""}
          type={"password"}
        />
        <Button name={"bestatigung"} onClick={resetFunc} />
      </div>
    </div>
  )
}

export default ResetPassword