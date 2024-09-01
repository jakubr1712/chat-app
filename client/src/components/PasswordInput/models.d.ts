import { UseFormRegister, RefCallback, FieldErrors } from "react-hook-form";
import { FormRegisterI, FormLoginI } from "../FormInput/models";

export interface PasswordInputProps {
  name: "name" | "password" | "email";
  placeholder?: string;
  refCallback?: RefCallback;
  errors?: FieldErrors<FormRegisterI> | FieldErrors<FormLoginI>;
  register?: UseFormRegister<FormRegisterI> | UseFormRegister<FormLoginI>;
  className?: string;
  withoutLabel?: boolean;
  hidePasswordButton?: boolean;
}
