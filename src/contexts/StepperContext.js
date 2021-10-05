import React, { useReducer } from "react";

const initialState = {
  currentStep: 0,
  steps: [],
  version: 0,
};

const ActionKeys = {
  SET_STEPS: "SET_STEPS",
  SET_STEP_DATA: "SET_STEP_DATA",
  SET_CURRENT_STEP_DATA: "SET_CURRENT_STEP_DATA",
  SET_COMPLETE_STEP: "SET_COMPLETE_STEP",
  CLEAN_STEPS: "CLEAN_STEPS",
};

const StepperContext = React.createContext({});

const getCurrentStep = (state, nextStep) =>
  nextStep < state.steps.length ? nextStep : state.currentStep;

const cloneState = (state) => ({
  ...state,
  steps: [...state.steps],
});

const getStepData = (data) => {
  let stepData;
  if (typeof data === "string") {
    stepData = data;
  } else if (typeof data === "object" && data !== null) {
    stepData = {
      ...data,
    };
  }
  return stepData;
};

const reducer = (state, action) => {
  let nextState;
  switch (action.type) {
    /**
     * Sets the steps array
     */
    case ActionKeys.SET_STEPS:
      return {
        ...state,
        steps: [...action.payload],
        version: 0,
      };
    /**
     * Sets current step data
     */
    case ActionKeys.SET_CURRENT_STEP_DATA:
      nextState = cloneState(state);
      nextState.steps[action.payload.step].data = getStepData(
        action.payload.data
      );
      nextState.version += 1;
      return nextState;
    /**
     * Sets Next and Previous steps
     */
    case ActionKeys.SET_STEP_DATA:
      nextState = cloneState(state);

      if (action.payload.data !== undefined) {
        nextState.steps[state.currentStep].data = getStepData(
          action.payload.data
        );
      }
      nextState.currentStep = getCurrentStep(state, action.payload.step);
      return nextState;
    /**
     * Sets the complete steps
     */
    case ActionKeys.SET_COMPLETE_STEP:
      nextState = cloneState(state);

      nextState.steps[state.currentStep].completed = true;
      if (action.payload.data !== undefined) {
        nextState.steps[state.currentStep].data = getStepData(
          action.payload.data
        );
      }
      nextState.currentStep = getCurrentStep(state, action.payload.step);
      nextState.version += 1;
      return nextState;
    /**
     *  Cleans the state
     */
    case ActionKeys.CLEAN_STEPS:
      return initialState;
    default:
      throw new Error("Action type is not supported");
  }
};

const StepperContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const actions = {
    setSteps: (steps) => {
      dispatch({ type: ActionKeys.SET_STEPS, payload: steps });
    },
    setCurrentStepData: (data) => {
      dispatch({
        type: ActionKeys.SET_CURRENT_STEP_DATA,
        payload: {
          data,
          step: state.currentStep,
        },
      });
    },
    setNextStep: (data) => {
      dispatch({
        type: ActionKeys.SET_STEP_DATA,
        payload: {
          data,
          step: state.currentStep + 1,
        },
      });
    },
    setPreviousStep: (data) => {
      dispatch({
        type: ActionKeys.SET_STEP_DATA,
        payload: {
          data,
          step: state.currentStep - 1,
        },
      });
    },
    setCompleteStep: (data) => {
      dispatch({
        type: ActionKeys.SET_COMPLETE_STEP,
        payload: {
          data,
          step: state.currentStep + 1,
        },
      });
    },
    cleanSteps: () => {
      dispatch({
        type: ActionKeys.CLEAN_STEPS,
      });
    },
  };

  const value = {
    state,
    actions,
  };

  return (
    <StepperContext.Provider value={value}>{children}</StepperContext.Provider>
  );
};

const StepperContextConsumer = StepperContext.Consumer;

export { StepperContext, StepperContextProvider, StepperContextConsumer };
