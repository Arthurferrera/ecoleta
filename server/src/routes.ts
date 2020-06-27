import express from 'express';

const routes = express.Router();

routes.get('/', (req, res) => {
  const search = String(req.query.search);
  return res.json({message: 'ok'});
});

// routes.get('/users/:id', (req, res) => {
//   const id = +req.params.id;
//   return res.json({message: 'ok'});
// });

// routes.post('/users', (req, res) => {
//   const data = req.body;
//   const user = {name: data.name, email: data.email};
//   return res.json(user);
// });

export default routes;