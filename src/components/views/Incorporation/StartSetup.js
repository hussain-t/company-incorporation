import useStepper from "../../../hooks/useStepper";
import Button from "../../shared/Button";

const StartSetup = () => {
  const { stepperActions } = useStepper();
  return (
    <div className="row">
      <h2>Welcome to Startbase! The best way to launch your startup</h2>
      <p>A platform to incorporate your startup with a few clicks</p>

      <Button
        className="btn btn-primary"
        onClick={() => stepperActions.setNextStep()}
      >
        Get Started
      </Button>
    </div>
  );
};

export default StartSetup;
