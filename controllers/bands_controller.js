// DEPENDENCIES
const bands = require('express').Router();
const db = require('../models');
const { Band } = db;

//Routes
//Retrieve all bands
bands.get('/', async (req, res) => {
  try {
      const foundBands = await Band.findAll();
      res.status(200).json(foundBands);
  } catch (error) {
      res.status(500).json(error);
  }
});

// EXPORT
module.exports = bands;