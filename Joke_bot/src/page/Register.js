import {useContext, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {AuthContext} from '../components/AuthContext';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import "../css/login.css";

function Register() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Send to API :", username, password, email);
        fetch("http://localhost:8080/create_users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                user_name: username,
                password: password,
                email: email,
            }),
        })
            .then((response) => {
                console.log(response);
                setError(false);
                localStorage.setItem('username', username);
                window.location = "/reformulation"
            })
            .catch((error) => {
                console.error("Error:", error);
                setError(true);
                setErrorMessage("Error: " + error);
            });
    }


    return (
        <>
            <div className="containers d-flex justify-content-center">
                <Card style={{width: '18rem'}}>
                    <Card.Body>
                        <div className="container d-flex justify-content-center">
                            <Card.Title>User Register</Card.Title>
                        </div>
                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicPseudo">
                                <Form.Label>Pseudo</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter pseudo"
                                    onChange={(e) => setUsername(e.target.value)}/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>email</Form.Label>
                                <Form.Control
                                    type="email"
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="email"/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Password"/>
                            </Form.Group>
                            <Button variant="primary" type="submit" onClick={handleSubmit}>
                                Submit
                            </Button>
                            {error ? <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>{}</Form.Label>
                            </Form.Group> : null}
                        </Form>
                    </Card.Body>
                </Card>
            </div>
        </>
    )
}

export default Register;