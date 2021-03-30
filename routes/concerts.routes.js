const express = require('express');
const router = express.Router();
const db = require('../db');
const uuid = require('uuid');

router.route('/concerts').get((req, res) => {
  res.json(db.concerts);
})

router.route('/concerts/:id').get((req, res) => {
  res.json(db.concerts[req.params.id - 1]);
});

router.route('/concerts').post((req, res) => {
  db.concerts.push({
    id: uuid.v4(),
    performer: req.body.performer,
    genre: req.body.genre,
    price: req.body.price,
    day: req.body.day,
    image: req.body.image,
  });
  res.json({ message: "Ok!" });
});

router.route('/concerts/:id').put((req, res) => {
  db.concerts = db.concerts.map(item => { 
    if (item.id == req.params.id) {
      return {
        id: req.params.id,
        performer: req.body.performer,
        genre: req.body.genre,
        price: req.body.price,
        day: req.body.day,
        image: req.body.image,
      };
    } else {
      return item;
    };
  });
  res.json({ message: "Ok!" });
});

router.route('/concerts/:id').delete((req, res) => {
  db.concerts.splice(req.params.id, 1);
  res.json({ message: "Ok!" });
});

module.exports = router;