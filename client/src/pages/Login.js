import React from 'react';
import { Button, FormGroup, Label, Input , FormFeedback} from 'reactstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';

const Login = () => {

    const handleFormSubmit =(values, bag) => {
       console.log(values);
      }
    
 
    return (
      <div style={{ padding: 20 }}>
        <h3>Sign in to your account</h3>
        <hr />


        <Formik
          initialValues={{ email: '', password: '' }}
          onSubmit={handleFormSubmit}
          validationSchema={Yup.object().shape({
            email: Yup.string()
              .email()
              .required(),
            password: Yup.string()
              .min(6)
              .required()
          })}
          render={({
            handleChange,
            handleSubmit,
            isValid,
            isSubmitting,
            handleBlur,
            errors,
            touched
          }) => (
            <div>
              <FormGroup>
                <Label>Email</Label>
                <Input
                  invalid={errors.email && touched.email}
                  name='email'
                  type='email'
                  placeholder='someone@abolkog.com'
                  onChange={handleChange}
                  onBlur={handleBlur}
                />

                {errors.email && touched.email ? (
                  <FormFeedback>{errors.email}</FormFeedback>
                ) : null}
              </FormGroup>
              <FormGroup>
                <Label>Password</Label>
                <Input
                  invalid={errors.password && touched.password}
                  name='password'
                  type='password'
                  placeholder='Your Password'
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.password && touched.password ? (
                  <FormFeedback>{errors.password}</FormFeedback>
                ) : null}
              </FormGroup>
              <Button
                color='primary'
                block
                onClick={handleSubmit}
                disabled={!isValid || isSubmitting}
              >
                Sign In
              </Button>
            </div>
          )}
        />
        
      </div>
    );
}

export { Login }
