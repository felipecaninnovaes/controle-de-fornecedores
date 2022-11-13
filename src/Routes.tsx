import { Routes, Route, BrowserRouter } from "react-router-dom";

import InserirPages from './pages/InserirPages'


export function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<InserirPages />} /> {/* Temporario */}
                <Route path="/main" element={<InserirPages />} />
            </Routes>
        </BrowserRouter>
    )
}

