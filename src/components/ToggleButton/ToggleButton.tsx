import "./toggleButton.css";

interface IToggleProps {
  isChecked: boolean;
  setIsChecked: React.Dispatch<React.SetStateAction<boolean>>;
}

const ToggleButton = ({
  isChecked,
  setIsChecked,
}: IToggleProps): JSX.Element => {
  const handleToggle = () => {
    setIsChecked(!isChecked);
  };

  return (
    <label className={`switch ${isChecked ? "checked" : ""}`}>
      <input type="checkbox" checked={isChecked} onChange={handleToggle} />
      <span className="slider"></span>
    </label>
  );
};

export default ToggleButton;
