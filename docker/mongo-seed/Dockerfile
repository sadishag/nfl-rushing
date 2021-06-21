FROM mongo

COPY rushing.json /rushing.json
COPY cleanData.js /cleanData.js
CMD mongoimport --uri "mongodb://root:example@mongodb:27017/nfl?authSource=admin&readPreference=primary&appname=mongoSeedContainer&ssl=false" --collection=rushing --type=json --file=/rushing.json --jsonArray && mongo "mongodb://root:example@mongodb:27017/nfl?authSource=admin&readPreference=primary&appname=mongoSeedContainer&ssl=false" cleanData.js
