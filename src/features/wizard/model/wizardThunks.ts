import { createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "@/store";
import { submitWizardData } from "@/api/wizardApi";
import type { Data } from "./wizardTypes";

export const submitWizard = createAsyncThunk(
  "wizard/submitWizard",
  async (_, { getState }) => {
    const state = getState() as RootState;
    const data: Data = state.wizard.data;

    if (!data.accountType || !data.plan || !data.userInfo) {
      return Promise.reject("Missing required wizard data");
    }

    const { isNewPlan: _isNewPlan, ...planWithoutIsNewPlan } = data.plan;

    const payload: Data = {
      ...data,
      plan: planWithoutIsNewPlan,
    };

    const response = await submitWizardData(payload);
    return response;
  }
);
