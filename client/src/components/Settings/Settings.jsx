import React, {useEffect} from 'react';
import { SettingOutlined } from '@ant-design/icons';
import "./Settings.less"


export default function Settings() {
  //google translate
  const googleTranslateElementInit = () => {
    new window.google.translate.TranslateElement(
      {
        pageLanguage: "en",
        autoDisplay: false
      },
      "google_translate_element"
    );
  };
  
  useEffect(() => {
    var addScript = document.createElement("script");
    addScript.setAttribute(
      "src",
      "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
    );
    document.body.appendChild(addScript);
    window.googleTranslateElementInit = googleTranslateElementInit;
  }, []);

  return (
    <div className="dropdown">
        <button className='drop-btn'>
            <SettingOutlined />
        </button>
        <div className='dropdown-content-settings'>
            <div id="google_translate_element"></div>
        </div>
    </div>
  );
}

