const http = require('http')
const path = require('path');
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const compression = require('compression')
const app = express();

let httpServer;

httpServer = http.createServer(app);

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use(compression());

app.use(express.static(path.join(__dirname, '/dist')));

app.get('*.js', (req, res, next) => {
  req.url = req.url + '.gz';
  res.set('Content-Encoding', 'gzip');
  next();
});

app.use(express.static(path.join(__dirname + '/dist')));

app.get('/*', (_, res) => {
  res.sendFile(path.join(__dirname, '/dist', 'index.html'));
});

httpServer.listen(3000)
  .on('listening', () => 'Server iniciado na porta 3000')
  .on('error', err => err);