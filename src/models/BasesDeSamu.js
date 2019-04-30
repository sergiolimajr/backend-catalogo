const mongoose = require('mongoose');

const BasesDeSamu = new mongoose.Schema({
	properties: {
		nome: String,
		municipio: String,
		endereco: String
	},
	geometry: {
		type: {
			type: String
		},
		coordinates: [
			latitude = Number,
			longitude = Number
		]
	}
}, {
	timestamps: true
});

module.exports = mongoose.model('BasesDeSamu', BasesDeSamu);
