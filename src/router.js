const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
  res.status(200).send('Hi There!');
});

router.get('/counter', (req, res, next) => {

  const knex = req.app.get('db');

  knex('counter')
    .first('value')
    .then((row) => {
      res.status(200).json({ value: row.value });
    })
    .catch(next);
});

router.put('/counter', express.json(), (req, res, next) => {

  // ref: https://eslint.org/docs/rules/no-prototype-builtins
  if (!Object.prototype.hasOwnProperty.call(req.body, 'step')) {
    return res.status(400).json({ error: '"step" is required' });
  }

  const step = Number.parseInt(req.body.step, 10);

  if (!Number.isInteger(step)) {
    return res.status(400).json({ error: '"step" must be an integer' });
  }

  const knex = req.app.get('db');

  knex('counter')
    .update('value', knex.raw(`value + ${step}`))
    .returning('value')
    .then((rows) => {
      res.status(200).json({ value: rows[0] });
    })
    .catch(next);
});

router.get('/status', (req, res, next) => {
  res.status(200).end();
});

router.post('/crash', (req, res, next) => {
  process.exit(187);
});

module.exports = router;
