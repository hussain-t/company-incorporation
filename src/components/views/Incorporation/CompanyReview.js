import useStepper from "../../../hooks/useStepper";
import useReadStepData from "../../../hooks/useReadStepData";
import Button from "../../shared/Button";
import Card from "../../shared/Card";

const CompanyReview = ({ stepId }) => {
  const { stepperActions, stepperState } = useStepper(stepId);
  const incorporatorInfo = useReadStepData(
    "AddIncorporator",
    stepperState.steps
  );
  const companyDetails = useReadStepData("CompanyDetails", stepperState.steps);
  const foundingTeam = useReadStepData("FoundingTeam", stepperState.steps);
  const boardOfDirectors = useReadStepData(
    "BoardOfDirectors",
    stepperState.steps
  );

  return (
    <div>
      <Card>
        <h2>Incoporator Details</h2>
        <p>{`Name - ${incorporatorInfo.name}`}</p>
        <p>{`Email - ${incorporatorInfo.email}`}</p>
        <p>{`Phone - ${incorporatorInfo.phone}`}</p>
      </Card>
      <Card>
        <h2>Company Details</h2>
        <p>{`Company name - ${companyDetails.companyName}`}</p>
        <p>{`Website - ${companyDetails.website}`}</p>
      </Card>
      <Card>
        <h2>Founding Team</h2>
        <div>
          {foundingTeam.hasCofounder ? (
            <>
              <p>{`Co-founder Name - ${foundingTeam.cofounderName}`}</p>
              <p>{`Co-founder Email - ${foundingTeam.cofounderEmail}`}</p>
            </>
          ) : (
            <p>Solo Founder Company</p>
          )}
        </div>
      </Card>
      <Card>
        <h2>Board of Directors</h2>
        {Object.entries(boardOfDirectors).map(([key, value]) => (
          <p>
            {key} - {value ? "Yes" : "No"}
          </p>
        ))}
      </Card>
      <Button
        className="btn btn-secondary"
        onClick={() => stepperActions.setPreviousStep()}
      >
        Back
      </Button>
      <Button
        className="btn btn-primary"
        onClick={() => stepperActions.setNextStep()}
      >
        Complete
      </Button>
    </div>
  );
};

export default CompanyReview;
