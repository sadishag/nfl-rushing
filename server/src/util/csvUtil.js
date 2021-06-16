import fs from 'fs';

/**
 * Returns a CSV string of the json object
 * @param {Object} jsonArray - parsed array of object
 * @returns {String}
 */
const buildCSVString = (jsonArray) => {
  let csvString = '';
  const separator = ',';
  Object.keys(jsonArray[0]).forEach(
    (key) => (csvString += `${key}${separator}`)
  ); // take the keys of the first object
  csvString = csvString.slice(0, -1);
  csvString += '\n';

  jsonArray.forEach((value) => {
    Object.values(value).forEach((data) => {
      csvString += `${data}${separator}`;
    });
    csvString = csvString.slice(0, -1);
    csvString += '\n';
  });

  return csvString;
};

/**
 * Returns the csv string of all rushing data
 * @returns {String}
 */
const generateCSV = () => {
  try {
    const rushData = fs.readFileSync(
      `${__dirname}/../data/rushing.json`,
      'utf-8'
    );
    const parsed = JSON.parse(rushData);

    return buildCSVString(parsed, 'csv.csv');
  } catch (error) {
    throw error;
  }
};

export { generateCSV, buildCSVString };
