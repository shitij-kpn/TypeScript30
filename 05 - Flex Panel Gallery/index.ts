const panels = <HTMLElement[]>Array.from(document.querySelectorAll(".panel"));

function handleClick() {
  this.classList.toggle("open");
  this.classList.toggle("open-active");
}

panels.forEach((el) => el.addEventListener("click", handleClick));
