import { useAppDispatch, useAppSelector } from "@/hooks";
import WizardNavigation from "./WizardNavigation";
import {
  AccountTypeStep,
  AddNewPlanStep,
  PlanChooseStep,
  UserInfoStep,
} from "./step";
import { useCallback, useState } from "react";
import {
  clearStepData,
  defaultInitialSteps,
  nextStep,
  prevStep,
  setSteps,
  submitWizard,
} from "../model";
import { WIZARD_STEPS, type WizardStepId } from "../data/config";
import { Stepper } from "@/components";
import style from "./WizardFlow.module.scss";
import type { ValidateCallback, WizardStepProps } from "../types";

const WizardFlow = () => {
  const dispatch = useAppDispatch();
  const { steps, currentStepIndex, data } = useAppSelector(
    (state) => state.wizard
  );

  const [isStepValid, setIsStepValid] = useState(false);
  const activeStep = steps[currentStepIndex];

  const isFinalForm = activeStep.id === "userInfo";

  const handleValidate: ValidateCallback = useCallback((valid) => {
    setIsStepValid(valid);
  }, []);

  const handleSubmitAccount = async () => {
    dispatch(submitWizard());
  };

  const handleStepNavigation = () => {
    const activeStep = steps[currentStepIndex];

    if (activeStep.id === "planChoose") {
      if (data.plan?.isNewPlan) {
        dispatch(
          setSteps([
            ...defaultInitialSteps,
            WIZARD_STEPS.addNewPlan,
            WIZARD_STEPS.userInfo,
          ])
        );
      } else {
        dispatch(setSteps([...defaultInitialSteps, WIZARD_STEPS.userInfo]));
      }
    }
    dispatch(nextStep());
  };

  const handleNext = () => {
    if (isFinalForm) {
      handleSubmitAccount();
    } else {
      handleStepNavigation();
    }
  };

  const handlePrev = () => {
    const prevIndex = currentStepIndex - 1;
    const prevStepId = steps[prevIndex].id;

    if (steps[prevIndex].id !== "addNewPlan")
      dispatch(clearStepData(steps[prevIndex].stepId));

    if (prevStepId === "planChoose") {
      dispatch(setSteps([...defaultInitialSteps]));
    }
    dispatch(prevStep());
  };

  const StepComponents: Record<
    WizardStepId,
    React.ComponentType<WizardStepProps>
  > = {
    accountType: AccountTypeStep,
    planChoose: PlanChooseStep,
    addNewPlan: AddNewPlanStep,
    userInfo: UserInfoStep,
  };

  const showDummyStep = steps.length < 3;

  const ActiveStepComponent = StepComponents[activeStep.id];
  if (!ActiveStepComponent) return null;

  return (
    <>
      <h2 className="mb-4"> Create User - New Account</h2>
      <div className={style["wizard-flow"]}>
        {steps.map((step, index) => (
          <Stepper
            key={index}
            step={step}
            index={index}
            currentStepIndex={currentStepIndex}
            isLast={!showDummyStep && index === steps.length - 1}
          />
        ))}

        {showDummyStep && (
          <Stepper
            step={undefined}
            index={steps.length + 1}
            currentStepIndex={currentStepIndex}
            isLast={true}
          />
        )}
      </div>

      <ActiveStepComponent
        onValidate={handleValidate}
        stepId={activeStep.stepId}
      />
      <WizardNavigation
        disablePrev={currentStepIndex === 0}
        disableNext={!isStepValid}
        isLastStep={isFinalForm}
        onPrev={handlePrev}
        onNext={handleNext}
      />
    </>
  );
};

export default WizardFlow;
