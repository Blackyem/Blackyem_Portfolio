 import React, {useState, useEffect} from 'react';
  
 import { images } from '../../constants'; 
 import { AppWrap, MotionWrap } from '../../wrapper';
 import { client } from '../../client';
 import "./Footer.scss";



 const Footer = () => {
   const [formData, setFormData] = useState({ name: "", email: "", message: ""  });
   const [isFormSubmitted, setIsFormSubmitted] = useState(false);
   const [loading, setLoading] = useState(false);

   const { username, email, message } = formData;

   const handleChangeInput = (e) => {
     const { name, value } = e.target;

     setFormData({ ...formData, [name]: value });  
   };

   const handleSubmit = () => {
    setLoading(true);
    
   
   const contact = {
     _type: "contact",
     name:  username,
     email: email,
     message: message,
   };

   client.create(contact)
     .then(() => {
      setLoading(false);
      setIsFormSubmitted(true);
     })
   }
   
   return (
     <>
       <h2 className="head-text">Calm and look what a better development means.</h2>

       <div className="app__footer-cards">
         <div className="app__footer-card">
           <img src={images.email} alt="email" />
           <a href="mailto:blackyem44@yahoo.com" className="p-text">blackyem44@yahoo.com</a>
        </div> 
         <div className="app__footer-card">
           <img src={images.mobile} alt="email" />
           <a href="phone: (+234) 70363024" className="p-text"> (+234) 70363024</a>
        </div> 
       </div>

       {!isFormSubmitted ? 
       <div className="app__footer-form app__flex">
        <div className="app__flex">
          <input className="p-text" type="text" placeholder="Your Username" name="username" value={username} onChange={handleChangeInput} />
        </div>
        <div className="app__flex">
          <input className="p-text" type="text" placeholder="Your Email" name="email" value={email} onChange={handleChangeInput} />
        </div>
        <div> 
          <textarea
           className="p-text"
           placeholder="Your Message"
           value={message}
           name="message"
           onChange={handleChangeInput}
          />
        </div>
        <button type="button" className="p-text" onClick={handleSubmit}>{!loading ? "Send" : "Sending..."}</button>
       </div>
         
          :<div>
              <h3
                className="head-text">Thanks for your patronage!
          </h3>
        </div>
       }

     </>
   );
 };
 


 export default AppWrap(
  MotionWrap(Footer, "app__footer"),
  "contact",
  "app__whitebg"
  );
 
 