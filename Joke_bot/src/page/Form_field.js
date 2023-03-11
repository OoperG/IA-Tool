import React, { useState, useEffect } from "react";
import Navigation from "../components/Navigation";
import { Card } from "react-bootstrap";
import NavField from "../components/NavField";

function Form_field() {

    const [username, setUsername] = useState(localStorage.getItem('username') || '');
    const [form, setForm] = useState([]);

    const user_form = () => {
        console.log("Send to API :", username);
        fetch("http://localhost:8080/user_form", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                user_name: username,
            }),
        })
            .then((response) => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    console.log(response);
                }
            })
            .then((data) => {
                // extraire les adresses e-mail et les objets des e-mails de la réponse et les stocker dans un état
                const eform = data.map((item) => item.user_form);
                setForm(eform);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };

    useEffect(() => {
        user_form();
    }, []);

    return (
        <div>
            <Navigation/>
            <NavField/>
            <div className="containers">
                <div className="row">
                    {form.map((object, index) => (
                        <div className="col">
                            <Card style={{width: '25rem'}}>
                                <Card.Body>
                                    <Card.Title>Reformulation :</Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted">{object}</Card.Subtitle>
                                </Card.Body>
                            </Card>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Form_field;