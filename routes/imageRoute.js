const express = require('express');
const { generateImage } = require('../controllers/imageController');

const router = express.Router();

router.post('/generate-image', generateImage);
router.get('/discover-image', generateImage);

module.exports = router;
