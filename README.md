# Lien de la vidéo
- https://youtu.be/ca9CRpiUM5w
- Voir le fichier "Ajout qui sont pas dans la vidéo"
# Ajouts Bonus

## Côté Back
- Recherche de pokémon par nom partiel et multilingue (anglais, français, japonais, chinois) via la route `GET /api/pokemons/search/:name`.
- CRUD complet : création (POST), modification (PUT) et suppression (DELETE) de pokémons, avec sauvegarde persistante dans le fichier JSON.
- Pagination serveur (20 pokémons par page) avec métadonnées (page, total, totalPages).
- Génération automatique de l'ID à la création d'un nouveau pokémon.
- Serveur d'assets statiques pour les images de pokémons (normales + shiny) et les icônes de types.

## Côté Front
- **Poké-Quizz Express** : un jeu de quiz où il faut deviner le pokémon à partir de sa silhouette, avec timer de 10 secondes, système de combo (jusqu'à x5), bonus de vitesse, animations de popup combo et points flottants, et indice de type.
- **Page de création de pokémon** : formulaire complet avec noms multilingues, sélecteur de types interactif (18 types avec couleurs), éditeur de stats (0-255), aperçu live de l'image, et modale de confirmation avant création.
- **Page de détails / édition / suppression** : affichage complet d'un pokémon (image, noms, types colorés, barres de stats), mode édition inline, et suppression avec modale de confirmation.
- **Roue radar de statistiques** : graphique radar SVG affiché sur la page de détails d'un pokémon, sous l'image, dans son propre cadre. Couleur adaptée au type principal, avec labels et valeurs pour les 6 stats (HP, Atk, Def, SpA, SpD, Spd).
- **Système de favoris** : bouton coeur sur chaque carte, favoris sauvegardés dans le localStorage, filtre "favoris uniquement" avec compteur.
- **Filtrage par type** : jusqu'à 2 types en simultané, désactivation intelligente des types incompatibles.
- **Tri multi-critères** : par ID, nom, HP, Attaque, Défense, Attaque Spé, Défense Spé, Vitesse, en ordre croissant/décroissant.
- **Recherche en temps réel** avec debounce (300ms), sans bouton de validation.
- **Cartes dynamiques** : le fond des cartes change de couleur en fonction du/des type(s) du pokémon (dégradé pour les double-types), comme on a pu voir avec le Bulbizarre Ghost/Ground.
- **Bouton scroll-to-top** : bouton flottant qui apparaît après avoir scrollé, permettant de remonter en haut de la page en un clic.
- **Animations et effets UI** : hover avec élévation et halo lumineux, overlay holographique, skeleton loading avec shimmer, spinner pokéball, animation slide-in/fade-in.
- **Style rétro pixel-art** cohérent avec la police VT323 sur toute l'application.
- **Light mode / Dark mode** : styles CSS adaptés sur les cartes, le quiz, la liste, etc.
- **Fichier .bat** pour lancer les deux serveurs (back + front) en 1 clic, avec démarrage décalé de 2 secondes.
- **Routing client** avec React Router : pages liste, détails, création, quiz.
- **Création d'équipe (Team Builder)** : page dédiée pour constituer une équipe de 6 pokémons, avec un assistant de création intelligent qui propose des pokémons de types différents de ceux déjà présents dans l'équipe, pour encourager la diversité.
- **Custom hook** `usePokemon` réutilisable pour le fetch de données.
