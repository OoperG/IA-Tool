import React from 'react';
import {Nav} from "react-bootstrap";

function NavField() {

    return (
        <Nav>
            <Nav.Item>
                <Nav.Link href="/mail_field">Mail</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link href="/form_field">Reformulation</Nav.Link>
            </Nav.Item>
        </Nav>
    )
}

export default NavField;