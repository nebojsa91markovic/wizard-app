import styles from "./Stepper.module.scss";
import type { Step } from "@/features/wizard/data/config";

interface StepperProps {
  step?: Step;
  index?: number;
  currentStepIndex: number;
  isLast?: boolean;
}

const Stepper = ({
  step,
  index = 0,
  currentStepIndex,
  isLast,
}: StepperProps) => {
  const stepStatusStyleMap: Record<string, string> = {
    finished: styles.finished,
    current: styles.current,
    future: styles.future,
  };

  const getStepStatus = () => {
    if (!step) return stepStatusStyleMap.future;

    if (index < currentStepIndex) return stepStatusStyleMap.finished;
    if (index === currentStepIndex) return stepStatusStyleMap.current;
    return stepStatusStyleMap.future;
  };

  const stepStatus = getStepStatus();

  return (
    <div className={styles.stepper}>
      <div className={`${styles.step} ${stepStatus}`}>
        <div className={styles.circle}>{!step ? "..." : index + 1}</div>
        <span className={styles.label}>{step?.name || ""}</span>
      </div>
      {!isLast && <div className={styles.line} />}
    </div>
  );
};

export default Stepper;
