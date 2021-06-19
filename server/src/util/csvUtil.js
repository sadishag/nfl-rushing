/**
 * Builds an object for the header without duplicates or extra fields and sets an order
 * @param {Array<Object>} jsonArray - parsed array of object
 * @returns {Object}
 */
const buildHeaderIndexLookup = (jsonArray) => {
  const headerIndexLookup = [];
  let idx = 0;
  jsonArray.forEach((obj) => {
    Object.keys(obj).forEach((key) => {
      if (!headerIndexLookup[key]) {
        headerIndexLookup[key] = idx;
        idx++;
      }
    });
  });
  return headerIndexLookup;
};

/**
 * Returns a CSV string of the json object
 * @param {Array<Object>} jsonArray - parsed array of object
 * @returns {String}
 */
const buildCSVString = (jsonArray) => {
  let csvString = '';
  const separator = ',';

  let headerIndexLookup = buildHeaderIndexLookup(jsonArray);
  headerIndexLookup = Object.keys(headerIndexLookup).sort((a, b) => {
    return headerIndexLookup[a] - headerIndexLookup[b];
  });

  headerIndexLookup.forEach((key) => (csvString += `${key}${separator}`));

  csvString = csvString.slice(0, -1);
  csvString += '\r\n';

  jsonArray.forEach((obj) => {
    headerIndexLookup.forEach((key) => {
      csvString += `${obj[key] !== undefined ? obj[key] : ''}${separator}`;
    });
    csvString = csvString.slice(0, -1);
    csvString += '\r\n';
  });

  return csvString;
};

/**
 * Returns the csv string of all rushing data
 * @param {Array<Object>} - Json data from db
 * @returns {String}
 */
const generateCSV = (rushData) => {
  try {
    return buildCSVString(rushData, 'csv.csv');
  } catch (error) {
    throw error;
  }
};

export { generateCSV };
