import express from 'express';
import nunjucks from 'nunjucks';
import bodyParser from 'body-parser';
import db from './models/index.js';
import paginate from './pagination.js';
import postsController from './controllers/postsController.js';

const app = express();
const port = 3000;
const __dirname = import.meta.dirname;

app.use(bodyParser.urlencoded({ extended: false }));

nunjucks.configure('views', {
    autoescape: true,
    express: app
});

app.get('/',async (req, res) => {
    let [posts, pagination] = await paginate(db.Post, req.query.page, 20);
    res.render('index.njk', {posts, pagination});
});

app.get('/answer', (req, res) => {
    console.log(req.query);
    res.render('answer.njk', req.query);

});

app.use('/posts', postsController);

app.post('/answer', (req, res) => {
    console.log(req.body);
    res.render('answer.njk', { ...req.body, ...req.query });
});

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`);
});