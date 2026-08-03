// const dns = require('dns');
// dns.setServers(['8.8.8.8', '8.8.4.4']);

console.log('1 - Début index');

const http = require('http');

console.log('2 - Après require http');

const app = require('./app');

console.log('3 - Après require app');

const normalizePort = (val) => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};
const port = normalizePort(process.env.PORT || '3200');
app.set('port', port);

console.log('4 - Après normalizePort');

const errorHandler = (error) => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const address = server.address();
  const bind =
    typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges.');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use.');
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const server = http.createServer(app);

console.log('5 - Après createServer');

server.on('error', errorHandler);

server.listen(port, () => {
  console.log('6 - Serveur démarré');
});
