import React, { useState } from "react";
import { Grid, Box, Typography, TextField, Button } from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import "./SignIn.css";

const users = JSON.parse(localStorage.getItem("users")) || [];

const signInValidationSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const signUpValidationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const SignIn = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate(); 

  const handleSignIn = (values) => {
    const existingUser = users.find((user) => user.email === values.email);
    if (existingUser && existingUser.password === values.password) {
      localStorage.setItem("loggedInEmail", values.email);
      alert("Logged in successfully!");
      navigate("/products");
    } else {
      alert("Invalid email or password.");
    }
  };

  const handleSignUp = (values) => {
    const existingUser = users.find((user) => user.email === values.email);
    if (existingUser) {
      alert("Email already exists.");
    } else {
      const newUser = {
        email: values.email,
        password: values.password,
        name: values.name,
      };
      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));
      localStorage.setItem("loggedInEmail", values.email);
      alert("Signed up successfully!");
      navigate("/signIn");
    }
  };

  return (
    <Grid container className="container">
      <Grid item xs={12} md={6} className="left"></Grid>
      <Grid item xs={12} md={6} className="right">
        <Box
          width="100%"
          height="100%"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Box width={{ xs: "90%", sm: "80%" }}>
            <Typography
              variant="h4"
              gutterBottom
              textAlign={{ xs: "center", md: "left" }}
            >
              {isSignUp ? "Sign Up" : "Sign In"}
            </Typography>
            <Formik
              initialValues={
                isSignUp
                  ? { name: "", email: "", password: "" }
                  : { email: "", password: "" }
              }
              validationSchema={
                isSignUp ? signUpValidationSchema : signInValidationSchema
              }
              onSubmit={(values) =>
                isSignUp ? handleSignUp(values) : handleSignIn(values)
              }
            >
              {({ errors, touched }) => (
                <Form>
                  {isSignUp && (
                    <Box mb={2}>
                      <Field
                        as={TextField}
                        name="name"
                        label="Name"
                        variant="outlined"
                        fullWidth
                        error={touched.name && Boolean(errors.name)}
                        helperText={touched.name && errors.name}
                      />
                    </Box>
                  )}
                  <Box mb={2}>
                    <Field
                      as={TextField}
                      name="email"
                      label="Email"
                      variant="outlined"
                      fullWidth
                      error={touched.email && Boolean(errors.email)}
                      helperText={touched.email && errors.email}
                    />
                  </Box>
                  <Box mb={2}>
                    <Field
                      as={TextField}
                      name="password"
                      label="Password"
                      type="password"
                      variant="outlined"
                      fullWidth
                      error={touched.password && Boolean(errors.password)}
                      helperText={touched.password && errors.password}
                    />
                  </Box>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                  >
                    {isSignUp ? "Sign Up" : "Sign In"}
                  </Button>
                </Form>
              )}
            </Formik>
            <Box mt={2} textAlign="center">
              {isSignUp ? (
                <Typography>
                  Already have an account?{" "}
                  <Button
                    onClick={() => setIsSignUp(false)}
                    color="primary"
                    variant="text"
                  >
                    Sign In
                  </Button>
                </Typography>
              ) : (
                <Typography>
                  Don't have an account?{" "}
                  <Button
                    onClick={() => setIsSignUp(true)}
                    color="primary"
                    variant="text"
                  >
                    Sign Up
                  </Button>
                </Typography>
              )}
            </Box>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default SignIn;
