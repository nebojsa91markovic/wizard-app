import { useAppDispatch, useAppSelector } from "@/hooks";
import styles from "./WizardPage.module.scss";
import {
  clearError,
  WizardCompleted,
  WizardFlow,
  WizardLoading,
} from "@/features/wizard";
import Alert from "@/components/UI/Alert/Alert";

const WizardPage = () => {
  const dispatch = useAppDispatch();
  const { isCompleted, isSubmitting, error } = useAppSelector(
    (state) => state.wizard
  );

  const currentKey = isCompleted
    ? "completed"
    : isSubmitting
    ? "submitting"
    : "flow";

  const CurrentComponent = {
    completed: WizardCompleted,
    submitting: WizardLoading,
    flow: WizardFlow,
  }[currentKey];

  const handleCloseAlert = () => {
    dispatch(clearError());
  };

  return (
    <div className={styles["wizard-container"]}>
      {error && (
        <Alert message={error} type="error" onClose={handleCloseAlert} />
      )}

      <CurrentComponent />
    </div>
  );
};

export default WizardPage;
