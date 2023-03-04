import Navigation from "../components/Navigation";
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import axios from "axios";
import {useContext, useState} from "react";
import {AuthContext} from "../components/AuthContext";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";

function Reformulation() {

    const [loading, setLoading] = useState(false);
    const { apiKey } = useContext(AuthContext);
    const [obj, setObj] = useState("");
    const [prompt, setPrompt] = useState("");

    //const apiKey = process.env.REACT_APP_API_KEY;
    const [payload, setPayLoad] = useState({
        prompt: "reformule de manière professionnelle le texte suivant : ",
        temperature: 0.5,
        max_tokens: 200,
        n: 1,
        model: "text-davinci-003"
    });

    const getRes = () => {
        setLoading(true);
        payload.prompt = payload.prompt + prompt;
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
    };

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
                                <Card.Title>Écrivez le message que vous souhaitez reformuler.</Card.Title>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                    <Form.Label>Votre texte :</Form.Label>
                                    <Form.Control as="textarea" rows={5} onChange={(e) => setPrompt(e.target.value)} />
                                    {/*<div key={`default-radio`} className="mb-3">
                                        <Form.Check
                                            inline
                                            label="Friendly"
                                            name="group1"
                                            type="radio"
                                            id={`inline-radio-1`}
                                        />
                                        <Form.Check
                                            inline
                                            label="Professional"
                                            name="group1"
                                            type="radio"
                                            id={`inline-radio-2`}
                                        />
                                    </div>*/}
                                    {obj ?
                                        <div className="container d-flex justify-content-center">
                                            <div className="row">
                                                <div className="col">
                                                    <Form.Group className="mb-3">
                                                        <Form.Label>{obj}</Form.Label>
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

export default Reformulation;