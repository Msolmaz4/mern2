import React, { useState } from 'react'
import Input from '../components/Input'
import Button from '../components/Button'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router'
import { resetPass } from '../redux/userSlice'

const ResetPassword = () => {
    const [password,setPassword] = useState('')
    const dispatch = useDispatch()
    const token = useParams

  const resetFunc = ()=>{
    dispatch(resetPass({token,password}))
    console.log(token,'resetFunc')
  }

  return (
    <div className="h-screen flex items-center justify-center ">
      <div className=" w-1/3">
        <div> Neue Password eıngeben</div>
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