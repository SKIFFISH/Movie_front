import React from 'react'
import {Carousel} from 'antd'
import './style.less'
import Slider from 'react-slick'



const Bigboard = () =>{

  function onChange (a,b,c){
        console.log(a,b,c)
    }
    const width = document.body.clientWidth
    
    return(
    <div className = 'lunbotu'>
        <div className='left-turn'></div>
        <Carousel afterChange={onChange} autoplay className='lunbo' 
        >
                <div>
                <img src='https://image.tmdb.org/t/p/original/pcDc2WJAYGJTTvRSEIpRZwM3Ola.jpg'
                alt='lunbo1'
                className='image_lun'/>
                </div>
                <div>
                <img src='https://image.tmdb.org/t/p/original/drulhSX7P5TQlEMQZ3JoXKSDEfz.jpg'
                alt='lunbo3'
                className='image_lun'/>
                </div>
                <div>
                <img src='https://image.tmdb.org/t/p/original/iopYFB1b6Bh7FWZh3onQhph1sih.jpg'
                alt='lunbo3'
                className='image_lun'/>
                </div>
                <div>
                <img src='https://image.tmdb.org/t/p/original/hJuDvwzS0SPlsE6MNFOpznQltDZ.jpg'
                alt='lunbo4'
                className='image_lun'/>
                </div>
        </Carousel>
        </div>
    )
}

export default Bigboard