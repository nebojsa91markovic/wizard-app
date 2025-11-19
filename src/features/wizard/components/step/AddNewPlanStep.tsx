import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { updateStepData, type StatePlan } from "../../model";
import type { WizardStepProps } from "../../types";

const AddNewPlanStep = ({ onValidate, stepId }: WizardStepProps) => {
  const dispatch = useAppDispatch();

  const { data } = useAppSelector((state) => state.wizard);
  const { plan } = data;

  useEffect(() => {
    onValidate(!!plan?.name.trim());
  }, [plan?.name, onValidate]);

  const updatePlan = <K extends keyof StatePlan>(
    key: K,
    value: StatePlan[K]
  ) => {
    dispatch(
      updateStepData({
        stepId,
        payload: { [key]: value },
      })
    );
  };

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;

    updatePlan("name", name);
  };

  const handleChangeExtraInfo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isExtraInfoRequired = e.target.checked;

    updatePlan("isExtraInfoRequired", isExtraInfoRequired);
  };

  return (
    <div>
      <div className="mb-2">
        <div>
          <input
            type="text"
            className="w-full"
            value={plan?.name}
            onChange={handleChangeName}
            placeholder="Plan name"
          />
        </div>
      </div>
      <div>
        <input
          type="checkbox"
          checked={plan?.isExtraInfoRequired}
          onChange={handleChangeExtraInfo}
        />{" "}
        <label>Desctription is required for the plan</label>
      </div>
    </div>
  );
};

export default AddNewPlanStep;
