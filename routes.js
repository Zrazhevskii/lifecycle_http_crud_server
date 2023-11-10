const Router = require('koa-router');
const router = new Router();
const noutes = require('./data/data');
const { randomUUID } = require('crypto');

router
    .get('/', (ctx, next) => {
        ctx.body = 'Всем приветы!';
        next();
    })
    .get('/noutes', (ctx) => {
        ctx.body = noutes;
    })
    .post('/noutes/', async (ctx) => {
        noutes.push({ ...ctx.request.body, id: randomUUID() });
        ctx.response.status = 204;
    })
    .delete('/noutes/:id', async (ctx) => {
        const noteID = ctx.params.id;
        const index = noutes.findIndex((o) => o.id === noteID);
        if (index !== -1) {
            noutes.splice(index, 1);
        }
        ctx.body = 'Все ОК'
        ctx.response.status = 204;
    });

module.exports = router;
