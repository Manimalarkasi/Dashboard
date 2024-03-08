import React from 'react';
import { Avatar, Button, Grid, Paper, Stack, TextField, Typography,Link,InputAdornment } from '@mui/material'
import './Login.css';
import * as Yup from 'yup';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { NavLink, useNavigate } from 'react-router-dom';
import Face6Icon from '@mui/icons-material/Face6';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';


function Login() {
  const navigate = useNavigate();
    const initialvalues ={
        email:'',
        password:'',
    }
    const validationSchema=Yup.object({
        email:Yup.string().email('invalid email format').matches(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/,'Invalid Email Format').required('Required!'),
        password:Yup.string().matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,18}$/,'must be start with caps,the password is include uppercase,lowercase,secial case charactor,numbers').required('Required!'),
    })
    const onSubmit = (values,onSubmitProps) =>{
        console.log(values);
              onSubmitProps.setSubmitting(false);
              onSubmitProps.resetForm();
          // axios.post('http://localhost:4176/login',values)
          // .then(res =>console.log(res))
          // .then(data =>console.log(data))
          // .catch(err =>console.log(err))

          fetch('http://localhost:3177/login',{
            method:"POST",
            crossDomain:true,
            headers:{
                "Content-Type":"application/json",
                Accept:"application/json",
                "Access-Control-Allow-Origin":"*",
            },
            body:JSON.stringify(values),
        }).then((res)=> res.json())
        .then((data)=>{console.log(data,"logged in")
        if(data.status =="ok"){
            console.log(data,"logged in")
            alert("login successfully");
            window.localStorage.setItem("token",data.data);
            window.localStorage.setItem("logged in",true);
            window.location.href= "./home";
        }
    })

              // const loggeduser = JSON.parse(localStorage.getItem("user"));
              // if(values.email ===loggeduser.email && loggeduser.password){
              //   localStorage.setItem("loggedin: ",true);
              //   navigate("/home");
              // }else{
              //   alert("wrong Email (or) Password")
              // }
    }
    const fun=()=>{
      navigate('/Register')
    }
  return (
    <div>
      <section>
        <div className='conailer-log'>
            
            <div className='log2'>
            <Grid >
        <Paper elevation={2} className='paper-log'>
            <div className='full'>
           <Grid alignContent={'center'}>
              <Avatar alt='ben' src='image/atslogo.jpg' style={{ width:60,height:50,marginLeft:170,padding:30}} />
           <h2 style={{fontSize:30,textAlign:'center'}} >ATS</h2>
           <h3 style={{fontSize:30,textAlign:'center'}}> LOGIN</h3>
           </Grid>
           <Formik initialValues={initialvalues} validationSchema={validationSchema} onSubmit={onSubmit} validateOnMount>
            {formik =>{
                // console.log("form values",formik);
                return(
                    <Form>
           <Field as={TextField} type='email' name='email' label='email' placeholder='enter your email' style={{width:'400px',padding:'0px',margin:"20px"}} autoFocus
           InputProps={{
            endAdornment:<InputAdornment position='end'><Face6Icon /></InputAdornment>
        }} /><br />
           <ErrorMessage name='email'>
            {error =><div style={{color:'red',paddingLeft:'50px'}}>{error}</div>}
           </ErrorMessage>
            <Field as={TextField} type='password' name='password' label='password' placeholder='enter your password' style={{width:'400px',margin:"20px"}} 
            InputProps={{
              endAdornment:<InputAdornment position='end'><VisibilityOutlinedIcon /></InputAdornment>
          }} /><br />
          
            <ErrorMessage name='password'>
            {error =><div style={{color:'red',paddingLeft:'50px'}}>{error}</div>}
           </ErrorMessage>
            <Link className='link'>Reset Password</Link>
            
            <Button variant='contained' type='submit' style={{margin:'30px 40px',padding:'10px',width:'400px'}} > LOGIN</Button>
            <Typography>
              you Don't have a account 
              <NavLink to={"/register"} >SIGNUP</NavLink> 
              <Button variant='contained' color='success' style={{marginLeft:'10px'}} onClick={fun}>SIGNUP</Button>
            </Typography>
            </Form>
                )
            }}
           </Formik>
           </div>
           </Paper>
           </Grid>
            </div>
        </div>
      </section>
    </div>
  )
}
export default Login;
