
# 🌤️ WeatherApp – Sääsovellus kaupunkikohtaisella ennusteella

## 📝 Projektin yleiskuvaus

**WeatherApp** on web-sovellus, jonka avulla käyttäjät voivat hakea kaupunkien tämänhetkisen sään sekä 5 päivän sääennusteen.  
Sovellus tarjoaa yksinkertaisen ja intuitiivisen käyttöliittymän kaikille käyttäjille, jotka tarvitsevat säätietoa arkeen ja suunnitteluun.

Projekti toteutettiin vaiheittain, painottaen erityisesti vaiheessa 1 määriteltyjen käyttötapausten toteuttamista.

---

## 📌 Käyttötapausten yhteenveto

Alla on lista vaiheessa 1 määritellyistä käyttötapauksista sekä niiden toteutustilanne:

| Käyttötapaus                                        | Toteutettu (Kyllä/Ei) | Huomiot ja toteutuksen yksityiskohdat        |
|-----------------------------------------------------|-----------------------|----------------------------------------------|
| Käyttäjä rekisteröityy sovellukseen                 | ⚠️ Osittain           | Frontend-rekisteröinti puuttuu; käyttäjät luodaan manuaalisesti backendissä. |
| Käyttäjä kirjautuu sisään                           | ✅ Kyllä              | JWT-tokenin avulla, toimiva kirjautumislogiikka. |
| Käyttäjä tarkastelee kaupungin nykyistä säätä       | ✅ Kyllä              | Näyttää lämpötilan, tuulen ja sääsymbolin.   |
| Käyttäjä näkee 5 päivän sääennusteen                | ✅ Kyllä              | Lisätty laajennuksena OpenWeatherMap API:lla. |
| Käyttäjä näkee ja käyttää aiempia hakuja            | ✅ Kyllä              | Tallennettu localStorageen, mahdollista nopea uudelleenhaku. |
| Käyttäjä näkee omat profiilitietonsa                | ✅ Kyllä              | Käyttäjä voi tarkastella ID-, nimi- ja sähköpostitietojaan. |
| Käyttäjä muokkaa profiilitietojaan                  | ❌ Ei                 | Profiilin katselu toteutettiin, mutta muokkaustoiminto jätettiin pois priorisoinnin vuoksi. |

> **Yhteenveto:**  
> Kaikki päätoiminnallisuudet toteutettiin lukuun ottamatta frontendissä olevaa rekisteröitymislomaketta ja profiilin muokkausta.

---

## ✍️ Tekninen toteutus

**Frontend:**
- React.js (funktiokomponentit ja hookit)
- CSS Grid ja Flexbox
- LocalStorage (hakuhistorian tallennus)

**Backend:**
- Node.js + Express.js
- PostgreSQL
- JWT (turvallinen autentikointi)

**API-integraatio:**
- OpenWeatherMap API (nykyinen sää + 5 päivän ennuste)

**Arkkitehtuuriratkaisut:**
- Suora frontend-API-integraatio OpenWeatheriin yksinkertaisuuden ja nopeuden vuoksi.
- Suojatut reitit ja token-pohjainen käyttöoikeuden hallinta backendissä.

---

## 🚂 Kehityskaari

- **Vaihe 1:** Käyttötapausten määrittely ja sovelluksen suunnittelu.
- **Vaihe 2:** Käyttäjän rekisteröinti (backend), kirjautuminen, nykyisen sään näyttö.
- **Vaihe 3:** Laajennus – lisättiin 5 päivän sääennuste ja hakuhistorian tallennus.
- **Vaihe 4:** Dokumentointi, esityksen valmistelu ja viimeistely.

> **Huomio:**  
> Frontendin rekisteröitymislomakkeen rakentaminen siirrettiin tulevaan kehitystyöhön. Ensisijaisesti varmistettiin, että kirjautuminen ja säätoiminnot toimivat virheettömästi.

---

## ☀️ Reflektio ja jatkokehitys

### Mitä onnistui hyvin?
- Hyvin vaiheistettu kehitys mahdollisti selkeän etenemisen.
- Modulaarinen ja skaalautuva React-rakenne.
- API-integraatio onnistui sujuvasti frontendin kautta.

### Haasteet ja ratkaisut:
- Ennustetietojen oikea valinta: ratkaistiin hakemalla data aina klo 12:00.
- API-avaimen turvallinen käyttö frontendissä: ratkaistiin ympäristömuuttujilla.

### Tulevaisuuden kehitysideat:
- Frontend-rekisteröintilomakkeen lisääminen.
- Profiilitietojen muokkausominaisuuden lisääminen.
- Admin-paneelin toteutus (käyttäjien ja hakujen hallinta).
- Sääilmoitusten lähettäminen käyttäjille ilmoituksina.

---

## 🪢 Esityksen linkki

**Esitys pidettiin live-projektitilaisuudessa.**  
*(Lisätään linkki myöhemmin, jos esityksestä tehdään tallenne.)*
