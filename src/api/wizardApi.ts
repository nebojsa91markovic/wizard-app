import type { Data } from "@/features/wizard";

export const submitWizardData = async (data: Data) => {
  console.log("Submitting wizard data to API (fake)...", data);

  return new Promise<{ success: boolean }>((resolve) => {
    setTimeout(() => resolve({ success: true }), 1000);
  });
};
