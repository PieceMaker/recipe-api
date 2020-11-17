import express from 'express';

import { insert, load, search } from "./src/managers/recipeManager";
import {NewRecipe} from "./src/types/recipe";

const app = express();
const port = 8000;

app.use(express.json());

////////
// GET
////////

app.get('/', (req, res) => {
    res.send('It\'s an express server.');
});

app.get('/load/:id', async (req, res) => {
    try {
        const recipe = await load(req.params.id);
        res.status(200).send(recipe);
    } catch(error) {
        res.status(400).send(error);
    }
});

app.get('/search/:pattern/:page', async (req, res) => {
    try {
        const { pattern, page } = req.params;
        const searchResult = await search(pattern, parseInt(page, 10));
        res.status(200).send(searchResult);
    } catch(error) {
        res.status(400).send(error);
    }
});

app.get('/search/:pattern', async (req, res) => {
    try {
        const { pattern } = req.params;
        const searchResult = await search(pattern, 1);
        res.status(200).send(searchResult);
    } catch(error) {
        res.status(400).send(error);
    }
});

////////
// POST
////////

app.post('/login', (req, res) => {
    res.status(400).send('/login not yet implemented.');
});

app.post('/logout', (req, res) => {
    res.status(400).send('/logout not yet implemented.');
});

app.post('/insert', async (req, res) => {
    try {
        const recipe: NewRecipe = req.body;
        const insertedId = await insert(recipe);
        res.status(200).send(insertedId);
    } catch(error) {
        res.status(400).send(error.message);
    }
});

////////
// PUT
////////

app.put('/update/:id', (req, res) => {
    res.status(400).send('/update/:id not yet implemented.');
});

////////
// DELETE
////////

app.delete('/delete/:id', (req, res) => {
    res.status(400).send('/delete/:id not yet implemented.');
});

////////
// Listen
////////

app.listen(port, () => {
    console.log(`Server started. Listening on port ${port}...`);
});