import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';

import { AppWrap, MotionWrap } from '../../wrapper';
import { urlFor, client } from '../../client';
import "./Testimonial.scss";

const Testimonial = () => {
   const [brands, setBrands] = useState([]);
   const [testimonials, setTestimonials] = useState([]);
   const [currentIndex, setCurrentIndex] = useState(0); 

   const handleClick = (index) => {
     setCurrentIndex(index)
   } 

   useEffect(() => {
    const query = '*[_type == "testimonials"]';
    const brandsQuery = '*[_type == "brands"]';

    client.fetch(query)
      .then((data) => {
       setTestimonials(data);
      })

    client.fetch(brandsQuery)
      .then((data) => {
       setBrands(data);
      })
  }, []);

  const  testCIn  = testimonials[currentIndex];
 
  return (
    <>
      {testimonials.length && (
        <>
         <div className="app__testimonials-item app__flex">
          <img src={urlFor(testCIn.imageurl)} alt="testimonials" />
          <div className="app__testimonials-content">
            <p className="p-test">{testCIn.feedback}</p>
            <div>
               <h4 className="bold-test">{testCIn.name}</h4>
               <h5 className="bold-test">{testCIn.company}</h5>
            </div>
          </div>
        </div>

        <div className="app__testimonials-btns app__flex">
          <div className="app__flex" onClick={() => handleClick(currentIndex === 0 ? testimonials.length -1 : currentIndex -1)}>
            <HiChevronLeft/>
          </div>
          <div className="app__flex" onClick={() => handleClick(currentIndex === testimonials.length -1 ? 0 : currentIndex +1)}>
            <HiChevronLeft/>
          </div>
        </div> 
        </>
      )}

      <div className="app__testimonials-brands app__flex">
        {brands.map((brands) => (
         <motion.div
           whileInView={{ opacity: [0, 5] }}
           transition={{ duration: 0.5, type: "tween"  }}
           key={brands.id}
         >
           <img src={urlFor(brands.imgUrl)} alt={brands.name} />
         </motion.div>
        ))} 
      </div>
    </>
  ) 
}

export default AppWrap(
  MotionWrap(Testimonial, "app__testimonials"),
  "testimonial",
  "app__primarybg"
  );

