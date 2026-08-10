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

async function updateGenre(req, res) {
    try {
        const { id } = req.params;
        const { name } = req.body;
        const genre = await Genre.findByPk(id);
        if (!genre) return res.status(404).json({ error: "Genre tidak ditemukan" });

        genre.name = name;
        await genre.save();
        res.status(200).json(genre);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function deleteGenre(req, res) {
    try {
        const { id } = req.params;
        const genre = await Genre.findByPk(id);
        if (!genre) return res.status(404).json({ error: "Genre tidak ditemukan" });

        await genre.destroy();
        res.status(200).json({ message: "Genre berhasil dihapus" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = {
    getAllGenre,
    createGenre,
    updateGenre,
    deleteGenre
};