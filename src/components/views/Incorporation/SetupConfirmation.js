import useStepper from "../../../hooks/useStepper";
import useReadStepData from "../../../hooks/useReadStepData";

const SetupConfirmation = ({ stepId }) => {
  const { stepperState } = useStepper(stepId);
  const companyDetails = useReadStepData("CompanyDetails", stepperState.steps);
  return (
    <div>
      <h2>
        Congratulations! You have successfully incorporated{" "}
        {companyDetails.companyName} 🎉
      </h2>
    </div>
  );
};

export default SetupConfirmation;
