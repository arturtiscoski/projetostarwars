const express = require('express');
const SkyWarsApi = require('../skyWarsApi/SkyWarsApi');

const router = new express.Router();

router.route('/skywars/:id?')
  .get(SkyWarsApi.get);

module.exports = router;