const express = require('express');
const router = express.Router();
const SeatController = require('../controllers/seat.controller');

router.get('/seats', SeatController.getAll);
router.get('/seats/random', SeatController.getRandom);
router.get('/seats/:id', SeatController.getById);
router.post('/seats', SeatController.create);
router.put('/seats/:id', SeatController.update);
router.delete('/seats/:id', SeatController.delete);

module.exports = router;