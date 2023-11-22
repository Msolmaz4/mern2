import React, { useEffect, useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { login, register } from "../redux/userSlice";
import { useNavigate } from "react-router";

const Auth = () => {
  const [signUp, setSignUp] = useState(true);
  const dispatch = useDispatch();
  const {user,isAuth} = useSelector(state=>state.user)
  const navi= useNavigate()
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    avatar: "",
  });
  const [preview, setPreview] = useState(
    "https://banner2.cleanpng.com/20180816/syp/kisspng-computer-icons-favicon-user-iconfinder-personal-we-yue-jia-fresh-my-user-icon-svg-png-icon-free-downl-5b7590572d9999.5378872315344313191868.jpg"
  );

  const registerFun = () => {
    console.log(data,'register')
    console.log('object')
    dispatch(register(data))
    setData({
      name: "",
      email: "",
      password: "",
      avatar: "",
    })
  };
  const loginFun = () => {
    dispatch(login(data))
    setData({
      name: "",
      email: "",
      password: "",
      avatar: "",
    })
  };

  const handleChange= (e)=>{
    if(e.target.name === 'avatar'){
      const reader = new FileReader()
      reader.onload = ()=>{
        if(reader.readyState === 2){
          setData(prev=>({...prev,avatar:reader.result}))
          setPreview(reader.result)
        }

      }
         reader.readAsDataURL(e.target.files[0])
    }else{
      setData(prev=>({...prev,[e.target.name]:e.target.value}))
    }

  }
useEffect(()=>{
 if(isAuth){

 }
},[isAuth])
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-1/3">
        <div className="text-2xl"> {signUp ? "kayit Ol" : "Giris Yap"}</div>
        {signUp && (
          <Input
            type={"text"}
            name={"name"}
            id={""}
            placeholder={"Name"}
            value={data.name}
            onChange={handleChange}
          />
        )}
        <Input
          type={"email"}
          name={"email"}
          id={""}
          placeholder={"Email"}
          value={data.email}
          onChange={handleChange}
        />
        <Input
          type={"password"}
          name={"password"}
          id={""}
          placeholder={"assword"}
          value={data.password}
          onChange={handleChange}
        />
        {signUp && (
          <div className="flex items-center gap-3">
            <img src={preview} alt="" className="w-10 h-10 rounded-full" />
            {/* //burda value verdimi hatalr aldim */}
            <Input type={"file"} name={"avatar"} id={""} placeholder={""} onChange={handleChange}/>
          </div>
        )}
        <div
          className="text-red-500 text-sm cursor-pointer"
          onClick={() => setSignUp(!signUp)}
        >
          {signUp ? "Giris" : "Kay ol"}{" "}
          
        </div>
        <div className="text-red-500 text-2xl cursor-pointer" onClick={()=>navi('/forgot')}>sifremi unuttum</div>
        <Button 
          name={signUp ? "kayit Ol" : "Giris Yap"}
          
          onClick={signUp ? registerFun : loginFun}
        />

      </div>
    </div>
  );
};

export default Auth;
