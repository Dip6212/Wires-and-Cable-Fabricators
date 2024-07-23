import React, { useState } from 'react'
import { Container, Row, Col, Form, Button, Image } from 'react-bootstrap';
import "./style.css"
import { MdLocationPin } from 'react-icons/md';
import { BsFillTelephoneFill } from 'react-icons/bs';
import { IoIosContact } from 'react-icons/io';
import WhatsAppBtn from '../whatsappbtn/WhatsAppBtn';
import { db, useFirebase } from '../../context/firebase';
import { Rating } from 'react-simple-star-rating';
import EmailButton from './EmailButton';



const Contact = () => {
  // const {user}=useFirebase();
  const firebase=useFirebase();
  

    // const {displayName,email,photoURL}=user;
  
  // console.log("!!!this is user name!!!",displayName,email);
  const [rating, setRating] = useState(1);
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
  
      try {
        await firebase.addRating( rating, description);
        setRating(1);
        setDescription('');
      } catch (error) {
        console.error('Error adding document: ', error);
      }
    
   
  };

  const handleRating = (rate) => {
    setRating(rate)
  }


  return (
    <div className='contact'>
      <h1 className="sectionHeading">Contact</h1>

      <Container className="my-5">
      <Row className='g-4'>
        <Col md={3}>
          <h4 className='contact-heading'>Our Company</h4>
          <ul className="list-unstyled">
            <li>About Us</li>
            <li>Products & Services</li>
            <li>Contact Us</li>
            <li>Sitemap</li>
            <li>Download Brochure</li>
          </ul>
        </Col>
        <Col md={4}>
          <h4 className='contact-heading'>Reach Us</h4>
          <p><strong>Wires And Cable Fabricators</strong></p>
          <p><span className='icon'> <MdLocationPin/></span>
            P-56, Bijan Kanan, Brahmapur, Kolkata, Near bijan kanan development society, 
            Kolkata-700096, West Bengal, India
          </p>
          <a href="#">Get Directions</a>
          <p><span className='icon'><IoIosContact/></span><strong>VINAY KUMAR MANDAL (CEO)</strong></p>
          <p><span className='icon'><BsFillTelephoneFill/></span><strong>Call  90071 41362, 9831197775.</strong></p>
          <p>91% Call Response Rate</p>
          <div className='contact-button'>

          <WhatsAppBtn phoneNumber="90071 41362" message={`Hello, I would like to ask more about: `}/>
          {/* <Button variant="outline-success" style={{width:"fit-content"} }>Send Email</Button> */}
          <EmailButton/>
          </div>
        </Col>
        <Col md={5}>
          <h4 className='contact-heading'>Rate us</h4>
          <form onSubmit={ handleSubmit }>
      <div className='rating-card'>
      <div>
        <label>Rating:</label>
        <Rating onClick={handleRating} initialValue={rating} />
      </div>
      <div className='raing-description'>
        <label>Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
      </div>
  
      </div>
      
      <Button style={{marginTop:"15px"} } type="submit">Submit Rating</Button>
    </form>
        </Col>
      </Row>
    </Container>
    </div>
  )
}

export default Contact