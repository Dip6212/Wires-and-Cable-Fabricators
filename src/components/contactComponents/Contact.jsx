import React from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import "./style.css"
import { MdLocationPin } from 'react-icons/md';
import { BsFillTelephoneFill } from 'react-icons/bs';
import { IoIosContact } from 'react-icons/io';
import WhatsAppBtn from '../whatsappbtn/WhatsAppBtn';



const Contact = () => {

  

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
          <p><span className='icon'><BsFillTelephoneFill/></span><strong>Call 07942820929</strong></p>
          <p>91% Call Response Rate</p>
          <div className='contact-button'>

          <WhatsAppBtn phoneNumber="8482045570" message={`Hello, I would like to ask more about: `}/>
          <Button variant="outline-success" style={{width:"fit-content"} }>Send Email</Button>
          </div>
        </Col>
        <Col md={5}>
          <h4>Leave a Message, we will call you back!</h4>
          <Form>
            <Form.Group className="mb-3" controlId="requirementDetails">
              <Form.Label>Requirement Details</Form.Label>
              <Form.Control as="textarea" rows={3} placeholder="Additional details about your requirement..." />
            </Form.Group>
            <Button variant="success" type="submit">Submit Requirement</Button>
          </Form>
        </Col>
      </Row>
    </Container>
    </div>
  )
}

export default Contact