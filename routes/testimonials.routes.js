const express = require('express');
const router = express.Router();
const db = require('../db');
const uuid = require('uuid');

router.route('/testimonials').get((req, res) => {
  res.json(db.testimonials);
})

router.route('/testimonials/random').get((req, res) => {
  let randomTestimonials = Math.floor(Math.random() * 2);
  res.json(db.testimonials[randomTestimonials]);
});

router.route('/testimonials/:id').get((req, res) => {
  res.json(db.testimonials[req.params.id - 1]);
});

router.route('/testimonials').post((req, res) => {
  db.testimonials.push({
    id: uuid.v4(),
    author: req.body.author,
    text: req.body.text,
  });
  res.json({ message: "Ok!" });
});

router.route('/testimonials/:id').put((req, res) => {
  db.testimonials = db.testimonials.map(item => {
    if (item.id == req.params.id) {
      return {
        id: req.params.id,
        author: req.body.author,
        text: req.body.text,
      };
    } else {
      return item;
    };
  })
  res.json({ message: "Ok!" });
});

router.route('/testimonials/:id').delete((req, res) => {
  db.testimonials.splice(req.params.id, 1);
  res.json({ message: "Ok!" });
});

module.exports = router;