import useStepper from "../../../hooks/useStepper";
import useReadStepData from "../../../hooks/useReadStepData";

const SetupConfirmation = ({ stepId }) => {
  const { stepperState } = useStepper(stepId);
  const companyDetails = useReadStepData("CompanyDetails", stepperState.steps);
  return (
    <div>
      <h2>
        Congratulations! You have successfully setup your company{" "}
        {companyDetails.companyName} 🎉
      </h2>
      <p>It will take 3-5 days to incorporate your company in Delaware.</p>
    </div>
  );
};

export default SetupConfirmation;
