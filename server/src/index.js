import api from './routes';
import compression from 'compression';
import cors from 'cors';

// import and instantiate express
const express = require('express');
const app = express();

app.use(cors());
app.use(compression());
app.use(express.static('public'));

// do some setup for express
app.disable('x-powered-by');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// The api which will provide the initial data load to the webpage
app.use('/api', api);

// get port from env variable or default to 3000
const { PORT } = process.env;
const port = PORT ? PORT : 8080;

app.listen(port, () => {
  console.log(`Running on port: ${port}`);
});
