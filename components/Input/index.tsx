import { ChangeEvent } from "react";
import Styles from "./Styles.module.scss";

interface ITitleProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}

export default function Input(props: ITitleProps) {
  return (
    <input
      className={Styles.input_container}
      type="text"
      onChange={props.onChange}
      value={props.value}
      placeholder={props.placeholder}
    />
  );
}
