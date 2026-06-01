# Busleyden Atheneum Mobile App

React Native / Expo app voor het Busleyden Atheneum redesign.

## Inhoud

- HomeScreen met campussen, nieuws, webshop en CTA's
- Producten met zoeken, filteren, sorteren en detailpagina
- Nieuws met zoeken, filteren, sorteren en detailpagina
- Campussen met filter en detailpagina
- Studiezoeker
- Mini-game met score, timer en herstartfunctie
- Winkelmandje met aantallen en totaalprijs
- Favorietenlijst voor producten
- Webflow service met fallback data zolang de Webflow site nog niet volledig af is

## Opdrachtcheck

- Core components: `View`, `Text`, `Image`, `TextInput`, `Pressable`, `ScrollView`, `StyleSheet`, `Button`, `Switch`
- Herbruikbare components: `components/ProductCard.js`, `components/CampusCard.js`, `components/NewsCard.js`
- Navigatie: Stack Navigator in `App.js`
- Details via route params: producten, nieuws en campussen
- Dynamische Webflow data: `services/webflow.js`
- Product state: aantal aanpassen, minimum 1, totaalprijs berekenen
- Producten: zoeken, filteren op categorie, sorteren op naam en prijs
- Nieuws: zoeken, filteren op categorie, sorteren op datum en naam
- Extra: resetknop voor filters, loading states, lege states, pressed states, winkelmandje, favorieten, mini-game

## Starten

```bash
npm install
npm start
```

## Webflow koppeling

Maak een `.env` bestand op basis van `.env.example`.

```bash
EXPO_PUBLIC_WEBFLOW_API_TOKEN=...
EXPO_PUBLIC_WEBFLOW_NEWS_COLLECTION_ID=...
EXPO_PUBLIC_WEBFLOW_CAMPUSES_COLLECTION_ID=...
```

De site ID staat al in `services/webflow.js`.

Gevonden Webflow collecties:

- Products: `6a1dc34672b591bef6e05621`
- Categories: `6a1dc34672b591bef6e05622`
- SKUs: `6a1dc34672b591bef6e05620`
- Campussens: `6a1dcb5ff1218d8cf0595826`
- Nieuws: `6a1dcbb77d13c67814495ff0`

Huidige status in Webflow:

- Producten: 14 items gevonden
- Categories: 3 items gevonden
- Campussen: 1 item gevonden
- Nieuws: 0 items gevonden

Zet een echte API token niet publiek online. Voor de eindversie is het beter om je gedeelde token in Webflow te vervangen.
