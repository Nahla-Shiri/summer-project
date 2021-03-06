import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button, FormGroup, FormText, Input, FormFeedback } from "reactstrap";
import { useHistory } from "react-router";

import { Formik } from "formik";
import * as Yup from "yup";

import { signIn } from "../actions";
import { ErrorMessage } from "../components";
import brandImg from "../assets/img/stil-D4jRahaUaIc-unsplash.jpg";
import ambassadorImg from "../assets/img/michael-dam-mEZ3PoFGs_k-unsplash.jpg";

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
          { user ==="brand" ? <img src={brandImg} alt ="brandlogin"/> : <img src={ambassadorImg} alt ="ambassadorlogin"/> }
      </div>
      <div className="formContent">
        <h1>Login</h1>
        <ErrorMessage />

        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={handleFormSubmit}
          validationSchema={Yup.object().shape({
            // Yup validation
            email: Yup.string().email().required(),
            password: Yup.string().min(1).required(),
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
               <label htmlFor="email">Email</label>
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
                <label htmlFor="password">Mot de passe</label>
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
                color="dark" 
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
        <Link to={{ pathname: `${user}-signup`}}  className="signupLink">Créer un compte </Link>
      </div>
    </div>
  );
};

export { Login };
