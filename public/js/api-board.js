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
	var $f = $("#boardForm");
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
		html += '<button class="btn btn-success btn-sm">수정</button>';
		html += '</td>';
		html += '</tr>';
	}
	$(".list-tb").find("tbody").html(html);
}

/* 삭제 로직 */
function onDelete(n) {
	if(confirm("진심 삭제?")) {
		$.ajax({
			url: "/api/delete/"+n,
			type: "get",
			success: init,
			err: err
		});
	}
}