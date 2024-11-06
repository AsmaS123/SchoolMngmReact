// import styles from './Subject.module.css';
import React, { FC, useEffect } from 'react';
import styles from './Dashboard.module.css';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { useContext,useState } from "react"
import { Navigate ,useNavigate} from "react-router-dom";
import { useSelector} from 'react-redux';
import Layout from '../Layout/Layout';
import Table from "@mui/material/Table"; 
import TableBody from "@mui/material/TableBody"; 
import TableCell from "@mui/material/TableCell"; 
import TableContainer from "@mui/material/TableContainer"; 
import TableHead from "@mui/material/TableHead"; 
import TableRow from "@mui/material/TableRow"; 
import TablePagination from "@mui/material/TablePagination"; 
import apiurl from '../../config/url'
import axios from 'axios';
import Button from '@mui/material/Button';
import { green } from '@mui/material/colors';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import axiosInstance from '../../const/httpinterceptor';
import { ToastContainer, toast } from "react-toastify";
import '../../../node_modules/react-toastify/dist/ReactToastify.css';
import UpdateRoles from './updateRoles';
import { isVisible } from '@testing-library/user-event/dist/utils';

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();
interface SubjectProps {}

const Roles = () => {
  const [loading, setLoading] =  useState(true)
  const navigate = useNavigate();
  const token = useSelector((state:any) => state.token)
  const permission = useSelector((state:any) => state.permission)
  const [data, setData] = useState<any>([]);
  const [pg, setpg] = useState(0); 
  const [rpg, setrpg] = useState(5); 
  const [visible, setVisible] = useState(false)
  const [item,setItem] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);

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

const handleChange = (val?:any)=>{
    setVisible(true)
    if(val){
      
        setItem(val)
    }
    console.log("Add or update here")
}


async function fetchData() {
  try {
    debugger
    const response = await axiosInstance.get('roles');
    setData(response.data.userList);
    // toast("This is a toast notification !");
    // toast.success("Success Notification !", {
    //   position: 'top-right',
    // })
  } catch (error:any) {
    debugger
    setError(error.message);
    toast.error(error.message, {
      position: 'top-right',
    })
  }
}

const setFlag = ()=>{
  setVisible(false)
}

useEffect(()=>{
  // debugger;
  fetchData();
},[])

  return (
    <>
    {/* { loading && !token && <Navigate to="/" replace />}
    { loading && token && */}
    
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: 'flex' }}>
       <Layout/>
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
          {!visible &&
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
                  <h2>Teacher</h2>
                 
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
                <Table sx={{ minWidth: 650 }}  
                    aria-label="simple table"> 
                    <TableHead> 
                        <TableRow> 
                            <TableCell>S.No</TableCell> 
                            <TableCell align="right">Name
                            </TableCell> 
                            <TableCell align="right">Email 
                            </TableCell> 
                            <TableCell align="right">Roles 
                            </TableCell> 
                        </TableRow> 
                    </TableHead> 
                    <TableBody> 
                        {filteredItems && filteredItems.slice(pg * rpg, pg * rpg + rpg).map((row:any,i:any) => {
                        // {data && data.map((row:any)=>{
                             return    (
                            <TableRow 
                                key={row.teacher_id} 
                                sx={{ "&:last-child td, &:last-child th": { border: 0 } }} 
                            >
                                <TableCell component="th" scope="row"> 
                                    {i+(rpg*pg)+1} 
                                </TableCell>  
                                <TableCell component="th" scope="row"> 
                                    {row.name} 
                                </TableCell> 
                                <TableCell align="right">{row.email} 
                                </TableCell> 
                                <TableCell align="right">{row.roles + ','}  
                                </TableCell> 
                                <TableCell align="right"><button onClick={()=>handleChange(row)}>Edit</button>
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
             </Paper>
            </Grid>
            </Grid>
          </Container> 
          }
          {visible &&   <UpdateRoles data={item} goBack={setFlag}/>    }
        </Box>
      </Box>
    </ThemeProvider>
    {/* } */}
    </>
  );
}


export default Roles;


