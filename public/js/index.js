$(".btn-delete").click(function(){
	//var id = $(this).parent().parent().children("td").eq(0).text();
	if(confirm("정말로 삭제하시겠습니까?")) {
		var id = $(this).data("id");
		location.href = "/board/delete/"+id;
	}
});

$(".btn-update").click(function(){
	var id = $(this).data("id");
	location.href = "/board/update/"+id;
});