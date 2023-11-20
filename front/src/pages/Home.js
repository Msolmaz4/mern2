import React, { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { getProducts } from '../redux/productSlice'
import ProductCard from '../components/ProductCard'

const Home = () => {

  const dispatch = useDispatch()
  const {products,loading} = useSelector(state =>state.products)


  useEffect(()=>{

    dispatch(getProducts())

  },[dispatch])


  return (
    <div> 
    <div >
      <img className='w-full' src="/ana.jpeg" alt="" />
    </div>
    {
      loading ? 'loading....' : <div>
      {
        products?.products && <div className='flex items-center justify-center gap-5 my-5 flex-wrap'>
            {
              products?.products?.map((item,i)=>(
                <ProductCard product = {item} key={i}/>
              ))
            }
            </div>
      }
        
      </div> 
   
    }
  </div>
  
 
  )
}

export default Home