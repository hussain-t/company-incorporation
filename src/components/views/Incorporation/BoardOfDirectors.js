import { useContext } from "react";
import {
  FormContextProvider,
  FormContext,
} from "../../../contexts/FormContext";
import useStepper from "../../../hooks/useStepper";
import useReadStepData from "../../../hooks/useReadStepData";
import FormInput from "../../shared/FormInput";
import Button from "../../shared/Button";

const BoardOfDirectorsInner = ({ stepId, founders }) => {
  const {
    state: { data: formData },
  } = useContext(FormContext);
  const { stepperActions } = useStepper(stepId);

  const submitHandler = (e) => {
    e.preventDefault();
    stepperActions.setCompleteStep({
      ...formData,
    });
  };
  return (
    <div>
      <h2>Select Your Board Of Directors</h2>
      <form onSubmit={submitHandler}>
        {founders.map((director) => (
          <div key={director.name || director.cofounderName}>
            <FormInput
              type="checkbox"
              name={director.name || director.cofounderName}
              label={director.name || director.cofounderName}
            />
          </div>
        ))}
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

const BoardOfDirectors = ({ stepId }) => {
  const { stepperState } = useStepper(stepId);
  const incorporatorInfo = useReadStepData(
    "AddIncorporator",
    stepperState.steps
  );
  const cofounder = useReadStepData("FoundingTeam", stepperState.steps);
  const boardOfDirectors = useReadStepData(
    "BoardOfDirectors",
    stepperState.steps
  );

  const founders = [incorporatorInfo, cofounder];
  const initialFormState = founders.reduce(
    (acc, cur) => ({
      ...acc,
      ...(cur.name && { [cur.name]: boardOfDirectors?.[cur.name] ?? true }),
      ...(cur.cofounderName && {
        [cur.cofounderName]: boardOfDirectors?.[cur.cofounderName] ?? false,
      }),
    }),
    {}
  );

  return (
    <FormContextProvider initialFormState={initialFormState}>
      <BoardOfDirectorsInner stepId={stepId} founders={founders} />
    </FormContextProvider>
  );
};

export default BoardOfDirectors;
