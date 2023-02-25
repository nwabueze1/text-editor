import { ReactNode } from "react";

export default function List({ children }: { children: ReactNode }) {
  return <div className="list">{children}</div>;
}
