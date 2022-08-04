var img = document.querySelector("img");
var spacingSlider = document.querySelector("#spacing");
var blurSlider = document.querySelector("#blur");
var colorSelector = document.querySelector("#base");
var jsElement = document.querySelector("h2 > span");
spacingSlider.addEventListener("change", function (e) {
    var value = e.target.value;
    img.style.padding = spacingSlider.value + "px";
});
blurSlider.addEventListener("change", function (e) {
    var value = e.target.value;
    img.style.filter = "blur(".concat(value, "px)");
});
colorSelector.addEventListener("change", function (e) {
    var color = e.target.value;
    jsElement.style.color = color;
    img.style.background = color;
});
function initialiseValues() {
    jsElement.style.color = colorSelector.value;
    img.style.background = colorSelector.value;
    img.style.padding = spacingSlider.value + "px";
    img.style.filter = "blur(".concat(blurSlider.value, "px)");
}
initialiseValues();
