import { message } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../../components/NavBar/NavBar';
import { getStudentClassroom } from '../../Utils/requests';
import PropTypes from 'prop-types';

import './Student.less';

function Student(props) {
  const [learningStandard, setLessonModule] = useState({});
  const navigate = useNavigate();

  document.addEventListener("DOMContentLoaded", function() {
    const elementToFocus = document.getElementById('activity-container');

    if(elementToFocus){
      elementToFocus.focus();
    }
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getStudentClassroom();
        if (res.data) {
          if (res.data.lesson_module) {
            setLessonModule(res.data.lesson_module);
          }
        } else {
          message.error(res.err);
        }
      } catch {}
    };
    fetchData();
  }, []);

  const handleSelection = (activity) => {
    activity.lesson_module_name = learningStandard.name;
    localStorage.setItem('my-activity', JSON.stringify(activity));

    navigate('/workspace');
  };

  return (
    <div className={props.isDarkMode ? 'container-dark nav-padding' : 'container nav-padding'}>
    <NavBar isDarkMode ={props.isDarkMode}/>
      <div id='activity-container' tabIndex="0" >
        <div id='header' tabindex="-1">
          <div tabindex="-1">Select your Activity</div>
        </div>
        <ul>
          {learningStandard.activities ? (
            learningStandard.activities
              .sort((activity1, activity2) => activity1.number - activity2.number)
              .map((activity) => (
                <div
                  key={activity.id}
                  id='list-item-wrapper'
                  onClick={() => handleSelection(activity)}
                  tabIndex="0"
                >
                  <li>{`${learningStandard.name}: Activity ${activity.number}`}</li>
                </div>
              ))
          ) : (
            <div>
              <p>There is currently no active learning standard set.</p>
              <p>
                When your classroom manager selects one, it will appear here.
              </p>
            </div>
          )}
        </ul>
      </div>
    </div>
  );
}

Student.propTypes = {
  isDarkMode: PropTypes.bool.isRequired
}

export default Student;
