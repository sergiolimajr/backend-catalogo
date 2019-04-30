const axios = require('axios');
const AgenciasBancarias = require('../models/AgenciasBancarias');

class AgenciasBancariasController {
	async store (req, res) {
		try {
			const data = axios.get('http://dados.al.gov.br/dataset/420246c7-a8d0-47c0-af8b-26c25f36927c/resource/3a721fbb-806d-46bd-bba8-2d65a231ff55/download/agenciasbancarias.geojson')
			.then(response => {
				const agencias_bancarias = response.data.features.map(el => {
					const {
						properties: {
							Banco: banco,
							Município: municipio,
							Endereço: endereco,
							Agência: agencia,
							Telefone: telefone
						},
						geometry: {
							type,
							coordinates
						}
					} = el;

					const agencia_bancaria = AgenciasBancarias.create({
						properties: {
							banco: banco,
							municipio: municipio,
							endereco: endereco,
							agencia: agencia,
							telefone: telefone
						},
						geometry: {
							type: type,
							coordinates: [
								latitude = coordinates[0],
								longitude = coordinates[1]
							]
						}
					});

					return agencia_bancaria;
				});

				return agencias_bancarias;
			});

			return res.json(data);
		} catch (error) {
			res.status(500).send({ error: 'Erro interno do servidor.' });
		}
	}

	async index (req, res) {
		AgenciasBancarias.find((err, agencias) => {
			try {
				res.status(200).send(agencias);
			} catch (error) {
				res.status(500).send({ error: 'Erro interno do servidor.' });
			}
		});
	}
}

module.exports = new AgenciasBancariasController();
