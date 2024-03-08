import React, { useEffect, useState } from 'react';
import './Register.css';
import { Form, Formik ,ErrorMessage, Field} from 'formik';
import * as Yup from 'yup';
import { Avatar, Button, Grid, Paper, Stack, TextField ,Typography,Link} from '@mui/material'
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom'



function Register() {
  const navigate = useNavigate()
  const initialvalues= {
    empid:'',
    name:'',
    email:'',
    password:'',
    cpassword:'',
    phoneno:'',
  }
  // const [input,setInput] = useState({initialvalues})
  const onSubmit= async(values,onSubmitProps,e) =>{
    // e.preventDefault();
    console.log(values);
          // onSubmitProps.setSubmitting(false);
          onSubmitProps.resetForm();
          // axios.post('http://localhost:3177/register',values)
          // .then(res =>console.log(res))
          // .then(data =>console.log(data))
          // .catch(err =>console.log(err));

          fetch('http://localhost:3177/register',{
            method:"POST",
            crossDomain:true,
            headers:{
                "Content-Type":"application/json",
                Accept:"application/json",
                "Access-Control-Allow-Origin":"*",
            },
            body:JSON.stringify(values),
        }).then((res)=>res.json())
        .then((data)=>console.log(data,"Registered"))
        .catch((err)=>console.log(err))

          // try{
          //  const resp= await axios.post(API_URL,values);
          //  console.log(resp.data);
          // }catch(error){
          //   console.error('error is dedected',error);
          // }  
    localStorage.setItem("user",JSON.stringify(values));
    navigate('/')
  }


    const API_URL='https://6593d64d1493b01160693df3.mockapi.io/employee';
    
    const validationschema = Yup.object({
      empid:Yup.mixed().required('Required!'),
      name:Yup.string().max(20, 'Name should not exceed 20 Characters').matches(/^[a-zA-Z ]*$/,'only Charactors').uppercase().required('Required!'),
      email:Yup.string().email('invalid email format').matches(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/,'Invalid Email Format').required('Required!'),
      password:Yup.string().matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,18}$/,'must be start with caps,the password is include uppercase,lowercase,secial case charactor,numbers').required('Required!'),
      cpassword:Yup.string().oneOf([Yup.ref("password")],'this password is not match').required('Required!'),
      phoneno:Yup.number('is not a number').required('Required!'),
    })
    .json()
    .camelCase()

  return (
    <section>
        <div className='container-full'>
        
      <div className='reg-part1'>
      <Grid >
        <Paper elevation={1} className='paper-regi'>
           <Grid alignContent={'center'}>
            
              <Avatar alt='ben' src='image/atslogo.jpg' style={{ width:60,height:50,marginLeft:210,padding:10}} />
           <h2 style={{fontSize:30,textAlign:'center'}} >ATS</h2>
           <h3 style={{fontSize:30,textAlign:'center'}}> Registration Form</h3>
           </Grid>
           <Formik initialValues={initialvalues} onSubmit={onSubmit} validationSchema={validationschema} validateOnMount >
            {formik=>{
              // console.log('form data:', formik);
              return(
                <Form>
                <Stack spacing={1}  direction={'column'}>
               
              <Field as={TextField}  label='Employee ID' name='empid' type='text' variant='outlined' size='small' autoFocus/>
              <ErrorMessage name='empid'>
               {errormsg => <span style={{color:'red'}}>{errormsg}</span> }
               </ErrorMessage>
              
              <Field as={TextField} label='Name:'  name='name' type='text' variant='outlined' size='small'   />
              <ErrorMessage name='name'>
               {errormsg => <div style={{color:'red'}}>{errormsg}</div> }
               </ErrorMessage>
              
              <Field as={TextField} label='E-Mail:'  name='email'  type='email' variant='outlined' size='small'   />
              <ErrorMessage name='email'>
               {errormsg => <div style={{color:'red'}}>{errormsg}</div> }
               </ErrorMessage>
              
              <Field as={TextField} label='Password:' name='password'  type='password' variant='outlined' size='small'  />
              <ErrorMessage name='password'>
               {errormsg => <div style={{color:'red'}}>{errormsg}</div> }
               </ErrorMessage>
             
              <Field as={TextField}  label='Confirm-password:'  name='cpassword' type='password' variant='outlined' size='small'   />
              <ErrorMessage name='cpassword'>
               {errormsg => <div style={{color:'red'}}>{errormsg}</div> }
               </ErrorMessage>
               
               <Field as={TextField} label='Phone Number:'  name='phoneno' type='text' variant='outlined' size='small' />
               <ErrorMessage name='phoneno'>
               {errormsg => <div style={{color:'red'}}>{errormsg}</div> }
               </ErrorMessage>
              <Button variant='contained' color='success' type='submit' disabled={!formik.isValid} >Submit</Button>
              <Typography>
              you already have a account  
              <NavLink to="/" >LOGIN</NavLink>
            </Typography>
              </Stack>
              </Form>
              )
            }}
            
          </Formik>
        </Paper>
      </Grid>
      </div>
      </div>
    </section>
  )
}

export default Register
