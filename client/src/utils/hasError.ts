import { FieldErrors } from "react-hook-form";
import { FormRegisterI, FormLoginI } from "../components/FormInput/models";

export const hasError = (
  errors: FieldErrors<FormRegisterI> | FieldErrors<FormLoginI> | undefined,
  name: "name" | "email" | "password"
): boolean => {
  if (errors && "email" in errors && name === "email") {
    return !!errors.email;
  } else if (errors && "name" in errors && name === "name") {
    return !!errors.name;
  } else if (errors && "password" in errors && name === "password") {
    return !!errors.password;
  }
  return false;
};
