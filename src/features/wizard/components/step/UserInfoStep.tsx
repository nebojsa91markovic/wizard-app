import { useEffect, useMemo, useRef } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { clearStepData, updateStepData, type UserInfo } from "../../model";

import styles from "./WizardStep.module.scss";
import type { WizardStepProps } from "../../types";
import { initialFields } from "../../data/wizardFields";

const WizardStepInformation = ({ onValidate, stepId }: WizardStepProps) => {
  const dispatch = useAppDispatch();
  const { data } = useAppSelector((state) => state.wizard);

  const { userInfo, plan } = data;
  const isExtraInfoRequired = !!plan?.isExtraInfoRequired;

  const filteredFields = useMemo(() => {
    return initialFields.filter(
      (field) => field.name !== "description" || isExtraInfoRequired
    );
  }, [isExtraInfoRequired]);

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const {
    register,
    control,
    formState: { isValid, errors },
  } = useForm<UserInfo>({
    defaultValues: userInfo || {},
    mode: "onChange",
  });

  const watched = useWatch({
    control,
  });

  const lastWatchedRef = useRef(watched);

  useEffect(() => {
    const prev = lastWatchedRef.current;
    const next = watched;

    const changed = JSON.stringify(prev) !== JSON.stringify(next);

    if (!changed) return;

    lastWatchedRef.current = next;

    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      dispatch(
        updateStepData({
          stepId: stepId,
          payload: next,
        })
      );
    }, 300);
  }, [watched, dispatch, stepId]);

  useEffect(() => {
    onValidate(isValid);
  }, [isValid, onValidate]);

  return (
    <form noValidate>
      {filteredFields.map((field) => {
        const error = errors[field.name as keyof UserInfo];
        const inputId = `input-${field.name}`;

        return (
          <div key={field.name} className={styles["wizard-step-information"]}>
            <label htmlFor={inputId}>{field.label}</label>
            {field.name === "description" ? (
              <textarea
                id={inputId}
                {...register(field.name, field.validation)}
                placeholder={field.placeholder}
                aria-invalid={error ? "true" : "false"}
                aria-describedby={error ? `${inputId}-error` : undefined}
              />
            ) : (
              <input
                id={inputId}
                {...register(field.name, field.validation)}
                placeholder={field.placeholder}
                type={field.type}
                aria-invalid={error ? "true" : "false"}
                aria-describedby={error ? `${inputId}-error` : undefined}
              />
            )}

            {error && (
              <p
                id={`${inputId}-error`}
                role="alert"
                className={styles["error-msg"]}
              >
                {error.message}
              </p>
            )}
          </div>
        );
      })}
    </form>
  );
};

export default WizardStepInformation;
