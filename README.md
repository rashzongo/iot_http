##Projet HTTP IoT - M1 MIAGE NICE

R�alis� par :
- #####Rachida ZONGO S. H.
- #####Imen BOUKADIDA


##Pr�-requis

Cot� serveur :
- NodeJS  : https://nodejs.org/en/download/
- npm pour la gestion des packages js : https://www.npmjs.com/get-npm
- MongoBD pour la persistance des donn�es : https://docs.mongodb.com/manual/installation/


Cot� ESP :
- Les biblioth�ques : 
	- WiFi : pour la connexion sans fil
	- HTTPClient : pour la communication avec le protocole HTTP
	- OneWire et DallasTemperature : pour la gestion du capteur de temperature


## Ex�cution

1. Faire les brachements de l'ESP32 sur une board avec :
	- la sortie de la photoresistor sur l'entr�e analogique A0
	- l'entr�e du capteur de temp�rature sur le digit D23
	- une diode sur D19 repr�sentant une ampoule
	- une diode sur D21 repr�sentant un radiateur

2. Lancer le serveur de base de donn�es MongoBD (commade "mongod").
	
3. (Si sur Linux) Modifier le fichier "server/server.js", � la ligne 13, remplacer la variable "iface_windows" par "iface_linux".

4. Lancer dans un terminal (dans le r�pertoire "server"), les commandes : 
	- "npm install" pour avoir tous les packages n�cessaire au serveur
	- "node server.js" : pour lancer le serveur
	Le serveur nous renvoie son adresse d'�coute sur le terminal.

5. Copiez l'adresse d'�coute du serveur et la coller :
	- dans le fichier "code_esp/code_esp.ino", ligne 14, changer la variable "SERVER" pour �tre celle du serveur (sans le port).
	- dans le fichier "server/public/js/capteursScript.js", ligne 3, changer �galement la variable "SERVER_URL" (port compris).

6. Compiler et T�l�verser le fichier  "code_esp/code_esp.ino" sur le microcontroleur.

7. Acc�der � l'interface de gestion des objets sur un navigateur � l'adresse d'�coute du serveur.

>Note : L'onglet "A propops du syst�me" pr�sente notre approche sur le sujet.