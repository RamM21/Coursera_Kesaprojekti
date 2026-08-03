# Coursera Kesäprojekti
Full‑stack web‑sovellus, joka hyödyntää IBM Cloudin serverless API palveluita, Cloudant‑tietokantaa sekä useita AI‑rajapintoja. Projekti toteutettiin Coursera Full Stack Developer ‑kurssin kesäprojektina, ja sen tavoitteena oli demonstroida pilvipalveluiden käyttöä mahdollisimman laajasti.

#Projektin tarkoitus
kesäprojektin tavoitteet:
- soveltaa Coursera Full Stack Developer ‑kurssilla opittuja taitoja
- rakentaa cloud‑painotteinen full‑stack‑sovellus
- toteuttaa backend IBM Cloud Functions ‑palvelulla (serverless REST API)
- käyttää Cloudant‑tietokantaa dokumenttipohjaiseen datan tallennukseen
- hyödyntää IBM Cloudin AI‑palveluita:
  - Language Translator
  - Natural Language Understanding
  - Text to Speech

# Demo
Videoesittely: https://youtu.be/SUz44eJ945g

# Sovelluksen kuvaus
Sovellus on monipuolinen tietojen tallennus‑ ja käsittelyjärjestelmä, jossa käyttäjä voi:
- tallentaa omia tietoja (custom‑data)
- luoda D&D‑hahmoja
- tallentaa reseptejä
- kirjoittaa resepteille arvosteluja
- hyödyntää IBM:n AI‑palveluita tekstin analysointiin, kääntämiseen ja puheeksi muuntamiseen
Kaikki backend‑toiminnot toteutetaan serverless‑arkkitehtuurilla IBM Cloud Functions ‑palvelussa.

# Teknologiat
Frontend:
- React
- Node.js
Backend / Cloud
- IBM Cloud Functions (serverless REST API)
- IBM Cloudant (NoSQL dokumenttitietokanta)
- IBM Language Translator
- IBM Natural Language Understanding
- IBM Text to Speech

# Asennus ja Käyttöönotto
##Frontend
1. Kloonaa repositorio
- git clone https://github.com/RamM21/Coursera_Kesaprojekti.git
2. Asenna riippuvuudet
-  cd React/app
- npm install
3. Käynnistä sovellus
  - npm start
4. avaa selain
- http://localhost:3000
   
## Backend-arkkitehtuuri (IBM CLoud)
Backend toimii täysin serverittömästi IBM Cloud Functions ‑palvelussa. Jokainen REST‑endpoint on oma action‑tiedostonsa.
Tarvittavat IBM Cloud ‑palvelut
- IBM Cloudant database
- IBM Language Translator
- IBM Natural Language Understanding
- IBM Text to Speech
- IBM Cloud Functions
Cloud Functions -asetukset
1. Luo action jokaiselle REST‑toiminnolle
2. Action runtime: Node.js 16
3. Yksi tiedosto = yksi action
4. Lisää koodeihin:
   - palveluiden URL‑osoitteet
   - API‑avaimet
5. Aseta actionit julkisiksi HTTP‑endpointiksi
6. Lisää endpoint‑URL:t React‑frontendin ympäristömuuttujiin

# Cloudant‑tietokannan rakenne
## Tietokannat:
- custom
- dnd
- otp
- recipes
- reviews
- users
## Indeksit
- Kaikkiin tietokantoihin: userid‑indeksi
- reviews‑tietokantaan: recipe‑indeksi (haetaan reseptin ID:llä)
## Esimerkki rakenteesta
Dokumentit sisältävät mm. seuraavia kenttiä:
- Custom: paragraph, title, userid, _attachments
- Dnd: hahmon statsit, taidot, varusteet, taustatiedot, käyttäjän ID
- Recipes: title, ingredients, instructions, userId, kuva
- Reviews: comment, rating, recipe, sentiment, userId
- Users: email, name

# Autentikointi ja tietoturva
- IBM Cloud Functions käyttää API‑avaimia ja palvelukohtaisia tunnisteita
- Cloudant‑tietokanta on suojattu palvelukohtaisilla käyttöoikeuksilla
- Frontend ei tee suoria tietokantayhteyksiä — kaikki kulkee action‑endpointtien kautta

