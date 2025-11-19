import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { WIZARD_STEPS, type Step } from "../data/config";
import { accountType } from "../data/wizardData.json";
import type { WizardState } from "./wizardTypes";
import { submitWizard } from "./wizardThunks";

export const defaultInitialSteps = [
  WIZARD_STEPS.accountType,
  WIZARD_STEPS.planChoose,
];

const initialState: WizardState = {
  currentStepIndex: 0,
  accountType,
  steps: defaultInitialSteps,
  data: {
    accountType: null,
    plan: null,
    userInfo: null,
  },
  isCompleted: false,
  isSubmitting: false,
  error: null,
};

type WizardDataKey = keyof WizardState["data"];

export const wizardSlice = createSlice({
  name: "wizard",
  initialState,
  reducers: {
    setSteps(state, action: PayloadAction<Step[]>) {
      state.steps = action.payload;
    },
    nextStep(state) {
      if (state.currentStepIndex < state.steps.length - 1)
        state.currentStepIndex += 1;
    },
    prevStep(state) {
      if (state.currentStepIndex > 0) state.currentStepIndex -= 1;
    },
    saveStepData<K extends WizardDataKey>(
      state: WizardState,
      action: PayloadAction<{ stepId: K; payload: WizardState["data"][K] }>
    ) {
      const { stepId, payload } = action.payload;
      state.data[stepId] = payload;
    },
    updateStepData<K extends WizardDataKey>(
      state: WizardState,
      action: PayloadAction<{
        stepId: K;
        payload: Partial<WizardState["data"][K]>;
      }>
    ) {
      const { stepId, payload } = action.payload;
      state.data[stepId] = {
        ...state.data[stepId],
        ...payload,
      };
    },
    clearStepData<K extends WizardDataKey>(
      state: WizardState,
      action: PayloadAction<K>
    ) {
      state.data[action.payload] = null;
    },
    clearError(state) {
      state.error = null;
    },
    resetWizard: () => ({
      ...initialState,
      isCompleted: false,
    }),
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitWizard.pending, (state) => {
        state.isSubmitting = true;
      })
      .addCase(submitWizard.fulfilled, (state) => {
        state.isSubmitting = false;
        state.isCompleted = true;
      })
      .addCase(submitWizard.rejected, (state, action) => {
        state.isSubmitting = false;
        state.error = action.error.message || "Something went wrong";
      });
  },
});

export const {
  setSteps,
  nextStep,
  prevStep,
  saveStepData,
  updateStepData,
  clearStepData,
  clearError,
  resetWizard,
} = wizardSlice.actions;

export default wizardSlice.reducer;
