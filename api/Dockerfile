# Utilisation de l'image node.js
FROM node:14-alpine

# Création du répertoire de travail
WORKDIR /app

# Copie des fichiers de l'application dans le conteneur
COPY package.json /app
COPY . /app

RUN npm install

# Installation des dépendances
RUN npm install --production

# Exposition du port de l'application
EXPOSE 5001

# Commande de démarrage de l'application
CMD ["npm", "start"]
