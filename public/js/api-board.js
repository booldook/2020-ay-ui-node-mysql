$("#btWrite").click(onPopupOpen);
$(".popup-close").click(onPopupClose);
function onPopupOpen() {
	$("#popupWrite").stop().fadeIn(500);
}
function onPopupClose() {
	$(".popup-wrap").stop().fadeOut(500);
}