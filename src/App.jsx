import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './components/pages/HomePage';
import ExamineePage from './components/pages/ExamineePage';
import ExaminerPage from './components/pages/ExaminerPage';
import LoginPageAdmin from './components/pages/LoginPageAdmin';
import UserPage from './components/pages/UserPage';

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/examinee" element={<ExamineePage/>}/>
          <Route path="/examiner" element={<ExaminerPage/>}/>
          <Route path="/teacherlogin" element={<LoginPageAdmin/>}/>
          <Route path="/studentlogin" element={<UserPage/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
