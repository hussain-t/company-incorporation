import React, { useReducer } from "react";

const ActionKeys = {
  VALIDATE: "VALIDATE",
  RESET: "RESET",
};

const FormContext = React.createContext();

const initialState = {
  data: {},
  errors: [],
  validators: null,
};

const handlerInput = (state, target) => {
  const { name, value, checked, type } = target;
  const { data: formData, errors, validators } = state;

  const newFormData = { ...formData };

  if (type === "checkbox") {
    newFormData[name] = checked;
  } else {
    newFormData[name] = value;
  }

  const newErrors = errors.filter((e) => !e.hasOwnProperty(name));
  let validationResult;
  /**
   * Check if custom validator is passed
   * in the FormContext Provider
   */
  if (validators[name] && typeof validators[name] === "function") {
    validationResult = validators[name](value);
  }

  /**
   * If validator return an error,
   * set it to the form field.
   * If no error, set the data.
   */
  if (validationResult) {
    if (!validationResult.error) {
      newFormData[name] = validationResult.data;
    } else {
      newErrors.push({
        [name]: validationResult.error,
      });
    }
  }

  return {
    data: newFormData,
    errors: newErrors,
  };
};

const reducer = (state, action) => {
  switch (action.type) {
    case ActionKeys.VALIDATE:
      const { data, errors } = handlerInput(state, action.payload);
      return {
        ...state,
        data,
        errors,
      };
    case ActionKeys.RESET:
      return {
        ...state,
        data: action.payload,
      };
    default:
      throw new Error("Unsupported action type.");
  }
};

const FormContextProvider = ({
  children,
  initialFormState,
  validators = {},
}) => {
  const initialStateToUse = {
    ...initialState,
    data: {
      ...initialFormState,
    },
    validators,
  };
  const [state, dispatch] = useReducer(reducer, initialStateToUse);
  const actions = {
    validator: (event) =>
      dispatch({ type: ActionKeys.VALIDATE, payload: event.target }),
    reset: () =>
      dispatch({ type: ActionKeys.RESET, payload: initialFormState }),
  };
  const value = {
    state,
    actions,
  };

  return <FormContext.Provider value={value}>{children}</FormContext.Provider>;
};

const FormContextConsumer = FormContext.Consumer;

export { FormContext, FormContextProvider, FormContextConsumer };
