import { Button } from "@/components";
import styles from "./WizardNavigation.module.scss";

export interface WizardNavigationProps {
  disablePrev: boolean;
  disableNext: boolean;
  isLastStep: boolean;
  onPrev: () => void;
  onNext: () => void;
}

const WizardNavigation = ({
  disablePrev,
  disableNext,
  isLastStep,
  onPrev,
  onNext,
}: WizardNavigationProps) => {
  return (
    <div className={styles["wizard-navigation"]}>
      <Button className="mr-4 pr-10" disabled={disablePrev} onClick={onPrev}>
        <span className="mr-6">{"<"}</span> Prev{" "}
      </Button>{" "}
      <Button className="pl-10" disabled={disableNext} onClick={onNext}>
        <span>{isLastStep ? "Add" : "Next"}</span>{" "}
        <span className="ml-6">{">"}</span>{" "}
      </Button>{" "}
    </div>
  );
};
export default WizardNavigation;
