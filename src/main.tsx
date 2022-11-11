import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/default.css"

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <html>
        <head>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin='' />
            <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="stylesheet" />
        </head>
        <body>
            <main className="h-screen w-screen justify-center font-sans flex flex-row items-center bg-SC_background">
                <App />
            </main>
        </body>
    </html>
);