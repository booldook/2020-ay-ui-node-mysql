function err(err) {
	console.log(err);
}

/* 팝업창 로직 */
$("#btWrite").click(onPopupOpen);
$(".popup-close").click(onPopupClose);
function onPopupOpen() {
	$("#popupWrite").stop().fadeIn(500);
}
function onPopupClose() {
	$(".popup-wrap").stop().fadeOut(500);
}

/* 저장 로직 */
$("#btSave").click(onSave);
function onSave() {
	var $f = $("#writeForm");
	var title = $f.find("input[name='title']").val();
	var writer = $f.find("input[name='writer']").val();
	var comment = $f.find("textarea[name='comment']").val();
	$.ajax({
		url: "/api/save",
		type: "post",
		dataType: "json",
		data: {
			title: title,
			writer: writer,
			comment: comment
		},
		success: function(res) {
			$(".popup-close").trigger("click");
			$f[0].reset();
			init();
		},
		error: err
	});
}

/* 리스트 로직 */
init();
function init() {
	$.ajax({
		url: "/api/list",
		type: "get",
		dataType: "json",
		success: listMaker,
		error: err
	});
}
function listMaker(res) {
	var html = '';
	for(var i in res) {
		html += '<tr>';
		html += '<td>'+res[i].id+'</td>';
		html += '<td onclick="onView('+res[i].id+')">'+res[i].title+'</td>';
		html += '<td>'+res[i].writer+'</td>';
		html += '<td>'+moment(res[i].wdate).format('YYYY-MM-DD')+'</td>';
		html += '<td><i class="fa fa-file"></i></td>';
		html += '<td>'+res[i].rnum+'</td>';
		html += '<td>';
		html += '<button class="btn btn-danger btn-sm" onclick="onDelete('+res[i].id+');">삭제</button> ';
		html += '<button class="btn btn-success btn-sm" onclick="onUpdate('+res[i].id+');">수정</button>';
		html += '</td>';
		html += '</tr>';
	}
	$(".list-tb").find("tbody").html(html);
}

/* 삭제 로직 */
function onDelete(id) {
	if(confirm("진심 삭제?")) {
		$.ajax({
			url: "/api/delete/"+id,
			type: "get",
			success: init,
			err: err
		});
	}
}

/* 상세보기 로직 */
function onView(id) {
	$.ajax({
		url: "/api/view/"+id,
		type: "get",
		success: function(res) {
			$(".view-title").html(res.title);
			$(".view-rnum").html(res.rnum);
			$(".view-writer").html(res.writer);
			$(".view-comment").html(res.comment);
			$(".view-wdate").html(moment(res.wdate).format('YYYY-MM-DD HH:mm:ss'));
			$("#popupView").stop().fadeIn(500);
		},
		err: err
	});
}

/* 수정 로직 */
function onUpdate(id) {
	var $f = $("#updateForm");
	$.ajax({
		url: "/api/view/"+id,
		type: "get",
		success: function(res) {
			$f.find("input[name='id']").val(res.id);
			$f.find("input[name='title']").val(res.title);
			$f.find("input[name='writer']").val(res.writer);
			$f.find("textarea[name='comment']").val(res.comment);
			$("#popupUpdate").stop().fadeIn(500);
		},
		err: err
	});
}
$("#btUpdate").click(onChg);
function onChg() {
	var $f = $("#updateForm");
	var id = $f.find("input[name='id']").val();
	var title = $f.find("input[name='title']").val();
	var writer = $f.find("input[name='writer']").val();
	var comment = $f.find("textarea[name='comment']").val();
	$.ajax({
		url: "/api/update",
		type: "post",
		dataType: "json",
		data: {
			id: id,
			title: title,
			writer: writer,
			comment: comment
		},
		success: function(res) {
			$(".popup-close").trigger("click");
			$f[0].reset();
			init();
		},
		error: err
	});
}