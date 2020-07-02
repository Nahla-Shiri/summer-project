import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Formik } from "formik";
import * as Yup from "yup";
import {
    Button,
    FormGroup,
    Label,
    Input,
    FormFeedback,
  } from "reactstrap";
  

  import { saveBrand } from '../actions/brand_actions';
  import { ErrorMessage} from '../components';

const AddBrandForm = () => {

  const dispatch = useDispatch();
  const saved = useSelector(state => state.brand.saved);
  
    
    const handleFormSubmit = (values, bag) => {
      dispatch(saveBrand(values));
      bag.setSubmitting(false);
    }
   
    
    return (
        <div>
          <ErrorMessage />
            <Formik 
            initialValues ={{title: "", description: "" }}
            onSubmit={handleFormSubmit}
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
                    Add Brand
                  </Button>
                </div>
              )}
            </Formik> 

        </div>
    )
}

export default AddBrandForm
