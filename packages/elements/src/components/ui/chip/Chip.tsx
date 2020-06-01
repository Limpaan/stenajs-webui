import { faTimes } from "@fortawesome/free-solid-svg-icons/faTimes";
import cx from "classnames";
import { MouseEventHandler } from "react";
import * as React from "react";
import { FlatButton, FlatButtonProps } from "../buttons/FlatButton";
import { Link } from "../link/Link";
import styles from "./Chip.module.css";

export type ChipVariant =
  | "primary"
  | "secondary"
  | "error"
  | "warning"
  | "success"
  | "passive"
  | "turquoise";

export interface ChipProps extends Omit<FlatButtonProps, "variant"> {
  onClickRemove?: () => void;
  variant?: ChipVariant;
}

export const Chip: React.FC<ChipProps> = ({
  onClickRemove,
  onClick,
  label,
  variant = "primary"
}) => {
  const onClickHandler: MouseEventHandler<HTMLSpanElement> = ev => {
    ev.stopPropagation();
    ev.preventDefault();
    if (onClick) {
      onClick();
    }
  };
  return (
    <div
      className={cx(
        styles.chip,
        styles[variant],
        onClickRemove ? styles.removable : undefined
      )}
    >
      <Link
        disabled={!onClick}
        onClick={onClickHandler}
        disableTabIndex={!onClick}
        className={cx(styles.label, onClick ? styles.clickable : undefined)}
      >
        {label}
      </Link>
      {onClickRemove && (
        <FlatButton
          leftIcon={faTimes}
          size={"small"}
          className={styles.close}
          onClick={onClickRemove}
        />
      )}
    </div>
  );
};
