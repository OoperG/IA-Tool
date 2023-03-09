import Navigation from "../components/Navigation";
import {useEffect, useState} from "react";

function Field() {

    const [username, setUsername] = useState(localStorage.getItem('username') || '');
    const [userMails, setUserMails] = useState([]);
    const [mailObjects, setMailObjects] = useState([]);

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
                setUserMails(emails);
                setMailObjects(mailObjects);
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
            {userMails.map((mail, index) => (
                <p style={{whiteSpace: "pre-wrap"}} key={index}>{mail} {mailObjects[index]}</p>
            ))}
        </div>
    );
}

export default Field;