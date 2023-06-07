import { FC, ReactChildren, ReactNode } from "react";
import css from "./InputAndButton.module.css";
import { Input } from "../input/input";
import { Button } from "../button/button";

interface InputAndButtonProps {
  placeholder: string;
  isLimit: boolean;
  maxLength?: number | undefined;
  btnText: string;
  loader?: boolean;
  change?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  click?: any;
  children?: ReactNode;
  value?: string;
  disabled?: boolean;
}

export const InputAndButton: FC<InputAndButtonProps> = (props) => {
  return (
    <div className={css.main}>
      <Input
        placeholder={props.placeholder}
        isLimitText={props.isLimit}
        maxLength={props.maxLength}
        onChange={props.change}
        value={props.value}
      />
      <Button
        text={props.btnText}
        type="button"
        isLoader={props.loader}
        onClick={props.click}
        disabled={props.disabled}
      />
      {props.children}
    </div>
  );
};
