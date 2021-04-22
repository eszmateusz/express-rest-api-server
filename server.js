const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');

const testimonials = require('./routes/testimonials.routes');
const concerts = require('./routes/concerts.routes');
const seats = require('./routes/seats.routes');

const cors = require('cors');
const path = require('path');
const socket = require('socket.io');

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use('/api', testimonials);
app.use('/api', concerts);
app.use('/api', seats);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '/client/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

app.use((req, res) => {
  res.status(404).json({ message: 'Err 404 - Not found...'});
});

const uriDB = process.env.NODE_ENV === 'production' ? `mongodb+srv://${process.env.REMOTE_DB_USERNAME}:${process.env.REMOTE_DB_PASS}@cluster0.g4yjo.mongodb.net/${process.env.REMOTE_DB_MAME}?retryWrites=true&w=majority` : 'mongodb://localhost:27017/NewWaveDB';
mongoose.connect(uriDB, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.once('open', () => {
  console.log('Connected to the database');
});

db.on('error', err => console.log('Error ' + err));

const server = app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running on port: 8000');
});

const io = socket(server);

io.on('connection', socket => {
  console.log(`New socket - ${socket.id}!`);
});

module.exports = server;