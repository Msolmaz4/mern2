import { useState } from "react";
import { HiMiniArchiveBoxArrowDown } from "react-icons/hi2";
import { useNavigate } from "react-router";
import { useDispatch, useSelector} from 'react-redux'
import { getKeyword } from "../redux/generalSlice";


const Header = () => {

  const [openMenu ,setOpenMenu] = useState(false)
  const [keyword ,setKeyword] = useState('')
  const {user,isAuth} = useSelector(state=>state.user)
  const navigat = useNavigate()
  const distpach = useDispatch()
  const menuItems = [
    {
      name: "Profil",
      url: "/profil",
    },
    {
      name: "Admin",
      url: "/admin",
    },
    {
      name: "logout",
      url: "/logout",
    },
  ];

  const keywordFunc = ()=>{
    distpach(getKeyword(keyword))
    navigat('/products')
     setKeyword('')

  }
 console.log(user.data?.user.avatar.url)
  return (
    <div className=" flex items-center justify-between h-16 px-2 bg-gray-300">
      <div className="flex">demee.</div>
      <div className="flex items-center gap-5">
      <div className="flex items-center">

         <input type="text" value={keyword} onChange={(e)=>setKeyword(e.target.value)} placeholder="suchen" className="p-2 outline-none" />
         <button className="p-2 ml-1 bg-white cursor-pointer" onClick={keywordFunc}>Such</button>
      </div>
       
        <div className="relative">
          <img className='w-8 h-8 rounded-full'
            src= {user?.data?.user ? user.data?.user?.avatar.url:"https://banner2.cleanpng.com/20180816/syp/kisspng-computer-icons-favicon-user-iconfinder-personal-we-yue-jia-fresh-my-user-icon-svg-png-icon-free-downl-5b7590572d9999.5378872315344313191868.jpg"}
            alt=""
           onClick={()=>setOpenMenu(!openMenu)}
          />
          { openMenu && <div className="absolute right-0 mt-3 w-[200] bg-white shadow-gray-300">
            {menuItems?.map((item, index) => (
              <div key={index} className="px-2 py-1 hover:bg-gray-300">{item.name}</div>
            ))}
          </div>}
          
        </div>
        <div className="relative">
        <HiMiniArchiveBoxArrowDown size={28} />
        <div className='absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center'>4</div>
            </div>
      </div>
    </div>
  );
};

export default Header;
