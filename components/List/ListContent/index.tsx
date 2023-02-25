import { ReactNode } from "react";

interface IListContent {
  iconName?: string;
  title: string;
  subtitle: string;
  onClick: () => void;
}

export default function ListContent({
  iconName: iconLink = "fa-video",
  title,
  subtitle,
  onClick,
}: IListContent) {
  return (
    <div className="list_content" onClick={onClick}>
      <i
        className={`fa ${iconLink}`}
        style={{ color: "#010E05", marginTop: "3px", marginRight: 5 }}
      ></i>
      <div className="list--description">
        <p className="list--title">{title}</p>
        <p className="list--subtitle">{subtitle}</p>
      </div>
    </div>
  );
}
