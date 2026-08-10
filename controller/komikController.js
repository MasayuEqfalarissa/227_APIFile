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