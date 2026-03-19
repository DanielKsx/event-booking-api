const express = require('express');
const router = express.Router();
const db = require('./../db');
const { v4: uuidv4 } = require('uuid');

router.route('/concerts').get((req, res) => {
    res.json(db.concerts);
});

router.route('/concerts/:id').get((req, res) => {
    const item = db.concerts.find(item => item.id === req.params.id);
    if (!item) {
        return res.status(404).json({ message: 'Not found' });
    }
    res.json(item);
});

router.route('/concerts').post((req, res) => {
    const { performer, genre, price, day, image } = req.body;
    if (!performer || !genre || !price || !day || !image) {
        return res.status(400).json({ message: 'Missing data' });
    }
    const newItem = { id: uuidv4(), performer, genre, price: Number(price), day: Number(day), image };
    db.concerts.push(newItem);
    res.json({ message: 'ok' });
});

router.route('/concerts/:id').delete((req, res) => {
    const index = db.concerts.findIndex(item => item.id === req.params.id);
    if (index === -1) {
        return res.status(404).json({ message: 'Not found' });
    }
    db.concerts.splice(index, 1);
    res.json({ message: 'ok' });
});

router.route('/concerts/:id').put((req, res) => {
    const item = db.concerts.find(item => item.id === req.params.id);
    if (!item) {
        return res.status(404).json({ message: 'Not found' });
    }
    const { performer, genre, price, day, image } = req.body;
    if (!performer || !genre || !price || !day || !image) {
        return res.status(400).json({ message: 'Missing data' });
    }
    item.performer = performer;
    item.genre = genre;
    item.price = Number(price);
    item.day = Number(day);
    item.image = image;
    res.json({ message: 'ok' });
});



module.exports = router;