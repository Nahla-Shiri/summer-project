import React from 'react';
import { Formik } from "formik";
import * as Yup from "yup";
import {
    Button,
    FormGroup,
    Label,
    Input,
    FormFeedback,
  } from "reactstrap";
  

const BrandForm = ({btnTxt ="save brand", onSubmit, brand={} }) => {
   const { title = '', description =''} = brand;
    return (
        <Formik 
        initialValues ={{title, description}}
        onSubmit={onSubmit}
        validationSchema={Yup.object().shape({
            title: Yup.string().min(3).required(),
            description: Yup.string().min(200).required(),
          })} 
         >
        {({
            handleChange,
            handleSubmit,
            handleBlur,
            isValid, 
            values,
            isSubmitting, 
            errors, 
            touched, 
          }) => (
            <div>
              <FormGroup>
                <Label>Title</Label>
                <Input
                  invalid={errors.title && touched.title} // invalid if touched and has error
                  name="title"
                  type="text"
                  value= {values.title}
                  placeholder="Brand title"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                 {errors.title && touched.title && <FormFeedback>{errors.title}</FormFeedback>}
              </FormGroup>
              <FormGroup>
                <Label>description</Label>
                <Input
                  invalid={errors.description && touched.description}
                  name="description"
                  type="textarea"
                  value= {values.description}
                  placeholder="Your description"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                { errors.description && touched.description &&<FormFeedback>{errors.description}</FormFeedback> }
              </FormGroup>
              <Button
                color="primary"
                block
                onClick={handleSubmit}
                disabled={!isValid || isSubmitting} // disabled if isValid false or form is submitted
              >
               {btnTxt}
              </Button>
            </div>
          )}
        </Formik> 
    )
}

export { BrandForm } 
