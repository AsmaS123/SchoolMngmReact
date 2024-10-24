

import React, { useState } from 'react';
import { Route  } from 'react-router-dom';
// import { useAuth } from './AuthContext';

const Protectedroute = ({ component: Component, roles, ...rest }:any) => {
  const { user } :any= useState({role:['admin']})

  return (
    <Route {...rest} render={(props:any) => {
      if (!user) {
        // return <Redirect to='/login' />;
        return <Component {...props} />;
      }

      if (roles && !roles.includes(user.role)) {
        // return <Redirect to='/' />;
        return <Component {...props} />;
      }

      return <Component {...props} />;
    }} />
  );
};

export default Protectedroute;