import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button, FormGroup, FormText, Input, FormFeedback } from "reactstrap";

import { Formik } from "formik";
import * as Yup from "yup";

import { signIn } from "../actions";
import { ErrorMessage } from "../components";
import { Redirect } from 'react-router-dom';

const Login = (props) => {
  const dispatch = useDispatch();
  const auth= useSelector((state) => state.auth);
  let userType ;

  if(auth.isAuth)
  {
    console.log('here')
  }
  
  

  // get type of user login
  try {
    userType = props.location.state;
  } catch (e) {
    userType = undefined;
  }

  const handleFormSubmit = (values, bag) => {
    console.log(userType);
    dispatch(signIn({userType, ...values}));
    bag.setSubmitting(false);
  };

  return (
    <div className="formContainer">
      <div className="formImg">

      </div>
      <div className="formContent">
        <h1>Log In</h1>
        <ErrorMessage />

        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={handleFormSubmit}
          validationSchema={Yup.object().shape({
            // Yup validation
            email: Yup.string().email().required(),
            password: Yup.string().min(4).required(),
          })} // end yup validation
        >
          {({
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
               
                <Input
                  invalid={errors.email && touched.email} // invalid if touched and has error
                  name="email"
                  type="email"
                  placeholder="Adresse e-mail"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />

                {errors.email && touched.email && (
                  <FormFeedback>{errors.email}</FormFeedback>
                )}
              </FormGroup>
              <FormGroup>
                <Input
                  invalid={errors.password && touched.password}
                  name="password"
                  type="password"
                  placeholder="Mot de passe"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.password && touched.password && (
                  <FormFeedback>{errors.password}</FormFeedback>
                )}
              </FormGroup>
              <Button
                color="primary"
                block
                onClick={handleSubmit}
                disabled={!isValid || isSubmitting} // disabled if isValid false or form is submitted
              >
                Connexion
              </Button>
            </div>
          )}
        </Formik>
        <FormText>vous n'avez pas encore de compte?</FormText>
        <Link
          to={{
            pathname: "/login",
            state: { userType },
          }}
        >
          {" "}
          Créer un compte
        </Link>
      </div>
    </div>
  );
};

export { Login };
