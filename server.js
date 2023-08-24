require('dotenv').config({
    path: './.env',
});
const port = process.env.PORT || 9000;
const express = require('express');
const path = require('path');

let indexRoutes = require('./main');

const main = async () => {
    const app = express();

   
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
   

    app.use('/', indexRoutes);
    app.use('*', (req, res) => res.status(404).send('404 Not Found'));

    app.listen(port, () => console.log(`App running on port ${port}`));
};
main();