import { useContext } from "react";
import {
  FormContextProvider,
  FormContext,
} from "../../../contexts/FormContext";
import FormInput from "../../shared/FormInput";
import Button from "../../shared/Button";
import useStepper from "../../../hooks/useStepper";
import useReadStepData from "../../../hooks/useReadStepData";

const AddIncorporatorInner = ({ stepId }) => {
  const {
    state: { data: formData },
  } = useContext(FormContext);
  const { stepperActions } = useStepper(stepId);

  const submitHandler = (e) => {
    e.preventDefault();
    stepperActions.setCompleteStep({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
    });
  };

  return (
    <div>
      <h2>Add Incoporator Details</h2>
      <form onSubmit={submitHandler}>
        <FormInput
          type="text"
          name="name"
          placeholder="John Doe"
          label="Legal Name"
          required
        />
        <FormInput
          type="email"
          name="email"
          placeholder="john@doe.com"
          label="Email"
          required
        />
        <FormInput
          type="text"
          name="phone"
          placeholder="+125555551212"
          label="Phone"
          required
        />
        <Button
          className="btn btn-secondary"
          onClick={() => stepperActions.setPreviousStep()}
        >
          Back
        </Button>
        <Button className="btn btn-primary" type="submit">
          Next
        </Button>
      </form>
    </div>
  );
};

const AddIncorporator = ({ stepId }) => {
  const { stepperState } = useStepper(stepId);
  const incorporatorInfo = useReadStepData(
    "AddIncorporator",
    stepperState.steps
  );
  const initialFormState = {
    name: incorporatorInfo?.name || "",
    email: incorporatorInfo?.email || "",
    phone: incorporatorInfo?.phone || "",
  };

  // Can have custom validations
  const validators = {};

  return (
    <FormContextProvider
      initialFormState={initialFormState}
      validators={validators}
    >
      <AddIncorporatorInner stepId={stepId} />
    </FormContextProvider>
  );
};

export default AddIncorporator;
