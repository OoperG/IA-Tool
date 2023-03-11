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
import Mail_field from "./page/Mail_field";
import Form_field from "./page/Form_field";

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
                    <Route path="/mail_field" element={<Mail_field/>}/>
                    <Route path="/form_field" element={<Form_field/>}/>
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;
