const express = require('express');
const cors = require('cors');
// const { sequeize, sequelize } = require('./models');
const routes = require('./routes/routes');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/', routes);



app.listen(5000, async () => {
    // await sequelize.authenticate();
    console.log(`Port Listening on : 5000`);
})