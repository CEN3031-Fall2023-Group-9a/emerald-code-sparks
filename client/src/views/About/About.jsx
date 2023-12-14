import React, { useState, useEffect } from 'react';
import NSF from "../../assets/nsf_logo.png"
import TAMU from "../../assets/tamu_logo.png"
import UF from "../../assets/uf_logo.png"
import NavBar from "../../components/NavBar/NavBar"
import "./About.less"
import PropTypes from 'prop-types';

function About(props) {

  return (
        // change between light and dark css/less depending on state
    <div className={props.isDarkMode ? 'container-dark nav-padding' : 'container nav-padding'}>
	    <NavBar isDarkMode ={props.isDarkMode}/>
      <div className={props.isDarkMode ? "about-content-container about-dark" : "about-content-container"}>
        <h1 id="title" tabIndex="0">About Code Sparks</h1>
        <div id="logos" className="flex space-between">
          <img src={UF} alt="uf" />
          <img src={NSF} alt="nsf" />
          <img src={TAMU} alt="tamu" />
        </div>
        <p tabIndex="0">
          Code Sparks is developed by the University of Florida and Texas A&M
          University with support from the National Science Foundation.
        </p>
        <p tabIndex="0">
          Code Sparks, or Computation and Science Modeling through Making, is a
          cloud-based programming interface designed for fifth and sixth grade
          students to support them in building computational physical models for
          science experiments in the classroom.
        </p>
        </div>
      </div>
  )
}

About.propTypes = {
  isDarkMode: PropTypes.bool.isRequired
}

export default About;