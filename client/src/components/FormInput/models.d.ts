import { InputHTMLAttributes, RefCallback } from "react";
import { UseFormRegister, FieldErrors } from "react-hook-form";

export interface FormRegisterI {
  name: string;
  email: string;
  password: string;
}
export interface FormLoginI {
  name: string;
  password: string;
}

export interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  type?: string;
  name: "name" | "email" | "password";
  placeholder?: string;
  register?: UseFormRegister<FormRegisterI> | UseFormRegister<FormLoginI>;
  errors?: FieldErrors<FormRegisterI> | FieldErrors<FormLoginI>;
  className?: string;
  labelClassName?: string;
  refCallback?: RefCallback<HTMLInputElement>;
  withoutLabel?: boolean;
  hidePasswordButton?: boolean;
}
