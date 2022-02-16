// DEPENDENCIES
const stages = require('express').Router();
const db = require('../models');
const { Stage, Event, StageEvent } = db;

//Routes
//Retrieve all bands
stages.get('/', async (req, res) => {
  try {
      const foundStages = await Stage.findAll();
      res.status(200).json(foundStages);
  } catch (error) {
      res.status(500).json(error);
  }
});

// CREATE A BAND
stages.post('/', async (req, res) => {
  try {
      const newStage = await Stage.create(req.body);
      res.status(200).json({
          data: newStage
      });
  } catch(err) {
      res.status(500).json(err);
  }
});

// FIND A SPECIFIC BAND
stages.get('/:name', async (req, res) => {
  try {
      const foundStage = await Stage.findOne({
          where: { stage_name: req.params.name },
          include: {
              model: Event,
              as: 'events',
              include: {
                  model: StageEvent,
                  as: 'stage_events',
                  where: {event_id: {[Op.like]: `%${req.query.event_id ? req.query.event_id : ''}%`}}
              }
          }
      });
      res.status(200).json(foundStage);
  } catch (error) {
      res.status(500).json(error);
  }
});

// UPDATE A BAND
stages.put('/:id', async (req, res) => {
  try {
      const updatedStages = await Stage.update(req.body, {
          where: {
              stage_id: req.params.id
          }
      });
      res.status(200).json({
          message: `Successfully updated ${updatedStages} stage(s)`
      });
  } catch(err) {
      res.status(500).json(err);
  }
});

// DELETE A BAND
stages.delete('/:id', async (req, res) => {
  try {
      const deletedStages = await Stage.destroy({
          where: {
              stage_id: req.params.id
          }
      });
      res.status(200).json({
          message: `Successfully deleted ${deletedStages} stage(s)`
      });
  } catch(err) {
      res.status(500).json(err);
  }
});

// EXPORT
module.exports = stages;