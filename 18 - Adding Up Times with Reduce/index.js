const videos = (Array.from(document.querySelectorAll("[data-time]")));
const totalTime = videos.reduce((acc, el) => {
    const time = el.dataset.time;
    const minutes = parseInt(time.split(":")[0]) * 60;
    const seconds = parseInt(time.split(":")[1]);
    return acc + minutes + seconds;
}, 0);
console.log(Math.floor(totalTime / (60 * 60)) +
    " hours " +
    (Math.floor(totalTime / 60) % 60) +
    " minutes  " +
    (totalTime % 60) +
    " seconds");
