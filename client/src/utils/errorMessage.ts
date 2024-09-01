import { FieldErrors } from "react-hook-form";
import { FormRegisterI, FormLoginI } from "../components/FormInput/models";

export const errorMessage = (
  errors: FieldErrors<FormRegisterI> | FieldErrors<FormLoginI> | undefined,
  name: "name" | "email" | "password"
): string | undefined => {
  if (errors && "email" in errors && name === "email") {
    return errors.email?.message;
  } else if (errors && "name" in errors && name === "name") {
    return errors.name?.message;
  } else if (errors && "password" in errors && name === "password") {
    return errors.password?.message;
  }
  return undefined;
};
