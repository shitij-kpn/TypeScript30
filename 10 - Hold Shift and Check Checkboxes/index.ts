const checkBoxes = <HTMLInputElement[]>(
  Array.from(document.querySelectorAll("input[type=checkbox]"))
);

let lastChecked: HTMLInputElement | null = null;

interface shiftKeyEvent extends InputEvent {
  shiftKey: Boolean;
}

function handleClick(e: shiftKeyEvent) {
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
