const http = require('http');
const app = require('./src/app');
const config = require('./src/config/config');

const port = config.port || 3000;
const server = http.createServer(app);

server.listen(port);
