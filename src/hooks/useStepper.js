import { useMemo, useContext } from "react";
import { StepperContext } from "../contexts/StepperContext";

const useStepper = (stepId) => {
  const { state, actions } = useContext(StepperContext);

  const currentStepData = useMemo(() => {
    let stepData;
    if (stepId) {
      stepData = state.steps.find((step) => step.id === stepId)?.data;
    }
    return stepData;
  }, [state.steps, stepId]);

  return useMemo(
    () => ({
      stepperActions: actions,
      stepperState: state,
      currentStepData,
    }),
    [actions, currentStepData, state]
  );
};

export default useStepper;
