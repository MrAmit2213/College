import React from 'react'
import Banner from './Banner'
import Body from './Body'
import '../css/banner.css'

const Home = (props) => {
  return (
    <div>
      <div className='bannerHeight'>
        <Banner campus={props.campus} />
      </div>
      <Body campus={props.campus} />
    </div>
  )
}

export default Home
