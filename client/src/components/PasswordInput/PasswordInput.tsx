import { useState, FC } from "react";
import { FormFeedback } from "reactstrap";
import classNames from "classnames";
import { PasswordInputProps } from "./models";
import { errorMessage } from "../../utils/errorMessage";
import { hasError } from "../../utils/hasError";

const PasswordInput: FC<PasswordInputProps> = ({
  name,
  placeholder,
  refCallback,
  errors,
  register,
  className,
  hidePasswordButton,
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <div className="position-relative mb-3">
      <input
        type={showPassword ? "text" : "password"}
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
        autoComplete={name}
      />
      {errorMessage(errors, name) ? (
        <FormFeedback type="invalid">
          {" "}
          {errorMessage(errors, name)}
        </FormFeedback>
      ) : null}
      {!hidePasswordButton && (
        <button
          className="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted"
          type="button"
          onClick={() => {
            setShowPassword((prev) => !prev);
          }}
          data-password={showPassword ? "true" : "false"}
        >
          {showPassword ? "Hide" : "Show"}
        </button>
      )}
    </div>
  );
};

export default PasswordInput;
