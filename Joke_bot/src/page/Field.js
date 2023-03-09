import Navigation from "../components/Navigation";
import {useEffect, useState} from "react";
import {Card} from "react-bootstrap";
import {Button} from "react-bootstrap";
import {Modal} from "react-bootstrap";
import Accordion from 'react-bootstrap/Accordion';


function Field() {

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
            {/*userMails.map((mail, index) => (
                <p style={{whiteSpace: "pre-wrap"}} key={index}>{mail} {mailObjects[index]}</p>
            ))*/}
            <div className="containers mt-5">
                <div className="row">
                    {mailObjects.map((object, index) => (
                        <>
                            <div className="col">
                                <Card style={{width: '18rem'}}>
                                    <Card.Body>
                                        <Card.Subtitle className="mb-2 text-muted">Objet du Mail :</Card.Subtitle>
                                        <Card.Title>{object}</Card.Title>
                                        {/*<Card.Text>
                                        Some quick example text to build on the card title and make up the
                                        bulk of the card's content.
                                    </Card.Text>*/}
                                        <Card.Subtitle className="mb-2 text-muted">Destinataire :</Card.Subtitle>
                                        <Card.Title>{mail_destinataire[index]}</Card.Title>
                                        {/*<Button
                                            variant="primary"
                                            onClick={() => setModal(true)}
                                        >View Mail</Button>*/}
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
                        </>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Field;