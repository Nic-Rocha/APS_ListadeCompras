import { BrowserRouter, Route, Routes } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ListPage from "./pages/ListPage";

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={ <LoginPage /> }/>
                <Route path="/register" element={ <RegisterPage />}/>
                <Route path="/listpage" element={ <ListPage />}/>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes