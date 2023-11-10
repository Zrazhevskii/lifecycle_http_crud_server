const http = require('http');
const Koa = require('koa');
const koaBody = require('koa-body');
const cors = require('koa2-cors');
const router = require('./routes');

const app = new Koa();

app.use(koaBody({
  text: true,
  urlencoded: true,
  multipart: true,
  json: true,
}));

app.use(cors({
  origin: '*',
  credentials: true,
  'Access-Control-Allow-Origin': true,
  allowMethods: ['GET', 'POST', 'DELETE', 'OPTIONS'],
}));

app.use(router());

const port = process.env.PORT || 7777;
const server = http.createServer(app.callback());
server.listen(port, () => console.log(`The server started on port ${port}`));
console.log(`http://localhost:${port}`)