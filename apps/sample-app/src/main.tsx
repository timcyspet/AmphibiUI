import React from "react";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "amphibiui/styles.css";
import "./tailwind.css";
import "./app.css";
import { App } from "./App.js";

createRoot(document.getElementById("root")!).render(<React.StrictMode><App /></React.StrictMode>);
