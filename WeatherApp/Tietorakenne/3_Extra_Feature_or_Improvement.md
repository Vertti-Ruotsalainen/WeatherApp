
## 🎯 Valittu ominaisuus tai parannus

**5 päivän sääennuste (Forecast-komponentti)**

Valitsin laajennukseksi lisätä sovellukseen 5 päivän sääennusteen. Tämä parantaa käyttäjäkokemusta merkittävästi, sillä sovellus tarjoaa nyt käyttäjälle nykyisen sään lisäksi 5-päivän päiväkohtaiset ennusteet, mikä mahdollistaa paremman suunnittelun ja sovelluksen monipuolisemman käytön.

Valitsin tämän ominaisuuden, koska käyttäjät odottavat sääsovellukselta tyypillisesti tulevien päivien ennusteita eikä pelkästään nykyhetken säätietoja. Lisätty ennustetoiminto tekee sovelluksesta käytännöllisemmän ja kilpailukykyisemmän.

---

## 🔍 Alkuperäinen määrittely

Vaiheen 1 alkuperäinen käyttötapaus oli määritelty näin:

> "Sovellus näyttää käyttäjän syöttämän kaupungin tämänhetkisen sään."

Tämä laajennus parantaa alkuperäistä käyttötapausta tarjoamalla lisäominaisuuden, jossa näytetään myös 5 päivän sääennuste selkeillä visuaalisilla symboleilla (ikonit, lämpötila).

---

## 🔄 Toteutus

Tässä vaiheessa toteutin seuraavat asiat:

### ✅ Tekniset muutokset:

- Loin uuden React-komponentin `<Forecast />`, joka hakee ja näyttää sääennustedatan.
- Integroin OpenWeatherMapin API:n `/forecast`-päätepisteen suoraan frontend-sovellukseen, jotta käyttäjälle saadaan näytettyä viiden päivän sääennuste.
- Lisäsin käyttöliittymään selkeän painikkeen, jolla käyttäjä voi helposti vaihtaa nykyisen sään ja 5 päivän sääennusteen välillä.
- Lisäsin visuaaliset sääikonit OpenWeatherMapin tarjoamilla ikoneilla korvaamaan pelkän tekstimuotoisen sääkuvauksen, jolloin visuaalisuus ja selkeys paranevat huomattavasti.

### 🚀 Käytetyt teknologiat, menetelmät ja rakenteet:

- **React.js (funktiokomponentit & hookit):** Käytin `useState`- ja `useEffect`-hookeja komponenttien tilan ja elinkaaren hallintaan.
- **OpenWeatherMap API**: Tarkemmin `/forecast`-endpoint sääennusteen datan noutamiseen.
- **CSS Grid & Flexbox:** Käyttöliittymän ja responsiivisuuden parantamiseen.
- **LocalStorage:** Hakuhistorian tallennus käyttäjän aiempien hakujen nopeaa uudelleenhakua varten.
- **JWT-autentikointi & middleware:** Profiilitietojen turvalliseen hakuun suojatuilta reiteiltä.

### 🛠️ Haasteet ja ratkaisut:

**Haaste:** Sääennustedatan oikeanlaisen suodattamisen ja esittämisen varmistaminen.  
**Ratkaisu:** Valitsin johdonmukaisesti jokaiselta päivältä ennusteajan klo 12:00, mikä takaa yhtenäisen ja selkeän esityksen käyttäjälle.

**Haaste:** API-avaimen turvallinen käsittely frontendissä.  
**Ratkaisu:** Käytin ympäristömuuttujia (`REACT_APP_OPENWEATHER_API_KEY`) API-avaimen turvalliseen hallintaan ilman, että se näkyy suoraan koodissa.

**Haaste:** Selkeän ja intuitiivisen käyttöliittymän tarjoaminen käyttäjän vaihtaessa nykyisen sään ja ennusteen välillä.  
**Ratkaisu:** Loin selkeän ja responsiivisen toggle-painikkeen, joka ilmaisee käyttäjälle selvästi aktiivisen näkymän ja tarjoaa välittömän visuaalisen palautteen.

---

Tämä laajennus tekee sovelluksesta entistä käytännöllisemmän ja käyttäjäystävällisemmän sekä auttaa käyttäjiä säätilan seuraamisessa ja päivittäisessä suunnittelussa.
