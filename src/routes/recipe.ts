import express from 'express';

import { insert, load, remove, search, update } from "../api/managers/recipeManager";
import { NewRecipe, Recipe } from "../types/recipe";

const router = express.Router();

router.get('/load/:id', async (req, res) => {
    try {
        const recipe = await load(req.params.id);
        res.status(200).send(recipe);
    } catch(error) {
        res.status(400).send(error.message);
    }
});

router.get('/search/:pattern/:page', async (req, res) => {
    try {
        const { pattern, page } = req.params;
        const searchResult = await search(pattern, parseInt(page, 10));
        res.status(200).send(searchResult);
    } catch(error) {
        res.status(400).send(error.message);
    }
});

router.get('/search/:pattern', async (req, res) => {
    try {
        const { pattern } = req.params;
        const searchResult = await search(pattern, 1);
        res.status(200).send(searchResult);
    } catch(error) {
        res.status(400).send(error.message);
    }
});

router.post('/login', (req, res) => {
    res.status(400).send('/login not yet implemented.');
});

router.post('/logout', (req, res) => {
    res.status(400).send('/logout not yet implemented.');
});

router.post('/insert', async (req, res) => {
    try {
        const recipe: NewRecipe = req.body;
        const insertedId = await insert(recipe);
        res.status(200).send(insertedId);
    } catch(error) {
        res.status(400).send(error.message);
    }
});

router.put('/update', async (req, res) => {
    try {
        const recipe: Recipe = req.body;
        const updateResponse = await update(recipe);
        res.status(200).send(updateResponse);
    } catch(error) {
        res.status(400).send(error.message);
    }
});

router.delete('/delete/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deleteResponse = await remove(id);
        res.status(200).send(deleteResponse);
    } catch(error) {
        res.status(400).send(error.message);
    }
});

export default router;