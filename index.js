import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use('/assets', express.static('assets'));

// Charger les pokémons depuis le fichier JSON
let pokemons = [];
const pokemonsFilePath = path.join(__dirname, 'data', 'pokemons.json');

const loadPokemons = () => {
  try {
    const data = fs.readFileSync(pokemonsFilePath, 'utf-8');
    pokemons = JSON.parse(data);
    console.log(`${pokemons.length} pokémons chargés`);
  } catch (error) {
    console.error('Erreur lors du chargement des Pokémons:', error);
    pokemons = [];
  }
};

// Sauvegarder les pokémons dans le fichier JSON
const savePokemons = () => {
  try {
    fs.writeFileSync(pokemonsFilePath, JSON.stringify(pokemons, null, 2), 'utf-8');
  } catch (error) {
    console.error('Erreur lors de la sauvegarde des Pokémons:', error);
  }
};

// Routes

// GET - Récupérer tous les pokémons avec pagination (20 par 20)
app.get('/api/pokemons', (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 20;
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;

  const paginatedPokemons = pokemons.slice(startIndex, endIndex);
  const totalPages = Math.ceil(pokemons.length / limit);

  res.json({
    page,
    limit,
    total: pokemons.length,
    totalPages,
    data: paginatedPokemons
  });
});

// GET - Rechercher un pokémon par nom (partiel, tous les langages)
app.get('/api/pokemons/search/:name', (req, res) => {
  const searchTerm = req.params.name.toLowerCase();
  
  const results = pokemons.filter(p => 
    p.name.english.toLowerCase().includes(searchTerm) ||
    p.name.french.toLowerCase().includes(searchTerm) ||
    p.name.japanese.toLowerCase().includes(searchTerm) ||
    p.name.chinese.toLowerCase().includes(searchTerm)
  );

  res.json(results);
});

// GET - Récupérer un pokémon par ID
app.get('/api/pokemons/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const pokemon = pokemons.find(p => p.id === id);

  if (pokemon) {
    res.json(pokemon);
  } else {
    res.status(404).json({ error: 'Pokémon non trouvé' });
  }
});

// POST - Créer un nouveau pokémon
app.post('/api/pokemons', (req, res) => {
  try {
    const { name, type, base, image } = req.body;

    // Validation
    if (!name || !name.english || !type || !base) {
      return res.status(400).json({ error: 'Données invalides. Veuillez fournir: name (avec english), type, base' });
    }

    // Générer un nouvel ID
    const newId = Math.max(...pokemons.map(p => p.id)) + 1;

    const newPokemon = {
      id: newId,
      name: {
        english: name.english || '',
        japanese: name.japanese || '',
        chinese: name.chinese || '',
        french: name.french || ''
      },
      type: Array.isArray(type) ? type : [type],
      base: {
        HP: base.HP || 0,
        Attack: base.Attack || 0,
        Defense: base.Defense || 0,
        SpecialAttack: base.SpecialAttack || 0,
        SpecialDefense: base.SpecialDefense || 0,
        Speed: base.Speed || 0
      },
      image: image || 'http://localhost:3000/assets/pokemons/default.png'
    };

    pokemons.push(newPokemon);
    savePokemons();

    res.status(201).json(newPokemon);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la création du Pokémon', details: error.message });
  }
});

// PUT - Modifier un pokémon
app.put('/api/pokemons/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const pokemonIndex = pokemons.findIndex(p => p.id === id);

    if (pokemonIndex === -1) {
      return res.status(404).json({ error: 'Pokémon non trouvé' });
    }

    const { name, type, base, image } = req.body;

    // Mettre à jour les champs fournis
    if (name) {
      pokemons[pokemonIndex].name = {
        ...pokemons[pokemonIndex].name,
        ...name
      };
    }

    if (type) {
      pokemons[pokemonIndex].type = Array.isArray(type) ? type : [type];
    }

    if (base) {
      pokemons[pokemonIndex].base = {
        ...pokemons[pokemonIndex].base,
        ...base
      };
    }

    if (image) {
      pokemons[pokemonIndex].image = image;
    }

    savePokemons();
    res.json(pokemons[pokemonIndex]);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la modification du Pokémon', details: error.message });
  }
});

// DELETE - Supprimer un pokémon
app.delete('/api/pokemons/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const pokemonIndex = pokemons.findIndex(p => p.id === id);

    if (pokemonIndex === -1) {
      return res.status(404).json({ error: 'Pokémon non trouvé' });
    }

    const deletedPokemon = pokemons.splice(pokemonIndex, 1)[0];
    savePokemons();

    res.json({ message: 'Pokémon supprimé avec succès', pokemon: deletedPokemon });
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la suppression du Pokémon', details: error.message });
  }
});

// Route racine
app.get('/', (req, res) => {
  res.send('Serveur Pokémon API - Accédez à /api/pokemons');
});

// Charger les pokémons au démarrage
loadPokemons();

console.log('Serveur configuré. Prêt à démarrer.');

app.listen(3000, () => {
  console.log('Serveur en cours d\'exécution sur http://localhost:3000');
  console.log('API disponible sur http://localhost:3000/api/pokemons');
});