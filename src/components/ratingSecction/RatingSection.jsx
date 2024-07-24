import React, { useEffect, useState } from 'react';
import { Container } from '../Container';
import { useFirebase } from '../../context/firebase';
import { Image, Button } from 'react-bootstrap';
import ProfileImage from '../../assets/person.png';
import { Rating } from 'react-simple-star-rating';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import { FaQuoteLeft } from "react-icons/fa";
import "./style.css";

const RatingSection = () => {
  const [ratings, setRatings] = useState([]);
  const firebase = useFirebase();
  const { user } = firebase;
  const adminID = process.env.REACT_APP_ADMIN_ID;

  useEffect(() => {
    const fetchRatings = async () => {
      const ratingsCollection = await firebase.getRating();
      const fetchedRatings = ratingsCollection.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setRatings(fetchedRatings);
    };

    fetchRatings();
  }, [firebase]);

  const handleDelete = async (ratingId) => {
    await firebase.deleteRatingById(ratingId);
    setRatings(ratings.filter(rating => rating.id !== ratingId));
  };

  // let settings;

  console.log("these are my ratings ",ratings.length)

  var settings = {
    dots: true,
    infinite: (ratings.length>2 ? true : false),
    speed: 500,
    slidesToShow: (ratings.length>2 ? 3 : 1),
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: (ratings.length>2 ? 3 : 1),
          slidesToScroll: 1,
          infinite: (ratings.length>2 ? true : false),
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: (ratings.length>2 ? 3 : 1),
          slidesToScroll: 1,
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



  return (
    <Container>
      <h1 className='sectionHeading'>Our Ratings</h1>
      <Slider {...settings}>
        {ratings.map((rating) => (
          <div className='rating-card-wrap' key={rating.id}>
            <div className='rating-card'>
              <div className='rating'>
                <Rating initialValue={rating.rating} readonly />
              </div>
              <div className='description'>
                <p className='quote'><FaQuoteLeft /></p>
                <p>{rating.description}</p>
              </div>
              <div className='user-info'>
                <div className='user-image'>
                  <Image width={"20px"} height={"20px"} src={rating.photoURL ? rating.photoURL : ProfileImage} />
                </div>
                <div className='user-name'>{rating.email}</div>
              </div>
              {user && user?.uid === adminID && (
                <Button variant="danger" onClick={() => handleDelete(rating.id)}>Delete</Button>
              )}
            </div>
          </div>
        ))}
      </Slider>
    </Container>
  );
}

export default RatingSection;
