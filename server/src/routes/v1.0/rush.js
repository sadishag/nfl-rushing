import express from 'express';
import { getRushingData } from '../../controller/rushing';
import { generateCSV } from '../../util/csvUtil';
const rush = express();

rush.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page);
    const rowsPerPage = parseInt(req.query.rowsPerPage);
    const playerName = req.query.search;
    const sortBy = req.query.sortBy || ''; // Yds, Lng, TD
    const sortOrder = req.query.sortOrder || ''; // ASC, DESC

    const data = await getRushingData(
      page,
      rowsPerPage,
      playerName,
      sortBy,
      sortOrder
    );
    if (data === null) {
      return res.sendStatus(404);
    }
    return res.send(data);
  } catch (error) {
    console.error(error);
    return res.sendStatus(500);
  }
});

rush.get('/download-csv', async (req, res) => {
  try {
    const playerName = req.query.search;
    const sortBy = req.query.sortBy || ''; // Yds, Lng, TD
    const sortOrder = req.query.sortOrder || ''; // ASC, DESC

    const rushData = await getRushingData(
      '',
      '',
      playerName,
      sortBy,
      sortOrder
    );
    const data = generateCSV(rushData.data);
    const { Readable } = require('stream');
    const readStream = Readable.from(data);
    res.attachment('rushing.csv');
    return readStream.pipe(res);
  } catch (error) {
    console.error(error);
    return res.sendStatus(500);
  }
});

export default rush;
