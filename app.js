const express = require('express');
const app = express();
const env = require('dotenv').config();
const db = require('./config/db');
db();

app.listen(process.env.PORT, (err) => {
    if (err) {
        console.error('Failed to start server:', err);
    } else {
        console.log(`Server running on port ${process.env.PORT}`);
    }
});

module.exports = app;
