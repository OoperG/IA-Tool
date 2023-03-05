import Navigation from "../components/Navigation";
import "../css/tchat.css";
import {useEffect, useState} from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import {InputGroup} from "react-bootstrap";

function Mail() {

    const apiKey = process.env.REACT_APP_API_KEY;

    const [prompt, setPrompt] = useState("");
    const [loading, setLoading] = useState(false);
    const [obj, setObj] = useState("");
    const [selectedValue, setSelectedValue] = useState('');
    const [destinataire, setDestinataire] = useState('');
    const [objet, setObjet] = useState('');
    const [payload, setPayLoad] = useState({
        prompt: "",
        temperature: 0.5,
        max_tokens: 1000,
        n: 1,
        model: "text-davinci-003"
    });

    useEffect(() => {
        console.log(selectedValue);
    }, [selectedValue]);

    const handleRadioChange = (event) => {
        setSelectedValue(event.target.value);
    };

    const getRes = () => {
        setLoading(true);
        payload.prompt = "Rédige un email à " + selectedValue + " " + destinataire + " " + objet + " Détail : " + prompt;
        console.log(payload.prompt);
        axios({
            method: "POST",
            url: "https://api.openai.com/v1/completions",
            data: payload,
            headers: {
                "Content-Type": "application/json",
                Authorization:
                    "Bearer " + apiKey
            }
        })
            .then((res) => {
                console.log(res.data.choices[0].text);
                responseHandler(res);
            })
            .catch((e) => {
                setLoading(false);
                console.log(e.message, e);
            });
    }

    const responseHandler = (res) => {
        if (res.status === 200) {
            setObj(res.data.choices[0].text);
            setLoading(false);
        }
    };

    return (
        <div>
            <Navigation/>
            <div className="container d-flex justify-content-center align-items-center mt-5">
                <div className="row">
                    <div className="col">
                        <Card className="w-100 mx-100">
                            <Card.Body>
                                <Card.Title>Aide à la rédaction d'un email</Card.Title>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                    <Form.Label>Réglage :</Form.Label>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                        <InputGroup className="mb-3">
                                            <InputGroup.Text id="basic-addon3">
                                                Destinataire :
                                            </InputGroup.Text>
                                            <Form.Control
                                                aria-describedby="basic-addon3"
                                                onChange={(e) => setDestinataire(e.target.value)}
                                            />
                                        </InputGroup>
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                        <InputGroup className="mb-3">
                                            <InputGroup.Text id="basic-addon3">
                                                Objet :
                                            </InputGroup.Text>
                                            <Form.Control
                                                aria-describedby="basic-addon3"
                                                onChange={(e) => setObjet(e.target.value)}
                                            />
                                        </InputGroup>
                                    </Form.Group>
                                    <Form>
                                        {['superieur', 'ami', 'collegue'].map((value) => (
                                            <div key={value} className="mb-3">
                                                <Form.Check
                                                    inline
                                                    label={value}
                                                    name="group1"
                                                    type="radio"
                                                    id={`inline-radio-${value}`}
                                                    value={value}
                                                    onChange={handleRadioChange}
                                                    checked={selectedValue === value}
                                                />
                                            </div>
                                        ))}
                                    </Form>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                        <Form.Label>Rapide detail de la demande :</Form.Label>
                                        <Form.Control as="textarea" rows={5} onChange={(e) => setPrompt(e.target.value)} />
                                    </Form.Group>

                                    {/*<Form.Control as="textarea" rows={5} onChange={(e) => setPrompt(e.target.value)}/>*/}
                                    {obj ?
                                        <div className="container d-flex justify-content-center">
                                            <div className="row">
                                                <div className="col">
                                                    <Form.Group className="mb-3">
                                                        <Form.Label style={{ whiteSpace: "pre-wrap" }}>{obj}</Form.Label>
                                                    </Form.Group>
                                                </div>
                                            </div>
                                        </div>
                                        : null
                                    }
                                    {loading ?
                                        <div className="container d-flex justify-content-center mt-3">
                                            <div className="row">
                                                <div className="col">
                                                    <Button variant="primary" disabled>
                                                        <Spinner
                                                            as="span"
                                                            animation="grow"
                                                            size="sm"
                                                            role="status"
                                                            aria-hidden="true"
                                                        />
                                                        Loading...
                                                    </Button>
                                                </div>
                                            </div>
                                        </div> :
                                        <div className="container d-flex justify-content-center mt-3">
                                            <div className="row">
                                                <div className="col">
                                                    <Button variant="primary" type="submit" onClick={getRes}>
                                                        Send
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>}
                                </Form.Group>
                            </Card.Body>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Mail;