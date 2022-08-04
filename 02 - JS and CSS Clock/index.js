// select indivisual hands
var hourHand = document.querySelector(".hour-hand");
var minHand = document.querySelector(".min-hand");
var secondHand = document.querySelector(".second-hand");
function initialiseHands() {
    var currentDate = new Date();
    var hour = currentDate.getHours() % 12;
    var minutes = currentDate.getMinutes() % 60;
    var seconds = currentDate.getSeconds() % 60;
    console.table({ seconds: seconds, minutes: minutes, hour: hour });
    hourHand.style.transform = "rotate(".concat(30 * hour, "deg)");
    minHand.style.transform = "rotate(".concat(6 * minutes, "deg)");
    secondHand.style.transform = "rotate(".concat(6 * seconds, "deg)");
}
initialiseHands();
setInterval(function () {
    initialiseHands();
}, 1000);
