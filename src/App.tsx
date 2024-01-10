import { useState } from "react";
import "./App.css";
import CommentCreator from "./components/CommentCreator/CommentCreator";
import ToggleButton from "./components/ToggleButton/ToggleButton";
import { CommentsProvider } from "./context/useComments";

const CommentsProviderWrapper = ({
  children,
  isEnabled,
}: {
  children: any;
  isEnabled: boolean;
}) => {
  // Wrap the provider in a conditional
  return isEnabled ? <CommentsProvider>{children}</CommentsProvider> : children;
};

function App() {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <>
      Hello Dostonnn!
      <ToggleButton isChecked={isChecked} setIsChecked={setIsChecked} />
      {/* Wrap App contents with CommentsProviderWrapper */}
      <CommentsProviderWrapper isEnabled={isChecked}>
        <CommentCreator />
      </CommentsProviderWrapper>
    </>
  );
}

export default App;
