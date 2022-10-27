import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/default.css"

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <div className="h-screen w-screen justify-center flex flex-row items-center bg-SC_background">
    <App />
    </div>
);