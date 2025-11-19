import type { Step } from "../data/config";

export interface AccountType {
  id: number;
  name: string;
  plan: Plan[];
}

export interface Plan {
  id: number;
  name: string;
  isExtraInfoRequired: boolean;
}

export interface UserInfo {
  firstName: string;
  lastName: string;
  age: number;
  email: string;
  startDate: string;
  location: string;
  language: string;
  description?: string;
}

export interface StatePlan extends Plan {
  isNewPlan?: boolean;
}

export interface Data {
  accountType: AccountType | null;
  plan: StatePlan | null;
  userInfo: UserInfo | null;
}

export interface WizardState {
  currentStepIndex: number;
  accountType: AccountType[] | null;
  steps: Step[];
  data: Data;
  isCompleted: boolean;
  isSubmitting: boolean;
  error: string | null;
}
