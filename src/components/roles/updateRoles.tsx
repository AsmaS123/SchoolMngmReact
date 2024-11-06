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


const UpdateRoles = (props:any)=>{
    const [error, setError] = useState(null);
    const [loading, setLoading] =  useState(false);
    const [data, setData] = useState<any>([]);

    const TeacherSchema = Yup.object().shape({
      name: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
      email: Yup.string().email('Invalid email').required('Required'),
      roles: Yup.array()
    });

    const formik = useFormik({
      initialValues: {
        email:'',
        name:'',
        roles:[]
      },
      validationSchema: TeacherSchema,
      onSubmit: async (values) => {
        debugger
          const url = apiurl+'roles'
          try {
            debugger
            const response = await axiosInstance.put(url,values)
            alert('Form updated successfully');
            props.goBack()
          } catch (error:any) {
            debugger
            setError(error.message);
            toast.error(error.message, {
              position: 'top-right',
            })
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
  
    const handleChange = (event: any) => {
        const { target: { value }, } = event;
         formik.setFieldValue('roles', typeof value === 'string' ? value.split(',') : value,);
      };

      
    return(<>
         <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper sx={{ p: 2 }}>
                    <form onSubmit={formik.handleSubmit}>
                    <h2>Roles</h2>
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
                    disabled
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
                    disabled
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                    // value={form.email} onChange={ (e )=>{ setField('email', e.target.value)}}
                  />
                    </Grid>
                    <Grid>
                  {/* <FormControl sx={{ m: 1, minWidth: 235 , }}> */}
                  <InputLabel id="demo-simple-select-label">Roles</InputLabel>
                    <Select
                    labelId="demo-multiple-name-label"
                    id="demo-multiple-name"
                    multiple
                    value={formik.values.roles}
                    label="roles"
                    onChange={(event)=>handleChange(event)}
                    // onChange={(e :any)=>{ formik.setFieldValue('roles', e.target.value.split(','))}}
                    >
                    {['admin','user'].map((role) => (
                        <MenuItem
                        key={role}
                        value={role}
                        // style={getStyles(name, personName, theme)}
                        >
                        {role}
                        </MenuItem>
                    ))}
                  </Select>

                  {formik.touched.roles && formik.errors.roles && <>formik.errors.roles</>}
                  {/* </FormControl> */}
                  </Grid>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2, width:'100px' }}
                  >
                        Update
                    </Button>
                    <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2, width:'100px' }}
                    onClick={()=>{props.goBack()}}
                  >
                        Back
                    </Button>
                    </form>
                    </Paper>
                </Grid>
                 
            </Grid>
        </Container>
    </>)
}

export default UpdateRoles;



                    
                   {/* <InputLabel id="demo-simple-select-readonly-label">Roles</InputLabel>
                  <Select
                    labelId="demo-simple-select-readonly-label"
                    required
                    fullWidth
                    id="roles"
                    label="roles"
                    // name="gender"
                    // autoComplete="gender"
                    // autoFocus
                    // value={form.gender} onChange={ (e :any)=>{ setField('gender', e.target.value)}}
                    value={formik.values.roles}
                    onChange={(e :any)=>{ formik.setFieldValue('roles', e.target.value)}}
                    onBlur={formik.handleBlur}
                    error={formik.touched.roles && Boolean(formik.errors.roles)}
                    // helperText={formik.touched.gender && formik.errors.gender}
                  >
                    <MenuItem >Select Roles</MenuItem>
                    <MenuItem value={'user'}>User</MenuItem>
                    <MenuItem value={'admin'}>Admin</MenuItem>
                  </Select> */}


                          //   setPersonName(
        //     // On autofill we get a stringified value.
        //     typeof value === 'string' ? value.split(',') : value,
        //   );
          
        // setAge(event.target.value as string);