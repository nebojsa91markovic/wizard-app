import type { StepId } from "../types";

export type WizardStepId =
  | "accountType"
  | "planChoose"
  | "addNewPlan"
  | "userInfo";

export interface WizardStep {
  id: WizardStepId;
  name: string;
  stepId: StepId;
}

export const WIZARD_STEPS = {
  accountType: {
    id: "accountType",
    name: "Account",
    stepId: "accountType",
  },
  planChoose: {
    id: "planChoose",
    name: "Plan",
    stepId: "plan",
  },
  addNewPlan: {
    id: "addNewPlan",
    name: "Add new plan",
    stepId: "plan",
  },
  userInfo: {
    id: "userInfo",
    name: "Information",
    stepId: "userInfo",
  },
} as const satisfies Record<string, WizardStep>;

export type Step = (typeof WIZARD_STEPS)[keyof typeof WIZARD_STEPS];
