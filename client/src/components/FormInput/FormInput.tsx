import React from "react";
import { Input, Label, FormFeedback } from "reactstrap";
import PasswordInput from "../PasswordInput";
import classNames from "classnames";
import { FormInputProps } from "./models";
import { errorMessage } from "../../utils/errorMessage";
import { hasError } from "../../utils/hasError";

const FormInput: React.FunctionComponent<FormInputProps> = ({
  label,
  type,
  name,
  placeholder,
  register,
  errors,
  className,
  labelClassName,
  refCallback,
  withoutLabel,
  hidePasswordButton,
  ...otherProps
}) => {
  return (
    <>
      {type === "hidden" ? (
        <input
          type={type}
          name={name}
          {...(register ? register(name) : {})}
          {...otherProps}
        />
      ) : (
        <>
          {type === "password" ? (
            <>
              {label ? (
                <>
                  <Label htmlFor={name} className={labelClassName}>
                    {label}
                  </Label>
                </>
              ) : null}
              <PasswordInput
                name={name}
                placeholder={placeholder}
                refCallback={refCallback}
                errors={errors}
                register={register}
                className={className}
                withoutLabel={withoutLabel}
                hidePasswordButton={hidePasswordButton}
              />
            </>
          ) : (
            <>
              {type === "checkbox" || type === "radio" ? (
                <>
                  <div className="form-check">
                    <Input
                      className={className}
                      type={type}
                      name={name}
                      id={name}
                      ref={(r: HTMLInputElement) => {
                        if (refCallback) refCallback(r);
                      }}
                      invalid={hasError(errors, name) ? true : undefined}
                      {...(register ? register(name) : {})}
                      {...otherProps}
                    />
                    <Label for="remember-check">Remember me</Label>
                  </div>
                  {errorMessage(errors, name) ? (
                    <FormFeedback type="invalid">
                      {" "}
                      {errorMessage(errors, name)}
                    </FormFeedback>
                  ) : null}
                </>
              ) : (
                <>
                  {label ? (
                    <Label htmlFor={name} className={labelClassName}>
                      {label}
                    </Label>
                  ) : null}
                  <input
                    type={type}
                    placeholder={placeholder}
                    name={name}
                    id={name}
                    ref={(r: HTMLInputElement) => {
                      if (refCallback) refCallback(r);
                    }}
                    className={classNames(className, {
                      "is-invalid": hasError(errors, name),
                    })}
                    {...(register ? register(name) : {})}
                    {...otherProps}
                    autoComplete={name}
                    tag="input"
                  />
                  {errorMessage(errors, name) ? (
                    <FormFeedback type="invalid">
                      {" "}
                      {errorMessage(errors, name)}
                    </FormFeedback>
                  ) : null}
                </>
              )}
            </>
          )}
        </>
      )}
    </>
  );
};

export default FormInput;
