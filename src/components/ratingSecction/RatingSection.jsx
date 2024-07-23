import React, { useEffect, useState } from 'react'
import { Container } from '../Container'
import { useFirebase } from '../../context/firebase';
import { Image } from 'react-bootstrap';
import ProfileImage from '../../assets/person.png';
import { Rating } from 'react-simple-star-rating';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import { FaQuoteLeft } from "react-icons/fa";
// import { FaQuoteRight } from 'react-icons/fa';
import "./style.css";
const RatingSection = () => {

    const [ratings, setRatings] = useState([]);
    const firebase=useFirebase();
    // <li key={index}>
          //   <p><strong>image:</strong> </p>
          //   <p><strong>Email:</strong> {rating.email}</p>
          //   <p><strong>Rating:</strong> </p>
          //   <p><strong>Description:</strong> {rating.description}</p>
          // </li>
    useEffect(() => {
      const fetchRatings = async () => {
        const ratingsCollection = await firebase.getRating();
        setRatings(ratingsCollection.docs.map(doc => doc.data()));
      };
  
      fetchRatings();
    }, []);


    var settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 4,
      initialSlide: 0,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    };
  console.log("slider settings", settings);

  return (
    <Container>
        <h1 className='sectionHeading'>Our Ratings</h1>
        <Slider {...settings}>

        {ratings.map((rating,index)=>(
          <div className='rating-card-wrap' key={index}>
          <div className='rating-card'>
            <div className='rating'>
              <Rating initialValue={rating.rating} readonly/>
            </div>
            <div className='description'>
            <p className='quote'><FaQuoteLeft/></p>
            <p> {rating.description}</p>
            </div>
            <div className='user-info'>
                <div className='user-image'><Image width={"20px"} height={"20px"} src={rating.photoURL ? rating.photoURL : ProfileImage}/></div>
                <div className='user-name'>{rating.email}</div>
            </div>
          </div>
          </div>
        ))}
        </Slider>
     
      
      
    </Container>
  )
}

export default RatingSection