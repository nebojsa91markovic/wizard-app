import { SuccessIcon } from "@/assets/icons/";
import styles from "./WizardCompleted.module.scss";
import { Button } from "@/components";
import { useAppDispatch } from "@/hooks";
import { resetWizard } from "../model";

const WizardCompleted = () => {
  const dispatch = useAppDispatch();

  const createNewAccount = () => {
    dispatch(resetWizard());
  };

  return (
    <div className={styles["wizard-completed"]}>
      <img
        src={SuccessIcon}
        alt="Success"
        width={100}
        height={100}
        className={styles["success-icon"]}
      />

      <h2>User account created successfully!</h2>
      <Button variant="secondary" onClick={createNewAccount}>
        Create another account
      </Button>
    </div>
  );
};

export default WizardCompleted;
