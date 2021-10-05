import { useContext, useEffect, useState } from "react";
import {
  FormContextProvider,
  FormContext,
} from "../../../contexts/FormContext";
import useStepper from "../../../hooks/useStepper";
import useReadStepData from "../../../hooks/useReadStepData";
import FormInput from "../../shared/FormInput";
import Button from "../../shared/Button";

const FoundingTeamInner = ({ stepId }) => {
  const {
    state: { data: formData, errors },
  } = useContext(FormContext);
  const { stepperActions } = useStepper(stepId);
  const [disabled, setDisabled] = useState(false);
  const coFounder = formData.hasCofounder;

  console.log("errors", errors);

  useEffect(() => {
    const hasError = errors.find(
      (e) =>
        e.hasOwnProperty("cofounderName") || e.hasOwnProperty("cofounderEmail")
    );
    setDisabled(!!hasError);
  }, [errors]);

  const submitHandler = (e) => {
    e.preventDefault();
    stepperActions.setCompleteStep({
      hasCofounder: coFounder,
      ...(coFounder && {
        cofounderName: formData.cofounderName,
        cofounderEmail: formData.cofounderEmail,
      }),
    });
  };
  return (
    <div>
      <h2>Founding Team</h2>
      <form onSubmit={submitHandler}>
        <FormInput
          type="checkbox"
          name="hasCofounder"
          label="Do you have co-founders?"
        />
        {coFounder ? (
          <div className="team-container">
            <FormInput
              type="text"
              name="cofounderName"
              label="Cofounder Name"
              placeholder="John Smith"
              required
            />
            <FormInput
              type="email"
              name="cofounderEmail"
              placeholder="john@smith.com"
              label="Email"
              required
            />
          </div>
        ) : null}
        <Button
          className="btn btn-secondary"
          onClick={() => stepperActions.setPreviousStep()}
        >
          Back
        </Button>
        <Button className="btn btn-primary" type="submit" disabled={disabled}>
          Next
        </Button>
      </form>
    </div>
  );
};

const FoundingTeam = ({ stepId }) => {
  const initialFormState = {
    hasCofounder: false,
    cofounderName: "",
    cofounderEmail: "",
  };

  const { stepperState } = useStepper(stepId);
  const incorporatorInfo = useReadStepData(
    "AddIncorporator",
    stepperState.steps
  );

  /**
   * Adds custom validation to the form,
   * so that two cofounders cannot have
   * the same name or email addresses.
   */
  const validators = {
    cofounderName: (val) => {
      let error;
      if (val === incorporatorInfo.name) {
        error = "Name already exists";
      }
      return {
        data: val,
        error,
      };
    },
    cofounderEmail: (val) => {
      let error;
      if (val === incorporatorInfo.email) {
        error = "Email already exists";
      }
      return {
        data: val,
        error,
      };
    },
  };
  return (
    <FormContextProvider
      initialFormState={initialFormState}
      validators={validators}
    >
      <FoundingTeamInner stepId={stepId} />
    </FormContextProvider>
  );
};

export default FoundingTeam;
