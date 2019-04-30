const axios = require('axios');
const BasesDeSamu = require('../models/BasesDeSamu');

class BasesDeSamuController {
	async store (req, res) {
		try {
			const data = axios.get('http://dados.al.gov.br/dataset/fa88daf0-7510-49a3-8463-8d28a9d5dfc2/resource/65f98c86-1c25-446b-ac1d-05cee952617a/download/base.geojson')
			.then(response => {
				const bases_samu = response.data.features.map(el => {
					const { properties: { Nome: nome, Município: municipio, Endereço: endereco,  }, geometry: { type, coordinates } } = el;

					const base_samu = BasesDeSamu.create({
						properties: {
							nome: nome,
							municipio: municipio,
							endereco: endereco
						},
						geometry: {
							type: type,
							coordinates: [
								latitude = coordinates[0],
								longitude = coordinates[1]
							]
						}
					});

					return base_samu;
				});

				return bases_samu;
			});

			return res.json(data);
		} catch (error) {
			return res.status(500).send({ error: 'Erro interno do servidor - ' });
		}
	}

	async index (req, res) {
		BasesDeSamu.find((err, bases) => {
			try {
				res.status(200).send(bases);
			} catch(error) {
				res.status(500).send({ error: 'Erro interno do servidor.' });
			}
		});
	}
}

module.exports = new BasesDeSamuController();
