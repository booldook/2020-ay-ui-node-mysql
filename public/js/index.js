$(".btn-delete").click(function(){
	var id = $(this).parent().parent().children("td").eq(0).text();
	console.log(id);
});