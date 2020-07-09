import React from 'react';
import { Formik } from "formik";
import * as Yup from "yup";
import {
    Button,
    FormGroup,
    Input,
    FormFeedback,
  } from "reactstrap";
  
import { ErrorMessage } from "../components";
const BrandForm = ({btnTxt ="save brand", onSubmit, brand={} }) => {
  console.log(brand);
   const { name = '', email='', tel=0, summary='', description ='', logo='',gallery=[]} = brand;
    return (
      <>
      <ErrorMessage />
        <Formik 
        initialValues ={{name,email,tel,summary, description,logo,gallery}}
        onSubmit={onSubmit}
        validationSchema={Yup.object().shape({
            name: Yup.string().min(3).required(),
            email: Yup.string().email().required(),
            tel: Yup.number().required(),
            summary: Yup.string().min(1).required(),
            description: Yup.string().min(1).required(),
            logo: Yup.string().url().required(),
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
                <Input
                  invalid={errors.name && touched.name} // invalid if touched and has error
                  name="name"
                  type="text"
                  value= {values.name}
                  placeholder="Nom"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                 {errors.name && touched.name && <FormFeedback>{errors.name}</FormFeedback>}
              </FormGroup>
              <FormGroup>
                <Input
                  invalid={errors.email && touched.email} // invalid if touched and has error
                  name="email"
                  type="email"
                  value= {values.email}
                  placeholder="Email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                 {errors.email && touched.email && <FormFeedback>{errors.email}</FormFeedback>}
              </FormGroup>
              <FormGroup>
                <Input
                  invalid={errors.tel && touched.tel} // invalid if touched and has error
                  name="tel"
                  type="number"
                  value= {values.tel}
                  placeholder="Téléphone"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                 {errors.tel && touched.tel && <FormFeedback>{errors.tel}</FormFeedback>}
              </FormGroup>
              <FormGroup>
               
                <Input
                  invalid={errors.summary && touched.summary} // invalid if touched and has error
                  name="summary"
                  type="textarea"
                  value= {values.summary}
                  placeholder="Resume"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                 {errors.summary && touched.summary && <FormFeedback>{errors.summary}</FormFeedback>}
              </FormGroup>
              
              <FormGroup>
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
              <FormGroup>
               
                <Input
                  invalid={errors.logo && touched.logo} // invalid if touched and has error
                  name="logo"
                  type="text"
                  value= {values.logo}
                  placeholder="Logo url"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                 {errors.logo && touched.logo && <FormFeedback>{errors.logo}</FormFeedback>}
              </FormGroup>
              <FormGroup>
               
                <Input
                  invalid={errors.gallery && touched.gallery} // invalid if touched and has error
                  name="gallery"
                  type="textarea"
                  value= {values.gallery}
                  placeholder="Brand gallery"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                 {errors.gallery && touched.gallery && <FormFeedback>{errors.gallery}</FormFeedback>}
              </FormGroup>
              <Button
                color="dark"
                block
                onClick={handleSubmit}
                disabled={!isValid || isSubmitting} // disabled if isValid false or form is submitted
              >
               {btnTxt}
              </Button>
            </div>
          )}
        </Formik> 
        </>
    )
}

export { BrandForm } 
