import { useState  } from 'react';
import styles from './Login.module.css';
import { Avatar,Button,CssBaseline,TextField,FormControlLabel,Checkbox,Link,Grid,Box, Typography ,TypographyOwnProps,Container,createTheme, ThemeProvider} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useNavigate } from "react-router-dom";
import axiosInstance from '../../const/httpinterceptor';

const defaultTheme = createTheme();

export default function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleSubmit = (event: { preventDefault: () => void; currentTarget: HTMLFormElement | undefined; }) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const obj = {
      email: data.get('email'),
      password: data.get('password'),
    };
    login(obj);
  };

  async function login(obj:any) {
    // debugger
    const data = obj;
    try {
      const response : any= await axiosInstance.post('login',data);
      const obj = {"token": response.data.token,"permission":response.data.permission};
      localStorage.setItem("loginData", JSON.stringify(obj));
      navigate("/dashboard");
    } catch (error:any) {
      setError(error.message);
    }
  }

  const handleChange  = () =>{
     navigate("/signup");
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2" onClick={handleChange}>
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}





    // const url = apiurl+'login'
    // axios.post(url,obj).then((res: any)=>{
    //   // debugger;
    //   // setToken(res.data.token);
    //   // debugger
    //   const obj = {"token": res.data.token,"permission":res.data.permission};
    //   localStorage.setItem("loginData", JSON.stringify(obj));
    //   dispatch({type: 'login',payload:obj})
    //   navigate("/dashboard");
    // }).catch((error)=>{
    //   alert(error)
    //   // console.log(error)
    // })