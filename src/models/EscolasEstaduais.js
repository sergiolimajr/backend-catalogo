const mongoose = require('mongoose');

const EscolasEstaduais = new mongoose.Schema({
	properties: {
		nome: String,
		municipio: String,
		endereco: String,
		cep: String,
		telefone: String,
		etapas: String,
		codigo: String
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

module.exports = mongoose.model('EscolasEstaduais', EscolasEstaduais);
