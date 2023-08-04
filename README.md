# Coursera_Kesaprojekti
##Tietoja projektista
Kesäprojekti suunniteltiin Coursera Full Stack Developer kurssin tehtyä. Projektin ideana oli hyödyntää kurssilla opittuja asioita ja näyttää opittuja taitoja.
Projektin pääasiana oli käyttää cloudia mahdollisimman paljon projektin toiminnoissa. Projekti on tavallinen tietojen tallennus projekti, jossa käytetään IBM Cloudia tallentamaan ja tekemään Rest API serverittömänä.
Projektissa käytetään myös muita IBM Cloud palveluja kuten Cloudant käytetään tietokantana ja IBM Cloud functions tekevät Rest APIn työt. Projektiin lisättiin myös IBM Cloud language translator, natural language understanding ja text to speech palvelut parantamaan ymmärrystä cloud palveluista.

## Web-sovellus linkki
https://moonlit-phoenix-bdf1bc.netlify.app/

## Frontend asennus
1. Kloonaa repositorio
   git clone https://github.com/RamM21/Coursera_Kesaprojekti.git
2. Asenna riippuvuudet
   cd React/app
   npm install
   
## Backend asetukset
1. Tarvitset IBM Cloud käyttäjän
2. Tarvitset tarvittavat IBM Cloud palvelut
   -IBM Cloudant database
   -IBM Language Translator
   -IBM Natural Language Understanding
   -IBM Text To Speech
   -IBM Functions
3. IBM functions asetukset
   -Rest API kanssiossa koodit jokaiselle actionille
   -Action runtime Node.JS 16
   -Yksi tiedosto on yksi action
   -Laita tarvittavat palvelu URL ja Apiavain koodeihin
   -Vaihda frontend koodiin omat action endpoint public URL osoitteet
5. IBM Cloudant asetukset
   -Tee tarvittavat tietokannat
    -custom
    -dnd
    -otp
    -recipes
    -reviews
    -users
   -lisää tietokantoihin userid query index, jotta hakuja voidaan tehdä käyttäjän id:llä
   -lisää reviews tietokantaan recipe query index, jotta voidaan hakea review reseptin documentin id:llä
   
## Käyttö
1. Käynnistä frontend
   -cd React/app
   -npm start
2. Mene selaimella http://localhost:3000
3. Jos backend tehty oikein appi on toiminta kuntoinen

## Teknologiat
-React
-Node.JS

## Tietokannan JSON asettelut
1. Custom
   {
  "_id": ,
  "_rev": ,
  "paragraph": ,
  "title": ,
  "userid": ,
  "_attachments": {
    "image": {
      "content_type": "image/png",
      "revpos": 1,
      "digest": "md5-iXfrucGS2cTbPeOFtfPlsg==",
      "length": 24070,
      "stub": true
    }
  }
}
2. Dnd
   {
  "_id": "",
  "_rev": "",
  "backpack": {
    "attack": {
      "other": "",
      "weapon1": "",
      "weapon1dmg": "",
      "weapon2": "",
      "weapon2dmg": "",
      "weapon3": "",
      "weapon3dmg": ""
    },
    "coins": {
      "cp": "",
      "ep": "",
      "gp": "",
      "pp": "",
      "sp": ""
    },
    "items": "",
    "treasure": ""
  },
  "chardesc": {
    "age": "",
    "aligment": "",
    "allies": "",
    "background": "",
    "backstory": "",
    "class": "",
    "experience": "",
    "eyes": "",
    "hair": "",
    "height": "",
    "level": "",
    "name": "",
    "player": "",
    "race": "",
    "skin": "",
    "weight": ""
  },
  "skills": {
    "acrobatics": true,
    "animalhandling": true,
    "arcana": true,
    "athletics": false,
    "charismasave": false,
    "constitutionsave": false,
    "deception": true,
    "dexteritysave": false,
    "history": true,
    "insight": true,
    "intelligencesave": false,
    "intimidation": false,
    "investigation": false,
    "medicine": false,
    "nature": true,
    "perception": true,
    "performance": true,
    "persuasion": false,
    "religion": false,
    "sleightofhand": true,
    "stealth": false,
    "strengthsave": true,
    "survival": false,
    "wisdomsave": false
  },
  "stats": {
    "armor": "",
    "charisma": "",
    "charismabonus": "",
    "constitution": "",
    "constitutionbonus": "",
    "curhp": "",
    "dexterity": "",
    "dexteritybonus": "",
    "failure1": true,
    "failure2": true,
    "failure3": false,
    "hitdice": "",
    "hpmax": "",
    "inspiration": "",
    "intelligence": "",
    "intelligencebonus": "",
    "proficiency": "",
    "speed": "",
    "strength": "",
    "strengthbonus": "",
    "success1": true,
    "success2": false,
    "success3": false,
    "temphp": "",
    "totalhitdice": "",
    "wisdom": "",
    "wisdombonus": ""
  },
  "traits": {
    "additionalfeatures": [
      {
        "desc": "",
        "title": ""
      },
      {
        "desc": "",
        "title": ""
      }
    ],
    "bonds": "",
    "features": [
      {
        "desc": ,
        "title": 
      },
      {
        "desc": ,
        "title": 
      }
    ],
    "flaws": ,
    "ideals": ,
    "personality": ,
    "profnlang": {
      "lang": ,
      "prof": 
    }
  },
  "userid": ,
  "_attachments": {
    "image": {
      "content_type": "image/png",
      "revpos": 1,
      "digest": "md5-oOWpMVedcHTiFgcMvskO3w==",
      "length": 23755,
      "stub": true
    }
  }
}
3. Recipes
   {
  "_id": "",
  "_rev": "",
  "desc": "",
  "ingredients": "",
  "instructions": "",
  "prepntime": "",
  "servings": "",
  "title": "",
  "userId": "",
  "_attachments": {
    "image": {
      "content_type": "image/png",
      "revpos": 2,
      "digest": "md5-oOWpMVedcHTiFgcMvskO3w==",
      "length": 23755,
      "stub": true
    }
  }
}
4. Reviews
   {
  "_id": "",
  "_rev": "",
  "comment": "",
  "rating": "",
  "recipe": "",
  "sentiment": "",
  "userId": ""
}
5. Users
   {
  "_id": "",
  "_rev": "",
  "email": "",
  "name": ""
}

## Demo linkki
https://youtu.be/SUz44eJ945g
