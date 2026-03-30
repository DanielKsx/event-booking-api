const express = require('express');
const router = express.Router();
const TestimonialController = require('../controllers/testimonial.controller');


router.get('/testimonials', TestimonialController.getAll);
router.get('/testimonials/random', TestimonialController.getRandom);
router.get('/testimonials/:id', TestimonialController.getById);
router.post('/testimonials', TestimonialController.create);
router.put('/testimonials/:id', TestimonialController.update);
router.delete('/testimonials/:id', TestimonialController.delete);

module.exports = router;