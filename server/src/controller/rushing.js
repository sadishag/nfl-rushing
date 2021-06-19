import { sortHelper, isAscending } from '../util/sortUtil';
import { getClient, getDataWithFilters } from './db';

/**
 * gets the contents of rushing.json
 * @param {number} page - page to query
 * @param {number} rowsPerPage - number of rows per page
 * @param {String} searchByName - string to search name by
 * @param {String} sortBy - sort by either Lng, Yds, TD
 * @param {String} sortOrder - sort direction either ASC or DESC
 * @returns {Object} json object of all the rushing contents
 */
const getRushingData = async (
  page,
  rowsPerPage,
  searchByName,
  sortBy,
  sortOrder
) => {
  try {
    const dbClient = await getClient();

    const sortQuery = {};
    if (sortBy && sortBy !== 'Lng' && sortOrder) {
      sortQuery[sortBy] = isAscending(sortOrder) ? 1 : -1;
    }

    let parsedData = await getDataWithFilters(
      dbClient,
      searchByName,
      sortQuery
    );

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
      data: parsedData.slice(pageStartIndex, pageEndIndex)
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export { getRushingData };
