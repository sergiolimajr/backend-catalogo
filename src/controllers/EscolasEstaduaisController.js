const axios = require('axios');
const EscolasEstaduais = require('../models/EscolasEstaduais');

class EscolasEstaduaisController {
	async store (req, res) {
		try {
			const data = axios.get('http://dados.al.gov.br/dataset/390ba5c7-c23d-43d9-8cbb-d79ac56d6e12/resource/0d62df84-c8e1-423d-bbbc-c8c03fc718aa/download/escolasestaduaisdealagoas.geojson')
			.then(response => {
				const escolas_estaduais = response.data.features.map(el => {
					const {
						properties: {
							Nome: nome,
							Município: municipio,
							Endereço: endereco,
							Cep: cep,
							Telefone: telefone,
							Etapas: etapas,
							Código: codigo
						},
						geometry: {
							type,
							coordinates
						}
					} = el;

					const escola_estadual = EscolasEstaduais.create({
						properties: {
							nome: nome,
							municipio: municipio,
							endereco: endereco,
							cep: cep,
							telefone: telefone,
							etapas: etapas,
							codigo: codigo
						},
						geometry: {
							type: type,
							coordinates: [
								latitude = coordinates[0],
								longitude = coordinates[1]
							]
						}
					});

					return escola_estadual;
				});

				return escolas_estaduais;
			});

			return res.json(data);
		} catch (error) {
			return res.status(500).send({ error: 'Erro interno do servidor.' });
		}
	}

	async index (req, res) {
		EscolasEstaduais.find((err, escolas) => {
			try {
				res.status(200).send(escolas)
			} catch(err) {
				res.status(500).send({ error: 'Erro interno do servidor.' });
			}
		});
	}
}

module.exports = new EscolasEstaduaisController();
