const fs = require('fs');
const path = require('path');

// read/process package.json
const file = fs.readFileSync(path.resolve('./package.json')).toString();
let pkg = JSON.parse(file);

// at this point you should have access to your ENV vars
pkg.proxy = `http://${process.env.PROXY_HOST}:${process.env.PROXY_PORT}`;

// the 2 enables pretty-printing and defines the number of spaces to use
fs.writeFileSync('./package.json', JSON.stringify(pkg, null, 2));
