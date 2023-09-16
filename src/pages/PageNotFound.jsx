import React from 'react'
import pageNotFound from "../assets/404.jpg"
const PageNotFound = () => {
  return (
    <div className='flex justify-center items-center'>
      <img src={pageNotFound} alt='404'></img>
    </div>
  )
}

export default PageNotFound