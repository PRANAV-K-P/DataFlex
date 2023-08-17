import React from 'react'
import bb from "../../../assets/images/background_body.jpg";


const Home = () => {
  return (
    <div>
<div className="h-screen bg-cover" style={{ backgroundImage: `url(${bb})` }} >
  <div className='flex justify-center items-center h-3/4'>

  <h2 className='text-4xl text-white font-light'>DataFlix: A Unique Website Experience</h2>
  </div>


</div>
    </div>
  )
}


export default Home