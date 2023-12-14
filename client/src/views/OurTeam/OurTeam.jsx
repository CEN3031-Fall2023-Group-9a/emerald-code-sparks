import React, { useState, useEffect } from 'react';
import NavBar from "../../components/NavBar/NavBar"
import PropTypes from 'prop-types';
import "./OurTeam.less"

function OurTeam(props) {

  return (
        // change between light and dark css/less depending on state
    <div className={props.isDarkMode ? 'container-dark nav-padding' : 'container nav-padding'}>
      <NavBar isDarkMode ={props.isDarkMode}/>
      <div className={props.isDarkMode ? "about-content-container about-dark" : "about-content-container"}>
        <h1 id="title" tabIndex="0">Our Team</h1>
        <div id="logos" className="flex space-between">
        </div>
        <p tabIndex="0">
          The following team members from the University of Florida have
          contributed to the design, development, and evaluation of the Code Sparks
          application:
          <br />
          <br />
          Dr. Sharon Chu
          <br />
          Dr. Christina Gardner-McCune
          <br />
          Pedro Feijóo-García
          <br />
          Sarah Brown
          <br />
          Nicholas Ionata
          <br />
          Dakota Rennemann
          <br />
          Megha Nagarmunoli
          <br />
          Adam Tamargo
          <br />
          Gus Segovia
          <br />
          Lily Hinkeldey
          <br />
          Siyu Chen
          <br />
          Anna Le
          <br />
          Yerika Jimenez
          <br />
          Siyu Chen
          <br />
          Michael Pascuzzi
          <br />
          David Magda
        </p>
      </div>
    </div>
  )
}

OurTeam.propTypes = {
  isDarkMode: PropTypes.bool.isRequired
}

export default OurTeam;