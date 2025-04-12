# Project phase 2 - Basic structure and main functionalities

Add something

## 1. Environment

Projektin kehitysympäristö sisältää seuraavat teknologiat ja työkalut:

    Node.js + Express: palvelinpuolen toteutus

    React: käyttöliittymä

    PostgreSQL: tietokanta

    pg (node-postgres): PostgreSQL:n käsittely Node.js:ssä

    Visual Studio Code: kehitystyökaluna

    Postman: API-reittien testaukseen

    Git + GitHub: versionhallinta

    dotenv: ympäristömuuttujien hallintaan

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

    Hakukenttä, jossa käyttäjä voi hakea kaupungin säätiedot

    Asetusten tallennus, jolloin sovellus muistaa edellisen haun

    Profiilisivu, jossa käyttäjä voi tarkastella omia tietojaan

    Tyylikäs ulkoasu, jossa on avaruudesta otettu taustakuva

Kaikki tilat, kuten city, weather ja token, hallitaan Reactin useState ja useEffect-hookeilla.



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

Tietokantaa käytettiin alussa pgAdmin 4:n kautta, mutta siitä luovuttiin. Nykyään kaikki toiminnot hoidetaan backendin kautta ohjelmallisesti, mikä tukee versionhallintaa ja automatisointia.

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

Add something

## 8. Testing and error handling

Add something

## 9. User interface and interaction

Add something
