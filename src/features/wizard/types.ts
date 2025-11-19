import type { Data } from "./model";

export type ValidateCallback = (isValid: boolean) => void;

export type StepId = keyof Data;

export interface WizardStepProps {
  onValidate: ValidateCallback;
  stepId: StepId;
}

export type StepStatus = "finished" | "current" | "future";
