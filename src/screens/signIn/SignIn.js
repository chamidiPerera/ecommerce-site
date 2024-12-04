import React, { useContext, useState } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '@emotion/react';
import toast from 'react-hot-toast';
import './SignIn.css';

const users = JSON.parse(localStorage.getItem('users')) || [];

const signInValidationSchema = Yup.object({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

const signUpValidationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

const SignIn = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);

  const handleSignIn = (values) => {
    const existingUser = users.find((user) => user.email === values.email);
    if (existingUser && existingUser.password === values.password) {
      localStorage.setItem('loggedInEmail', values.email);
      toast.success('Login Successful!');
      navigate('/products');
    } else {
      toast.error('Invalid e-mail or password!');
    }
  };

  const handleSignUp = (values) => {
    const existingUser = users.find((user) => user.email === values.email);
    if (existingUser) {
      toast.error('E-mail already exists. Please sign in!');
    } else {
      const newUser = {
        email: values.email,
        password: values.password,
        name: values.name,
      };
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));
      localStorage.setItem('loggedInEmail', values.email);
      toast.success('Sign Up Successful!');
      navigate('/signIn');
    }
  };

  return (
    <div className="sign-in">
      <div className="sign-in-left">
        <div className="sign-in-left-content">
          <h2>Sign up to URBAN CULT Community and get exclusive benefits!</h2>
          <ul className="benefit-list">
            <li className="list-pints"> FREE Special Gift to a new member</li>
            <li className="list-pints">
              {' '}
              Get 2x URBAN CULT Points to purchase items
            </li>
            <li className="list-pints">
              Get special voucher code every month{' '}
            </li>
            <li className="list-pints"> Claim Voucher Disc. Up To 50%</li>
          </ul>
        </div>
      </div>
      <div className="sign-in-right">
        <Box
          width="100%"
          height="100%"
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{
            backgroundImage:
              'linear-gradient(to left, #b997bb, #e0bdd2,#ffffff)',
          }}
        >
          <Box
            width="80%"
            height="85%"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            sx={{
              backgroundColor: 'rgba(255,255,255,0.5)',
              borderRadius: 5,
              boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
            }}
          >
            <h1>URBAN CULT</h1>
            <h2>{isSignUp ? 'Create an Account' : 'WELCOME BACK'}</h2>
            <Formik
              initialValues={
                isSignUp
                  ? { name: '', email: '', password: '' }
                  : { email: '', password: '' }
              }
              validationSchema={
                isSignUp ? signUpValidationSchema : signInValidationSchema
              }
              onSubmit={(values) =>
                isSignUp ? handleSignUp(values) : handleSignIn(values)
              }
            >
              {({ errors, touched }) => (
                <Form className="sign-in-form">
                  {isSignUp && (
                    <Box mb={3}>
                      <Field
                        as={TextField}
                        name="name"
                        label="Full Name"
                        variant="outlined"
                        fullWidth
                        error={touched.name && Boolean(errors.name)}
                        helperText={touched.name && errors.name}
                        className="input-field"
                      />
                    </Box>
                  )}
                  <Box mb={3}>
                    <Field
                      as={TextField}
                      name="email"
                      label="Email Address"
                      variant="outlined"
                      fullWidth
                      error={touched.email && Boolean(errors.email)}
                      helperText={touched.email && errors.email}
                      className="input-field"
                    />
                  </Box>
                  <Box mb={3}>
                    <Field
                      as={TextField}
                      name="password"
                      label="Password"
                      type="password"
                      variant="outlined"
                      fullWidth
                      error={touched.password && Boolean(errors.password)}
                      helperText={touched.password && errors.password}
                      className="input-field"
                    />
                  </Box>
                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    className="submit-btn"
                  >
                    {isSignUp ? 'Sign Up' : 'Sign In'}
                  </Button>
                </Form>
              )}
            </Formik>
            <Box mt={3} textAlign="center">
              {isSignUp ? (
                <Typography>
                  Already have an account?{' '}
                  <Button
                    onClick={() => setIsSignUp(false)}
                    color="primary"
                    variant="text"
                    className="toggle-btn"
                  >
                    SING IN
                  </Button>
                </Typography>
              ) : (
                <Typography>
                  Don't have an account?{' '}
                  <Button
                    onClick={() => setIsSignUp(true)}
                    color="primary"
                    variant="text"
                    className="toggle-btn"
                  >
                    SIGN UP
                  </Button>
                </Typography>
              )}
            </Box>
          </Box>
        </Box>
      </div>
    </div>
  );
};

export default SignIn;
