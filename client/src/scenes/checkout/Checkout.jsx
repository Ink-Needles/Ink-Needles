import { useSelector } from "react-redux";
import { Box, Button, Stepper, Step, StepLabel } from "@mui/material";
import { Formik } from "formik";
import { useState, useEffect } from "react";
import * as yup from "yup";
import { shades } from "../../theme";
import Shipping from "./Shipping";
import Payment from "./Payment";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

const URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:1337";

const stripePromise = loadStripe(
  "pk_test_51QSmJFLtioHjd9uRU16PBOoerYLHpQUurPJ7WtFYglu826aPOYYLn06xU0I16k7DQi0yAM5IfKZfHyVw3VUIwebg003ZxMXKm6"
);

const initialValues = {
  cashOnDelivery: false,
  billingAddress: {
    firstName: "",
    lastName: "",
    country: "",
    street1: "",
    street2: "",
    city: "",
    state: "",
    zipCode: "",
  },
  shippingAddress: {
    isSameAddress: true,
    firstName: "",
    lastName: "",
    country: "",
    street1: "",
    street2: "",
    city: "",
    state: "",
    zipCode: "",
  },
  email: "",
  phoneNumber: "",
};

const checkoutSchema = [
  yup.object().shape({
    billingAddress: yup.object().shape({
      firstName: yup.string().required("required"),
      lastName: yup.string().required("required"),
      country: yup.string().required("required"),
      street1: yup.string().required("required"),
      street2: yup.string(),
      city: yup.string().required("required"),
      state: yup.string().required("required"),
      zipCode: yup.string().required("required"),
    }),
    shippingAddress: yup.object().shape({
      isSameAddress: yup.boolean(),
      firstName: yup.string().when("isSameAddress", {
        is: false,
        then: (yup) => yup.required("required"),
      }),
      lastName: yup.string().when("isSameAddress", {
        is: false,
        then: (yup) => yup.required("required"),
      }),
      country: yup.string().when("isSameAddress", {
        is: false,
        then: (yup) => yup.required("required"),
      }),
      street1: yup.string().when("isSameAddress", {
        is: false,
        then: (yup) => yup.required("required"),
      }),
      street2: yup.string(),
      city: yup.string().when("isSameAddress", {
        is: false,
        then: (yup) => yup.required("required"),
      }),
      state: yup.string().when("isSameAddress", {
        is: false,
        then: (yup) => yup.required("required"),
      }),
      zipCode: yup.string().when("isSameAddress", {
        is: false,
        then: (yup) => yup.required("required"),
      }),
    }),
  }),
  yup.object().shape({
    email: yup.string().required("required"),
    phoneNumber: yup.string().required("required"),
  }),
];

const Checkout = () => {
  const [activeStep, setActiveStep] = useState(0);
  const cart = useSelector((state) => state.cart.cart);
  const isFirstStep = activeStep === 0;
  const isSecondStep = activeStep === 1;
  const [initialFormValues, setInitialFormValues] = useState(initialValues);

  useEffect(() => {
    const fetchPersonalData = async () => {
      const jwt = localStorage.getItem('jwt');
      if (jwt) {
        try {
          const response = await fetch(URL + '/api/users/me', {
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          });
          const account = await response.json();
          if (account.personalData) {
            setInitialFormValues({
              ...initialValues,
              billingAddress: {
                firstName: account.personalData.firstName || "",
                lastName: account.personalData.lastName || "",
                country: account.personalData.country || "",
                street1: account.personalData.streetAddress || "",
                street2: "",
                city: account.personalData.city || "",
                state: "",
                zipCode: account.personalData.zipCode || "",
              },
              email: account.email || "",
              phoneNumber: account.personalData.phoneNumber || "",
            });
          }
        } catch (error) {
          console.error('Error fetching personal data:', error);
        }
      }
    };

    fetchPersonalData();
  }, []);

  const handleFormSubmit = async (values, actions) => {
    setActiveStep(activeStep + 1);

    // Copying the billing address to the shipping address
    if (isFirstStep && values.shippingAddress.isSameAddress) {
      actions.setFieldValue("shippingAddress", {
        ...values.billingAddress,
        isSameAddress: true,
      });
    }

    if (isSecondStep) {
      makePayment(values);
    }

    actions.setTouched({});
  };

  const makePayment = async (values) => {
    let stripe = false;
    if (!values.cashOnDelivery) {
      stripe = await stripePromise;
    }

    const requestBody = {
      userName: `${values.billingAddress.firstName} ${values.billingAddress.lastName}`,
      cashOnDelivery: values.cashOnDelivery,
      email: values.email,
      phoneNumber: values.phoneNumber,
      products: cart.map(({ id, count, size }) => ({
        id,
        count,
        size,
      })),
      billingInformation: values.billingAddress,
      isSameAddress: values.shippingAddress.isSameAddress,
      shippingInformation: values.shippingAddress,
    };

    try {
      // Send request to create Stripe session on the backend
      const response = await axios.post(URL + "/api/orders", requestBody);

      if (!response.data) {
        return console.error("No response from the server");
      }

      if (values.cashOnDelivery) {
        return document.location.href = "/checkout/success";
      }

      if (!response.data.id) {
        return console.error("Invalid response from the server");
      }

      const session = await response.data;

      // Redirect to Stripe for payment
      await stripe.redirectToCheckout({
        sessionId: session.id,
      });
    } catch (error) {
      console.error("Error processing payment", error);
    }
  };

  return (
    <Box width="80%" m="100px auto">
      <Stepper activeStep={activeStep} sx={{ m: "20px 0" }}>
        <Step>
          <StepLabel>Billing</StepLabel>
        </Step>
        <Step>
          <StepLabel>Payment</StepLabel>
        </Step>
      </Stepper>
      <Box>
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={initialFormValues}
          validationSchema={checkoutSchema[activeStep]}
          enableReinitialize
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
            setFieldValue,
          }) => (
            <form onSubmit={handleSubmit}>
              {isFirstStep && (
                <Shipping
                  values={values}
                  errors={errors}
                  touched={touched}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  setFieldValue={setFieldValue}
                />
              )}
              {isSecondStep && (
                <Payment
                  values={values}
                  errors={errors}
                  touched={touched}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  setFieldValue={setFieldValue}
                />
              )}
              <Box display="flex" justifyContent="space-between" gap="50px">
                {!isFirstStep && (
                  <Button
                    fullWidth
                    color="primary"
                    variant="contained"
                    sx={{
                      backgroundColor: shades.primary[200],
                      boxShadow: "none",
                      color: "white",
                      borderRadius: 0,
                      padding: "15px 40px",
                    }}
                    onClick={() => setActiveStep(activeStep - 1)}
                  >
                    Back
                  </Button>
                )}
                <Button
                  fullWidth
                  type="submit"
                  color="primary"
                  variant="contained"
                  sx={{
                    backgroundColor: shades.primary[400],
                    boxShadow: "none",
                    color: "white",
                    borderRadius: 0,
                    padding: "15px 40px",
                  }}
                >
                  {!isSecondStep ? "Next" : "Place Order"}
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

export default Checkout;