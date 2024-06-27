import React from 'react';
import { Button } from 'react-bootstrap';
import './style.css'; 

const WhatsAppBtn = ({ phoneNumber, message }) => {
  const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
      <Button variant="success" className="whatsapp-button">
        <i className="fab fa-whatsapp"></i> Chat with us
      </Button>
    </a>
  );
};

export default WhatsAppBtn;
