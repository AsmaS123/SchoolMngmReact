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


const AddUpdateTeacher = (props:any)=>{
    const [error, setError] = useState(null);
    const [loading, setLoading] =  useState(false);
    const [data, setData] = useState<any>([]);

    
    // const initialVal :ITeacher= {
    //   email:'',
    //   // password:'',
    //   name:'',
    //   dob:'',
    //   gender:'',
    //   address:'',
    //   phone:'',
    //   date_of_join:''

    // }
    // const [ form, setForm ] = useState(initialVal);
    // const setField = (field: string, value: string) => {
    //   setForm({
    //     ...form,
    //     [field]: value
    //   })
    // }

    const TeacherSchema = Yup.object().shape({
      name: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
      phone: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
      address: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
      email: Yup.string().email('Invalid email').required('Required'),
      gender: Yup.string().required('Required'),
      dob: Yup.string().required('Required'),
      date_of_join: Yup.string().required('Required'),
    });

    const formik = useFormik({
      initialValues: {
        email:'',
        // password:'',
        name:'',
        dob:'',
        gender:'',
        address:'',
        phone:'',
        date_of_join:''
      },
      validationSchema: TeacherSchema,
      onSubmit: async (values) => {
        debugger
        if(values.hasOwnProperty('_id')){
          const url = apiurl+'teachers/update'
          try {
            debugger
            const response = await axiosInstance.put(url,values)
            alert('Form updated successfully');
            formik.resetForm()
          } catch (error:any) {
            debugger
            setError(error.message);
            toast.error(error.message, {
              position: 'top-right',
            })
          }
        }
        else{
          const url = apiurl+'teachers/creat'
          try {
            debugger
            const response = await axiosInstance.post(url,values)
            alert('Form submitted successfully');
            formik.resetForm()
          } catch (error:any) {
            debugger
            setError(error.message);
            toast.error(error.message, {
              position: 'top-right',
            })
          }
        }
      },
    });

    useEffect(()=>{  
      debugger;
      console.log(formik.initialValues,'formik.initialValues')
      if(props.data){
        formik.setValues(props.data);
      }
    },[props])
  
    return(<>
         <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper sx={{ p: 2 }}>
                    <form onSubmit={formik.handleSubmit}>
                    <h2>Teacher</h2>
                    <Grid item  sx={{display:'flex', flexDirection: 'row'}}>
                    <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="name"
                    label="name"
                    type="name"
                    id="name"
                    autoComplete="name"
                    // value={form.name} onChange={ (e )=>{ setField('name', e.target.value)}}
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
          
                  />
                    <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                    // value={form.email} onChange={ (e )=>{ setField('email', e.target.value)}}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="phone"
                    label="Phone"
                    name="phone"
                    autoComplete="phone"
                    autoFocus
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.phone && Boolean(formik.errors.phone)}
                    helperText={formik.touched.phone && formik.errors.phone}
                    // value={form.phone} onChange={ (e )=>{ setField('phone', e.target.value)}}
                  />
                  </Grid>
                  <Grid item  sx={{display:'flex', flexDirection: 'row'}}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="address"
                    label="address"
                    name="address"
                    autoComplete="address"
                    autoFocus
                    value={formik.values.address}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.address && Boolean(formik.errors.address)}
                    helperText={formik.touched.address && formik.errors.address}
                    // value={form.address} onChange={ (e )=>{ setField('address', e.target.value)}}
                  />
                    <TextField 
                    type="date" 
                     margin="normal"
                    required
                    fullWidth
                    id="dob"
                    label="dob"
                    name="dob"
                    autoComplete="dob"
                    autoFocus
                    value={formik.values.dob && (formik.values.dob).slice(0,10)}
                    // value='1990-05-29'
                    onChange={(e :any)=>{ formik.setFieldValue('dob', e.target.value)}}
                    onBlur={formik.handleBlur}
                    error={formik.touched.dob && Boolean(formik.errors.dob)}
                    helperText={formik.touched.dob && formik.errors.dob}
                  // onChange={ (e )=>{ formik.setFieldValue('dob', e.target.value)}}
                  />
                  <TextField  
                    type="date" 
                     margin="normal"
                    required
                    fullWidth
                    id="date_of_join"
                    label="date_of_join"
                    name="date_of_join"
                    autoComplete="date_of_join"
                    autoFocus
                    value={formik.values.date_of_join && (formik.values.date_of_join).slice(0,10)}
                    onChange={ (e )=>{ formik.setFieldValue('date_of_join', e.target.value)}}
                    onBlur={formik.handleBlur}
                    error={formik.touched.date_of_join && Boolean(formik.errors.date_of_join)}
                    helperText={formik.touched.date_of_join && formik.errors.date_of_join}
                    // helperText={formik.touched.date_of_join && formik.errors.date_of_join}
                    />
              
                  </Grid>
                  <Grid>
                  {/* <FormControl sx={{ m: 1, minWidth: 235 , }}> */}
                   <InputLabel id="demo-simple-select-readonly-label">Gender</InputLabel>
                  <Select
                    labelId="demo-simple-select-readonly-label"
                    required
                    fullWidth
                    id="gender"
                    label="gender"
                    // name="gender"
                    // autoComplete="gender"
                    // autoFocus
                    // value={form.gender} onChange={ (e :any)=>{ setField('gender', e.target.value)}}
                    value={formik.values.gender}
                    onChange={(e :any)=>{ formik.setFieldValue('gender', e.target.value)}}
                    onBlur={formik.handleBlur}
                    error={formik.touched.gender && Boolean(formik.errors.gender)}
                    // helperText={formik.touched.gender && formik.errors.gender}
                  >
                    <MenuItem >Select Gender</MenuItem>
                    <MenuItem value={'male'}>Male</MenuItem>
                    <MenuItem value={'female'}>Female</MenuItem>
                  </Select>
                  {formik.touched.gender && formik.errors.gender && <>formik.errors.gender</>}
                  {/* </FormControl> */}
                  </Grid>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2, width:'100px' }}
                  >
                    Submit
                    </Button>
                    <Button
                    fullWidth
                    variant="contained"
                    onClick={()=>formik.resetForm()}
                    sx={{ mt: 3, mb: 2, width:'100px' }}
                  >
                    Reset
                    </Button>
                    </form>
                    </Paper>
                </Grid>
                 
            </Grid>
        </Container>
    </>)
}

export default AddUpdateTeacher;





// import FormControl from '@mui/material/FormControl';
// import FormGroup from '@mui/material/FormGroup';

// const defaultTheme = createTheme();

// interface ITeacher{
//   email:String,
//   password:String,
//   name:String,
//   dob:Date,
//   gender:String,
//   address:String,
//   phone:String,
//   date_of_join:Date
// }


    // const [searchParams] = useSearchParams();
    // const teacherId = searchParams.get("id");
    // console.log(teacherId,'teacherId');


    
    // const handleSubmit = (e:any) => {
    //   debugger
    //   e.preventDefault();
    //   console.log(form,'form')
    //   // const validationErrors = validateForm(form);
    //   //   if (Object.keys(validationErrors).length === 0) {
    //   //     console.log('Form submitted successfully');
    //   //     if(form.id){
    //   //       axios.put('api/teacher',form).then((res)=>{
    //   //         props.sendToParent();
    //   //     }).catch((err)=>{
    //   //       console.log(err)
    //   //     } )
    //   //     }
    //   //     else{
            
    //   //       axios.post('api/teacher',form).then((res)=>{
    //   //         alert('Form submitted successfully');
    //   //         props.sendToParent();
    //   //     }).catch((err)=>{
    //   //       console.log(err)
    //   //     } )
    //   //     }
    //   //     // Add form submission logic here
    //   //   } else {
    //   //     setErrors(validationErrors);
    //   //   }
    // }

        // axios.post(url,values).then((res)=>{
        //   alert('Form submitted successfully');
        //   formik.resetForm()
        //   // props.sendToParent();
        //     }).catch((err)=>{
        //       console.log(err)
        //   } )
        // alert(JSON.stringify(values, null, 2));