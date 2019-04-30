const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());

mongoose.connect('mongodb+srv://sergiojr:sergiojr@cluster0-37i7u.mongodb.net/catalogo?retryWrites=true', {
	useNewUrlParser: true
});

app.use(express.json());
app.use(require('./routes'));

app.listen(process.env.PORT || 3000);
