import Navigation from "../components/Navigation";
import {useEffect, useState} from "react";
import {Card} from "react-bootstrap";
import {Button} from "react-bootstrap";
import {Modal} from "react-bootstrap";
import Accordion from 'react-bootstrap/Accordion';
import NavField from "../components/NavField";


function Mail_field() {

    const [username, setUsername] = useState(localStorage.getItem('username') || '');
    const [userMails, setUserMails] = useState([]);
    const [mailObjects, setMailObjects] = useState([]);
    const [mail_destinataire, setMail_destinataire] = useState([]);
    const [modal, setModal] = useState(false);

    const user_mail = () => {
        console.log("Send to API :", username);
        fetch("http://localhost:8080/user_mail", {
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
                const emails = data.map((item) => item.user_mail);
                const mailObjects = data.map((item) => item.mail_object);
                const mail_destinataire = data.map((item) => item.mail_destinataire);
                setUserMails(emails);
                setMailObjects(mailObjects);
                setMail_destinataire(mail_destinataire);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };

    useEffect(() => {
        user_mail();
    }, []);


// afficher les adresses e-mail dans votre page
    return (
        <div>
            <Navigation/>
            <NavField/>
            <div className="containers">
                <div className="row">
                    {mailObjects.map((object, index) => (
                        <div className="col">
                            <Card style={{width: '25rem'}}>
                                <Card.Body>
                                    <Card.Subtitle className="mb-2 text-muted">Objet du Mail :</Card.Subtitle>
                                    <Card.Title>{object}</Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted">Destinataire :</Card.Subtitle>
                                    <Card.Title>{mail_destinataire[index]}</Card.Title>
                                    <Accordion>
                                        <Accordion.Item eventKey="0">
                                            <Accordion.Header>View mail</Accordion.Header>
                                            <Accordion.Body style={{whiteSpace: "pre-wrap"}}>
                                                {userMails[index]}
                                            </Accordion.Body>
                                        </Accordion.Item>
                                    </Accordion>
                                </Card.Body>
                            </Card>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Mail_field;