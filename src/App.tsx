import React, { useState ,createContext,useEffect} from 'react';
import { BrowserRouter as Router, Routes, Link, Route } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';

import  { Attendance, AddUpdateAttendance,Student,Login,Register,Dashboard,Teacher ,AddUpdateTeacher,Layout,Classroom ,Subject,Timetable ,TeacherTimetable} from './components/index';
 
// import ErrorBoundary from './components/errorboundry';

// export const  AuthCreateContext = React.createContext(localStorage.getItem("token"));
function App() {
  
  const [token, setToken] = useState(null);
  const initialValue= ['isAdd,isDelete,isUpdate']
  const [permission]:any = useState(initialValue)
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   // debugger
  //   const loginData : any= localStorage.getItem("loginData");
  //   // const storedToken : any= localStorage.getItem("token");
  //   if(loginData){
  //     const data = JSON.parse(loginData);
  //     // dispatch({
  //     //   type: 'login',
  //     //   payload: loginData
  //     // });
  //   }
  // }, []);

  return (
      // {<AuthCreateContext.Provider value={JSON.stringify({token:token,permission:permission })}> }
    <Router>
      <Routes>
        <Route  path="/" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/teacher" element={<Teacher />} />        
        <Route path="/classroom" element={<Classroom />} />     
        <Route path="/subject" element={<Subject />} />        
        <Route path="/timetable" element={<Timetable />} />      
        <Route path="/teachertimetable" element={<TeacherTimetable />} />  
        <Route path="/teacher/:id?" element={<AddUpdateTeacher/>} />
        <Route path="/attendance" element={<Attendance/>} /> 
        <Route path="/attendance/:id?" element={<AddUpdateAttendance/>} />  
        <Route path="/layout" element={<Layout />} />
        <Route path="/student" element={<Student />} />
        {/* <Route path="/errorboundry" element={<ErrorBoundary />} /> */}
      </Routes>
    </Router>
  
    // {</AuthCreateContext.Provider> }
  );
}

export default App;

