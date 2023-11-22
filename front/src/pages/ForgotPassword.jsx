import React, { useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import { useDispatch } from "react-redux";
import { forgotPass } from "../redux/userSlice";

const ForgotPassword = () => {

    const [email,setEmail] = useState('')
    const dispatch = useDispatch()

const forgotFun =()=>{
    dispatch(forgotPass(email))
    setEmail('')
}

  return (
    <div className="h-screen flex items-center justify-center ">
      <div className=" w-1/3">
        <div> ForgotPassword</div>
        <Input
          placeholder={'email'}
          name={"email"}
          id={""}
          value={email}
          type={"text"}
          onChange={(e)=>setEmail(e.target.value)}
        />
        <Button name={"bestatigung"} onClick={forgotFun} />
      </div>
    </div>
  );
};

export default ForgotPassword;
