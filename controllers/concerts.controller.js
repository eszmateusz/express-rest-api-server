const Concert = require('../models/concert.model');

exports.getAll = async (req, res) => {
  try {
    res.json(await Concert.find());
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getRandom = async (req, res) => {
  try {
    const count = await Concert.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const con = await Concert.findOne().skip(rand);

    if (!con) {
      res.status(404).json({ message: 'Not found...' });
    } else {
      res.json(con);
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getByPerformer = async (req, res) => {
	try {
		const con = await Concert.find({performer: req.params.performer});

		if (!con) {
      res.status(404).json({ message: 'Not found...' });
    } else {
      res.json(con);
    }
	} catch (err) {
		res.status(500).json({ message: err });
	}
};

exports.getByGenre = async (req, res) => {
	try {
		const con = await Concert.find({genre: req.params.genre});

		if (!con) {
      res.status(404).json({ message: 'Not found...' });
    } else {
      res.json(con);
    }
	} catch (err) {
		res.status(500).json({ message: err });
	}
};

exports.getByPriceMinMax = async (req, res) => {
	try {
    const con = await Concert.find({price: {$gte: req.params.price_min, $lte: req.params.price_max }});

    if (!con) {
      res.status(404).json({ message: 'Not found...' });
    } else {
      res.json(con);
    }
	} catch (err) {
    res.status(500).json({ message: err });
	}
};

exports.getByDay = async (req, res) => {
	try {
		const con = await Concert.find({day: req.params.day});

		if (!con) {
      res.status(404).json({ message: 'Not found...' });
    } else {
      res.json(con);
    }
	}	catch (err) {
    res.status(500).json({ message: err });
	}
};

exports.getById = async (req, res) => {
  try {
    const con = await Concert.findById(req.params.id);

    if (!con) {
      res.status(404).json({ message: 'Not found...' });
    } else {
      res.json(con);
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.postNew = async (req, res) => {
  try {
    const {performer, genre, price, day, image} = req.body;
    const newConcert = new Concert({performer: performer, genre: genre, price: price, day: day, image: image});
    await newConcert.save();
    res.json(newConcert);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.modifyById = (req, res) => {
  const {performer, genre, price, day, image} = req.body;

  try {
    Concert.findByIdAndUpdate(req.params.id, {$set: {performer: performer, genre: genre, price: price, day: day, image: image}}, {new: true}, (err, doc) => {
      err ? res.status(404).json({ message: 'Not found...' })
      : res.json(doc);
    });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.deleteById = (req, res) => {
  try {
    Concert.findByIdAndDelete(req.params.id, {new: false}, (err, doc) => {
      err ? res.status(404).json({ message: 'Not found...' })
      : res.json(doc);
    });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};