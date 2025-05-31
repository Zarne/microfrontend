import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import React from "react";
import App from "./App";

// Note: Using an Alias in Webpack
import '@/styles/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';


console.log(React.version);

const appRoot = document.getElementById("root") as HTMLElement;
const root = createRoot(appRoot);

root.render(<BrowserRouter><App /></BrowserRouter>);