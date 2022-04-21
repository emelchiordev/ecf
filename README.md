# PROJET : ECOIT

C’est un fait, la crise écologique est devenue une urgence majeure. La sixième extinction 
massive a déjà commencé et le changement climatique se fait de plus en plus ressentir au fil 
des années. Mais qu’en est-il d’internet ?
En matière d’émissions de CO2, il pollue 1.5 fois plus que le transport aérien. D’ailleurs, en 20 
ans, le poids d’une page web a été multiplié par 115 (source : https://www.greenit.fr/)
Face à ce constat, un organisme de formation a été fondé en 2017 : EcoIT. Son objectif est 
d’être une plateforme d’éducation permettant à tout instructeur expert en accessibilité et en 
éco-conception web de présenter des modules de cours.
À terme, EcoIT désire devenir la référence française pour les développeurs soucieux de leur 
impact digital. Et pourquoi pas délivrer enfin un label officiel pour classer les sites web selon 
leur empreinte numérique.

# ADRESSE DU PROJET : 
- le lien du projet se trouve sur la copie de mon évaluation.

pour tester le projet

compte administrateur :
utilisateur : admin@ecoit.com
mot de passe : ve45vetlor

compte étudiant :
utilisateur : johnn53@ecoit.com
mot de passe : ve45vetlor

compte professeur
utilisateur : leprof@ecoit.com
mot de passe : ve45vetlor


# DOCUMENTATION TECHNIQUE
[DOCUMENTATION TECHNIQUE.pdf](https://github.com/emelchiordev/ecf/files/8534114/DOCUMENTATION.TECHNIQUE.pdf)

# MANUEL D'UTILISATION : 
[MANUEL UTILISATION ECOIT.pdf](https://github.com/emelchiordev/ecf/files/8525407/MANUEL.UTILISATION.ECOIT.pdf)

# FICHIER DE MIGRATION DOCTRINE: 
[migration.txt](https://github.com/emelchiordev/ecf/files/8525451/migration.txt)

# FICHIER CHARTE GRAPHIQUE : 
[FICHIER CHARTE GRAPHIQUE.pdf](https://github.com/emelchiordev/ecf/files/8534446/FICHIER.CHARTE.GRAPHIQUE.pdf)

# LIEN TRELLO POUR LE SUIVI DU PROJET :
https://trello.com/b/vHY07Z4p/ecoit

# VARIABLE D'ENVIRONNEMENT OBLIGATOIRE : 
USER_ADMIN=" " adresse email de l'administrateur

PASS_ADMIN=" " mot de passe de l'administrateur

API_URL="http://localhost/api/" adresse de l'API

ROOT_URL="http://localhost" adresse du site

DATABASE_URL="" URI de la base de données

# INSTALLATION : 
1) git clone https://github.com/emelchiordev/ecf.git
2) cd ecf
3) npm install
4) composer install
5) npm run build
6) php bin/console doctrine:database:create
7) php bin/console doctrine:migrations:migrate
8) Route pour installer le compte administrateur : /install






