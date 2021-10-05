import { useMemo } from "react";

const useReadStepData = (stepId, steps) => {
  return useMemo(() => {
    return steps.find((step) => step.id === stepId)?.data;
  }, [stepId, steps]);
};

export default useReadStepData;
