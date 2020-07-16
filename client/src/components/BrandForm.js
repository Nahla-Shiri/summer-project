import React from "react";
import { Button, FormGroup, Input, FormFeedback } from "reactstrap";
import { Formik } from "formik";
import * as Yup from "yup";

import { ErrorMessage, Thumb } from "../components";

const BrandForm = ({
  type = "signup",
  btnTxt = "Enregistrer",
  onSubmit,
  brand = {},
}) => {
  const {
    name = "",
    email = "",
    password = "",
    tel = "",
    summary = "",
    description = "",
  } = brand;
  return (
    <div className={type}>
      <ErrorMessage />
      <Formik
        initialValues={{
          name,
          email,
          password,
          tel,
          summary,
          description,
        }}
        onSubmit={onSubmit}
        validationSchema={Yup.object().shape({
          name: Yup.string().min(3).required(),
          email: Yup.string().email().required(),
          password: Yup.string().min(4).required(),
          tel: Yup.number().required(),
          summary: Yup.string().min(1).required(),
          description: Yup.string().min(1).required(),
          logo: Yup.mixed().when("type", (type, schema) => {
            if (type === "signup") {
              return schema.required();
            }
            return schema;
          }),
        })}
      >
        {({
          setFieldValue,
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
              <label htmlFor="titre">Titre</label>
              <Input
                invalid={errors.name && touched.name} // invalid if touched and has error
                name="name"
                type="text"
                value={values.name}
                placeholder="Nom"
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.name && touched.name && (
                <FormFeedback>{errors.name}</FormFeedback>
              )}
            </FormGroup>
            <FormGroup>
              <label htmlFor="email">Email</label>
              <Input
                invalid={errors.email && touched.email} // invalid if touched and has error
                name="email"
                type="email"
                value={values.email}
                placeholder="Email"
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.email && touched.email && (
                <FormFeedback>{errors.email}</FormFeedback>
              )}
            </FormGroup>
            <FormGroup className="password">
              <label htmlFor="Password">Mot de passe</label>
              <Input
                invalid={errors.password && touched.password} // invalid if touched and has error
                name="password"
                type="password"
                value={values.password}
                placeholder="Mot de passe"
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.password && touched.password && (
                <FormFeedback>{errors.password}</FormFeedback>
              )}
            </FormGroup>
            <FormGroup>
              <label htmlFor="tel">Téléphone</label>
              <Input
                invalid={errors.tel && touched.tel} // invalid if touched and has error
                name="tel"
                type="number"
                value={values.tel}
                placeholder="Téléphone"
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.tel && touched.tel && (
                <FormFeedback>{errors.tel}</FormFeedback>
              )}
            </FormGroup>
            <FormGroup>
              <label htmlFor="summary">Introduction</label>
              <Input
                invalid={errors.summary && touched.summary} // invalid if touched and has error
                name="summary"
                type="textarea"
                value={values.summary}
                placeholder="Introduction"
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.summary && touched.summary && (
                <FormFeedback>{errors.summary}</FormFeedback>
              )}
            </FormGroup>

            <FormGroup>
              <label htmlFor="desc">Description</label>
              <Input
                invalid={errors.description && touched.description}
                name="description"
                type="textarea"
                value={values.description}
                placeholder="Description"
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.description && touched.description && (
                <FormFeedback>{errors.description}</FormFeedback>
              )}
            </FormGroup>
            <FormGroup>
              <label props="logo">Logo</label>
              <input
                id="logo"
                name="logo"
                type="file"
                onChange={(event) => {
                  setFieldValue("logo", event.currentTarget.files[0]);
                }}
                className="propsm-control"
              />

              <Thumb file={values.logo} />
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
    </div>
  );
};

export { BrandForm };
