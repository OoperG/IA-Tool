import Navigation from "../components/Navigation";
import "../css/tchat.css";
import {useState} from "react";
import axios from "axios";

function Mail() {

    const [prompt, setPrompt] = useState("false");
    const [loading, setLoading] = useState(false);
    const apiKey = process.env.REACT_APP_API_KEY;
    const [obj, setObj] = useState("");
    const [payload, setPayLoad] = useState({
        prompt: "Fait moi une blague sur ",
        temperature: 0.5,
        max_tokens: 100,
        n: 1,
        model: "text-davinci-003"
    });

    const getRes = () => {
        setLoading(true);
        payload.prompt = payload.prompt + prompt;
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
            <div className="card">
                <div className="chat-header">Chat</div>
                <div className="chat-window">
                    <ul className="message-list"></ul>
                </div>
                <div className="chat-input">
                    <input
                        type="text"
                        className="message-input"
                        placeholder="Type your message here"
                        onChange={(e) => setPrompt(e.target.value)}
                    />
                    {loading ?
                        null
                        :
                        <button
                            className="send-button"
                            onClick={getRes}
                        >Send</button>}
                </div>
            </div>
        </div>
    )
}

export default Mail;