import api from './routes';
// import and instantiate express
const express = require('express');
const app = express();

// do some setup for express
app.disable('x-powered-by');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', api);

// sample route
app.get('/', (req, res) => {
  res.send('Hello World');
});

// get port from env variable or default to 3000
const { PORT } = process.env;
const port = PORT ? PORT : 3000;

app.listen(port, () => {
  console.log(`Running on port: ${port}`);
});
