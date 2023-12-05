import React from 'react';
import NavBar from "../../components/NavBar/NavBar"
import "./HowItWorks.less"
import PropTypes from 'prop-types';

function HowItWorks(props) {

  return (
        // change between light and dark css/less depending on state
   <div className={props.isDarkMode ? 'container-dark nav-padding' : 'container nav-padding'}>
     <NavBar isDarkMode ={props.isDarkMode}/>

      <div className={props.isDarkMode ? "about-content-container about-dark" : "about-content-container"}>
        <h1 id="title" tabIndex="0">How It Works</h1>
        <div id="logos" className="flex space-between">
        </div>
        <p tabIndex="0">
        Code Sparks makes use of Google's Blockly JavaScript library to build a block based 
        visual programming editor within our user interface. Programs created through 
        the visual programming editor can be compiled into Arduino executable code and 
        uploaded directly onto a students Arduino. These programs, once uploaded to the student's 
        Arduino, provide support in performing a corresponding science project in the classroom. 
        </p>
      </div>
    </div>
  )
}

HowItWorks.propTypes = {
  isDarkMode: PropTypes.bool.isRequired
}

export default HowItWorks
