const mysql = require('mysql2');

const connections = mysql.createConnection({
    host: 'db-data',
    user: 'root',
    password: 'your_password'
});

connections.connect((error) => {
    if (error) {
        console.error('Error connecting to the database: ' + error.stack);
        return;
    }
    console.log('Connected to the database with thread ID ' + connection.threadId);
    // création de la base de données iatools si elle n'existe pas
    connections.query('CREATE DATABASE IF NOT EXISTS iatools', (error, result) => {
        if (error) {
            console.error('Error creating the database: ' + error.stack);
            return;
        }
        console.log('Database iatools created');
    });
    // utilisation de la base de données iatools
    connections.query('USE iatools', (error, result) => {
        if (error) {
            console.error('Error using the database: ' + error.stack);
            return;
        }
        console.log('Using database iatools');
    });
    // création de la table users si elle n'existe pas
    connections.query(`CREATE TABLE IF NOT EXISTS users (
        user_id INT PRIMARY KEY AUTO_INCREMENT,
        user_name VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        sign_up_date DATETIME NOT NULL,
        is_connected TINYINT NOT NULL
    )`, (error, result) => {
        if (error) {
            console.error('Error creating the users table: ' + error.stack);
            return;
        }
        console.log('Table users created');
    });
});


const connection = mysql.createConnection({
    host: 'db-data',
    user: 'root',
    password: 'your_password',
    database: 'iatools'
});

connection.connect((error) => {
    if (error) {
        console.error('Error connecting to the database: ' + error.stack);
        return;
    }
    console.log('Connected to the database with thread ID ' + connection.threadId);
});

const express = require('express');
const cors = require('cors');
const port = 8080; // Port d'écoute de l'API
const bodyParser = require('body-parser');
const app = express();


app.use(cors()); // Ajouter cette ligne pour activer CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Route pour récupérer tous les utilisateurs
app.get('/users', (req, res) => {
    connection.query('SELECT * FROM users', (error, results) => {
        if (error) {
            res.status(500).send('Error retrieving users from database');
            return;
        }
        res.status(200).json(results);
        console.log(results);
    });
});

// Route pour ajouter un nouvel utilisateur
app.post('/create_users', (req, res) => {
    res.set('Access-Control-Allow-Origin', '*'); // ajout de l'en-tête CORS
    const { user_name, password, email } = req.body; // Récupération des données envoyées depuis l'application React
    connection.query('INSERT INTO users (user_name, password, email, sign_up_date, is_connected) VALUES (?, ?, ?, NOW(), 0)', [user_name, password, email], (error, result) => {
        if (error) {
            res.status(500).send('Error adding user to database');
            return;
        }
        res.status(200).send('User added to database');
    });
});

app.post('/login', (req, res) => {
    const { user_name, password } = req.body;
    connection.query('SELECT * FROM users WHERE user_name = ? AND password = ?', [user_name, password], (error, results) => {
        if (error) {
            res.status(500).send('Error retrieving user from database');
            return;
        }
        if (results.length === 0) {
            res.status(401).send('Invalid username or password');
            return;
        }
        const user = results[0];
        // Vous pouvez ici générer un token d'authentification et le renvoyer au client si la connexion est réussie
        res.status(200).send(`Welcome, ${user.user_name}!`);
    });
});


app.listen(port, () => {
    console.log(`Serveur démarré sur le port ${port}`);
});