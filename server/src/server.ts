import express from 'express';

const app = express();

app.get('/users', (req, res) => {
  res.send(['a', 'Ferreira', 'de', 'oasaliveira']);
});

app.listen(3333);