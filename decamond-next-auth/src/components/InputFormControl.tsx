import type { FC, JSX } from "react";

import styles from "./styles/InputStyles.module.scss";

export type InputFormControlProps = {
  id: string;
  error?: string;
  labels?: {
    tr?: string;
    tl?: string;
  };
};

const InputFormControl: FC<
  InputFormControlProps & { children: JSX.Element }
> = ({ id, labels, children = null, ...rest }) => {
  const renderTopLabels = () => {
    if (!labels?.tl && !labels?.tr) return null;

    const { tl, tr } = labels;

    return (
      <div>
        <span className={styles["inp-label-text"]}>{!tl ? null : tl}</span>
        <span className={styles["inp-label-text"]}>{!tr ? null : tr}</span>
      </div>
    );
  };

  const renderBottomLabels = () => {
    if (!rest?.error) return null;

    return (
      <div>
        {!rest?.error ? null : (
          <span
            className={`${styles["inp-label-text"]} ${styles["inp-text-error"]}`}
          >
            {rest?.error}
          </span>
        )}
      </div>
    );
  };

  return (
    <label htmlFor={id}>
      {renderTopLabels()}
      {children}
      {renderBottomLabels()}
    </label>
  );
};

export default InputFormControl;
