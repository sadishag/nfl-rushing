import { MongoClient } from 'mongodb';

const { MONGODB_URL, MONGODB_USER, MONGODB_PASS, MONGODB_DB } = process.env;

// connection URL
const userName = MONGODB_USER || 'root';
const pass = MONGODB_PASS || 'example';
const connectionUrl =
  MONGODB_URL || `mongodb://${userName}:${pass}@localhost:27017`;

/**
 * Returns a mongo client Object
 */
const getClient = async () => {
  const client = await MongoClient.connect(connectionUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).catch((err) => console.log(err));

  if (!client) {
    return null;
  }

  return client;
};

/**
 * Returns the collection object from the mongoClient
 * @param {import MongoClient} client
 */
const getDBCollection = (client) => {
  return client.db('nfl').collection('rushing');
};

/**
 * Returns the data from db based on sort, and player name
 * @param {import MongoClient} client
 * @param {String} searchByName - string to search by
 * @param {Object} sortQuery - to sort by
 */
const getDataWithFilters = async (
  client,
  searchByName = '',
  sortQuery = {}
) => {
  try {
    const collection = getDBCollection(client);
    const res = await collection
      .find(
        { Player: new RegExp(`.*${searchByName || ''}.*`, 'i') },
        { projection: { _id: 0 } }
      )
      .sort(sortQuery);

    return await res.toArray();
  } catch (error) {
    console.error(error);
    client.close();
    return [];
  }
};

export { getClient, getDataWithFilters };
