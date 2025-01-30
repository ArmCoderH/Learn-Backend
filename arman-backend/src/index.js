import dotenv from 'dotenv'
import mongoose from 'mongoose'
import express from 'express'
import { DB_NAME } from './constants.js'
import connectDB from './db/db.js'
import { app } from './app.js'

dotenv.config({
    path: './.env'  // ✅ Correct path (dot laga ke)
})

connectDB()
    .then(() => {
        const PORT = process.env.PORT || 8000;
        app.listen(PORT, () => {  // ✅ Correct function syntax
            console.log(`🚀 Server running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.log('❌ MONGO ERROR:', err);
    });
