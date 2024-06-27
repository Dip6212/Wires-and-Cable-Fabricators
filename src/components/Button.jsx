import React from 'react'
import { useNavigate } from 'react-router-dom'

export const Button = ({text,path}) => {
  const navigate=useNavigate();

  return (
    <button className='btn' onClick={()=>navigate(path)}>{text}</button>

  )
}
