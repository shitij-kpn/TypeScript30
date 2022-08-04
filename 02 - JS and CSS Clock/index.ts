// select indivisual hands

const hourHand = <HTMLElement>document.querySelector(".hour-hand");
const minHand = <HTMLElement>document.querySelector(".min-hand");
const secondHand = <HTMLElement>document.querySelector(".second-hand");

function initialiseHands() {
  const currentDate = new Date();
  const hour = currentDate.getHours() % 12;
  const minutes = currentDate.getMinutes() % 60;
  const seconds = currentDate.getSeconds() % 60;
  console.table({ seconds, minutes, hour });
  hourHand.style.transform = `rotate(${30 * hour}deg)`;
  minHand.style.transform = `rotate(${6 * minutes}deg)`;
  secondHand.style.transform = `rotate(${6 * seconds}deg)`;
}

initialiseHands();

setInterval(() => {
  initialiseHands();
}, 1000);
