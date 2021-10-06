import { useContext } from "react";
import {
  FormContextProvider,
  FormContext,
} from "../../../contexts/FormContext";
import FormInput from "../../shared/FormInput";
import Button from "../../shared/Button";
import useStepper from "../../../hooks/useStepper";
import useReadStepData from "../../../hooks/useReadStepData";

const CompanyDetailsInner = ({ stepId }) => {
  const {
    state: { data: formData },
  } = useContext(FormContext);
  const { stepperActions } = useStepper(stepId);

  const submitHandler = (e) => {
    e.preventDefault();
    stepperActions.setCompleteStep({
      companyName: formData.companyName,
      website: formData.website,
    });
  };
  return (
    <div>
      <h2>Add Company Details</h2>
      <form onSubmit={submitHandler}>
        <FormInput
          type="text"
          name="companyName"
          placeholder="Startbase, Inc."
          required
          label="Company Name"
        />
        <FormInput
          type="text"
          name="website"
          placeholder="startbase.com"
          required
          label="Company Website"
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

const CompanyDetails = ({ stepId }) => {
  const { stepperState } = useStepper(stepId);
  const companyDetails = useReadStepData("CompanyDetails", stepperState.steps);
  const initialFormState = {
    companyName: companyDetails?.companyName || "",
    website: companyDetails?.website || "",
  };

  // Can have custom validations
  const validators = {};

  return (
    <FormContextProvider
      initialFormState={initialFormState}
      validators={validators}
    >
      <CompanyDetailsInner stepId={stepId} />
    </FormContextProvider>
  );
};

export default CompanyDetails;
