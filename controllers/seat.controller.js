const Seat = require('../models/seat.model');

exports.getAll = async (req, res) => {
    try{
        const seat = await Seat.find();
        res.json(seat);
    } catch(err){
        res.status(500).json({ message: err });
    }
};

exports.getRandom = async (req, res) => {
    try {
        const count = await Seat.countDocuments();
        const rand = Math.floor(Math.random() * count );
        const seat = await Seat.findOne().skip(rand);
        if(!seat) res.status(404).json({ message: 'Not Found' });
        else res.json(seat);
    } catch (err){
        res.status(500).json({ message: err });
    }
};

exports.getById = async (req, res) => {
    try {
        const seat = await Seat.findById(req.params.id);
        if(!seat) res.status(404).json({ message: 'Not Found' });
        else res.json(seat);
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

exports.create = async (req, res) => {
    try {
        const { day, seat, client, email, concert } = req.body;
        const newSeat = new Seat({ day, seat, client, email, concert });
        await newSeat.save();
        res.json({ message: 'OK' });
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

exports.update = async (req, res) => {
    try {
        const { day, seat, client, email, concert } = req.body;
        const cSeat = await Seat.findById(req.params.id);
        if (cSeat) {
            await Seat.updateOne({ _id: req.params.id}, { $set: {day, seat, client, email, concert} });
            res.json({ message: 'OK' });
        } else {
            res.status(404).json({ message: 'Not Found...' });
        }
    } catch (err){
        res.status(500).json({ message: err });
    }
};

exports.delete = async (req, res) => {
    try {
        const seat = await Seat.findById(req.params.id);
        if (seat) {
            await Seat.deleteOne({ _id: req.params.id });
            res.json({ message: 'OK' });
        } else {
            res.status(404).json({ message: 'Not Found...' });
        }
    } catch (err){
        res.status(500).json({ message: err });
    }
};