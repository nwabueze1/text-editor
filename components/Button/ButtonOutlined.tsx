import { ReactNode } from "react";

interface IButtonContained {
  children: ReactNode;
  type?: "button" | "submit" | "reset" | undefined;
  onClick?: () => void;
}

export default function ButtonOutlined({
  onClick,
  children,
  type,
}: IButtonContained) {
  return (
    <button onClick={onClick} className="btn btn__outlined" type={type}>
      {children}
    </button>
  );
}
