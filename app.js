const express = require('express');
const app = express();
const mysql = require("mysql2");
const connect = mysql.createConnection({
	host: "127.0.0.1",
	user: "root",
	password: "000000",
	database: "node"
});

app.listen(3000, () => {
	console.log("http://127.0.0.1:3000");
});

/********* INIT *********/
app.locals.pretty = true;
app.set("view engine", "pug");
app.set("views", "./views");
app.use(express.json());
app.use(express.urlencoded({extended: false}));


/********* Route *********/
app.use('/', express.static('./public'));

app.get('/', (req, res) => {
	res.render('index.pug');
});

app.get('/board/list', (req, res) => {
	let sql = 'SELECT * FROM board ORDER BY id DESC';
	connect.execute(sql, (err, result, field) => {
		res.render('board/list.pug', {result});
	});
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

app.post('/board/save/', (req, res) => {
	let title = req.body.title;
	let writer = req.body.writer;
	let comment = req.body.comment;
	/*
	let sql = `INSERT INTO board SET title = '${title}', writer = '${writer}', comment = '${comment}'`;
	*/
	let sql = "INSERT INTO board SET title=?, writer=?, comment=?";
	let value = [title, writer, comment];
	connect.execute(sql, value, (err, result, field) => {
		res.redirect("/board/list");
	});
});

