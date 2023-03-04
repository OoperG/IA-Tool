import {useContext, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {AuthContext} from '../components/AuthContext';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import "../css/login.css"

function Login() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Send to API :", username, password);
        fetch("http://localhost:8080/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                user_name: username,
                password: password,
            }),
        })
            .then((response) => {
                console.log(response);
                localStorage.setItem('username', username);
                setError(false);
                window.location = "/reformulation"
                //console.log("go to login");
                //window.location = "/";
            })
            .catch((error) => {
                console.error("Error:", error);
                setError(true);
                setErrorMessage("Error: " + error);
            });
    }

    return (
        <div className="containers d-flex justify-content-center">
            <Card style={{width: '18rem'}}>
                <Card.Body>
                    <div className="container d-flex justify-content-center">
                        <Card.Title>User Login</Card.Title>
                    </div>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Pseudo</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter pseudo"
                                onChange={(e) => setUsername(e.target.value)}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit" onClick={handleSubmit}>
                            Submit
                        </Button>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>not registered yet? <a href="/register">Register</a></Form.Label>
                        </Form.Group>
                        {error ?
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>{error}</Form.Label>
                            </Form.Group>
                            : null}
                    </Form>
                </Card.Body>
            </Card>
        </div>
    );
}

export default Login;
