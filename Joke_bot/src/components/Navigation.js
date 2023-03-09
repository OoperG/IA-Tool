import {Container, Nav, Navbar} from "react-bootstrap";
import {useContext, useEffect, useState} from 'react';
import "../App.css"

function Navigation() {

    const [username, setUsername] = useState(localStorage.getItem('username') || '');

    useEffect(() => {
        // mise à jour du statut de connexion de l'utilisateur et du nom d'utilisateur
        setUsername(localStorage.getItem('username') || '');
    }, []);

    const logout = () => {
        localStorage.removeItem('username');
        setUsername('');
    }

    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand>IA Tools</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href="/field">Field</Nav.Link>
                    <Nav.Link href="/mail">Mail</Nav.Link>
                    <Nav.Link href="/reformulation">Reformulation</Nav.Link>
                </Nav>
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text>
                        Signed in as: <a href="#login">{username}</a>
                    </Navbar.Text>
                </Navbar.Collapse>
                <Navbar.Text className="ml-5 logout-link">
                    <a href="/" onClick={logout}>Logout</a>
                </Navbar.Text>
            </Container>
        </Navbar>
    )
}

export default Navigation;