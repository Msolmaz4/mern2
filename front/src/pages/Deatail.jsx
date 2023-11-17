import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router'

const Deatail = () => {
    const {id} = useParams()
     const dispatch = useDispatch()
    useEffect(()=>{

        (if){
            dispatch(get)
        }
    },[dispatch,id])
  return (
    <div>Deatail</div>
  )
}

export default Deatail