import React from 'react';
import Notfound from '../../public/404.gif'

const notfound = () => {
  return (
    <div className=' w-screen h-screen flex justify-center items-center bg-black'>
      <img src={Notfound} alt="" />
    </div>
  )
}

export default notfound
