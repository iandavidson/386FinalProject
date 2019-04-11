
const Koa = require('koa');
const app = new Koa();

const cors = require('kcors');


const bodyParser = require('koa-bodyparser');
app.use(bodyParser());
app.use(cors({credentials: true}));
const http = require('http');
const API_PORT = 8126;

require('./config/routes.js')(app);

const httpsServer = http.createServer(app.callback());
httpsServer.listen(API_PORT, () => console.log(`Listening on HTTPS port ${API_PORT}`));
