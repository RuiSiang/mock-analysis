const Koa = require('koa');
const Router = require('koa-router');
const path = require('path');
const serve = require('koa-static');
const fs = require('fs')

const app = new Koa();
const router = new Router();

// Mock data: Replace this with your JSON file logic as needed
const addressTags = JSON.parse(fs.readFileSync('tags.json') || '{}')

app.use(serve(path.join(__dirname, 'public')));

router.get('/search/:address', (ctx) => {
  const { address } = ctx.params;
  ctx.body = addressTags[address] || [];
});

app.use(router.routes()).use(router.allowedMethods());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
