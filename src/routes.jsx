import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from './pages/Home';
import Filme from './pages/Filme';
import Favoritos from "./components/Favoritos";
import { ToastContainer } from "react-toastify";


import Erro from './pages/Erro'

import Header from './components/Header';

function RoutesApp(){
    return(
        <BrowserRouter>
        <Header/>
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/filme/:id" element={<Filme/>} />
            <Route path="/favoritos" element={<Favoritos/>} />

            <Route path="*" element={ <Erro/>} />
        </Routes>

         <ToastContainer
                position="top-right"
                autoClose={3000}
                theme="dark"
            />
        </BrowserRouter>
    )
}

export default RoutesApp;