import React from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./app/App";
import { pageForPath } from "./config/pages";
import { startArrival } from "./features/arrival/arrival";
import "./styles/index.css";

const root = document.getElementById("root")!;
const app = (
  <React.StrictMode>
    <App page={pageForPath(location.pathname)} />
  </React.StrictMode>
);
if (root.dataset.prerendered) hydrateRoot(root, app);
else createRoot(root).render(app);
const disposeArrival = startArrival();
if (import.meta.hot) import.meta.hot.dispose(disposeArrival);
