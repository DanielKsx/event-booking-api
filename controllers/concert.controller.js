const Concert = require('../models/concert.model');

exports.getAll = async (req, res) => {
    try {
        const concert = await Concert.find();
        res.json(concert);
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

exports.getRandom = async (req, res) => {
    try {
        const count = await Concert.countDocuments();
        const rand = Math.floor(Math.random() * count);
        const concert = await Concert.findOne().skip(rand);
        if (!concert) res.status(404).json({ message: 'Not Found' });
        else res.json(concert);
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

exports.getById = async (req, res) => {
    try {
        const concert = await Concert.findById(req.params.id);
        if (!concert) res.status(404).json({ message: 'Not found' });
        else res.json(concert);
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

exports.create = async (req, res) => {
    try {
        const { performer, genre, price, day, image } = req.body;
        const newConcert = new Concert({ performer, genre, price, day, image });
        await newConcert.save();
        res.json({ message: 'OK' });
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

exports.update = async (req, res) => {
    try {
        const { performer, genre, price, day, image } = req.body;
        const concert = await Concert.findById(req.params.id);
        if (concert) {
            await Concert.updateOne({ _id: req.params.id }, { $set: { performer, genre, price, day, image } });
            res.json({ message: 'OK' });
        } else {
            res.status(404).json({ message: 'Not Found...' });
        }
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

exports.delete = async (req, res) => {
    try {
        const concert = await Concert.findById(req.params.id);
        if (concert) {
            await Concert.deleteOne({ _id: req.params.id });
            res.json({ message: 'OK' });
        } else {
            res.status(404).json({ message: 'Not Found...' });
        }
    } catch (err) {
        res.status(500).json({ message: err });
    }
};