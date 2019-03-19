##Projet HTTP IoT - M1 MIAGE NICE

Réalisé par :
- #####Rachida ZONGO S. H.
- #####Imen BOUKADIDA


##Pré-requis

Coté serveur :
- NodeJS  : https://nodejs.org/en/download/
- npm pour la gestion des packages js : https://www.npmjs.com/get-npm
- MongoBD pour la persistance des données : https://docs.mongodb.com/manual/installation/


Coté ESP :
- Les bibliothèques : 
	- WiFi : pour la connexion sans fil
	- HTTPClient : pour la communication avec le protocole HTTP
	- OneWire et DallasTemperature : pour la gestion du capteur de temperature


## Exécution

1. Faire les brachements de l'ESP32 sur une board avec :
	- la sortie de la photoresistor sur l'entrée analogique A0
	- l'entrée du capteur de température sur le digit D23
	- une diode sur D19 représentant une ampoule
	- une diode sur D21 représentant un radiateur

2. Lancer le serveur de base de données MongoBD (commade "mongod").
	
3. (Si sur Linux) Modifier le fichier "server/server.js", à la ligne 13, remplacer la variable "iface_windows" par "iface_linux".

4. Lancer dans un terminal (dans le répertoire "server"), les commandes : 
	- "npm install" pour avoir tous les packages nécessaire au serveur
	- "node server.js" : pour lancer le serveur
	Le serveur nous renvoie son adresse d'écoute sur le terminal.

5. Copiez l'adresse d'écoute du serveur et la coller :
	- dans le fichier "code_esp/code_esp.ino", ligne 14, changer la variable "SERVER" pour être celle du serveur (sans le port).
	- dans le fichier "server/public/js/capteursScript.js", ligne 3, changer également la variable "SERVER_URL" (port compris).

6. Compiler et Téléverser le fichier  "code_esp/code_esp.ino" sur le microcontroleur.

7. Accéder à l'interface de gestion des objets sur un navigateur à l'adresse d'écoute du serveur.

>Note : L'onglet "A propops du système" présente notre approche sur le sujet.