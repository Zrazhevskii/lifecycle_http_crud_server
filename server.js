// const http = require('http');
const koaBody = require('koa-body').default;
const cors = require('koa2-cors');
const noutes = require('./data/data');
// const Router = require('koa-router');
// const router = new Router();
const { randomUUID } = require('crypto');
const PORT = 3000;

const Koa = require('koa');
const router = require('./routes');
const app = new Koa();

// router
//     .get('/', (ctx, next) => {
//         ctx.body = 'Всем приветы!';
//         next()
//     })
//     .get('/noutes', (ctx) => {
//         ctx.body = noutes;
//     })
//     .post('/noutes/', async (ctx) => {
//         noutes.push({ ...ctx.request.body, id: randomUUID() });
//         ctx.response.status = 204;
//     })
//     .delete('/noutes/:id', async (ctx) => {
//         const noteID = ctx.params.id;
//         const index = noutes.findIndex((o) => o.id === noteID);
//         if (index !== -1) {
//             noutes.splice(index, 1);
//         }
//         ctx.response.status = 204;
    
// });

app.use(
    koaBody({
        text: true,
        urlencoded: true,
        multipart: true,
        json: true,
    })
);

app.use(
    cors({
        origin: '*',
        credentials: true,
        'Access-Control-Allow-Origin': true,
        allowMethods: ['GET', 'POST', 'DELETE', 'OPTIONS'],
    })
);

app.use(router.routes()).use(router.allowedMethods());

app.listen(PORT, (err) => {
    if (err) {
        console.log(err);
    }
    console.log(
        `Сервер запущен и работает по адресу: http://localhost:${PORT}`
    );
});
