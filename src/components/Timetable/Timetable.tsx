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
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
// import axios from 'axios';
import apiurl from '../../config/url';
import axiosInstance from '../../const/httpinterceptor';
import { ToastContainer, toast } from "react-toastify";
import { days, timeSlot,ClassRoomList } from '../../const/index';
import '../../../node_modules/react-toastify/dist/ReactToastify.css';

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();
interface IClassroom {  
  classroom_id: Number,
  teacher_id:Number,
  section:String,
  grade: Number,
  subjectName: String,
  day:String,
  dayname:String,
  time:String
  timetime:String
}



const Timetable = () => {
  const [loading, setLoading] =  useState(true)
  const navigate = useNavigate();
  const token = useSelector((state:any) => state.token)
  const permission = useSelector((state:any) => state.permission)
  const data = useSelector((state:any) => state.timetablereducer);

  const classroomform :IClassroom= {
    classroom_id:0,
    teacher_id:0,
    section:'',
    grade:0,
    subjectName:'',
    day:'',
    dayname:'',
    time:'',
    timetime:''
  } 

 
  const [form,setForm] = useState(classroomform);
  const [teacherList, setTeacherList] = useState([]);
  const [sectionList,setSectionList ] = useState([]);
  const [subjectList,setSubjectList ] = useState([]);
  const [dayLsit, setDayList] = useState(days)
  const [flag,setFlag] = useState(false)
  const [tSlot, setTSlot] = useState(timeSlot);
  const [error, setError] = useState(null);

  // const handleChange = (event:any) => {
  //   alert(event.target.value);
  //   setForm((prevState )=>({...prevState ,teacher_id:event.target.value }))
  //   // setAge(event.target.value);
  // };


  const fetchTeacherList = async()=>{
    const url = apiurl+'teachers/list';
    try{
      const result :any=  await axiosInstance.get(url);
      setTeacherList(result.data.teachers);
      setFlag(true)
     }
     catch(error:any){
       console.log(error)
       setError(error.message);
       toast.error(error.message, {
         position: 'top-right',
       })
     }
  }

  useEffect(()=>{
    debugger
    fetchTeacherList();
    if(data && Object.keys(data).length>0){
      setForm(data);
      if(data.grade){
        fetchSubject(data.grade);
      }
    }
  },[data]);

  const fetchSubject  = async(val:any)=>{ 
    // debugger
    setSubjectList([])
    const obj ={
      grade :val
    }
    const url = apiurl+'subject/list';
    try{
      const result :any=  await axiosInstance.post(url,obj);
      setSubjectList(result.data.subList);
     }
     catch(error:any){
       console.log(error)
       setError(error.message);
       toast.error(error.message, {
         position: 'top-right',
       })
     }
  }

  const handleSubmit = async(event:any) =>{
    event.preventDefault();
    debugger
    const val = form;
    console.log(JSON.stringify(val));
    const url = apiurl+'timetable';
    alert(JSON.stringify(form));
    form.dayname = form.day;
    form.timetime = form.time;
    try{
      debugger
      const result :any=  await axiosInstance.post(url,form);
      console.log(result,'result')
      
     }
     catch(error:any){
      debugger
       console.log(error)
       setError(error.message);
       toast.error(error.message, {
         position: 'top-right',
       })
     }
  }
  
  return (
    <>
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

         <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                <Box component="form" noValidate  sx={{ mt: 3 }}>
                  { flag && <>
                  <Grid container spacing={2}>
                    <Grid item xs={4}>
                      <FormControl sx={{ m: 1, width: 350 }}>
                          <InputLabel id="demo-simple-select-helper-label">Teacher</InputLabel>
                          <Select
                            labelId="demo-simple-select-helper-label"
                            id="demo-simple-select-helper"
                            value={form.teacher_id}
                            label="Teacher"
                            onChange={(e:any)=> {const val= parseInt(e.target.value); setForm((prevState )=>({...prevState ,teacher_id:val }))}}
                          >
                            {flag && teacherList && teacherList.map(((elm:any)=><MenuItem value={elm.teacher_id}>{elm.name}</MenuItem>)) }
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={4}>
                      <FormControl sx={{ m: 1, width: 350 }}>
                          <InputLabel id="demo-simple-select-helper-label">Grade </InputLabel>
                          <Select
                            labelId="demo-simple-select-helper-label"
                            id="demo-simple-select-helper"
                            value={form.grade}
                            label="Grade"
                            onChange={(e:any)=> {const val= parseInt(e.target.value);const foundObject:any = ClassRoomList.find(obj => obj.grade === val); setSectionList(foundObject.section) ; setForm((prevState )=>({...prevState ,grade:val,section:'',subjectName:'',day:'',time:'',classroom_id: foundObject.classroom_id})); fetchSubject(val)}}
                          >
                             {ClassRoomList.map(((elm:any)=><MenuItem value={elm.grade}>{elm.name}</MenuItem>)) }
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={4}>
                      <FormControl sx={{ m: 1, width: 350 }}>
                          <InputLabel id="demo-simple-select-helper-label">Section </InputLabel>
                          <Select
                            labelId="demo-simple-select-helper-label"
                            id="demo-simple-select-helper"
                            value={form.section}
                            label="Section"
                            onChange={(e:any)=> {setForm((prevState )=>({...prevState ,section:e.target.value ,day:'',time:''})); }}
                          >
                             {sectionList && sectionList.map(((elm:any)=><MenuItem value={elm}>{elm}</MenuItem>)) }
                          </Select>
                        </FormControl>
                      </Grid>
                  </Grid>
                  <Grid container spacing={2}>
                  <Grid item xs={4}>
                      <FormControl sx={{ m: 1, width: 350 }}>
                          <InputLabel id="demo-simple-select-helper-label">Subject </InputLabel>
                          <Select
                            labelId="demo-simple-select-helper-label"
                            id="demo-simple-select-helper"
                            value={form.subjectName}
                            label="Subject"
                            onChange={(e:any)=> {setForm((prevState )=>({...prevState ,subjectName:e.target.value,day:'',time:''})); }}
                          >
                             {subjectList && subjectList.map(((elm:any)=><MenuItem value={elm.name}>{elm.name}</MenuItem>)) }
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={4}>
                      <FormControl sx={{ m: 1, width: 350 }}>
                          <InputLabel id="demo-simple-select-helper-label">Day </InputLabel>
                          <Select
                            labelId="demo-simple-select-helper-label"
                            id="demo-simple-select-helper"
                            value={form.day}
                            label="Day"
                            onChange={(e:any)=> {setForm((prevState )=>({...prevState ,day:e.target.value,time:''})); }}
                          >
                             {dayLsit && dayLsit.map(((elm:any)=><MenuItem value={elm}>{elm}</MenuItem>)) }
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={4}>
                      <FormControl sx={{ m: 1, width: 350 }}>
                          <InputLabel id="demo-simple-select-helper-label">Time Slot </InputLabel>
                          <Select
                            labelId="demo-simple-select-helper-label"
                            id="demo-simple-select-helper"
                            value={form.time}
                            label="Day"
                            onChange={(e:any)=> {setForm((prevState )=>({...prevState ,time:e.target.value})); }}
                          >
                             {tSlot.map(((elm:any)=><MenuItem value={elm}>{elm}</MenuItem>)) }
                          </Select>
                        </FormControl>
                      </Grid>
                  </Grid>
                  {/* {form.teacher_id} */}
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={handleSubmit}
                  >
                    Submit
                  </Button>
                  </>
                  }
                </Box>
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


export default Timetable;
