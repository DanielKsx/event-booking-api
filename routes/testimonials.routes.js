const express = require('express');
const router = express.Router();
const db = require('./../db');
const { v4: uuidv4 } = require('uuid');

router.route('/testimonials').get((req, res) => {
    res.json(db.testimonials);
});

router.route('/testimonials/random').get((req, res) => {
    const randomIndex = Math.floor(Math.random() * db.testimonials.length);
    const item = db.testimonials[randomIndex];
    res.json(item);
});

router.route('/testimonials/:id').get((req, res) => {
    const item = db.testimonials.find(item => item.id === req.params.id);
    if (!item) {
        return res.status(404).json({ message: 'Not found' });
    }
    res.json(item);
});


router.route('/testimonials').post((req, res) => {
    const { author, text } = req.body;
    if (!author || !text) {
        return res.status(400).json({ message: 'Missing data' });
    }
    const newItem = { id: uuidv4(), author, text };
    db.testimonials.push(newItem);
    res.json({ message: 'OK' });
});

router.route('/testimonials/:id').put((req, res) => {
    const item = db.testimonials.find(item => item.id === req.params.id);
    if (!item) {
        return res.status(404).json({ message: 'Not found' });
    }
    const { author, text } = req.body;
    if (!author || !text) {
        return res.status(400).json({ message: 'Missing data' });
    }
    item.author = author;
    item.text = text;
    res.json({ message: 'OK' });
});

router.route('/testimonials/:id').delete((req, res) => {
    const index = db.testimonials.findIndex(item => item.id === req.params.id);
    if (index === -1) {
        return res.status(404).json({ message: 'Not found' });
    }
    db.testimonials.splice(index, 1);
    res.json({ message: 'OK' });
});

module.exports = router;