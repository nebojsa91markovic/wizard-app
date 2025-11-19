import { useEffect, useState } from "react";
import { Button } from "@/components";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { generateRandomId } from "@/utils";
import styles from "./WizardStep.module.scss";
import { saveStepData, type StatePlan } from "../../model";
import type { WizardStepProps } from "../../types";

const PlanChooseStep = ({ onValidate, stepId }: WizardStepProps) => {
  const dispatch = useAppDispatch();
  const { data } = useAppSelector((state) => state.wizard);
  const { plan: selectedPlan } = data;

  const [newPlanId] = useState<number>(() => generateRandomId());

  const newPlanObject: StatePlan = {
    id: newPlanId,
    name: "",
    isExtraInfoRequired: false,
    isNewPlan: true,
  };

  useEffect(() => {
    onValidate(!!selectedPlan);
  }, [selectedPlan, onValidate]);

  const handleSelect = (plan: StatePlan) => {
    const isSame = selectedPlan?.id === plan.id;
    const newValue = isSame ? null : plan;

    dispatch(
      saveStepData({
        stepId: stepId,
        payload: newValue,
      })
    );
  };

  if (!data.accountType) return;

  return (
    <div className={styles["wizard-step-wrapper"]}>
      {data.accountType.plan.map((plan) => (
        <Button
          key={plan.id}
          active={selectedPlan?.id === plan.id}
          className="py-4"
          onClick={() => handleSelect(plan)}
        >
          {plan.name}
        </Button>
      ))}
      <Button
        key="add-new"
        active={selectedPlan?.id === newPlanId}
        className="py-4"
        onClick={() => handleSelect(newPlanObject)}
      >
        Add new
      </Button>
    </div>
  );
};

export default PlanChooseStep;
