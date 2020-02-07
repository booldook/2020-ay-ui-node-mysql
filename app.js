const express = require('express');
const app = express();

app.listen(3000, () => {
	console.log("http://127.0.0.1:3000");
});

/********* INIT *********/
app.locals.pretty = true;
app.set("view engine", "pug");
app.set("views", "./views");


/********* Route *********/
app.use('/', express.static('./public'));

app.get('/', (req, res) => {
	res.render('index.pug');
});

app.get('/board/list', (req, res) => {
	res.render('board/list.pug');
});

app.get('/board/write', (req, res) => {
	res.render('board/write.pug');
});

app.get('/board/update', (req, res) => {
	res.render('board/update.pug');
});

app.get('/board/view', (req, res) => {
	res.render('board/view.pug');
});
