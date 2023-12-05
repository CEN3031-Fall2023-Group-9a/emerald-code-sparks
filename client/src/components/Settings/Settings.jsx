import React, {useEffect, useState} from 'react';
import { SettingOutlined } from '@ant-design/icons';
import "./Settings.less"
import PropTypes from 'prop-types';


function Settings(props) {
  //google translate
  function googleTranslateElementInit() {
    new google.translate.TranslateElement(
        {pageLanguage: 'en'},
        'google_translate_element'
    );
}
  
  useEffect(() => {
    let addScript = document.createElement("script");
    addScript.setAttribute(
      "src",
      "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
    );
    document.body.appendChild(addScript);
    window.googleTranslateElementInit = googleTranslateElementInit;
  }, []);

    // change between light and dark mode
    const toggleMode = () => {
      props.setDarkMode(!props.isDarkMode);
    };

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className={props.isDarkMode ? "dark-mode" : ""}>
      <div className="dropdown">
        <button className='drop-btn-settings'>
            <SettingOutlined className='setting-icon' onClick={toggleDropdown}/>
        </button>
        <div className={dropdownOpen ? 'dropdown-content-settings show' : 'dropdown-content-settings'} >
            <button className={'toggle'} onClick={toggleMode}> Toggle {props.isDarkMode ? 'Light' : 'Dark'} Mode </button>
            <div id="google_translate_element"></div>
        </div>
    </div>
    </div>
  );
}

Settings.propTypes = {
  isDarkMode: PropTypes.bool.isRequired,
  setDarkMode: PropTypes.func.isRequired
};

export default Settings;
