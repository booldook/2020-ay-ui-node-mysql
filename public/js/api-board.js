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
/* <tr>
<td>1</td>
<td>제목입니다.</td>
<td>작성자</td>
<td>2020-02-11</td>
<td><i class="fa fa-file"></i></td>
<td>0</td>
<td>
<button class="btn btn-danger btn-sm">삭제</button>
<button class="btn btn-success btn-sm">수정</button>
</td>
</tr>
	$(".list-tb").html(); */
}