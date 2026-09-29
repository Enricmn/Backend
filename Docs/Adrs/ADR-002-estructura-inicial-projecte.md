# ADR-002: Com organitzem el codi entre frontend i backend

## Context
El projecte té dues parts ben diferenciades: la interfície feta amb React i el servidor fet amb Node/Express. Calia decidir si tot aniria junt en un sol repositori (monorepo) o si cada part aniria pel seu compte

## Decisió
Hem optat per crear dos repositoris independents a GitHub: Frontend i Backend (per exemple, https://github.com/Enricmn/Backend.git), en lloc d'ajuntar-ho tot en un únic repositori

## Conseqüències
+ Cada repositori té el seu propi historial de commits, cosa que fa més fàcil trobar quan i per què es va canviar alguna cosa concreta d'una part o de l'altra
+ Es pot desplegar o actualitzar el backend sense necessitat de tocar res del frontend, i a l'inrevés
+ Si en algun moment calgués donar accés a algú només a una de les dues parts, es podria fer sense compartir tot el projecte
- Quan un canvi afecta les dues parts alhora (per exemple, si es modifica com respon un endpoint de l'API), cal anar amb compte i actualitzar els dos repositoris de forma coordinada, ja que no hi ha manera automàtica de saber que l'altre repositori necessita un canvi també
- Alguns fitxers de configuració (com el .gitignore o les regles de l'ESLint) s'han de mantenir per duplicat a cada repositori, en lloc de tenir-los centralitzats en un sol lloc