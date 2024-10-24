import React, { useState, useEffect} from 'react';
import { Navigate, Outlet, useNavigate, useLocation} from "react-router-dom";

import { Route  } from 'react-router-dom';

const Protectedroute = (props:any) => {
  const [ user ,setUser] :any= useState([])
  const navigate = useNavigate();

  function presentPage() {
    navigate(-1);
  }

  useEffect(()=>{
    debugger
    const loginData :any= localStorage.getItem('loginData')
    const temp = JSON.parse(loginData)
    setUser(temp.roles)
  },[]);

  if (user && user.includes('user')) {
    debugger
    return <Outlet {...props} />;
  }
 else if(user && !(user.includes("user"))){
  debugger
    return <Outlet {...props} />;
  }
  else{
    return <Outlet {...props} />;
  }
  // else{
  //   debugger
  //   return <><Outlet {...props} />;</>
  // }
};


export default Protectedroute;