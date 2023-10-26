import React from 'react'
import "./Ranks.css";

const Ranks = ({ranks}) => {
  return (
    <div className='ranks'>{ranks.map((rank,index)=><span key={index}>{rank}</span>)}</div>
  )
}

export default Ranks