const express = require('express');
const cors = require('cors');
const { sequeize, sequelize } = require('./models');

const app = express();
app.use(cors());
app.use(express.json());



app.listen({port: 5000}, async () => {
    await sequelize.authenticate();
    console.log('Database Connected!');
})