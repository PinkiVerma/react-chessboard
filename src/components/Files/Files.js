import React from 'react'
import "./Files.css"

const getCharCode = (x) => {
  return String.fromCharCode(x+96)
}

const Files = ({files}) => {
  return (
    <div className='files'>{files.map((file)=><span key={file}>{getCharCode(file)}</span>)}</div>
  )
}

export default Files