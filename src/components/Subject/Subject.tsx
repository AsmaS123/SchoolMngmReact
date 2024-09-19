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

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();
interface SubjectProps {}

const Subject = () => {
  const [loading, setLoading] =  useState(true)
  const navigate = useNavigate();
  const token = useSelector((state:any) => state.token)
  const permission = useSelector((state:any) => state.permission)

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

         <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
          
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                {token}
                </Paper>
              </Grid>
            </Grid>
            {/* <Copyright sx={{ pt: 4 }} /> */}
          </Container> 

        </Box>
      </Box>
    </ThemeProvider>
    {/* } */}
    </>
  );
}


export default Subject;
