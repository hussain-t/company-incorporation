import React, { useContext, useRef } from "react";
import { FormContext } from "../../../contexts/FormContext";
import "./FormInput.css";

const ErrorMessage = ({ children }) => (
  <p style={{ color: "red", fontWeight: "bold", margin: 0 }}>{children}</p>
);

const WrapWithLabel = ({ label, inputControl, name, errorMessage }) => (
  <label htmlFor={name}>
    {label}
    {inputControl}
    {errorMessage}
  </label>
);

const FormInput = ({
  type,
  name,
  className,
  label,
  required,
  disabled,
  htmlId,
  placeholder,
  checked,
  ...otherProps
}) => {
  const {
    actions,
    state: { data: formData, errors },
  } = useContext(FormContext);

  const inputRef = useRef();

  let errorMessage;
  /**
   * Check if the field has default HTML errors
   */
  if (inputRef.current && inputRef.current.validationMessage?.length > 0) {
    errorMessage = (
      <ErrorMessage>{inputRef.current.validationMessage}</ErrorMessage>
    );
  }

  /**
   * Check if the field has custom errors
   */
  const error = errors.find((e) => e.hasOwnProperty(name));
  if (!errorMessage && error) {
    errorMessage = <ErrorMessage>{error[name]}</ErrorMessage>;
  }

  let inputControl;
  let wrappedInput;
  let wrapWithLabel = false;

  switch (type) {
    case "checkbox":
      inputControl = (
        <input
          {...otherProps}
          id={htmlId || name}
          name={name}
          type={type}
          className={className}
          ref={inputRef}
          checked={checked || formData[name]}
          disabled={disabled}
          required={required}
          onChange={actions.validator}
        />
      );
      wrapWithLabel = true;
      break;
    default:
      inputControl = (
        <input
          {...otherProps}
          id={htmlId || name}
          name={name}
          type={type}
          className={className}
          ref={inputRef}
          value={formData[name]}
          disabled={disabled}
          required={required}
          onChange={actions.validator}
        />
      );
      wrapWithLabel = true;
  }

  if (wrapWithLabel && label) {
    wrappedInput = (
      <WrapWithLabel
        name={name}
        label={label}
        inputControl={inputControl}
        errorMessage={errorMessage}
      />
    );
  }

  return <div>{wrappedInput}</div>;
};

export default FormInput;
