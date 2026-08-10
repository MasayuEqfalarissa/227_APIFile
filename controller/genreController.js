const db = require("../models");
const Genre = db.Genre;

async function getAllGenre(req, res) {
    try {
        const genres = await Genre.findAll();
        res.status(200).json(genres);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function createGenre(req, res) {
    try {
        const { name } = req.body;
        const newGenre = await Genre.create({ name });
        res.status(201).json(newGenre);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}