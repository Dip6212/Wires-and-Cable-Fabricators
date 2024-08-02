import React, { useEffect, useState } from 'react'
import { useFirebase } from '../../context/firebase';

export const Banner = () => {

  const { getAboutParagraph} = useFirebase();
  const [paragraph,setParagraph]=useState("");

  useEffect(() => {
    const fetchDetails = async () => {
      const para=await getAboutParagraph(); 
      setParagraph(para);
      console.log("this is my about paragraph ",para);
    };

    fetchDetails();
  }, [getAboutParagraph]);

  return (
    <div className='banner'>
      <div className='banner_text'>
        <h1>Wires And Cable Fabricators</h1>
        <p>{paragraph}</p>
      </div>
    </div>
  )
}



