import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import {useState} from "react";
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Spinner from 'react-bootstrap/Spinner'
import Placeholder from 'react-bootstrap/Placeholder';
import Navigation from "../components/Navigation";
import {InputGroup} from "react-bootstrap";

function Joke() {

    const [loading, setLoading] = useState(false);
    const [obj, setObj] = useState("");
    const [prompt, setPrompt] = useState("");
    const apiKey = process.env.REACT_APP_API_KEY;
    const [payload, setPayLoad] = useState({
        prompt: "Fait moi une blague sur ",
        temperature: 0.5,
        max_tokens: 100,
        n: 1,
        model: "text-davinci-003"
    });

    const getRes = () => {
        payload.prompt = "Fait moi une blague en français sur ";
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

    const serviceDown = () => {
        setObj("Service is down, please try again later (Désolé little blond)");
        //setLoading(false);
    }

    return (
        <>
            <Navigation/>
            <div className="container d-flex justify-content-center align-items-center mt-5">
                <div className="row">
                    <div className="col">
                        <Card className="w-100 mx-100">
                            <Card.Body>
                                <Card.Title>Chat With Joke_Bot</Card.Title>
                                <Form>
                                    <InputGroup className="mb-3 mt-5">
                                        <InputGroup.Text id="basic-addon1">Fait moi une blague sur...</InputGroup.Text>
                                        <Form.Control
                                            placeholder="Les blondes"
                                            aria-label="Username"
                                            aria-describedby="basic-addon1"
                                            onChange={(e) => setPrompt(e.target.value)}/>
                                    </InputGroup>
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
                                        <div className="container d-flex justify-content-center">
                                            <div className="row">
                                                <div className="col">
                                                    <Placeholder as="p" animation="glow">
                                                        <Placeholder xs={12}/>
                                                    </Placeholder>
                                                </div>
                                            </div>
                                        </div>
                                        : null}
                                    {loading ?
                                        <div className="container d-flex justify-content-center">
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
                                        <div className="container d-flex justify-content-center">
                                            <div className="row">
                                                <div className="col">
                                                    <Button variant="primary" type="submit" onClick={getRes}>
                                                        Send
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>}
                                </Form>
                            </Card.Body>
                        </Card>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Joke;
