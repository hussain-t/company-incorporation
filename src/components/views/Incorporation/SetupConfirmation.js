import useStepper from "../../../hooks/useStepper";
import Button from "../../shared/Button";
import useReadStepData from "../../../hooks/useReadStepData";

const SetupConfirmation = ({ stepId }) => {
  const { stepperActions, stepperState } = useStepper(stepId);
  const companyDetails = useReadStepData("CompanyDetails", stepperState.steps);
  return (
    <div>
      <h2>
        Congratulations! You have successfully incorporated{" "}
        {companyDetails.companyName} 🎉
      </h2>
      <Button
        className="btn btn-primary"
        onClick={() => stepperActions.cleanSteps()}
      >
        Start Incorporation
      </Button>
    </div>
  );
};

export default SetupConfirmation;
