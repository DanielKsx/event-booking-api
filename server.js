const express = require('express');
const cors = require('cors');
const path = require('path')
const { Server } = require('socket.io');
const mongoose = require('mongoose');
require('dotenv').config();
const helmet = require('helmet');

const testimonialsRoutes = require('./routes/testimonials.routes');
const concertsRoutes = require('./routes/concerts.routes');
const seatsRoutes = require('./routes/seats.routes');

const app = express();

app.use(helmet());

app.use(cors({
  origin: 'http://localhost:3000'
}));

const server = app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running on port: 8000');
});

const io = new Server(server);

io.on('connection', (socket) => {
  console.log('New socket !' + socket.id);
});

app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', testimonialsRoutes);
app.use('/api', concertsRoutes);
app.use('/api', seatsRoutes);

app.use(express.static(path.join(__dirname, '/client/build')));

app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

mongoose.connect(process.env.DB_URL)
  .then(() => console.log('Connected to the database'))
  .catch(err => console.log('Error: ' + err));





