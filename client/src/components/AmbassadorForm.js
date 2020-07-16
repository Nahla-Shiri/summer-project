import React, { useEffect } from "react";
import { Button, FormGroup, Input, FormFeedback } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { Formik } from "formik";
import * as Yup from "yup";

import { ErrorMessage, Thumb } from "../components";
import { fetchBrand } from "../actions/brand_actions";

const AmbassadorForm = ({
  type = "signup",
  btnTxt = "Enregistrer",
  onSubmit,
  ambassador = {},
}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchBrand());
  }, []);

  const brandState = useSelector((state) => state.brand);
  const {
    name = "",
    email = "",
    password = "",
    tel = "",
    cp = "",
    street = "",
    city = "",
    country = "",
    brand = "",
  } = ambassador;

  return (
    <div className={type}>
      <ErrorMessage />
      <Formik
        initialValues={{
          name,
          email,
          password,
          tel,
          street,
          cp,
          city,
          country,
          brand,
        }}
        onSubmit={onSubmit}
        validationSchema={Yup.object().shape({
          name: Yup.string().min(3).required(),
          email: Yup.string().email().required(),
          password: Yup.string().min(4).required(),
          tel: Yup.number().required(),
          cp: Yup.number().required(),
          street: Yup.string().required(),
          city: Yup.string().required(),
          country: Yup.string().required(),
          photo: Yup.mixed().when("type", (type, schema) => {
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
              <label htmlFor="name">Nom / Prénom</label>
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

            <FormGroup id="passowrd">
              <label htmlFor="password">Mot de passe</label>
              <Input
                invalid={errors.password && touched.password} // invalid if touched and has error
                name="password"
                type="password"
                value={values.password}
                placeholder="Password"
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
              <label htmlFor="address">Adresse</label>
              <Input
                invalid={errors.street && touched.street} // invalid if touched and has error
                name="street"
                type="text"
                value={values.street}
                placeholder="Adresse"
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.street && touched.street && (
                <FormFeedback>{errors.street}</FormFeedback>
              )}
            </FormGroup>
            <FormGroup>
              <label htmlFor="ville">Ville</label>
              <Input
                invalid={errors.city && touched.city} // invalid if touched and has error
                name="city"
                type="text"
                value={values.city}
                placeholder="ville"
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.city && touched.city && (
                <FormFeedback>{errors.city}</FormFeedback>
              )}
            </FormGroup>
            <FormGroup>
              <label htmlFor="cp">Code postal</label>
              <Input
                invalid={errors.cp && touched.cp} // invalid if touched and has error
                name="cp"
                type="number"
                value={values.cp}
                placeholder="Code postal"
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.cp && touched.cp && (
                <FormFeedback>{errors.cp}</FormFeedback>
              )}
            </FormGroup>
            <FormGroup>
              <label htmlFor="country">Country</label>
              <Input
                invalid={errors.country && touched.country} // invalid if touched and has error
                name="country"
                type="text"
                value={values.country}
                placeholder="Pays"
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.country && touched.country && (
                <FormFeedback>{errors.country}</FormFeedback>
              )}
            </FormGroup>

            <FormGroup>
              <label htmlFor="brand">Marque</label>
              <select
                name="brand"
                value={values.brand}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                {brandState.brand && brandState.fetching ? (
                  brandState.brand.map((item) => (
                    <option key={item._id} value={item._id} label={item.name} />
                  ))
                ) : (
                  <option>loading ...</option>
                )}
              </select>
            </FormGroup>
            <FormGroup>
              <label props="photo">Photo de profile</label>
              <input
                id="photo"
                name="photo"
                type="file"
                onChange={(event) => {
                  setFieldValue("photo", event.currentTarget.files[0]);
                }}
                className="propsm-control"
              />

              <Thumb file={values.photo} />
            </FormGroup>
            <Button
              color="dark"
              block
              onClick={handleSubmit}
              disabled={!isValid || isSubmitting} // disabled if isValid false or propsm is submitted
            >
              {btnTxt}
            </Button>
          </div>
        )}
      </Formik>
    </div>
  );
};

export { AmbassadorForm };
