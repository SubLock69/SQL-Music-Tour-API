// DEPENDENCIES
const express = require('express');
const app = express();
const {Sequelize} = require('sequelize');

// CONFIGURATION / MIDDLEWARE
require('dotenv').config();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const sequelize = new Sequelize('tour','postgres','codeking420', {
    host:'localhost',
    port:5432,
    dialect:'postgres',
});

(async () => {
    try {
        await sequelize.authenticate();
        console.log('Connected to DB');
    } catch (err){console.log('Unable to connect!', err)}
})();


// ROOT
app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Welcome to the Tour API'
    });
});

// LISTEN
app.listen(process.env.PORT, () => {
    console.log(`🎸 Rockin' on port: ${process.env.PORT}`);
});