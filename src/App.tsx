import React, { useState ,createContext,useEffect} from 'react';
import { BrowserRouter as Router, Routes, Link, Route } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';

import Protectedroute from './components/protectedroute/protectedroute';
import  { Roles,  Attendance, AddUpdateAttendance,Student,Login,Register,Dashboard,Teacher ,AddUpdateTeacher,Layout,Classroom ,Subject,Timetable ,TeacherTimetable} from './components/index';

function App() {
  
  const [token, setToken] = useState(null);
  const initialValue= ['isAdd,isDelete,isUpdate']
  const [permission]:any = useState(initialValue)
  

  return (
    <Router>
      <Routes>
        <Route  path="/" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/teacher" element={<Teacher />} />        
        <Route path="/classroom" element={<Classroom />} />     
        <Route element={<Protectedroute/>}>
            <Route  path="/subject" element={<Subject />} />
        </Route>
        <Route path="/timetable" element={<Timetable />} />      
        <Route path="/teachertimetable" element={<TeacherTimetable />} />  
        <Route path="/teacher/:id?" element={<AddUpdateTeacher/>} />
        <Route path="/attendance" element={<Attendance/>} /> 
        <Route path="/attendance/:id?" element={<AddUpdateAttendance/>} />  
        <Route path="/layout" element={<Layout />} />
        <Route path="/student" element={<Student />} />
        <Route path="/roles" element={<Roles />} />
        {/* <Route path="/errorboundry" element={<ErrorBoundary />} /> */}
      </Routes>
    </Router>
  );
}

export default App;

