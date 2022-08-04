const img = <HTMLImageElement>document.querySelector("img");

const spacingSlider = <HTMLInputElement>document.querySelector("#spacing");
const blurSlider = <HTMLInputElement>document.querySelector("#blur");
const colorSelector = <HTMLInputElement>document.querySelector("#base");

const jsElement = <HTMLElement>document.querySelector("h2 > span");

spacingSlider.addEventListener("change", (e) => {
  const value = (e.target as HTMLInputElement).value;
  img.style.padding = spacingSlider.value + "px";
});

blurSlider.addEventListener("change", (e) => {
  const value = (e.target as HTMLInputElement).value;
  img.style.filter = `blur(${value}px)`;
});

colorSelector.addEventListener("change", (e) => {
  const color = (e.target as HTMLInputElement).value;
  jsElement.style.color = color;
  img.style.background = color;
});

function initialiseValues() {
  jsElement.style.color = colorSelector.value;
  img.style.background = colorSelector.value;
  img.style.padding = spacingSlider.value + "px";
  img.style.filter = `blur(${blurSlider.value}px)`;
}

initialiseValues();
