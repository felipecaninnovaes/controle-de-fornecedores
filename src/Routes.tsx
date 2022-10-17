import { Routes, Route, BrowserRouter } from "react-router-dom";

// import { inserirpagina } from './pages/insert_page'
import InserirPages from './pages/InserirPages'


export function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<InserirPages />} /> {/* Temporario */}
                {/* <Route path="/" element={<MainPage />} /> */}
            </Routes>
        </BrowserRouter>
    )
}

