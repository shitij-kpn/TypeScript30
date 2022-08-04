const checkBoxes = (Array.from(document.querySelectorAll("input[type=checkbox]")));
let lastChecked = null;
function handleClick(e) {
    let inBetween = false;
    if (e.shiftKey && this.checked) {
        checkBoxes.forEach((checkBox) => {
            if (checkBox == this || checkBox == lastChecked) {
                inBetween = !inBetween;
            }
            if (inBetween) {
                checkBox.checked = true;
            }
        });
    }
    lastChecked = this;
}
checkBoxes.forEach((el) => el.addEventListener("click", handleClick));
