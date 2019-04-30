const express = require('express');
const router = express.Router();

const BasesDeSamu = require('./controllers/BasesSamuController');
router.get('/basesamu', BasesDeSamu.index);
router.post('/basesamu', BasesDeSamu.store);

const EscolasEstaduais = require('./controllers/EscolasEstaduaisController');
router.get('/escolasestaduais', EscolasEstaduais.index);
router.post('/escolasestaduais', EscolasEstaduais.store);

const AgenciasBancarias = require('./controllers/AgenciasBancariasController');
router.get('/agenciasbancarias', AgenciasBancarias.index);
router.post('/agenciasbancarias', AgenciasBancarias.store);

module.exports = router;
