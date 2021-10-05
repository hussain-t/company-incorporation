import Stepper, { Step } from "../../shared/Stepper";
import AddIncorporator from "./AddIncorporator";
import BoardOfDirectors from "./BoardOfDirectors";
import CompanyDetails from "./CompanyDetails";
import CompanyReview from "./CompanyReview";
import FoundingTeam from "./FoundingTeam";
import SetupConfirmation from "./SetupConfirmation";
import StartSetup from "./StartSetup";

const Incorporation = () => {
  const onInit = (stepId) => {
    console.log(`StepId - ${stepId}`);
  };
  return (
    <Stepper>
      <Step id="StartSetup" onInit={onInit}>
        <StartSetup />
      </Step>
      <Step id="AddIncorporator" onInit={onInit}>
        <AddIncorporator />
      </Step>
      <Step id="CompanyDetails" onInit={onInit}>
        <CompanyDetails />
      </Step>
      <Step id="FoundingTeam" onInit={onInit}>
        <FoundingTeam />
      </Step>
      <Step id="BoardOfDirectors" onInit={onInit}>
        <BoardOfDirectors />
      </Step>
      <Step id="CompanyReview" onInit={onInit}>
        <CompanyReview />
      </Step>
      <Step id="SetupConfirmation" onInit={onInit}>
        <SetupConfirmation />
      </Step>
    </Stepper>
  );
};

export default Incorporation;
