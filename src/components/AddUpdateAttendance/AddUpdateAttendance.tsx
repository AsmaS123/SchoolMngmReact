import { useState, useEffect } from 'react';
import {SelectChangeEvent ,Select,TablePagination,TableRow,TableHead,TableContainer,TableCell,TableBody,Table,Container,Toolbar,Paper,TextField, Box, Button ,Input,FormHelperText,Grid,FormControl,InputLabel,MenuItem,Checkbox,FormControlLabel} from "@mui/material";
import {styled, createTheme, ThemeProvider } from '@mui/material/styles';
import apiurl from '../../config/url'
import axios from 'axios';
import Layout from '../Layout/Layout';
import { useSearchParams } from 'react-router-dom';
import { ITeacher } from '../../const/interface';
import { Formik, Field, Form, ErrorMessage, useFormik } from 'formik';
import * as Yup from 'yup';
import axiosInstance from '../../const/httpinterceptor';
import { ToastContainer, toast } from "react-toastify";
import { useParams, useLocation } from 'react-router-dom';
import { Navigate ,useNavigate} from "react-router-dom";
import { useSelector} from 'react-redux';

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

const AddUpdateAttendance = ()=>{
    const [error, setError] = useState(null);
    const [loading, setLoading] =  useState(false);
    const [data, setData] = useState<any>([]);
    const [useridlist,setUserIDList] = useState<any>([]);
    const [flag,setFlag] = useState(false)
    const { id } = useParams(); // Get the route parameter (id)
    
    const TeacherSchema = Yup.object().shape({
      _id: Yup.string(),
      user_id: Yup.string()
        .required('Required'),
      date: Yup.string()
      .required('Required'),
      status: Yup.string()
        .required('Required')
    });

    const formik = useFormik({
      initialValues: {
        _id:'',
        user_id:'',
        date:'',
        status:''
      },
      validationSchema: TeacherSchema,
      onSubmit: async (values) => {
        debugger;

        if(values.hasOwnProperty('_id') && values._id ){
          const url = apiurl+'attendance'
          try {
            // debugger
            const response = await axiosInstance.put(url,values)
            alert('Form updated successfully');
            // formik.resetForm();
            // formik.setFieldValue('date','')
            // formik.setFieldValue('status','')
            setFlag(false);
          } catch (error:any) {
            // debugger
            setError(error.message);
            toast.error(error.message, {
              position: 'top-right',
            })
          }
        }
        else{
          const url = apiurl+'attendance'
          try {
            // debugger
            const response = await axiosInstance.post(url,values)
            alert('Form submitted successfully');
            formik.resetForm()
          } catch (error:any) {
            // debugger
            setError(error.message);
            toast.error(error.message, {
              position: 'top-right',
            })
          }
        }
      },
    });

    const removeDuplicate = (tempdata:any)=>{
      debugger
      const useridlist = tempdata.map(({ user_id }:any) => user_id);
      console.log(useridlist,'useridlist')
      // const result = useridlist.reduce((prev:any,curr:any)=>{
      //     if(!data.includes(prev)){
      //       prev.push(curr)
      //     }
      //     return prev
      // },[]);

      const filtered = tempdata.filter((elm:any, index:any) => 
        {
          if(!(useridlist.includes(elm.user_id))){
            return tempdata[index+1];
          }
        });

      return filtered;
    }
    const fetchUserID = async() =>{
      // debugger
      try{
        const url = apiurl+'attendance/userIdList'
        const userList = await axiosInstance.get(url);
        // const temp = removeDuplicate(userList.data.userIdList);
        // console.log(temp,'temp')
        // debugger
        setUserIDList(userList.data.userIdList);
      }
       catch(err:any){
          console.log(err)
        }
      
    } 

    const getAttendance = async()=>{
        const url = apiurl+'attendance/'+id; 
        try{
          debugger
          const response :any = await axiosInstance.get(url);
          // alert(JSON.stringify(response));
          formik.setValues(response.data.attendance);
        }
        catch(error:any) {
          setError(error.message);
          toast.error(error.message, {
            position: 'top-right',
          })
        }
      // const result = await 
    }

    // const editData = useSelector((state:any) =>  { debugger;return state.attendanceReducer});

    useEffect(()=>{  
      debugger;
      // alert(id+'id')
      fetchUserID()
      console.log(formik.initialValues,'formik.initialValues')
      if(id !='null'){
        formik.setFieldValue('_id',id);
        getAttendance();
        // if(id == editData.user_id){
        //   formik.setValues(editData);
        // }
        // console.log(editData,'editData')
      }
      // if(props.data){
      //   formik.setValues(props.data);
      //   formik.setFieldValue('_id',props.data._id)
      //   setFlag(props.flag);
      // }
      
    },[id])
  
    return(<>
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
                          <Paper sx={{ p: 2 }}>
                          <form onSubmit={formik.handleSubmit}>
                          <h2>Attendance</h2>
                          <Grid>  
                            <InputLabel id="demo-simple-select-readonly-label">User ID</InputLabel>
                            <Select
                              labelId="demo-simple-select-readonly-label"
                              required
                              fullWidth
                              id="user_id"
                              label="user_id"
                              // name="gender"
                              // autoComplete="gender"
                              // autoFocus
                              // value={form.gender} onChange={ (e :any)=>{ setField('gender', e.target.value)}}
                              value={formik.values.user_id}
                              onChange={(e :any)=>{ formik.setFieldValue('user_id', e.target.value)}}
                              onBlur={formik.handleBlur}
                              error={formik.touched.user_id && Boolean(formik.errors.user_id)}
                              disabled={id == 'null' ? false : true}
                              // helperText={formik.touched.gender && formik.errors.gender}
                            >
                              <MenuItem >Select User Id</MenuItem>
                              {
                                useridlist && (useridlist.length>0) &&  useridlist.map((elm:any)=><MenuItem value={elm.user_id}>{elm.user_id}</MenuItem>)
                              }
                            </Select>
                            {formik.touched.status && formik.errors.status && <>formik.errors.status</>}
                          </Grid>
                          <Grid item  sx={{display:'flex', flexDirection: 'row'}}>

                          {/* <TextField
                          margin="normal"
                          required
                          fullWidth
                          name="user_id"
                          autoComplete="user_id"
                          // label="user_id"
                          type="user_id"
                          id="user_id"
                          // value={form.name} onChange={ (e )=>{ setField('name', e.target.value)}}
                          value={formik.values.user_id}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          error={formik.touched.user_id && Boolean(formik.errors.user_id)}
                          helperText={formik.touched.user_id && formik.errors.user_id}
                          disabled
                        />
                        */}
                        
                          <TextField 
                          type="date" 
                          margin="normal"
                          required
                          fullWidth
                          id="date"
                          label="date"
                          name="date"
                          autoComplete="date"
                          autoFocus
                          value={formik.values.date && (formik.values.date).slice(0,10)}
                          // value='1990-05-29'
                          onChange={(e :any)=>{ formik.setFieldValue('date', e.target.value)}}
                          onBlur={formik.handleBlur}
                          error={formik.touched.date && Boolean(formik.errors.date)}
                          helperText={formik.touched.date && formik.errors.date}
                        // onChange={ (e )=>{ formik.setFieldValue('dob', e.target.value)}}
                        />
                        </Grid>
                        <Grid>
                        {/* <FormControl sx={{ m: 1, minWidth: 235 , }}> */}
                        <InputLabel id="demo-simple-select-readonly-label">Status</InputLabel>
                        <Select
                          labelId="demo-simple-select-readonly-label"
                          required
                          fullWidth
                          id="status"
                          label="status"
                          // name="gender"
                          // autoComplete="gender"
                          // autoFocus
                          // value={form.gender} onChange={ (e :any)=>{ setField('gender', e.target.value)}}
                          value={formik.values.status}
                          onChange={(e :any)=>{ formik.setFieldValue('status', e.target.value)}}
                          onBlur={formik.handleBlur}
                          error={formik.touched.status && Boolean(formik.errors.status)}
                          // helperText={formik.touched.gender && formik.errors.gender}
                        >
                          <MenuItem >Select Status</MenuItem>
                          <MenuItem value='true'>Present</MenuItem>
                          <MenuItem value='false'>Absent</MenuItem>
                        </Select>
                        {formik.touched.status && formik.errors.status && <>formik.errors.status</>}
                        {/* </FormControl> */}
                        </Grid>
                        <Button
                          type="submit"
                          fullWidth
                          variant="contained"
                          sx={{ mt: 3, mb: 2, width:'100px' }}
                          // onClick={}
                          disabled={ formik.dirty ? false : true}                        >
                          {id !='null'  ?'Update' : 'Create'}
                          {/* Submit */}
                          </Button>
                          <Button
                          fullWidth
                          variant="contained"
                          onClick={()=>{formik.resetForm(); setFlag(false)}}
                          sx={{ mt: 3, mb: 2, width:'100px' }}
                        >
                          Reset
                          </Button>
                          </form>
                          </Paper>
                      </Grid>
                      
                  </Grid>
              </Container>
              </Box>
            </Box>
          </ThemeProvider>
      </>)
}

export default AddUpdateAttendance;


