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

async function createKomik(req, res) {
    const { judul, title, sinopsis, description, tahun_terbit, penulis_id, genre_id } = req.body;
    try {
        const newKomik = await KomikModel.create({
            judul: judul || title,
            title: title || judul,
            sinopsis: sinopsis || description,
            description: description || sinopsis,
            tahun_terbit,
            penulis_id,
            penulis_Id: penulis_id
        });

        if (genre_id && Array.isArray(genre_id) && GenreModel && newKomik.setGenres) {
            const genres = await GenreModel.findAll({ where: { id: genre_id } });
            await newKomik.setGenres(genres);
        }

        res.status(201).json(newKomik);
    } catch (err) {
        console.error("Error creating komik:", err.message);
        res.status(500).json({ error: "failed to create komik" });
    }
}

async function updateKomik(req, res) {
    const { id } = req.params;
    const { judul, title, sinopsis, description, tahun_terbit, penulis_id, genre_id } = req.body;
    
    try {
        const komik = await KomikModel.findByPk(id);
        if (!komik) {
            return res.status(404).json({ error: "komik not found" });
        }

        // Susun payload update secara dinamis agar hanya mengupdate field yang dikirim
        const updateData = {};
        if (judul || title) updateData.judul = judul || title;
        if (sinopsis || description) updateData.sinopsis = sinopsis || description;
        if (tahun_terbit) updateData.tahun_terbit = tahun_terbit;
        if (penulis_id) {
            updateData.penulis_id = penulis_id;
            updateData.penulis_Id = penulis_id;
        }

        await komik.update(updateData);

        // Update relasi Genre jika metode setGenres tersedia
        if (genre_id && Array.isArray(genre_id) && GenreModel && typeof komik.setGenres === 'function') {
            const genres = await GenreModel.findAll({ where: { id: genre_id } });
            await komik.setGenres(genres);
        }

        res.status(200).json({
            message: "Komik berhasil diperbarui",
            data: komik
        });
    } catch (err) {
        console.error("Error updating komik:", err);
        res.status(500).json({ error: err.message || "failed to update komik" });
    } 
}
