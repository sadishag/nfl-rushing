import express from 'express';
import App from '../../client/components/app.jsx';
import React from 'react';
import { renderToString } from 'react-dom/server';
import hbs from 'handlebars';

const frontend = express.Router();

frontend.get('/', async (req, res) => {
  try {
    const html = `
    <html>
    <head><title>nfl-rushing</title></head>
    <body>
    <h1>nfl-rushing Page</h1>
    <div id="appelement">{{{appelement}}}</div>
    <script src="/app.js" charset="utf-8"></script>
    <script src="/vendor.js" charset="utf-8"></script>
    </body>
    </html>
    `;

    const hbsTemplate = hbs.compile(html);
    const reactComp = renderToString(<App />);
    console.log(reactComp);
    const htmlToSend = hbsTemplate({ appelement: reactComp });
    console.log(htmlToSend);
    res.send(htmlToSend);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

export default frontend;
