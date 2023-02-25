interface IRoundedButton {
  onClick: () => void;
  active?: boolean;
}
export default function RoundedButton({
  onClick,
  active = false,
}: IRoundedButton) {
  return (
    <button
      className={`rounded--button ${active ? "active" : ""}`}
      onClick={onClick}
    >
      +
    </button>
  );
}
