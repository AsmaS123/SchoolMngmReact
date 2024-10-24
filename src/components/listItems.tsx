import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import { useDispatch} from 'react-redux';
// export const dispatch = useDispatch();

export const mainListItems = (
  <React.Fragment>
    <ListItemButton>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      {/* <ListItemText primary="Dashboard" /> */}
      <Link to="/dashboard">Dashboard</Link>
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      {/* <ListItemText primary="Teacher" /> */}
      <Link to="/teacher">Teacher</Link>
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <Link to="/subject">Subject</Link>
      {/* <ListItemText primary="Subject" /> */}
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <Link to="/classroom">Classroom</Link>
      {/* <ListItemText primary="Reports" /> */}
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <Link to="/timetable">Timetable</Link>
      {/* <ListItemText primary="Integrations" /> */}
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <Link to="/student">Student</Link>
      {/* <ListItemText primary="Integrations" /> */}
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <Link to="/attendance">Attendance</Link>
      {/* <ListItemText primary="Integrations" /> */}
    </ListItemButton>

  </React.Fragment>
);


  const secondaryListItem = () => {  
    // const [ user ,setUser] :any= React.useState([])
    // const [admin, setAdmin] = 
    const handleLogout = ()=>{
      debugger
      localStorage.removeItem('loginData');
      window.location.href = '/';
    }

    const loginData :any= localStorage.getItem('loginData')
    const temp = JSON.parse(loginData)

    // React.useEffect(()=>{
    //   debugger
    //   const loginData :any= localStorage.getItem('loginData')
    //   const temp = JSON.parse(loginData)
    //   setUser(temp.roles)
    // },[]);


  return(<>
    <ListSubheader component="div" inset>
      Saved reports
    </ListSubheader>
    { temp.roles && temp.roles.includes('admin') &&
      <ListItemButton >
      <ListItemIcon >
        <AssignmentIcon />
      </ListItemIcon>
      <a  onClick={()=>{ window.location.href = '/roles'}}>Roles</a>
      </ListItemButton>
    }
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon >
        <AssignmentIcon />
      </ListItemIcon>
      <a  onClick={handleLogout}>Logout</a>
    </ListItemButton>
  </>
)};


export const secondaryListItems = (<React.Fragment>{secondaryListItem()}</React.Fragment>)