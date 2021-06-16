const ORDER_ASC = 'asc';

const SORTBY_YDS = 'yds';
const SORTBY_LNG = 'lng';
const SORTBY_TD = 'td';

/**
 * Determines if the order is ASC or not
 * @param {String} sortOrder - either ASC or DESC
 * @returns {boolean}
 */
const isAscending = (sortOrder) => sortOrder.toLowerCase() === ORDER_ASC;

/**
 * @typedef {Object} compareType
 * @param {Object} a - object of fields
 * @param {Object} b - object of fields
 * @returns {number}
 */

/**
 * Compares Yds field in asscending order
 * @param {compareType}
 */
const compareAscYds = (a, b) => a['Yds'] - b['Yds'];

/**
 * Compares Yds field in Descending order
 * @param {compareType}
 */
const compareDescYds = (a, b) => b['Yds'] - a['Yds'];

/**
 * Compares TD field in asscending order
 * @param {compareType}
 */
const compareAscTD = (a, b) => a['TD'] - b['TD'];

/**
 * Compares TD field in Descending order
 * @param {compareType}
 */
const compareDescTD = (a, b) => b['TD'] - a['TD'];

/**
 * Parses out the longest yards and ignores the T flag if it exists
 * @param {String|number} lngNumber - This is sometimes a string or a number like '55T' or 55
 * @returns {number}
 */
const parseLngNumber = (lngNumber) => {
  lngNumber = lngNumber + '';
  if (lngNumber.slice(-1) === 'T') {
    return parseInt(lngNumber.slice(0, -1));
  }
  return parseInt(lngNumber);
};

/**
 * Compares Lng field in asscending order
 * @param {compareType}
 */
const compareAscLng = (a, b) => {
  let firstElem = parseLngNumber(a['Lng']);
  let secondElem = parseLngNumber(b['Lng']);

  return firstElem - secondElem;
};

/**
 * Compares Lng field in Descending order
 * @param {compareType}
 */
const compareDescLng = (a, b) => {
  let firstElem = parseLngNumber(a['Lng']);
  let secondElem = parseLngNumber(b['Lng']);

  return secondElem - firstElem;
};

/**
 *
 * @param {Array<Object>} parsedData - Parsed array of objects containing Lng, Yds, TD fields at least
 * @param {String} sortBy - either Lng, Yds, or TD (cases don't matter)
 * @param {String} sortOrder - either ASC or DESC (cases don't matter)
 */
const sortHelper = (parsedData, sortBy, sortOrder) => {
  switch (sortBy.toLowerCase()) {
    case SORTBY_YDS:
      if (isAscending(sortOrder)) parsedData.sort(compareAscYds);
      else parsedData.sort(compareDescYds);
      break;
    case SORTBY_LNG:
      if (isAscending(sortOrder)) parsedData.sort(compareAscLng);
      else parsedData.sort(compareDescLng);
      break;
    case SORTBY_TD:
      if (isAscending(sortOrder)) parsedData.sort(compareAscTD);
      else parsedData.sort(compareDescTD);
    default:
      break;
  }
};

export { sortHelper };
