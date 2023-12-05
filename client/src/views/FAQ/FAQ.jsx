import React, { useState, useEffect } from 'react';
import Accordion from '../../components/Accordion/Accordion';
import NavBar from "../../components/NavBar/NavBar";
import "./FAQ.less"
import PropTypes from 'prop-types';

function FAQ(props) {

  return (
        // change between light and dark css/less depending on state
    <div className={props.isDarkMode ? 'container-dark nav-padding' : 'container nav-padding'}>
	<NavBar isDarkMode ={props.isDarkMode}/>

    <div>
      <div className={props.isDarkMode ? "accordion faq-dark" : "accordion"}>
      <h1>FAQ</h1>
          <Accordion title={"Question 1"} content={"Answer to Question 1..."} />
          <p></p>
          <Accordion title={"Question 2"} content={"Answer to Question 2..."} />
          <p></p>
          <Accordion title={"Question 3"} content={"Answer to Question 3..."} />
          <p></p>
          <Accordion title={"Question 4"} content={"Answer to Question 4..."} />
          <p></p>
          <Accordion title={"Question 5"} content={"Answer to Question 5..."} />
      </div>
    </div>
   </div>
  )
}

FAQ.propTypes = {
  isDarkMode: PropTypes.bool.isRequired
}

export default FAQ;