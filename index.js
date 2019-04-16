const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');

dotenv.config();

const PORT = process.env.PORT || 8000

const apiInfo = require('./routes/apiInfo');
const users = require('./routes/users');
const ditters = require('./routes/ditters');

const app = express();

mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true);
mongoose.connect(process.env.MONGODB_ENDPOINT, { useNewUrlParser: true });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors());

app.use('/api/v1', apiInfo);
app.use('/api/v1/ditters', ditters);
app.use('/api/v1/users', users);


app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));