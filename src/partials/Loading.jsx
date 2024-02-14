import React from 'react';
import Loader from '../../public/loader.gif'

const Loading = () => {
  return (
    <div className=' w-screen h-screen flex justify-center items-center bg-black'>
      <img src={Loader} alt="" />
    </div>
  )
}

export default Loading
