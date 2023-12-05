import React, { useState, useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import './App.less'
import PrivateRoute from './Utils/PrivateRoute';
import About from './views/About/About';
import HowItWorks from './views/HowItWorks/HowItWorks';
import FAQ from './views/FAQ/FAQ'
import OurTeam from './views/OurTeam/OurTeam';
import Gallery from './views/Gallery/Gallery';
import BlocklyPage from './views/BlocklyPage/BlocklyPage';
import BugReport from './views/BugReport/BugReport';
import ContentCreator from './views/ContentCreator/ContentCreator';
import Home from './views/Home/Home';
import Classroom from './views/Mentor/Classroom/Classroom';
import Dashboard from './views/Mentor/Dashboard/Dashboard';
import NotFound from './views/NotFound';
import Replay from './views/Replay/Replay';
import ActivityLevelReport from './views/Researcher/ActivityLevelReport';
import ActivityLevelReportView from './views/Researcher/ActivityLevelReportView';
import GroupReport from './views/Researcher/GroupReport';
import Report from './views/Researcher/Report';
import Student from './views/Student/Student';
import StudentLogin from './views/StudentLogin/StudentLogin';
import ForgetPassword from './views/TeacherLogin/ForgetPassword';
import ResetPassword from './views/TeacherLogin/ResetPassword';
import TeacherLogin from './views/TeacherLogin/TeacherLogin';
import Settings from './components/Settings/Settings';
import {setHistory, getHistory, clearAllHistroy, handleLogout} from './localStorageHelper';
import { getCurrUser } from './Utils/userState';
const LOCAL_STORAGE_TIMER = 1000 * 60 * 60 * 24;//24 hours for public canvas to be erased
const SESSION_TIMER = 1000 * 60 * 60;//1 hour for user to be inactive before logged out

const App = () => {
  const currentLocation = useLocation();
  const navigate = useNavigate();
  const [isInitial, setIsInitial] = useState(true);
  const currentUser = getCurrUser();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const handleSessionTimeout = () => {
    if(currentUser !== 'DefaultUser'){
      handleLogout(navigate);//use existing logout function
    }
    else{
      navigate('/');//for default users, restore to main page
    }
    
  }
  const resetTimers = () => {
    clearTimeout(window.inactiveTimer);
    clearTimeout(window.sessionTimer);//clear existing timers//will do nothing on first run

    window.inactiveTimer = setTimeout(clearAllHistroy, LOCAL_STORAGE_TIMER);
    window.sessionTimer = setTimeout(handleSessionTimeout, SESSION_TIMER);//create new timers
  };

  useEffect(() => {
    const events = ['mousemove', 'keydown', 'scroll'];
    events.forEach(event => 
      document.addEventListener(event, resetTimers));//if each event, reset timer

    resetTimers();

    return () => {
      events.forEach(event => 
        document.removeEventListener(event, resetTimers));
      clearTimeout(window.inactiveTimer);
      clearTimeout(window.sessionTimer);//if any event triggers, reset timer
    };
  }, []);

  
  useEffect(() => {
    const lastRoute = getHistory('lastVisited');
    if(isInitial && lastRoute && lastRoute !== currentLocation.pathname){
      navigate(lastRoute, {replace: true});//load the last path
    }
    setIsInitial(false);//run on first open!

  },[currentLocation.pathname]);
  useEffect(() => {//Note! Don't put this before effect 2 or state tracking fails
    if(!isInitial){
      if(currentLocation.pathname==='/sandbox'){window.location.reload();}
      setHistory('lastVisited', currentLocation.pathname);//store path
    }
  },[currentLocation.pathname]);//render if oath change

  useEffect(() => {
    // Check the device's system preferences
    const defaultMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDarkMode(defaultMode);

    // Listen for changes in mode preference
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (event) => {
        setIsDarkMode(event.matches);
    }

    mediaQuery.addEventListener("change", () => {
        handleChange(event);
    })

  }, []);


  if(isInitial){
    return <div>Directing to where you left off...</div>;
  }//loading spinner in case loading time too long


  
  return (
    <div>
      <Routes>
        
        <Route path='/' element={<Home isDarkMode={isDarkMode}/>} />
        <Route path='/about' element={<About isDarkMode={isDarkMode}/>} />
        <Route path='/how-it-works' element={<HowItWorks isDarkMode={isDarkMode}/>} />
        <Route path='/faq' element={<FAQ isDarkMode={isDarkMode}/>} />
        <Route path='our-team' element={<OurTeam isDarkMode={isDarkMode}/>} />
        <Route path='/gallery' element={<Gallery isDarkMode={isDarkMode}/>} />
        <Route path='/teacherlogin' element={<TeacherLogin isDarkMode={isDarkMode}/>} />
        <Route path='/forgot-password' element={<ForgetPassword />} />
        <Route path='/reset-password' element={<ResetPassword />} />
        <Route path='/login' element={<StudentLogin isDarkMode={isDarkMode}/>} />
        <Route path='/replay/:saveID' element={<Replay />} />
        <Route path='/sandbox' element={<BlocklyPage isSandbox={true} isDarkMode={isDarkMode}/>} />
        <Route
          path='/report'
          element={
            <PrivateRoute>
              <Report />
            </PrivateRoute>
          }
        />
        <Route
          path='/activityLevel'
          element={
            <PrivateRoute>
              <ActivityLevelReport />
            </PrivateRoute>
          }
        />
        <Route
          path='/activityLevel/:id'
          element={
            <PrivateRoute>
              <ActivityLevelReportView />
            </PrivateRoute>
          }
        />
        <Route
          path='/group-report'
          element={
            <PrivateRoute>
              <GroupReport />
            </PrivateRoute>
          }
        />
        <Route
          path='/dashboard'
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path='/student'
          element={
            <PrivateRoute>
              <Student />
            </PrivateRoute>
          }
        />
        <Route
          path='/classroom/:id'
          element={
            <PrivateRoute>
              <Classroom />
            </PrivateRoute>
          }
        />
        <Route
          path='/workspace'
          element={
            <PrivateRoute>
              <BlocklyPage isSandbox={false} isDarkMode={isDarkMode}/>
            </PrivateRoute>
          }
        />
        <Route
          path='/activity'
          element={
            <PrivateRoute>
              <BlocklyPage isSandbox={false} isDarkMode={isDarkMode} />
            </PrivateRoute>
          }
        />
        <Route
          path='/ccdashboard'
          element={
            <PrivateRoute>
              <ContentCreator />
            </PrivateRoute>
          }
        />
        <Route path='/bugreport' element={<BugReport />} />
        <Route path='*' element={<NotFound/>} />
      </Routes>

    <div className='settings'>
      <Settings isDarkMode={isDarkMode} setDarkMode={setIsDarkMode}/>
    </div>

    </div>
  );
};

export default App;
