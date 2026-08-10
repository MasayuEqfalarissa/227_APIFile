const db = require("../models");

const KomikModel = db.Komik || db.komik;
const GenreModel = db.Genre || db.genre;

async function getAllKomik(req, res) {
    try {
        const komik = await KomikModel.findAll();
        res.status(200).json(komik);
    } catch (err) {
        console.error("Error fetching komik:", err.message);
        res.status(500).json({ error: "failed to fetch komik" });
    }
}


async function getKomikById(req, res) {
    const { id } = req.params;
    try {
        const komik = await KomikModel.findByPk(id);
        if (!komik) {
            return res.status(404).json({ error: "komik not found" });
        }
        res.status(200).json(komik);
    } catch (err) {
        console.error("Error fetching komik by ID:", err.message);
        res.status(500).json({ error: "failed to fetch komik" });
    }
}