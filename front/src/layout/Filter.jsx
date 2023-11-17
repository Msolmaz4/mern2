import React from 'react'

const Filter = () => {
    const category = ['kleidung','Auto','Electriniuc','Haus','urlaub']
    const rating = ['1','2','3','4','5']
  return (
    <div className='w-[200px]'>
    <div>Filter</div>
    <div className='flex items-center gap-2 my-2'>
        <input type="number" className='border w-16 p-1 outline-none' placeholder='min'/>
        <input type="number" className='border w-16 p-1 outline-none' placeholder='max'/>
        </div>
        <div>category
           {
            category?.map((item,i)=>(
                <div className='cursor-pointer'  key={i}>{item}</div>
            ))
        }  
        </div>
        <hr />
       <div> rating
         {
            rating?.map((item,i)=>(
                <div className='cursor-pointer' key={i}>{item}</div>
            ))
        }
       </div>
       
    
    
    
    </div>
  )
}

export default Filter