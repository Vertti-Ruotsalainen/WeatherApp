# Project phase 1 - Definition and planning


## 1. User Personas

    1: Matkailija (Emma, 29)

    Tarpeet: Haluaa tarkistaa sään ennen matkaa ja tallentaa suosikkikohteensa.
    Käyttötottumukset: Käyttää mobiililaitetta ja haluaa nopean ja selkeän käyttöliittymän.
    Heikkoudet: Ei halua etsiä säätietoja joka kerta erikseen.

    2: Ulkoilija (Mikko, 35)

    Tarpeet: Tarvitsee sääennusteen suunnitellakseen viikonlopun ulkoilua.
    Käyttötottumukset: Käyttää sovellusta usein mutta lyhyitä hetkiä kerrallaan.
    Heikkoudet: Sääennusteiden epäselvyys ja epätarkkuus

    3: Työntekijä (Anna, 42)

    Tarpeet: Haluaa nopeasti tarkistaa päivän sään työmatkaa varten.
    Käyttötottumukset: Käyttää sovellusta aamuisin selaimessa ja mobiilissa.
    Heikkoudet: Turhat toiminnot, jotka hidastavat käyttöä.

## 2. Use Cases and User Flows

Käyttäjäpolut:

    Rekisteröityminen ja kirjautuminen → Luo tili, kirjautuu sisään.
    Sään tarkistaminen → Syöttää kaupungin nimen tai käyttää sijaintia.
    Suosikkikohteiden hallinta → Lisää ja poistaa suosikkikaupunkeja.
    Asetusten muuttaminen → Vaihtaa lämpötilayksikköä (C/F), teemaa.
    Uloskirjautuminen → Sulkee istunnon turvallisesti.

## 3. UI Prototypes

Kotisivu: Hakukenttä säätilan hakemiselle ja suosikkikaupungit.

Käyttäjäprofiili: Käyttäjäasetukset, tallennetut paikat.

Kirjautumis- ja rekisteröintisivut: Sähköpostikirjautuminen + Google-kirjautuminen.

## 4. Information Architecture and Technical Design
📂 Frontend: 

📂 Backend: 

📂 API: OpenWeather API (säätiedot)

📂 Tietorakenne:

    Users: (ID, sähköposti, nimi, tallennetut kaupungit)
    Weather Data: (kaupunki, säätila, lämpötila, päivämäärä)

## 5. Project Management and User Testing

    Jakaminen sprintteihin: 1) Käyttäjätilit, 2) Säätoiminnot, 3) UI viimeistely.

🧪 Käyttäjätestaus:

    Testataan käyttöliittymää eri laitteilla.
    Käytetään Cypress/Jest testaukseen.
    Kerätään käyttäjäpalautetta ennen julkaisua.
