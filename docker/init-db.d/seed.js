db = new Mongo().getDB('nfl');

db.createCollection('rushing', { capped: false });
