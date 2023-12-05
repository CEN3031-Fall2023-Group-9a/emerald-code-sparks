import React from 'react';
import Logo from "../../assets/code-sparks_logo11_duck.png";
import NavBar from "../../components/NavBar/NavBar";
import TeacherLogin from '../TeacherLogin/TeacherLogin';
import PropTypes from 'prop-types';

import './Home.less';
import HomeJoin from "../StudentLogin/HomeJoin";

const Home = (props) => {

return (
    <div className={props.isDarkMode ? 'container-dark nav-padding' : 'container nav-padding'} >
        {/* Display Light or Dark Mode Nav Bar depending on state */}
        <NavBar isDarkMode ={props.isDarkMode}/>

        {/* logo and logins */}
        <div id='join-wrapper' alt="Log in Section" tabIndex="-1">
                <img src={Logo} alt='logo' id='home-logo' tabIndex="0"/>
            <HomeJoin isDarkMode={props.isDarkMode}/>
            <TeacherLogin isDarkMode={props.isDarkMode}/>
        </div>

        {/* featured projects / display the dark or light mode depending on state */}
        <div className={props.isDarkMode ? 'projects-container-dark' : 'projects-container'} tabIndex="-1">
            <h1>FEATURED PROJECTS</h1>
            <div className='projects-row'>
                <div className={props.isDarkMode ? "project-box-dark" : "project-box"} tabIndex="0">

                    <div className='credits-overlay'>
                        <h1>Name 1</h1>
                    </div>
                </div>

                <div className={props.isDarkMode ? "project-box-dark" : "project-box"} tabIndex="0">

                <div className='credits-overlay'>
                        <h1>Name 2</h1>
                    </div>
                </div>

                <div className={props.isDarkMode ? "project-box-dark" : "project-box"} tabIndex="0">

                <div className='credits-overlay'>
                        <h1>Name 3</h1>
                    </div>
                </div>

                <div className={props.isDarkMode ? "project-box-dark" : "project-box"} tabIndex="0">

                <div className='credits-overlay'>
                        <h1>Name 4</h1>
                    </div>
                </div>
            </div>
        </div>
    </div>
)}

Home.propTypes = {
    isDarkMode: PropTypes.bool.isRequired
};


export default Home;