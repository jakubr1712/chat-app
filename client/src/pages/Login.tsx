import { useState } from "react";
import { Alert, Row, Col, Form, Label, Button } from "reactstrap";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import NoAuthLayoutWrapper from "../components/NoAuthLayoutWrapper";
import AuthHeader from "../components/AuthHeader";
import FormInput from "../components/FormInput";
import { loginRoute } from "../APIRoutes";
import { FormLoginI } from "../components/FormInput/models";

const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string>("");

  const resolver = yupResolver(
    yup.object().shape({
      name: yup.string().required("Please Enter User name."),
      password: yup.string().required("Please Enter Password."),
    })
  );

  const defaultValues = {
    name: "test",
    password: "pasword1234",
  };

  const methods = useForm({ defaultValues, resolver });
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = methods;

  const onSubmitForm = async (values: FormLoginI) => {
    const { name, password } = values;
    const { data } = await axios.post(loginRoute, {
      username: name,
      password,
    });
    if (data.status === false) {
      setError(data.msg);
    }
    if (data.status === true) {
      localStorage.setItem(
        import.meta.env.VITE_APP_KEY,
        JSON.stringify(data.user)
      );
      navigate("/");
    }
  };

  return (
    <NoAuthLayoutWrapper>
      <Row className="justify-content-center my-auto">
        <Col sm={8} lg={6} xl={5} className="col-xxl-4">
          <div className="py-md-5 py-4">
            <AuthHeader
              title="Welcome Back !"
              subtitle="Sign in to continue to Chat App."
            />
            {error && <Alert color="danger">{error}</Alert>}

            <Form
              onSubmit={handleSubmit(onSubmitForm)}
              className="position-relative"
            >
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

              <div className="form-check form-check-info font-size-16">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="remember-check"
                />
                <Label
                  className="form-check-label font-size-14"
                  htmlFor="remember-check"
                >
                  Remember me
                </Label>
              </div>

              <div className="text-center mt-4">
                <Button color="primary" className="w-100" type="submit">
                  Log In
                </Button>
              </div>
            </Form>

            <div className="mt-5 text-center text-muted">
              <p>
                Don't have an account ?{" "}
                <Link
                  to="/register"
                  className="fw-medium text-decoration-underline"
                >
                  Register
                </Link>
              </p>
            </div>
          </div>
        </Col>
      </Row>
    </NoAuthLayoutWrapper>
  );
};

export default Login;
