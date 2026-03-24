const express = require('express');
const router = express.Router();
const db = require('./../db');
const { v4: uuidv4 } = require('uuid');

router.route('/seats').get((req, res) => {
    res.json(db.seats);
});

router.route('/seats/:id').get((req, res) => {
    const item = db.seats.find(item => item.id === req.params.id);
    if (!item) {
        return res.status(404).json({ message: 'Not found' });
    }
    res.json(item);
});

router.route('/seats').post((req, res) => {
    const { day, seat, client, email } = req.body;
    if (!day || !seat || !client || !email) {
        return res.status(400).json({ message: 'Missing data' });
    }
    const seatTaken = db.seats.some(item => item.day === Number(day) && item.seat === Number(seat));
    if (seatTaken) {
        return res.status(409).json({ message: 'The slot is already taken...' });
    }
    const newItem = { id: uuidv4(), day: Number(day), seat: Number(seat), client, email };
    db.seats.push(newItem);
    req.io.emit('seatsUpdated', db.seats)
    res.json({ message: 'ok' });
});

router.route('/seats/:id').delete((req, res) => {
    const index = db.seats.findIndex(item => item.id === req.params.id);
    if (index === -1) {
        return res.status(404).json({ message: 'Not found' });
    }
    db.seats.splice(index, 1);
    res.json({ message: 'ok' });
});

router.route('/seats/:id').put((req, res) => {
    const item = db.seats.find(item => item.id === req.params.id);
    if (!item) {
        return res.status(404).json({ message: 'Not found' });
    }
    const { day, seat, client, email } = req.body;
    if (!day || !seat || !client || !email) {
        return res.status(400).json({ message: 'Missing data' });
    }
    item.day = Number(day);
    item.seat = Number(seat);
    item.client = client;
    item.email = email;
    res.json({ message: 'ok' });
});


module.exports = router;