import "./toggleButton.css";

interface IToggleProps {
  isChecked: boolean;
  setIsChecked: React.Dispatch<React.SetStateAction<boolean>>;
}

const ToggleButton = ({
  isChecked,
  setIsChecked,
}: IToggleProps): JSX.Element => {
  return (
    <div className=" w-fit rounded-lg overflow-hidden absolute right-4 top-[40%] text-white z-10">
      <div
        onClick={() => setIsChecked(true)}
        className={`bg-black cursor-pointer p-2  hover:bg-opacity-80 text-sm ${
          isChecked ? "bg-opacity-80" : ""
        }`}
      >
        On
      </div>
      <div
        onClick={() => setIsChecked(false)}
        className={`bg-black cursor-pointer p-2  hover:bg-opacity-80 text-sm ${
          !isChecked ? "bg-opacity-80" : ""
        }`}
      >
        Off
      </div>
    </div>
  );
};

export default ToggleButton;
