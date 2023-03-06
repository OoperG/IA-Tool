# IA-Tool

Outil d'assistant pour rédiger des emails et reformuler des phrases.

## Installation et prérequis

### Docker

Installer docker et docker-compose.

A la racine du projet, executer la commande suivante:
```bash
docker-compose build
```

### Création d'un .env

A la racine du projet, créer un fichier .env avec les informations suivantes:
```bash
nano .env
```
Et y ajouter les informations suivantes:
```bash
REACT_APP_API_KEY="your_api_key"
```
Pour récupérer votre clé API, vous devez vous rendre sur le site https://openai.com/blog/openai-api et créer un compte.

## Lancement de l'application

A la racine du projet, executer la commande suivante:
```bash
docker-compose up
```