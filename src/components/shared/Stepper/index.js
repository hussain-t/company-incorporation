import React, { useContext, useEffect, useMemo } from "react";
import Step from "./Step";
import {
  StepperContextProvider,
  StepperContext,
} from "../../../contexts/StepperContext";

const StepperInner = ({ children }) => {
  const { state, actions } = useContext(StepperContext);

  let steps = state.steps;
  const childSteps = useMemo(() => {
    const childStepsToUse = children
      .map((c) => {
        if (c.props) {
          const { id, children: child, onInit } = c.props;
          if (c.type.displayName === "Step") {
            if (!steps.find((s) => s.id === id)) {
              steps.push({
                id,
                onInit,
                completed: false,
                error: false,
              });
            }
            return child;
          }
        }
        return null;
      })
      .filter(Boolean);
    console.log("childStepsToUse", childStepsToUse);

    // Store the steps in the stepper context
    actions.setSteps(steps);
    return childStepsToUse;

    // We don't want to run this on each render
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const stepToRender = childSteps[state.currentStep];
  const currentStep = steps[state.currentStep];

  useEffect(() => {
    /**
     * Call the onInit function from the current step component
     * We can pass any values to the `onInit` function
     */
    currentStep.onInit && currentStep.onInit(currentStep.id);
  }, [currentStep]);

  return React.cloneElement(stepToRender, {
    stepId: currentStep.id,
  });
};

const Stepper = ({ children }) => {
  return (
    <StepperContextProvider>
      <StepperInner>{children}</StepperInner>
    </StepperContextProvider>
  );
};

export { Stepper as default, Step };
