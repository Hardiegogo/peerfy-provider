import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { CommentsProvider } from "./context/useComments.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <CommentsProvider apiKey={"f6d5bbf0-595c-4c95-a382-c4d887681406"}>
      <App />
    </CommentsProvider>
  </React.StrictMode>
);
