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
 * This is for custom fields sorting that the DB can't handle because the fields are loosly typed (can be string/integer/float/etc.)
 * @param {Array<Object>} parsedData - Parsed array of objects containing Lng fields at least
 * @param {String} sortBy - either Lng(cases don't matter)
 * @param {String} sortOrder - either ASC or DESC (cases don't matter)
 */
const sortHelper = (parsedData, sortBy, sortOrder) => {
  if (sortBy.toLowerCase() === SORTBY_LNG) {
    if (isAscending(sortOrder)) parsedData.sort(compareAscLng);
    else parsedData.sort(compareDescLng);
  }
};

export { sortHelper, isAscending };
