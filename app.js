const express = require('express');
const app = express();
const mysql = require("mysql2");
const moment = require("moment");
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


/********* Router - Root *********/
app.use('/', express.static('./public'));
app.get('/', (req, res) => {
	res.render('index.pug');
});


/********* Router - Board *********/
// 리스트 보기
app.get('/board/list', (req, res) => {
	let sql = 'SELECT * FROM board ORDER BY id DESC';
	connect.execute(sql, (err, result, field) => {
		for(var v of result) {
			v.wdate = moment(v.wdate).format('YYYY-MM-DD');
		}
		res.render('board/list.pug', {result});
	});
});

// 글작성 보기
app.get('/board/write', (req, res) => {
	res.render('board/write.pug');
});

// 글수정 보기
app.get('/board/update/:id', (req, res) => {
	let id = req.params.id;
	let sql = 'SELECT * FROM board WHERE id='+id;
	connect.execute(sql, (err, result, field) => {
		// res.json(result[0]);
		res.render('board/update.pug', {result: result[0]});
	});
});

// 글상세 보기
app.get('/board/view', (req, res) => {
	res.render('board/view.pug');
});

// 글 저장
app.post('/board/save/', (req, res) => {
	let title = req.body.title;
	let writer = req.body.writer;
	let comment = req.body.comment;
	/*
	let sql = `INSERT INTO board SET title = '${title}', writer = '${writer}', comment = '${comment}'`;
	*/
	let sql = 'INSERT INTO board SET title=?, writer=?, comment=?';
	let value = [title, writer, comment];
	connect.execute(sql, value, (err, result, field) => {
		if(err) res.json(err);
		else res.redirect("/board/list");
	});
});

// 글 삭제
app.get("/board/delete/:id", (req, res) => {
	let id = req.params.id;
	let sql = 'DELETE FROM board WHERE id='+id;
	connect.execute(sql, (err, result, field) => {
		if(err) res.json(err);
		else res.redirect("/board/list");
	});
});

// 글 수정
app.post("/board/chg", (req, res) => {
	let id = req.body.id;
	let title = req.body.title;
	let writer = req.body.writer;
	let comment = req.body.comment;
	let sql = 'UPDATE board SET title=?, writer=?, comment=? WHERE id=?';
	let value = [title, writer, comment, id];
	connect.execute(sql, value, (err, result, field) => {
		if(err) res.json(err);
		else res.redirect("/board/list");
	});
});

/*
1. req.query.id				http://127.0.0.1:3000/board/delete?id=14
2. req.params.id			http://127.0.0.1:3000/board/delete/14
3. req.body.id				POST방식 - <input name="id" value="14">
*/
