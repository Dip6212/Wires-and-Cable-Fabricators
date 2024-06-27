import React from 'react'
import { Navbar } from './HeaderComponents/Navbar'
import { Banner } from './HeaderComponents/Banner'
import { Element } from 'react-scroll'

 const Header = () => {
  return (
    <>
    <Navbar/>
    <Element name="home" className="element" >
    <Banner/>
    </Element>
    
    </>
  )
}

export default Header