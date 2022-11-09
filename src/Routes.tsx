import { Routes, Route, BrowserRouter } from "react-router-dom";

// import { inserirpagina } from './pages/insert_page'
import InserirPages from './pages/InserirPages'
import ListView from "./pages/ListPage";


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

