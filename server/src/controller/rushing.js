import fs from 'fs';
import { sortHelper } from '../util/sortUtil';

/**
 * gets the contents of rushing.json
 * @param {number} page - page to query
 * @param {number} rowsPerPage - number of rows per page
 * @param {String} searchByName - string to search name by
 * @param {String} sortBy - sort by either Lng, Yds, TD
 * @param {String} sortOrder - sort direction either ASC or DESC
 * @returns {Object} json object of all the rushing contents
 */
const getRushingData = (page, rowsPerPage, searchByName, sortBy, sortOrder) => {
  try {
    const data = fs.readFileSync(`${__dirname}/../data/rushing.json`, 'utf-8');
    const regex = new RegExp(`.*${searchByName || ''}.*`, 'i');
    let parsedData = JSON.parse(data).filter((d) => regex.test(d.Player));
    sortHelper(parsedData, sortBy, sortOrder);
    if (!page && !rowsPerPage) {
      return { totalPages: 1, currentPage: 1, data: parsedData };
    }
    const numPages = Math.ceil(parsedData.length / rowsPerPage);
    if (page > numPages) {
      return null;
    }
    const pageStartIndex = (page - 1) * rowsPerPage;
    const pageEndIndex = pageStartIndex + rowsPerPage;
    return {
      totalPages: numPages,
      currentPage: page,
      data: parsedData.slice(pageStartIndex, pageEndIndex),
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export { getRushingData };
