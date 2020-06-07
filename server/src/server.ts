import express from 'express';

const app = express();

app.get('/users', (req, res) => {
  res.send(['Arthur']);
});

app.listen(3333);