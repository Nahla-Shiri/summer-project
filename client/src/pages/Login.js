import React from "react";
import {
  Button,
  FormGroup,
  Label,
  Input,
  FormFeedback,
  Alert,
} from "reactstrap";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Formik } from "formik";
import * as Yup from "yup";

import { signIn } from "../actions/auth_actions";

const Login = () => {

  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);

  let history = useHistory();
    if(auth.isAuth )
    {
      
      history.push('/')
    }
 
   


  const handleFormSubmit = (values, bag) => {
    dispatch(signIn(values));
    bag.setSubmitting(false);
  };

  const renderErrorIfAny =() => {
    if (auth.error) {
      return <Alert color='danger'>{auth.error}</Alert>;
    }
  }


  return (
    
    <div style={{ padding: 20 }}>
      <h3>Sign in to your account</h3>
      <hr />
      {renderErrorIfAny()}

      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={handleFormSubmit}
        validationSchema={Yup.object().shape({
          // Yup validation
          email: Yup.string()
            .email() // we can custome error message here : email('custom message')
            .required(),
          password: Yup.string().min(6).required(),
        })} // end yup validation
        render={({
          handleChange,
          handleSubmit,
          handleBlur,
          isValid, // form is valid
          isSubmitting, // fom is submitted
          errors, // input has error
          touched, // input is touched
        }) => (
          <div>
            <FormGroup>
              <Label>Email</Label>
              <Input
                invalid={errors.email && touched.email} // invalid if touched and has error
                name="email"
                type="email"
                placeholder="test@gmail.com"
                onChange={handleChange}
                onBlur={handleBlur}
              />

              {errors.email && touched.email ? (
                <FormFeedback>{errors.email}</FormFeedback> // display error message
              ) : null}
            </FormGroup>
            <FormGroup>
              <Label>Password</Label>
              <Input
                invalid={errors.password && touched.password}
                name="password"
                type="password"
                placeholder="Your Password"
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.password && touched.password ? (
                <FormFeedback>{errors.password}</FormFeedback>
              ) : null}
            </FormGroup>
            <Button
              color="primary"
              block
              onClick={handleSubmit}
              disabled={!isValid || isSubmitting} // disabled if isValid false or form is submitted
            >
              Sign In
            </Button>
          </div>
        )}
      />
      <Link to="/signup">Do not have an account? Sign Up Now</Link>
    </div>
  );
  

};



export { Login };
