import { useState } from "react";
import { Alert, Row, Col, Form, Button } from "reactstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import NoAuthLayoutWrapper from "../components/NoAuthLayoutWrapper";
import AuthHeader from "../components/AuthHeader";
import FormInput from "../components/FormInput";
import { FormRegisterI } from "../components/FormInput/models";

import { registerRoute } from "../APIRoutes";

const Register = () => {
  const [registrationError, setRegistrationError] = useState<string>("");
  const [isUser, setIsUser] = useState<boolean>(false);
  const resolver = yupResolver(
    yup.object().shape({
      email: yup
        .string()
        .email("This value should be a valid email.")
        .required("Please Enter E-mail."),
      name: yup.string().required("Please Enter UserName."),
      password: yup.string().required("Please Enter Password."),
    })
  );

  const defaultValues: FormRegisterI = {
    name: "",
    email: "",
    password: "",
  };

  const methods = useForm({ defaultValues, resolver });
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = methods;

  const onSubmitForm = async (values: FormRegisterI) => {
    setRegistrationError("");
    setIsUser(false);

    const { email, name, password } = values;
    const { data } = await axios.post(registerRoute, {
      username: name,
      email,
      password,
    });

    if (data.status === false) {
      setRegistrationError(data.msg);
    }
    if (data.status === true) {
      setIsUser(true);
      localStorage.setItem(
        import.meta.env.VITE_APP_KEY,
        JSON.stringify(data.user)
      );
    }
  };

  return (
    <NoAuthLayoutWrapper>
      <Row className=" justify-content-center my-auto">
        <Col sm={8} lg={6} xl={5} className="col-xxl-4">
          <div className="py-md-5 py-4">
            <AuthHeader
              title="Register Account"
              subtitle="Get your free Chat App account now."
            />

            {isUser ? (
              <Alert color="success">Register User Successfully</Alert>
            ) : null}

            {registrationError && registrationError ? (
              <Alert color="danger">{registrationError}</Alert>
            ) : null}

            <Form
              onSubmit={handleSubmit(onSubmitForm)}
              className="position-relative"
            >
              <div className="mb-3">
                <FormInput
                  label="Email"
                  type="text"
                  name="email"
                  register={register}
                  errors={errors}
                  labelClassName="form-label"
                  placeholder="Enter Email"
                  className="form-control"
                />
              </div>

              <div className="mb-3">
                <FormInput
                  label="Username"
                  type="text"
                  name="name"
                  register={register}
                  errors={errors}
                  labelClassName="form-label"
                  placeholder="Enter username"
                  className="form-control"
                />
              </div>

              <div className="mb-3">
                <FormInput
                  label="Password"
                  type="password"
                  name="password"
                  register={register}
                  errors={errors}
                  labelClassName="form-label"
                  className="form-control pe-5"
                  placeholder="Enter Password"
                />
              </div>

              <div className="text-center mb-3">
                <Button
                  color="primary"
                  className="w-100  waves-effect waves-light"
                  type="submit"
                >
                  Register
                </Button>
              </div>
            </Form>

            <div className="mt-5 text-center text-muted">
              <p>
                Already have an account ?{" "}
                <Link
                  to="/login"
                  className="fw-medium text-decoration-underline"
                >
                  Login
                </Link>
              </p>
            </div>
          </div>
        </Col>
      </Row>
    </NoAuthLayoutWrapper>
  );
};

export default Register;
