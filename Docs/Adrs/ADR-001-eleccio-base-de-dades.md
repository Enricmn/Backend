# ADR-001: Elecció de base de dades del projecte

## Context
Necessitem una base de dades flexible per emmagatzemar productes, usuaris i comandes amb relacions no rígides. En el nostre cas, això és especialment rellevant perquè venem tres tipus de productes molt diferents (CompteRoK, RecursosRoK i BotRoK), cadascun amb els seus propis atributs

## Decisió
Farem servir MongoDB com a base de dades principal, gestionada via Docker perquè el seu model de documents encaixa bé amb la varietat d'estructures entre CompteRoK, RecursosRoK i BotRoK sense necessitat de definir taules separades i rígides per a cadascun

## Conseqüències
+ No cal pensar-se molt bé l'estructura de les dades des del principi; si més endavant vols afegir un camp nou a un producte, ho pots fer sense trencar res
+ Si un dia vull afegir un quart tipus de producte (per exemple "packs"), no hauré de refer tota la base de dades
+ Funciona molt bé amb Node.js, que és el que farem servir al backend
+ Amb Docker, no m'he d'instal·lar Mongo directament a l'ordinador ni preocupar-me de configurar-lo a mà — només arrenco el contenidor i ja ho tinc
- Com que no obliga a seguir una estructura fixa, si no vaig amb compte podria acabar guardant les dades de manera diferent en llocs diferents (per exemple, un producte amb el preu com a text i un altre com a número)
- Si en un futur vull fer coses més complicades, com per exemple treure estadístiques que barregin dades de diverses taules alhora (usuaris + comandes + productes), pot ser més feixuc que amb una base de dades més "clàssica"
