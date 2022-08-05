function debounce(func: () => void, wait = 20, immediate = true) {
  let timeout: number | undefined;
  return function () {
    var context = this,
      args = arguments;
    var later = function () {
      timeout = undefined;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

const images = <HTMLImageElement[]>(
  Array.from(document.querySelectorAll(".slide-in"))
);

function checkSlide() {
  images.forEach((image) => {
    const slideInAt = window.scrollY + window.innerHeight - image.height / 2;
    const imageBottom = image.offsetTop + image.height;
    const isHalfShown = slideInAt > image.offsetTop;
    const isNotScrollPast = window.scrollY < imageBottom;
    if (isHalfShown && isNotScrollPast) {
      image.classList.add("active");
    } else {
      image.classList.remove("active");
    }
  });
}

window.addEventListener("scroll", debounce(checkSlide));
