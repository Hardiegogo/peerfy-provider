import { useState } from "react";
import "./App.css";
import CommentCreator from "./components/CommentCreator/CommentCreator";
import ToggleButton from "./components/ToggleButton/ToggleButton";

function App() {
  const [isChecked, setIsChecked] = useState(false);
  return (
    <>
      Hello Dostonnn!
      <ToggleButton isChecked={isChecked} setIsChecked={setIsChecked} />
      {isChecked && <CommentCreator />}
    </>
  );
}

export default App;
