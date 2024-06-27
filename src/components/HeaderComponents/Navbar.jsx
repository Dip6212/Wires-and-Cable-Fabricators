import React, { useState } from 'react';
import Logo from "../../assets/logo.png";
import { Button } from '../Button';
import { Container } from '../Container';
import { useFirebase } from '../../context/firebase';
import './style.css'; // Import the CSS file
import { toast } from 'react-toastify';
import { Link } from 'react-scroll';
import { BsFillTelephoneFill } from 'react-icons/bs';

export const Navbar = () => {
  const { user, signOutUser } = useFirebase();
  const adminID = process.env.REACT_APP_ADMIN_ID;
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSignOut=()=>{
    signOutUser();
    toast.success("Loogged Out")
  }

  return (
    <nav className='navbar'>
        <Container>
        
        <div className='logo'>
          <img src={Logo} alt='logo' />
        </div>
        <div className={`navItems ${isMenuOpen ? 'open' : ''}`}>
        <ul >
          <li><Link  activeClass="active"
            to="home"
            spy={true}
            smooth={true}
            duration={200}>Home</Link></li>
          <li><Link  activeClass="active"
            to="products"
            spy={true}
            smooth={true}
            duration={200}>Products</Link></li>
          <li><Link  activeClass="active"
            to="about"
            spy={true}
            smooth={true}
            duration={200}>About</Link></li>
          <li><Link  activeClass="active"
            to="contact"
            spy={true}
            smooth={true}
            duration={200}>Contact</Link></li>
        </ul>
        <div className="auth">
          {user?.uid === adminID ? (<Button text={"DashBoard"} path={"/dashboard"} />) : null}
          {user ? (
            <button className='btn' onClick={handleSignOut}>Logout</button>
          ) : (
            <>
              <Button text={"Login"} path={"/login"} />
              <Button text={"Signup"} path={"/register"} />
            </>
          )}
        </div>
        <p className='phone'><span className='icon'><BsFillTelephoneFill/></span><strong>Call 07942820929</strong></p>
        </div>
        <div className='hamburger' onClick={toggleMenu}>
          <div className='bar'>1</div>
          <div className='bar'>2</div>
          <div className='bar'>3</div>
        </div>
    </Container>
      </nav>
  );
};
