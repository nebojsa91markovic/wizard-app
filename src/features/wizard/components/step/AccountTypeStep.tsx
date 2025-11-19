import { useAppDispatch, useAppSelector } from "@/hooks";
import { Button } from "@/components";
import styles from "./WizardStep.module.scss";
import { useEffect } from "react";
import { saveStepData, type AccountType } from "../../model";
import type { WizardStepProps } from "../../types";

const AccountTypeStep = ({ onValidate, stepId }: WizardStepProps) => {
  const dispatch = useAppDispatch();
  const { accountType, data } = useAppSelector((state) => state.wizard);

  const { accountType: selectedAccount } = data;

  useEffect(() => {
    onValidate(!!selectedAccount);
  }, [selectedAccount, onValidate]);

  const handleSelect = (account: AccountType) => {
    const isSame = selectedAccount?.id === account.id;
    const newValue = isSame ? null : account;

    dispatch(
      saveStepData({
        stepId: stepId,
        payload: newValue,
      })
    );
  };
  return (
    <div className={styles["wizard-step-wrapper"]}>
      {accountType &&
        accountType.map((account) => (
          <Button
            key={account.id}
            active={selectedAccount?.id === account.id}
            className="py-4"
            onClick={() => handleSelect(account)}
          >
            {account.name}
          </Button>
        ))}
    </div>
  );
};

export default AccountTypeStep;
