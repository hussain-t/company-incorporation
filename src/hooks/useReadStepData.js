import { useMemo } from "react";

/**
 *
 * @param {string} stepId
 * @param {steps[]} steps
 * @returns the step data
 */
const useReadStepData = (stepId, steps) => {
  return useMemo(() => {
    return steps?.find((step) => step.id === stepId)?.data;
  }, [stepId, steps]);
};

export default useReadStepData;
