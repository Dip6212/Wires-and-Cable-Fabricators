import React, { useState } from 'react'
import Header from "../components/Header";
import Category from "../components/categoryComponents/Category";
import About from "../components/About";
import Contact from "../components/contactComponents/Contact";
import { Element } from 'react-scroll';


export const Home = () => {


  return (
    <>
      
        <Header/>
      
      <Element name="products" className="element" >
      <Category/>
      </Element>
      <Element name="about" className="element" >
      <About/>
      </Element>
      <Element name="contact" className="element" >
      <Contact/>
      </Element>
        
        
        
    </>
  )
}

