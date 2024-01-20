import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { CommentsProvider } from "./context/useComments.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <CommentsProvider apiKey={import.meta.env.VITE_REACT_APP_API_KEY}>
      <App />
    </CommentsProvider>
  </React.StrictMode>
);
