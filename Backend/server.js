const http = require('http');
const app = require('./src/app');
const { initializeSocket } = require('./socket');
const connectDB = require('././src/config/db');
const dns = require('dns');

dns.setServers(['1.1.1.1', '8.8.8.8']);

connectDB();

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);
initializeSocket(server);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
