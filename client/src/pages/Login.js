import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button, FormGroup, FormText, Input, FormFeedback } from "reactstrap";
import { useHistory } from "react-router";

import { Formik } from "formik";
import * as Yup from "yup";

import { signIn } from "../actions";
import { ErrorMessage } from "../components";

const Login = ({user}) => {
  const dispatch = useDispatch();
  const auth= useSelector((state) => state.auth);
  let history = useHistory()

  if(auth.isAuth)
  { 
    history.push(`${user}-profile/`)
  }
  
  

  const handleFormSubmit = (values, bag) => {
    dispatch(signIn({user, ...values}));
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
        <Link to={{ pathname: `${user}-signup`}} >Créer un compte </Link>
      </div>
    </div>
  );
};

export { Login };
