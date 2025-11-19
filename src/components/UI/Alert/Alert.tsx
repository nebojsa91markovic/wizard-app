import { Button } from "../Button";
import styles from "./Alert.module.scss";

const Alert = ({
  message,
  type = "error",
  onClose,
}: {
  message: string;
  type: "error" | "success";
  onClose: () => void;
}) => {
  if (!message) return null;

  return (
    <div className={`${styles.alert} ${styles[type]}`}>
      {message}

      <Button className="ml-2" onClick={onClose}>
        {" "}
        X{" "}
      </Button>
    </div>
  );
};

export default Alert;
