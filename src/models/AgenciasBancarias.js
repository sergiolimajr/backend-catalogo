const mongoose = require('mongoose');

const AgenciasBancarias = new mongoose.Schema({
	properties: {
		banco: String,
		municipio: String,
		endereco: String,
		agencia: String,
		telefone: String
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

module.exports = mongoose.model('AgenciasBancarias', AgenciasBancarias);
