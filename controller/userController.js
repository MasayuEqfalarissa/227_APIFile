const db = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = db.User;

async function register(req, res) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email dan password wajib diisi" });
        }
        
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(409).json({ message: "Email sudah terdaftar" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({ 
            email, 
            password: hashedPassword
        });

        return res.status(201).json({ 
            message: "Registrasi Berhasil.",
            data: { id: newUser.id, email: newUser.email }
        });
    } catch (error) {
        return res.status(500).json({ 
            message: "Terjadi kesalahan server", error: error.message 
        });
    } 
}