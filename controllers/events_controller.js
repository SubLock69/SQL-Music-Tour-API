// DEPENDENCIES
const events = require('express').Router();
const db = require('../models');
const { Event, Stage, MeetGreet, SetTime, Band, StageEvent } = db;

//Routes
//Retrieve all events
events.get('/', async (req, res) => {
  try {
      const foundEvents = await Event.findAll();
      res.status(200).json(foundEvents);
  } catch (error) {
      res.status(500).json(error);
  }
});

// CREATE A BAND
events.post('/', async (req, res) => {
  try {
      const newEvent = await Event.create(req.body);
      res.status(200).json({
          data: newEvent
      });
  } catch(err) {
      res.status(500).json(err);
  }
});

// FIND A SPECIFIC BAND
events.get('/:name', async (req, res) => {
  try {
      const foundEvent = await Event.findOne({
          where: { name: req.params.name },
          include: [
              {
                  model: MeetGreet,
                  as: 'meet_greets',
                  include: {
                      model: Band,
                      as: 'band',
                      where: {band_id: {[Op.like]: `%${req.query.band_id ? req.query.band_id : ''}%`}}
                  }
              },{
                  model: SetTime,
                  as: 'set_times',
                  include: [
                    {
                        model: Band,
                        as: 'band',
                        where: {band_id: {[Op.like]: `%${req.query.band_id ? req.query.band_id : ''}%`}}
                    },
                    {
                        model: Stage,
                        as: 'stage',
                        where: {stage_id: {[Op.like]: `%${req.query.stage_id ? req.query.stage_id : ''}%`}}
                    }
                  ]
              },{
                  model: Stage,
                  as: 'stages',
                  include: {
                    model: StageEvent,
                    as: 'stage_events',
                    where: {stage_id: {[Op.like]: `%${req.query.stage_id ? req.query.stage_id : ''}%`}}
                  }
              }
          ]
      });
      res.status(200).json(foundEvent);
  } catch (error) {
      res.status(500).json(error);
  }
});

// UPDATE A BAND
events.put('/:id', async (req, res) => {
  try {
      const updatedEvents = await Event.update(req.body, {
          where: {
              event_id: req.params.id
          }
      });
      res.status(200).json({
          message: `Successfully updated ${updatedEvents} event(s)`
      });
  } catch(err) {
      res.status(500).json(err);
  }
});

// DELETE A BAND
events.delete('/:id', async (req, res) => {
  try {
      const deletedEvents = await Event.destroy({
          where: {
              event_id: req.params.id
          }
      });
      res.status(200).json({
          message: `Successfully deleted ${deletedEvents} event(s)`
      });
  } catch(err) {
      res.status(500).json(err);
  }
});

// EXPORT
module.exports = events;