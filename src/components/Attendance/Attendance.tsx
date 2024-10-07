import React, { FC } from 'react';
import styles from './Attendance.module.css';
import { useState, useEffect } from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { CheckBox } from '@mui/icons-material';
import Paper from '@mui/material/Paper';
import Table from "@mui/material/Table"; 
import TableBody from "@mui/material/TableBody"; 
import TableCell from "@mui/material/TableCell"; 
import TableContainer from "@mui/material/TableContainer"; 
import TableHead from "@mui/material/TableHead"; 
import TableRow from "@mui/material/TableRow"; 
import TablePagination from "@mui/material/TablePagination"; 
import apiurl from '../../config/url'
import axios from 'axios';
import Layout from '../Layout/Layout';
import Button from '@mui/material/Button';
import { green } from '@mui/material/colors';
import { useNavigate } from "react-router-dom";
import { useSelector,useDispatch} from 'react-redux';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
// import AddUpdateTeacher from './AddUpdateTeacher';
import axiosInstance from '../../const/httpinterceptor';
import { ToastContainer, toast } from "react-toastify";
import AddUpdateAttendance from '../AddUpdateAttendance/AddUpdateAttendance';

import '../../../node_modules/react-toastify/dist/ReactToastify.css';

const defaultTheme = createTheme();

// interface AttendanceProps {}

const Attendance = () => {
  const navigate = useNavigate();
  // debugger
  // const[ token, setToken] = useState('');
  // const [permission,setPermission] = useState([])
  const [loading, setLoading] =  useState(false);
  const [data, setData] = useState<any>([]);
  const [pg, setpg] = useState(0); 
  const [rpg, setrpg] = useState(5); 
  const [visible, setVisible] = useState(false)
  const [item,setItem] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);
  const [flag,setFlag] = useState(false)
  const dispatch = useDispatch();


    // const [data, setData] = React.useState<any>([])
  // const [loading, setLoading] = React.useState(false);
  
  function handleChangePage(event: any, newpage: React.SetStateAction<number>) { 
      setpg(newpage); 
  } 

  function handleChangeRowsPerPage(event: { target: { value: string; }; }) { 
      setrpg(parseInt(event.target.value, 10)); 
      setpg(0); 
  } 
  
  const handleSearchChange = (event:any) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const filteredItems = data.filter((item:any) =>{
    return  Object.values(item).some((value) =>
      (value as any).toString().toLowerCase().includes(searchTerm)
    )
  //  return item.name.toLowerCase().includes(searchTerm)
  }
  );

  const handleEdit = (val?:any)=>{
    debugger
      setVisible(true)
      if(val){
        dispatch({type: 'attendance',payload:val});
        navigate("/attendance/"+val._id)
          setItem(val)
          setFlag(true)
      }
      // console.log("Add or update here")
  }

    async function fetchData() {
      try {
        // debugger
        const response = await axiosInstance.get('attendance');
        setData(response.data.attendance.reverse());
        // toast("This is a toast notification !");
        // toast.success("Success Notification !", {
        //   position: 'top-right',
        // })
      } catch (error:any) {
        // debugger
        setError(error.message);
        toast.error(error.message, {
          position: 'top-right',
        })
      }
    }

const addAttendance = (event:any)=>{
  navigate("/attendance/null");
  dispatch({type: 'attendance',payload:{}});
  // debugger
  // toast("This is a toast notification !");
  // toast.success("Success Notification !", {
  //   position: 'top-right',
  // })
}

const handleDelete = async(_id:any) =>{
    alert(_id);
    try {
      // debugger
      const response = await axiosInstance.delete('attendance/'+_id);
      alert('deleted successfuly');
      fetchData();
      // setData(response.data.attendance.reverse());
      // toast("This is a toast notification !");
      // toast.success("Success Notification !", {
      //   position: 'top-right',
      // })
    } catch (error:any) {
      // debugger
      setError(error.message);
      toast.error(error.message, {
        position: 'top-right',
      })
    }
}
  useEffect(()=>{
      // debugger;
      fetchData();
  },[])

  // if (error) return <div>Error: {error}</div>;
  if (!data) return <div>Loading...</div>;
  

  return (
 <>
  <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: 'flex' }}>
        <Layout />
        
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />

         <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
         <ToastContainer
            position='top-right'
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme='light'
          />
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <h2>Attendance</h2>
                  <>
                <TableContainer component={Paper}> 
                <TextField
                  margin="normal"
                  required
                  
                  id="search"
                  label="Search"
                  name="search"
                  autoComplete="email"
                  autoFocus
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
                <Button 
                    variant="contained"
                    sx={{ mt: 1, mb: 1, width:2 ,float:'right', }}
                    onClick={addAttendance}
                  >
                    Add Attendance
                  </Button>
                
                 {/* <Button 
                    variant="contained"
                    sx={{ mt: 1, mb: 1, width:2 ,float:'right',marginRight:'10px'}}
                    onClick={()=> navigate("/attendance/3423")}
                  >
                    Attendance Add/Update
                  </Button> */}
                  {/* <input type='searh' /> */}
                <Table sx={{ minWidth: 650 }}  
                    aria-label="simple table"> 
                    <TableHead> 
                        <TableRow> 
                            <TableCell>S.No</TableCell> 
                            <TableCell align="right">User ID 
                            </TableCell> 
                            <TableCell align="right">Date 
                            </TableCell> 
                            <TableCell align="right">Status 
                            </TableCell> 
                        </TableRow> 
                    </TableHead> 
                    <TableBody> 
                        {filteredItems && filteredItems.slice(pg * rpg, pg * rpg + rpg).map((row:any,i:any) => {
                        // {data && data.map((row:any)=>{
                             return    (
                            <TableRow 
                                key={row.user_id} 
                                sx={{ "&:last-child td, &:last-child th": { border: 0 } }} 
                            >
                                <TableCell component="th" scope="row"> 
                                    {i+(rpg*pg)+1} 
                                </TableCell>  
                                <TableCell component="th" scope="row"> 
                                    {row.user_id} 
                                </TableCell> 
                                <TableCell align="right">{row.date} 
                                </TableCell> 
                                <TableCell align="right">{row.status ? 'Present' : 'Absent'} 
                                {/* <input type='checkbox' checked={row.status} /> */}
                                </TableCell> 
                                <TableCell align="right"><button onClick={()=>handleEdit(row)}>Edit</button><button onClick={()=>handleDelete(row._id)}>Delete</button>
                                </TableCell> 
                            </TableRow> 
                             )
                        })} 
                    </TableBody> 
                </Table> 
            </TableContainer> 
            <TablePagination 
                rowsPerPageOptions={[5, 10, 25]} 
                component="div"
                count={filteredItems.length} 
                rowsPerPage={rpg} 
                page={pg} 
                onPageChange={handleChangePage} 
                onRowsPerPageChange={handleChangeRowsPerPage} 
            /> 
            </>
                        {/* <AddUpdateAttendance data={item} flag={flag}/> */}
             </Paper>
              </Grid>
                        
            </Grid>
          </Container> 
          {/* <AddUpdateTeacher data={item}/>       */}
        </Box>
      </Box>
    </ThemeProvider>
    </>
)};

export default Attendance;
