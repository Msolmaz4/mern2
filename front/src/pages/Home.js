import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { getProducts } from '../redux/productSlice'
import ProductCard from '../components/ProductCard'
import ReactPaginate from "react-paginate";

const Home = () => {
  const [itemOffset, setItemOffset] = useState(0);

  const dispatch = useDispatch()
  const {products,loading} = useSelector(state =>state.products)

  const endOffset = itemOffset + 10;

  const currentItems = products?.products?.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(products?.products?.length / 10);
  const handlePageClick = (event) => {
    const newOffset = (event.selected * 10) % products?.products.length;

    setItemOffset(newOffset);
  };

  useEffect(()=>{

    dispatch(getProducts())

  },[dispatch])

console.log(products,loading,'urunler')
  return (
    <div className='min-h-screen'> 
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

    <ReactPaginate   containerClassName="pagination-container"
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
        />
  </div>
  
 
  )
}

export default Home