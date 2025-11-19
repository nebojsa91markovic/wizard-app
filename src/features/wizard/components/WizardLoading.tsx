import { Spinner } from "@/components";
import styles from "./WizardLoading.module.scss";

const WizardLoading = () => {
  return (
    <div className={styles["wizard-loading"]}>
      <Spinner width={100} height={100} />
    </div>
  );
};

export default WizardLoading;
