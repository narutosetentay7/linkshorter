const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

dotenv.config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("DB connected");
}).catch(err => console.error(err));

const routes = require('./routes/index');
app.use('/', routes);

console.log(process.env.MONGO_URI);


app.listen(PORT, () => {
    console.log("Server listening on port " + PORT);
})