import React from 'react';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'

const buildSlideImage = (url) => {
  return {
    url: `../img/vehicles/${url}`,
    caption: 'Slide 1'
  };
};

const Slideshow = ({images}) => {

  const slideImages = [];
  images.forEach(element => {
    return slideImages.push(buildSlideImage(element));
  });

  return (
    <div className="slide-container">
      <Slide style={{ height: '100%', width: '100%', marginTop: '10px', marginBottom: '40px'}}>
      {slideImages.map((slideImage, index)=> (
          <div className="each-slide center" key={index}>
            <div>
              <img src={slideImage.url} alt=''/>
            </div>
          </div>
        ))} 
      </Slide>
    </div>
  )
}

export default Slideshow;