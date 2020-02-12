$("#bt-wr").click(onPopupOpen);
$(".popup-close").click(onPopupClose);
function onPopupOpen() {
	$("#popup-wr").stop().fadeIn(500);
}
function onPopupClose() {
	$(".popup-wrap").stop().fadeOut(500);
}