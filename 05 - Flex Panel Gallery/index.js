var panels = Array.from(document.querySelectorAll(".panel"));
function handleClick() {
    this.classList.toggle("open");
    this.classList.toggle("open-active");
}
panels.forEach(function (el) { return el.addEventListener("click", handleClick); });
