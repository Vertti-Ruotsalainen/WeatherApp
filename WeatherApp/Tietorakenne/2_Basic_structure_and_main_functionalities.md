# Project phase 2 - Basic structure and main functionalities

Tässä kuvat sisäänkirjutumis ikkunasta ja perus näkymä kirjautuneelle käyttäjälle


![sisäänkirjautuminen](https://github.com/user-attachments/assets/57bf160a-9c8e-4173-983a-dfc835ddb352)

![kirjautunut](https://github.com/user-attachments/assets/76d9aa19-8441-4579-82a6-0d54d30cfc31)

kirjautuneesta kuvasta voi päätellä sovelluksen perusperiaatteen, eli kirjoitat kaupungin ja se antaa halutut tiedot (asetuksista tulee päivitys tulevaisuudessa)

## 1. Environment

Projektin kehitysympäristö sisältää seuraavat teknologiat ja työkalut:

    Node.js + Express: palvelinpuolen toteutus

    React: käyttöliittymä

    PostgreSQL: tietokanta

    pg (node-postgres): PostgreSQL:n käsittely Node.js:ssä

    Visual Studio Code: kehitystyökaluna

    Postman: API-reittien testaukseen

    Git + GitHub: versionhallinta

    dotenv: ympäristömuuttujien hallintaan (.env)

Projekti on jaettu frontend- ja backend-kansioihin, ja molemmat toimivat omana itsenäisenä yksikkönään.

## 2. Backend

Backend on rakennettu Node.js:llä ja Expressillä. Se tarjoaa REST-tyylisen rajapinnan, jonka kautta frontend voi:

    Rekisteröidä uuden käyttäjän

    Kirjautua ja saada JWT-tokenin

    Hakea ja tallentaa käyttäjän sääasetuksia

    Suojata reittejä tokenin perusteella

## 3. Frontend

    Frontend on toteutettu Reactilla ja se tarjoaa:

        Kirjautumis- ja rekisteröintisivut

        Suojattu sääsivu, johon pääsee vain kirjautunut käyttäjä

        Hakukenttä kaupungin sään hakemiseen

        Asetusten tallennus: viimeisin kaupunki tallennetaan käyttäjäkohtaisesti

        Profiilisivu: käyttäjä voi tarkastella tietojaan (tulossa parannuksia)

        Tyylikäs ulkoasu, jossa on avaruudesta otettu taustakuva

        Tilojen hallinta: city, weather ja token useState/useEffect-hookeilla

## 4. Database

Tietokantana käytetään PostgreSQL-palvelua. Taulut:

    CREATE TABLE users (
    id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE user_preferences (
      id SERIAL PRIMARY KEY,
      user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
      location VARCHAR(100),
      units VARCHAR(10)
    );

Tietokantaa käytettiin alussa pgAdmin 4:n kautta, mutta siitä luovuttiin. Nykyään kaikki toiminnot hoidetaan backendin kautta ohjelmallisesti.

## 5. Basic structure and architecture

Rakenneperiaatteet:

    Backend toimii REST-rajapintana ja on yhteydessä PostgreSQL-tietokantaan.

    Frontend on React-pohjainen käyttöliittymä, joka kommunikoi backendin kanssa fetch-kutsuilla.

    Ympäristömuuttujat (.env) säilyttävät tietokantayhteyden ja JWT-salaisuuden.

    Token-pohjainen autentikointi estää ei-kirjautuneita pääsemästä suojaamattomille reiteille.

    Säälogiikka ja käyttäjälogiikka on eritelty komponentteihin ja reitteihin.

## 6. Functionalities

✅ Käyttäjän rekisteröinti ja kirjautuminen

✅ JWT-tokenin käyttö suojatuilla reiteillä

✅ Sään hakeminen OpenWeatherMap API:sta

✅ Käyttäjäkohtaisen asetuksen tallennus (viimeisin kaupunki)

✅ Profiilin tarkastelu (nimi ja sähköposti)

✅ Visuaalisesti näyttävä ulkoasu taustakuvalla

✅ Responsive-napit sivun kulmissa (Profiili / Kirjaudu ulos)

## 7. Code quality and documentation

Koodi on jaettu komponentteihin ja reitteihin

Kommenteilla selitetty mm. tokenin tarkistus, API-kutsujen virhetilanteet

Versionhallinta toteutettu Git + GitHubilla selkein kommittiviestein

README.md tiedoston puuttumin tällä hetkellä iso miinus (tulee tulevaisuudessa sisältäen selvät käyttöohjeet ja tarkoitukset sovellukselle)

## 8. Testing and error handling

✅ Yksikkötesti: Jest-testit Reactin logiikalle

✅ E2E-testi: Playwrightilla toteutettu login- ja säätesti

✅ Kuormitustesti: Artillerylla testattu /login-reitin kestoa usealla pyynnöllä

Virheenkäsittely:

API-reitit palauttavat selkeät JSON-virheilmoitukset

Frontendissä ilmoitukset esim. "Et ole kirjautunut sisään"

(tähän screenshotit testeistä)
![testit_projekti2](https://github.com/user-attachments/assets/01b110a2-9296-4dae-8419-2a2212d44624)

## 9. User interface and interaction

Responsiivinen ulkoasu

Reactilla toteutettu yksisivuinen sovellus (SPA)

Kirjautumisen jälkeen käyttäjä ohjataan sääsivulle

Asetukset tallennetaan automaattisesti (muistaa viimeisimmän haun jos kirjaudut ulos ja takaisin sisään)

Napit sijoitettu kulmiin: Profiili vasemmalle, Kirjaudu ulos oikealle
