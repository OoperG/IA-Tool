import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Joke from "./page/Joke";
import Mail from "./page/Mail";
import Reformulation from "./page/Reformulation";
import {AuthProvider} from './components/AuthContext';
import Login from "./page/Login";
import Register from "./page/Register";
import Field from "./page/Field";

function App() {

    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="" element={<Login/>}/>
                    <Route path="/joke" element={<Joke/>}/>
                    <Route path="/mail" element={<Mail/>}/>
                    <Route path="/reformulation" element={<Reformulation/>}/>
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/field" element={<Field/>}/>
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;
