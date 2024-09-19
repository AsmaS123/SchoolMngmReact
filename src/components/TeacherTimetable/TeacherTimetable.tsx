import { useState, useEffect } from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
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
import { useDispatch} from 'react-redux';
import axiosInstance from '../../const/httpinterceptor';
import { ToastContainer, toast } from "react-toastify";
import '../../../node_modules/react-toastify/dist/ReactToastify.css';

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function TeacherTimetable() {
  const navigate = useNavigate();
  const [loading, setLoading] =  useState(false);
  const [data, setData] = useState<any>([]);
  const [pg, setpg] = useState(0); 
  const [rpg, setrpg] = useState(5); 
  const [visible, setVisible] = useState(false)
  const [item,setItem] = useState({})
  const [timetablelist,setTimeTableList] = useState<any>([])
  const dispatch  = useDispatch();
  const [error, setError] = useState(null);

  function handleChangePage(event: any, newpage: React.SetStateAction<number>) { 
      setpg(newpage); 
  } 

  function handleChangeRowsPerPage(event: { target: { value: string; }; }) { 
      setrpg(parseInt(event.target.value, 10)); 
      setpg(0); 
  } 
  
  const handleChange = (val?:any)=>{
    debugger
      setVisible(true)
      if(val){
          setItem(val)
      }
      dispatch({type: 'viewtimetable',payload:val});
      navigate('/timetable')
      console.log("Add or update here")
  }

  const listFunc = (list:any)=>{
    // debugger
    const tempList :any= [];
    let obj :any= {};
    for(let i in list){
      obj.name = list[i].name;
      obj.email = list[i].email;
      obj.teacher_id = list[i].teacher_id;
      const classroom = list[i].classroom;
      if(classroom && classroom.length>0){
        for(let j in classroom){
          obj.grade = classroom[j].grade;
          obj.section = classroom[j].section;
          const timetable = classroom[j].timetable;
          if(timetable.length>0){
            for(let j in timetable){
              obj.day = timetable[j].day;
              obj.time = timetable[j].time;
              obj.subject = timetable[j].subject;
              obj.timetable_id = timetable[j].timetable_id;
              const temp = JSON.stringify(obj)
              tempList.push(JSON.parse(temp));
              obj.day  = '';
              obj.time = '';
              obj.subject = ''
              obj.timetable_id = ''
            }
          }
          else{
            obj.day  = '';
            obj.time = '';
            obj.subject = ''
            obj.timetable_id = ''
            const temp = JSON.stringify(obj)
            tempList.push(JSON.parse(temp));
            obj.grade = '';
            obj.section ='';
            // obj.day  = '';
            // obj.time = '';
            // obj.subject = ''
          }
        }
      }
      else{
        obj.grade = '';
        obj.section =''
        obj.day  = '';
        obj.time = '';
        obj.subject = ''
        const temp = JSON.stringify(obj)
        tempList.push(JSON.parse(temp));
        obj.name = '';
        obj.email = '';
        obj.teacher_id = '';

      }
    }
    console.log(tempList,'tempList')
    setData(tempList);
  }

  const fetchData = async()=>{
    debugger
    const url = apiurl+'teachers/timetableList';
    try{
     const result :any=  await axiosInstance.get(url);
     setData(result.data.result.reverse());
     listFunc(result.data.result)
    }
    catch(error:any){
      console.log(error)
      setError(error.message);
      toast.error(error.message, {
        position: 'top-right',
      })
    }
}

const handleDelete  = async(id:any)=>{
  alert(id)
  console.log(id);
  if(id){
    // const url ='api/timetableId/'+id
    const url = apiurl+'timetable/'+id;
    try{
      const result :any=  await axiosInstance.delete(url);
      toast.success('deleted successfully',{
        position: 'top-right',
      });
      fetchData();
     }
     catch(error:any){
       console.log(error)
       setError(error.message);
       toast.error(error.message, {
         position: 'top-right',
       })
     }
  }
  else{
    
  }
}
  useEffect(()=>{
      // debugger;
      fetchData();
  },[])
 
  return (
    <>
    {/* { loading && !token && <Navigate to="/" replace />} */}
    {/* { loading && token && */}

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
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <h2>Teacher timetable</h2>
                  <>
                <TableContainer component={Paper}> 
                <Table sx={{ minWidth: 650 }}  
                    aria-label="simple table"> 
                    <TableHead> 
                        <TableRow> 
                            {/* <TableCell>Geek</TableCell>  */}
                            <TableCell align="right">S.No
                            </TableCell> 
                            <TableCell align="right">Teacher ID 
                            </TableCell> 
                            <TableCell align="right">Email 
                            </TableCell> 
                            <TableCell align="right">Name 
                            </TableCell> 
                            <TableCell align="right">Grade 
                            </TableCell> 
                            <TableCell align="right">Section 
                            </TableCell>
                            <TableCell align="right">Day 
                            </TableCell>
                            <TableCell align="right">Time 
                            </TableCell>
                            <TableCell align="right">Subject 
                            </TableCell>
                            <TableCell align="right">Timetable ID 
                            </TableCell> 
                        </TableRow> 
                    </TableHead> 
                    <TableBody> 
                        {data && data.slice(pg * rpg, pg * rpg + rpg).map((row:any,i:any) => {
                        const classroom = row.classroom;
                             return    (
                              <TableRow 
                              key={row.teacher_id} 
                              sx={{ "&:last-child td, &:last-child th": { border: 0 } }} 
                          > 
                                 <TableCell component="th" scope="row"> 
                                  {i+(rpg*pg)+1} 
                              </TableCell> 
                              <TableCell component="th" scope="row"> 
                                  {row.teacher_id} 
                              </TableCell> 
                              <TableCell align="right">{row.email} 
                              </TableCell> 
                              <TableCell align="right">{row.name} 
                              </TableCell> 
                              <TableCell align="right">{row.grade} 
                              </TableCell> 
                              <TableCell align="right">{row.section} 
                              </TableCell> 
                              <TableCell align="right">{row.day} 
                              </TableCell> 
                              <TableCell align="right">{row.time} 
                              </TableCell> 
                              <TableCell align="right">{row.subject} 
                              </TableCell> 
                              <TableCell align="right">{row.timetable_id} 
                              </TableCell> 
                              <TableCell align="right"><button onClick={()=>handleChange(row)}>Edit</button>
                              <button onClick={()=>{handleDelete(row.timetable_id)}}>Delete</button>
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
                count={data.length} 
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

        </Box>
      </Box>
    </ThemeProvider>
    </>
  );
}




 // <TableRow 
                            //     key={row.teacher_id} 
                            //     sx={{ "&:last-child td, &:last-child th": { border: 0 } }} 
                            // > 
                            //        <TableCell component="th" scope="row"> 
                            //         {i+(rpg*pg)+1} 
                            //     </TableCell> 
                            //     <TableCell component="th" scope="row"> 
                            //         {row.teacher_id} 
                            //     </TableCell> 
                            //     <TableCell align="right">{row.email} 
                            //     </TableCell> 
                            //     <TableCell align="right">{row.name} 
                            //     </TableCell> 
                            //     {
                            //     (classroom.length>0) &&  classroom.map((rowclassroom:any,j:any) => {
                            //       debugger
                            //       const timetable = rowclassroom.timetable;
                            //       // alert(timetable.length)
                            //       return (<><TableCell align="right"> {rowclassroom.grade} 
                            //       </TableCell> 
                            //       <TableCell align="right"> {rowclassroom.section} 
                            //       </TableCell>
                            //       {
                            //         (timetable.length>0) && timetable.map((rowtimetable:any,k:any) => {
                            //           return ( <>
                            //             <TableCell align="right"> {rowtimetable.day}
                            //           </TableCell>
                            //           <TableCell align="right"> {rowtimetable.time}
                            //           </TableCell>
                            //           <TableCell align="right"> {rowtimetable.subject}
                            //           </TableCell>
                            //           </>)
                            //         })
                            //       }
                            //       {
                            //       (timetable.length==0) && <>
                            //       <TableCell align="right"> &nbsp; </TableCell>
                            //       <TableCell align="right"> &nbsp;  </TableCell>
                            //       <TableCell align="right"> &nbsp;  </TableCell></>
                            //       }
                            //       </>)
                            //       })
                            //     }
                            //     {
                            //       (classroom.length==0) && <>
                            //       <TableCell align="right">&nbsp; </TableCell>
                            //       <TableCell align="right">&nbsp;</TableCell>
                            //       </>
                            //     }
                            //     <TableCell align="right"><button onClick={()=>handleChange(row)}>Edit</button><button>Delete</button>
                            //     </TableCell> 
                            // </TableRow> 