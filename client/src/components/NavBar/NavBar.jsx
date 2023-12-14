import React from 'react';
import './NavBar.less';
import config from './NavBarConfig.json';
import Logo from '../../assets/code-sparks_logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { BarsOutlined } from '@ant-design/icons';
import { removeUserSession } from '../../Utils/AuthRequests';
import { useGlobalState } from '../../Utils/userState';
import PropTypes from 'prop-types';


function NavBar(props) {

  const [value] = useGlobalState('currUser');
  let navigate = useNavigate();
  let routes = config.routes;
  
  //toggle for responsive navbar dropdown
  const toggleNavbar = () => {
    const x = document.getElementById("navBar");
      if (x.className === "top-nav") {
      x.className += " responsive";
    } else {
      x.className = "top-nav";
    }
  };

  const handleLogout = () => {
    removeUserSession();
    navigate('/');
  };

  const handleRouteChange = (route) => {
    navigate(route);
  };

  const shouldShowRoute = (route) => {
    return config.users[value.role].includes(route);
  };

  return (
    <div className={props.isDarkMode ? "dark-mode" : ""}>
      <div id='navBar' className='top-nav' tabIndex="0" alt="Navigation Bar" style={{backgroundColor: props.isDarkMode ? '#247BA0' : '#F4f4f5'}}>
      <img src={Logo} id='logo' alt='logo' tabIndex="0" 
           onClick={() => handleRouteChange(routes.Home)}
           onKeyUp={(e) => {if (e.key === 'Enter') handleRouteChange(routes.Home)}}/>

      {/* the navbar will show paths based on the user's role */}
      {shouldShowRoute('Home') ? (
        <p onClick={() => handleRouteChange(routes.Home)}
          onKeyUp={(e) => {if (e.key === 'Enter') handleRouteChange(routes.Home)}}
          tabIndex="0"
          id="first"
        >HOME</p>
      ) : null}

      {shouldShowRoute('About') ? (
        <div className="dropdown" tabIndex="0">
        <button className="drop-btn" tabIndex="-1" style={{backgroundColor: props.isDarkMode ? '#247BA0' : '#F4f4f5'}}>
          ABOUT   
        </button>
        <div className="dropdown-content" tabIndex="-1">
          <p onClick={() => handleRouteChange(routes.About)}
            onKeyUp={(e) => {if (e.key === 'Enter') handleRouteChange(routes.About)}}
            tabIndex="0"
            id="about"
          >ABOUT Code Sparks</p>

          <p onClick={() => handleRouteChange(routes.HowItWorks)}
            onKeyUp={(e) => {if (e.key === 'Enter') handleRouteChange(routes.HowItWorks)}}
            tabIndex="0"
          >HOW IT WORKS</p>

          <p onClick={() => handleRouteChange(routes.OurTeam)}
            onKeyUp={(e) => {if (e.key === 'Enter') handleRouteChange(routes.OurTeam)}}
            tabIndex="0"
          >OUR TEAM</p>

          <p onClick={() => handleRouteChange(routes.FAQ)}
            onKeyUp={(e) => {if (e.key === 'Enter') handleRouteChange(routes.FAQ)}}
            tabIndex="0"
          >FAQ</p>
        </div>
      </div>
      ) : null}

      {shouldShowRoute('Dashboard') ? (
        <p onClick={() => handleRouteChange(routes.Dashboard)}
        onKeyUp={(e) => {if (e.key === 'Enter') handleRouteChange(routes.Dashboard)}}
        tabIndex="0"
        >DASHBOARD</p>
      ) : null}

      {shouldShowRoute('StudentDashboard') ? (
        <p onClick={() => handleRouteChange(routes.StudentDashboard)}
        onKeyUp={(e) => {if (e.key === 'Enter') handleRouteChange(routes.StudentDashboard)}}
        tabIndex="0"
        >DASHBOARD</p>
      ) : null}

      {shouldShowRoute('ContentCreatorDashboard') ? (
        <p onClick={() => handleRouteChange(routes.ContentCreatorDashboard)}
        onKeyUp={(e) => {if (e.key === 'Enter') handleRouteChange(routes.ContentCreatorDashboard)}}
        tabIndex="0"
        >DASHBOARD</p>
      ) : null}

      {shouldShowRoute('ResearcherDashboard') ? (
        <p onClick={() => handleRouteChange(routes.ResearcherDashboard)}
        onKeyUp={(e) => {if (e.key === 'Enter') handleRouteChange(routes.ResearcherDashboard)}}
        tabIndex="0"
        >DASHBOARD</p>
      ) : null}

      {shouldShowRoute('Sandbox') ? (
              <p onClick={() => {
                localStorage.removeItem('sandbox-activity');
                handleRouteChange(routes.Sandbox);
              }}
                onKeyUp={(e) => {
                if (e.key === 'Enter'){
                  localStorage.removeItem('sandbox-activity');
                  handleRouteChange(routes.Sandbox);
                }
              }}
              tabIndex="0"
              >CREATE</p>
      ) : null}

      <p onClick={() => handleRouteChange(routes.Gallery)}
        onKeyUp={(e) => {if (e.key === 'Enter') handleRouteChange(routes.Gallery)}}
        tabIndex="0"
      >GALLERY</p>

      {shouldShowRoute('BugReport') ? (
        <p onClick={() => handleRouteChange(routes.BugReport)}
          onKeyUp={(e) => {if (e.key === 'Enter') handleRouteChange(routes.BugReport)}}
          tabIndex="0"
        >REPORT A BUG</p>
      ) : null}

      {shouldShowRoute('SignOut') ? (
        <p onClick={() => handleLogout()} 
          onKeyUp={(e) => {if (e.key === 'Enter') handleLogout()}}
          tabIndex="0">SIGN OUT</p>
      ) : null}
      <p className="icon" onClick={() => toggleNavbar()} 
      onKeyUp={(e) => {if (e.key === "Enter") toggleNavbar()}}
      tabIndex="0" >
      <BarsOutlined />
      </p>
    </div>

    </div>
  );
}

NavBar.propTypes = {
  isDarkMode: PropTypes.bool.isRequired
};

export default NavBar;