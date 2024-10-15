const express = require('express');
const { generateImage, getImages } = require('../controllers/imageController');

const router = express.Router();

router.post('/generate-image', generateImage);
router.get('/discover-image', getImages);

module.exports = router;
